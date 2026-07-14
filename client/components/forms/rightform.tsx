import { Register } from "@/interfaces/registerInterface";
import RegisterForm from "./registerForm";
import { Login } from "@/interfaces/loginInterface";
import LoginForm from "./loginForm";
export default function RightSideForm({onChange, form, onSubmit, isLoading, isLogin, handleDemoEmployer, handleDemoJobSeeker}: 
    {
        onChange: (key: string, value: string)=>void, 
        form: Register | Login, 
        onSubmit: (e: React.FormEvent<HTMLFormElement>)=>void,
        isLoading: boolean,
        isLogin: boolean,
        handleDemoEmployer?: ()=>void,
        handleDemoJobSeeker?: ()=>void,
    }) {
    return(
        <div className="p-10 lg:p-14">
            <h2 className="text-3xl font-bold">
                {isLogin ? "Welcome back!" : "Create Account"}
            </h2>
            <p className="text-base-content/60 mt-2">
                {isLogin ? "Sign in to manage your career or hiring journey." : "Join thousands of job seekers."}
            </p>
            {
                isLogin ? 
                <LoginForm 
                onChange={onChange} 
                form={form as Login} 
                onSubmit={onSubmit} 
                isLoading={isLoading} 
                handleDemoEmployer={handleDemoEmployer!} 
                handleDemoJobSeeker={handleDemoJobSeeker!} /> : 
                (
                    <RegisterForm 
                    onChange={onChange} 
                    form={form as Register}
                    onSubmit={onSubmit} 
                    isLoading={isLoading} />
                )
            }
        </div>
    )
}