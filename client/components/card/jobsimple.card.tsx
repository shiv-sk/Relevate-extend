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
                    <div>
                        <h2 className="card-title mb-2">{j.title}</h2>
                        <div className="flex gap-2 space-x-2 justify-between items-center mt-1">
                            <Meta content={"Location"} icon={<SlLocationPin/>} value={j.location}/>
                            <Meta content={"Salary"} icon={<CiMoneyBill/>} value={j.salary}/>
                            <Meta content={"Type"} icon={<BsBriefcase/>} value={j.type}/>
                            <Meta content={"Level"} icon={<FaRegUser/>} value={j.level}/>
                        </div>
                        <div className="card-actions justify-end mt-2">
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