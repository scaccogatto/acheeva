import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Fallback = () => {

    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/objectives");
    }

    return (
        <div>
            <h1 className="text-green-600 font-semibold text-lg mb-2">Logo</h1>
            <Button onClick={handleNext}>Set your objective</Button>
        </div>
    );

}

export default Fallback;
