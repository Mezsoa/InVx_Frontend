import {createContext, useEffect, useState} from "react";
import axios from "axios";

const SignupContext = createContext();

const SignupProvider = ({children}) => {
   

    // START FetchSignup SECTION ==========================
    const [signupValue, setSignupValue] = useState([]);
    const [error, setError] = useState([]);

    const fetchSignup = async (signupValue) => {
        
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, signupValue)
        }
        catch (error) {
            console.log(error);
            setError(error);
            if (error.response.data.message === "Error: username already exists!") {
                alert("Username already exists!");
            }
            if (error.response.data.message === "Error: email already exists!") {
                alert("Email already exists!");
            }
            if (error.response.data.message ===
                "JSON parse error: Cannot coerce empty String (\"\") to `sidkbk.celemo.models.EGender` value (but could if coercion was enabled using `CoercionConfig`)") {
                    alert("Please choose gender!");
                }
            console.log(error.response.data.message);
        }
    }


    return (
        <SignupContext.Provider value={{
            fetchSignup,
            signupValue,
            setSignupValue
        }}>
            {children}
        </SignupContext.Provider>
    );
}

export {SignupContext, SignupProvider};