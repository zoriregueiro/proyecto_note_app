import "./register.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth-context";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/constants";

export const Register = () => {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const handleSignUp = async (formData) => {
    try {
      const password = getValues("password");
      const repeatPassword = getValues("repeat_password");
      if (password === repeatPassword) {
        await signUp(formData);
      } else {
        setError("repeat_password", {
          type: "custom",
          message: "Passwords don't match",
        });
      }
    } catch (error) {
      setError("email", {
        type: "custom",
        message: "This email is already used",
      });
    }
  };
  return (
    <section className="register">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit(handleSignUp)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", {
              required: "Required field",
            })}
          />
          <span>{errors?.name && errors.name.message}</span>
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
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
            id="password"
            name="password"
            {...register("password", {
              required: "Required field",
              pattern: {
                message: "The password is not valid",
                value: PASSWORD_REGEX,
              },
            })}
          />
          <span>{errors?.password && errors.password.message}</span>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Repeat Password</label>
          <input
            type="password"
            id="repeat_password"
            name="repeat_password"
            {...register("repeat_password", {
              required: "Required field",
            })}
          />
          <span>
            {errors?.repeat_password && errors.repeat_password.message}
          </span>
        </fieldset>
        <button className="register-button">Register</button>
      </form>
    </section>
  );
};
