import Lottie from "lottie-react";
import LoadingLottie from "@assets/lotties/loading.json";

const WorkInProgress = () => {
  return (
    <div className="mb-32 ">
      <div className="flex justify-center">
        <div className="w-64 animate-fade-top animate-once animate-duration-1000 animate-delay-0">
          <Lottie animationData={LoadingLottie} loop={true} />
        </div>
      </div>
      <p className="mb-5 font-semibold text-xl bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
        Pagina in lavorazione
      </p>
      <p className="text-lg animate-fade animate-once animate-duration-[2000ms]">
        Torna nei prossimi giorni per saperne di più.
      </p>
    </div>
  );
};

export default WorkInProgress;
