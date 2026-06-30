"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apiCalls";
import { Company } from "@/interfaces/company";
import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";

export function useGetCompany(){
    const [company, setCompany] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(()=>{
        const getCompany = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/company`, "GET");
                if(response){
                    setCompany(response);
                }
            } catch (error: unknown) {
                if (isAxiosError(error)) {
                    setError(error);
                }
            }finally{
                setIsLoading(false);
            }
        }
        getCompany();
    }, []);

    return { company, isLoading, error };
}