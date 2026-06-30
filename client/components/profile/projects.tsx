"use client";

import { Projects as ProjectsInterface } from "@/interfaces/profileInterface";

export default function Projects({projects}: {projects: ProjectsInterface[]}){
    return(
        <div className="bg-base-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            <div className="space-y-4">
                {
                    projects.length > 0 ? (
                        projects.map((project, index)=>(
                            <div key={index} className="border rounded-lg p-4 hover:shadow transition">
                               <h4 className="font-semibold">{project.name}</h4>
                                <p className="text-sm text-gray-600 mt-1"> 
                                    {project.description}
                                </p>
                                <div className="flex gap-4 mt-2 text-sm text-primary">
                                    {project.links?.github && <a href={project.links.github}>GitHub</a>}
                                    {project.links?.live && <a href={project.links.live}>Live</a>}
                                    {project.links?.demo && <a href={project.links?.demo}>Demo</a>}
                                    {project.links?.article && <a href={project.links?.article}>Article</a>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>No projects!</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}