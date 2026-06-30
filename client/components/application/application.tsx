"use client";

import { JobApplication } from "@/interfaces/applicationInterface";
import BaseButton from "../forms/baseButton";
import ApplicationHeader from "./applicationheader";
import UserFooter from "./userfooter";
import UserInfo from "./userInfo";

export default function Application({application, handleAnalyzeCandidate, handleConnect, handleReject, isBtnClicked}: 
    {
        application: JobApplication, 
        handleAnalyzeCandidate: ()=>void, 
        handleConnect: ()=>void, 
        handleReject: ()=>void
        isBtnClicked: boolean}){
    return(
        <div className="w-full px-4 py-4 space-y-5 bg-base-100 rounded-lg">
            <h3 className="text-lg font-semibold text-center">Candidate Application</h3>
            <ApplicationHeader 
            name={application.profileSnapshot?.name ?? "Name"} 
            email={application.profileSnapshot?.email ?? "Email"} 
            role={application.profileSnapshot?.lookingFor ?? "Role"} />

            <UserInfo 
            skills={application.profileSnapshot?.skills || []} 
            projects={application.profileSnapshot?.projects || []} 
            experience={application.profileSnapshot?.experience || []} />

            <UserFooter 
            salaryExcepted={application.salaryExcepted} 
            preferredLocation={application.preferredLocation}
            availability={application.availability} 
            experience={application.experience} />

            <div className="card-actions justify-end">
                <BaseButton 
                type={"button"} 
                text={"Connect"} 
                className="btn btn-primary"
                handleOnClick={handleConnect}
                isLoading={isBtnClicked}/>

                <BaseButton 
                type={"button"} 
                text={"Reject"} 
                className="btn btn-secondary"
                handleOnClick={handleReject}
                isLoading={isBtnClicked}/>

                <BaseButton 
                type={"button"} 
                text={"Updatedprofile"} 
                className="btn btn-neutral"/>

                <BaseButton 
                type={"button"} 
                text={"Analyze Candidate"} 
                className="btn btn-neutral"
                handleOnClick={handleAnalyzeCandidate}/>
            </div>
            <div className="fab">
                {/* a focusable div with tabIndex is necessary to work on all browsers.
                role="button" is necessary for accessibility */}
                <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary">VA</div>

                {/* buttons that show up when FAB is open */}
                <button className="btn btn-md btn-accent">Reanalyze</button>
                <button className="btn btn-md btn-secondary">Summary</button>
            </div>
        </div>
    )
}