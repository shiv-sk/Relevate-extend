"use client";
import { baseUrl, getAndDeleteReq } from "@/apicalls/apiCalls";
import JobCardSimple from "@/components/card/jobsimple.card";
import { Loadingstate } from "@/components/forms/loadingState";
import SearchBar from "@/components/searchbar/search";
import Filter from "@/components/sidebar/filter";
import { useGetAllJobs } from "@/customhooks/job";
import { JobFilter, JobLevel, JobLocation, JobType } from "@/interfaces/jobInterface";
import { isAxiosError } from "axios";
import { useState } from "react";

export default function Home(){
    const [search, setSearch] = useState("");
    const { jobs, error, setJobs, setIsLoading, setError, isLoading } = useGetAllJobs();

    const handleOnChange = (value: string)=>{
        setSearch(value);
    }

    const [filters, setFilters] = useState<JobFilter>({
        JobType:JobType.FullTime,
        JobLevel: JobLevel.Entry,
        JobLocation:JobLocation.Onsite
    });
    
    const handleFilterOnChange = (key: string, value: string)=>{
        setFilters({...filters, [key]: value});
    }

    const handleSearchOnClick = async ()=>{
        if(!search.trim() || search.length <= 2){
            alert("enter atleast three characters to search");
            return;
        }
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/job/search?title=${search}`, "GET");
            if(response){
                setJobs(response);
            }
        } catch (error: unknown) {
            if(isAxiosError(error)){
                alert(error.response?.data.message || "not found");
            }
            setError(error);
        }finally{
            setIsLoading(false);
        }

    }

    const handleFilterClick = ()=>{
        if(jobs.length === 0){
            alert("no jobs to filter!");
            return;
        }
        const filteredJobs = jobs.filter((job)=>{
            return job.level === filters.JobLevel && job.type === filters.JobType && job.location === filters.JobLocation;
        })
        // console.log("the filtered jobs! ", filteredJobs);
        if(filteredJobs.length === 0){
            alert("jobs are not found!");
            return;
        }
        setJobs(filteredJobs);
    }

    return(
        <div className="space-y-3.5 py-5 bg-base-300 min-h-screen ">
            <div className="flex flex-col gap-6 w-full mx-auto lg:max-w-[1200px]">
                <div className="w-full max-w-[600px] mx-auto">
                    <SearchBar onSearchChange={handleOnChange} value={search} handleSearchOnClick={handleSearchOnClick}/>
                </div>
                <div className="flex flex-wrap gap-4 w-full">
                    <div className="w-full lg:w-[30%] py-4 px-4 lg:sticky lg:top-4 h-fit">
                        <Filter filters={filters} onChange={handleFilterOnChange} handleFilterClick={handleFilterClick} />
                    </div>
                    <div className="w-full lg:w-[60%] py-4">
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center">
                                    <Loadingstate className="loading-xl"/>
                                </div> 
                            ) : jobs && jobs.length > 0 ? (
                                <JobCardSimple jobs={jobs}></JobCardSimple>
                            ) : ( 
                                <div>
                                    <p>Jobs are not found!</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}