import {AcheevaContext} from "../context/AcheevaContext.jsx";
import {useState} from 'react';


const AcheevaProvider = ({children}) => {

    const [objective, setObjective] = useState(null);
    const [user, setUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [myObjectives, setMyObjectives] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [feedback, setFeedback] = useState(null);
    return (
        <AcheevaContext.Provider value={{
            objective,
            user,
            setObjective,
            setUser,
            isUserLoading,
            setIsUserLoading,
            myObjectives,
            setMyObjectives,
            timeline,
            setTimeline,
            feedback,
            setFeedback
        }}>
            {children}
        </AcheevaContext.Provider>
    );
};

export default AcheevaProvider;