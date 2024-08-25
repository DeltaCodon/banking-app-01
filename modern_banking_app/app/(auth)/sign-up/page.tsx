import AuthForm from "@/components/AuthForm";
import React from "react";
import { hydrateRoot } from "react-dom/client";

const SignUp = () => {
  return (
    <section className="flex flex-center size-full max-sm:px-6">
      <div suppressHydrationWarning={true}>
        <AuthForm type="sign-up" />
      </div>
    </section>
  );
};

export default SignUp;
