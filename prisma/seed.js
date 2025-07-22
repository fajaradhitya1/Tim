const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedUserPassword = await bcrypt.hash("123456", 10);
  const hashedAdminPassword = await bcrypt.hash("adminpass", 10);

  // ✅ Buat user terlebih dahulu
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: hashedUserPassword,
    },
  });

  // ✅ Buat admin
  await prisma.admin.create({
    data: {
      adminId: "admin123",
      password: hashedAdminPassword,
    },
  });

  // ✅ Buat UMKM yang terhubung dengan user
  await prisma.umkm.create({
    data: {
      nama: "Basreng Pedas",
      wilayah: "Desa Kwala Begumit",
      deskripsi: "Basreng pedas khas desa Kwala Begumit",
      lat: 3.802,
      lng: 98.403,
      imageUrl: "/images/basreng.jpg",
      userId: user.id, // ← wajib ini!
    },
  });

  console.log("✅ Seeding selesai");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
