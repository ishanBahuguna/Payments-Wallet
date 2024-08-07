import axios  from 'axios'
import React  , { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [username , setUsename] = useState("");
  const [password , setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
            <Heading label={"Sign up"}/>
            <SubHeading label={"Enter your information to create an account"}/>
            <InputBox onChange={e => {
              setFirstName(e.target.value);
            }} placeholder={"First Name"} label={"First Name"}/>
            <InputBox onChange={e => {
              setLastName(e.target.value);
            }} placeholder={"Last Name"} label={"Last Name"}/>
            <InputBox onChange={e => {
              setUsename(e.target.value);
            }} placeholder={"email"} label={"E-mail"}/>
            <InputBox onChange={e => {
              setPassword(e.target.value);
            }} placeholder={"Password"} label={"Password"}/>
            <div className='pt-4'>
              <Button onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
                  username,
                  firstName,
                  lastName,
                  password
                })
                localStorage.setItem("token" , response.data.token);
                navigate("/dashboard");
              }} label={"Sign up"}/>
            </div>
            <ButtonWarning label={"Already Have an account?"} buttonText={"Sign in"} to={"/signin"}/>
        </div>
      </div>
    </div>
  )
}
