"use client";

import ApplicationCard from "@/components/card/applicationcard";
import { Loadingstate } from "@/components/forms/loadingState";
import { useAuth } from "@/context/authcontext";
import { useGetMyApplications } from "@/customhooks/application";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyApplications(){

    const { applications, isLoading: pageLoading } = useGetMyApplications();
    console.log("the applications are!", applications);
    const {user, isLoading} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        if(!user && !isLoading){
            router.push("/login");
        }
    }, [user, isLoading, router]);

    useEffect(()=>{
        if(!isLoading && user && user.role !== "JobSeeker"){
            router.push("/");
            alert("Forbidden resource!");
        }
    }, [user, isLoading, router]);

    return(
        <div className="min-h-screen bg-base-300 py-10">
            <div className="flex items-center flex-col space-y-4">
                <h1 className="font-bold text-lg">Applications</h1>
                {
                    pageLoading ? (
                        <div className="flex justify-center items-center">
                            <Loadingstate className={"loading-xl"}/>
                        </div>
                    ) :
                    user?.role === "JobSeeker" ? (
                        <ApplicationCard applications={applications}/>
                    ) : (
                        <div>
                            <p>Forbidden resource</p>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}