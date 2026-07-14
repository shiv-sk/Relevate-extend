"use client";
import { Login } from "@/interfaces/loginInterface";
import BaseButton from "./baseButton";
import BaseInput from "./baseInput";
import Redirect from "./redirectPage";
import React from "react";

export default function LoginForm(
    {onChange, form, onSubmit, isLoading, handleDemoEmployer, handleDemoJobSeeker}: 
    {
        onChange: (key: string, value: string)=>void, 
        form: Login, 
        onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void,
        isLoading: boolean,
        handleDemoEmployer: ()=>void,
        handleDemoJobSeeker: ()=>void,
    }){
    return(
        <div>
            <form action="" className="gap-2.5 py-6 space-y-3 w-full" onSubmit={(e)=>onSubmit(e)}>
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
                <Redirect url={"/register"} name={"Register"} text={"Don't have an account?"}/>

                <div className="mt-6 mb-6 border-t border-base-300 pt-6">
                    <p className="text-center text-sm text-base-content/60 mb-4">
                        Try Relevate without creating an account
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <BaseButton 
                        type="button"
                        text="Employer Demo"
                        handleOnClick={handleDemoEmployer}
                        className="btn btn-outline btn-primary"/>

                        <BaseButton 
                        type="button" 
                        text="Job Seeker Demo"
                        handleOnClick={handleDemoJobSeeker} 
                        className="btn btn-outline btn-secondary"/>
                    </div>
                </div>
                    
                <BaseButton 
                type="submit" 
                text="Login"
                isLoading={isLoading} 
                className="btn btn-primary py-2.5 px-2 w-full"/>
            </form>
        </div>
    )
}