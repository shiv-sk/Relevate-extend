"use client";
import { SocialMedia, Company } from "@/interfaces/company";
import H1 from "../headers/h1";
import H3 from "../headers/h3";
import BaseButton from "./baseButton";
import BaseInput from "./baseInput";
import Textarea from "./textarea";

export default function CompanyForm(
    {
        onChange, 
        socialMediaOnChange, 
        company, 
        socialMedia, 
        handleSocialMediaAdd, 
        onSubmit, 
        isLoading,
        removeSocialMedia,
        title,
        btnTitle
    }: 
    {
        onChange: (val: string, key: string) => void, 
        socialMediaOnChange: (val: string, key: keyof SocialMedia) => void, 
        company: Company,
        socialMedia: SocialMedia,
        handleSocialMediaAdd: ()=>void,
        onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void,
        isLoading: boolean,
        removeSocialMedia:(index: number)=>void,
        title: string
        btnTitle: string
    }){
    return(
        <div 
        className="bg-base-100 border border-base-300 rounded-xl shadow-sm max-w-4xl mx-auto p-8">
            <H1 heading={title}/>
            <form className="gap-2.5 py-6 space-y-3 w-full" onSubmit={(e)=>onSubmit(e)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <BaseInput 
                type={"text"} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange(e.target.value, "name")} 
                value={company.name} 
                label="Name"/>

                <BaseInput 
                type={"email"} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange(e.target.value, "officialEmail")} 
                value={company.officialEmail} 
                label="OfficialEmail"/>

                <BaseInput 
                type={"text"} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange(e.target.value, "domain")} 
                value={company.domain} 
                label="Domain"/>

                <BaseInput 
                type={"text"} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange(e.target.value, "size")} 
                value={company.size} 
                label="Size"/>
                </div>

                <Textarea 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>onChange(e.target.value, "about")} 
                value={company.about} 
                placeholder={"About company"} 
                className={`input input-bordered bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-colors w-full min-h-36`}
                label="About"/>

                <BaseInput 
                type={"text"} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange(e.target.value, "location")} 
                value={company.location} 
                label="Location"/>
                
                <div className="space-y-4">
                    <H3 title="Social Links" />
                    <div className="grid md:grid-cols-[1fr_2fr_auto] gap-3 items-end">
                        <BaseInput 
                        type={"text"} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>socialMediaOnChange(e.target.value, "name")} 
                        value={socialMedia.name} 
                        label="Platform"/>

                        <BaseInput 
                        type={"text"} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>socialMediaOnChange(e.target.value, "link")} 
                        value={socialMedia.link} 
                        label="URL"/>

                        <BaseButton 
                        type={"button"} 
                        text={"Add"} 
                        className="btn btn-primary" 
                        handleOnClick={handleSocialMediaAdd}/>
                    </div>
                    <div className="space-y-3">
                        {
                            company.socialMedia.length > 0 && company.socialMedia.map((media, index)=>(
                                <li key={index} className="p-2 border rounded">
                                    <a href={media.link}>{media.name}</a>
                                    <BaseButton 
                                    type="button" 
                                    text="remove" 
                                    className="text-red-500 text-sm"
                                    handleOnClick={() => removeSocialMedia(index)}/>
                                </li>
                            ))
                        }
                    </div>
                </div>
                <div className="border-t border-base-300 pt-6">
                    <BaseButton 
                    type={"submit"} 
                    text={btnTitle} 
                    className="btn btn-primary w-full"
                    isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}