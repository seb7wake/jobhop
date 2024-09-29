import { FieldError, UseFormRegister } from "react-hook-form";
import { FormInput } from "../types";
import { Col, Form, Row } from "react-bootstrap";

const TextInput = ({
  label,
  id,
  register,
  error,
  pattern,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  register: UseFormRegister<FormInput>;
  error: FieldError | undefined;
  pattern?: {
    value: RegExp;
    message: string;
  };
  placeholder: string;
  required?: boolean;
}) => {
  return (
    <Form.Group as={Row} className="mb-3 align-items-center" controlId={id}>
      <Form.Label column sm={3}>
        {label}
      </Form.Label>
      <Col sm={9}>
        <Form.Control
          type="text"
          className="border rounded-pill"
          placeholder={placeholder}
          isInvalid={!!error}
          {...register(id as keyof FormInput, {
            required: required ? `${label} is required` : false,
            pattern: pattern?.value,
          })}
        />
        <Form.Control.Feedback type="invalid">
          {error?.message}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export default TextInput;
