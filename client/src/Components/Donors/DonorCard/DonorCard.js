// import { useState, useEffect } from 'react';
// import { Typography, Box, Dialog, DialogTitle, DialogContent, IconButton, Button } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import Axios from 'axios';
// import DonorDetailsEditable from './DonorDetailsEditable';
// import YahrzeitTable from './YahrzeitTable';
// import DonationTable from './DonationTable';
// import AddDonationForm from './AddDonationForm';
// import CustomSnackbar from "../../Alerts/CustomSnackbar";
// import YahrzeitSection from '../AddDonor/YahrzeitSection';
// import DonationSection from '../AddDonor/DonationSection';


// export default function DonorCard({ donor, setOpen, open, isOpen, onChange }) {
//   const [donations, setDonations] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);

//   const [isEditing, setIsEditing] = useState(false);
//   const [alert, setAlert] = useState(null);

//   const [donorData, setDonorData] = useState(donor);
//   const [newDonation, setNewDonation] = useState({
//   date: new Date().toISOString().split('T')[0],
//   amount: '',
//   paymentMethod: '',
//   frequency: '',
//   endDate: ''
// });

//   console.log(donations, 'donations in donor card');


//   useEffect(() => {
//     setDonorData(donor);
//   }, [donor]);

//   const getDonations = async () => {
//     if (!donor?._id) return;
//     try {
//       const { data } = await Axios.get(`http://localhost:5678/api/donors/${donor._id}/donations`);
//       setDonations(data);
//     } catch (error) {
//       setAlert({ message: error.response?.data?.message || error.message, type: "error" });
//     }
//   };

//   useEffect(() => {
//     if (isOpen) getDonations();
//   }, [isOpen, donor]);

//   const handleDeleteDonation = async (donationId) => {
//     try {
//       await Axios.delete(`http://localhost:5678/api/donors/${donor._id}/donations/${donationId}`);
//       getDonations();
//       setAlert({ message: 'התרומה נמחקה בהצלחה', type: "success" });
//     } catch (error) {
//       setAlert({ message: 'שגיאה במחיקת התרומה: ' + error.message, type: "error" });
//     }
//   };

//   const handleAddDonation = async () => {
//     try {
//       await Axios.post(`http://localhost:5678/api/donors/${donor._id}/donations`, newDonation);
//       setShowAddForm(false);
//       getDonations();
//       setAlert({ message: 'התרומה נוספה בהצלחה', type: "success" });
//     } catch (error) {
//       setAlert({ message: 'שגיאה בהוספת תרומה: ' + error.message, type: "error" });
//     }
//   };

//   const handleStopRecurringDonation = async (donationId) => {
//     try {
//       await Axios.patch(`http://localhost:5678/api/donors/${donor._id}/donations/${donationId}/stop`);
//       getDonations();
//       setAlert({ message: 'הוראת הקבע בוטלה בהצלחה', type: "success" });
//     } catch (error) {
//       setAlert({ message: 'שגיאה בביטול הוראת קבע: ' + (error.response?.data?.message || error.message), type: "error" });
//     }
//   };

//   const handleClose = () => {
//     setIsEditing(false);
//     setOpen(false);
//   };

//   const updateDonorDetails = async () => {
//     try {

//       await Axios.put(
//         `http://localhost:5678/api/donors/${donor._id}`,
//         donorData
//       );

//     if (newDonation.amount) {
//       const endDate =
//         newDonation.frequency === "monthly" && newDonation.duration
//           ? (() => {
//               const d = new Date(newDonation.date);
//               d.setMonth(d.getMonth() + Number(newDonation.duration));
//               return d.toISOString().split("T")[0];
//             })()
//           : null;

//       await handleAddDonation({
//         date: newDonation.date,
//         amount: Number(newDonation.amount),
//         paymentMethod: newDonation.paymentMethod,
//         frequency: newDonation.frequency,
//         endDate
//       });

//       // איפוס
//       setNewDonation({
//         date: new Date().toISOString().split('T')[0],
//         amount: '',
//         paymentMethod: '',
//         frequency: '',
//         duration: ''
//       });
//     }

//       setAlert({ type: "success", message: "פרטי התורם עודכנו בהצלחה" });
//       setTimeout(() => {
//         handleClose();
//       }, 1200);

//       onChange();
//     } catch (error) {
//       setAlert({ type: "error", message: "שגיאה בעדכון פרטי התורם" });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <Dialog open={isOpen} onClose={handleClose} PaperProps={{ sx: { width: "70%", } }}>
//         <DialogTitle>
//           טופס פרטי תורם

//           <Button
//             variant="activeButton"
//             onClick={isEditing ? updateDonorDetails : () => setIsEditing(true)}
//           >
//             {isEditing ? "שמירת עדכונים" : "עדכון פרטים"}
//           </Button>

//           <IconButton variant="iconButton" onClick={handleClose}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>
//           <DonorDetailsEditable
//             donorData={donorData}
//             setDonorData={setDonorData}
//             isEditing={isEditing}
//           />

//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" sx={{ p: 1 }}>יארצייטים</Typography>
//             {isEditing ? <YahrzeitSection yahrzeits={donorData?.yahrzeitDate || []}
//               setYahrzeits={(newYahrzeits) => setDonorData(prev => ({
//                 ...prev,
//                 yahrzeitDate: newYahrzeits
//               }))} /> : <YahrzeitTable yahrzeits={donorData?.yahrzeitDate || []} />}
//           </Box>

//           <Box sx={{ mt: 3 }}>
//             <DonationTable
//               donations={donations}
//               onDelete={handleDeleteDonation}
//               onStopRecurring={handleStopRecurringDonation}
//             />
//           </Box>

//           {!showAddForm && (
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//               <Button variant="contained" onClick={() => setShowAddForm(true)}>
//                 הוסף תרומה נוספת
//               </Button>
//             </Box>
//           )}

//           {showAddForm && (
//             <Box>
//               {/* <AddDonationForm
//                 onAdd={handleAddDonation}
//                 onCancel={() => setShowAddForm(false)}
//               /> */}
//               <DonationSection donation={newDonation} setDonation={setNewDonation} />
//             </Box>
//           )}
//         </DialogContent>
//       </Dialog>
//       <CustomSnackbar alert={alert} setAlert={setAlert} />
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { Typography, Box, Dialog, DialogTitle, DialogContent, IconButton, Button, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Axios from 'axios';
import DonorDetailsEditable from './DonorDetailsEditable';
import YahrzeitTable from './YahrzeitTable';
import DonationTable from './DonationTable';
import AddDonationForm from './AddDonationForm';
import CustomSnackbar from "../../Alerts/CustomSnackbar";
import YahrzeitSection from '../AddDonor/YahrzeitSection';
import DonationSection from '../AddDonor/DonationSection';

export default function DonorCard({ donor, setOpen, isOpen, onChange }) {

  const [donations, setDonations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [donorData, setDonorData] = useState(donor);

  // מבנה תרומה אחיד
  const [newDonation, setNewDonation] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    paymentMethod: '',
    frequency: '',
    duration: ''
  });

  useEffect(() => setDonorData(donor), [donor]);

  const getDonations = async () => {
    if (!donor?._id) return;
    const { data } = await Axios.get(
      `http://localhost:5678/api/donors/${donor._id}/donations`
    );
    setDonations(data);
  };

  useEffect(() => {
    if (isOpen) getDonations();
  }, [isOpen, donor]);

  const handleDeleteDonation = async (donationId) => {
    try {
      await Axios.delete(`http://localhost:5678/api/donors/${donor._id}/donations/${donationId}`);
      getDonations();
      setAlert({ message: 'התרומה נמחקה בהצלחה', type: "success" });
    } catch (error) {
      setAlert({ message: 'שגיאה במחיקת התרומה: ' + error.message, type: "error" });
    }
  };


  const handleStopRecurringDonation = async (donationId) => {
    try {
      await Axios.patch(`http://localhost:5678/api/donors/${donor._id}/donations/${donationId}/stop`);
      getDonations();
      setAlert({ message: 'הוראת הקבע בוטלה בהצלחה', type: "success" });
    } catch (error) {
      setAlert({ message: 'שגיאה בביטול הוראת קבע: ' + (error.response?.data?.message || error.message), type: "error" });
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
  };


  const buildDonationPayload = () => {
    const endDate =
      newDonation.frequency === "monthly" && newDonation.duration
        ? (() => {
          const d = new Date(newDonation.date);
          d.setMonth(d.getMonth() + Number(newDonation.duration));
          return d.toISOString().split("T")[0];
        })()
        : null;

    return {
      date: newDonation.date,
      amount: Number(newDonation.amount),
      paymentMethod: newDonation.paymentMethod,
      frequency: newDonation.frequency,
      endDate
    };
  };

  const updateDonorDetails = async () => {
    try {
      //  עדכון תורם
      await Axios.put(
        `http://localhost:5678/api/donors/${donor._id}`,
        donorData
      );

      //  הוספת תרומה אם מולאה
      console.log(newDonation, 'newDonation before adding');

      if (newDonation.amount) {
        await Axios.post(
          `http://localhost:5678/api/donors/${donor._id}/donations`,
          buildDonationPayload()
        );
        console.log(newDonation, 'newDonation after adding');


        setNewDonation({                 //  איפוס
          date: new Date().toISOString().split('T')[0],
          amount: '',
          paymentMethod: '',
          frequency: '',
          duration: ''
        });
      }

      setAlert({ type: "success", message: "הנתונים עודכנו בהצלחה" });
      getDonations();
      onChange();
      setTimeout(() => setOpen(false), 1200);

    } catch {
      setAlert({ type: "error", message: "שגיאה בעדכון הנתונים" });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen} onClose={() => setOpen(false)} PaperProps={{ sx: { width: "70%" } }}>
        <DialogTitle>
          טופס פרטי תורם
          <Button
            variant="activeButton"
            onClick={isEditing ? updateDonorDetails : () => setIsEditing(true)}
          >
            {isEditing ? "שמירת עדכונים" : "עדכון פרטים"}
          </Button>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>

          <DonorDetailsEditable
            donorData={donorData}
            setDonorData={setDonorData}
            isEditing={isEditing}
          />

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ p: 1 }}>יארצייטים</Typography>
            {isEditing ? <YahrzeitSection yahrzeits={donorData?.yahrzeitDate || []}
              setYahrzeits={(newYahrzeits) => setDonorData(prev => ({
                ...prev,
                yahrzeitDate: newYahrzeits
              }))} /> : <YahrzeitTable yahrzeits={donorData?.yahrzeitDate || []} />}
          </Box>

          <DonationTable donations={donations} onStopRecurring={handleStopRecurringDonation} onDelete={handleDeleteDonation} />

          {showAddForm && (
            <Paper variant='tablePaper' sx={{ height: "300px", width: "94%", marginTop: "20px" }}>
              <DonationSection
                donation={newDonation}
                setDonation={setNewDonation}
              />
            </Paper>
          )}

          {!showAddForm && isEditing && (
            <Button variant='activeButton' sx={{ marginTop: "20px" }} onClick={() => setShowAddForm(true)}>
              הוסף תרומה נוספת
            </Button>
          )}

        </DialogContent>
      </Dialog>

      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </>
  );
}
