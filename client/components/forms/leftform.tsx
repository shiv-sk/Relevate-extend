export default function LeftSideForm(){
    return(
        <div className="hidden lg:flex flex-col justify-center bg-primary text-primary-content p-12">
            <h1 className="text-5xl font-bold">Relevate</h1>
            <p className="mt-4 text-lg opacity-90">AI Powered Hiring Platform</p>
            <div className="mt-10 space-y-5">
                <div>✓ AI Job Matching</div>
                <div>✓ Smart Candidate Ranking</div>
                <div>✓ One Click Apply</div>
            </div>
        </div>
    )
}