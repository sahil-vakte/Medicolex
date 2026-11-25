import { NextResponse } from "next/server";
import { fieldErrors, instructSchema, UPLOAD } from "@/lib/forms";
import { forwardSubmission, makeReference, rateLimited } from "@/lib/forward";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(`instruct:${ip}`)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again shortly." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (String(form.get("website") ?? "") !== "") return NextResponse.json({ ok: true, reference: "MLX" });

  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === "string" && k !== "website") raw[k] = v;

  const parsed = instructSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) }, { status: 422 });
  }

  const files = form.getAll("documents").filter((f): f is File => typeof f !== "string" && f.size > 0);
  if (files.length > UPLOAD.maxFiles) return NextResponse.json({ ok: false, error: `Upload up to ${UPLOAD.maxFiles} files.` }, { status: 422 });
  let total = 0;
  for (const f of files) {
    total += f.size;
    if (!UPLOAD.types.includes(f.type)) return NextResponse.json({ ok: false, error: `${f.name}: only PDF, Word, JPG and PNG files are accepted.` }, { status: 422 });
    if (f.size > UPLOAD.maxFileBytes) return NextResponse.json({ ok: false, error: `${f.name} is larger than 15 MB.` }, { status: 422 });
  }
  if (total > UPLOAD.maxTotalBytes) return NextResponse.json({ ok: false, error: "Total upload is larger than 40 MB. Send the rest after we acknowledge." }, { status: 422 });

  const reference = makeReference("MLX");
  try {
    const fields = Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, String(v ?? "")]));
    await forwardSubmission("instruction", reference, fields, files);
  } catch (e) {
    console.error(`[forms] instruction ${reference} failed to forward: ${(e as Error).message}`);
    return NextResponse.json({ ok: false, error: "We could not submit your instruction just now. Please try again or contact us." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, reference });
}
