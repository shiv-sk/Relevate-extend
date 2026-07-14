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
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="flex items-center gap-5">
                    <div className="avatar placeholder">
                        <div className="w-20 rounded-full bg-primary text-primary-content">
                            <span className="text-9xl font-bold">D</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">{name}</h2>

                        <p className="text-base-content/60 mt-1">
                            {email}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <span className="badge badge-outline">
                                📍 {currentLocation}
                            </span>

                            <span className="badge badge-primary badge-outline">
                                💼 {lookingFor}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}