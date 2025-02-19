import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { PasswordInput } from "./ui/passwordinput"
import { useRegisterMutation } from "@/service/api"
import * as yup from 'yup'
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { motion } from "framer-motion" // Import motion from framer-motion
import { Label } from "./ui/label"

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
    <motion.div 
      className="h-[100vh] flex flex-col justify-center items-center bg-gray-100"
      initial={{ opacity: 0 }} // Set initial opacity to 0
      animate={{ opacity: 1 }} // Animate to full opacity
      transition={{ duration: 0.5 }} // Duration of the animation
    >
      <motion.div
        className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg space-y-6"
        initial={{ y: -50, opacity: 0 }} // Start above the screen with opacity 0
        animate={{ y: 0, opacity: 1 }} // Slide to its position with full opacity
        transition={{ duration: 0.6, ease: "easeOut" }} // Slide-in transition
      >
        <div>
          <h2 className="font-bold text-3xl text-gray-800">Welcome to Chat App!</h2>
        </div>
        <div>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
             <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Username</Label>
            <Input
              placeholder="Username"
              {...register("userName")}
              error={Boolean(errors.userName?.message)}
              helperText={errors.userName?.message}
            />
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Email</Label>
            <Input
              placeholder="Email"
              {...register("email")}
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
            />
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Password</Label>
            <PasswordInput 
              placeholder="Password"
              {...register("password")}
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
            />
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Confirm Password</Label>
            <PasswordInput 
              placeholder="Confirm Password" 
              {...register("confirmPassword")}
              error={Boolean(errors.confirmPassword?.message)}
              helperText={errors.confirmPassword?.message}
            />
            </div>
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
      </motion.div>
    </motion.div>
  )
}

export default SignupForm;
