import { createContext, useState, useEffect } from 'react';

import {jwtDecode} from 'jwt-decode'

import {apiClient} from '../api/userApis'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);

    useEffect( () => {
        const token = localStorage.getItem('token')

        if(token) {
            const user = jwtDecode('token')
            setToken()
            setUser(user)
        }
        setIsLoading(false)
    }, [])

  const loginUser = async (data) => {
    try {
        const response = await apiClient.post('users/login' , {
            login: data.login,
            password: data.password
        })
        if(response.data) {
            const token = response.data.token;
            const user = jwtDecode(token)
            setToken(token)
            setUser(user)
            return{token, user}
        } else {
            throw new Error("response data is undefined")
        }
    } catch (error) {
        console.error("failed to log in ", error);
        throw error
    }

  };

  const logoutUser = () => {
    localStorage.removeItem('token')
    setToken(null);
    setUser(null)
  }

  return( <AuthContext.Provider value={{isLoading, token, user, loginUser, logoutUser }}>{children}</AuthContext.Provider>)
};
