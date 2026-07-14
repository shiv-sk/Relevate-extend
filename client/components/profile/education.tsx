"use client";

import { Education as EducationInterface } from "@/interfaces/profileInterface";

export default function Education({education}: {education: EducationInterface[]}){
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-5">
                Education
            </h3>

            <div className="space-y-5">
                {education.length > 0 ? (
                    education.map((edu, index) => (
                        <div
                            key={index}
                            className="border-l-4 border-primary pl-5"
                        >
                            <h4 className="font-semibold text-base">
                                {edu.institute}
                            </h4>

                            <p className="text-base-content/70 mt-1">
                                {edu.degree}
                            </p>

                            <p className="text-sm text-base-content/60 mt-1">
                                Graduation • {edu.passoutYear}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-base-content/60">
                        No education has been added yet.
                    </p>
                )}
            </div>
        </div>
    )
}