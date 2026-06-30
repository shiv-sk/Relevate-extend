"use client";

export default function Header(
    {name, email, currentLocation, lookingFor}: 
    {
        name?: string, 
        email?: string
        currentLocation?: string 
        lookingFor?: string
    }){
    return(
        <div className="bg-base-100 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-6">
                <div className="avatar avatar-placeholder px-2 py-2">
                    <div className="w-24 rounded-full bg-neutral text-neutral-content">
                        <span className="text-3xl font-bold">D</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-sm text-gray-500">{email}</p>
                    <div className="flex flex-wrap gap-4 text-sm mt-2">
                        <span> {currentLocation}</span>
                        <span> {lookingFor}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}