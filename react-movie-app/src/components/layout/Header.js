import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const Header = () => {
    const val = useAuth();
    console.log(val);
    return (
        <header className="flex items-center justify-center p-4 mb-4 text-white header gap-x-4">
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
            <NavLink
                to={"/upload"}
                className={({ isActive }) =>
                    isActive ? "text-primary font-semibold" : "font-semibold"
                }>
                Upload
            </NavLink>
            <span className="cursor-pointer"></span>
        </header>
    );
};

export default Header;
