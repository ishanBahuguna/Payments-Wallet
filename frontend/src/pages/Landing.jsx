import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import AppBar from '../components/AppBar';

export default function Landing() {
    const navigate = useNavigate();
    const signinNavigate = () => navigate("/signin")
    const signupNavigate = () => navigate("/signup")
    return (
        <div className='bg-slate-200 h-screen'>
            <div className='flex justify-between h-max'>
                <div className='w-5/12  mt-60 flex justify-center'>
                    <div className='flex-wrap flex-col  ml-10 mr-16 font-medium text-2xl italic'>
                    This atomic payments wallet app is a secure and efficient solution for managing digital transactions, built with the MERN stack. It leverages MongoDB and the Mongoose library to ensure consistent and reliable transactions, while the React-powered frontend offers a dynamic and responsive user interface. The backend is handled by Express.js, with JWT-based authentication securing all routes and user data. Designed for seamless functionality without relying on third-party APIs, this app combines cutting-edge technology with robust security for a streamlined digital payments experience.
                    </div>
                </div>
                <div className='w-7/12 pt-72 flex justify-evenly'>
                    <div className='flex-wrap flex-col max-w-96 font-bold text-2xl'>
                        Already Have an Account? Signin
                        <div className='pt-10'>
                            <Button label={"Sign in"} onClick={signinNavigate}/>
                        </div>
                    </div>
                    <div className='flex-wrap flex-col text-2xl font-bold w-80'>
                        New User 
                        <div className='pt-10'>
                            <Button label={"Sign up"} onClick={signupNavigate}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
