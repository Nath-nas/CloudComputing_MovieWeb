import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function Status() {
    const [status, setStatus] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    const { getSession, logOut, getRole } = useAuth();

    useEffect(() => {
        getSession().then((session) => {
            console.log("Session: ", session);
            setStatus(true);
        });

        getRole().then((role) => {
            if (role === "User") {
                setIsAdmin(false);
            } else {
                setIsAdmin(true);
            }
        });
    }, [getRole, getSession]);
}
