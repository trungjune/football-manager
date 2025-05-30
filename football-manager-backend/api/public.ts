export default function handler(req, res) {
  // Đặt CORS headers để cho phép truy cập từ bất kỳ nguồn nào
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Xử lý OPTIONS request (preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Xử lý GET request
  if (req.method === "GET") {
    res.status(200).json({
      status: "ok",
      message: "Public API is working!",
      timestamp: new Date().toISOString(),
      endpoints: [
        { path: "/api/public", method: "GET", description: "This endpoint" },
        {
          path: "/api/health",
          method: "GET",
          description: "Health check endpoint",
        },
      ],
    });
    return;
  }

  // Xử lý các method khác
  res.status(405).json({ error: "Method not allowed" });
}
