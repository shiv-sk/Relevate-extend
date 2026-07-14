"use client";

import { SocialMedia as socialMediaInterface } from "@/interfaces/profileInterface";

export default function SocialMedia({socialMedia}: {socialMedia: socialMediaInterface[]}){
    return(
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-5">
                Social Links
            </h3>

            {socialMedia.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {socialMedia.map((media, index) => (
                        <a
                            key={index}
                            href={media.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                        >
                            {media.name}
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-base-content/60">
                    No social links have been added yet.
                </p>
            )}
        </div>
    )
}