import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEnvelope, FaLock } from "react-icons/fa";
import {
  SignInFormDefaultValues,
  signInFormSchema, // Import the correct schema
  TSignInFormSchema,
  // signInFormField
} from "@/model/Login";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginUi() {
  const initialValues = SignInFormDefaultValues;
  const movieId = localStorage.getItem("movieId");
  const theaterId = localStorage.getItem("theaterId");
  const showtimeId = localStorage.getItem("showtimeId");
  const navigate = useNavigate();

  const submit = async (val: TSignInFormSchema) => {
    try {
      const res = await axios.post("http://localhost:4000/register/login", val);
      if (res.status === 200) {
        toast.success("Logged in successfully");
        const user_id = res.data.user.userid;
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("token", res.data.token);
        const storedUserId = localStorage.getItem("user_id");
        if (movieId && theaterId && showtimeId && storedUserId) {
          navigate(
            `/seat/movie/${movieId}/theater/${theaterId}/showtime/${showtimeId}`
          );
        } else {
          navigate("/");
        }
      } else {
        navigate(`/movie/${movieId}/theater/${theaterId}`);
      }
      if (res.status === 404) {
        toast.error("user not found");
      }
      if (res.status === 401) {
        toast.error("Invalid Password");
      }
      window.location.reload();
    } catch (error) {
      toast.error("Email or Password Does not Match");
      console.log(error);
    }
  };

  const formFields = [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      icon: <FaEnvelope className="text-gray-400 mr-2" />,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      icon: <FaLock className="text-gray-400 mr-2" />,
    },
  ];

  const onSubmit = (values: TSignInFormSchema) => {
    console.log(values);
    submit(values);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE0fHxjaW5lbWF8ZW58MHx8fHwxNjg4NzAzMjcy&ixlib=rb-4.0.3&q=80&w=1080')",
      }}
    >
      <div className="w-full max-w-md bg-opacity-90 bg-black p-8 border border-gray-700 rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login to MovieMania
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signInFormSchema} // Pass the correct schema here
          onSubmit={onSubmit}
        >
          <Form>
            <ToastContainer />
            {formFields.map((formFields) => (
              <div key={formFields.name} className="mb-4">
                <label
                  htmlFor={formFields.name}
                  className="block text-sm font-medium text-gray-300"
                >
                  {formFields.label}
                </label>
                <div className="flex items-center mt-1">
                  <div className="bg-gray-800 p-2 rounded-l-md">
                    {formFields.icon}
                  </div>
                  <Field
                    // id={id}
                    name={formFields.name}
                    type={formFields.type}
                    className="w-full p-2 border-l-0 border-gray-800 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                  />
                </div>
                <ErrorMessage
                  name={formFields.name}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
              <a href="/signup" className="hover:underline">
                Sign Up
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
