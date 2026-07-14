"use client";
import { Register } from "@/interfaces/registerInterface";
import BaseButton from "./baseButton";
import BaseInput from "./baseInput";
import Redirect from "./redirectPage";
import React from "react";
import BaseSelect from "./baseSelect";
import { UserRole } from "@/constants/userConstant";

export default function RegisterForm(
    {onChange, form, onSubmit, isLoading}: 
    {
        onChange: (key: string, value: string)=>void, 
        form: Register, 
        onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void,
        isLoading: boolean
    }){
    return(
        <div>
            <form className="space-y-5 mt-8" onSubmit={onSubmit}>
                <BaseInput 
                label="Username" 
                type="text" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange("name", e.target.value)} 
                value={form.name} 
                placeholder="John Doe"
                required={true} />
                    
                <BaseInput 
                label="Email" 
                type="text" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("email", e.target.value)} 
                value={form.email} 
                placeholder="exp123@email.com"
                required={true} />

                <BaseInput 
                label="Password" 
                type="password" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("password", e.target.value)} 
                value={form.password} 
                placeholder="Pass@123"
                required={true} />

                <BaseSelect 
                option={[UserRole.Employer, UserRole.JobSeeker]} 
                label={"Role"} 
                value={form.role} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange("role", e.target.value)}
                required={true}
                />

                <Redirect url={"/login"} name={"Login"} text={"Already have an account?"} />
                <BaseButton 
                type="submit" 
                text="Register"
                isLoading={isLoading} 
                className="btn btn-primary py-2.5 px-2 w-full"/>
                </form>
            </div>
    )
}