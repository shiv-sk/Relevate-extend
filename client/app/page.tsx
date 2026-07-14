"use client";
import { baseUrl, getAndDeleteReq } from "@/apicalls/apiCalls";
import JobCardSimple from "@/components/card/jobsimple.card";
import SimpleJobCrad from "@/components/card/simplejobcard";
import BaseButton from "@/components/forms/baseButton";
import { Loadingstate } from "@/components/forms/loadingState";
import Meta from "@/components/icons/meta";
import SearchBar from "@/components/searchbar/search";
import Filter from "@/components/sidebar/filter";
import { useGetAllJobs } from "@/customhooks/job";
import { JobFilter, JobLevel, JobLocation, JobType } from "@/interfaces/jobInterface";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { BsBriefcase } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

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
        <div className="min-h-screen bg-base-200 py-8">
            <div className="max-w-7xl mx-auto px-4 space-y-8">
                <div className="max-w-2xl mx-auto">
                    <SearchBar onSearchChange={handleOnChange} value={search} handleSearchOnClick={handleSearchOnClick}/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <aside className="lg:col-span-4 lg:sticky lg:top-6 self-start">
                        <Filter filters={filters} onChange={handleFilterOnChange} handleFilterClick={handleFilterClick} />
                    </aside>
                    <main className="lg:col-span-8">
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center">
                                    <Loadingstate className="loading-xl"/>
                                </div> 
                            ) : jobs && jobs.length > 0 ? (
                                <JobCardSimple jobs={jobs}></JobCardSimple>
                            ) : (
                                <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-10 text-center">
                                    <h3 className="text-xl font-semibold">
                                        No Jobs Found
                                    </h3>
                                    <p className="text-base-content/60 mt-2">
                                        We couldn&apos;t find any jobs matching your search or filters.
                                    </p>
                                    <p className="text-sm text-base-content/50 mt-4">
                                        Try changing the search keyword or clearing some filters.
                                    </p>
                                </div>
                            )
                        }
                    </main>
                </div>
            </div>
        </div>
    )
}