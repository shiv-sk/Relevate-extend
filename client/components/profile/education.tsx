"use client";

import { Education as EducationInterface } from "@/interfaces/profileInterface";

export default function Education({education}: {education: EducationInterface[]}){
    return(
        <div className="bg-base-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            <div className="space-y-4">
                {
                    education.length > 0 ? (
                        education.map((edu, index)=>(
                            <div key={index} className="border-l-2 border-primary pl-4">
                                <p className="font-medium">{edu.institute}</p>
                                <p className="text-sm text-gray-500"> {edu.institute} • {edu.passoutYear}</p>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>No Education!</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}