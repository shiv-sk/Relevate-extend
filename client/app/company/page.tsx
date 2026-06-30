"use client";

import Company from "@/components/company/company";
import { Loadingstate } from "@/components/forms/loadingState";
import { useAuth } from "@/context/authcontext";
import { useGetCompany } from "@/customhooks/company";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CompanyPage(){
    const { company, isLoading } = useGetCompany();
    const router = useRouter();
    const {user, isLoading: authLoading} = useAuth();

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

    useEffect(()=>{
        if(!isLoading && company === null){
            router.push("/newcompany");
        }
    }, [isLoading, company, router]);

    return(
        <div className="min-h-screen bg-base-300 py-6">
            <div className="bg-base-300 py-4 w-full max-w-[620px] mx-auto space-y-4 border-gray-400 px-2">
                {
                    isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loadingstate className="loading-xl"/>
                        </div>
                    ) : company ? (
                            <Company company={company} />
                    ) : ""
                }
            </div>
        </div>
    )
}