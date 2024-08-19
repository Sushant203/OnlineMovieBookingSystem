import { EInputType, TFormField } from "./formField";
import * as Yup from "yup";
// import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
// import { ReactNode } from 'react';
// import { FaUser } from "react-icons/fa";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const nameRegex = /^@[Aa-zZ\s]*$/;
// const phoneRegex = /^\d*$/;

export const signUpFormSchema = Yup.object({
  fullname: Yup.string().required("Please enter your full name"),
  phoneno: Yup.string(),
  //     .matches(phoneRegex, "Enter the number digits only")
  //     .min(10, "Number should have 10 digits")
  //     .required("Please enter your phone number"),
  dateofbirth: Yup.string().required("enter your date of birth"),
  email: Yup.string()
    .matches(
      emailRegex,
      "Email should contain '@' and should not contain whitespaces"
    )
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Please confirm your password"),
});

export type TSignupFormSchema = Yup.InferType<typeof signUpFormSchema>;

export const SignUpFormDefaultValues: TSignupFormSchema = {
  fullname: "",
  phoneno: "",
  dateofbirth: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export const signUpFormField: TFormField<TSignupFormSchema>[] = [
  {
    label: "Fullname",
    name: "fullname",
    placeholder: "e.g. John Doe",
    type: EInputType.TEXT,
    required: true,
  },
  {
    label: "Phone no.",
    name: "phoneno",
    placeholder: "e.g. 9812324122",
    type: EInputType.TEXT,
    required: true,
  },
  {
    label: "DOB",
    name: "dateofbirth",
    placeholder: "e.g. yyyy-mm-dd",
    type: EInputType.DATE,
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
    label: "Password",
    name: "password",
    placeholder: "********",
    type: EInputType.PASSWORD,
    required: true,
  },
  {
    label: "Confirm Password",
    name: "confirmpassword",
    placeholder: "Enter password again",
    type: EInputType.PASSWORD,
    required: true,
  },
];
