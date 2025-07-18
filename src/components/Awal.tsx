import React from 'react'
import Image from "next/image";
import { motion } from "framer-motion";

function Home() {
  return (
    <>
      <div>
        <h2 className="space-y-12 p-6 text-2xl font-bold mb-4 text-center">
          Mengenal Smart City Langkat
        </h2>
      </div>
     
      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="/images/sawah.png"
            alt="Sawah"
            width={600}
            height={400}
            className="rounded-xl shadow-md object-cover w-full h-auto"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Mengenal Desa</h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            officia quisquam ut dolores quibusdam aliquid voluptates vel
            molestiae, nam temporibus.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
            fuga saepe vitae nulla atque repudiandae quis cum, tempore maiores
            minima!
          </p>
        </div>
      </div>
    </>
  );
}

export default Home