"use client";

import Link from "next/link";
import BaseButton from "../forms/baseButton";
import About from "./about";
import Education from "./education";
import Experience from "./experience";
import Header from "./header";
import Projects from "./projects";
import Skills from "./skills";
import SocialMedia from "./socialmedia";
import { ProfileInterface } from "@/interfaces/profileInterface";

export default function ProfileDisplay({profile}: {profile: ProfileInterface}){

    return(
        <div className="min-h-screen bg-base-300 py-6">
            <div 
            className="w-full max-w-2xl mx-auto rounded-xl border border-base-300 bg-base-100 shadow-sm p-6 space-y-6">
                <Header 
                name={profile?.name} 
                email={profile?.email} 
                currentLocation={profile?.currentLocation} 
                lookingFor={profile?.lookingFor} />
                <About about={profile?.bio}/>
                <Skills skills={profile?.skills || []} />
                <Education education={profile?.education || []} />
                <Experience experience={profile?.experience || []} />
                <Projects projects={profile?.projects || []} />
                <SocialMedia socialMedia={profile?.socialMedia || []} />
                <div className="flex justify-end gap-3 pt-4">
                    <Link href={`/editprofile/${profile._id}`}>
                        <BaseButton type={"button"} text={"Edit"} className="btn btn-primary"/>
                    </Link>
                    <BaseButton type={"button"} text={"Delete"} className="btn btn-outline btn-error"/>
                </div>
            </div>
        </div>
    )
}