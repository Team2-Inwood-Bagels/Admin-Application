import React, {useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase";
import {useState} from "react";


function AdminAccount() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [admin, loading, error] = useAuthState(auth)

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
        <div>
            <div>
                <h1>Account</h1>
                <div>
                    Employee Name
                    <input
                        type={"text"}
                        value={name}
                        placeholder={name}
                        />
                </div>
                <div>
                    Email address:
                    <input
                        type={"text"}
                        value={email}
                        placeholder={email}
                        />
                </div>
                <div>
                    Employee Role
                    <input
                        type={"text"}
                        value={"Employee"}
                        placeholder={"Employee"}
                        />
                </div>
                <button>Update Account</button>
            </div>
        </div>
    )
}
export default AdminAccount;