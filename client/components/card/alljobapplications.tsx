"use client";

import Link from "next/link";
import BaseButton from "../forms/baseButton";
import BaseApplicationCard from "./baseapplicationcard";
import { JobApplication } from "@/interfaces/applicationInterface";

export default function AllJobApplicationsCard({applications}: {applications: JobApplication[]}){
    return(
        <div className="gap-3 px-2 py-4 flex flex-wrap justify-center items-center">
            {
                applications.map((application)=>(
                    <BaseApplicationCard key={application._id} className="md:w-[680px] w-[350px]">
                        <div className="py-4 px-3 flex-col">
                            <h3 className="text-lg font-bold">
                                <span className="font-normal">{application.profileSnapshot?.name}</span>
                            </h3>
                            <h5 className="text-lg font-bold"> 
                                <span className="font-normal text-base">{application.profileSnapshot?.email}</span>
                            </h5>
                            <h5 className="text-lg font-bold"> 
                                <span className="font-normal text-base">{application.profileSnapshot?.lookingFor}</span>
                            </h5>
                            <div className="card-actions justify-end">
                                <Link href={`/jobapplication/${application._id}`}>
                                    <BaseButton type={"button"} 
                                    text="View" 
                                    className="btn btn-primary"/>
                                </Link>
                            </div>
                        </div>
                    </BaseApplicationCard> 
                ))
            }
        </div>
        
    )
}