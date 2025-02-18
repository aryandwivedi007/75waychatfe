import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { PasswordInput } from "./ui/passwordinput"
import { useRegisterMutation } from "@/service/api"
import * as yup from 'yup'
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const validation = yup.object({
  userName: yup.string().required("User Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimumn 5 chars are required")
    .max(16, "Miximumn 16 chars allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Comfirm password is required"),
  
});

type FormData = typeof validation.__outputType;

const SignupForm = () => {
    const navigate=useNavigate()
    const [registerUser] = useRegisterMutation();
    function handleLoginPage(){
        navigate(`/login`)
    }

    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<FormData>({
      defaultValues: {
        userName:"",
        email: "",
        password: "",
        confirmPassword: "",
      },
      resolver: yupResolver(validation),
    });

    const onSubmit = async (data: FormData) => {
      try {
        await registerUser(data).unwrap();
        toast.success("User register successfully!");
        navigate("/");
      } catch (error: any) {
        const validationError = error?.data?.data?.errors?.[0].msg;
        toast.error(
          validationError ?? error?.data?.message ?? "Something went wrong!"
        );
      }
    };
  
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center  bg-gray-100">
         <div className=" max-w-md w-full p-8 bg-white shadow-lg rounded-lg space-y-6">
           <div>
             <h2 className="font-bold text-3xl text-gray-800">Welcome to Chat App!</h2>
           </div>
           <div>
             <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
             <Input
                 placeholder="Username"
                 {...register("userName")}
                 error={Boolean(errors.email?.message)}
                 helperText={errors.email?.message}
                 
               />
               <Input
                 placeholder="Email"
                 {...register("email")}
                 error={Boolean(errors.email?.message)}
                 helperText={errors.email?.message}
                 
               />
              <PasswordInput 
              placeholder="Password"
              {...register("password")}
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
               />
              <PasswordInput 
              placeholder="Confirm Password" 
              {...register("confirmPassword")}
              error={Boolean(errors.confirmPassword?.message)}
              helperText={errors.confirmPassword?.message}
              />
               <Button
                 type="submit"
                disabled={!isValid}
               >
                 Click to Signup
               </Button>
             </form>
           </div>
           <div className="w-full text-center">
             <p className="text-sm text-gray-600">
               Already have an account?{" "}
               <div className="text-blue-600 hover:underline" onClick={handleLoginPage}>Sign In</div>
             </p>
           </div>
         </div>
       </div>
  )
}

export default SignupForm