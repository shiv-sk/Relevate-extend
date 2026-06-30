import { Education, Experience, ProfileInterface, Projects, SocialMedia } from "@/interfaces/profileInterface";
import BaseButton from "./baseButton";
import BaseInput from "./baseInput";
import Textarea from "./textarea";

export default function ProfileForm(
    {
        skill, 
        onChange, 
        onSubmit, 
        addSkill, 
        form, 
        addEducation, 
        addProject, 
        addSocialMedia, 
        addExperience, 
        onEducationChange, 
        onExperienceChange, 
        onProjectChange, 
        onSocialMediaChange, 
        education, 
        project, 
        experience, 
        socialMedia,
        onProjectLinkChange,
        isLoading, 
        removeEducation, 
        removeSocialMedia, 
        removeProjects, 
        removeExperience, 
        title, 
        btnTitle, 
        removeSkill
    }: {
        skill: string, 
        onChange: (key: string, value: string)=>void, 
        onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void, 
        addSkill: ()=>void, 
        form: ProfileInterface, 
        addEducation: ()=>void, 
        addProject: ()=>void, 
        addSocialMedia: ()=>void, 
        addExperience: ()=>void, 
        onEducationChange: (key: keyof Education, value: string)=>void, 
        onExperienceChange: (key: keyof Experience, value: string)=>void, 
        onProjectChange: (key: keyof Projects, value: string)=>void, 
        onSocialMediaChange: (key: keyof SocialMedia, value: string)=>void, 
        education: Education, 
        project: Projects, 
        experience: Experience, 
        socialMedia: SocialMedia, 
        onProjectLinkChange: (key: string, value: string)=>void,
        isLoading: boolean, 
        removeEducation: (index: number)=>void, 
        removeSocialMedia: (index: number)=>void, 
        removeProjects: (index: number)=>void, 
        removeExperience: (index: number)=>void, 
        title: string, 
        btnTitle: string, 
        removeSkill: (index: number)=>void
    }){
    return(
        <div className="bg-base-100 flex justify-center items-center max-w-sm w-full p-6 rounded-lg shadow-lg mx-auto flex-col">
            <h1 className="text-center font-bold text-2xl underline">{title}</h1>
            <div>
                <form className="gap-2.5 py-6 space-y-3 w-full" onSubmit={onSubmit}>
                    <BaseInput
                    label="Name" 
                    type="text" 
                    onChange={(e)=>onChange("name", e.target.value)}
                    value={form.name} 
                    placeholder="John Doe" />
                            
                    <BaseInput
                    label="Email" 
                    type="text" 
                    onChange={(e)=>onChange("email", e.target.value)} 
                    value={form.email} 
                    placeholder="exp123@email.com" />
        
                    <BaseInput 
                    label="CurrentLocation" 
                    type="text" 
                    onChange={(e)=>onChange("currentLocation", e.target.value)} 
                    value={form.currentLocation} 
                    placeholder="Lucknow" />

                    <BaseInput 
                    label="LookingFor" 
                    type="text" 
                    onChange={(e)=>onChange("lookingFor", e.target.value)} 
                    value={form.lookingFor} 
                    placeholder="Testing" />

                    <Textarea 
                    label="Bio" 
                    value={form.bio} 
                    onChange={(e)=>onChange("bio", e.target.value)} 
                    placeholder={"bio"} />

                    <div className="space-y-1.5">
                        <BaseInput 
                        label="Skill" 
                        type="text" 
                        onChange={(e)=>onChange("skill", e.target.value)} 
                        value={skill} 
                        placeholder="Testing" />
                        <BaseButton 
                        type="button" 
                        text="Add" 
                        className="btn btn-secondary py-2.5 px-2"
                        handleOnClick={addSkill}/>
                        {
                            form.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {
                                        form.skills.map((skill, index)=>(
                                            <span key={index} className="badge badge-outline badge-primary">
                                                {skill}
                                                <BaseButton 
                                                type="button" 
                                                text="✕" 
                                                className="ml-1 text-red-500"
                                                handleOnClick={()=>removeSkill(index)}/>
                                            </span>
                                        ))
                                    }
                                </div>
                            )
                        }  
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="text-lg font-semibold">Education 
                            <span className="font-normal">(optional)</span>
                        </h3>
                        {
                            form.education.length > 0 && form.education.map((edu, index)=>(
                                <li key={index} className="p-2 border rounded">
                                    <p><b>{edu.institute}</b></p>
                                    <p>{edu.degree} ({edu.passoutYear})</p>
                                    <BaseButton 
                                    type="button" 
                                    text="remove" 
                                    className="text-red-500 text-sm"
                                    handleOnClick={() => removeEducation(index)}/>
                                </li>
                            ))
                        }
                        <BaseInput 
                        label="Institute" 
                        type="text" 
                        onChange={(e)=>onEducationChange("institute" , e.target.value)} 
                        value={education.institute || ""} 
                        placeholder="Institute Name" />

                        <BaseInput 
                        label="Degree" 
                        type="text" 
                        onChange={(e)=>onEducationChange("degree" , e.target.value)} 
                        value={education.degree || ""} 
                        placeholder="BE" />

                        <BaseInput 
                        label="PassoutYear" 
                        type="number" 
                        onChange={(e)=>onEducationChange("passoutYear" , e.target.value)} 
                        value={education.passoutYear || 0}  />
                        
                        <BaseButton 
                        type="button" 
                        text="Add" 
                        className="btn btn-secondary py-2.5 px-2"
                        handleOnClick={addEducation}/>
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="text-lg font-semibold">Experience 
                            <span className="font-normal">(optional)</span>
                        </h3>
                        {
                            form.experience.length > 0 && form.experience.map((exp, index)=>(
                                <li key={index} className="p-2 border rounded">
                                    <p><b>{exp.company}</b></p>
                                    <p>{exp.role} ({exp.years})</p>
                                    <BaseButton 
                                    type="button" 
                                    text="remove" 
                                    className="text-red-500 text-sm"
                                    handleOnClick={() => removeExperience(index)}/>
                                </li>
                            ))
                        }
                        <BaseInput 
                        label="Company" 
                        type="text" 
                        onChange={(e)=>onExperienceChange("company", e.target.value)} 
                        value={experience.company || ""} 
                        placeholder="Company Name" />

                        <BaseInput 
                        label="Role" 
                        type="text" 
                        onChange={(e)=>onExperienceChange("role", e.target.value)} 
                        value={experience.role || ""}
                        placeholder="Tester" />

                        <BaseInput 
                        label="Years" 
                        type="number"  
                        onChange={(e)=>onExperienceChange("years", e.target.value)} 
                        value={experience.years || 0}  />

                        <BaseButton 
                        type="button" 
                        text="Add" 
                        className="btn btn-secondary py-2.5 px-2"
                        handleOnClick={addExperience}/>
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="text-lg font-semibold">Project 
                            <span className="font-normal">(optional)</span>
                        </h3>
                        {
                            form.projects.length > 0 && form.projects.map((pro, index)=>(
                                <li key={index} className="p-2 border rounded">
                                    <p><b>{pro.name}</b></p>
                                    <p>{pro.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                        <a href={pro.links?.github}>Github</a>
                                        <a href={pro.links?.live}>Live</a>
                                        <a href={pro.links?.demo}>Demo</a>
                                    </div>
                                    <BaseButton 
                                    type="button" 
                                    text="remove" 
                                    className="text-red-500 text-sm"
                                    handleOnClick={() => removeProjects(index)}/>
                                </li>
                            ))
                        }
                        <BaseInput 
                        label="Name" 
                        type="text" 
                        onChange={(e)=>onProjectChange("name", e.target.value)} 
                        value={project.name || ""} 
                        placeholder="Project Name" />

                        <BaseInput 
                        label="Description" 
                        type="text" 
                        onChange={(e)=>onProjectChange("description", e.target.value)} 
                        value={project.description || ""} 
                        placeholder="About Project" />
                        
                        <BaseInput 
                        label="Github" 
                        type="text" 
                        onChange={(e)=>onProjectLinkChange("github", e.target.value)} 
                        value={project.links?.github || ""}
                        placeholder="Project-Github-Link"  />

                        <BaseInput 
                        label="Live" 
                        type="text" 
                        onChange={(e)=>onProjectLinkChange("live", e.target.value)} 
                        value={project.links?.live || ""}
                        placeholder="Project-Live-Link"  />

                        <BaseInput 
                        label="Demo" 
                        type="text" 
                        onChange={(e)=>onProjectLinkChange("demo", e.target.value)} 
                        value={project.links?.demo || ""}
                        placeholder="Project-Demo-Link"  />

                        <BaseButton 
                        type="button" 
                        text="Add" 
                        className="btn btn-secondary py-2.5 px-2"
                        handleOnClick={addProject}/>
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="text-lg font-semibold">SocialMedia 
                            <span className="font-normal">(optional)</span>
                        </h3>
                        {
                            form.socialMedia.length > 0 && form.socialMedia.map((media, index)=>(
                                <li key={index} className="p-2 border rounded">
                                    <a href={media.link}>{media.name}</a>
                                    <BaseButton 
                                    type="button" 
                                    text="remove" 
                                    className="text-red-500 text-sm"
                                    handleOnClick={() => removeSocialMedia(index)}/>
                                </li>
                            ))
                        }
                        <BaseInput 
                        label="Name" 
                        type="text" 
                        onChange={(e)=>onSocialMediaChange("name", e.target.value)} 
                        value={socialMedia.name || ""} 
                        placeholder="SocialMedia Name" />

                        <BaseInput 
                        label="Link" 
                        type="text" 
                        onChange={(e)=>onSocialMediaChange("link", e.target.value)} 
                        value={socialMedia.link || ""} 
                        placeholder="SocialMedia-Link" />

                        <BaseButton 
                        type="button" 
                        text="Add" 
                        className="btn btn-secondary py-2.5 px-2"
                        handleOnClick={addSocialMedia}/>
                    </div>

                    <BaseButton
                    isLoading={isLoading} 
                    type="submit" 
                    text={btnTitle} 
                    className="btn btn-primary py-2.5 px-2 w-full"/>
                </form>
            </div>
        </div>
    )
}