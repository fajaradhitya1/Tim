"use client";

import { useReportStore } from "@/app/store/reportStore";
import Image from "next/image";

export default function ReportGallery() {
  const reports = useReportStore((s) => s.reports);
  const category = useReportStore((s) => s.selectedCategory); // <<< Ganti di sini

  const filteredReports = category
    ? reports.filter((r) => r.issues?.includes(category))
    : reports;

  return (
    <section className="px-4 py-4">
      <h2 className="text-xl font-semibold mb-2 text-center">
        Galeri Laporan {category && `- ${category}`}
      </h2>

      {filteredReports.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          Belum ada laporan untuk kategori ini.
        </p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="min-w-[220px] bg-white rounded shadow overflow-hidden"
            >
              <Image
                src={report.imageUrl || "/images/default.jpg"}
                alt={report.description}
                width={240}
                height={160}
                className="w-full h-36 object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-medium">{report.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
