import { ContactFormDefaultValues, ContactFormField, ContactFormSchema, TContactFormSchema } from "@/model/Contact-model"
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";


const Contact = () => {
    const initialValues= ContactFormDefaultValues;

    const postdata =async (values: TContactFormSchema, resetForm:()=> void)=>{
        console.log(values);
        resetForm();
        try {
             const res = await axios.post("http://localhost:4000/contact", values);
            if(res.status === 200 || res.status === 201){
                toast.success("mesage sent successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("error occured");
        }
    }

    const formFields= ContactFormField.map((field)=>{
        let icon;
         switch (field.name) {
      case "fullname":
        icon = <FaUser className="text-gray-700 mr-2" />;
        break;
      case "Phoneno":
        icon = <FaPhone className="text-gray-700 mr-2" />;
        break;
      case "email":
        icon = <FaEnvelope className="text-gray-700 mr-2" />;
        break;
      default:
        icon = null;
    }

    return {
      ...field,
      icon,
    };
    })

        const onSubmit= (values: TContactFormSchema, {resetForm}: FormikHelpers<TContactFormSchema>) => {
            console.log(values);
            postdata(values,resetForm);
            toast.success("message sent successfully");
        }
  return (
   <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/06/6a/90/066a90f00f6ccedbbf9237c510feb624.jpg')`,
      }}
    >
      <ToastContainer position="bottom-center" transition={Slide} />
      <section className="bg-white bg-opacity-40 backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Contact Us</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={ContactFormSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {formFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-gray-900 font-medium mb-1"
                  >
                    {field.label}
                  </label>
                  <div className="flex items-center bg-white bg-opacity-90 p-2 rounded-md focus-within:ring-2 focus-within:ring-indigo-500">
                    {field.icon}
                     <Field
                      as={field.type === "textarea" ? "textarea" : "input"}  // Conditionally render textarea
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      rows={field.type === "textarea" ? 5 : undefined} // Set rows for textarea
                      cols={field.type === "textarea" ? 50 : undefined} // Set cols for textarea
                      className={`bg-transparent outline-none w-full pl-2 text-gray-900 ${
                        field.type === "textarea" ? "h-32" : ""
                      }`} 
                    />
                  </div>
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300 mt-6"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </section>
    </main>
  )
}

export default Contact