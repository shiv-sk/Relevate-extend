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
        <div className="min-h-screen bg-base-200 py-8">

            <div className="max-w-7xl mx-auto px-4 space-y-8">

                <div className="max-w-2xl mx-auto">
                    <SearchBar 
                    value={search} 
                    onSearchChange={handleOnSearchChange} 
                    handleSearchOnClick={handleSearchOnClick}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <aside className="lg:col-span-4 lg:sticky lg:top-6 self-start">
                        <Filter filters={filters} onChange={handleFilterOnChange} handleFilterClick={handleFilterClick}/>
                    </aside>

                    <main className="lg:col-span-8">

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