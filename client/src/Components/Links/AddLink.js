import * as React from "react";
import { useState } from "react";
import CustomSnackbar from "../Alerts/CustomSnackbar";
import Axios from "axios";
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography, Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AddLink({ onAdd }) {

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(null);
    const [websitelink, setWebsitelink] = useState("");
    const [websiteName, setWebsiteName] = useState("");
    const [description, setDescription] = useState("");



    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const addLink = async (event) => {
        event.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:5678/api/links", { websiteName, websitelink, description });

            setAlert({ message: "הקישור נוסף בהצלחה ", type: "success" });
            setWebsiteName("");
            setWebsitelink("");
            setDescription("");
            onAdd();
            handleClose();
        } catch (error) {
            setAlert({
                message: error.response?.data?.message || error.message,
                type: "error",
            });
            console.error("Error adding link:", error);
        }
    };

    return (
        <>
            <React.Fragment>
                {/* כפתור פתיחה */}
                <Button
                    variant="addButton"
                    onClick={handleClickOpen}
                >
                    הוסף קישור חדש
                </Button>

                {/* דיאלוג */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            borderRadius: 4,
                            p: 2,
                            minWidth: 400,
                            bgcolor: "#fafafa",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
                        <IconButton
                            onClick={handleClose}
                            variant="iconButton">
                            <CloseIcon color="error" />
                        </IconButton>
                    </DialogActions>

                    <DialogTitle>
                        <Typography variant="h1" >
                            הוספת קישור חדש
                        </Typography>
                    </DialogTitle>

                    <form onSubmit={addLink}>
                        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
                                <TextField
                                    name="websiteName"
                                    label="שם אתר"
                                    value={websiteName}
                                    onChange={e => setWebsiteName(e.target.value)}
                                    required
                                    type="text"
                                />

                                <TextField
                                    name="websitelink"
                                    label="קישור לאתר"
                                    value={websitelink}
                                    onChange={e => setWebsitelink(e.target.value)}
                                    required
                                    type="text"
                                />


                                <TextField
                                    name="description"
                                    label="תיאור אתר"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    type="text"
                                />
                            </Box>
                        </DialogContent>

                        <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
                            <Button
                                variant="activeButton"
                                type="submit" >
                                הוסף קישור
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <CustomSnackbar alert={alert} setAlert={setAlert} />
            </React.Fragment>
        </>

    )
}
