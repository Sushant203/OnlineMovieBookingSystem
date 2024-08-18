import { EInputType, TFormField } from "./formField";
import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[^\s@]+@[Aa-zZ\s]*$/;
const phoneRegex = /^\d*$/;
export const signUpFormSchema = Yup.object({
    fullname: Yup.string().matches(nameRegex, "name cannot start with whitespace!!!").required("please enter your full name"),
    Phoneno: Yup.string().matches(phoneRegex, "enter the number digits only").min(10, "number should have 10 digits").required("please enter your phone number"),
    email: Yup.string()
        .matches(emailRegex, "email should coantain '@' and should not contain whitespaces")
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmpassword: Yup.string().oneOf([Yup.ref('password')], "password didn't match").required("please confirm your password"),
});

export type TSignupFormSchema = Yup.InferType<typeof signUpFormSchema>

export const SignUpFormDefaultValues: TSignupFormSchema = {
    fullname: "",
    Phoneno: "",
    email: "",
    password: "",
    confirmpassword: ""

}

export const signUpFormField: TFormField<TSignupFormSchema>[] = [
    {
        label: "Fullname",
        name: "fullname",
        placeholder: "ex. John doe",
        type: EInputType.TEXT,
        required: true,
    },
    {
        label: "Phone no.",
        name: "Phoneno",
        placeholder: "ex. 9812324122",
        type: EInputType.TEXT,
        required: true,
    },
    {
        label: "Email",
        name: "email",
        placeholder: "ex. johndoe@gmail.com",
        type: EInputType.EMAIL,
        required: true,
    },
    {
        label: "Password",
        name: "password",
        placeholder: "********",
        type: EInputType.PASSWORD,
        required: true,
    },
    {
        label: "Confirm Password",
        name: "confirmpassword",
        placeholder: "enter password again",
        type: EInputType.PASSWORD,
        required: true,
    },

] 