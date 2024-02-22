import {Parallax} from "react-scroll-parallax";
import Lottie from "lottie-react";
import AiLearningLottie from "@assets/lotties/ai-learning.json";
import CountDown from "@features/count-down/count-down.tsx";
import {Link} from "@nextui-org/react";
import {Fragment} from "react";
import Roadmap from "@features/roadmap/roadmap.tsx";
import EmailForm from "@features/forms/email-form.tsx";

const Home = () => {
    return (
        <Fragment>
            <Parallax translateY={[0, 30]}>
                <div className="flex justify-center mb-32">
                    <div className="text-left relative">
                        <div
                            className="w-64 absolute -top-48 lg:-top-32 right-0 animate-fade-left animate-once animate-duration-1000 animate-delay-0">
                            <Lottie animationData={AiLearningLottie} loop={true}/>
                        </div>
                        <h1 className="font-semibold text-5xl sm:text-7xl animate-fade-right animate-once animate-duration-1000">
                            Acheeva
                        </h1>
                        <p className="mt-3 text-xl text-zinc-400">
                            Trasformiamo le tue esigenze in un viaggio di apprendimento
                            personalizzato.
                        </p>
                    </div>
                </div>
            </Parallax>
            <div className="mb-32">
                <p className="mb-5 font-semibold text-xl bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                    Pronti a rivoluzionare il tuo metodo di studio?
                </p>
                <CountDown deadline={new Date(2024, 8, 1, 0, 10, 0, 0)}/>
            </div>

            <div className="mb-32">
                <EmailForm/>
                <p className="mt-5 text-xs">
                    Registrati per rimanere aggiornato e ricevere un premium early access
                </p>
            </div>

            <Parallax translateY={[-10, 10]}>
                <div className="mb-80 lg:mb-48">
                    <p className="mt-3 text-xl">
                        Feedback mirato per un'esperienza coinvolgente
                    </p>
                    <p className="mt-3 text-sm text-zinc-400">
                        Scegli il nostro percorso guidato e scopri il potere di imparare con
                        facilità e piacere.
                    </p>
                </div>
            </Parallax>

            <Parallax translateY={[-10, 10]} opacity={[0, 5]}>
                <div className="mb-72 lg:mb-40 flex justify-center">
                    <Roadmap/>
                </div>
            </Parallax>

            <div>
                <p className="mt-3 text-xl">
                    Vuoi contribuire a plasmare il futuro dell'apprendimento?
                </p>
                <p className="mb-32 mt-3 text-sm text-zinc-400">
                    Condividi il tuo feedback e unisciti a noi nel creare un'esperienza
                    educativa su misura per le tue esigenze!
                    <br/>
                    Contattaci all'indirizzo email{" "}
                    <Link className="text-indigo-300" href="mailto:info@acheeva.me">
                        info@acheeva.me
                    </Link>{" "}
                    e sii parte del nostro viaggio verso l'eccellenza educativa.
                </p>
            </div>
        </Fragment>
    );
};

export default Home;
