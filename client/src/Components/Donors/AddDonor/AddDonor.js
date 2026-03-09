
import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Stepper, Step, StepLabel, IconButton, Box, Typography
} from '@mui/material';
import Axios from 'axios';

import DonorDetailsForm from './DonorDetailsForm';
import YahrzeitSection from './YahrzeitSection';
import DonationSection from './DonationSection';

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import CustomSnackbar from "../../Alerts/CustomSnackbar";

function addMonthsToDate(dateStr, months) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + Number(months));
  return d.toISOString().split('T')[0];
}

export default function AddDonor({ isOpen, onClose, onAdd, showAlert }) {

  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState(null);

  const [donorData, setDonorData] = useState({
    name: '',
    donorId: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    whatsappNumber: '',
    birthDate: '',
  });

  const [yahrzeits, setYahrzeits] = useState([]);
  const [donation, setDonation] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    paymentMethod: '',
    frequency: '',
    duration: ''
  });

  const steps = ["פרטי תורם", "יארצייטים", "תרומה"];

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(donation, 'donation in add donor submit');

    const { name } = donorData;
    const { date, amount, paymentMethod, frequency, duration } = donation;

    if (!name)
      return setAlert({ message: "נא למלא פרטי תורם", type: "error" });

    if (!date || !amount || !paymentMethod || !frequency)
      return setAlert({ message: "נא למלא פרטי תרומה", type: "error" });

    const endDate =
      frequency === "monthly" && duration
        ? addMonthsToDate(date, duration)
        : null;

    try {
      await Axios.post("http://localhost:5678/api/donors", {
        ...donorData,
        yahrzeitDate: yahrzeits,
        donationAmount: Number(amount),
        donationDate: date,
        paymentMethod,
        frequency,
        endDate
      });

      showAlert?.({ message: "התורם נוסף בהצלחה", type: "success" });
      onAdd();
      onClose();
      setActiveStep(0);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message,
        type: "error"
      });
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <DonorDetailsForm donorData={donorData} setDonorData={setDonorData} />;
      case 1:
        return <YahrzeitSection yahrzeits={yahrzeits} setYahrzeits={setYahrzeits} />;
      case 2:
        return <DonationSection donation={donation} setDonation={setDonation} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: 4,
            width: { xs: "90%", md: 600 },
            p: 2
          }
        }}>
        {/* סגירה */}
        <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
          <IconButton onClick={onClose}
            variant="iconButton">
            <CloseIcon color="error" />
          </IconButton>
        </DialogActions>

        {/* Stepper */}
        <DialogTitle>
          <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 0, overflowX: "hidden" }}>
            <Box sx={{ p: 3 }}>
              {renderStepContent()}
            </Box>
          </DialogContent>


          {/* ניווט */}
          <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
            <IconButton
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => prev - 1)}
            >
              <ArrowBackIcon />
            </IconButton>

            {activeStep < steps.length - 1 ? (
              <IconButton onClick={() => setActiveStep(prev => prev + 1)}>
                <ArrowForwardIcon />
              </IconButton>
            ) : (
              <Button type="submit" variant="activeButton" sx={{ px: 4 }}>
                שמור
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>

      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </>
  );
}

