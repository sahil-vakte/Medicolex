import { NextResponse } from "next/server";
import { enquirySchema, fieldErrors } from "@/lib/forms";
import { forwardSubmission, makeReference, rateLimited } from "@/lib/forward";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(`enquiry:${ip}`)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again shortly." }, { status: 429 });
  }
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }
  if (String(form.get("website") ?? "") !== "") return NextResponse.json({ ok: true, reference: "ENQ" });

  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === "string" && k !== "website") raw[k] = v;
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) }, { status: 422 });
  }
  const reference = makeReference("ENQ");
  try {
    const fields = Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, String(v ?? "")]));
    await forwardSubmission(parsed.data.kind, reference, fields);
  } catch (e) {
    console.error(`[forms] enquiry ${reference} failed to forward: ${(e as Error).message}`);
    return NextResponse.json({ ok: false, error: "We could not send your message just now. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, reference });
}
