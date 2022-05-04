import "../style/style.css"
import React, {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, signInWithEmailAndPassword} from "../firebase";
import {Link, useHistory} from "react-router-dom";
import {TextField} from "@material-ui/core";

function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [admin, loading, error] = useAuthState(auth)
    const history = useHistory()

    // useEffect(() => {
    //     if(loading) return
    //     if(admin) history.replace("/account")
    // })


    return (

        <div className={"createAccountDiv"}>
            <h1 className={"createAccount_header"}>Sign In</h1>
            <div className={"createAccount_divTF"} >
                <TextField
                    style={{margin: "20px"}}
                    type={"email"}
                    className={"createAccount_textField"}
                    label={"Enter Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={email}
                    variant={"outlined"}
                    required={true}
                    helperText={"Required field"}
                />


                <TextField
                    style={{margin: "20px"}}
                    type={"password"}
                    className={"createAccount_textField"}
                    label={"Enter Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={"Enter Password"}
                    variant={"outlined"}
                    required={true}
                    helperText={"Required field"}
                />
            </div>
            <div className={"below_textBox"}>
                <button
                    className={"createAccount_btn"}
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >
                    <Link to={"/menu"}>Sign In</Link>
                </button>

                <p>Don't have an account? <Link to={"/createaccount"}>Create one here</Link></p>
                <p>Forgot password? <Link to={"/resetpassword"}>Click here to reset.</Link></p>
            </div>
        </div>

    )
}
export default SignIn;

