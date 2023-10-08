import {Button, CircularProgress, IconButton, SwipeableDrawer} from "@mui/material";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Fragment, useContext, useEffect, useCallback, useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout, subscribeToObjectives} from "../services/service.js";
import {auth} from "../firebase.js";
import {useAuthState} from "react-firebase-hooks/auth";
import {AcheevaContext} from "../context/AcheevaContext.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const App = () => {

    const [user, loading] = useAuthState(auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {setUser, setIsUserLoading, setMyObjectives} = useContext(AcheevaContext);

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
    }


    useEffect(() => {
        setIsUserLoading(loading);
    }, [loading]);

    useEffect(() => {
        setUser(user);
    }, [user]);

    useEffect(() => {

        if (user) {
            const unsubscribe = subscribeToObjectives((objectives) => {

                setMyObjectives(objectives.filter(objective => objective.uid === user.uid));
            });

            return () => {
                unsubscribe();
            }
        }
    }, [user]);

    useEffect(() => {
        if ("/" === location.pathname) {
            navigate("/welcome");
        }
    }, [location]);

    return (
        <div>
            <div className="flex justify-between py-3 px-5">
                <IconButton>
                    <ArrowBackIcon onClick={() => navigate(-1)}/>
                </IconButton>
                <img src={"./logo-small.svg"} />
                <IconButton>
                    <MenuIcon onClick={() => setIsMenuOpen(true)}/>
                </IconButton>
            </div>
            <SwipeableDrawer
                anchor="right"
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onOpen={() => setIsMenuOpen(true)}
                sx={{width: "500px"}}
            >
                <div className="p-10">
                    {/*<IconButton onClick={handleLogout}>
                        <LogoutIcon/>
                    </IconButton>*/}
                    <Button onClick={() => { setIsMenuOpen(false); navigate("/welcome")}}>Home</Button>
                </div>
            </SwipeableDrawer>
            <div className="h-full m-auto" style={{maxWidth: "768px"}}>
                <Outlet/>
            </div>
        </div>
    );

}

export default App;
