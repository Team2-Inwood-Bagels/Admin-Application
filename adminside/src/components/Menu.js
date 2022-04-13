import "../style/style.css"
import React, {useEffect, useState} from 'react'
import {addTime, db} from "../firebase"
import {Link} from "react-router-dom";
import Meals from "./Meals";


function Menu(){
    const [menu, setMenu] = useState([])
    const [time, setTime] = useState([])
    const [hour,setHour] = useState("")
    const [loading, setLoading] = useState(true)
    const DbGetMenu = async () => {
        const newItems = []
        const res = db.collection("Menu")
        const data = await res.get()
        data.docs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            newItems.push(doc.data())
        })
        setMenu(menu.concat(newItems))
    }
    const resetInput = () => {
        setHour("");
    }
    const addNewTime  = () => {
        addTime(hour).then(r => console.log(hour));
        resetInput();
    }

    const getTime = async () => {
        const newTime = []
        const timeRes = db.collection("Time")
        const data = await timeRes.get()
        data.docs.forEach((doc) => {
            newTime.push(doc.data())
        })
        setTime(time.concat(newTime))
    }
    useEffect(() => {
        DbGetMenu()
        getTime()
    }, []);

    return(
        <div className="menu_container">
            <div className={"timeSection"}>
               <div className={"selectTime"}>
                   <h5>Current pick-up times</h5>
                   {
                       <select className={"selectBody"}>
                           {
                               time.map((clock, id) => (
                                   <option value={clock.time}>{clock.time}</option>
                               ))
                           }
                       </select>
                   }
               </div>
                <div className={"addTime"}>
                    <h5>Add new pick-up times</h5>
                    <input
                        type={"text"}
                        className={"addTime_textbox"}
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        placeholder="Example: 8:00 AM"
                    />
                    <button onClick={addNewTime}  className={"timeButton"}><Link to={"/menu"}>Add Time</Link></button>
                </div>

            </div>
            <div>
                <Meals/>
            </div>

        </div>
    )
}
export default Menu