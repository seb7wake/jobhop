import { Education, Employment, School } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanData = async (data: any) => {
  const formattedData = {
    first_name: data.firstName,
    last_name: data.lastName,
    email_addresses: [
      {
        value: data.email,
        type: "personal",
      },
    ],
    phone_numbers: cleanPhoneNumber(data.phoneNumber),
    social_media_addresses: cleanSocialLink(data.socialLink),
    educations: cleanEducation(data.educations),
    employments: cleanEmployments(data.employments),
    applications: [
      {
        job_id: 4285367007,
      },
    ],
  };
  return formattedData;
};

const cleanPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) {
    return [];
  }
  return [
    {
      value: phoneNumber,
      type: "mobile",
    },
  ];
};

const cleanSocialLink = (socialLink: string) => {
  if (!socialLink) {
    return [];
  }
  return [
    {
      value: socialLink,
    },
  ];
};

export const cleanResume = async (resume: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(resume);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Content = result.split(",")[1];
      const contentType = resume.type || getContentType(resume.name);
      resolve({
        filename: resume.name,
        content: base64Content,
        type: "resume",
        content_type: contentType,
      });
    };
    reader.onerror = (error) => reject(error);
  });
};

const getContentType = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return "application/pdf";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
};

const cleanEmployments = (employments: Employment[]) =>
  employments.map((employment: Employment) => {
    return {
      company_name: employment.companyName,
      title: employment.title,
      start_date: new Date(employment.startDate).toISOString(),
      end_date: new Date(employment.endDate).toISOString(),
    };
  });

const cleanEducation = (education: Education[]) =>
  education.map((education: Education) => {
    return {
      school_id: Number(education.schoolId),
      degree_id: Number(education.degreeId),
      discipline_id: Number(education.disciplineId),
      start_date: new Date(education.startDate).toISOString(),
      end_date: new Date(education.endDate).toISOString(),
    };
  });

export const parseLinkHeader = (header: string) => {
  const links: { [key: string]: string } = {};
  const parts = header.split(",");
  parts.forEach((p) => {
    const section = p.split(";");
    if (section.length !== 2) {
      return;
    }
    const url = section[0].trim().slice(1, -1);
    const name = section[1].trim().replace(/rel="(.*)"/, "$1");
    links[name] = url;
  });
  return links;
};

export const sortSchools = (schools: School[]) => {
  const lastSchool = schools?.pop();
  const sortedSchools = schools.sort((a: School, b: School) => {
    return a.name.localeCompare(b.name);
  });
  if (lastSchool) {
    sortedSchools.unshift(lastSchool);
  }
  return sortedSchools;
};

export const addAttachment = async (candidateId: number, resume: File) => {
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
