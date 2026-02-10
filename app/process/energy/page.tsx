"use client";

import { useState } from "react";
import { fusionEnergy } from "@/formulas/energy";
import { NumberField } from "@/components/NumberField";
import CalculatorCard from "@/components/Card";
import BackButton from "@/components/BackButton";

export default function Page() {
  const [m, setM] = useState(1); // kg
  const [Cp, setCp] = useState(0.5); // kJ/kg·K
  const [Ti, setTi] = useState(20);
  const [Tf, setTf] = useState(1500);
  const [Lf, setLf] = useState(270); // kJ/kg

  const [result, setResult] = useState<{ kJ: number; kWh: number } | null>(
    null,
  );

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 max-w-3xl mx-auto text-base sm:text-lg">
      <BackButton />

      <CalculatorCard title="Fusion / Heating Energy">
        <div className="mb-4 p-4 bg-slate-50 rounded text-base text-slate-700">
          <p className="font-medium">Description</p>
          <p className="mt-1">
            Energy required to heat and melt a given mass. Includes sensible
            heat and latent heat of fusion.
          </p>

          <p className="font-medium mt-3">Variables (with units)</p>
          <ul className="list-disc pl-5 mt-1 text-base">
            <li>
              <strong>m</strong>: Mass (kg)
            </li>
            <li>
              <strong>Cp</strong>: Specific heat (kJ/kg·K)
            </li>
            <li>
              <strong>Ti</strong>: Initial temperature (°C)
            </li>
            <li>
              <strong>Tf</strong>: Final / melting temperature (°C)
            </li>
            <li>
              <strong>Lf</strong>: Latent heat of fusion (kJ/kg)
            </li>
          </ul>

          <p className="mt-2 text-sm text-slate-500">
            Result: energy in kJ and kWh.
          </p>
        </div>

        <div className="mb-4 p-4 bg-white/50 rounded text-base text-slate-700">
          <p className="font-medium">Formulas</p>
          <ul className="list-disc pl-5 mt-2 text-base">
            <li>
              <strong>Sensible heat (Q1)</strong>: Q1 = m · Cp · (Tf - Ti)
            </li>
            <li>
              <strong>Latent heat (Q2)</strong>: Q2 = m · Lf
            </li>
            <li>
              <strong>Total Q</strong>: Q = Q1 + Q2
            </li>
          </ul>

          {result && (
            <div className="mt-2 text-base">
              <p>
                <strong>Numerical example:</strong>
              </p>
              <p>
                Q = {result.kJ.toFixed(2)} kJ = {result.kWh.toFixed(4)} kWh
              </p>
            </div>
          )}
        </div>

        <NumberField
          label="m"
          value={m}
          onChange={(v) => v !== undefined && setM(v)}
        />
        <NumberField
          label="Cp"
          value={Cp}
          onChange={(v) => v !== undefined && setCp(v)}
        />
        <NumberField
          label="Ti"
          value={Ti}
          onChange={(v) => v !== undefined && setTi(v)}
        />
        <NumberField
          label="Tf"
          value={Tf}
          onChange={(v) => v !== undefined && setTf(v)}
        />
        <NumberField
          label="Lf"
          value={Lf}
          onChange={(v) => v !== undefined && setLf(v)}
        />

        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setResult(fusionEnergy(m, Cp, Ti, Tf, Lf))}
          >
            Calculate
          </button>
        </div>

        <div className="mt-4 space-y-2 text-base">
          <p>
            <strong>Energy:</strong>{" "}
            {result ? result.kJ.toFixed(2) + " kJ" : "—"}
          </p>
          <p>
            <strong>Energy:</strong>{" "}
            {result ? result.kWh.toFixed(4) + " kWh" : "—"}
          </p>
        </div>
      </CalculatorCard>
    </div>
  );
}
