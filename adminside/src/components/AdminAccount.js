import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase";
import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";


function AdminAccount() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [admin, loading, error] = useAuthState(auth)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateUser = () => {

        db.collection("Admin").doc(admin.uid).update({
            email: email,
            name: name,
            role: role,
        }).then(r => {console.log(admin.uid + " has been updated")})
        console.log(admin)
    }
    const history = useHistory()

    const fetchAdmin = async () => {
        try{
            const query = await db
                .collection("Admin")
                .where("uid", "==", admin?.uid)
                .get();
            const data = await query.docs[0].data();

            setName(data.name);
            setEmail(data.email);
            setRole(data.role);
        }catch (error) {
            console.error(error);
            alert("An error has occurred while fetching the user's data")
        }
    };

    useEffect(() => {
        if(loading) return;
        if(!admin) return history.replace("/");
        fetchAdmin();
    }, [admin, loading])
    return(
        <div className={"accountPage"}>
            <div>
                <h1>Account</h1>
                <div className={"textField"}>
                    <TextField
                        type={"text"}
                        className={"profileText"}
                        label={"Employee Name"}
                        value={name}
                        placeholder={name}
                        disabled={true}
                        variant={"outlined"}
                    />
                </div>
                <div className={"textField"}>
                    <TextField
                        type={"email"}
                        className={"profileText"}
                        label={"Email"}
                        value={email}
                        placeholder={email}
                        disabled={true}
                        variant={"outlined"}
                    />
                </div>
                <div className={"textField"}>
                    <TextField
                        type={"text"}
                        className={"profileText"}
                        label={"Employee Role"}
                        value={role}
                        placeholder={"Employee"}
                        disabled={true}
                        variant={"outlined"}
                    />
                </div>
                <button className={"updateButton"} onClick={handleClickOpen}>Update Account</button>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Account Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Update name, email and/or employee role and click save.
                    </DialogContentText>
                    <div className={"textField"}>
                        <TextField
                            type={"text"}
                            className={"editText"}
                            label={"Employee Name"}
                            onChange={(e) => {setName(e.target.value)}}
                            value={name}
                            placeholder={name}
                            variant={"outlined"}
                        />
                    </div>
                    <div className={"textField"}>
                        <TextField
                            type={"email"}
                            className={"editText"}
                            label={"Email"}
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            placeholder={email}
                            variant={"outlined"}
                        />
                    </div>
                    <div className={"textField"}>
                        <TextField
                            type={"text"}
                            className={"editText"}
                            label={"Employee Role"}
                            value={role}
                            onChange={(e) => {setRole(e.target.value)}}
                            placeholder={"Employee"}
                            variant={"outlined"}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >Cancel</Button>
                    <Button onClick={() => {
                        updateUser()
                        handleClose()
                    }} >Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AdminAccount;