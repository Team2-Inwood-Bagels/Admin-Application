import React, {useEffect, useState} from "react";
import {db} from "../firebase";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton, InputLabel,
    MenuItem,
    Select, TextField
} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons";


function PickUpTime() {
    const [hour, setHour] = useState([])
    const [selectedId, setSelectedID] = useState()
    const [selectedTime, setSelectedTime] = useState("")
    const [open, setOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
        setAddOpen(false)

    };

    const handleDeleteOpen = () => {
        setOpen(true)
    }
    const handleAddOpen = () => {
        setAddOpen(true)
    }

    const getTime = async () => {
       db.collection("Time").onSnapshot((snapshot => {
            setHour(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        }))

    }

    const addTime = (e) => {
        e.preventDefault();
        db.collection("Time").add({
            time: selectedTime,
        });
        setSelectedTime("")
    }
    useEffect( () => {
        getTime()
    }, [])
    return(
        <div>
            {/*<h5>Change Pick Up Times Selection </h5>*/}
            <FormControl variant={"outlined"}  label={"Pick up time selection"} style={{width: "65%"}}>
                <InputLabel id={"time-label-id"}>Edit Pick Up Time Selections</InputLabel>
                <Select
                    onChange={(e) => setSelectedTime(e.target.value)}
                    value={hour.time}
                    labelId={"time-label-id"}
                    label={"Edit Pick Up Time Selections"}
                >
                    {
                        hour.sort((a,b) => a.time < b.time ? 1 : -1)
                            .map(({data, id})=> (
                            <MenuItem value={data.time}  key={id}>
                                <IconButton
                                    onClick={() => {
                                        handleDeleteOpen()
                                        // db.collection("Time").doc(id).delete()
                                        setSelectedID(id)
                                        console.log(id)
                                    }}
                                >
                                    <Delete/>
                                </IconButton>
                                {data.time}
                            </MenuItem>
                        ))
                    }
                    <IconButton onClick={() => {
                        handleAddOpen()
                    }}>
                       <MenuItem>
                           <Add style={{color: "blue"}}/> <p>Add Pick Up Times</p>
                       </MenuItem>
                    </IconButton>
                </Select>
            </FormControl>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete select pick up time from list"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once an item is deleted, it cannot be recovered. Are you sure
                        you want to delete this time?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => {
                        handleClose()
                        // deleteNotify()
                        db.collection("Time").doc(selectedId).delete()
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>






            <Dialog
                open={addOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add a new pick up time"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Add time in format of h:mm AM or PM
                    </DialogContentText>

                    <TextField
                        type={"text"}
                        variant={"outlined"}
                        label={"Add new time"}
                        onChange={(e) =>setSelectedTime(e.target.value)}
                        value={selectedTime}
                        placeholder={"i.e. 8:00 AM"}
                        style={{margin: "20px"}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose()
                    }}>Close</Button>
                    <Button onClick={addTime}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PickUpTime