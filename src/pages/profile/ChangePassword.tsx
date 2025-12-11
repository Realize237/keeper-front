import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import FormInput from "../../components/ui/FormInput";
import FormButton from "../../components/ui/FormButton";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IEmailPasswordInput } from "../../interfaces/users";
import { useChangeUserPassword } from "../../hooks/useUsers";


const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangeUserPassword();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IEmailPasswordInput>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: IEmailPasswordInput) => {
    changePassword(
      { data, id: Number(user?.id) },
      {
        onSuccess: () => {
          toast.success("Password changed successfully");
          reset();
        },
        onError: (error: Error) => {
          if (
            error.message.toLowerCase().includes("old password is incorrect")
          ) {
            setFormError(error.message);
          } else {
            toast.error(error.message || "Error changing password");
          }
        },
      }
    );
  };

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (formError && name === "oldPassword") {
        setFormError(undefined);
      }
      return () => subscription.unsubscribe();
    });
  }, [watch, formError]);

  if (!user) return null;

  return (
    <div className="text-white w-11/12 mx-auto py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-700 transition"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold ml-4">Change Password</h3>
      </div>

      {user.authType === "EmailAndPassword" && (
        <p className="max-w-md mx-auto text-gray-300 text-sm mb-6 text-center">
          Enter your current password to confirm your identity before choosing a
          new password.
        </p>
      )}
      {user.authType === "EmailAndPassword" ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto space-y-4"
        >
          <FormInput
            name="oldPassword"
            type="password"
            placeholder="Current Password"
            passwordToggle={true}
            register={register}
            rules={{ required: "Old password is required" }}
            error={errors.oldPassword || formError}
          />

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

          <div className="flex gap-10">
            <FormButton
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </FormButton>
            <FormButton type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? "Updating..." : "Update Password"}
            </FormButton>
          </div>
        </form>
      ) : (
        <div className="text-white w-11/12 mx-auto py-8">
          <div className="max-w-md mx-auto space-y-10">
            <p>
              You currently sign in with Google. To create a password for this
              app, we need to send a secure password setup email.
            </p>
            <FormButton onClick={() => alert("Under development")}>
              Send Password Setup Email
            </FormButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
