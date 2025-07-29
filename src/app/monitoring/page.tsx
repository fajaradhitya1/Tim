"use client";

import React, { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { villageLocations } from "../data/villages";

type KelurahanData = {
  [key: string]: { jumlah: number };
};

type UserData = {
  nama: string;
  telepon: string;
  alamat: string;
  kategori: string;
  keterangan: string;
};

export default function Monitoring() {
  const [kelurahanData, setKelurahanData] = useState<KelurahanData>({});
  const [kategoriList, setKategoriList] = useState<UserData[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>("");

  const svgRef = useRef<SVGSVGElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const kotakRefs = useRef<(HTMLDivElement | null)[]>([]);

  const kelurahanList = villageLocations.map((v) => v.name);
  const skipIndexes = [5, 6, 9, 10];

  useEffect(() => {
    const evtSource = new EventSource("/api/auth/sse");

    evtSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setKelurahanData(data);
      } catch {
        console.error("Failed parsing SSE data");
      }
    };

    evtSource.onerror = (e) => {
      console.error("SSE connection error:", e);
      evtSource.close();
    };

    return () => evtSource.close();
  }, []);

  async function handleKotakClick(namaKel: string) {
    setSelectedKelurahan(namaKel);
    try {
      const res = await fetch(
        `/api/auth/kelurahan?kelurahan=${encodeURIComponent(namaKel)}`
      );
      if (!res.ok) throw new Error("Gagal fetch data");
      const data: UserData[] = await res.json();
      setKategoriList(data);
    } catch (err) {
      console.error("❌ Gagal ambil data:", err);
      setKategoriList([]);
    }
    setModalShow(true);
  }

  useEffect(() => {
    if (!gridRef.current || !svgRef.current) return;

    const grid = gridRef.current;
    const svg = svgRef.current;
    svg.innerHTML = "";

    const tengah = grid.querySelector("#kotakTengah") as HTMLElement;
    if (!tengah) return;

    const rectTengah = tengah.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    const tengahX = rectTengah.left + rectTengah.width / 2 - gridRect.left;
    const tengahY = rectTengah.top + rectTengah.height / 2 - gridRect.top;

    svg.setAttribute("width", grid.offsetWidth.toString());
    svg.setAttribute("height", grid.offsetHeight.toString());

    kotakRefs.current.forEach((kotak) => {
      if (!kotak) return;
      const rect = kotak.getBoundingClientRect();
      const x = rect.left + rect.width / 2 - gridRect.left;
      const y = rect.top + rect.height / 2 - gridRect.top;

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x.toString());
      line.setAttribute("y1", y.toString());
      line.setAttribute("x2", tengahX.toString());
      line.setAttribute("y2", tengahY.toString());
      line.setAttribute("stroke", "#198754");
      line.setAttribute("stroke-width", "3");
      svg.appendChild(line);
    });
  }, [kelurahanData]);

  kotakRefs.current = [];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4" style={{ color: "#2e7d32" }}>
        Monitoring Permintaan Pelatihan
      </h1>

      <div
        className="grid-container position-relative"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 120px)",
          gridTemplateRows: "repeat(4, 120px)",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          maxWidth: 600,
        }}
        ref={gridRef}
      >
        <svg
          className="garis-svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          ref={svgRef}
        ></svg>

        {Array.from({ length: 16 }).map((_, idx) => {
          if (skipIndexes.includes(idx)) {
            if (idx === 5) {
              return (
                <div
                  key="center"
                  id="kotakTengah"
                  style={{
                    gridColumn: "2 / span 2",
                    gridRow: "2 / span 2",
                    width: 240,
                    height: 240,
                    backgroundColor: "#14532d",
                    borderRadius: 12,
                    outline: "4px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    padding: 10,
                    zIndex: 2,
                  }}
                >
                  Smart City
                  <br />
                  Stabat
                </div>
              );
            }
            return null;
          }

          const filteredIdx = idx - skipIndexes.filter((i) => i < idx).length;
          const kelurahanName = kelurahanList[filteredIdx] || "";
          const hasData = kelurahanData[kelurahanName]?.jumlah > 0;

          return (
            <div
              key={idx}
              className="kotak"
              ref={(el) => {
                if (el) kotakRefs.current.push(el);
              }}
              style={{
                width: 100,
                height: 100,
                backgroundColor: hasData ? "#0d6efd" : "#ccc",
                opacity: hasData ? 1 : 0.5,
                borderRadius: 10,
                outline: "3px solid white",
                color: "white",
                fontSize: 12,
                textAlign: "center",
                padding: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: hasData ? "pointer" : "default",
                pointerEvents: hasData ? "auto" : "none",
                position: "relative",
                zIndex: 2,
                flexDirection: "column",
                userSelect: "none",
              }}
              onClick={() => {
                if (hasData) handleKotakClick(kelurahanName);
              }}
            >
              <div style={{ marginBottom: 6 }}>{kelurahanName || "-"}</div>
              {hasData && (
                <div
                  style={{
                    backgroundColor: "white",
                    color: "#0d6efd",
                    fontWeight: "bold",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                  }}
                >
                  {kelurahanData[kelurahanName].jumlah}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedKelurahan}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {kategoriList.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Telepon</th>
                    <th>Alamat</th>
                    <th>Kategori</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {kategoriList.map((item, i) => (
                    <tr key={i}>
                      <td>{item.nama}</td>
                      <td>{item.telepon}</td>
                      <td>{item.alamat}</td>
                      <td>{item.kategori}</td>
                      <td>{item.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">Tidak ada data permintaan pelatihan.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
