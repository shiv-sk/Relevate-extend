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
        <div className="bg-base-300 rounded-xl p-4 w-full space-y-4">
            <h3 className="text-lg font-bold">Application Preferences</h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${className} gap-4`}>
                <div className="bg-base-100 rounded-lg p-4 shadow flex flex-col gap-1">
                    <span className="text-sm text-gray-500">Experience</span>
                    <span className="text-lg font-semibold">{experience ?? "Not specified"}</span>
                </div>
                <div className="bg-base-100 rounded-lg p-4 shadow flex flex-col gap-1">
                    <span className="text-sm text-gray-500">Preferred Location</span>
                    <span className="text-lg font-semibold">{preferredLocation ?? "Not specified"}</span>
                </div>
                <div className="bg-base-100 rounded-lg p-4 shadow flex flex-col gap-1">
                    <span className="text-sm text-gray-500">Expected Salary</span>
                    <span className="text-lg font-semibold">{salaryExcepted ?? "Not specified"}</span>
                </div>
                <div className="bg-base-100 rounded-lg p-4 shadow flex flex-col gap-1">
                    <span className="text-sm text-gray-500">Availability</span>
                    <span className="text-lg font-semibold">{availability ?? "Not specified"}</span>
                </div>
            </div>
        </div>
    )
}