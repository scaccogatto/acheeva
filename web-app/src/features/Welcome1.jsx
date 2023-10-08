import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {MyButton} from "./Login.jsx";

const Welcome1 = () => {

    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/objective");
    }

    return (
        <div className="flex flex-col justify-center items-center p-7 md:p-20 gap-8">
            <div className="flex justify-center">
                <img src="../../public/welcome.svg" width={400} height="auto"/>
            </div>
            <div>
                <h1 className="font-semibold text-lg mb-2">Studiare non è mai stato così semplice</h1>
                <ol type="1">
                    <li className="text-sm font-light">1. Crea un obiettivo</li>
                    <li className="text-sm font-light">2. Imposta la tua deadline</li>
                    <li className="text-sm font-light">3. Carica i documenti da studiare</li>
                    <li className="text-sm font-light">4. Mettiti alla prova</li>
                </ol>
            </div>
            <MyButton variant="contained" onClick={handleContinue}>Inizia</MyButton>
        </div>
    );

}

export default Welcome1;
