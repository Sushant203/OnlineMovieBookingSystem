import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// type Props = {};

export default function LoginUi() {
  const movieId = localStorage.getItem("movieId");
  const theaterId = localStorage.getItem("theaterId");
  const showtimeId = localStorage.getItem("showtimeId");
  const navigate = useNavigate();
  const submit = async (val: any) => {
    try {
      const res = await axios.post("http://localhost:4000/register/login", val);
      if (res.status === 200) {
        toast.success("Logged in successfully");
        // console.log(res.data);
        const user_id = res.data.user.userid;
        console.log(user_id, "dfkjdbkjf nbd fn");
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("token", res.data.token);
        navigate(
          `/seat/movie/${movieId}/theater/${theaterId}/showtime/${showtimeId}`
        );
      } else {
        navigate(`/movie/${movieId}/theater/${theaterId}`);
      }

      // console.log(res);
    } catch (error) {
      toast.error("Email or Password Does not Match");
      console.log(error);
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formFields = [
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email Address",
      icon: <FaEnvelope className="text-gray-400 mr-2" />,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      icon: <FaLock className="text-gray-400 mr-2" />,
    },
  ];

  const onSubmit = (values: any) => {
    console.log(values);
    submit(values);
    // Perform login logic here
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
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            {formFields.map(({ id, name, type, label, icon }) => (
              <div key={id} className="mb-4">
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-300"
                >
                  {label}
                </label>
                <div className="flex items-center mt-1">
                  <div className="bg-gray-800 p-2 rounded-l-md">{icon}</div>
                  <Field
                    id={id}
                    name={name}
                    type={type}
                    className="w-full p-2 border-l-0 border-gray-800 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                  />
                </div>
                <ErrorMessage
                  name={name}
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
              <a href="#" className="hover:underline">
                Sign Up
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
