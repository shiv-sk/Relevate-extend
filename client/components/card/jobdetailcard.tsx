"use client";

import { Availability, Experience, PreferredLocation, SalaryExcepted } from "@/constants/applicationFilterContest";
import BaseButton from "../forms/baseButton";
import BaseSelect from "../forms/baseSelect";
import { CiMoneyBill } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BsBriefcase } from "react-icons/bs";
import JobDetailBaseCard from "./jobdetailbasecard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JobDetail as JobDetailInterface } from "@/interfaces/jobInterface";
import { ApplicationOptions } from "@/interfaces/applicationInterface";
import { useAuth } from "@/context/authcontext";
import Meta from "../icons/meta";

export default function JobDetail(
    {
        job,
        confirmRef, 
        onClick, 
        applicationOptions, 
        onChange, 
        handleConfirmClick, 
        handleProfileReview, 
        handleProfileImprove,
        isBtnClicked,
        handleOnDeleteJob,
        handleOnCloseJob,
        isLoading
    }:
    {
        job: JobDetailInterface, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        confirmRef: any, 
        onClick: ()=>void, 
        applicationOptions: ApplicationOptions, 
        onChange: (key: string, value: string)=>void, 
        handleConfirmClick: ()=>void,
        handleProfileReview: ()=>void,
        handleProfileImprove: ()=>void,
        isBtnClicked: boolean,
        isLoading: boolean,
        handleOnDeleteJob: ()=>void,
        handleOnCloseJob: ()=>void,
    }){

    const {jobId} = useParams();
    const {user} = useAuth();

    return(
        <JobDetailBaseCard>
            <div className="flex flex-col gap-2 space-x-2 justify-center w-full px-4">
                <h3 className="text-3xl font-bold">{job.title}</h3>
                <p className="text-lg text-gray-500">{job.companyId.name ?? "companyName"}</p>
                <div className="flex flex-wrap gap-6 mt-4 text-sm justify-between">
                    <Meta content={"Salary"} icon={<CiMoneyBill />} value={job.salary ?? "Salary"} />
                    <Meta content={"Location"} icon={<SlLocationPin />} value={job.location ?? "Location"} />
                    <Meta content={"Type"} icon={<BsBriefcase />} value={job.type ?? "Type"} />
                    <Meta content={"Level"} icon={<FaRegUser />} value={job.level ?? "Level"} />
                </div>
                <hr className="bg-gray-500" />
                <div className="flex flex-col py-1">
                    <h3 className="text-lg font-semibold">Required skills</h3>
                    <div className="flex gap-2">
                        {
                            job.requiredSkills.length > 0 ? (
                                job.requiredSkills.map((skill)=>(
                                    <div key={skill} className="flex flex-wrap mt-2">
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                            {skill}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p>Skills are not mentioned!</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                
                <section className="mt-3">
                    <h3 className="text-xl font-semibold mb-2">Job Description</h3>
                    <p className="leading-relaxed text-gray-700">
                        {job.description}
                    </p>
                </section>
                <div className="mt-3">
                    <h3 className="font-bold text-lg">AboutCompany</h3>
                    <p className="text-lg">
                        {job.companyId.about}
                    </p>
                    <div className="flex gap-4 py-0.5">
                        {
                            job.companyId.socialMedia.length > 0 ? (
                                job.companyId.socialMedia.map((socilaMedia, index)=>(
                                    <div key={index} className="flex flex-row gap-2 space-x-2 justify-center items-center">
                                        <a href={socilaMedia.link} target="_blank" className="text-sm mt-2 font-bold">
                                            {socilaMedia.name}
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p>No socialMedia</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="card-actions justify-end gap-3 mt-3">
                        {
                            user && user.role === "JobSeeker" && (
                                <>
                                    <BaseButton 
                                    type={"button"} 
                                    text={"Apply"} 
                                    className="btn btn-primary"
                                    handleOnClick={onClick}
                                    isLoading = {isBtnClicked} />

                                    <BaseButton 
                                    type={"button"} 
                                    text={"profileReview"} 
                                    className="btn btn-secondary"
                                    handleOnClick={handleProfileReview}
                                    isLoading = {isBtnClicked} />
                                </>
                            )
                        }
                        
                        {
                            user?.role === "Employer" && (
                                <>
                                    <Link href={`/editjob/${jobId}`}>
                                        <BaseButton 
                                        type={"button"} 
                                        text={"Edit"} 
                                        className="btn btn-warning" />
                                    </Link>
                                    <Link href={`/alljobapplications/${jobId}`}>
                                        <BaseButton 
                                        type={"button"} 
                                        text={"Applications"} 
                                        className="btn btn-primary" />
                                    </Link>
                                    <BaseButton 
                                    type={"button"} 
                                    text={job.status === "Close" ? "Closed" : "Close"}
                                    isLoading={isLoading}
                                    disabled={job.status === "Close"}
                                    handleOnClick={handleOnCloseJob}
                                    className="btn btn-neutral" />
                                    <BaseButton 
                                    type={"button"} 
                                    text={"Delete"}
                                    isLoading={isLoading}
                                    handleOnClick={handleOnDeleteJob}
                                    className="btn btn-outline btn-error" />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <dialog ref={confirmRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Select Options</h3>
                    <p className="py-2 text-center">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog" className="w-full space-y-2">
                            <BaseSelect 
                            option={[SalaryExcepted.ThreeToFive, SalaryExcepted.FiveToEight, SalaryExcepted.MoreThanEight]} 
                            label={"SalaryExcepted"}
                            value={applicationOptions.salaryExcepted}
                            onChange={(e)=>onChange("salaryExcepted", e.target.value)} />
                                        
                            <BaseSelect 
                            option={
                                [PreferredLocation.onsiteOnly, PreferredLocation.remoteOnly, 
                                PreferredLocation.hybrid, PreferredLocation.allOfTheAbove]
                            } 
                            label={"PreferredLocation"}
                            value={applicationOptions.preferredLocation}
                            onChange={(e)=>onChange("preferredLocation", e.target.value)} />
                                        
                            <BaseSelect 
                            option={
                                [Availability.immediate, Availability.zeroToFifteen, 
                                Availability.fifteenToThirty, Availability.moreThanThirty]
                            } 
                            label={"Availability"}
                            value={applicationOptions.availability}
                            onChange={(e)=>onChange("availability", e.target.value)} />
                            
                            <BaseSelect 
                            option={[Experience.zeroToTwo, Experience.twoToFive, Experience.moreThanFive]} 
                            label={"Experience"}
                            value={applicationOptions.experience}
                            onChange={(e)=>onChange("experience", e.target.value)} />
                            {/* if there is a button in form, it will close the modal */}
                            <div className="card-actions justify-end">
                                <BaseButton 
                                type={"button"} 
                                text={"Confirm"} 
                                className="btn btn-neutral"
                                handleOnClick={handleConfirmClick} />
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="fab">
                {/* a focusable div with tabIndex is necessary to work on all browsers. 
                role="button" is necessary for accessibility */}
                {
                    user && user.role === "JobSeeker" && (
                        <>
                            <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary">VA</div>
                            {/* buttons that show up when FAB is open */}
                            <BaseButton 
                            type={"button"} 
                            text={"Improve Profile"} 
                            className="btn btn-md btn-neutral"
                            handleOnClick={handleProfileImprove}
                            isLoading = {isBtnClicked} />
                        </>
                    )
                }
            </div>
        </JobDetailBaseCard>
    )
}