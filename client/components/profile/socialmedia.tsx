"use client";

import { SocialMedia as socialMediaInterface } from "@/interfaces/profileInterface";

export default function SocialMedia({socialMedia}: {socialMedia: socialMediaInterface[]}){
    return(
        <div className="bg-base-100 shadow-xl px-2 py-4 w-full rounded-xl">
            <h3 className="font-bold text-lg">SocialMedia</h3>
            <div className="flex flex-wrap gap-2">
                {
                    socialMedia.length > 0 ? (
                        socialMedia.map((media, index)=>(
                            <div key={index}>
                                <span className="font-semibold">
                                    <a target="_blank" href={media.link}>{media.name}</a>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>No SocialMedia!</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}