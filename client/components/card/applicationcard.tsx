"use client";
import { useRef, useState } from "react";
import BaseButton from "../forms/baseButton";
import BaseApplicationCard from "./baseapplicationcard";
import { UserApplication } from "@/interfaces/applicationInterface";
import Skills from "../profile/skills";
import Experience from "../profile/experience";
import Projects from "../profile/projects";
import UserFooter from "../application/userfooter";

export default function ApplicationCard({applications}: {applications: UserApplication[]}){
    const applicationRef = useRef<HTMLDialogElement | null>(null);
    const [applicatonData, setApplicationData] = useState<UserApplication | null>(null);
    const handleOnClick = (application: UserApplication)=>{
        console.log("button is clicked!!");
        console.log(application);
        try {
            applicationRef.current?.showModal();
            setApplicationData(application);
        } catch (error) {
            console.error("Dailogbox error! " , error);
        }
        console.log("this line is printing after ref ele");
    }
    return(
        <div className="gap-3 px-2 py-4 flex flex-wrap justify-center items-center">
            {
                applications.map((application)=>(
                    <BaseApplicationCard key={application._id} className="md:w-[480px] w-[350px]">
                        <div className="py-4 px-3 flex-col">
                            <h3 className="card-title">{application.jobId.title}</h3>
                            <h5>{application.jobId.companyId.name}</h5>
                            <div className="flex gap-2 space-x-2 items-center">
                                <p className="text-sm mt-2 font-bold">AppliedAt: 
                                    <span className="font-normal">
                                        &nbsp;{
                                        application.createdAt ? new Date(application.createdAt).toLocaleDateString() 
                                        : "Applied-Date"}
                                    </span>
                                </p>
                                <p className="text-sm mt-2 font-bold">Status: 
                                    <span className="font-normal">&nbsp;{application.status}</span>
                                </p>
                            </div>
                            <div className="card-actions justify-end">
                                <BaseButton type={"button"} 
                                text="View" 
                                className="btn btn-primary"
                                handleOnClick={()=>handleOnClick(application)}/>
                            </div>
                        </div>
                    </BaseApplicationCard> 
                ))
            }
            {
                applicatonData && (
                    <dialog ref={applicationRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box bg-base-300 space-y-2.5">
                            <h3 className="font-bold text-lg px-5 text-center">profileSnapshot</h3>
                            <p className="px-5 mt-2 font-semibold">{applicatonData?.jobId.title}</p>
                            <Skills skills={applicatonData.profileSnapshot?.skills || []} />
                            <Experience experience={applicatonData.profileSnapshot?.experience || []} />
                            <Projects projects={applicatonData.profileSnapshot?.projects || []} />
                            <UserFooter 
                            salaryExcepted={applicatonData.salaryExcepted} 
                            preferredLocation={applicatonData.preferredLocation} 
                            availability={applicatonData.availability} 
                            experience={applicatonData.experience}
                            className={"lg:grid-cols-1"} />
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                )
            }
        </div>
        
    )
}