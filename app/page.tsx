"use client";
import Link from "next/link";
import BackgroundPaths from "../components/kokonutui/background-paths";

export default function FormulasIndex() {
  const formulas = [
    { id: "deformation", name: "Deformation" },
    { id: "diffusion", name: "Diffusion" },
    { id: "energy", name: "Energy" },
    { id: "massBalance", name: "Mass Balance" },
    { id: "phases", name: "Phases" },
    { id: "solidification", name: "Solidification" },
  ];

  return (
    <main className="relative overflow-hidden">
      <section className=" bg-linear-to-r from-slate-100/5 to-white rounded-lg min-h-screen flex items-center">
        {/* Decorative wave background */}
        <div className="absolute inset-0 -z-10">
          <BackgroundPaths />
        </div>
        <div className="max-w-4xl md:mx-auto mx-3 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-3 text-slate-600 bg-clip-text">
            MetalCal
          </h1>
          <p className="text-xl text-slate-600 mb-6 max-w-3xl mx-auto">
            MetalCal provides quick calculations for metallurgical
            processes—deformation, diffusion, energy, mass balance, phases, and
            solidification—so you can estimate key parameters for material
            processing.
          </p>

          <div
            id="formulas"
            className="max-w-4xl mx-auto flex flex-col items-center bg-linear-to-b from-white to-slate-50 p-8 rounded-lg shadow-lg border border-slate-300"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-800">
              Calculate Process
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              {formulas.map((f) => (
                <li key={f.id}>
                  <Link
                    href={`/${f.id}`}
                    className="text-slate-700 hover:text-slate-900 font-semibold link-underline"
                  >
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
