export type FormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  resume: File;
  socialLink: string;
  educations: Education[];
  employments: Employment[];
};

export type Education = {
  schoolId: number;
  degreeId: number;
  disciplineId: number;
  startDate: Date;
  endDate: Date;
};

export type Employment = {
  companyName: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

export type Degree = {
  id: string;
  name: string;
};

export type School = {
  id: string;
  name: string;
};

export type Discipline = {
  id: string;
  name: string;
};

export type Resume = {
  filename: string;
  content: string;
  type: string;
  content_type: string;
};

export interface Application {
  id: number;
  candidate_id: number;
  prospect: boolean;
  applied_at: string;
  rejected_at: string | null;
  last_activity_at: string;
  location: {
    address: string;
  };
  source: {
    id: number;
    public_name: string;
  } | null;
  credited_to: {
    id: number;
    first_name: string;
    last_name: string;
    name: string;
    employee_id: string;
  } | null;
  rejection_reason: string | null;
  rejection_details: string | null;
  jobs: {
    id: number;
    name: string;
  }[];
  job_post_id: number;
  status: string;
  current_stage: {
    id: number;
    name: string;
  };
  answers: {
    question: string;
    answer: string;
  }[];
  prospective_office: unknown;
  prospective_department: unknown;
  prospect_detail: {
    prospect_pool: unknown;
    prospect_stage: unknown;
    prospect_owner: unknown;
  };
  custom_fields: {
    [key: string]: string;
  };
  keyed_custom_fields: {
    [key: string]: {
      name: string;
      type: string;
      value: string;
    };
  };
  attachments: {
    filename: string;
    url: string;
    type: string;
    created_at: string;
  }[];
}
