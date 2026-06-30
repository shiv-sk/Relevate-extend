"use client";

export default function ApplicationHeader({name, email, role}: {name: string, email: string, role: string}){
    return(
        <div className="flex flex-col py-4 px-2 bg-base-100 rounded-lg w-full">
            <p className="font-bold text-lg"> 
                <span className="font-normal">&nbsp;{name ?? "Name"}</span>
            </p>
            <p className="font-bold text-lg"> 
                <span className="font-normal text-base">&nbsp;{email ?? "Email"}</span>
            </p>
            <p className="font-bold text-lg"> 
                <span className="font-normal text-base">&nbsp;{role ?? "Role"}</span>
            </p>
        </div>
    )
}