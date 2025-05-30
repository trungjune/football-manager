export default function handler(req, res) {
  // Log request để debug
  console.log("Health check request:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
  });

  // Đặt CORS headers để cho phép truy cập từ bất kỳ nguồn nào
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Xử lý OPTIONS request (preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Trả về thông tin health check
  res.status(200).json({
    status: "ok",
    message: "API is working!",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    version: "1.0.0",
    serverInfo: {
      platform: process.platform,
      nodeVersion: process.version,
    },
  });
}
