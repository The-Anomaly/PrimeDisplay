import * as React from "react";
import "./kegennidashboard.css";
import close from "../../assets/close.svg";
import { useHistory }  from "react-router-dom";

const Notification = (props: any) => {
    const [state, setState] = React.useState(false)
    const closeBanner = () => {
        setState(true)
    }
    let history = useHistory();
    const viewPlans = () => {
        return history.push("/paymentsummary");
    }
    return (
        <>
        {!state && (<div className="notification-banner">
            <span>New pricing plans available till the 31st of May. Don't miss out!</span> <button onClick={viewPlans}>View plans</button> <img onClick={closeBanner} className="close-notif" src={close} alt="" />
        </div>)}
        </>
    )
}

export default Notification;