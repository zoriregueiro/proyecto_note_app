import "./login.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth-context";
import { EMAIL_REGEX } from "../../utils/constants";

export const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const handleSignIn = async (formData) => {
    try {
      await signIn(formData);
    } catch (error) {
      setError("password", {
        type: "custom",
        message: "The email or the password are invalid",
      });
      setValue("password", "");
    }
  };

  return (
    <section className="login">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit(handleSignIn)}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", {
              required: "Required field",
              pattern: {
                message: "The email is not valid",
                value: EMAIL_REGEX,
              },
            })}
          />
          <span>{errors?.email && errors.email.message}</span>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", {
              required: "Required field",
            })}
          />
          <span>{errors?.password && errors.password.message}</span>
        </fieldset>

        <button className="login-button">Login</button>
      </form>
    </section>
  );
};
