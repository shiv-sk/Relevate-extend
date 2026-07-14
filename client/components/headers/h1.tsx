export default function H1({heading, className}: {heading: string| undefined, className?: string}){
    return(
        <h1 className={`text-center font-bold text-2xl border-b-4 border-neutral/10 ${className}`}>{heading}</h1>
    )
}