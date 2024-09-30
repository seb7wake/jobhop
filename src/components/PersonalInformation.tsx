import TextInputRow from "./TextInputRow";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../types";

const PersonalInformation = ({
  errors,
  register,
}: {
  errors: FieldErrors<FormInput>;
  register: UseFormRegister<FormInput>;
}) => {
  return (
    <>
      <TextInputRow
        label="First name*"
        placeholder="First name"
        id="firstName"
        register={register}
        error={errors.firstName}
        required={true}
      />
      <TextInputRow
        label="Last name*"
        placeholder="Last name"
        id="lastName"
        register={register}
        error={errors.lastName}
        required={true}
      />
      <TextInputRow
        label="Email*"
        placeholder="Email"
        id="email"
        register={register}
        error={errors.email}
        pattern={{
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        }}
        required={true}
      />
      <TextInputRow
        label="Phone number"
        placeholder="Phone number"
        id="phoneNumber"
        register={register}
        error={errors.phoneNumber}
        pattern={{
          value: /^[0-9]{10}$/,
          message: "Invalid phone number. Please enter a 10-digit number.",
        }}
      />
    </>
  );
};

export default PersonalInformation;
