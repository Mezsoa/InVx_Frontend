import { useEffect, useReducer, createContext } from "react";

// global initial state
const initialState = {
    user: null,
}

// define the reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null}
    
        default:
            return state
    }
}
// create context
const AuthContext = createContext()

// create a provider

const AuthProvider = ({children}) =>{

    //=====================================================================
    const[state, dispatch] = useReducer(rootReducer, initialState)

    useEffect(()=>{
        dispatch({
            type: "LOGIN",
            payload: JSON.stringify(window.localStorage.getItem("user"))
        })
    }, []);

    //======================================================================
    // Logout ==============================================================

    // Logout
    const logout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            })
            localStorage.removeItem("loggedInUserId");
            localStorage.removeItem("user");
        } catch (logoutError) {
            console.log(logoutError);
        }
    }

    return(
        <AuthContext.Provider value={{state,dispatch,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider}