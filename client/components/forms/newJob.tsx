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
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm lg:p-8 p-6 max-w-5xl mx-auto">
            <form className="gap-2.5 py-6 space-y-3 w-full" onSubmit={(e)=>handleOnSubmit(e)} title="Job Information">
                <H1 heading={title}/>
                    <BaseInput 
                    type={"text"} 
                    onChange={(e)=>handleOnChange("title", e.target.value)} 
                    value={job.title}
                    label="Title" />

                    <Textarea 
                    value={job.description} 
                    onChange={(e)=>handleOnChange("description", e.target.value)} 
                    placeholder={"Job description"}
                    className="input input-bordered bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-colors w-full" 
                    label="Description"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <BaseInput 
                        type={"text"} 
                        onChange={(e)=>handleOnChange("salary", e.target.value)} 
                        value={job.salary}
                        label="Salary" />

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
                    </div>
                    
                    <div className="space-y-4">
                        <label className="font-medium">
                            Required Skills
                        </label>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <BaseInput 
                                type={"text"} 
                                onChange={(e)=>handleOnChange("skill", e.target.value)} 
                                value={skill} />
                            </div>
                            <BaseButton 
                            type={"button"} 
                            text={"Add"} 
                            className="btn btn-primary self-end"
                            handleOnClick={handleAddSkill}/>
                        </div>
                        {
                            job.requiredSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {
                                        job.requiredSkills.map((skill, index)=>(
                                            <span key={index} className="badge badge-primary badge-lg gap-2">
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
                    <div className="border-t border-base-300 pt-6 flex flex-col gap-3">
                    
                        {
                            isNewJob && (
                                <BaseButton 
                                type={"button"} 
                                text="Generate Job Description" 
                                className="btn btn-outline btn-secondary"
                                isLoading={isLoading}
                                handleOnClick={generateJD}/>
                            )
                        }

                        <BaseButton 
                        type={"submit"} 
                        text="Create Job" 
                        className="btn btn-primary"
                        isLoading={isLoading}/>
                    </div>
            </form>
        </div>
    )
}