"use client";

export default function Skills({skills}: {skills: string[]}){
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-5">
                Skills
            </h3>

            {skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="badge badge-primary badge-outline badge-lg"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            ) : (
                <p className="text-base-content/60">
                    No skills have been added yet.
                </p>
            )}
        </div>
    )
}