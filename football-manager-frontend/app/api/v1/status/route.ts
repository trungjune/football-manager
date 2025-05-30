import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      message: "API is working!",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
