import {useNavigate} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import {Button} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {saveObjective} from "../services/service.js";
import {AcheevaContext} from "../context/AcheevaContext.jsx";

const Pdf = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const inputFileRef = useRef();
    const {objective, user} = useContext(AcheevaContext) || {};

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleInputFileButton = () => {
        inputFileRef.current?.click();
    }

    const handleNext = async () => {
        console.log(selectedFile);
        //load file
        await saveObjective({objective, uid: user?.uid, sourceReady: false}, selectedFile);
        return navigate("/schedule")
    }

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-lg font-semibold">Aumenta il tuo cervello di AI</h1>
            <div>
                <input
                    accept="application/pdf" // You can specify the accepted file types here
                    style={{display: 'none'}}
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    ref={inputFileRef}
                />
                <label htmlFor="fileInput">
                    <Button
                        variant="contained"
                        startIcon={<AttachFileIcon/>}
                        onClick={handleInputFileButton}
                    >
                        Upload File
                    </Button>
                </label>
                <p>
                    {selectedFile ? `Selected file: ${selectedFile.name}` : 'No file selected'}
                </p>
            </div>
            <Button variant="contained" onClick={handleNext}>View your schedule</Button>
        </div>
    )
}

export default Pdf;
