import React, { useEffect, useState } from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios';

export default function Dashboard() {
  const [balance , setBalance] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/account/balance" , {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then((res) => {
        setBalance(res.data.balance)
    });
  } , [balance])


  return (
    <div>
      <AppBar/>
      <Balance value={balance}/>
      <Users/>
    </div>
  )
}
