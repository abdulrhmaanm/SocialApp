import axios from "axios";
import { useEffect } from "react";
import { useState, createContext } from "react";

export const AuthContext = createContext(null);


export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const  [userData,setUserData]= useState(null)
  const [apiError,setApiError] = useState(null)
  const [success, setSuccess] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }

  },[]
  ) ;

  useEffect(()=>{
    if(token){
    getProfileData(token)
    }

  },[token]
  ) ;

  async function getProfileData(token) {
    try{
      const {data : response} = await axios.get(
        `https://linked-posts.routemisr.com/users/profile-data`,
        {
        headers : {token},
        }
      )   
          setUserData(response.user)
          setSuccess(true);
    }
    catch (error) {
    console.error( error);
    setApiError(error.response.data.error)
  }
  }


  return (
    <AuthContext.Provider value={{ token, setToken , userData}}>
      {children}
    </AuthContext.Provider>
  );
}
