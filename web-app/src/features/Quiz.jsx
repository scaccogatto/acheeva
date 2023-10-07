import {Button, CircularProgress, TextareaAutosize} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Quiz = () => {

    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/feedback");
    }

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-lg font-semibold">Quiz</h1>
            <div>
                <h2 className="text-default mb-2">Qual è il cavallo bianco di Napoleone?</h2>
                <TextareaAutosize
                    minRows={4} // You can specify the minimum number of rows here
                    placeholder="Enter your response here"
                    className="w-full"
                />
            </div>
            <Button variant="outlined" onClick={handleNext}>View score</Button>
        </div>
    );

}

export default Quiz;
