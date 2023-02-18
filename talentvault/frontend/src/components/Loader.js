import React from "react";
import LoaderImg from '../assets/loader.gif'
import ReactDOM from "react-dom";

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="wrapper">
            <div className="loader">
                <img src={LoaderImg} alt="Loading..." />
            </div>
        </div>,
        document.getElementById("loader")
    )
}

export const SpinnerImg = () => {
    return (
        <div>
            <img src={LoaderImg} alt="Loading..." />
        </div>
    )
}

export default Loader