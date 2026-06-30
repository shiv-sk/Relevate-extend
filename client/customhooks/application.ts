"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apiCalls";
import { useEffect, useState } from "react";

export function useGetMyApplications(){

    const [applications, setApplications] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const getApplications = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/application/`, "GET");
                // console.log("the response from customhook!", response);
                setApplications(response);
            } catch (error) {
                setError(error);
            }finally{
                setIsLoading(false);
            }
        }
        getApplications();
    }, []);
    return { error, isLoading, applications }
}