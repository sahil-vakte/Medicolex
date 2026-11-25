/**
 * SITE CONFIGURATION
 * ------------------------------------------------------------------
 * Everything marked `null` is waiting for Aranath to supply it.
 * Leave a value as `null` and the site hides or softens that item
 * automatically, so nothing breaks or shows a placeholder publicly.
 */

export const site = {
  name: "Medicolex",
  tagline: "Independent Medico-Legal Experts",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicolex.co.uk",
  description:
    "Consultant-led, CPR Part 35-compliant medico-legal reports for solicitors. Shoulder and elbow expert examinations in Leicester, Derby and Rugby.",

  company: {
    legalName: "Aranath Medicolegal Limited",
    number: "17036313",
    registeredIn: "England and Wales",
    registeredOffice: "18 Tynedale Close, Oadby, Leicester, LE2 4TS",
    icoNumber: null as string | null, // e.g. "ZB123456"
    indemnityInsurer: null as string | null, // e.g. "Medical Protection Society"
    vatNumber: null as string | null,
  },

  contact: {
    phone: null as string | null, // e.g. "0116 000 0000"
    email: null as string | null, // e.g. "instructions@medicolex.co.uk"
    instructionsEmail: null as string | null,
    hours: "Monday to Friday, 9am to 5pm",
    linkedIn: null as string | null,
  },

  /** Service standards. Numbers are working days. null = not yet published. */
  standards: {
    appointmentWithinDays: null as number | null,
    reportWithinDaysOfExam: null as number | null,
    feeQuoteWithinHours: null as number | null,
  },

  /** MedCo accreditation for RTA soft-tissue reports. Set once confirmed. */
  medcoAccredited: false,
};

export type Expert = {
  slug: string;
  name: string | null;
  title: string;
  specialty: string;
  gmcNumber: string | null;
  photo: string | null; // path in /public, e.g. "/experts/consultant.jpg"
  qualifications: string[];
  posts: string[];
  memberships: string[];
  medicoLegal: {
    yearsExperience: number | null;
    reportsPerYear: number | null;
    claimantDefendantSplit: string | null;
    courtAttendances: string | null;
    training: string[];
  };
  interests: string[];
  clinics: string[]; // location slugs
  cvPdf: string | null; // path in /public
  bio: string | null;
};

export const experts: Expert[] = [
  {
    slug: "shoulder-elbow-consultant",
    name: null, // e.g. "Mr A. Surname FRCS (Tr & Orth)"
    title: "Consultant Orthopaedic Surgeon",
    specialty: "Shoulder and Elbow Surgery",
    gmcNumber: null,
    photo: null,
    qualifications: [],
    posts: [],
    memberships: [],
    medicoLegal: {
      yearsExperience: null,
      reportsPerYear: null,
      claimantDefendantSplit: null,
      courtAttendances: null,
      training: [],
    },
    interests: [
      "Rotator cuff tears and tendinopathy",
      "Shoulder instability and dislocation",
      "Fractures of the clavicle, humerus and elbow",
      "Tennis and golfer's elbow",
      "Outcomes after shoulder and elbow surgery",
    ],
    clinics: ["leicester", "derby", "rugby"],
    cvPdf: null,
    bio: null,
  },
];

export const legalLine = `${site.name} is a trading name of ${site.company.legalName}, registered in ${site.company.registeredIn}, company number ${site.company.number}. Registered office: ${site.company.registeredOffice}.`;
