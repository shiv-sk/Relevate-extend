export interface SocialMedia {
    name:string,
    link:string
}

export interface Company {
    name:string,
    officialEmail:string,
    about:string,
    domain:string,
    size:string,
    location: string,
    socialMedia:SocialMedia[]
}