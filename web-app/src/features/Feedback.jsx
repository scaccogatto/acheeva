import {useNavigate} from "react-router-dom";
import {MyButton} from "./Login.jsx";
import {useCallback, useContext, useEffect} from "react";
import {AcheevaContext} from "../context/AcheevaContext.jsx";
import AcheevaProvider from "../providers/AcheevaProvider.jsx";

const Feedback = () => {

    const navigate = useNavigate();
    const {feedback, setFeedback} = useContext(AcheevaContext);

    const {user, isUserLoading} = useContext(AcheevaProvider) || {};


    const handleContinue = useCallback(() => {
        if(!feedback?.goodReply) {
            navigate(`/quiz/${feedback?.number}`);
        } else {
            navigate("/schedule");
        }
    }, [feedback]);

    return (
        <div className="flex flex-col justify-center items-center p-7 md:p-20 gap-8">
            <div className="flex justify-center">
                <img src="/si-fly.svg" width={400} height="auto"/>
            </div>
            <div>
                <h1 className="font-semibold text-lg mb-2">{feedback?.goodReply? "Si vola" : "Ci siamo quasi"}</h1>
                <p>{feedback?.goodReply? "Sei in anticipo sulla tabella di marcia, la tua risposta è eccellente!": "La risposta non è sufficiente per ritenersi soddisfatti e pronti al 100%."}</p>
                <p className="text-red-800 font-xs mt-2">{!feedback?.goodReply && feedback?.questionCheck}</p>
            </div>

            <MyButton variant="contained" onClick={handleContinue}>{feedback?.goodReply ? "Vai il prossimo modulo" : "Riprova modulo"}</MyButton>
        </div>
    );

}

export default Feedback;
