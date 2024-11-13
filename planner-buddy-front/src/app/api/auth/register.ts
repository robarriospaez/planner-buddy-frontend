import { userController } from "@/controllers/userController";

const { register } = userController();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return register(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
