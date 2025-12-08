import type { Schema, Struct } from '@strapi/strapi';

export interface ContactContactReference extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_references';
  info: {
    displayName: 'Contact Reference';
    icon: 'envelop';
  };
  attributes: {
    referenceEmail: Schema.Attribute.Email;
    referenceName: Schema.Attribute.String;
    referencePhoneNumber: Schema.Attribute.String;
    referenceTitle: Schema.Attribute.String;
  };
}

export interface EducationEducationDetail extends Struct.ComponentSchema {
  collectionName: 'components_education_education_details';
  info: {
    displayName: 'Education Detail';
    icon: 'book';
  };
  attributes: {
    degreeCertificate: Schema.Attribute.String;
    graduationYear: Schema.Attribute.Date;
    institutionName: Schema.Attribute.String;
  };
}

export interface TrainingTrainingCourse extends Struct.ComponentSchema {
  collectionName: 'components_training_training_courses';
  info: {
    displayName: 'Training Course';
    icon: 'apps';
  };
  attributes: {
    courseName: Schema.Attribute.String;
    dateCompleted: Schema.Attribute.Date;
    institution: Schema.Attribute.String;
  };
}

export interface WorkWorkExperience extends Struct.ComponentSchema {
  collectionName: 'components_work_work_experiences';
  info: {
    displayName: 'Work Experience';
    icon: 'command';
  };
  attributes: {
    companyName: Schema.Attribute.String;
    experienceYears: Schema.Attribute.Integer;
    jobTitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact.contact-reference': ContactContactReference;
      'education.education-detail': EducationEducationDetail;
      'training.training-course': TrainingTrainingCourse;
      'work.work-experience': WorkWorkExperience;
    }
  }
}
