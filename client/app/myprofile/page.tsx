"use client";

import { Loadingstate } from "@/components/forms/loadingState";
import ProfileDisplay from "@/components/profile/profile";
import { useAuth } from "@/context/authcontext";
import { useGetProfile } from "@/customhooks/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ViewProfile(){
    const {isLoading, profile} = useGetProfile();
    const router = useRouter();
    const {user, isLoading: authLoading} = useAuth();
    
    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
        }
    }, [user, authLoading, router]);

    useEffect(()=>{
        if(!isLoading && user && user.role !== "JobSeeker"){
            router.push("/");
            alert("Forbidden resource!");
        }
    }, [user, isLoading, router]);
    
    useEffect(()=>{
        if(!isLoading && profile === null){
            router.push("/newprofile");
        }
    }, [isLoading, profile, router]);
    

    return(
        <div>
            {
                isLoading ? (
                    <div className="flex justify-center items-center">
                        <Loadingstate className="loading-xl"/>
                    </div>
                ) : profile ? (
                    <div>
                        <ProfileDisplay profile={profile}/>
                    </div>
                ) : (
                    <div>
                        <p>No profile</p>
                    </div>
                )
            }
        </div>
    )
}