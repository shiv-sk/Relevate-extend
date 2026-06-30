import { ApplicationFilters } from "@/interfaces/applicationInterface";
import BaseButton from "../forms/baseButton";
import BaseCheckbox from "../forms/baseCheckbox";
import BaseSelect from "../forms/baseSelect";
import H3 from "../headers/h3";
import BaseSidebar from "../sidebar/baseSidebar";
import { SalaryExcepted, PreferredLocation, Availability, Experience } from "@/constants/applicationFilterContest";

export default function ApplicationFilter(
    {applicationFilter, onChange, onClick}:
    {applicationFilter: ApplicationFilters, onChange: (key: string, value: string | boolean)=>void, onClick: ()=>void}){
    return(
        <BaseSidebar>
            <div className="p-4 flex flex-col gap-4 w-full">
                <H3 title={"Filter"} className="text-center"/>
                <hr className="h-px bg-neutral-quaternary border-2"/>
            
                <BaseSelect 
                option={[SalaryExcepted.ThreeToFive, SalaryExcepted.FiveToEight, SalaryExcepted.MoreThanEight]} 
                label={"SalaryExcepted"}
                value={applicationFilter.salaryExcepted}
                onChange={(e)=>onChange("salaryExcepted", e.target.value)} />
            
                <BaseSelect 
                option={
                    [PreferredLocation.onsiteOnly, PreferredLocation.remoteOnly, 
                    PreferredLocation.hybrid, PreferredLocation.allOfTheAbove]
                } 
                label={"PreferredLocation"}
                value={applicationFilter.preferredLocation}
                onChange={(e)=>onChange("preferredLocation", e.target.value)} />
            
                <BaseSelect 
                option={
                    [Availability.immediate, Availability.zeroToFifteen, 
                    Availability.fifteenToThirty, Availability.moreThanThirty]
                } 
                label={"Availability"}
                value={applicationFilter.availability}
                onChange={(e)=>onChange("availability", e.target.value)} />

                <BaseSelect 
                option={[Experience.zeroToTwo, Experience.twoToFive, Experience.moreThanFive]} 
                label={"Experience"}
                value={applicationFilter.experience}
                onChange={(e)=>onChange("experience", e.target.value)} />

                <BaseCheckbox 
                label={"Filterout with no Projects"} 
                value={applicationFilter.projectCheck}
                handleOnChange={(e)=>onChange("projectCheck", e.target.checked)} />

                <BaseCheckbox 
                label={"Filterout with no Experience"}
                value={applicationFilter.experienceCheck}
                handleOnChange={(e)=>onChange("experienceCheck", e.target.checked)} />
            
                <BaseButton 
                type={"button"} 
                text={"Filter"} 
                className="btn btn-primary"
                handleOnClick={onClick}/>
            
            </div>
        </BaseSidebar>
    )
}