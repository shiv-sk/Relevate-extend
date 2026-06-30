export default function H1({heading, className}: {heading: string| undefined, className?: string}){
    return(
        <h1 className={`text-center font-bold text-2xl underline ${className}`}>{heading}</h1>
    )
}