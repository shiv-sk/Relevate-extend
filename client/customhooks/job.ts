/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apiCalls";
import { Job, SimpleJob } from "@/interfaces/jobInterface";
import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";

export function useGetAllJobs(){

    const [jobs, setJobs] = useState<SimpleJob[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any | null>(null);

    useEffect(()=>{
        const getAllJobs = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/job/`, "GET");
                // console.log("response from alljobs", response);
                setJobs(response);
            } catch (error) {
                console.log("error from allJobs page!", error);
                setError(error)
            }finally{
                setIsLoading(false);
            }
        }
        getAllJobs();
    }, []);

    return { jobs, error, isLoading, setJobs, setIsLoading, setError }
};

export function useGetCompanyAllJobs(){

    const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any | null>(null);

    useEffect(()=>{
        const getAllJobs = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/job/myjobs`, "GET");
                // console.log("response from alljobs", response);
                setCompanyJobs(response);
            } catch (error) {
                console.log("error from allJobs page!", error);
                setError(error)
            }finally{
                setIsLoading(false);
            }
        }
        getAllJobs();
    }, []);

    return { companyJobs, error, isLoading, setCompanyJobs }
};

export function useGetJob(jobId: string){

    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(()=>{
        const getJob = async()=>{
            if(!jobId){
                return;
            }
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/job/${jobId}`, "GET");
                setJob(response);
            } catch (error: unknown) {
                console.log("error from getJob! ", error);
                if(isAxiosError(error)){
                    setError(error);
                }
            }finally{
                setIsLoading(false);
            }
        }
        getJob();
        }, [jobId]);

    return { job, error, isLoading, setJob };
};