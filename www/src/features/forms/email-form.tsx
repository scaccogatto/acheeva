import { Button, Input } from "@nextui-org/react";

const EmailForm = () => {
  return (
    <form className="flex justify-center items-center" name="contact" method="POST" data-netlify="true">
      <Input
        type="email"
        label="Email"
        size="sm"
        className="w-56"
        classNames={{
          inputWrapper: ["rounded-r-none"],
        }}
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
