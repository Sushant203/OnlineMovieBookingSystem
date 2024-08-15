import { EInputType, TFormField } from "./formField";
import * as Yup from "yup";
// import { FaEnvelope, FaLock } from "react-icons/fa";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signInFormSchema = Yup.object({
    email: Yup.string()
        .matches(emailRegex, "email should coantain '@' and should not contain whitespaces")
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export type TSignInFormSchema = Yup.InferType<typeof signInFormSchema>

export const SignInFormDefaultValues: TSignInFormSchema = {
    email: "",
    password: "",
}

export const signInFormField: TFormField<TSignInFormSchema>[] = [
    {
        label: 'Email',
        name: 'email',
        placeholder: 'Eg. enter your email',
        type: EInputType.EMAIL,
        required: true,
        // icon: <FaEnvelope className="text-gray-400 mr-2" />,
    },

    {
        label: 'Password',
        name: 'password',
        placeholder: '********',
        type: EInputType.PASSWORD,
        required: true,
    }

]