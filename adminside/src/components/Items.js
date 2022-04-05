import React, { Component, useEffect, useState} from 'react'
import '../style/style.css'
import { GoPencil } from "react-icons/go";
import { GoTrashcan } from "react-icons/go";
import {db} from "../firebase";

function Popup() {
    alert("Once this item is deleted, it cannot be revoked. Are you sure you want to delete it?")
} 

function Items() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const DbGetMenu = async () => {
        const newItems = []
        const res = db.collection("Item")
        const data = await res.get()
        data.docs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            newItems.push(doc.data())
        })
        setItems(items.concat(newItems))

    }
    useEffect(() => {
        DbGetMenu()
    }, []);


    return (
        <div className="container">
            <div className="item_container">
                {
                    items.map(((item, ind) =>
                            <div className="item_s" key={ind}>
                                <h5 className="item_name">{item.item_name} Price: ${item.item_price}
                                    <div className="editdltbtns">
                                        <button className="editItem">Edit Menu Item <GoPencil/></button>
                                        <button onClick={Popup} className="deleteItem">Delete Menu Item<GoTrashcan/></button>
                                    </div>                                    
                                </h5>
                                <h6 className="item_desc">{item.item_desc}</h6>
                            </div>
                    ))
                }
            </div>
        </div>
    )


}

export default Items
