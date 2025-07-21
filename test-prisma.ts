import { prisma } from "./src/lib/prisma"; // sesuaikan path-nya
import bcrypt from "bcryptjs";

async function addAdmin() {
  const adminId = "admin"; // tentukan ID
  const password = "admin123"; // tentukan password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.admin.create({
      data: {
        adminId,
        password: hashedPassword,
      },
    });
    console.log("Admin berhasil dibuat.");
  } catch (err: any) {
    console.error("Gagal membuat admin:", err.message);
  }
}

addAdmin();
