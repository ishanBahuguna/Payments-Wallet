import axios  from 'axios'
import React  , { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'
import { useNavigate } from 'react-router-dom'
import PopupModal from '../components/PopupModal'
import { useSignup } from '../hooks/useSignup'

export default function Signup() {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [username , setUsename] = useState("");
  const [password , setPassword] = useState("");
  const [showModal , setShowModal] = useState(false);

  const navigate = useNavigate();

  const { error , signup } = useSignup();

  const handleSignup = async () => {
    const res = await signup({username , firstName , lastName , password});

    if(res.success) {
      localStorage.setItem('token' , res.token);
      navigate("/dashboard");
    } else {
      setShowModal(true);
    }
  }

  // const handleSignup = async() => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
  //       username,
  //       firstName,
  //       lastName,
  //       password
  //     });
  //     if(response.status === 411) {
  //       setModalMessage(response.data.message || "411 Error : Length Required")
  //       setShowModal(true);
  //     } else {
  //       localStorage.setItem('token' , response.data.token);
  //       navigate("/dashboard");
  //     }
  //   }
  //   catch(error) {
  //     if(error.response && error.response.status === 411) {
  //       setModalMessage(error.response.data.message || "411 Error : Length Required")
  //       setShowModal(true);
  //     } else {
  //       console.error("Signup error occured" , error)
  //       setModalMessage("An unexpected error occurred. Please try again.");
  //       setShowModal(true);
  //     }
  //   }
  // }

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
                <Button onClick={handleSignup} label={"Signup"}/>
                {showModal && <PopupModal message={error} onClose={() => {
                  setShowModal(false);
                  window.location.reload(false);
                }}/>}
              </div>
              <ButtonWarning label={"Already Have an account?"} buttonText={"Sign in"} to={"/signin"}/>
          </div>
        </div>

      </div>
  )
}
