import Link from "next/link";

export default function Redirect({url, name, text}: {url: string, name: string, text: string}){
    return(
        <p className="text-sm text-base-content/70">{text}{" "}, 
            <Link href={url} className="font-medium text-primary hover:underline transition-colors">
                &nbsp;{name}
            </Link>
        </p>
    )
}