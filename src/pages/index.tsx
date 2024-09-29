import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../types";
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import EducationSection from "@/components/EducationSection";
import EmploymentSection from "@/components/EmploymentSection";
import { cleanData, cleanResume } from "@/utils/helpers";
import EventToast from "@/components/EventToast";
import AdditionalInformation from "@/components/AdditinalInformation";
import PersonalInformation from "@/components/PersonalInformation";
import Header from "@/components/Header";
import { Spinner } from "react-bootstrap";

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormInput) => {
    setLoading(true);
    const { resume, ...otherData } = data;
    const cleanedData = await cleanData(otherData);
    const response = await fetch("/api/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanedData),
    });
    const res = await response.json();
    await handleResult(res, resume);
    setLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResult = async (res: any, resume: File) => {
    if (res?.id) {
      const attachmentResponse = await addAttachment(res?.id, resume);
      if (!attachmentResponse.error) {
        setIsError(false);
        setShowToast(true);
        reset();
        return;
      }
    }
    setIsError(true);
    setShowToast(true);
  };

  const addAttachment = async (candidateId: number, resume: File) => {
    const cleanedResume = await cleanResume(resume[0]);
    const response = await fetch("/api/attachments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ candidateId, resume: cleanedResume }),
    });
    const res = await response.json();
    return res;
  };

  return (
    <>
      <Head>
        <title>JobHop | Greenhouse Application</title>
        <meta
          name="description"
          content="Greenhouse application form for JobHop"
          key="desc"
        />
        <meta
          property="og:title"
          content="JobHop - Greenhouse Application"
          key="title"
        />
        <meta
          property="og:description"
          content="Greenhouse application form for JobHop"
        />
      </Head>
      <Header />
      <Container>
        <EventToast
          isError={isError}
          showToast={showToast}
          setShowToast={setShowToast}
        />

        <Row className="justify-content-md-center mt-5">
          <Col md={8}>
            <h1 className="mb-5 text-center">Submit your application</h1>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mb-5 gap-3"
            >
              <h4 className="mb-4">Personal information</h4>
              <PersonalInformation errors={errors} register={register} />

              <h4 className="mt-5 mb-4">Additional information</h4>
              <AdditionalInformation errors={errors} register={register} />

              <h4 className="mt-5 mb-4">Education</h4>
              <EducationSection
                errors={errors}
                register={register}
                control={control}
              />

              <h4 className="mt-5 mb-4">Employment</h4>
              <EmploymentSection
                errors={errors}
                register={register}
                control={control}
              />

              <Button
                variant="dark"
                type="submit"
                className="w-100 mb-5 mt-4 py-2 rounded-pill align-items-center"
              >
                {loading ? (
                  <Spinner animation="border" />
                ) : (
                  "Submit application"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
