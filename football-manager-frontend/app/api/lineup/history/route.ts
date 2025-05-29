import { NextRequest, NextResponse } from "next/server";
import api from "@/services/api";

export async function GET(request: NextRequest) {
  try {
    // Lấy token từ cookie nếu có
    const token = request.cookies.get("token")?.value;

    // Gọi API backend
    const response = await api.get("/lineup/history", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching team history:", error);
    return NextResponse.json(
      {
        message:
          error.response?.data?.message ||
          "Có lỗi xảy ra khi lấy lịch sử chia đội",
      },
      { status: error.response?.status || 500 }
    );
  }
}
