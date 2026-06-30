"use client";
import BaseButton from "../forms/baseButton";
import { Loadingstate } from "../forms/loadingState";
import ReactMarkdown from 'react-markdown';

export default function AiResponseCard({title, content, isBtnClicked, handleIsAIResponse}: 
    {title: string, content: string, isBtnClicked: boolean, handleIsAIResponse: () => void}){
    return(
        <div>
            {
                isBtnClicked ? (
                    <div className="flex justify-center items-center">
                        <Loadingstate className="loading-xl"/>
                    </div>
                ) : content ? (
                    <div className="card max-w-[550px] bg-base-100 card-md shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">{title}</h2>
                            <ReactMarkdown>{content}</ReactMarkdown>
                            <p className="text-sm font-semibold text-gray-500">
                                This is an AI-generated insight. Please use it as guidance, not a final decision.
                            </p>
                            <div className="justify-end card-actions">
                            
                            <BaseButton className="btn btn-neutral btn-sm" 
                            type={"submit"} 
                            text={"Close"} 
                            handleOnClick={handleIsAIResponse}/>
                            </div>
                        </div>
                    </div>
                ) : "No AI Response Available"
            }
        </div>
    )
}