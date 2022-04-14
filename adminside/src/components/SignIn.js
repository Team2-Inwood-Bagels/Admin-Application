import "../style/style.css"
import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, signInWithEmailAndPassword} from "../firebase";
import {Link, useHistory} from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [admin, loading, error] = useAuthState(auth)
    const history = useHistory()


    // useEffect(() => {
    //     if(loading) return
    //     if(admin) history.replace("/menu")
    // })

    return (

        <div className={"createAccountDiv"}>
            <h1 className={"createAccount_header"}>Sign In</h1>
            <div className={"signUp_wrapper"}>
                <div className={"row"}>
                    <div className={"column"}>
                        <div className={"colOne"}>
                            <p>E-mail Address <span>*</span></p>
                            <input
                                type="email"
                                className={"signUp_textBox"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                            />
                        </div>
                    </div>
                    <div className={"colTwo"}>
                        <p>Enter password <span>*</span></p>
                        <input
                            type="password"
                            className={"signUp_textBox"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                </div>
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