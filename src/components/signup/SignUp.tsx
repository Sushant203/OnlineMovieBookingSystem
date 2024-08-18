import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignUpFormDefaultValues, signUpFormField, signUpFormSchema, TSignupFormSchema } from "@/model/Signup-model";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import { FaCalendar, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import { FaPhone} from "react-icons/fa";
const SignUp = () => {
  const initialValues = SignUpFormDefaultValues;
  const navigate = useNavigate();

  const submit = async (values: TSignupFormSchema) => {
    console.log(values);
    try {
      const res = await axios.post("http://localhost:4000/register/register", values);
      console.log("responses:", res);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot register user");
    }
  };

  const formFields = signUpFormField.map((field) => {
    let icon;
    switch (field.name) {
      case "fullname":
        icon = <FaUser className="text-Charcoal mr-2" />;
        break;
      // case "Phoneno":
      //   icon = <FaPhone className="text-Charcoal mr-2" />;
      //   break;
       case "dateofbirth":
         icon = <FaCalendar className="text-Charcoal mr-2" />;
         break;
      case "email":
        icon = <FaEnvelope className="text-Charcoal mr-2" />;
        break;
      case "password":
      case "confirmpassword":
        icon = <FaLock className="text-[#343434] mr-2" />;
        break;
      default:
        icon = null;
    }

    return {
      ...field,
      icon,
    };
  });

  const onSubmit = (values: TSignupFormSchema) => {
    console.log(values);
    submit(values);
    toast.success("registered successfully");
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/06/6a/90/066a90f00f6ccedbbf9237c510feb624.jpg')`,
      }}
    >
      <ToastContainer position="bottom-center" transition={Slide}/>
      <section className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Register Your Account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpFormSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {formFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-white font-medium mb-1"
                  >
                    {field.label}
                  </label>
                  <div className="flex items-center bg-white bg-opacity-50 p-2 rounded-md focus-within:ring-2 focus-within:ring-indigo-500">
                    {field.icon}
                    <Field
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="bg-transparent outline-none w-full pl-2 text-white opacity-60"
                    />
                  </div>
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300 mt-6"
            >
              Signup
            </button>
          </Form>
        </Formik>
      </section>
    </main>
  );
};

export default SignUp;
