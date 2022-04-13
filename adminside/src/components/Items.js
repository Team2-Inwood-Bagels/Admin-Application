import React, { useEffect, useState} from 'react'
import '../style/style.css'
import { GoPencil } from "react-icons/go";
import { GoTrashcan } from "react-icons/go";
import {db} from "../firebase";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {handleDelete} from "../firebase";


function Items() {
    const [items, setItems] = useState([])
    const [open, setOpen] = React.useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const DbGetMenu = async () => {
        const newItems = []
        const res = db.collection("Item")
        const data = await res.get()
        data.docs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            newItems.push({...doc.data(), id: doc.id})
        })
        setItems(items.concat(newItems))

    }
    useEffect(() => {
        DbGetMenu()
    }, []);
    

    return (
        <div className="container">
            <div className="item_container">
                {
                    items.map(((item, ind) =>
                            <div className="item_s" key={ind}>
                                <h5 className="item_name">{item.item_name} Price: ${item.item_price}
                                    <div className="editdltbtns">
                                        <button className="editItem">Edit Menu Item <GoPencil/></button>
                                        <button
                                            className="deleteItem"
                                            onClick={handleClickOpen}
                                        >
                                            Delete Menu Item
                                            <GoTrashcan/>
                                        </button>

                                    </div>                                    
                                </h5>
                                <h6 className="item_desc">{item.item_desc}</h6>
                            </div>
                    ))
                }
                <Dialog
                    open={open}
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
                        <Button
                            onClick={() => {
                               db.collection("Item").doc().delete().then(r => console.log("items.id"))
                                handleClose()
                            }}
                            style={{color: "red", fontWeight: "bold"}}
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )


}

export default Items
