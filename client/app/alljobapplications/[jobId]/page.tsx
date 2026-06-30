"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apiCalls";
import AllJobApplicationsCard from "@/components/card/alljobapplications";
import ApplicationFilter from "@/components/filter/applicationfilter";
import { Loadingstate } from "@/components/forms/loadingState";
import { Availability, Experience, PreferredLocation, SalaryExcepted } from "@/constants/applicationFilterContest";
import { useAuth } from "@/context/authcontext";
import { JobApplication } from "@/interfaces/applicationInterface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllApplications(){
    const {user, isLoading: authLoading} = useAuth();
    const router = useRouter();
    
    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
        }
    }, [user, authLoading, router]);
    
    useEffect(()=>{
        if(!authLoading && user && user.role !== "Employer"){
            alert("Forbidden resource!");
            router.push("/");
        }
    }, [user, authLoading, router]);

    const {jobId} = useParams();
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const getJobApplications = async()=>{
            if(!jobId){
                return;
            }
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/application/${jobId}`, "GET");
                setJobApplications(response);
            } catch (error) {
                console.log("error from jobApplications!", error);
            }finally{
                setIsLoading(false);
            }
        }
        getJobApplications();
    }, [jobId]);

    const [applicationFilter, setApplicationFilter] = useState({
        salaryExcepted: SalaryExcepted.ThreeToFive,
        preferredLocation: PreferredLocation.allOfTheAbove,
        availability: Availability.immediate,
        experience: Experience.zeroToTwo,
        projectCheck: false,
        experienceCheck: false
    });

    const handleOnChange = (key: string, value: string | boolean)=>{
        setApplicationFilter({...applicationFilter, [key]: value});
    }

    const handleOnClick = ()=>{
        if(jobApplications.length === 0){
            alert("no applications to filter!");
            return;
        }
        let filteredApplications = jobApplications.filter((jobapplication)=>{
            return jobapplication.salaryExcepted === applicationFilter.salaryExcepted && 
            jobapplication.experience === applicationFilter.experience && 
            jobapplication.availability === applicationFilter.availability && 
            jobapplication.preferredLocation === applicationFilter.preferredLocation
        })
        if(filteredApplications.length === 0){
            alert("no applications match the selected filters!");
            return;
        }
        if(applicationFilter.projectCheck){
            filteredApplications = filteredApplications.filter((app)=>(app.profileSnapshot?.projects?.length > 0));
        }
        if(applicationFilter.experienceCheck){
            filteredApplications = filteredApplications.filter((app)=>(app.profileSnapshot?.experience?.length > 0));
        }
        if(filteredApplications.length === 0){
            alert("no applications match the selected filters!");
            return;
        }
        setJobApplications(filteredApplications);
        console.log("filter button is clicked with data! ", applicationFilter);
    }

    return(
        <div className="space-y-3.5 py-5 bg-base-300 min-h-screen ">
            <div className="flex flex-col gap-6 w-full mx-auto lg:max-w-[1200px] p-2">
                <h1 className="font-bold text-lg text-center">AllApplications</h1>
                <div className="flex flex-wrap gap-6 w-full">
                    <div className="w-full lg:w-[30%] py-4 px-4 lg:sticky lg:top-4 h-fit">
                        <ApplicationFilter 
                        applicationFilter={applicationFilter} 
                        onChange={handleOnChange} 
                        onClick={handleOnClick} />
                    </div>
                    <div className="w-full lg:w-[60%] py-4">
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center">
                                    <Loadingstate className="loading-xl"/>
                                </div>
                            ) : jobApplications.length > 0 ? (
                                <AllJobApplicationsCard applications={jobApplications}/>
                            ) : (
                                <div>
                                    <p>No job applications!</p>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}