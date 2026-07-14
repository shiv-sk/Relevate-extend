"use client";

export default function ApplicationHeader({name, email, role}: {name: string, email: string, role: string}){
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-base-content">
                        {name ?? "Candidate Name"}
                    </h2>

                    <p className="text-base-content/60">
                        {email ?? "candidate@email.com"}
                    </p>

                    <span className="badge badge-primary badge-outline">
                        {role ?? "Frontend Developer"}
                    </span>
                </div>

                {/* Optional */}
                {/* <span className="badge badge-success badge-lg">
                    Applied
                </span> */}
            </div>
        </div>
    )
}