"use client";

import Link from "next/link";
import BaseButton from "../forms/baseButton";
import { MdDomain } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { Company as CompanyInterface } from "@/interfaces/company";

export default function Company({company}: {company: CompanyInterface}){
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{company.name ?? "companyName"}</h2>
                <BaseButton text="Edit" className="btn btn-primary btn-sm rounded-lg" type={"button"} />
            </div>
            <div className="">
                <h5 className="font-semibold">Company Details</h5>
                <p className="text-sm text-base-content/70 leading-relaxed">{company.about ?? "Company description..."}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                <h5 className="font-semibold">Contact</h5>
                <p className="text-sm text-base-content/70 leading-relaxed">{company.officialEmail ?? "companyEmail.com"}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="font-bold text-lg">Social Links</h5>
                <div className="flex gap-3">
                    {
                        company.socialMedia.length > 0 ? company.socialMedia.map((media, index)=>(
                            <div key={index}>
                                <Link  className="badge badge-outline" href={`${media.link}`}>{media.name}</Link>
                            </div>
                        )) : (
                            <div>
                                <p>No SocialMedia</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div><MdDomain className="text-base-content/60 mt-1"/> {company.domain ?? "companyDomain"}</div>
                <div><MdPeopleOutline className="text-base-content/60 mt-1" /> {company.size ?? "companySize"}</div>
                <div><IoLocationSharp className="text-base-content/60 mt-1"/> {company.location ?? "companyLocation"}</div>
            </div>
        </div>
    )
}