import Link from "next/link";

export default function Redirect({url, name, text}: {url: string, name: string, text: string}){
    return(
        <p>{text}, 
            <Link href={url}>
                &nbsp;<span className="font-semibold underline text-info hover:text-info">{name}</span>
            </Link>
        </p>
    )
}