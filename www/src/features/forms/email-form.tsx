import {Button, Input} from "@nextui-org/react";
import {useState} from "react";

const encode = (data: any) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

const EmailForm = () => {

    const [email, setEmail] = useState<string>("");

    const handleEmail = (event: any) => setEmail(event.target.value);

    const handleSubmit = (event: any) => {

        fetch("/", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: encode({"form-name": "contact", email}),
        })
            .then(() => console.log("Form successfully submitted"))
            .catch((error) => alert(error));

        event.preventDefault();
    };


    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center" name="get-news-form"
              data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact"/>
            <Input
                type="email"
                label="Email"
                size="sm"
                className="w-56"
                classNames={{
                    inputWrapper: ["rounded-r-none"],
                }}
                onChange={handleEmail}
            />
            <Button
                color="primary"
                className="rounded-tl-none rounded-bl-none bg-indigo-500"
                size="lg"
                type="submit"
            >
                Registrati
            </Button>
        </form>
    );
};

export default EmailForm;
