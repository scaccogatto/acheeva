import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {loginWithGoogle} from "../services/service.js";

function App() {
    const navigate = useNavigate();

    const handleGoogleLogin = async() => {
        await loginWithGoogle();
    }

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-base">Accedi</h1>
            <div className="flex flex-col gap-2">
                <Button variant="outlined" onClick={handleGoogleLogin}>
                    Google
                </Button>
                <Button variant="outlined" onClick={() => navigate("objective")}>
                    Microsoft
                </Button>
            </div>
        </div>
    )
}

export default App
