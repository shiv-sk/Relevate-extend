"use client";

import { Experience as ExperienceInterface } from "@/interfaces/profileInterface";

export default function Experience({experience}: {experience: ExperienceInterface[]}){
    console.log("the experience is!", experience);
    return(
        <div className="bg-base-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3">Experience</h3>
            <div className="space-y-3">
                {
                    experience.length > 0 ? (
                        experience.map((exp, index)=>(
                            <div key={index} className="border-l-2 border-primary pl-4">
                                <p className="font-medium">{exp.company}</p>
                                <p className="font-medium">{exp.role}</p>
                                <div className="flex flex-wrap gap-4 text-sm mt-2">
                                    <span>{exp.years}-years</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>No Experience!</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}