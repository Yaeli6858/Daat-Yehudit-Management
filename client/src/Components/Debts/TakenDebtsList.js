import React from "react";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, } from "@mui/material";
import DebtCard from "./DebtCard";
import { useEffect } from "react";

const TakenDebtsList = ({ fields, takenList, onChange, showAll, }) => {

  const [selectedDebt, setSelectedDebt] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const openDebtCard = (debt) => {
    console.log(debt, 'debt');
    setSelectedDebt(debt);
    console.log(selectedDebt, "selectedDebt");
    setOpen(true);
  };

  useEffect(() => {
  console.log(selectedDebt, "selectedDebt התעדכן!");
}, [selectedDebt]);

  return (
    <>
      {/* כותרת עליונה */}
      <Typography variant="h6">
        חובות שנלקחו ע"י הכולל
      </Typography>

      {/* מעטפת הטבלה */}
      <Table >
        {/* כותרות */}
        <TableHead>
          <TableRow>
            <TableCell align="center">?שולם</TableCell>
            {fields.map((field) => (
              <TableCell key={field.name} align="center">
                {field.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* גוף הטבלה */}
        <TableBody>
          {takenList.map((debt) =>
            !debt.paid || showAll ? (
              <TableRow key={debt._id} hover onClick={() => openDebtCard(debt)}
                sx={{ cursor: "pointer" }}>

                {/* תיבת סימון */}
                <TableCell align="center">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={debt.paid}
                      sx={{
                        color: "#b71c1c",
                        "&.Mui-checked": { color: "#b71c1c" },
                      }}
                    />
                  </div>
                </TableCell>

                {/* עמודות הדאטה */}
                {fields.map((field) => (
                  <TableCell key={field.name} align="center">
                    {(field.name === "dateBorrowed" || field.name === "dueDate") && debt[field.name] !== undefined
                      ? new Date(debt[field.name]).toLocaleDateString("he-IL")
                      : debt[field.name]}
                    {field.name === "amount" && "₪"}
                  </TableCell>
                ))}
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>

      {/* כרטיס פירוט חוב */}
      {selectedDebt && (
      <DebtCard
        debtDetails={selectedDebt}
        setOpen={setOpen}
        open={open}
        onChange={onChange}
      />)}
    </>

  )
};

export default TakenDebtsList;
