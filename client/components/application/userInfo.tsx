"use client";

import { Experience as ExperienceInterface, Projects as ProjectsInterface } from "@/interfaces/profileInterface";
import Skills from "../profile/skills";
import Projects from "../profile/projects";
import Experience from "../profile/experience";

export default function UserInfo(
    {skills, projects, experience}: 
    {skills: string[], projects: ProjectsInterface[] , experience: ExperienceInterface[]}){
    return(
        <div className="space-y-6">
            <Skills skills={skills || []} />
            <Projects projects={projects || []}/>
            <Experience experience={experience || []}/>
        </div>
    )
}