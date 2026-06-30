"use client";

import { baseUrl, getAndDeleteReq, postAndPatchReq } from "@/apicalls/apiCalls";
import { JobDetail as JobDetailInterface } from "@/interfaces/jobInterface";
import AiResponseCard from "@/components/card/aireponsecard";
import JobDetail from "@/components/card/jobdetailcard";
import { Loadingstate } from "@/components/forms/loadingState";
import { Availability, Experience, PreferredLocation, SalaryExcepted } from "@/constants/applicationFilterContest";
import { useAuth } from "@/context/authcontext";
import { ApplicationOptions } from "@/interfaces/applicationInterface";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AboutJob(){
    const {jobId} = useParams();
    const [job, setJob] = useState<JobDetailInterface>();
    const [title, setTitle] = useState(""); 
    const [jobFitAIResponse, setJobFitAIResponse] = useState(""); 
    const [profileImproveAIResponse, setProfileImproveAIResponse] = useState(""); 
    const [isLoading, setIsLoading] = useState(true);
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const [isAIResponse, setIsAIResponse] = useState(false);
    const {user, isLoading: isAuthLoading} = useAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any | null>(null);
    useEffect(()=>{
        const getJob = async()=>{
            if(!jobId){
                return;
            }
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/job/${jobId}`, "GET");
                setJob(response);
            } catch (error) {
                console.log("error from getJob! ", error);
                setError(error);
            }finally{
                setIsLoading(false);
            }
        }
        getJob();
    }, [jobId]);
    console.log("the error is!", error);

    const confirmRef = useRef<HTMLDialogElement | null>(null);

    const handleOnClick = ()=>{
        if(!isAuthLoading && !user){
            alert("please login to apply job");
            return;
        }
        try {
            confirmRef.current?.showModal();
        } catch (error) {
            console.log("error of dialogbox! ", error);
        }
    }

    const handleOnCloseJob = async ()=>{
        if(!jobId){
            return;
        }
        if(job && job.status === "Close"){
            alert("job is already closed");
            return;
        }
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/job/status/${jobId}`, "PATCH", {});
            if(response){
                alert("job status change success!");
            }
        } catch (error: unknown) {
            if(isAxiosError(error)){
                const errorMessage = error.response?.data.message || "Internal Server Error";
                alert(errorMessage);
            }
        }finally{
            setIsLoading(false);
        }
    }

    const handleOnDeleteJob = async ()=>{
        if(!jobId){
            return;
        }
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/job/${jobId}`, "DELETE");
            if(response){
                alert("job delete success!");
            }
        } catch (error: unknown) {
            if(isAxiosError(error)){
                const errorMessage = error.response?.data.message || "Internal Server Error";
                alert(errorMessage);
            }
        }finally{
            setIsLoading(false);
        }
    }

    const  handleConfirmClick = async ()=>{
        if(Object.values(applicationOptions).length === 0){
            alert("please select the options!");
            return;
        }
        const dataTosend = {
            jobId,
            salaryExcepted: applicationOptions.salaryExcepted,
            preferredLocation: applicationOptions.preferredLocation,
            availability: applicationOptions.availability,
            experience: applicationOptions.experience,
        };
        try {
            confirmRef.current?.close();
            setIsBtnClicked(true);
            console.log("the data to send! ", dataTosend);
            const response = await postAndPatchReq(`${baseUrl}/application/`, "POST", dataTosend);
            if(response){
                alert("job applied successfully!");
            }
        } catch (error) {
            console.log("error of dialogbox! ", error);
        }finally{
            setIsBtnClicked(false);
        }
    }

    const  handleProfileReview = async()=>{
        if(!jobId){
            return;
        }
        setProfileImproveAIResponse("");
        if(jobFitAIResponse){
            setIsAIResponse(true);
            return;
        }
        try {
            setIsBtnClicked(true);
            setIsAIResponse(true);
            const response = await getAndDeleteReq(`${baseUrl}/ai/jobfit/${jobId}`, "GET");
            // console.log("the profile review response! ", response);
            if(response){
               setTitle("Job Compatibility Review");
               setJobFitAIResponse(response); 
            }
        } catch (error) {
            setError(error);
        }finally{
            setIsBtnClicked(false);
        }
    }

    const handleIsAIResponse = ()=>{
        setIsAIResponse(false);
    }

    const  handleProfileImprove = async()=>{
        if(!jobId){
            return;
        }
        setJobFitAIResponse("");
        if(profileImproveAIResponse){
            setIsAIResponse(true);
            return;
        }
        try {
            setIsBtnClicked(true);
            setIsAIResponse(true);
            const response = await getAndDeleteReq(`${baseUrl}/ai/improveprofile/${jobId}`, "GET");
            // console.log("the profile review response! ", response);
            if(response){
               setTitle("Profile Improvement Insights");
               setProfileImproveAIResponse(response); 
            } 
        } catch (error) {
            setError(error);
        }finally{
            setIsBtnClicked(false);
        }
    }

    const [applicationOptions, setApplicationOptions] = useState<ApplicationOptions>({
        salaryExcepted: SalaryExcepted.ThreeToFive,
        preferredLocation: PreferredLocation.allOfTheAbove,
        availability: Availability.immediate,
        experience: Experience.zeroToTwo,
    });
    
    const handleOnChange = (key: string, value: string)=>{
        setApplicationOptions({...applicationOptions, [key]: value});
    }

    return(
        <div className="py-6 bg-base-300 min-h-screen">
            <div className="w-full max-w-[580px] mx-auto space-y-4">
                {
                    isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loadingstate className="loading-xl"/>
                        </div>    
                    ) : isAIResponse ?
                    (
                        <AiResponseCard 
                        title={title} 
                        content={jobFitAIResponse || profileImproveAIResponse} 
                        handleIsAIResponse={handleIsAIResponse} 
                        isBtnClicked = {isBtnClicked}/>
                    ) : job ? (
                        <>
                            <JobDetail
                            job={job} 
                            confirmRef={confirmRef} 
                            onClick={handleOnClick} 
                            applicationOptions={applicationOptions} 
                            onChange={handleOnChange}
                            handleConfirmClick={handleConfirmClick}
                            handleProfileReview = {handleProfileReview}
                            handleProfileImprove = {handleProfileImprove}
                            isBtnClicked = {isBtnClicked}
                            handleOnCloseJob={handleOnCloseJob}
                            handleOnDeleteJob={handleOnDeleteJob}
                            isLoading={isLoading} />
                        </>
                    ) : (
                        <div>
                            <p>No job detail</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}