import { EInputType, TFormField } from "./formField";
import * as Yup from "yup";

export const signInFormSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export type TSignInFormSchema = Yup.InferType<typeof signInFormSchema>

export const SignInFormDefaultValues: Partial<TSignInFormSchema> = {
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
    },

    {
        label: 'Password',
        name: 'password',
        placeholder: '********',
        type: EInputType.PASSWORD,
        required: true,
    }

]