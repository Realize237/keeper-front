import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FormInput from "../../components/ui/FormInput";
import FormButton from "../../components/ui/FormButton";
import { ISetPasswordInput } from "../../interfaces/users";
import { useLocation } from "react-router-dom";

import { useSetPassword } from "../../hooks/useUsers";

const SetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: setPassword, isPending } = useSetPassword();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token") || "";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ISetPasswordInput>();

  const newPassword = watch("newPassword");

  const onSubmit = (data: ISetPasswordInput) => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }
    setPassword(
      { data: { ...data, token } },
      {
        onSuccess: () => {
          toast.success("Password set successfully");
          reset();
          navigate("/login");
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to set password");
        },
      }
    );
  };

  return (
    <div className="text-white w-11/12 mx-auto py-8">
      <div className="flex items-center mb-6"></div>
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-xl font-bold ml-4">Set Password</h3>
        <p className=" text-gray-300 text-sm my-6 text-center">
          Set a password to sign in directly without using Google.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4"
      >
        <FormInput
          name="newPassword"
          type="password"
          placeholder="New Password"
          register={register}
          passwordToggle={true}
          rules={{
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message:
                "Password must contain uppercase, lowercase, and numbers",
            },
          }}
          error={errors.newPassword}
        />

        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          register={register}
          passwordToggle={true}
          rules={{
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          }}
          error={errors.confirmPassword}
        />

        <FormButton type="submit" disabled={isPending}>
          {isPending ? "Setting..." : "Set Password"}
        </FormButton>
      </form>
    </div>
  );
};

export default SetPassword;
