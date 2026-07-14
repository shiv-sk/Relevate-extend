"use client";
import BaseButton from "../forms/baseButton";
import { Loadingstate } from "../forms/loadingState";
import ReactMarkdown from 'react-markdown';

export default function AiResponseCard({title, content, isBtnClicked, handleIsAIResponse}: 
    {title: string, content: string, isBtnClicked: boolean, handleIsAIResponse: () => void}){
    return(
        <div className="max-w-4xl mx-auto">
            {isBtnClicked ? (
                <div className="flex justify-center items-center h-64">
                    <Loadingstate className="loading loading-spinner loading-xl text-primary" />
                </div>
            ) : content ? (
                <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm">
                    <div className="p-8 space-y-6">

                        <div>
                            <h2 className="text-2xl font-bold">
                                {title}
                            </h2>

                            <p className="text-base-content/60 mt-2">
                                AI generated analysis based on the available information.
                            </p>
                        </div>

                        <div className="prose max-w-none prose-headings:text-base-content prose-p:text-base-content prose-li:text-base-content">
                            <ReactMarkdown>
                                {content}
                            </ReactMarkdown>
                        </div>

                        <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
                            <p className="text-sm text-base-content/70">
                                ⚠️ This response is AI-generated. Verify important information before making hiring or career decisions.
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <BaseButton
                                type="button"
                                text="Close"
                                className="btn btn-primary"
                                handleOnClick={handleIsAIResponse}
                            />
                        </div>

                    </div>
                </div>
            ) : (
                <div className="bg-base-100 border border-base-300 rounded-xl p-10 text-center">
                    <h3 className="text-lg font-semibold">
                        No AI Response Available
                    </h3>

                    <p className="text-base-content/60 mt-2">
                        Try generating the analysis again.
                    </p>
                </div>
            )}
        </div>
    )
}