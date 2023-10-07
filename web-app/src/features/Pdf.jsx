import '../App.css'
import {useNavigate} from "react-router-dom";
import {Fragment} from "react";

const Pdf = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <p>Pdf load</p>
        </Fragment>
    )
}

export default Pdf;
