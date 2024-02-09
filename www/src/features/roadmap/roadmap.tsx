import AnalysisIllustration from "@assets/analysis-illustration.svg?react";
import DeadlinesIllustration from "@assets/deadlines-illustration.svg?react";
import TestIllustration from "@assets/test-illustration.svg?react";
import SuccessIllustration from "@assets/success-illustration.svg?react";
import { cloneElement, ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface Step {
  title: string;
  description: string;
  illustration: ReactNode;
}

const steps: Array<Step> = [
  {
    title: "Esplora il tuo stile di apprendimento",
    description:
      "In questa fase, raccogliamo dati approfonditi su di te per creare un percorso di apprendimento personalizzato. Rispondi a domande mirate e completali con sincerità per aiutarci a capire meglio le tue esigenze e preferenze.",
    illustration: <AnalysisIllustration />,
  },
  {
    title: " Imposta obiettivi e scadenze",
    description:
      "Ora è il momento di stabilire obiettivi chiari e una scadenza per il tuo percorso di apprendimento. Indica cosa desideri raggiungere e entro quale periodo di tempo. Questo ci permetterà di personalizzare ulteriormente il tuo percorso e aiutarti a mantenere la motivazione.",
    illustration: <DeadlinesIllustration />,
  },
  {
    title: "Test su misura per te",
    description:
      "Accedi a test personalizzati progettati specificamente per le tue esigenze di apprendimento. Questi test ti aiuteranno a valutare il tuo livello di comprensione e identificare le aree in cui hai bisogno di concentrarti maggiormente. Ogni test è adattato alle tue capacità individuali per garantire un apprendimento efficace.",
    illustration: <TestIllustration />,
  },
  {
    title: "Traccia i tuoi successi",
    description:
      "In questa fase, potrai monitorare i tuoi progressi nel tempo e ricevere feedback dettagliati sull'andamento del tuo apprendimento. Analizza i tuoi risultati, scopri i tuoi punti di forza e individua le aree in cui puoi migliorare. Il nostro obiettivo è aiutarti a crescere e avere successo nel tuo percorso di apprendimento.",
    illustration: <SuccessIllustration />,
  },
];

const Roadmap = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 max-w-lg lg:max-w-7xl">
      {steps.map((step: any, index: number) => (
        <div className="flex gap-5" key={step.title}>
          <Card className="p-5 bg-zinc-700 text-white text-left animate-fade-right animate-once animate-duration-1000">
            <CardHeader className="flex flex-col items-start pb-0 pt-2">
              <p className="text-tiny text-zinc-300">Fase {index + 1}</p>
              <h4 className="mt-3 font-semibold text-large text-blue-400">
                {step.title}
              </h4>
            </CardHeader>
            <CardBody className="overflow-visible pt-5">
              <div className="flex gap-5">
                <p className="text-sm lg:text-xs leading-5">
                  {step.description}
                </p>
                <div className="hidden lg:block">
                  {step.illustration &&
                    cloneElement(step.illustration, { width: 200 })}
                </div>
              </div>
              <div className="mt-10 flex lg:hidden">
                {step.illustration &&
                  cloneElement(step.illustration, { width: 200 })}
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
