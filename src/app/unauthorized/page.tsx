export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
        <p className="text-gray-700 text-lg">
          Kamu tidak memiliki izin untuk mengakses halaman ini.
        </p>
      </div>
    </div>
  );
}
