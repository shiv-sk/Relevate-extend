"use client";

import { baseUrl, postAndPatchReq } from "@/apicalls/apiCalls";
import EditJobForm from "@/components/forms/newJob";
import { JobLevel, JobLocation, JobType } from "@/constants/jobcontest";
import { useAuth } from "@/context/authcontext";
import { useGetJob } from "@/customhooks/job";
import { Job } from "@/interfaces/jobInterface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditJob(){
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
    const {jobId} = useParams();
    const {job: jobData} = useGetJob(jobId as string);

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

    const handleOnChange = (key: string, value: string)=>{
        if(key === "skill"){
            setSkill(value);
        }
        setJob({...job, [key]: value});
    }

    useEffect(()=>{
        if(jobData){
            setJob(jobData);
        }
    }, [jobData]);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!job.title.trim() || !job.description.trim() || !job.salary.trim() || job.requiredSkills.length === 0){
            alert("fill the required fields!");
            return;
        }
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/job/${jobId}`, "PATCH", job);
            if(response){
                alert("job updated successfully");
                router.push(`/aboutjob/${jobId}`);
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
    return(
        <div className="min-h-screen gap-4 py-5 bg-base-300">
            <div className="max-w-sm mx-auto">
                <EditJobForm 
                job={job} 
                skill={skill} 
                handleOnChange={handleOnChange} 
                handleOnSubmit={handleOnSubmit}
                handleAddSkill={handleAddSkill}
                isLoading={isLoading}
                removeSkill={removeSkill}
                title="EditJob"
                btnTitle="Update"
                isNewJob={false} />
            </div>
        </div>
    )
}