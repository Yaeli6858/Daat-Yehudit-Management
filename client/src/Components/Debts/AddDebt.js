
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomSnackbar from "../Alerts/CustomSnackbar";
import Axios from "axios";
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Typography, Radio, RadioGroup, FormControlLabel, Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { amountValidation, nameValidation, borrowDateValidation, dueDateValidation, descriptionValidation, debtTypeValidation } from '../../Validation/Common';

export default function AddDebt({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [first, setFirst] = useState(false);

    // סכימת ולידציות
  const debtSchema = yup.object({
    borrower: nameValidation,
    lender: nameValidation,
    amount: amountValidation,
    dateBorrowed: borrowDateValidation,
    dueDate: dueDateValidation,
    description: descriptionValidation,
    type: debtTypeValidation,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(debtSchema),
    defaultValues: {
      borrower: "",
      lender: "",
      amount: "",
      dateBorrowed: new Date().toISOString().split("T")[0],
      dueDate: new Date().toISOString().split("T")[0],
      description: "",
      paid: false,
      type: "",
    },
  });

  const type = watch("type");

  const fieldData = [
    { label: "שם הלווה", name: "borrower", required: true },
    { label: "שם המלווה", name: "lender", required: true },
    { label: "סכום ההלוואה", name: "amount", required: true },
    { label: "תאריך ההלוואה", name: "dateBorrowed", required: true },
    { label: "תאריך פירעון", name: "dueDate", required: true },
    { label: "תיאור", name: "description", required: true },
  ];

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFirst(false);
  };

  const handleTypeChange = (value) => {
    setFirst(true);
    setValue("type", value);

    if (value === "taken") {
      setValue("borrower", "כולל");
      setValue("lender", "");
    }

    if (value === "given") {
      setValue("lender", "כולל");
      setValue("borrower", "");
    }
  };

  const addDebt = async (data) => {
    try {
      await Axios.post("http://localhost:5678/api/debts", data);
      setAlert({ message: "החוב נוסף בהצלחה", type: "success" });
      reset();
      onAdd();
      handleClose();
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message,
        type: "error",
      });
    }
  };




  return (
    <React.Fragment>
      <Button variant="addButton" onClick={handleClickOpen}>
        הוסף חוב חדש
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <IconButton variant="iconButton" onClick={handleClose}>
            <CloseIcon color="error" />
          </IconButton>
        </DialogActions>

        <DialogTitle>
          <Typography variant="h1">הוספת חוב חדש</Typography>
        </DialogTitle>

        <form onSubmit={handleSubmit(addDebt)}>
          {!first ? (
            <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
                <RadioGroup value={type}>
                  <FormControlLabel
                    value="taken"
                    control={<Radio />}
                    label="חוב שנלקח"
                    onChange={() => handleTypeChange("taken")}
                    sx={{ direction: "rtl" }}
                  />
                  <FormControlLabel
                    value="given"
                    control={<Radio />}
                    label="חוב שניתן"
                    onChange={() => handleTypeChange("given")}
                    sx={{ direction: "rtl" }}
                  />
                </RadioGroup>
              </Box>
            </DialogContent>
          ) : (
            <Box>
              <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
                  {fieldData.map((field) => (
                    <TextField
                      key={field.name}
                      label={field.label}
                      variant="outlined"
                      required={field.required}
                      type={
                        field.name === "dateBorrowed" || field.name === "dueDate"
                          ? "date"
                          : "text"
                      }
                      InputLabelProps={
                        field.name === "dateBorrowed" || field.name === "dueDate"
                          ? { shrink: true }
                          : undefined
                      }
                      {...register(field.name)}
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message}
                    />
                  ))}
                </Box>
              </DialogContent>

              <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
                <Button variant="activeButton" type="submit">
                  הוסף חוב
                </Button>
              </DialogActions>
            </Box>
          )}
        </form>
      </Dialog>

      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </React.Fragment>
  );
}

// import * as React from "react";
// import { useState } from "react";
// import CustomSnackbar from "../Alerts/CustomSnackbar";
// import Axios from "axios";
// import {
//   Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Radio,
//   RadioGroup, FormControlLabel, Box,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// export default function AddDebt({ onAdd }) {
//   const [open, setOpen] = useState(false);
//   const [alert, setAlert] = useState(null);
//   const [first, setFirst] = useState(false);

//   // מצב אחד לכל השדות (במקום useState לכל אחד)
//   const [fields, setFields] = useState({
//     borrower: "",
//     lender: "",
//     amount: "",
//     dateBorrowed: new Date().toISOString().split("T")[0],
//     dueDate: new Date().toISOString().split("T")[0],
//     description: "",
//     paid: false,
//     type: "",
//   });

//   //  מערך השדות (label + name)
//   const fieldData = [
//     { label: "שם הלווה", name: "borrower", required: true },
//     { label: "שם המלווה", name: "lender", required: true },
//     { label: "סכום ההלוואה", name: "amount", required: true },
//     { label: "תאריך ההלוואה", name: "dateBorrowed", required: true },
//     { label: "תאריך פירעון", name: "dueDate", required: true },
//     { label: "תיאור ", name: "description", required: true },
//   ];

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => { setOpen(false); setFirst(false); };

//   const handleChange = (e) => {

//     if (e.target.name === "type") {
//       setFirst(true);
//       // שינוי חדש — מילוי ערכי ברירת מחדל בהתאם לסוג חוב
//       const value = e.target.value;
//       if (value === "taken") {
//         setFields((prev) => ({
//           ...prev,
//           type: value,
//           borrower: "כולל",   //  לווה = כולל
//           lender: "",          // מנקה את הצד השני
//         }));
//         return;
//       }
//       else if (value === "given") {
//         setFields((prev) => ({
//           ...prev,
//           type: value,
//           lender: "כולל",     //  מלווה = כולל
//           borrower: "",        // מנקה את הצד השני
//         }));
//         return;
//       }
//     }
//     setFields((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   }



//   const addDebt = async (event) => {
//     event.preventDefault();
//     try {
//       await Axios.post("http://localhost:5678/api/debts", fields);

//       setAlert({ message: "החוב נוסף בהצלחה", type: "success" });
//       setFields(Object.fromEntries(Object.keys(fields).map((k) => [k, ""]))); // איפוס כל השדות
//       onAdd();
//       handleClose();
//     } catch (error) {
//       setAlert({
//         message: error.response?.data?.message || error.message,
//         type: "error",
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       {/* כפתור פתיחה */}
//       <Button
//         variant="addButton"
//         onClick={handleClickOpen}
//       >
//         הוסף חוב חדש
//       </Button>

//       {/* דיאלוג */}
//       <Dialog
//         open={open}
//         onClose={handleClose}>
//         <DialogActions>
//           <IconButton variant="iconButton"
//             onClick={handleClose}>
//             <CloseIcon color="error" />
//           </IconButton>
//         </DialogActions>

//         <DialogTitle>
//           <Typography variant="h1">
//             הוספת חוב חדש
//           </Typography>
//         </DialogTitle>

//         <form onSubmit={addDebt}>
//           {!first ? (
//             <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
//               <Box sx={{ display: "flex", flexDirection: "column", width: "70%", marginBottom: "15px" }}>

//                 <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="type" onChange={handleChange}>
//                   {/* <FormLabel sx={{textAlign:"center", marginBottom:"15px"}}>בחר סוג חוב</FormLabel> */}

//                   <FormControlLabel value="taken" control={<Radio />} label="חוב שנלקח"
//                     name="type" onChange={handleChange} sx={{ direction: "rtl" }} />
//                   <FormControlLabel value="given" control={<Radio />} label="חוב שניתן"
//                     name="type" onChange={handleChange} sx={{ direction: "rtl" }} />
//                 </RadioGroup>
//               </Box>

//             </DialogContent>) : (
//             <Box>
//               <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
//                 <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>                  {/*  לולאה על כל השדות */}
//                   {fieldData.map((field) => (
//                     <TextField name={field.name} label={field.label} value={fields[field.name]}
//                       onChange={handleChange} variant="outlined" required={field.required}
//                       type={
//                         field.name === "dateBorrowed" || field.name === "dueDate"
//                           ? "date"
//                           : "text"} />))}
//                 </Box>
//               </DialogContent>
//               <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
//                 <Button variant="activeButton" type="submit">
//                   הוסף חוב
//                 </Button>
//               </DialogActions>
//             </Box>)
//           }

//         </form>
//       </Dialog>
//       <CustomSnackbar alert={alert} setAlert={setAlert} />
//     </React.Fragment >
//   )
// }



