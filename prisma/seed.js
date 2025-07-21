const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedUserPassword = await bcrypt.hash("123456", 10);
  const hashedAdminPassword = await bcrypt.hash("adminpass", 10);

  await prisma.user.create({
    data: {
      email: "user@example.com",
      password: hashedUserPassword,
    },
  });

  await prisma.admin.create({
    data: {
      adminId: "admin123",
      password: hashedAdminPassword,
    },
  });

  await prisma.umkm.create({
    data: {
      nama: "Basreng Pedas",
      wilayah: "Desa Kwala Begumit",
      deskripsi: "Basreng pedas khas desa Kwala Begumit",
      lat: 3.802,
      lng: 98.403,
      imageUrl: "/images/basreng.jpg",
    },
  });

  console.log("✅ Seeding selesai");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
