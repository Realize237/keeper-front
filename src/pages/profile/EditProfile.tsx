import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAvatarInitials } from "../../utils";
import { useUser } from "../../context/UserContext";
import FormInput from "../../components/ui/FormInput";
import { useForm } from "react-hook-form";
import { UserInput } from "../../interfaces/users";
import FormButton from "../../components/ui/FormButton";
import { useUpdateUser } from "../../hooks/useUsers";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { mutate: updateUser } = useUpdateUser();
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserInput>({
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const values = watch();
  const changedFields = {
    name: values.name !== user?.name ? values.name : undefined,
    email: values.email !== user?.email ? values.email : undefined,
  };

  const filteredFields = Object.fromEntries(
    Object.entries(changedFields).filter(([_, value]) => value !== undefined)
  );

  const isDisabled = Object.keys(filteredFields).length === 0;

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (emailError && name === "email") {
        setEmailError(undefined);
      }
      return () => subscription.unsubscribe();
    });
  }, [watch, emailError]);

  const onSubmit = () => {
    if (Object.keys(filteredFields).length === 0) return;

    updateUser(
      { user: changedFields, id: Number(user?.id) },
      {
        onSuccess: () => toast.success("Profile updated successfully"),
        onError: (error: Error) => {
          console.log("error: ", error.message);
          const isEmail = error.message
            .toLowerCase()
            .trim()
            .includes("Email already in use");
          console.log("isEmail: ", isEmail);
          if (
            error.message.toLowerCase().trim().includes("email already in use")
          ) {
            setEmailError(error.message);
          } else {
            toast.error(error.message || "Error updating profile");
          }
        },
      }
    );
  };
  return (
    <div className="text-white w-11/12 mx-auto py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-700 transition"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold ml-4">Edit Profile</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex justify-center  ">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full"
            />
          ) : (
            <div className="w-24 h-24 text-xl flex items-center justify-center rounded-full bg-[#CDFF00] text-black font-bold">
              {getAvatarInitials(user?.name || "")}
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <FormInput
            name="name"
            placeholder="Full name"
            register={register}
            rules={{
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Name can only contain letters and spaces",
              },
            }}
            error={errors.name}
          />

          <FormInput
            name="email"
            placeholder="Email address"
            register={register}
            error={errors.email || emailError}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            }}
          />

          <div className="flex gap-10">
            <FormButton
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </FormButton>
            <FormButton disabled={isDisabled} type="submit">
              Save
            </FormButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
