"use client";

import { Projects as ProjectsInterface } from "@/interfaces/profileInterface";

export default function Projects({projects}: {projects: ProjectsInterface[]}){
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-5">
                Projects
            </h3>

            <div className="space-y-5">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-base-300 p-5 transition-all duration-200 hover:border-primary hover:shadow-md"
                        >
                            <h4 className="text-lg font-semibold">
                                {project.name}
                            </h4>

                            <p className="mt-3 text-base-content/70 leading-7">
                                {project.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">

                                {project.links?.github && (
                                    <a
                                        href={project.links.github}
                                        className="btn btn-outline btn-sm"
                                    >
                                        GitHub
                                    </a>
                                )}

                                {project.links?.live && (
                                    <a
                                        href={project.links.live}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Live
                                    </a>
                                )}

                                {project.links?.demo && (
                                    <a
                                        href={project.links.demo}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Demo
                                    </a>
                                )}

                                {project.links?.article && (
                                    <a
                                        href={project.links.article}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Article
                                    </a>
                                )}

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-base-content/60">
                        No projects have been added yet.
                    </p>
                )}
            </div>
        </div>
    )
}