import {useNavigate} from "react-router-dom";
import {Fragment, useContext, useEffect, useRef, useState} from "react";
import {Button, SwipeableDrawer, TextareaAutosize} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {saveObjective} from "../services/service.js";
import {AcheevaContext} from "../context/AcheevaContext.jsx";
import {FullButton} from "./Quiz.jsx";
import {MyButton} from "./Login.jsx";
import Loading from "./Loading.jsx";
import AcheevaProvider from "../providers/AcheevaProvider.jsx";

const Pdf = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const inputFileRef = useRef();
    const {objective, user, isUserLoading} = useContext(AcheevaContext) || {};
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);

    const handleLibraryFile = async () => {
        fetch('/sample.pdf')
            .then(response => response?.blob())
            .then(blob => {
                setSelectedFile(blob);
                // Now you have the PDF content as a Blob
                // You can use the blob for various purposes
            })
    }

    const handleLibraryFile2 = async () => {
        fetch('/sample2.pdf')
            .then(response => response?.blob())
            .then(blob => {
                setSelectedFile(blob);
                // Now you have the PDF content as a Blob
                // You can use the blob for various purposes
            })
    }

    const handleLibraryFile3 = async () => {
        fetch('/sample3.pdf')
            .then(response => response?.blob())
            .then(blob => {
                setSelectedFile(blob);
                // Now you have the PDF content as a Blob
                // You can use the blob for various purposes
            })
    }

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

    }

    useEffect(() => {
        const next = async () => {
            await saveObjective({objective, uid: user?.uid, sourceReady: false}, selectedFile);
            return navigate("/schedule")
        }

        if (selectedFile) {
            next();
        }
    }, [selectedFile])

    return (
        <Fragment>
        <div className="flex flex-col justify-center items-center p-7 md:p-20 gap-8">
            <div className="flex justify-center">
                <img src="/load.svg" width={400} height="auto"/>
            </div>
            <h1 className="text-lg font-semibold m-0">Dicci cosa devi studiare e ti diremo come farlo</h1>
            <p className="text-sm">Scegli come selezionare i documenti necessari per superare l’esame:</p>
            <div className="w-full flex flex-col gap-3">
                <input
                    accept="application/pdf" // You can specify the accepted file types here
                    style={{display: 'none'}}
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    ref={inputFileRef}
                />
                <FullButton
                    variant="contained"
                    disabled
                >
                    Biblioteca online
                </FullButton>
                <FullButton
                    variant="contained"
                    onClick={() => setIsAnswerOpen(true)}
                >
                    La mia libreria
                </FullButton>
                <label htmlFor="fileInput">
                    <FullButton
                        variant="contained"
                        startIcon={<AttachFileIcon/>}
                        onClick={handleInputFileButton}
                    >
                        Upload File
                    </FullButton>
                </label>
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
        <div style={{height: "60vh", borderRadius: "24px 24px 0px 0px"}} className="p-10">
            <h3 className="font-semibold text-lg mb-3">La tua libreria</h3>
            <p className="text-sm">Ecco i tuoi contenuti disponibili:</p>
            <div className="m-auto w-full p-8 flex flex-col gap-3">
                <FullButton variant="contained" onClick={handleLibraryFile}>Storia dell'informatica</FullButton>
                <FullButton variant="contained" onClick={handleLibraryFile}>I Castagnetti</FullButton>
                <FullButton variant="contained" onClick={handleLibraryFile}>Cappuccetto Rosso</FullButton>
            </div>
        </div>
    </SwipeableDrawer>
    </Fragment>
    )
}

export default Pdf;
