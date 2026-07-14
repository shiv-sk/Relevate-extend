"use client";

export default function UserFooter(
    {
        salaryExcepted, 
        preferredLocation, 
        availability, 
        experience,
        className
    }:
    {
        salaryExcepted: string, 
        preferredLocation: string, 
        availability: string, 
        experience: string,
        className?: string
    }){
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-5">
                Application Preferences
            </h3>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}>

                <div className="rounded-lg border border-base-300 bg-base-100 p-4">
                    <p className="text-sm text-base-content/60">
                        Experience
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                        {experience ?? "Not specified"}
                    </p>
                </div>

                <div className="rounded-lg border border-base-300 bg-base-100 p-4">
                    <p className="text-sm text-base-content/60">
                        Preferred Location
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                        {preferredLocation ?? "Not specified"}
                    </p>
                </div>

                <div className="rounded-lg border border-base-300 bg-base-100 p-4">
                    <p className="text-sm text-base-content/60">
                        Expected Salary
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                        {salaryExcepted ?? "Not specified"}
                    </p>
                </div>

                <div className="rounded-lg border border-base-300 bg-base-100 p-4">
                    <p className="text-sm text-base-content/60">
                        Availability
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                        {availability ?? "Not specified"}
                    </p>
                </div>

            </div>
        </div>
    )
}