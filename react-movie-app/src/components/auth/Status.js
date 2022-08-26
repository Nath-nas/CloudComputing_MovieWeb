import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../../contexts/AccountContext";

export function Status() {
    const [status, setStatus] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    const { getSession, logOut, getRole } = useContext(AccountContext);

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
