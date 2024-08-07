import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount , setAmount] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="h-max w-96 border-2 shadow-md ">
          <div className="text-center font-bold text-3xl pt-5">Send Money</div>
          <div className="flex items-center space-x-4 pt-10 pl-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
            </div>
            <div className="text-2xl font-semibold">{name}</div>
          </div>

          <div className="space-y-4 py-5 px-5">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Amount (in Rs)
              </label>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
              />
            </div>
            <button onClick={() => {
              axios.post("http://localhost:3000/api/v1/account/transfer" , {
                to:id,
                amount
              },{
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              })
              navigate("/dashboard")
            }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
