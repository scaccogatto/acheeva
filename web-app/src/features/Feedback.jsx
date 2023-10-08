import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {MyButton} from "./Login.jsx";
import {useContext} from "react";
import {AcheevaContext} from "../context/AcheevaContext.jsx";

const Feedback = () => {

    const navigate = useNavigate();
    const {feedback, setFeedback} = useContext(AcheevaContext);

    const handleContinue = () => {
        navigate("/objective");
    }

    return (
        <div className="flex flex-col justify-center items-center p-7 md:p-20 gap-8">
            <div className="flex justify-center">
                <img src="../../public/si-fly.svg" width={400} height="auto"/>
            </div>
            <div>
                <h1 className="font-semibold text-lg mb-2">{feedback.goodReply? "Si vola" : "Ci siamo quasi"}</h1>
                <p>{feedback.goodReply? "Sei in anticipo sulla tabella di marcia, la tua risposta è eccellente!": "La risposta non è sufficiente per ritenersi soddisfatti e pronti al 100%."}</p>
            </div>
            <MyButton variant="contained" onClick={handleContinue}>Vai il prossimo modulo</MyButton>
        </div>
    );

}

export default Feedback;
