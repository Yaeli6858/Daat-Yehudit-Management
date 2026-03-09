import React from 'react'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';
import DebtsList from '../Debts/DebtsList';
import ShowPaidDebts from '../Debts/ShowPaidDebts';
import AddDebt from '../Debts/AddDebt';

const DebtsPage = () => {

    // const [debtsList, setDebtsList] = useState([]);
    const [takenDebts, setTakenDebts] = useState([]);
    const [givenDebts, setGivenDebts] = useState([]);

  const [alert, setAlert] = useState(null);  
  const [showAll, setShowAll] = React.useState(false);


  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/debts");
      
      const takenData = data.filter(debt => debt.type === 'taken');
      const givenData = data.filter(debt => debt.type === 'given');
      setTakenDebts(takenData);      
      setGivenDebts(givenData);


      
      
      // setDebtsList(data);
    }
    catch (error) {
         setAlert({
                message: error.response?.data?.message || error.message,
                type: "error",
            });
            console.error(error);
    }
  }

  useEffect(() => {
    catchData();
  }, [])


  return (
    <>
        <Paper variant='mainPaper' >
          {/* כותרת הדף */}
          <Typography variant="h5">
            דף חובות
          </Typography>


          {/* כפתור הוספת הוצאה */}
          <Box sx={{width:'50%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <AddDebt onAdd={catchData}/>
              <ShowPaidDebts  showAll={showAll} setShowAll={setShowAll} />
          </Box>


          {/* טבלת הוצאות */}
          <DebtsList
            givenDebts={givenDebts}
            takenDebts={takenDebts}
            onChange={catchData}
            showAll={showAll}
          />

          {/* התראות הצלחה ומחיקה */}
                   {/* <CustomSnackbar alert={alert} setAlert={setAlert} /> */}
        </Paper>
    </>
  )
}

export default DebtsPage 