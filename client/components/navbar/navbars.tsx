"use client";

import Link from "next/link"
import BaseButton from "../forms/baseButton"
import { useAuth } from "@/context/authcontext"
import { IoMdPerson } from "react-icons/io";

export default function Navbar(){

    const { user, logoutUser } = useAuth();

    return(
        <div>
            <div className="navbar bg-base-100 border-b border-base-300 h-16">
                <div className="flex-1">
                    <Link href={"/"} className="text-2xl font-bold btn btn-outline btn-primary">Relevate</Link>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-primary-content rounded-full w-10">
                                <IoMdPerson className="text-4xl"/>
                            </div>
                        </div>
                    </div>
                    {
                        user && user.role === "Employer" ? (
                            <>
                                <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content bg-base-100 border border-base-300 shadow-md rounded-xl z-10 mt-3 w-60 p-2">
                                    <li className="font-medium">
                                        <Link href={"/company"}>Company</Link>
                                    </li>
                                    <li className="font-medium">
                                        <Link href={"/jobs"}>AllJobs</Link>
                                    </li>
                                    <li className="font-medium">
                                        <Link href={"/newjob"}>NewJob</Link>
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
                                    className="menu menu-sm dropdown-content bg-base-100 border border-base-300 shadow-md rounded-xl z-10 mt-3 w-60 p-2">
                                    <li className="font-medium">
                                        <Link href={"/myprofile"}>Profile</Link>
                                    </li>
                                    <li className="font-medium">
                                        <Link href={"/myapplications"}>MyApplications</Link>
                                    </li>
                                    <li>
                                        <BaseButton 
                                        type={"button"} 
                                        text={"Logout"}
                                        handleOnClick={logoutUser}
                                        className="btn btn-error btn-sm"/>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content bg-base-100 border border-base-300 shadow-md rounded-xl z-10 mt-3 w-60 p-2">
                                    <li>
                                        <Link className="btn btn-primary w-full" href={"/login"}>
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