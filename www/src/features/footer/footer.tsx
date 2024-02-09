import StepsIllustration from "@assets/steps-illustration.svg?react";

const Footer = () => {
    return <div className="pb-5 flex justify-between items-baseline">
        <p className="text-tiny">
            ©acheeva.me
        </p>
        <div className="w-44">
            <StepsIllustration />
        </div>
    </div>
};

export default Footer;