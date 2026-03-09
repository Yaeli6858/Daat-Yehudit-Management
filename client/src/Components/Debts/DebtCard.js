// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import Axios from 'axios';
// import CustomSnackbar from "../Alerts/CustomSnackbar";
// import {
//   Table, TableBody, TableRow, TableCell, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Grid, Checkbox
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// export default function FormDialog({ debtDetails, setOpen, open, onChange }) {

//   const [isEditing, setIsEditing] = useState(false); // ⭐ מצב עריכה/תצוגה
//   const [alert, setAlert] = useState(null);
//   const [debtData, setDebtData] = useState(debtDetails);

//   const fields = [
//     { label: "לווה", name: "borrower" },
//     { label: "מלווה", name: "lender" },
//     { label: "סכום", name: "amount" },
//     { label: "תאריך הלוואה", name: "dateBorrowed" },
//     { label: "תאריך פרעון", name: "dueDate" },
//     { label: "תיאור", name: "description" },
//     { label: "שולם", name: "paid" },
//   ];

//   const handleClose = () => {
//     setIsEditing(false); 
//     setOpen(false);
//   };

//   const handleFieldChange = (field, value) => {
//     setDebtData((prevDetails) => ({
//       ...prevDetails,
//       [field]: value,
//     }));
//   };

//   const updateDebtDetails = async () => {
//     try {
//       const { data } = await Axios.put(`http://localhost:5678/api/debts/${debtDetails._id}`, debtData);
//       handleClose();
//       setAlert({ type: "success", message: "פרטי החוב עודכנו בהצלחה" });
//       onChange()
//     } catch (error) {
//       setAlert({ type: "error", message: "שגיאה בעדכון פרטי החוב" });
//       console.log(error.message, "שגיאה בעדכון חוב");
//     }
//   };

//   useEffect(() => {
//     setDebtData(debtDetails);
//   }, [debtDetails]);

//   return (
//     <React.Fragment>
//       <Dialog open={open} onClose={handleClose}>
//         {/* כפתורים תחתונים */}
//         <DialogActions sx={{ justifyContent: "space-between", padding: "8px 16px" }}>
//           {/* כפתור שמירת עדכונים */}
//           <Button
//             variant="activeButton"
//             onClick={isEditing ? updateDebtDetails : () => setIsEditing(true)}>
//             {isEditing ? "שמירת עדכונים" : "עדכון פרטים"}
//           </Button>

//           {/* כפתור סגירה */}
//           <IconButton onClick={handleClose} variant="iconButton">
//             <CloseIcon color="error" />
//           </IconButton>
//         </DialogActions>

//         {/* כותרת */}
//         <DialogTitle>
//           <Typography variant="h6" align="center" sx={{ color: "#7f0000" }}>
//             פרטי חוב
//           </Typography>
//         </DialogTitle>

//         <DialogContent>
//           <Paper>
//             <Table sx={{ width: "100%" }}>
//               <TableBody>
//                 {fields.map((field) => (
//                   <TableRow sx={{ height: "80px", margin: "0", padding: "0" }}
//                   key={field._id} hover>
//                     {/* הצגת שדות */}
//                     <TableCell sx={{width:"60%", margin: "0"}}>
//                       {isEditing ? (
//                         field.name === "paid" ? (
//                           <Checkbox
//                             checked={debtData["paid"]}
//                             onChange={() =>
//                               setDebtData((prevData) => ({
//                                 ...prevData,
//                                 paid: !prevData.paid,
//                               }))
//                             }
//                             inputProps={{ "aria-label": "controlled" }}
//                           />
//                         ) : (
//                           <TextField
//                             variant="standard"
//                             fullWidth
//                             sx={{ margin: "0", padding: "0" }}
//                             value={debtData[field.name]}
//                             onChange={(e) => handleFieldChange(field.name, e.target.value)}
//                           />
//                         )
//                       ) : (
//                         field.name === "paid" ? (
//                           <Checkbox checked={debtData["paid"]} inputProps={{ "aria-label": "controlled" }} />
//                         ) : (
//                           debtData[field.name]
//                         )
//                       )}
//                     </TableCell>
//                     {/* שם השדה */}
//                     <TableCell sx={{width:"40%", margin: "0", color: "#7f0000"}}>
//                       {field.label}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </DialogContent>
//       </Dialog>

//       <CustomSnackbar alert={alert} setAlert={setAlert} />
//     </React.Fragment>
//   );
// }


import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import {
  Table, TableBody, TableRow, TableCell, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Grid, Checkbox
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FormDialog({ debtDetails, setOpen, open, onChange }) {

  const [isEditing, setIsEditing] = useState(false); // ⭐ מצב עריכה/תצוגה
  const [alert, setAlert] = useState(null);
  // const [debtData, setDebtData] = useState(debtDetails);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: debtDetails,
  });


  const fields = [
    { label: "לווה", name: "borrower" },
    { label: "מלווה", name: "lender" },
    { label: "סכום", name: "amount" },
    { label: "תאריך הלוואה", name: "dateBorrowed" },
    { label: "תאריך פרעון", name: "dueDate" },
    { label: "תיאור", name: "description" },
    { label: "שולם", name: "paid" },
  ];

  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setDebtData((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const updateDebtDetails = async () => {
    try {
      const { data } = await Axios.put(`http://localhost:5678/api/debts/${debtDetails._id}`, debtData);
      handleClose();
      setAlert({ type: "success", message: "פרטי החוב עודכנו בהצלחה" });
      onChange()
    } catch (error) {
      setAlert({ type: "error", message: "שגיאה בעדכון פרטי החוב" });
      console.log(error.message, "שגיאה בעדכון חוב");
    }
  };

  useEffect(() => {
    reset(debtDetails);
  }, [debtDetails.reset]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        {/* כפתורים תחתונים */}
        <DialogActions sx={{ justifyContent: "space-between", padding: "8px 16px" }}>
          {/* כפתור שמירת עדכונים */}
          <Button
            variant="activeButton"
            onClick={isEditing ? updateDebtDetails : () => setIsEditing(true)}>
            {isEditing ? "שמירת עדכונים" : "עדכון פרטים"}
          </Button>

          {/* כפתור סגירה */}
          <IconButton onClick={handleClose} variant="iconButton">
            <CloseIcon color="error" />
          </IconButton>
        </DialogActions>

        {/* כותרת */}
        <DialogTitle>
          <Typography variant="h6" align="center" sx={{ color: "#7f0000" }}>
            פרטי חוב
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Paper>
            <Table sx={{ width: "100%" }}>
              <TableBody>
                {fields.map((field) => (
                  <TableRow sx={{ height: "80px", margin: "0", padding: "0" }}
                    key={field._id} hover>
                    {/* הצגת שדות */}
                    <TableCell sx={{ width: "60%", margin: "0" }}>
                      {isEditing ? (
                        field.name === "paid" ? (
                          <Checkbox
                            checked={debtData["paid"]}
                            onChange={() =>
                              setDebtData((prevData) => ({
                                ...prevData,
                                paid: !prevData.paid,
                              }))
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        ) : (
                          <TextField
                            variant="standard"
                            fullWidth
                            sx={{ margin: "0", padding: "0" }}
                            {...register(field.name)}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]?.message} />
                        )
                      ) : (
                        field.name === "paid" ? (
                          <Checkbox {...register("paid")} />
                        ) : (
                          debtData[field.name]
                        )
                      )}
                    </TableCell>
                    {/* שם השדה */}
                    <TableCell sx={{ width: "40%", margin: "0", color: "#7f0000" }}>
                      {field.label}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </DialogContent>
      </Dialog>

      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </React.Fragment>
  );
}
