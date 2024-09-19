import { EInputType, TFormField } from "./formField";
import * as Yup from "yup";
// import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
// import { ReactNode } from 'react';
// import { FaUser } from "react-icons/fa";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const nameRegex = /^@[Aa-zZ\s]*$/;
const phoneRegex = /^\d*$/;

export const ContactFormSchema = Yup.object({
    fullname: Yup.string()
        .required("Please enter your full name"),
    Phoneno: Yup.string()
        .matches(phoneRegex, "Enter the number digits only")
        .min(10, "Number should have 10 digits")
        .required("Please enter your phone number"),

    email: Yup.string()
        .matches(emailRegex, "Email should contain '@' and should not contain whitespaces")
        .email("Invalid email address")
        .required("Email is required"),
    description: Yup.string().optional(),
});

export type TContactFormSchema = Yup.InferType<typeof ContactFormSchema>;

export const ContactFormDefaultValues: TContactFormSchema = {
    fullname: "",
    Phoneno: "",
    email: "",
    description: "",
};

export const ContactFormField: TFormField<TContactFormSchema>[] = [
    {
        label: "Fullname",
        name: "fullname",
        placeholder: "e.g. John Doe",
        type: EInputType.TEXT,
        required: true,

    },
    {
        label: "Phone no.",
        name: "Phoneno",
        placeholder: "e.g. 9812324122",
        type: EInputType.TEXT,
        required: true,
    },
    {
        label: "Email",
        name: "email",
        placeholder: "e.g. johndoe@gmail.com",
        type: EInputType.EMAIL,
        required: true,

    },
    {
        label: "Message Box",
        name: "description",
        placeholder: "wirte your message here",
        type: EInputType.TEXTAREA,
        // rows: "5",
        // cols: "50",
        required: true,
    },
];
