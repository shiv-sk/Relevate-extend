"use client";

import { baseUrl, getAndDeleteReq, postAndPatchReq } from "@/apicalls/apiCalls";
import Application from "@/components/application/application";
import AiResponseCard from "@/components/card/aireponsecard";
import { Loadingstate } from "@/components/forms/loadingState";
import { useAuth } from "@/context/authcontext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobApplication(){
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

    const {applicationId} = useParams();
    const [application, setApplication] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAILoading, setIsAILoading] = useState(false);
    const [isAIResponse, setIsAIResponse] = useState(false);
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const [aiResponse, setAIResponse] = useState("");

    useEffect(()=>{
        const getApplication = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/application/user/${applicationId}`, "GET");
                setApplication(response);
            } catch (error) {
                console.log("error from jobApplication page!", error);
            }finally{
                setIsLoading(false);
            }
        }
        getApplication();
    }, [applicationId]);

    const handleAnalyzeCandidate = async()=>{
        if(!applicationId){
            return;
        }
        if(aiResponse){
            setIsAIResponse(true);
            return;
        }
        try {
            setIsAILoading(true);
            setIsAIResponse(true);
            const response = await getAndDeleteReq(`${baseUrl}/ai/analyzecandidate/${applicationId}`, "GET");
            if(response){
                setAIResponse(response);
            }
        } catch (error) {
            console.log("error from analyze candidate! ", error);
        }finally{
            setIsAILoading(false);
        }
    }

    const handleConnect = async()=>{
        if(!applicationId){
            return;
        }
        try {
            setIsBtnClicked(true);
            const response = await postAndPatchReq(`${baseUrl}/application/connect/${applicationId}`, "PATCH" , {});
            if(response){
                alert("connection request sent successfully!");
            }
        } catch (error) {
            console.log("error from connect candidate! ", error);
        }finally{
            setIsBtnClicked(false);
        }
    }

    const handleReject = async()=>{
        if(!applicationId){
            return;
        }
        try {
            setIsBtnClicked(true);
            const response = await postAndPatchReq(`${baseUrl}/application/reject/${applicationId}`, "PATCH" , {});
            if(response){
                alert("reject request sent successfully!");
            }
        } catch (error) {
            console.log("error from reject candidate! ", error);
        }finally{
            setIsBtnClicked(false);
        }
    }

    const handleAIResponse = ()=>{
        setIsAIResponse(false);
    }

    return(
        <div className="min-h-screen py-6 bg-base-300">
            <div className="
            flex flex-col justify-center items-center py-6 w-full max-w-[620px] 
            mx-auto space-y-4 px-2">
                {
                    isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loadingstate className="loading-xl"/>
                        </div>
                    ) : isAIResponse ? (
                        <AiResponseCard 
                        title={"Candidate Evaluation Summary"} 
                        content={aiResponse} 
                        isBtnClicked={isAILoading}
                        handleIsAIResponse={handleAIResponse}/>
                    ) : application ? (
                        <>
                            <Application 
                            application={application} 
                            handleAnalyzeCandidate={handleAnalyzeCandidate}
                            handleConnect={handleConnect}
                            handleReject={handleReject}
                            isBtnClicked={isBtnClicked}/>
                        </>
                    ): (
                        <div>
                            <p>No application!</p>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}