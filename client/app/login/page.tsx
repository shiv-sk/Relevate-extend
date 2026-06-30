"use client";

import LoginForm from "@/components/forms/loginForm";
import { useAuth } from "@/context/authcontext";
import { Login as LoginInterface } from "@/interfaces/loginInterface";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
    const [form, setForm] = useState<LoginInterface>({email:"", password:""});
    const {loginUser, isLoading} = useAuth();
    const router = useRouter();

    const handleOnChange = (key: string, value: string)=>{
        setForm({...form, [key]: value});
    }
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const response = await loginUser(form);
        if(response.success && response.data){
            if(response.data.role === "JobSeeker"){
                router.push("/");
            }
            else{
                router.push("/jobs");
            }
        }else{
            alert(response.error || "Internal Server Error");
        }
        console.log("response from login page!", response);
    }

    const handleDemoEmployer = ()=>{
        setForm({
            email:"cloudmint@dev.com",
            password:"123456"
        })
    }

    const handleDemoJobSeeker = ()=>{
        setForm({
            email:"sumeet.g.patel@email.com",
            password:"123456" 
        })
    }
    return(
        <div className="min-h-screen gap-4 py-24 bg-base-300">
            <LoginForm 
            onChange={handleOnChange} 
            form={form} 
            onSubmit={handleOnSubmit} 
            isLoading={isLoading}
            handleDemoEmployer={handleDemoEmployer}
            handleDemoJobSeeker = {handleDemoJobSeeker}/>
        </div>
    )
}