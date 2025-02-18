import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { PasswordInput } from "./ui/passwordinput"
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify"
import { useLoginMutation } from "@/service/api"
const validation = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Minimumn 5 chars are required")
      .max(16, "Miximumn 16 chars allowed"),
  });


  type FormData = typeof validation.__outputType;
const LoginForm = () => {
    const navigate=useNavigate()
    function handleSignupPage(){
        navigate(`/signup`)
    }

    const [loginUser] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm<FormData>({
        defaultValues: {
          email: "",
          password: "",
        },
        resolver: yupResolver(validation),
      });


      const onSubmit = async (data: FormData) => {
        try {
            console.log(data)
          await loginUser(data).unwrap();
          toast.success("User logged in successfully!");
          navigate("/", { replace: true });
        } catch (error: any) {
            console.log(error)
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
          <h2 className="font-bold text-3xl text-gray-800">Welcome Back!</h2>
        </div>
        <div>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type="submit"
             disabled={!isValid}
            >
              Click to Login
            </Button>
          </form>
        </div>
        <div className="w-full text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <div className="text-blue-600 hover:underline" onClick={handleSignupPage}>Sign Up</div>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
