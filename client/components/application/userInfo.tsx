"use client";

import { Experience as ExperienceInterface, Projects as ProjectsInterface } from "@/interfaces/profileInterface";
import Skills from "../profile/skills";
import Projects from "../profile/projects";
import Experience from "../profile/experience";

export default function UserInfo(
    {skills, projects, experience}: 
    {skills: string[], projects: ProjectsInterface[] , experience: ExperienceInterface[]}){
    return(
        <div className="flex flex-col gap-5 py-4 px-2 bg-base-300 rounded-lg w-full">
            <Skills skills={skills || []} />
            <Projects projects={projects || []}/>
            <Experience experience={experience || []}/>
        </div>
    )
}