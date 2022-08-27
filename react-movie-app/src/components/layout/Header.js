import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const Header = () => {
    const { getRole, getName, getEmail, logOut } = useAuth();
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState(false);

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
    }, []);

    return (
        <header className="flex items-center justify-center p-4 mb-4 text-white header gap-x-4 page-container">
            <NavLink
                className={({ isActive }) =>
                    isActive ? "text-primary font-semibold" : "font-semibold"
                }
                to={"/home"}>
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
            <div className="relative flex items-center gap-3 ml-auto">
                <img
                    src="https://images.unsplash.com/photo-1661473677794-d3040f0e8dbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    className="object-cover w-8 h-8 rounded-full select-none"
                />
                <span className="text-xl font-thin select-none">
                    {userName}
                </span>
                <span
                    onClick={() => setState(!state)}
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
                {state && (
                    <div className="absolute top-[100%]  translate-y-3 z-10 flex flex-col gap-2 p-3 bg-slate-700 rounded-lg">
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
