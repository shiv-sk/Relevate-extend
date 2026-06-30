"use client";

import JobCardSimple from "@/components/card/jobsimple.card";
import { Loadingstate } from "@/components/forms/loadingState";
import SearchBar from "@/components/searchbar/search";
import Filter from "@/components/sidebar/filter";
import { useAuth } from "@/context/authcontext";
import { useGetCompanyAllJobs } from "@/customhooks/job";
import { JobFilter, JobLevel, JobLocation, JobType } from "@/interfaces/jobInterface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyJobs(){
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

    const [search, setSearch] = useState("");
    const {companyJobs, isLoading, setCompanyJobs} = useGetCompanyAllJobs()
    const [filters, setFilters] = useState<JobFilter>({
        JobType:JobType.FullTime,
        JobLevel: JobLevel.Entry,
        JobLocation:JobLocation.Onsite
    });
        
    const handleFilterOnChange = (key: string, value: string)=>{
        setFilters({...filters, [key]: value});
    }

    const handleOnSearchChange = (val: string)=>{
        setSearch(val);
    }

    const handleSearchOnClick = ()=>{
        if(!search.trim()){
            alert("enter atleast three characters to search");
            return;
        }
        console.log("the serach is!", search);
    }

    const handleFilterClick = ()=>{
        if(companyJobs.length === 0){
            alert("no jobs to filter!");
            return;
        }
        const filteredJobs = companyJobs.filter((job)=>{
            return job.level === filters.JobLevel && job.type === filters.JobType && job.location === filters.JobLocation;
        })
        console.log("the filtered jobs! ", filteredJobs);
        if(filteredJobs.length === 0){
            alert("jobs are not found!");
            return;
        }
        setCompanyJobs(filteredJobs);
    }

    return(
        <div className="space-y-3.5 py-5 bg-base-300 min-h-screen ">
            <div className="flex flex-col gap-6 w-full mx-auto lg:max-w-[1200px]">
                <div className="w-full max-w-[600px] mx-auto">
                    <SearchBar 
                    value={search} 
                    onSearchChange={handleOnSearchChange} 
                    handleSearchOnClick={handleSearchOnClick}/>
                </div>
                <div className="flex flex-wrap gap-6 w-full">
                    <div className="w-full lg:w-[30%] py-4 px-4 lg:sticky lg:top-4 h-fit">
                        <Filter filters={filters} onChange={handleFilterOnChange} handleFilterClick={handleFilterClick} />
                    </div>
                    <div className="w-full lg:w-[60%] py-4">
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center">
                                    <Loadingstate className="loading-xl"/>
                                </div>   
                            ) : companyJobs.length > 0 ? (
                                <>
                                    <JobCardSimple jobs={companyJobs}></JobCardSimple>
                                </>
                            ) : (
                                <div>
                                    <p>No jobs</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div> 
        </div>
    )
}