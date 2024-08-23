"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInputs from "./CustomInputs";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      // Sign up with Appwite & create plain link token

      if (type === "sign-up") {
        // const newUser = await signUp(data);
        // setUser(newUser);
      }
      if (type === "sign-in") {
        // const response = await SignIn({
        //   email: data.email,
        //   password: data.password,
        // });
        // if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon app"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-nrmal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInputs // First Name field
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      type="text"
                    />
                    <CustomInputs // Last Name field
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      type="text"
                    />
                  </div>
                  <CustomInputs // Address field
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your current residental address"
                    type="text"
                  />
                  <CustomInputs // City field
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your current city"
                    type="text"
                  />
                  <div className="flex gap-4">
                    <CustomInputs // State Field
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="ex: Tx"
                      type="text"
                    />
                    <CustomInputs // Postal Code Field
                      control={form.control}
                      name="postalCode"
                      label="postalCode"
                      placeholder="ex: 78043"
                      type="text"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInputs // Date Of Birth Field
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="mm/dd/yyyy"
                      type="date"
                    />
                    <CustomInputs // Social Security Number Field
                      control={form.control}
                      name="ssn"
                      label="Social Securtiy Number"
                      placeholder="ex: ***-**-****"
                      type="text"
                    />
                  </div>
                </>
              )}
              <CustomInputs
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <CustomInputs
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-nromal tex-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
