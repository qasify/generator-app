// src/components/BiometricRegistration.tsx
import React, { useState } from "react";
import { Button, InputField } from "../../components";
import { useNavigate } from "react-router-dom";
import { LogInErrors } from "./types";
import { login } from "../../api";
import { useAuth } from "../../authentication/AuthProvider";
import constants from "./utils/constants";

const UserRegistration: React.FC = () => {
  const navigate = useNavigate();

  const { setAuthenticatedUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LogInErrors | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, email: null } as LogInErrors));
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, password: null } as LogInErrors));
    setPassword(e.target.value);
  };
  
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email.length || !password.length) {
      setErrors({ 
          email: email.length ? null : constants.EMAIL_MISSING,
          password: password.length ? null : constants.PASSWORD_MISSING,
        } as LogInErrors);
      return;
    }

    setIsLoading(true);
    const response = await login({
      login: email,
      pass: password
    });

    // if authenticated
    if (response) {
      setAuthenticatedUser({
        userId: response.userId,
        token: response.token,
      });
      navigate("/home");
    }else{
      setErrors({ 
        email: constants.INVALID_EMAIL,
        password: constants.INVALID_PASSWORD,
      } as LogInErrors);
    }
    setIsLoading(false);
  };

  return (
      <div className="w-full flex items-center justify-center p-2 self-center justify-self-center h-screen">
        <div className="flex flex-col items-center justify-center gap-4 mx-auto  p-8 rounded-lg shadow-lg bg-white min-w-[300px] w-[400px] lg:w-[450px] ">
          <img
            src="/assets/images/logo512.png"
            alt="Logo"
            className="mx-auto max-h-[130px]"
          />
          <h1 className="text-center text-2xl font-bold">
            Generator App
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <InputField
              label="Email:"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={handleEmailChange}
              error={errors?.email}
            />
            <InputField
              label="Password:"
              type="password"
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
              error={errors?.password}
            />
            <div className="flex justify-center mt-4 w-full">
              <Button
                onClick={handleSubmit}
                className="!w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default UserRegistration;
