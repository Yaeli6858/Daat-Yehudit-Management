


import {
  Box, Typography, TextField, FormControl, InputLabel,
  Select, MenuItem, RadioGroup, Radio, FormControlLabel, Stack
} from '@mui/material';

export default function DonationSection({ donation, setDonation }) {

  const handleChange = field => e =>
    setDonation(prev => ({ ...prev, [field]: e.target.value })); 
  console.log(donation, 'donation in donation section');
  
  return (
    <Stack spacing={3} sx={{ minHeight: "400px" }}>

      {/* תאריך + סכום */}
      <Stack direction="row" spacing={2}>
        <TextField
          label="תאריך גביה"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={donation.date || ""}               
          onChange={handleChange("date")}
          fullWidth
        />

        <TextField
          label="סכום"
          type="number"
          value={donation.amount || ""}                
          onChange={handleChange("amount")}
          fullWidth
        />
      </Stack>

      {/* סוג תשלום */}
      <FormControl fullWidth>
        <InputLabel>סוג תשלום</InputLabel>
        <Select
          value={donation.paymentMethod || ""}
          onChange={handleChange("paymentMethod")}
          label="סוג תשלום"
        >
          <MenuItem value="מזומן">מזומן</MenuItem>
          <MenuItem value="נדרים פלוס">נדרים פלוס</MenuItem>
          <MenuItem value="Jgive">Jgive</MenuItem>
          <MenuItem value="חשבון בנק הלאומי">חשבון בנק הלאומי</MenuItem>
          <MenuItem value="חשבון דעת יהודית">חשבון דעת יהודית</MenuItem>
          <MenuItem value="חשבון משה וקסלר">חשבון משה וקסלר</MenuItem>
        </Select>
      </FormControl>

      {/* תדירות */}
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ mb: 1 }}>תדירות תרומה</Typography>

        <RadioGroup
          row
          value={donation.frequency || ""}
          onChange={handleChange("frequency")}
          sx={{ justifyContent: "center" }}
        >
          <FormControlLabel value="once" control={<Radio />} label="חד פעמי" />
          <FormControlLabel value="monthly" control={<Radio />} label="הוראת קבע" />
        </RadioGroup>

        {donation.frequency === "monthly" && (
          <TextField
            label="משך (בחודשים)"
            type="number"
            value={donation.duration || ""}
            onChange={handleChange("duration")}
            sx={{ mt: 2, maxWidth: 200, mx: "auto" }}
          />
        )}
      </Box>

    </Stack>
  );
}
