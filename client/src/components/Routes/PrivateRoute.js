import React, {useContext, useEffect, useState} from 'react'

import { Route, Redirect } from 'react-router-dom'

import UserContext from './../../context/User/UserContext'

export default function PrivateRoute({ component: Component, ...props }) {

    const userCtx = useContext(UserContext)
    
    const { authStatus, verifyingToken } = userCtx

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            await verifyingToken();
            setLoading(false);
        };
        
        checkAuth();
    }, [verifyingToken]); // Dependencia correcta

    if (loading) {
        // Puedes mostrar un spinner de carga o algo similar aquí
        return <div>Loading...</div>;
    }
    console.log('AuthStatus:', authStatus);

    return (
        <Route {...props} render={ props => {            

            if(loading) return null

            return authStatus ? 
                (<Component {...props} />)
                :
                (<Redirect to="/iniciar-sesion" />)
            }
        } />
    )
        
    
}
