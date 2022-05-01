import React, {useEffect, useState} from "react";
import {addTime, db} from "../firebase";

function Time() {
    const [times, setTime] = useState([])
    // const [hour,setHour] = useState("")
    const [checked, setChecked] = useState("")
    const resetInput = () => {
        // setHour("");
    }
    const addNewTime  = () => {
        // addTime(hour).then(r => console.log(hour));
        resetInput();
    }

    // const getCream = async () => {
    //     db.collection("Cream Cheese").onSnapshot((snapshot => {
    //         setCream(
    //             snapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 data: doc.data(),
    //             }))
    //         )
    //     }))
    // }

    const getTime = async () => {
       db.collection("Time").get().then((querySnapshot) => {
           querySnapshot.forEach(element => {
               let data = element.data();
               setTime(arr => [...arr, data]);
           })
       })

        // db.collection("Time").onSnapshot((snapshot => {
        //     setTime(
        //         snapshot.docs.map((doc) => ({
        //             id:doc.id,
        //             data: doc.data()
        //         }))
        //     )
        // }))

    }

    useEffect(() => {
        getTime()
    }, []);

    return(
        <div className={"timeSection"}>
            {/*<div className={"selectTime"}>*/}
            {/*    <h5>Current pick-up times</h5>*/}
            {/*    {*/}
            {/*        <select className={"selectBody"}>*/}
            {/*            {*/}
            {/*                time.map((clock, id) => (*/}
            {/*                    <option value={clock.time}>{clock.time}</option>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </select>*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<div className={"addTime"}>*/}
            {/*    <h5>Add new pick-up times</h5>*/}
            {/*    <input*/}
            {/*        type={"text"}*/}
            {/*        className={"addTime_textbox"}*/}
            {/*        value={hour}*/}
            {/*        onChange={(e) => setHour(e.target.value)}*/}
            {/*        placeholder="Example: 8:00 AM"*/}
            {/*    />*/}
            {/*    <button onClick={addNewTime}  className={"timeButton"}><Link to={"/menu"}>Add Time</Link></button>*/}
            {/*</div>*/}

            <div>

                    {
                        <select className={"selectBody"}>
                            {
                                times.map((clock, id) => (
                                    <option value={id}>{clock.time}</option>
                                ))
                            }
                        </select>
                    }

            </div>





            <div>
                <button>Add new time </button>
            </div>

        </div>
    )

}

export default Time