import React, {useState, useContext, useEffect} from "react";
import { AccountContext } from "./Account";



export function Status() {
    const [status, setStatus] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    const { getSession, logOut, getRole} = useContext(AccountContext);

    useEffect(() => {
        getSession().then(session => {
            console.log("Session: ", session);
            setStatus(true)
        })

        getRole().then(role => {
            if (role === 'User') {
                setIsAdmin(false);
            }else {
                setIsAdmin(true)
            }
        })
    })

    function verifyPage() {
        return (
            <div>
                {status ? (adminPage) : "" }
            </div>
        )
    }

    function adminPage() {
        return (
            <div>
                
                <h3>{isAdmin ? "You are Admin" : "You are user"}</h3>
                <button onClick={logOut}>Log Out</button>
            </div>
        )
    }

    

    return (
        <div>
            {status ? (<div>
                <h3>{isAdmin ? "You are admin " : "You are user"}</h3>
                <button onClick={logOut}>Log Out</button>
            </div>) : null}
            
        </div>
    )
}
