import * as React from "react";
import { cn } from "@/lib/utils";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  helperText?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, helperText, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="flex flex-col w-full">
        <div className="relative w-full">
          <input
            {...props}
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              error
                ? "border-red-500 focus-visible:ring-red-500" 
                : "border-input focus-visible:ring-ring", 
              className
            )}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>
        {/* Render error message or helper text */}
        {helperText && (
          <p className={`text-sm mt-1 ${error ? "text-red-500" : "text-muted-foreground"}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
