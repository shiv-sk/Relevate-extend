"use client";
import { JobFilter, JobLevel, JobLocation, JobType } from "@/interfaces/jobInterface";
import BaseSelect from "../forms/baseSelect";
import BaseSidebar from "./baseSidebar";
import BaseButton from "../forms/baseButton";
import H3 from "../headers/h3";

export default function Filter(
    {filters, onChange, handleFilterClick}: 
    {filters: JobFilter, onChange: (key: string, val: string)=>void, handleFilterClick: ()=>void}){

    return(
        <BaseSidebar>
            <div className="p-4 flex flex-col gap-4 w-full">
                <H3 title={"Filter"} className="text-center"/>
                <hr className="h-px bg-neutral-quaternary border-2"/>

                <BaseSelect 
                option={[JobType.Contract, JobType.FullTime, JobType.Internship, JobType.PartTime]} 
                label={"JobType"}
                value={filters.JobType}
                onChange={(e)=>onChange("JobType", e.target.value)} />

                <BaseSelect 
                option={[JobLocation.Onsite, JobLocation.Remote]} 
                label={"JobLocation"}
                value={filters.JobLocation}
                onChange={(e)=>onChange("JobLocation", e.target.value)} />

                <BaseSelect 
                option={[JobLevel.Associate, JobLevel.Entry, JobLevel.Intern, JobLevel.Senior]} 
                label={"JobLevel"}
                value={filters.JobLevel}
                onChange={(e)=>onChange("JobLevel", e.target.value)} />

                <BaseButton 
                type={"button"} 
                text={"Filter"} 
                className="btn btn-primary"
                handleOnClick={handleFilterClick}/>

            </div>
        </BaseSidebar>
    )
}