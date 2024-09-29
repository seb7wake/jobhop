import React, { useState, useEffect } from "react";
import { FormInput, Discipline, School, Degree } from "@/types";
import { Form, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  useFieldArray,
} from "react-hook-form";
import {
  FaBook,
  FaGraduationCap,
  FaPlus,
  FaScroll,
  FaTrashCan,
  FaCalendarCheck,
} from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

const EducationSection = ({
  errors,
  register,
  control,
}: {
  errors: FieldErrors<FormInput>;
  register: UseFormRegister<FormInput>;
  control: Control<FormInput>;
}) => {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDegrees();
    fetchSchools();
    fetchDisciplines();
    setLoading(false);
  }, []);

  const fetchDegrees = async () => {
    const response = await fetch("/api/education/degrees");
    const data = await response.json();
    setDegrees(data);
  };

  const fetchSchools = async () => {
    const response = await fetch("/api/education/schools");
    const data = await response.json();
    setSchools(data);
  };

  const fetchDisciplines = async () => {
    const response = await fetch("/api/education/disciplines");
    const data = await response.json();
    setDisciplines(data);
  };

  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educations",
  });

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Card className="shadow-sm mb-4 p-4">
      {educationFields.map((item, index) => (
        <div key={item.id} className="mb-2">
          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="d-flex align-items-center">
              <FaGraduationCap className="me-2" />
              School
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                className="border rounded-pill py-2 px-3"
                isInvalid={!!errors.educations?.[index]?.schoolId}
                {...register(`educations.${index}.schoolId`, {
                  required: "School name is required",
                })}
              >
                <option value="">Select a school</option>
                {schools.map((school) => (
                  <option key={school.id} value={parseInt(school.id)}>
                    {school.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.educations?.[index]?.schoolId?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="d-flex align-items-center">
              <FaScroll className="me-2" />
              Degree
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                isInvalid={!!errors.educations?.[index]?.degreeId}
                {...register(`educations.${index}.degreeId`, {
                  required: "Degree is required",
                })}
                className="border rounded-pill py-2 px-3"
              >
                <option value="">Select a degree</option>
                {degrees.map((degree) => (
                  <option key={degree.id} value={parseInt(degree.id)}>
                    {degree.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.educations?.[index]?.degreeId?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="d-flex align-items-center">
              <FaBook className="me-2" />
              Field of study
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                isInvalid={!!errors.educations?.[index]?.disciplineId}
                {...register(`educations.${index}.disciplineId`, {
                  required: "Discipline is required",
                })}
                className="border rounded-pill py-2 px-3"
              >
                <option value="">Select a discipline</option>
                {disciplines.map((discipline) => (
                  <option key={discipline.id} value={parseInt(discipline.id)}>
                    {discipline.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.educations?.[index]?.disciplineId?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="d-flex align-items-center">
              <FaCalendarAlt className="me-2" />
              Start date
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                className="border rounded-pill py-2 px-3"
                max={new Date().toISOString().split("T")[0]}
                isInvalid={!!errors.educations?.[index]?.startDate}
                {...register(`educations.${index}.startDate`, {
                  required: "Start date is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.educations?.[index]?.startDate?.message}
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
                isInvalid={!!errors.educations?.[index]?.endDate}
                {...register(`educations.${index}.endDate`, {
                  required: "End date is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.educations?.[index]?.endDate?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="text-end mb-2">
            <Button
              className="border border-danger text-danger bg-transparent align-items-center rounded-pill py-2 px-3 hover-danger"
              onClick={() => removeEducation(index)}
            >
              <FaTrashCan className="me-2" />
              Remove
            </Button>
          </div>
          {index < educationFields.length - 1 && <hr className="my-4" />}
        </div>
      ))}
      <div className="mb-2 mt-2 text-center">
        <Button
          variant="outline-dark"
          className="py-2 px-4 rounded-pill align-items-center bg-white text-dark"
          onClick={() =>
            addEducation({
              schoolId: 0,
              degreeId: 0,
              disciplineId: 0,
              startDate: new Date(),
              endDate: new Date(),
            })
          }
        >
          <FaPlus className="me-2" color="dark" />
          Add education
        </Button>
      </div>
    </Card>
  );
};

export default EducationSection;
