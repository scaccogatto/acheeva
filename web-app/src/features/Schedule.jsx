import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Schedule = () => {

    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/quiz")
    }

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-lg font-semibold"></h1>
            <Button onClick={handleNext}>Test Quiz</Button>
        </div>
    );

}

export default Schedule;
