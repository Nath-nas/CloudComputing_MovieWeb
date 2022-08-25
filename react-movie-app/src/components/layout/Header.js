import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
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
            <span className="cursor-pointer"></span>
        </header>
    );
};

export default Header;
