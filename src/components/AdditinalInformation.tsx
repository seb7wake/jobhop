import TextInputRow from "./TextInputRow";
import { Col, Form, Row } from "react-bootstrap";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../types";

const AdditionalInformation = ({
  errors,
  register,
}: {
  errors: FieldErrors<FormInput>;
  register: UseFormRegister<FormInput>;
}) => {
  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId="resume">
        <Form.Label column sm={3}>
          Resume*
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="file"
            className="border rounded-pill"
            accept=".pdf,.docx"
            isInvalid={!!errors.resume}
            {...register("resume", {
              required: "Resume is required",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.resume?.message}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <TextInputRow
        label="URL (LinkedIn, Github, Portfolio)"
        id="socialLink"
        register={register}
        placeholder="Social Link"
        pattern={{
          value:
            /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
          message: "Invalid social link",
        }}
        error={errors.socialLink}
      />
    </>
  );
};

export default AdditionalInformation;
