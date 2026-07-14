import { ReactNode } from "react";

export default function JobDetailBaseCard({ children, classname }: { children: ReactNode, classname?:string }){
    return(
        <div className={`bg-base-100 border border-base-300 rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md ${classname} w-full`}>
            {children}
        </div>
    )
}