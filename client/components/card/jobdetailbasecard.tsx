import { ReactNode } from "react";

export default function JobDetailBaseCard({ children, classname }: { children: ReactNode, classname?:string }){
    return(
        <div className={`shadow-lg bg-base-200 rounded-lg space-y-2 px-3 py-6 ${classname} w-full`}>
            {children}
        </div>
    )
}