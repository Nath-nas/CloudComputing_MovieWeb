import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useClickOutSide } from "../../hooks/useClickOutSide";
const Header = () => {
    const { getRole, getName, getEmail, logOut } = useAuth();
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const { nodeRef, show, setShow } = useClickOutSide();
    useEffect(() => {
        getName().then((res) => {
            console.log(res);
            setUserName(res);
        });
        getRole().then((res) => {
            console.log(res);
            setRole(res);
        });
        getEmail().then((res) => {
            setEmail(res);
        });
    }, [getEmail, getName, getRole]);

    return (
        <header className="flex items-center justify-center py-4 mb-4 text-white page-container header gap-x-4">
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "text-primary text-xl font-semibold select-none"
                        : "font-semibold text-xl select-none"
                }
                to={"/home"}>
                Home
            </NavLink>
            <NavLink
                to={"/movies"}
                className={({ isActive }) =>
                    isActive
                        ? "text-primary text-xl font-semibold select-none"
                        : "font-semibold text-xl select-none"
                }>
                Movies
            </NavLink>
            {role === "Admin" && (
                <NavLink
                    to={"/upload"}
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary text-xl font-semibold select-none"
                            : "font-semibold text-xl select-none"
                    }>
                    Upload
                </NavLink>
            )}
            <div className="relative ml-auto" ref={nodeRef}>
                <span
                    onClick={() => setShow(!show)}
                    className="transition-all hover:text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </span>
                {show && (
                    <div className="absolute top-[100%] left-[100%] -translate-x-[100%]  translate-y-3 z-10 flex flex-col gap-2 p-3 bg-slate-700 rounded-lg">
                        <div className="flex items-center gap-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>

                            <span className="select-none">{userName}</span>
                        </div>
                        <div className="flex items-center transition-all gap-x-2 hover:text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                />
                            </svg>
                            <span className="cursor-pointer select-none">
                                {email}
                            </span>
                        </div>
                        <NavLink
                            to={"/"}
                            className="flex items-center transition-all gap-x-2 hover:text-primary"
                            onClick={logOut}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                class="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>

                            <span className="cursor-pointer select-none">
                                Log Out
                            </span>
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
