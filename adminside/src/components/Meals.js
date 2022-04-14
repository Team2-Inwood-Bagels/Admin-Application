import React, {useEffect, useState} from "react";
import {db} from "../firebase";
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab
} from "@material-ui/core";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function Meals() {

    const [item, setItem] = useState([])
    const [value, setValue] = React.useState('1')
    const [cream, setCream] = useState([])
    const [bagels, setBagels] = useState([])
    const [open, setOpen] = React.useState(false)
    const [selectedItem, setSelectedItem] = useState();
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [name, setName] = useState("");
    const addNotify = () => toast.success("Item successfully added to menu.", {
        icon: "🥯"
    })

    const deleteNotify = () => toast.warn("Item successfully deleted from menu.")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getBagels = async () => {
        db.collection("Bagels").onSnapshot((snapshot => {
            setBagels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        }));
        console.log({bagels})
    }
    const getBreakSand = async () => {
        db.collection("Breakfast Sandwiches").onSnapshot((snapshot => {
            setItem(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        }));
        console.log({item})
    }
    const getCream = async () => {
        db.collection("Cream Cheese").onSnapshot((snapshot => {
            setCream(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        }));
        console.log({cream})
    }
    const bagelsSubmit = (e) => {
        e.preventDefault();
        db.collection("Bagels").add({
            name: name,
        });
        setName("");
    }
    const breakSandwichSubmit = (e) => {
        e.preventDefault();
        db.collection("Breakfast Sandwiches").add({
            Name: name,
            Description: description,
            Price: price,
        });
        setName("");
        setDescription("");
        setPrice("");
    }
    const creamSubmit = (e) => {
        e.preventDefault();
        db.collection("Cream Cheese").add({
            name: name,
            Description: description,
            Price: price,
        });
        setName("");
        setDescription("");
        setPrice("");
    }


    useEffect(() => {
        getBreakSand()
        getCream()
        getBagels()
    }, [])


    return(
        <div className={"mealsMain_container"}>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Bagels" value="1" />
                            <Tab label="Cream Cheese" value="2" />
                            <Tab label="Breakfast Sandwiches" value="3" />
                        </TabList>
                    </Box>

                   <TabPanel value={"1"}>
                       <div className={"addNewItems"}>
                           <input
                               type={"text"}
                               placeholder={"Item's Name"}
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                           />
                           {/*<input*/}
                           {/*    type={"text"}*/}
                           {/*    placeholder={"Item's description"}*/}
                           {/*    value={description}*/}
                           {/*    onChange={(e) => setDescription(e.target.value)}*/}
                           {/*/>*/}
                           {/*<input*/}
                           {/*    type={"text"}*/}
                           {/*    placeholder={"Item's price"}*/}
                           {/*    value={price}*/}
                           {/*    onChange={(e) => setPrice(e.target.value)}*/}
                           {/*/>*/}
                           <button className={"addButton"} onClick={(event) => {
                               bagelsSubmit(event);
                               addNotify()
                           }}>Add new a new bagel</button>
                           <ToastContainer/>

                       </div>
                   </TabPanel>

                    <TabPanel value={"2"}>
                        <div className={"addNewItems"}>
                            <input
                                type={"text"}
                                placeholder={"Item's Name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {/*<input*/}
                            {/*    type={"text"}*/}
                            {/*    placeholder={"Item's description"}*/}
                            {/*    value={description}*/}
                            {/*    onChange={(e) => setDescription(e.target.value)}*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    type={"text"}*/}
                            {/*    placeholder={"Item's price"}*/}
                            {/*    value={price}*/}
                            {/*    onChange={(e) => setPrice(e.target.value)}*/}
                            {/*/>*/}
                            <button className={"addButton"} onClick={(event) => {
                                creamSubmit(event);
                                addNotify();
                            }}>Add a new Cream Cheese</button>
                            <ToastContainer/>
                        </div>
                    </TabPanel>

                    <TabPanel value={"3"}>
                        <div className={"addNewItems"}>
                            <input
                                type={"text"}
                                placeholder={"Item's Name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type={"text"}
                                placeholder={"Item's description"}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <input
                                type={"text"}
                                placeholder={"Item's price"}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <button className={"addButton"} onClick={(event) => {
                                breakSandwichSubmit(event)
                                addNotify();
                            }}>Add new Breakfast Sandwich</button>
                            <ToastContainer/>
                        </div>
                    </TabPanel>

                    <div className={"meals_container"} >
                        {
                            item.map(({data, id}) => (
                                <TabPanel value={"3"}>
                                    <Card style={{backgroundColor: "#3D3D3D", color:"white", borderRadius: "20px"}} className={"customCard"} key={id}>
                                        <p>{data.Name}</p>
                                        <p>{data.Description}</p>
                                        <p>Cost: {data.Price}</p>
                                        <button className={"deleteButton"} onClick={() => {
                                            handleClickOpen()
                                            setSelectedItem(id)
                                            // db.collection("Breakfast Sandwiches").doc(id).delete()
                                        }}>Delete Item</button>
                                    </Card>
                                </TabPanel>

                            ))
                        }
                        {
                            cream.map(({data, id}) => (
                                <TabPanel value={"2"}>
                                    <Card style={{backgroundColor: "#3D3D3D", color:"white", borderRadius: "20px"}} className={"customCard"} key={id}>
                                        <p>{data.name}</p>
                                        {/*<p>{data.Description}</p>*/}
                                        {/*<p>Cost: {data.Price}</p>*/}
                                        <button className={"deleteButton"} onClick={() => {
                                            handleClickOpen()
                                            setSelectedItem(id)
                                            // db.collection("Breakfast Sandwiches").doc(id).delete()
                                        }}>Delete Item</button>
                                    </Card>
                                </TabPanel>

                            ))
                        }
                        {
                            bagels.map(({data, id}) => (
                                <TabPanel value={"1"} >
                                    <Card style={{backgroundColor: "#3D3D3D", color:"white", borderRadius: "20px"}} className={"customCard"} key={id}>
                                        <p>{data.name}</p>
                                        {/*<p>{data.Description}</p>*/}
                                        {/*<p>Cost: {data.Price}</p>*/}
                                        <button className={"deleteButton"} onClick={() => {
                                            handleClickOpen()
                                            setSelectedItem(id)
                                            // db.collection("Breakfast Sandwiches").doc(id).delete()
                                        }}>Delete Item</button>
                                    </Card>
                                </TabPanel>

                            ))
                        }
                    </div>
                </TabContext>
            </Box>
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
                            handleClose()
                            db.collection("Breakfast Sandwiches").doc(selectedItem).delete()
                            db.collection("Bagels").doc(selectedItem).delete()
                            db.collection("Cream Cheese").doc(selectedItem).delete()
                            deleteNotify()

                        }}

                        style={{color: "red", fontWeight: "bold"}}
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Meals;
