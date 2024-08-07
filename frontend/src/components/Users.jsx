import React, { useEffect, useState } from 'react'
import  Button  from "./Button"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const [users , setUsers] = useState([]);
    const [filter , setFilter] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(res => {
                setUsers(res.data.user)
            })
    } , [filter])

  return (
    <div>
        <div className='font-semibold ml-10 mt-3'>
            Users
        </div>
        <div className='ml-10 mt-4 border-2 shadow-xl border-slate-300 mr-40 pr-4 rounded-lg'>
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} className={'w-full ml-3'} type="text" placeholder='Search users . . . . ' />
        </div>
        <div className='mt-10 ml-10 mr-40 flex flex-col gap-3'>
            {users.map(user => <User user={user} />)}
        </div>
    </div>
  )
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
    <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
                {user.firstName[0]}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <div>
                {user.firstName} {user.lastName}
            </div>
        </div>
    </div>

    <div className="flex flex-col justify-center h-ful">
        <Button onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName)
        }} label={"Send Money"} />
    </div>
</div>
}

