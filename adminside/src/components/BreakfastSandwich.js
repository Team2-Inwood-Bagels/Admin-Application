import React, {useEffect, useState} from "react";
import {db} from "../firebase";
import brioche from '../images/Pictures/Ultimate Bacon Egg and Cheese on a Brioche.JPG'
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";



function BreakfastSandwich() {
    const [sandwich, setSandwich] = useState([])
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [getName, setGetName] = useState("")
    const [getPrice, setGetPrice] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [getDescription, setGetDescription] = useState("")
    const [selectedItem, setSelectedItem] = useState();
    const [disable, setDisable] = useState(true)

    const ifEmpty = () => {
        (name && price) ?  setDisable(false) : setDisable(true);
    }

    const addNotify = () =>toast.info('🥯 New Item Added!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    const deleteNotify = () => toast("Deleted item");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDeleteOpen(false)
        setEditOpen(false);
    };

    const handleEditOpen = () => {
        setEditOpen(true)
    }
    const handleDeleteOpen = () => {
        setDeleteOpen(true)
    }

    const getSandwiches = async () => {
        db.collection("Breakfast Sandwiches").onSnapshot((snapshot => {
            setSandwich(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        }))
    }

    const addNewSand = (e) => {
        e.preventDefault();
        db.collection("Breakfast Sandwiches").add({
            Name: name,
            Price: price,
            Description: description,
        });
        setName("");
        setPrice("");
        setDescription("")
    }


    useEffect(() => {
        getSandwiches()

    }, [])

    return(
        <div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div>
                <TextField
                    required={true}
                    helperText={"Required Field"}
                    type={"text"}
                    variant={"outlined"}
                    className={"addNewItem"}
                    label={"Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value.trim())}
                    placeholder={"Name of bagel"}
                    style={{marginBottom: "30px", marginTop: "20px", marginRight: "20px", marginLeft: "20px"}}
                />
                <TextField
                    type={"text"}
                    variant={"outlined"}
                    label={"Description"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value.trim())}
                    placeholder={"Add Price"}
                    style={{marginBottom: "30px", marginTop: "20px", marginRight: "20px", marginLeft: "20px"}}
                />
                <TextField
                    required={true}
                    helperText={"Required Field"}
                    type={"number"}
                    InputProps={{
                        startAdornment: "$"
                    }}
                    variant={"outlined"}
                    label={"Price"}
                    value={price}
                    onChange={(e) => setPrice(e.target.value.trim())}
                    placeholder={"Price of bagel"}
                    style={{marginBottom: "30px", marginTop: "20px", marginRight: "20px", marginLeft: "20px"}}
                />
                <button
                    title={"Name and price fields can not be empty"}
                    disabled={!price}
                    className={"addButton"}
                    onClick={(event) => {
                        addNewSand(event);
                        addNotify()

                    }}
                    style={{ cursor: "pointer"}}
                >
                    Add A New Sandwich
                </button>

            </div>

            <div className={"cards"}>
                {
                    sandwich.map(({data, id}) => (

                            <Card style={{backgroundColor: "#FFF", color:"#000", borderRadius: "20px", boxShadow: "2px 2px 2px 2px lightgrey"}} className={"menuCard"} key={id}>
                               <div className={"cardInfo"}>
                                   <h5 className={"card_header"}>{data.Name}</h5>
                                   <p className={"card_descrip"}>{data.Description}</p>
                                   <p className={"card_cost"}>Cost: ${data.Price}</p>
                                   <Button onClick={() => {
                                       handleClickOpen()
                                       setSelectedItem(id)
                                       setGetName(data.Name)
                                       setGetPrice(data.Price)
                                       setGetDescription(data.Description)
                                   }} style={{color: "blue"}}>Update Item</Button>
                               </div>
                                <div className={"cardImage"}>
                                    <img src={brioche} width={"100px"}/>
                                </div>
                            </Card>
                    ))
                }
            </div>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit or delete menu item"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Click edit to edit item or delete to delete item
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditOpen}>Edit Item</Button>
                    <Button onClick={handleDeleteOpen} style={{color: "red"}}>Delete Item</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={editOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit " + getName + " details"}
                </DialogTitle>
                <DialogContent>
                   <TextField
                       type={"text"}
                       variant={"outlined"}
                       label={"Name"}
                       onChange={(e) =>setGetName(e.target.value)}
                       value={getName}
                       placeholder={getName}
                       style={{margin: "20px"}}
                   />

                    <TextField
                        InputProps={{
                            startAdornment: "$"
                        }}
                        type={"number"}
                        variant={"outlined"}
                        label={"Price"}
                        value={getPrice}
                        onChange={(e) =>{setGetPrice(e.target.value)}}
                        placeholder={getPrice}
                        style={{margin: "20px"}}
                    />

                    <TextField
                        type={"text"}
                        variant={"outlined"}
                        label={"Description"}
                        onChange={(e) =>{setGetDescription(e.target.value)}}
                        value={getDescription}
                        placeholder={getDescription}
                        style={{margin: "20px"}}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose()
                       db.collection("Breakfast Sandwiches").doc(selectedItem).update({
                           Name: getName,
                           Price: getPrice,
                           Description: getDescription,
                       })
                        console.log(getName, " has been updated")
                    }}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete " + getName + " from menu"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once an item is deleted, it cannot be recovered. Are you sure
                        you want to delete this item from the menu?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => {
                        handleClose()
                        deleteNotify()
                        db.collection("Breakfast Sandwiches").doc(selectedItem).delete()
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BreakfastSandwich