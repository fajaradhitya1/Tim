export type Bantuan = {
  nama: string;
  hp: string;
  kelurahan: string;
  alamat: string;
  kategori: string;
  kategoriLain?: string;
  keterangan?: string;
};
// Tipe fungsi pengirim SSE
export type Client = { send: (data: string) => void };

export const bantuanData: Bantuan[] = [];
export const clients: Client[] = [];

export function hitungJumlahPerKelurahan(): Record<string, { jumlah: number }> {
  const result: Record<string, { jumlah: number }> = {};
  for (const b of bantuanData) {
    const kel = b.kelurahan;
    if (!result[kel]) result[kel] = { jumlah: 0 };
    result[kel].jumlah++;
  }
  return result;
}

export function broadcast(data: string) {
  clients.forEach((c, i) => {
    try {
      c.send(data);
    } catch {
      clients.splice(i, 1);
    }
  });
}
