"use client";

import useAuth from "@/hooks/useAuth";
import { Input } from "../ui/input";

// import useLogin from '../../hooks/useLogin';
// import Error from '../alerts/errors';

export default function LoginForm() {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        errors,
        errorMessage,
        setErrorMessage,
    } = useAuth();
    

    return <>
    <div className=" w-full h-screen flex justify-center items-center bg-gray-100 overflow-hidden">
        <div className=" bg-white p-5 lg:p-10 rounded-lg">
            <h1 className=" text-center mb-3 lg:mb-6 font-semibold text-gray-900 text-lg lg:text-xl">Log in to your account</h1>
            <form 
                onSubmit={handleLogin}
            >
                <div className=" flex flex-col justify-center items-start mb-3">
                    <label className=" text-xs lg:text-sm font-medium text-gray-900 mb-1" htmlFor="email">Email Address <span className=" text-red-600">*</span></label>
                    <Input 
                        onChange={(e) => { setEmail(e.target.value) } }
                        value={email}
                        id="email" 
                        type="email"
                        name="email"
                        placeholder=" Enter Email Address" 
                        className=" w-60 lg:w-72 h-8 lg:h-9 px-1 rounded-md border-[0.5px] border-gray-500 focus:border-blue-600 text-xs lg:text-sm" 
                    />
                    {/* {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>} */}
                </div>
                <div className="  flex flex-col justify-center items-start mb-3">
                    <label className=" text-xs lg:text-sm font-medium text-gray-900 mb-1" htmlFor="password">Password <span className=" text-red-600">*</span></label>
                    <Input 
                        onChange={ (e) => { setPassword(e.target.value) }}
                        value={password}   
                        id="password" 
                        type="password" 
                        name="password"
                        placeholder=" Enter Password" 
                        className=" w-60 lg:w-72 h-8 lg:h-9 px-1 rounded-md border-[0.5px] border-gray-500 focus:border-blue-600 text-xs lg:text-sm" 
                    />
                    {/* {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>} */}
                </div>
                <div className=" flex justify-between items-center mb-2">
                    <div className="flex justify-start items-end gap-2">
                        <input type="checkbox" name="remember" id="remember" required />
                        <label htmlFor="remember" className="text-xs lg:text-sm text-gray-800">Remember me <span className=" text-red-600">*</span></label>
                    </div>
                    <p className=" text-xs lg:text-sm underline text-blue-700 cursor-pointer">forgot password</p>
                </div>
                <div className="">
                    <button className=" w-full h-9 bg-blue-700 hover:bg-blue-600 rounded-md text-white font-semibold text-sm lg:text-sm">Log In</button>
                </div>
                <div className="relative flex py-3 lg:py-5 items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-700">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="">
                    <button className=" flex justify-center items-center gap-3 w-full h-9 border-[1px] border-gray-500 rounded-md text-gray-800 text-xs font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 48 48">
                            <defs>
                              <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                            </defs>
                            <clipPath id="b">
                              <use href="#a" overflow="visible" />
                            </clipPath>
                            <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
                            <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
                            <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
                            <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
                        </svg>
                        <p>Connect with Google</p>
                    </button>
                </div>
                <div className=" flex justify-center items-center mt-6">
                    <p className=" text-xs font-medium text-gray-800">Need an account? 
                    <a className=" text-blue-500" href=""> Create an account</a></p>
                </div>
            </form>
        </div>
    </div>
    {/* {errorMessage && <Error errorMessage={ errorMessage } setErrorMessage={ setErrorMessage } />} */}
</>
}
