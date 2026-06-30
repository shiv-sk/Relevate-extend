"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apiCalls";
import { ProfileInterface } from "@/interfaces/profileInterface";
import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";

export function useGetProfile(){
    const [profile, setProfile] = useState<ProfileInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(()=>{
        const getProfile = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/profile`, "GET");
                if(response){
                    setProfile(response);
                }
            } catch (error: unknown) {
                if(isAxiosError(error)){
                    setError(error);
                }
            }finally{
                setIsLoading(false);
            }
        }
        getProfile();
    }, []);
    return {isLoading, profile, error, setProfile};
}