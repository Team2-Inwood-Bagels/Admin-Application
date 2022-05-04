import React, {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Link, useHistory} from 'react-router-dom'
import {
    auth,
    registerWithEmailAndPassword,
} from '../firebase'
import "../style/style.css"
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import { spacing } from '@mui/system';


function CreateAccount() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [name, setName] = useState("")
    const [admin, loading, error] = useAuthState(auth)
    const [role, setRole] = useState("");
    const history = useHistory()


    const register = () => {
        if (!name) alert("Please enter name")
        if (password !== checkPassword) alert("password do not match")
        if(name && password === checkPassword){
            registerWithEmailAndPassword(name, email, role, password).then(r => console.log(admin))
        }
    };

    // useEffect(() => {
    //     if(loading) return
    //     if(admin) history.replace("/account")
    // })

    return (

        <div className={"createAccountDiv"}>
            <h1 className={"createAccount_header"}>Create Account</h1>
            <div className={"createAccount_fields"}>
               <div className={"createAccount_divTF"} >
                   <TextField
                      style={{margin: "20px"}}
                       type={"text"}
                       className={"createAccount_textField"}
                       label={"Enter Employee Name"}
                       onChange={(e) => {setName(e.target.value)}}
                       value={name}
                       placeholder={name}
                       variant={"outlined"}
                       required={true}
                       helperText={"Required field"}
                   />


                   <TextField
                       style={{margin: "20px"}}
                       type={"text"}
                       className={"createAccount_textField"}
                       label={"Enter Email Address"}
                       onChange={(e) => {setEmail(e.target.value)}}
                       placeholder={"e.g. john@gmail.com"}
                       variant={"outlined"}
                       required={true}
                       helperText={"Required field"}
                   />
               </div>
                <div className={"createAccount_divTF"}>
                    <TextField
                        style={{margin: "20px"}}
                        type={"password"}
                        className={"createAccount_textField"}
                        label={"Enter Password"}
                        onChange={(e) => {setPassword(e.target.value)}}
                        value={password}
                        placeholder={"Minimum of 8 characters"}
                        variant={"outlined"}
                        required={true}
                        helperText={"Required field"}
                    />

                   <TextField
                       style={{margin: "20px"}}
                       type={"password"}
                       className={"createAccount_textField"}
                       label={"Confirm Password"}
                       onChange={(e) => {setCheckPassword(e.target.value)}}
                       value={checkPassword}
                       placeholder={"Minimum of 8 characters"}
                       variant={"outlined"}
                       required={true}
                       helperText={"Required field"}
                   />
               </div>
                <div>
                 <FormControl className={"selectRole"}>
                     <InputLabel>Select Employee Role</InputLabel>
                     <Select
                         label={"Employee Role"}
                         value={role}
                         placeholder={"Select Employee Role"}
                         onChange={(e) => {setRole(e.target.value)}}
                         variant={"outlined"}
                     >
                         <MenuItem value={"Business Owner"}>Business Owner</MenuItem>
                         <MenuItem value={"Manager"}>Manager</MenuItem>
                         <MenuItem value={"Employee"}>Employee</MenuItem>
                     </Select>
                 </FormControl>
                </div>

                    <button
                        className={"createAccount_btn"}
                        onClick={register}
                    >
                        <Link to={"/account"}>Create Account</Link>
                    </button>
                <p>Already have an account? <Link to={"/signin"}>Sign in here</Link></p>
            </div>
        </div>

    )
}

export default CreateAccount;