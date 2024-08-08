import axios from "axios";
import React, { useState } from 'react'

export const useSignup = () => {
    const[error , setError] = useState("");

    const signup = async ({username , firstName , lastName , password}) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
                username,
                firstName,
                lastName,
                password
            });

            if(response.status === 411) {
                setError(response.data.message || "411 Error : Length Required");
                return { success : false };
            } else {
                return { success : true , token : response.data.token};
            }
        }
        catch(err) {
            if(err.response && err.response.status === 411) {
                setError(err.response.data.message || "411 Error : Length Required");
            } else {
                setError("An unexpected error occured. Please try again")
            }
            return { success : false };
        }
    }

    return { error , signup ,};
}
