import React ,{useState} from 'react'

export default function popup(props) {

    const close=()=>{
        props.callback(false)
    }

    return (
        <>
            {props.showPopup && 
                <div className="popup">
                    <div className="popup-alert">
                        <div className="popup-dimiss" onClick={(e)=>{close()}}>&#x2715;</div>
                        <div className="popup-text">{props.message}</div>
                        <div className={"popup-btn "+(props.popupType === "danger" ? "danger":"safe")}>
                            <div onClick={(e)=>{close()}}>OK</div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
