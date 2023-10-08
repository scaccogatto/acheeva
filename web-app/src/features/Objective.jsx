import {useNavigate} from "react-router-dom";
import {useCallback, useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/index.js";
import {DatePicker} from "@mui/x-date-pickers";
import {AcheevaContext} from "../context/AcheevaContext.jsx";
import styled from "@emotion/styled";
import {MyButton} from "./Login.jsx";
import {differenceInCalendarDays} from "date-fns";

const Objective = () => {
    const navigate = useNavigate();
    const {objective, setObjective} = useContext(AcheevaContext);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const {setTimeline} = useContext(AcheevaContext);
    const handleObjective = e => {
        setObjective(e.target.value);
    }

    const handleStartDate = (date) => {
        setStartDate(date);
    }

    const handleEndDate = (date) => {
        setEndDate(date);
    }

    const handleNext = useCallback(() => {
        setTimeline({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            delta: Math.abs(differenceInCalendarDays(new Date(startDate), new Date(endDate)))
        });
        return navigate("/pdf");
    }, [startDate, endDate]);

    return (
        <div className="flex flex-col justify-center p-7 md:p-20 gap-8">

            <div className="flex justify-center">
                <img src="/objective.svg" width={400} height="auto"/>
            </div>


            <h1 className="font-semibold text-xl">Crea un obiettivo</h1>
            <div>
                <div className="mb-2">
                    <label className="text-sm">Nome<span className="font-semibold"> obiettivo</span></label>
                </div>
                <MyTextField
                    label="Inserisci nome obiettivo"
                    value={objective}
                    type="text"
                    onChange={handleObjective}
                    size="small"
                    fullWidth
                />
            </div>

            <div>
                <label className="text-sm">Scegli la tua<span
                    className="font-semibold"> data di partenza</span></label>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Start date" value={startDate}
                                size="small"
                                onChange={handleStartDate}
                                inputFormat="dd/MM/yyyy"

                    />
                </DemoContainer>
            </div>
            <div>
                <label className="text-sm">Scegli la tua<span className="font-semibold"> deadline</span></label>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="End date" value={endDate}
                                size="small"
                                onChange={handleEndDate}
                                inputFormat="dd/MM/yyyy"
                                fullWidth
                    />
                </DemoContainer>
            </div>
            <div className="flex justify-center">
                <MyButton variant="contained" onClick={handleNext}
                          disabled={!objective && !startDate && !endDate}>Continue</MyButton>
            </div>
        </div>
    )
}

export default Objective

export const MyTextField = styled(TextField)`
  border-radius: 15px;
`