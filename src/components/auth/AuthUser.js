import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {

    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const userDetails = JSON.parse(userString);

        return userDetails;
    }

    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const files = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
        hasFiles: true,
    });

    http.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
            sessionStorage.clear();
            navigate('/login');
        //   window.location = '/login';
        }
      });

  return {
    setToken:saveToken,
    token,
    user,
    getToken,
    http,
    files,
    logout
    }
}
