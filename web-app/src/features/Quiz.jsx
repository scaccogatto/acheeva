import {Card, CardContent, SwipeableDrawer, TextareaAutosize} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {Fragment, useContext, useEffect, useMemo, useState} from "react";
import {AcheevaContext} from "../context/AcheevaContext.jsx";
import {MyButton} from "./Login.jsx";
import styled from "@emotion/styled";
import {checkQuiz} from "../services/service.js";
import AcheevaProvider from "../providers/AcheevaProvider.jsx";

const Quiz = () => {

    const navigate = useNavigate();
    const {number} = useParams();
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [answer, setAnswer] = useState("");
    const {setFeedback, myObjectives} = useContext(AcheevaContext) || {};

    const myLastObjective = useMemo(() => {
        if (myObjectives && myObjectives.length !== 0) {
            return myObjectives[myObjectives.length - 1];
        } else return undefined;
    }, [myObjectives]);
    const handleVerifyAnswer = async () => {
        const response = await checkQuiz(answer, myLastObjective.id, myLastObjective.quizQuestions[number]);
        setFeedback({...response, number});
        return navigate("/feedback");
    }

    const {user, isUserLoading} = useContext(AcheevaProvider) || {};


    useEffect(() => {

        if(isUserLoading !== undefined && !isUserLoading && !user && user !== undefined) {
            navigate("/login");
        }

    }, [user, isUserLoading])


    return (
        <Fragment>
            <div className="flex flex-col justify-center px-7 md:px-20 gap-5">
                <div style={{
                    borderRadius: "12px",
                    width: "327px",
                    height: "172px",
                    backgroundImage: `url(${myLastObjective?.modules[number]?.picture})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                }}/>
                <div>
                    <h1 className="text-xl">Modulo {Number(number) + 1}</h1>
                    <h2 className="capitalize font-bold">{myLastObjective?.modules[number].title}</h2>
                    <p className="text-xs">
                        Rispondi a questa domanda per testare il tuo livello di preparazione entro il giorno:
                    </p>
                </div>
                <Card sx={{
                    borderRadius: "16px",
                    background: "rgba(128, 79, 208, 0.20)",
                    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.15)"
                }}>
                    <CardContent>
                        <p className="font-semibold text-sm mb-2">Domanda</p>
                        <p className="text-xs">"{myLastObjective?.quizQuestions[number]}"</p>
                    </CardContent>
                </Card>
                <div className="flex flex-col items-center gap-2 mt-5">
                    <FullButton variant="outlined" onClick={() => setIsAnswerOpen(true)}>Crea risposta</FullButton>
                    <FullButton variant="contained" onClick={handleVerifyAnswer}
                                disabled={!answer}>Verifica</FullButton>
                </div>

            </div>
            <SwipeableDrawer
                anchor="bottom"
                open={isAnswerOpen}
                onClose={() => setIsAnswerOpen(false)}
                onOpen={() => setIsAnswerOpen(true)}
                sx={{
                    height: "50%", borderRadius: "24px 24px 0px 0px"
                }}
            >
                <div style={{height: "60vh", borderRadius: "24px 24px 0px 0px"}} className="p-3">
                    <h3 className="font-semibold text-xl mb-3">La tua risposta</h3>
                    <textarea
                        minRows={5} // You can specify the minimum number of rows here
                        placeholder="Inserisci la tua risposta..."
                        className="w-full p-3"
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
                <div className="m-auto w-full p-8">
                    <FullButton variant="contained" onClick={handleVerifyAnswer}
                        disabled={!answer}>Verifica</FullButton>
                </div>
            </SwipeableDrawer>
        </Fragment>
    );

}

export default Quiz;

export const FullButton = styled(MyButton)`
  width: 100%;
`
