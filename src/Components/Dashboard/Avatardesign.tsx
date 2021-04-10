import React, {useState} from "react";

import "./Avatardesign.css"



const Avatardesign = () =>{
    const [hex, setHex] = useState("#1BB978");
    const randomizedHex =() =>{
        const randomColor = "#" +  Math.floor(Math.random() * 16777235).toString(16);
    
    setHex(randomColor)
    } 

    return(
        <>
        <div className="avatar-container">
            <div className="avatar-circle ">
                <div className="avatar-inner-circle">
                    <div className="initials">
                        <h1 className="initials-heading">JJ</h1>
                    </div>
                </div>
                </div>
        </div>

        </>
    )

}



export default Avatardesign;