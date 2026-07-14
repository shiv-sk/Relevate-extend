"use client";

export default function About({about}: {about?: string}){
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">About</h3>
            </div>
            <p className="text-base-content/70 leading-7">{about ?? "No bio provided"}</p>
        </div>
    )
}