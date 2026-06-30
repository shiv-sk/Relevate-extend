"use client";

export default function About({about}: {about?: string}){
    return(
        <div className="bg-base-100 rounded-xl p-5">
            <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-700 leading-relaxed">{about ?? "No bio provided"}</p>
            </div>
        </div>
    )
}