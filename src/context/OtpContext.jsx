// src/context/OtpContext.js
'use client'
import { createContext, useContext, useState } from "react";

const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("")
    const [mode, setMode] = useState("login");



    return (
        <OtpContext.Provider value={{ confirmationResult, setConfirmationResult, fullName, setFullName, phone, setPhone, mode, setMode }}>
            {children}
        </OtpContext.Provider>
    );
};

export const useOtp = () => useContext(OtpContext);
