import {Button, Card, CardActions, CardContent, SwipeableDrawer} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Fragment, useContext, useMemo, useState} from "react";
import {AcheevaContext} from "../context/AcheevaContext.jsx";
import {MyButton} from "./Login.jsx";
import Loading from "./Loading.jsx";
import {FullButton} from "./Quiz.jsx";

const Schedule = () => {

    const navigate = useNavigate();
    const {myObjectives, objective, timeline} = useContext(AcheevaContext) || {};
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [clickedModule, setClickedModule] = useState(undefined);
    const handleNext = () => {
        navigate("/quiz")
    }

    /*const timelineDates = useMemo(() => {
        if (myObjectives && myObjectives.length !== 0) {
            return timeline?.delta - myObjectives[myObjectives.length - 1]?.modules.length;
        }
    }, [myObjectives]);*/

    return (
        <Fragment>
            {myObjectives[0]?.quizReady ?
                <div className="fflex flex-col p-7 md:p-20 gap-10">
                    <div className="flex justify-center mb-4">
                        <img src="/schedule.svg"/>
                    </div>
                    <h1 className="text-lg font-semibold">{objective}</h1>
                    <p className="text-sm mt-4">Abbiamo creato il tuo programma di studio personalizzato.</p>
                    {/*<p className="text-xs font-bold my-4 text-blue-400">DEADLINE: {timeline?.endDate}</p>*/}

                    <div className="mt-4 flex flex-col gap-3">
                        {myObjectives[0]?.modules?.map((module, index) => {
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
                                                <p className="font-light">Modulo {index + 1}</p>
                                                <h1 className="capitalize font-semibold mb-2">{module.title}</h1>
                                                <p className="text-sm">Concludi <span className="font-semibold">entro il 27/10/23</span> per
                                                    ricevere le
                                                    reward.</p>
                                            </div>
                                            <div className="flex">
                                                <MyButton variant="contained"
                                                          sx={{fontSize: "10px"}} onClick={() => {
                                                    setIsAnswerOpen(true);
                                                    setClickedModule(index);
                                                }}>Dettagli</MyButton>
                                                <MyButton variant="contained" color="secondary"
                                                          sx={{padding: "3px 15px"}}
                                                          onClick={() => navigate(`/quiz/${index}`)}>Fai il
                                                    test</MyButton>

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
                    <h3 className="font-semibold text-xl mb-3">Abstract</h3>
                    {myObjectives[0]?.modules &&
                        <p className="text-sm p-4">{myObjectives[0]?.modules[clickedModule]?.summary}</p>
                    }
                </div>

            </SwipeableDrawer>
        </Fragment>

    );

}

export default Schedule;
