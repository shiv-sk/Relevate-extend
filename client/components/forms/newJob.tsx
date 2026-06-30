"use client";
import { Job, JobLevel, JobLocation, JobType } from "@/interfaces/jobInterface";
import H1 from "../headers/h1";
import BaseInput from "./baseInput";
import BaseSelect from "./baseSelect";
import Textarea from "./textarea";
import BaseButton from "./baseButton";

export default function JobForm(
    {job, skill, handleOnChange, handleOnSubmit, handleAddSkill, isLoading, removeSkill, title, btnTitle, isNewJob, generateJD}: 
    {
        job: Job, 
        skill: string, 
        handleOnChange: (key: string, value: string)=>void, 
        handleOnSubmit: (e: React.FormEvent<HTMLFormElement>)=>void, 
        handleAddSkill: ()=>void,
        isLoading?: boolean,
        removeSkill: (index: number)=>void,
        title?: string,
        btnTitle?: string,
        isNewJob: boolean,
        generateJD?: ()=>void
    }){
    return(
        <div 
        className="bg-base-100 flex flex-col justify-center items-center w-full p-6 rounded-lg shadow-lg">
            <form className="gap-2.5 py-6 space-y-3 w-full" onSubmit={(e)=>handleOnSubmit(e)}>
                <H1 heading={title}/>

                <BaseInput 
                type={"text"} 
                onChange={(e)=>handleOnChange("title", e.target.value)} 
                value={job.title}
                label="Title" />

                <Textarea 
                value={job.description} 
                onChange={(e)=>handleOnChange("description", e.target.value)} 
                placeholder={""} 
                label="Description"/>

                <BaseInput 
                type={"text"} 
                onChange={(e)=>handleOnChange("salary", e.target.value)} 
                value={job.salary}
                label="Salary" />
                
                <div className="space-y-2">
                    <BaseInput 
                    type={"text"} 
                    onChange={(e)=>handleOnChange("skill", e.target.value)} 
                    value={skill}
                    label="Required-Skill" />
                    
                    <BaseButton 
                    type={"button"} 
                    text={"Add"} 
                    className="btn btn-secondary"
                    handleOnClick={handleAddSkill}/>
                    {
                        job.requiredSkills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {
                                    job.requiredSkills.map((skill, index)=>(
                                        <span key={index} className="badge badge-outline badge-primary">
                                            {skill}
                                            <BaseButton 
                                            type="button" 
                                            text="✕" 
                                            className="ml-1 text-red-500"
                                            handleOnClick={()=>removeSkill(index)}/>
                                        </span>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                <BaseSelect 
                option={[JobType.Contract, JobType.FullTime, JobType.Internship, JobType.PartTime]} 
                label={"JobType"} 
                value={job.type}
                onChange={(e)=>handleOnChange("type", e.target.value)} />

                <BaseSelect 
                option={[JobLevel.Associate, JobLevel.Entry, JobLevel.Intern, JobLevel.Senior]} 
                label={"JobLevel"} 
                value={job.level}
                onChange={(e)=>handleOnChange("level", e.target.value)}
                />

                <BaseSelect 
                option={[JobLocation.Onsite, JobLocation.Remote]} 
                label={"JobLocation"} 
                value={job.location}
                onChange={(e)=>handleOnChange("location", e.target.value)} />
                {
                    isNewJob && (
                        <BaseButton 
                        type={"button"} 
                        text={"Generate JD"} 
                        className="btn btn-secondary w-full"
                        isLoading={isLoading}
                        handleOnClick={generateJD}/>
                    )
                }

                <BaseButton 
                type={"submit"} 
                text={btnTitle} 
                className="btn btn-primary w-full"
                isLoading={isLoading}/>
            </form>
        </div>
    )
}