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
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function CreamCheese() {
    const [cream, setCream] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [getName, setGetName] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [selectedItem, setSelectedItem] = useState();
    const [disable, setDisable] = useState(true)

    const ifEmpty = () => {
        (name) ?  setDisable(false) : setDisable(true);
    }

    const addNotify = () =>toast.info('🥯 New Item Added!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    const deleteNotify = () => toast.info('Deleted Item!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });


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
    const getCream = async () => {
        db.collection("Cream Cheese").onSnapshot((snapshot => {
            setCream(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        }))
    }
    const addNewCream = (e) => {
        e.preventDefault();
        db.collection("Cream Cheese").add({
            name: name,
            // price: price,
        });
        setName("");
        // setPrice("");
    }


    useEffect(() => {
        getCream()
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
                    type={"text"}
                    variant={"outlined"}
                    className={"addNewItem"}
                    label={"Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"Name of bagel"}
                    style={{marginBottom: "30px", marginTop: "20px", marginRight: "20px", marginLeft: "20px"}}
                />
                {/*<TextField*/}
                {/*    type={"text"}*/}
                {/*    variant={"outlined"}*/}
                {/*    label={"Price"}*/}
                {/*    value={price}*/}
                {/*    onChange={(e) => setPrice(e.target.value)}*/}
                {/*    placeholder={"Price of bagel"}*/}
                {/*    style={{marginBottom: "30px", marginTop: "20px", marginRight: "20px", marginLeft: "20px"}}*/}
                {/*/>*/}
                <button
                    disabled={!name}
                    className={"addButton"}
                    onClick={(event) => {
                        addNewCream(event);
                        addNotify()
                    }}
                >
                    Add A New Bagel
                </button>

            </div>

            <div className={"cards"}>
                {
                    cream.map(({data, id}) => (

                        <Card style={{backgroundColor: "#FFF", color:"#000", borderRadius: "20px", boxShadow: "2px 2px 2px 2px lightgrey"}} className={"menuCard"} key={id}>
                            <div className={"cardInfo"}>
                                <h5 className={"card_header"}>{data.name}</h5>
                                {/*<p className={"card_descrip"}>{data.Description}</p>*/}
                                {/*<p className={"card_cost"}>Cost: {data.Price}</p>*/}

                                <Button onClick={() => {
                                    handleClickOpen()
                                    setSelectedItem(id)
                                    setGetName(data.name)
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
                    {"Edit or delete item from menu"}
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
                    {"Edit Item"}
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


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose()
                        db.collection("Cream Cheese").doc(selectedItem).update({
                            name: getName,
                            // Price: getPrice,
                            // Description: getDescription,
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
                    {"Delete item from menu"}
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
                        db.collection("Cream Cheese").doc(selectedItem).delete()
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default CreamCheese