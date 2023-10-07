import {AcheevaContext} from "../context/AcheevaContext.jsx";
import {useState} from 'react';


const AcheevaProvider = ({children}) => {

    const [objective, setObjective] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <AcheevaContext.Provider value={{objective, user, setObjective, setUser}}>
            {children}
        </AcheevaContext.Provider>
    );
};

export default AcheevaProvider;