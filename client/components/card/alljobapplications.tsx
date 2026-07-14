"use client";

import Link from "next/link";
import BaseButton from "../forms/baseButton";
import BaseApplicationCard from "./baseapplicationcard";
import { JobApplication } from "@/interfaces/applicationInterface";

export default function AllJobApplicationsCard({applications}: {applications: JobApplication[]}){
    return(
        <div className="max-w-4xl mx-auto space-y-5">
            {
                applications.map((application)=>(
                    <BaseApplicationCard key={application._id} className="w-full max-w-3xl">
                        <div className="flex flex-col gap-5 p-6">
                            <h3 className="text-xl font-semibold">
                                {application.profileSnapshot?.name}
                            </h3>
                            <p className="text-base-content/70"> 
                                {application.profileSnapshot?.email}
                            </p>
                            <p className="text-base-content/60"> 
                                {application.profileSnapshot?.lookingFor}
                            </p>
                            <div  className="border-t border-base-300 pt-4 flex justify-end">
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