import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const Header = () => {
    const { getRole, getName, getEmail } = useAuth();
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        getName().then((res) => {
            console.log(res);
            setUserName(res);
        });
        getRole().then((res) => {
            console.log(res);
            setRole(res);
        });
    }, []);
    return (
        <header className="flex items-center justify-center p-4 mb-4 text-white header gap-x-4 page-container">
            <NavLink
                className={({ isActive }) =>
                    isActive ? "text-primary font-semibold" : "font-semibold"
                }
                to={"/"}>
                Home
            </NavLink>
            <NavLink
                to={"/movies"}
                className={({ isActive }) =>
                    isActive ? "text-primary font-semibold" : "font-semibold"
                }>
                Movies
            </NavLink>
            {role === "Admin" && (
                <NavLink
                    to={"/upload"}
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-semibold"
                            : "font-semibold"
                    }>
                    Upload
                </NavLink>
            )}
            <span className="cursor-pointer"></span>
            <div className="flex items-center gap-3 ml-auto">
                <img
                    src="https://images.unsplash.com/photo-1661473677794-d3040f0e8dbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    className="object-cover w-8 h-8 rounded-full"
                />
                <span>{userName}</span>
            </div>
        </header>
    );
};

export default Header;
