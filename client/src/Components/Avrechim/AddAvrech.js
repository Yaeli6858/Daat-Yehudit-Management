// import CustomSnackbar from "../Alerts/CustomSnackbar";
// import Axios from 'axios';
// import {
//   Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, IconButton, Typography, Stepper, Step, StepLabel,
//   Box
// } from '@mui/material';

// import { useState } from "react";
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// export default function AddAvrech({ onAdd }) {
//   const [open, setOpen] = useState(false);
//   const [alert, setAlert] = useState(null);
//   const [activeStep, setActiveStep] = useState(0);

//   const [fields, setFields] = useState({
//     name: "",
//     id: "",
//     phoneNumber: "",
//     address: "",
//     emailAddress: "",
//     bankName: "",
//     branchNumber: "",
//     accountNumber: "",
//     womenName: "",
//     womenPhoneNumber: "",
//     womenEmailAddress: ""
//   });

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setActiveStep(0);
//   };

//   const handleChange = (e) =>
//     setFields({ ...fields, [e.target.name]: e.target.value });

//   const addAvrech = async (event) => {
//     event.preventDefault();
//     try {
//       await Axios.post("http://localhost:5678/api/avrechim", fields);

//       setAlert({ message: "האברך נוסף בהצלחה ", type: "success" });
//       onAdd();
//       handleClose();
//     } catch (error) {
//       setAlert({
//         message: error.response?.data?.message || error.message,
//         type: "error",
//       });
//     }
//     setFields(Object.fromEntries(Object.keys(fields).map(k => [k, ""])));

//   };

//   // שלבי ה־Stepper
//   const steps = ["פרטי האברך", "פרטי בנק", "פרטי האישה"];

//   const sections = [
//     ["name", "id", "phoneNumber", "address", "emailAddress"],
//     ["bankName", "branchNumber", "accountNumber"],
//     ["womenName", "womenPhoneNumber", "womenEmailAddress"]
//   ];

//   const fieldData = {
//     name: "שם האברך",
//     id: "תעודת זהות",
//     phoneNumber: "מספר טלפון",
//     address: "כתובת מגורים",
//     emailAddress: "כתובת אימייל",
//     bankName: "מספר בנק",
//     branchNumber: "מספר סניף",
//     accountNumber: "מספר חשבון",
//     womenName: "שם האישה",
//     womenPhoneNumber: "מספר טלפון אישה",
//     womenEmailAddress: "כתובת אימייל אישה"
//   };

//   return (
//     <>
//       <Button variant="addButton" onClick={handleClickOpen}>
//         הוסף אברך
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             borderRadius: 4,
//             minWidth: { xs: "90%", md: 600 },
//             p: 2
//           }
//         }}
//       >
//         {/*  סגירה */}
//         <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
//           <IconButton onClick={handleClose}
//             variant="iconButton">
//             <CloseIcon />
//           </IconButton>
//         </DialogActions>

//         <DialogTitle><Typography variant="h1">הוספת אברך</Typography></DialogTitle>

//         {/* stepper */}
//         <DialogTitle>
//           <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
//             {steps.map(step => (
//               <Step key={step}>
//                 <StepLabel>{step}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </DialogTitle>

//         <form onSubmit={addAvrech}>
//           <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
//             <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
//               {sections[activeStep].map((name) => (
//                 <TextField
//                   name={name}
//                   label={fieldData[name]}
//                   value={fields[name]}
//                   onChange={handleChange}
//                 />
//               ))}
//             </Box>
//           </DialogContent>

//           {/* כפתורי ניווט */}
//           <DialogActions
//             sx={{
//               justifyContent: "space-between",
//               px: 2,
//               pb: 2
//             }}
//           >
//             <IconButton
//               disabled={activeStep === 0}
//               onClick={() => setActiveStep(prev => prev - 1)}
//             >
//               <ArrowBackIcon />
//             </IconButton>

//             {activeStep < 2 ? (
//               <IconButton onClick={() => setActiveStep(prev => prev + 1)}
//               >
//                 <ArrowForwardIcon />
//               </IconButton>
//               // variant="activeButton"
//             ) : (
//               <Button
//                 type="submit"
//                 variant="activeButton"
//                 sx={{ px: 4 }}
//               >
//                 שמור
//               </Button>
//             )}
//           </DialogActions>
//         </form>
//       </Dialog >

//       <CustomSnackbar alert={alert} setAlert={setAlert} />
//     </>
//   );
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stepper, Step, StepLabel,
  IconButton, Box, Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Axios from 'axios';
import { nameValidation, idValidationReq, emailValidation, addressValidation,
         bankNameValidation, branchNumberValidation, accountNumberValidation,
         phoneValidationOpt, phoneValidationReq,} from "../../Validation/Common";

export default function AddAvrechForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

//schema כולל לכל הטופס
  const schema = yup.object({
    name: nameValidation,
    id: idValidationReq,
    phoneNumber: phoneValidationReq,
    emailAddress: emailValidation,
    address: addressValidation,
    bankName: bankNameValidation,
    branchNumber: branchNumberValidation,
    accountNumber: accountNumberValidation,
    womenName: nameValidation,
    womenPhoneNumber: phoneValidationOpt,
    womenEmailAddress: emailValidation
  });

  //  React Hook Form

  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur"
  });

  // Stepper setup
  const steps = ["פרטי האברך", "פרטי בנק", "פרטי האישה"];
  const stepFields = [
    ["name", "id", "phoneNumber", "emailAddress", "address"],
    ["bankName", "branchNumber", "accountNumber"],
    ["womenName", "womenPhoneNumber", "womenEmailAddress"]
  ];

  const handleNext = async () => {
    const valid = await trigger(stepFields[activeStep]);
    if (valid) setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  // Submit
  const onSubmit = async (data) => {
    try {
      await Axios.post("http://localhost:5678/api/avrechim", data);
      onAdd?.();
      reset();
      setActiveStep(0);
      setOpen(false);
      alert("האברך נוסף בהצלחה");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  // Render
  const renderStepFields = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {stepFields[activeStep].map(field => (
        <TextField
          key={field}
          label={field}
          {...register(field)}
          error={!!errors[field]}
          helperText={errors[field]?.message}
        />
      ))}
    </Box>
  );

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>הוסף אברך</Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogActions sx={{ justifyContent: "flex-end" }}>
          <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
        </DialogActions>

        <DialogTitle><Typography variant="h5">הוספת אברך</Typography></DialogTitle>

        <Stepper activeStep={activeStep} sx={{ px: 3, mb: 2 }}>
          {steps.map(step => (
            <Step key={step}><StepLabel>{step}</StepLabel></Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>{renderStepFields()}</DialogContent>

          <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
            <IconButton disabled={activeStep === 0} onClick={handleBack}><ArrowBackIcon /></IconButton>

            {activeStep < steps.length - 1 ? (
              <IconButton onClick={handleNext}><ArrowForwardIcon /></IconButton>
            ) : (
              <Button type="submit" variant="contained">שמור</Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

