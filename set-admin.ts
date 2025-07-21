import { prisma } from "./src/lib/prisma"; // sesuaikan dengan path prisma client-mu
import bcrypt from "bcrypt";

async function seedAdmin() {
  const hashedPassword = await bcrypt.hash("admin", 10); // ganti "admin" jika mau password lain

  await prisma.admin.upsert({
    where: { adminId: "admin" },
    update: {
      password: hashedPassword,
    },
    create: {
      adminId: "admin",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin berhasil diset.");
}

seedAdmin().catch((e) => {
  console.error("❌ Gagal:", e);
});
