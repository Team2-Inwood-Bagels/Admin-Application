import "../style/style.css"
import React, {useEffect, useState} from 'react'
import {addTime, db} from "../firebase"
import BreakfastSandwich from "./BreakfastSandwich";
import Time from "./Time";
import Bagels from "./Bagels";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import CreamCheese from "./CreamCheese";
import {ToastContainer} from "material-react-toastify";



function Menu(){
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)
    const DbGetMenu = async () => {
        const newItems = []
        const res = db.collection("Menu")
        const data = await res.get()
        data.docs.forEach((doc) => {
            newItems.push(doc.data())
        })
        setMenu(menu.concat(newItems))
    }
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        DbGetMenu()
    }, []);

    return(
        <div className="menu_container">
            <div className={"menus"}>
                {/*<Meals/>*/}
                <FormControl
                    variant={"outlined"}
                >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"Breakfast Sandwiches"}
                        onChange={handleChange}

                    >
                        <MenuItem value={"Breakfast Sandwiches"} className={"menuTitleSelectList"} ><a href={"#breakSandwiches"}>Breakfast Sandwiches</a></MenuItem>
                        <MenuItem value={"Bagels"} className={"menuTitleSelectList"}><a href={"#bagels"}>Bagels</a></MenuItem>
                        <MenuItem value={"Cream Cheese"} className={"menuTitleSelectList"}><a href={"#creamcheese"}>Cream Cheese</a></MenuItem>
                    </Select>
                </FormControl>

                <h1 className={"menuTitle"} id={"breakSandwiches"}><a href={"#breakSandwiches"}>Breakfast Sandwiches</a> </h1>
                <BreakfastSandwich/>
                <h1 className={"menuTitle"} id={"bagels"}><a href={"#bagels"}>Bagels</a></h1>
                <Bagels/>
                <h1 className={"menuTitle"} id={"creamcheese"}><a href={"#creamcheese"}>Cream Cheese</a></h1>
                <CreamCheese/>
            </div>
            <div className={"setTime"}>
                <Time/>
            </div>

        </div>
    )
}
export default Menu