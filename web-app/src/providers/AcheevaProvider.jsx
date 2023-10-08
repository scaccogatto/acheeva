import {AcheevaContext} from "../context/AcheevaContext.jsx";
import {useState} from 'react';


const AcheevaProvider = ({children}) => {

    const [objective, setObjective] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [myObjectives, setMyObjectives] = useState(undefined);
    const [timeline, setTimeline] = useState(undefined);
    const [feedback, setFeedback] = useState(undefined);
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