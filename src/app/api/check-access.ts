// pages/api/check-access.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE}/users/check-access`,
      {},
      { withCredentials: true }
    );

    // Kiểm tra kết quả từ API
    if (response.data.status !== 1) {
      return res.status(403).json({ message: response.data.message || "Không có quyền truy cập" });
    }

    // Trả về kết quả thành công
    return res.status(200).json({ message: "Access granted" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Lỗi khi kiểm tra quyền truy cập." });
  }
}
