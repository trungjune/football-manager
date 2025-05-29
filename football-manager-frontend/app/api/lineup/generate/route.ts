import { NextRequest, NextResponse } from "next/server";
import api from "@/services/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Lấy token từ cookie nếu có
    const token = request.cookies.get("token")?.value;

    // Gọi API backend
    const response = await api.post("/lineup/generate", body, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error generating teams:", error);
    return NextResponse.json(
      { message: error.response?.data?.message || "Có lỗi xảy ra khi tạo đội" },
      { status: error.response?.status || 500 }
    );
  }
}
