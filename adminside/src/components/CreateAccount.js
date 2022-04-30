import React, {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Link, useHistory} from 'react-router-dom'
import {
    auth,
    registerWithEmailAndPassword,
} from '../firebase'
import "../style/style.css"

function CreateAccount() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [name, setName] = useState("")
    const [admin, loading, error] = useAuthState(auth)
    const history = useHistory()

    const register = () => {
        if (!name) alert("Please enter name")
        if (password !== checkPassword) alert("password do not match")
        registerWithEmailAndPassword(name, email, password).then(r => console.log(admin))
    };

    // useEffect(() => {
    //     if(loading) return
    //     if(admin) history.replace("/account")
    // })

    return (

        <div className={"createAccountDiv"}>
            <h1 className={"createAccount_header"}>Create Account</h1>
            <div className={"signUp_wrapper"}>
                <div className={"row"}>
                    <div className={"column"}>
                        <div className={"colOne"}>
                            <p>Enter Employee Name <span className={"star"}>*</span></p>
                            <input
                                type={"text"}
                                className={"signUp_textBox"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                            />

                            <p>E-mail Address <span className={"star"}>*</span></p>
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
                        <p>Enter password <span className={"star"}>*</span></p>
                        <input
                            type="password"
                            className={"signUp_textBox"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />

                        <p>Re-Enter password <span>*</span></p>
                        <input
                            type="password"
                            className={"signUp_textBox"}
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.target.value)}
                            placeholder="Re-enter Password"
                        />
                    </div>
                </div>
            </div>
            <div className={"below_textBox"}>
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