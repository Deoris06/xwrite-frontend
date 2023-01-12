import { createContext, useContext, useState, useEffect } from "react";
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])
    const csrf = async () => axios.get('/sanctum/csrf-cookie')
    const getUser = async () => {
        const { data } = await axios.get('/api/user');
        setUser(data);
    }

    const login = async ({ email, password}) => {
        await csrf();
        try {
            await axios.post("/login", { email, password})
            await getUser();
            navigate("/")
        } catch (error) {
            if(error.response.status === 422){
                setErrors(error.response.data.errors)
            }
        }
    }

    const register = async ({ ...data }) => {
        await csrf();
        try {
            await axios.post("/register", data)
            await getUser();
            navigate("/")
        } catch (error) {
            if(error.response.status === 422){
                setErrors(error.response.data.errors)
            }
        }
    }

    const logout = () => {
        axios.post("/logout").then(() => {
            setUser(null);
        });
    }
    useEffect(() => {
        if(!user){
          getUser();
        }
      }, [])
    return <AuthContext.Provider value={{ user, errors, getUser, login, register, logout, csrf }}>{children}</AuthContext.Provider>
}

export default function useAuthContext(){
    return useContext(AuthContext);
}