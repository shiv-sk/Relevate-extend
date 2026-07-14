"use client";
import Link from "next/link";
import BaseButton from "../forms/baseButton";
import SimpleJobCrad from "./simplejobcard";
import { SimpleJob } from "@/interfaces/jobInterface";
import Meta from "../icons/meta";
import { CiMoneyBill } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BsBriefcase } from "react-icons/bs";

export default function JobCardSimple({jobs, role}: {jobs: SimpleJob[], role?: string}){
    return(
        <div className="w-full flex flex-col gap-6 items-center">
        {
            jobs.length > 0 ? jobs.map((j)=>(
                <SimpleJobCrad key={j._id}>
                    <div className="space-y-6">
                        <div>
                            <h2 className="card-title text-2xl font-bold">{j.title}</h2>
                            <p className="text-sm text-base-content/60 mt-1">{"companyName"}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                            <Meta label={"Location"} icon={<SlLocationPin/>} value={j.location}/>
                            <Meta label={"Salary"} icon={<CiMoneyBill/>} value={j.salary}/>
                            <Meta label={"Type"} icon={<BsBriefcase/>} value={j.type}/>
                            <Meta label={"Level"} icon={<FaRegUser/>} value={j.level}/>
                        </div>
                        <div className="flex justify-end">
                            <Link href={`/aboutjob/${j._id}`}>
                                <BaseButton 
                                type={"button"} 
                                text={"more"}
                                className="btn btn-primary"/>
                            </Link>
                            {
                                role === "Employer" && (
                                    <>
                                        <Link href={`/aboutjob/${j._id}`}>
                                            <BaseButton 
                                            type={"button"} 
                                            text={"applications"} 
                                            className="btn btn-secondary"/>
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </SimpleJobCrad>
            )): (
                <p>Jobs are not found!</p>
            )
        }
        </div>
    )
}