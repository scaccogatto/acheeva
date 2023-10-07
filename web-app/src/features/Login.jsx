import '../App.css'
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

function App() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-base">Accedi con la tua email</h1>
            <Button onClick={() => navigate("pdf")}>
                Google
            </Button>
            <Button onClick={() => navigate("objective")}>
                Microsoft
            </Button>

        </div>
    )
}

export default App
