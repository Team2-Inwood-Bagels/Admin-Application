import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, sendPasswordResetEmail } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function ResetPassword() {
    const [email, setEmail] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const history = useHistory()

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return
        }
        if (user) history.replace("/menu")

    }, [user, loading])

    return (
        <div className="adminresetpassword">
            <div className="adminpassword_container">
                <h1> Admin Reset Password </h1>
                <div className='admin_box'>
                    <div className='adminresetpassword_details'>
                        <div className='employee_name'>
                            Enter Employee Name
                            <input
                                type="text"
                                className='employeename_textBox'
                                placeholder='Enter Employee Name'
                            />
                        </div>
                        <div className='adminemail'>
                            Email Address
                            <input
                                type="text"
                                className="adminemail_textBox"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your e-mail Address"
                            />
                        </div>
                    </div>
                    <div className='adminresetpassword_box'>
                        <div className='admin_newpassword'>
                            Enter new password *
                            <input
                                type="text"
                                className='employeepswrd_textBox'
                                placeholder='Enter New Password'
                            />
                        </div>
                        <div className='admin_reenter_newpassword'>
                            Re-Enter new password *
                            <input
                                type="text"
                                className='employee_reenter_textBox'
                                placeholder='Re-Enter New Password'
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="admin_resetpswrd_submit_btn"
                    type='button'
                    active
                    onClick={() => sendPasswordResetEmail(email)}
                >
                    Reset Password
                </button>
            </div>
        </div>
    )
}

export default ResetPassword