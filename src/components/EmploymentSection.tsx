import { FormInput } from "@/types";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  useFieldArray,
} from "react-hook-form";
import { FaCalendarAlt } from "react-icons/fa";
import {
  FaBuilding,
  FaBriefcase,
  FaCalendarCheck,
  FaPlus,
  FaTrashCan,
} from "react-icons/fa6";

const EmploymentSection = ({
  register,
  errors,
  control,
}: {
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
  control: Control<FormInput>;
}) => {
  const {
    fields: employmentFields,
    append: addEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: "employments",
  });

  return (
    <Card className="shadow-sm mb-4 p-4">
      {employmentFields.map((item, index) => (
        <div key={item.id} className="mb-2">
          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="d-flex align-items-center">
              <FaBuilding className="me-2" />
              Company
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Paraform"
                className="border rounded-pill py-2 px-3"
                isInvalid={!!errors.employments?.[index]?.companyName}
                {...register(`employments.${index}.companyName`, {
                  required: "Company name is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.employments?.[index]?.companyName?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="d-flex align-items-center">
              <FaBriefcase className="me-2" />
              Job title
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Founding Engineer"
                className="border rounded-pill py-2 px-3"
                isInvalid={!!errors.employments?.[index]?.title}
                {...register(`employments.${index}.title`, {
                  required: "Job title is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.employments?.[index]?.title?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="d-flex align-items-center">
              <FaCalendarAlt className="me-2" />
              <span>Start date</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                className="border rounded-pill py-2 px-3"
                max={new Date().toISOString().split("T")[0]}
                isInvalid={!!errors.employments?.[index]?.startDate}
                {...register(`employments.${index}.startDate`, {
                  required: "Start date is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.employments?.[index]?.startDate?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="d-flex align-items-center">
              <FaCalendarCheck className="me-2" />
              End date
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                className="border rounded-pill py-2 px-3"
                max={new Date().toISOString().split("T")[0]}
                isInvalid={!!errors.employments?.[index]?.endDate}
                {...register(`employments.${index}.endDate`, {
                  required: "End date is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.employments?.[index]?.endDate?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="text-end mb-2">
            <Button
              className="border border-danger text-danger bg-transparent align-items-center rounded-pill py-2 px-3 hover-danger"
              onClick={() => removeEmployment(index)}
            >
              <FaTrashCan className="me-2" />
              Remove
            </Button>
          </div>
          {index < employmentFields.length - 1 && <hr className="my-4" />}
        </div>
      ))}
      <div className="mb-2 mt-2 text-center">
        <Button
          variant="outline-dark"
          className="py-2 px-4 rounded-pill align-items-center bg-white text-dark"
          onClick={() =>
            addEmployment({
              companyName: "",
              title: "",
              startDate: new Date(),
              endDate: new Date(),
            })
          }
        >
          <FaPlus className="me-2" color="dark" />
          Add employment
        </Button>
      </div>
    </Card>
  );
};

export default EmploymentSection;
