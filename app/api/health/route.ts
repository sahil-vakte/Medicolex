import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { status: "ok", revision: process.env.DEPLOY_REVISION ?? "local" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
