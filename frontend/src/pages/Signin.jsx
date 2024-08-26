import React , { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signin" , {
      username,
      password
    });
    localStorage.setItem('token' , response.data.token);
    navigate("/dashboard");
  }

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center '>
        <div className='bg-white w-80 h-max text-center rounded-lg'>
          <Heading label={"Sign in"}/>
          <SubHeading label={"Enter your credentials to access your account"}/>
          <InputBox onChange={e => {
            setUsername(e.target.value)
          }} placeholder={"email"} label={"E-mail"}/>
          <InputBox onChange={e => {
            setPassword(e.target.value)
          }} placeholder={"Password"} label={"Password"}/>
          <div className='pt-4 mx-5'>
              <Button onClick={handleSignin} label={"Sign in"}/>
          </div>
          <ButtonWarning label={"Don't have an account"} buttonText={"Sign up"} to={"/signup"}/>
        </div>
      </div>
    </div>
  )
}
