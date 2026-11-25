import { z } from "zod";

const req = (label: string) => z.string({ required_error: `${label} is required` }).trim().min(1, `${label} is required`);
const optional = z.string().trim().max(2000).optional().or(z.literal(""));
const email = z.string().trim().email("Enter a valid email address");
const phone = z.string().trim().min(7, "Enter a valid phone number").max(30).regex(/^[0-9 +()-]+$/, "Enter a valid phone number");

export const instructSteps = {
  firm: z.object({
    firmName: req("Firm name"),
    sraNumber: optional,
    feeEarner: req("Fee earner name"),
    email,
    phone,
    reference: req("Your reference"),
    instructingFor: z.enum(["Claimant", "Defendant", "Joint (SJE)"], { errorMap: () => ({ message: "Choose who you act for" }) }),
  }),
  claimant: z.object({
    claimantName: req("Claimant name"),
    claimantDob: req("Date of birth"),
    claimantPostcode: z.string().trim().min(5, "Enter a valid postcode").max(8),
    claimantPhone: optional,
    preferredClinic: z.enum(["Leicester", "Derby", "Rugby", "No preference"], { errorMap: () => ({ message: "Choose a clinic" }) }),
    interpreter: optional,
    accessNeeds: optional,
  }),
  claim: z.object({
    claimType: z.enum(["Road traffic", "Employer liability", "Public liability", "Clinical negligence", "Sports injury", "Other"], {
      errorMap: () => ({ message: "Choose a claim type" }),
    }),
    incidentDate: req("Date of incident"),
    bodyPart: z.enum(["Shoulder", "Elbow", "Shoulder and elbow"], { errorMap: () => ({ message: "Choose the injured area" }) }),
    track: z.enum(["Not yet allocated", "Small claims", "Fast track", "Intermediate track", "Multi-track"], { errorMap: () => ({ message: "Choose a track" }) }),
    mechanism: z.string().trim().min(10, "Briefly describe what happened (at least 10 characters)").max(3000),
    deadlines: optional,
  }),
  report: z.object({
    reportType: z.enum(
      ["Condition and prognosis", "Addendum / follow-up", "Records-only review", "Breach of duty and causation", "Part 35 questions", "Joint statement", "Other"],
      { errorMap: () => ({ message: "Choose a report type" }) },
    ),
    urgency: z.enum(["Standard", "Urgent – court deadline"], { errorMap: () => ({ message: "Choose an option" }) }),
    questions: optional,
  }),
  terms: z.object({
    consentConfirmed: z.literal("yes", { errorMap: () => ({ message: "Please confirm the claimant has consented" }) }),
    termsAccepted: z.literal("yes", { errorMap: () => ({ message: "Please accept the terms and privacy notice" }) }),
  }),
};

export const instructSchema = instructSteps.firm
  .merge(instructSteps.claimant)
  .merge(instructSteps.claim)
  .merge(instructSteps.report)
  .merge(instructSteps.terms);

export type InstructData = z.infer<typeof instructSchema>;

export const enquirySchema = z.object({
  kind: z.enum(["contact", "interest", "panel"]),
  name: req("Name"),
  organisation: optional,
  email,
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  topic: optional,
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  consent: z.literal("yes", { errorMap: () => ({ message: "Please agree to our privacy notice" }) }),
});

export type EnquiryData = z.infer<typeof enquirySchema>;

export const UPLOAD = {
  maxFiles: 10,
  maxFileBytes: 15 * 1024 * 1024,
  maxTotalBytes: 40 * 1024 * 1024,
  types: ["application/pdf", "image/jpeg", "image/png", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"],
  accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
};

export function fieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const i of err.issues) {
    const k = String(i.path[0] ?? "form");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}
