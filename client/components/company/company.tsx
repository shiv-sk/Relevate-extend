"use client";

import Link from "next/link";
import BaseButton from "../forms/baseButton";
import { MdDomain } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { Company as CompanyInterface } from "@/interfaces/company";

export default function Company({company}: {company: CompanyInterface}){
    return(
        <div className="bg-base-100 rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{company.name ?? "companyName"}</h3>
                <BaseButton text="Edit" className="btn btn-primary btn-sm" type={"button"} />
            </div>
            <div className="">
                <h5 className="font-semibold">About</h5>
                <p className="text-sm text-gray-600">{company.about ?? "Company description..."}</p>
            </div>
            <div className="">
                <h5 className="font-semibold">Email</h5>
                <p className="text-sm text-gray-600">{company.officialEmail ?? "companyEmail.com"}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="font-bold text-lg">SocialMedia</h5>
                <div className="flex gap-3">
                    {
                        company.socialMedia.length > 0 ? company.socialMedia.map((media, index)=>(
                            <div key={index}>
                                <Link href={`${media.link}`}>{media.name}</Link>
                            </div>
                        )) : (
                            <div>
                                <p>No SocialMedia</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
                <span><MdDomain className="text-lg"/> {company.domain ?? "companyDomain"}</span>
                <span><MdPeopleOutline className="text-lg" /> {company.size ?? "companySize"}</span>
                <span><IoLocationSharp className="text-lg"/> {company.location ?? "companyLocation"}</span>
            </div>
        </div>
    )
}