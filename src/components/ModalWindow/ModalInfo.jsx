import React from "react";
import "./ModalInfo.css"

const ModalInfo = (props)=>{

    const closeInfo = () =>{
        props.setOpenInfo(false);
    }

    return(
        <div className={props.isOpenInfo ? "modal active" : "modal"} 
            onClick={()=>closeInfo()}>
            <div className="modal_content">
                <h2>{props.country} holidays</h2>
                {
                    props.holidays.map(holiday=>{
                        return(
                            <div className="holiday__items">
                                {holiday}
                            </div>
                        )})
                }
            </div>
        </div>
    )
}

export default ModalInfo;