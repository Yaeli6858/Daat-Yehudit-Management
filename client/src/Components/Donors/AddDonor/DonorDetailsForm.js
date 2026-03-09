
import { Box, TextField } from '@mui/material';

export default function DonorDetailsForm({ donorData, setDonorData }) {
  const handleChange = (field) => (e) => setDonorData({ ...donorData, [field]: e.target.value });

  return (
    <Box
      sx={{
        minHeight: "400px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 2,
        boxSizing: "border-box"
      }}
    >
      <TextField label="ת.ז" value={donorData.donorId || ""} onChange={handleChange("donorId")} fullWidth />
      <TextField label="שם" value={donorData.name || ""} onChange={handleChange("name")} required fullWidth />
      <TextField label="פלאפון" value={donorData.phoneNumber || ""} onChange={handleChange("phoneNumber")} fullWidth type='number' inputMode="numeric" pattern="[0-9]*"/>

      <TextField label="כתובת" value={donorData.address || ""} onChange={handleChange("address")} fullWidth />
      <TextField label="וואצאפ" value={donorData.whatsappNumber || ""} onChange={handleChange("whatsappNumber")} fullWidth />

      <TextField label="מייל" value={donorData.emailAddress || ""} onChange={handleChange("emailAddress")} fullWidth />

      <TextField type="date" label="תאריך לידה" InputLabelProps={{ shrink: true }} value={donorData.birthDate || ""} onChange={handleChange("birthDate")} fullWidth />

    </Box>
  );
}

