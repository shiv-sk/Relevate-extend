"use client";

import { Experience as ExperienceInterface } from "@/interfaces/profileInterface";

export default function Experience({experience}: {experience: ExperienceInterface[]}){
    console.log("the experience is!", experience);
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-5">
                Experience
            </h3>

            <div className="space-y-5">
                {experience.length > 0 ? (
                    experience.map((exp, index) => (
                        <div
                            key={index}
                            className="border-l-4 border-primary pl-5"
                        >
                            <h4 className="text-lg font-semibold">
                                {exp.role}
                            </h4>

                            <p className="text-base-content/70 mt-1">
                                {exp.company}
                            </p>

                            <div className="mt-3">
                                <span className="badge badge-outline badge-primary">
                                    {exp.years} {exp.years === 1 ? "Year" : "Years"}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-base-content/60">
                        No work experience has been added yet.
                    </p>
                )}
            </div>
        </div>
    )
}