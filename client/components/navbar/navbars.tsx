"use client";

import Link from "next/link"
import BaseButton from "../forms/baseButton"
import { useAuth } from "@/context/authcontext"
import { IoMdPerson } from "react-icons/io";

export default function Navbar(){

    const { user, logoutUser } = useAuth();

    return(
        <div>
            <div className="navbar bg-neutral shadow-sm">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-2xl font-bold bg-base-100">Relevate</Link>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
                        <div className="bg-base-300 text-base-content w-10 rounded-full flex items-center justify-center">
                            <span className="text-3xl"><IoMdPerson className="text-3xl"/></span>
                        </div>
                    </div>
                    {
                        user && user.role === "Employer" ? (
                            <>
                                <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                    <li className="font-medium">
                                        <Link href={"/company"} className="text-lg">Company</Link>
                                    </li>
                                    <li className="font-medium">
                                        <Link href={"/jobs"} className="text-lg">AllJobs</Link>
                                    </li>
                                    <li className="font-medium">
                                        <Link href={"/newjob"} className="text-lg">NewJob</Link>
                                    </li>
                                    <li>
                                        <BaseButton 
                                        type={"button"} 
                                        text={"Logout"} 
                                        handleOnClick={logoutUser}
                                        className="bg-orange-500 w-full font-medium"/>
                                    </li>
                                </ul>
                            </>
                        ) : user && user.role === "JobSeeker" ? (
                            <>
                                <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                    <li className="font-medium">
                                        <Link href={"/myprofile"} className="text-lg">Profile</Link>
                                    </li>
                                    <li className="font-medium">
                                        <Link href={"/myapplications"} className="text-lg">MyApplications</Link>
                                    </li>
                                    <li>
                                        <BaseButton 
                                        type={"button"} 
                                        text={"Logout"}
                                        handleOnClick={logoutUser}
                                        className="bg-orange-500 w-full font-medium"/>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                    <li className="w-full bg-primary rounded-lg font-bold text-9xl">
                                        <Link className="text-lg bg-primary text-white" href={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}