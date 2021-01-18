import React, {Component, useState} from "react";
import {useHistory} from 'react-router-dom';
import './popup_window.css'

const LogOutForm = ({onChangeLogout}) => {
    const [LogStatus, setLogStatus] = useState("NOT_LOGGED_IN");
    //History
    const history = useHistory();
    const Logout = () => {
        onChangeLogout(LogStatus);
        history.push("/");
    };
    return (
        <>
            {  LogStatus === "NOT_LOGGED_IN" && Logout() }

        </>
    );
};

export default LogOutForm;