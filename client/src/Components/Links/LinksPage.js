import React, { use } from 'react'
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { TableCell, TableRow, Table, Card, Typography, Paper, TableHead } from '@mui/material';
import AddLink from './AddLink';
import { Link } from 'react-router-dom';
import DeleteDialog from '../GeneralConponents/DeleteDialog';
import CustomSnackbar from '../Alerts/CustomSnackbar';


const LinksPage = () => {

    const [linksList, setLinksList] = useState([])
    const [alert, setAlert] = useState(null);


    const catchData = async () => {
        const { data } = await Axios.get("http://localhost:5678/api/links");
        setLinksList(data);
    }

    useEffect(() => {
        catchData()
    }, [])

    const deleteLink = async (id) => {
        try {
            await Axios.delete(`http://localhost:5678/api/links/${id}`);
            setAlert({ message: "הקישור נמחק בהצלחה 🗑️", type: "success" });
            catchData();
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };

    return (
        <>
            <Paper variant="mainPaper" >
                <Typography variant="h5">  קישורים שימושיים </Typography>
                <AddLink onAdd={catchData} />

                <Paper variant='tablePaper'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>מחיקה </TableCell>
                                <TableCell>לאתר</TableCell>
                            </TableRow>
                        </TableHead>
                        {linksList.map((link) => (
                            <TableRow>
                                <TableCell><DeleteDialog deleteFunc={deleteLink} itemId={link._id} /></TableCell>
                                <TableCell><a href={link.websitelink} target="_blank"><img src={`${link.websiteName}.png`} alt={link.websiteName} style={{ maxWidth: '100px', maxHeight: '50px' }} /></a></TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </Paper>
            </Paper >
            <CustomSnackbar alert={alert} setAlert={setAlert} />
        </>
    )
}

export default LinksPage