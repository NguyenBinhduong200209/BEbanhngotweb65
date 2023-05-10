import jwt from "jsonwebtoken";

const JWT_SECRET ="MY_SECRET_KEY"

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  // Lấy token từ header của request
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Không tìm thấy token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Lưu trữ thông tin user vào biến req.user để các middleware và route khác có thể sử dụng
     next(); // Chuyển tiếp request tới route tương ứng

  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

export default authMiddleware;