import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import userSerice from "@/services/user-serice";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Kiểm tra xem phương thức HTTP có phải là GET không
  if (req.method === "GET") {
    console.log("API call received");

    const cookies = cookie.parse(req.headers.cookie || "");
    const userId = cookies.Id; // Lấy giá trị userId từ cookie

    if (userId) {
      try {
        // Gọi API backend C# với userId làm phần của request
        const response = await userSerice.fetchById(userId);

        if (response.status !== 1) {
          // Trả về mã lỗi nếu không thành công
          return res.status(response.status).json({ message: response.message });
        }

        const user = response.data;
        return res.status(200).json({ user }); // Trả về dữ liệu người dùng
      } catch (error) {
        console.error("Error calling C# API:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      // Nếu không có userId (nghĩa là chưa đăng nhập), trả về lỗi 401
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  // Nếu không phải phương thức GET, trả về lỗi 405 (Method Not Allowed)
  return res.status(405).json({ message: "Method Not Allowed" });
}
