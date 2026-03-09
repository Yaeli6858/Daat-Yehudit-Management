import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink, useLocation } from 'react-router-dom';


import useMediaQuery from '@mui/material/useMediaQuery';
export default function Header() {

  const location = useLocation()
  const isMobile = useMediaQuery("(max-width:600px)");


  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f7f7f7", // ⭐ רקע אפור בהיר
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // ⭐ הצללה עדינה
        paddingBottom: 1,
      }}
    >
      {/* לוגו */}
      {/* <Box
        component="img"
        src="/logo.jpg"
        alt="לוגו"
        sx={{
          display: "block",
          margin: "0 auto",
          maxWidth: "180px",
          paddingTop: "10px",
        }}
      /> */}


      {/* כותרת */}
      <Box
        component="h1"
        sx={{
          textAlign: "center",
          fontSize: isMobile ? "1.5rem" : "2rem", // ⭐ התאמה למובייל
          fontWeight: 500,
          color: "#333",
          marginTop: "10px",
          marginBottom: "10px",
          paddingTop: "40px",
        }}
      >
        אתר ניהול לכולל
      </Box>

      {/* טאבים */}
      <Tabs
        value={location.pathname}
        centered={!isMobile}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={false}
        sx={{
          "& .MuiTab-root": {
            color: "#555",
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "#b71c1c", // ⭐ אדום עדין
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#b71c1c", // ⭐ אדום עדין לפס התחתון
          },
        }}
      >
        <Tab label="תורמים" component={NavLink} to="/Donors" value="/Donors"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="הוצאות" component={NavLink} to="/Expenses" value="/Expenses"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="אברכים" component={NavLink} to="/Avrechim" value="/Avrechim"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="חלוקת מלגות" component={NavLink} to="/Milgot" value="/Milgot"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="סיכום פיננסי" component={NavLink} to="/FinanceSummary" value="/FinanceSummary"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="חובות" component={NavLink} to="/Debts" value="/Debts"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
        <Tab label="קישורים" component={NavLink} to="/Links" value="/Links"   style={({ isActive }) => ({ color: isActive ? "#b71c1c" : "#000",})}/>
      </Tabs>
    </Box>
  );
}


