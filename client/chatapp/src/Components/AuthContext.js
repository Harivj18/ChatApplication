import axios from 'axios';
import React, {useState, useEffect, createContext} from 'react';

export const AuthProvider = createContext();

export const AuthContext = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const authUrl = `http://localhost:8000/protectedRoutes/authCheck`
    useEffect(()=> {
        axios.get(authUrl, {withCredentials: true}).then((res)=> {
            console.log('statusstatus',res);
            if (res['data']['status'].toUpperCase() === 'SUCCESS') {
                setIsAuthenticated(true)
            }
        }).catch((err) => {
            console.log('Error while check AUth Status',err);            
        })
    }, [])
    return (
        <AuthProvider.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthProvider.Provider>
    )
}
