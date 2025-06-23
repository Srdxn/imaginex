import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const loadCreditsData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } });

            if (data.success) {
                setCredit(data.user.credits);
                setUser(data.user.name);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    }


    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/image/generate-image',
                { prompt },
                { headers: { token } }
            );


            if (data.success) {
                loadCreditsData();
                return data.resultImage;
            } else {
                toast.error(data.message);
                return null;
            }

        } catch (error) {

            const message = error.response?.data?.message || error.message;
            const creditBalance = error.response?.data?.creditBalance;
            

            if (creditBalance === 0) {
                navigate('/buy-credit');
                toast.error("Insufficient Credits");
            } else {
                toast.error(message);
            }


            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        window.location.reload();
    }


    useEffect(() => {
        if (token) {
            loadCreditsData();

        }
    }, [token])

    const value = {
        user, setUser, menuOpen, setMenuOpen, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider