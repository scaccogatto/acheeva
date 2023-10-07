import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/index.js";
import {DatePicker} from "@mui/x-date-pickers";
import {AcheevaContext} from "../context/AcheevaContext.jsx";

const Objective = () => {
    const navigate = useNavigate();
    //const [objective, setObjective] = useState("");
    const {objective, setObjective} = useContext(AcheevaContext);
    const [deadlineDate, setDeadlineDate] = useState(null);

    const handleObjective = e => {
        setObjective(e.target.value);
    }

    const handleDeadlineDate = (date) => {
        setDeadlineDate(date);
    }

    const handleNext = () => {
        console.log(objective, new Date(deadlineDate));
        return navigate("/pdf");
    }

    return (
        <div className="flex flex-col gap-10">
            <h1 className="font-semibold font-lg">Objective</h1>
            <div>
                <TextField
                    label="Obiettivo"
                    value={objective}
                    type="text"
                    onChange={handleObjective}
                    size="small"
                    fullWidth
                />
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Deadline" value={deadlineDate}
                                size="small"
                                onChange={handleDeadlineDate}
                                inputFormat="dd/MM/yyyy"
                    />
                </DemoContainer>
            </div>
            <Button variant="outlined" onClick={handleNext}>Next</Button>
        </div>
    )
}

export default Objective
