"use client";

import { baseUrl, postAndPatchReq } from "@/apicalls/apiCalls";
import AiResponseCard from "@/components/card/aireponsecard";
import { Loadingstate } from "@/components/forms/loadingState";
import NewJobForm from "@/components/forms/newJob";
import { JobLevel, JobLocation, JobType } from "@/constants/jobcontest";
import { useAuth } from "@/context/authcontext";
import { Job } from "@/interfaces/jobInterface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewJob(){
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

    const [job, setJob] = useState<Job>({
        title:"",
        description:"",
        requiredSkills:[],
        type:JobType.FullTime,
        level:JobLevel.Entry,
        location:JobLocation.Onsite,
        salary:""
    });
    const [skill, setSkill] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAILoading, setIsAILoading] = useState(false);
    const [isAIResponse, setIsAIResponse] = useState(false);
    const [aiResponse, setAIResponse] = useState("");

    const handleOnChange = (key: string, value: string)=>{
        if(key === "skill"){
            setSkill(value);
        }
        setJob({...job, [key]: value});
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!job.title.trim() || !job.description.trim() || !job.salary.trim() || job.requiredSkills.length === 0){
            alert("fill the required fields!");
            return;
        }
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/job`, "POST", job);
            if(response){
                alert("job created successfully");
                router.push("/company");
            }
        } catch (error) {
            console.log("error from newJob page!", error);
        }finally{
            setIsLoading(false);
        }
        console.log("the jobData is! ", job);
    }

    const handleAddSkill = ()=>{
        if(!skill.trim()){
            alert("add skill!");
            return;
        }
        const duplicateSkill = job.requiredSkills.some((sk)=>(sk === skill));
        if(duplicateSkill){
            alert("duplicate skills are not allowed!");
            return;
        }
        setJob({...job, requiredSkills: [...job.requiredSkills, skill]});
        setSkill("");
    }
    const removeSkill = (index: number)=>{
        setJob((prev)=>(
            {
                ...prev,
                requiredSkills: prev.requiredSkills.filter((_, i) => i !== index),
            }
        ))
    }

    const handleGenerateJD = async ()=>{
        if(!job.title.trim() || !job.description.trim() || job.requiredSkills.length === 0){
            alert("please add skills, description, title");
            return;
        }
        const JDData = {
            title: job.title,
            description: job.description,
            requiredSkills: job.requiredSkills
        }
        if(aiResponse){
            return;
        }
        try {
            setIsAILoading(true);
            setIsAIResponse(true);
            const response = await postAndPatchReq(`${baseUrl}/ai/generatejd`, "POST", JDData);
            if(response){
                setAIResponse(response);
            }
        } catch (error) {
            console.log("the error from GenerateJd!", error);
        }finally{
            setIsAILoading(false);
        }
    }

    const handleAIResponse = ()=>{
        setIsAIResponse(false);
    }
    return(
        <div className="min-h-screen gap-4 py-5 bg-base-300">
            <div className="max-w-sm mx-auto">
                {
                    isAILoading ? (
                        <div className="flex justify-center items-center">
                            <Loadingstate className="loading-xl"/>
                        </div>
                    ) : isAIResponse ? (
                        <AiResponseCard 
                        title={"Job Description Assistant"}
                        content={aiResponse} 
                        isBtnClicked={isAILoading} 
                        handleIsAIResponse={handleAIResponse} />
                    ) : (
                        <NewJobForm 
                        job={job} 
                        skill={skill} 
                        handleOnChange={handleOnChange} 
                        handleOnSubmit={handleOnSubmit} 
                        handleAddSkill={handleAddSkill}
                        isLoading={isLoading}
                        removeSkill={removeSkill}
                        title="NewJob"
                        btnTitle="Create"
                        isNewJob={true}
                        generateJD={handleGenerateJD} />
                    )
                }
            </div>
        </div>
    )
}