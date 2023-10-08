import {Button, Card, CardActions, CardContent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Fragment, useContext, useMemo} from "react";
import {AcheevaContext} from "../context/AcheevaContext.jsx";
import {MyButton} from "./Login.jsx";
import Loading from "./Loading.jsx";

const Schedule = () => {

    const navigate = useNavigate();
    const {myObjectives, objective, timeline} = useContext(AcheevaContext) || {};
    const handleNext = () => {
        navigate("/quiz")
    }

    const myLastObjective = useMemo(() => {
        if (myObjectives && myObjectives.length !== 0) {
            return myObjectives[myObjectives.length - 1];
        } else return undefined;
    }, [myObjectives]);

    /*const timelineDates = useMemo(() => {
        if (myObjectives && myObjectives.length !== 0) {
            return timeline?.delta - myObjectives[myObjectives.length - 1]?.modules.length;
        }
    }, [myObjectives]);*/

    return (
        <Fragment>
            {myLastObjective?.quizReady ?
                <div className="fflex flex-col p-7 md:p-20 gap-10">
                    <div className="flex justify-center mb-4">
                        <img src="/schedule.svg"/>
                    </div>
                    <h1 className="text-lg font-semibold">{objective}</h1>
                    <p className="text-sm mt-4">Abbiamo creato il tuo programma di studio personalizzato.</p>
                    {/*<p className="text-xs font-bold my-4 text-blue-400">DEADLINE: {timeline?.endDate}</p>*/}

                    <div className="mt-4 flex flex-col gap-3">
                        {myLastObjective.modules?.map((module, index) => {
                            return (
                                <Card className="p-1" sx={{
                                    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.15)", borderRadius: "10px",
                                    background: "linear-gradient(0deg, rgba(128, 79, 208, 0.50) 0%, rgba(78, 177, 234, 0.50) 100%)"
                                }}>
                                    <CardContent className="grid grid-cols-2 gap-4">
                                        <img width={250} height={250} src={module?.picture} alt="Alt"
                                             style={{borderRadius: "10px"}}/>
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <p className="font-light">Modulo {index+1}</p>
                                                <h1 className="capitalize font-semibold mb-2">{module.title}</h1>
                                                <p className="text-sm">Concludi <span className="font-semibold">entro il 27/10/23</span> per
                                                    ricevere le
                                                    reward.</p>
                                            </div>
                                            <div className="flex">
                                                <MyButton variant="contained" sx={{fontSize: "10px"}}>Dettagli</MyButton>
                                                <MyButton variant="contained" color="secondary"
                                                          sx={{padding: "3px 15px"}} onClick={() => navigate(`/quiz/${index}`)}>Fai il test</MyButton>

                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )

                        })}

                    </div>
                </div>
                :
                <Loading text={"Stiamo generando il tuo programma..."}/>
            }
        </Fragment>

    );

}

export default Schedule;
