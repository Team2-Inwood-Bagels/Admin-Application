import "../style/style.css"
import React, {useEffect, useState} from 'react'
import {db} from "../firebase"
import BreakfastSandwich from "./BreakfastSandwich";
import Bagels from "./Bagels";
import {Divider, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import CreamCheese from "./CreamCheese";
import PickUpTime from "./PickUpTime";
import {HorizontalSplit} from "@material-ui/icons";



function Menu(){
    const [menu, setMenu] = useState([])
    const [menuName, setMenuName] = useState("")
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

    const handleChange = (event) => {
        setMenuName(event.target.value);
    };

    useEffect(() => {
        DbGetMenu()
    }, []);

    return(
       <div className={"menuPage"}>
           <div className="menu_container">
               <div className={"menus"}>
                   <FormControl
                       variant={"outlined"}
                       style={{width: "25%"}}
                   >
                       <InputLabel id={"Menu Categories"}>Menu Categories</InputLabel>
                       <Select
                           labelId="Menu Categories"
                           id="demo-simple-select"
                           label={"Menu Categories"}
                           value={menuName}
                           onChange={handleChange}

                       >
                           <MenuItem value={"Breakfast Sandwiches"} className={"menuTitleSelectList"} ><a href={"#breakSandwiches"}>Breakfast Sandwiches</a></MenuItem>
                           <MenuItem value={"Bagels"} className={"menuTitleSelectList"}><a href={"#bagels"}>Bagels</a></MenuItem>
                           <MenuItem value={"Cream Cheese"} className={"menuTitleSelectList"}><a href={"#creamcheese"}>Cream Cheese</a></MenuItem>
                       </Select>
                   </FormControl>
                   <Divider
                       style={{
                           borderBottomColor: "lightgray",
                           borderBottomWidth: "1",
                           marginTop: "30px",
                           width: "130%"
                       }}
                       />

                   <h1 className={"menuTitle"} id={"breakSandwiches"}><a href={"#breakSandwiches"}>Breakfast Sandwiches</a> </h1>
                   <BreakfastSandwich/>
                   <h1 className={"menuTitle"} id={"bagels"}><a href={"#bagels"}>Bagels</a></h1>
                   <Bagels/>
                   <h1 className={"menuTitle"} id={"creamcheese"}><a href={"#creamcheese"}>Cream Cheese</a></h1>
                   <CreamCheese/>
               </div>
               <div className={"setTime"}>
                   <PickUpTime/>
               </div>

           </div>
       </div>
    )
}
export default Menu