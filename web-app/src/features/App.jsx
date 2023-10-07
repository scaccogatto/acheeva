import {Button, CircularProgress, IconButton} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import {Fragment, useContext, useEffect} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../services/service.js";
import {auth} from "../firebase.js";
import {useAuthState} from "react-firebase-hooks/auth";
import {AcheevaContext} from "../context/AcheevaContext.jsx";

const App = () => {

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const {setUser} = useContext(AcheevaContext);

    const handleLogout = async () => {
        await logout();
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            setUser(user);
            navigate("/objective");
        }
    }, [user])

    return (
        <Fragment>
            <div className="flex justify-between">
                <p>{user?.displayName}</p>
                <IconButton>
                    <MenuIcon/>
                </IconButton>
                <IconButton onClick={handleLogout}>
                    <LogoutIcon/>
                </IconButton>
            </div>
            <div className="flex flex-col justify-center">
            <Outlet/>
            </div>
        </Fragment>
    );

}

export default App;
