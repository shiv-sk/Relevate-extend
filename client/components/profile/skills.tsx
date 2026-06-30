"use client";

export default function Skills({skills}: {skills: string[]}){
    return(
        <div className="bg-base-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>

            <div className="flex flex-wrap gap-2">
                {
                    skills.length > 0 ? (
                        skills.map((skill, index)=>(
                            <div key={index}>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                    {skill}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>Skills are not available</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}