import { ReactNode } from "react";

export default function BaseApplicationCard({children, className}: { children: ReactNode , className?: string}){
    return(
        <div className={`card bg-base-200 card-xl shadow-xl ${className}`}>
            {children}
        </div>
    )
}