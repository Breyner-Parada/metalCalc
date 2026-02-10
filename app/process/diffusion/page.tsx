"use client";

import { useState } from "react";
import { diffusionDepth } from "@/formulas/diffusion";
import { NumberField } from "@/components/NumberField";
import CalculatorCard from "@/components/Card";
import BackButton from "@/components/BackButton";

export default function Page() {
  const [D, setD] = useState(1e-6);
  const [t, setT] = useState(3600);
  const [result, setResult] = useState<number | null>(null);

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 max-w-3xl mx-auto text-base sm:text-lg">
      <BackButton />

      <CalculatorCard title="Diffusion">
        <div className="mb-4 p-4 bg-slate-50 rounded text-base text-slate-700">
          <p className="font-medium">Description</p>
          <p className="mt-1">
            Diffusion is the movement of species within a solid or liquid due to
            concentration gradients. This calculator computes a characteristic
            diffusion depth.
          </p>

          <p className="font-medium mt-3">Variables (with units)</p>
          <ul className="list-disc pl-5 mt-1 text-base">
            <li>
              <strong>D</strong>: Diffusion coefficient (mm²/s)
            </li>
            <li>
              <strong>t</strong>: Time (s)
            </li>
          </ul>

          <p className="mt-2 text-sm text-slate-500">Result: depth (mm).</p>
        </div>

        <div className="mb-4 p-4 bg-white/50 rounded text-base text-slate-700">
          <p className="font-medium">Formula</p>
          <ul className="list-disc pl-5 mt-2 text-base">
            <li>
              <strong>Depth (x)</strong>: x = sqrt(D · t)
            </li>
          </ul>

          {result !== null && (
            <div className="mt-2 text-base">
              <p>
                <strong>Numerical example:</strong>
              </p>
              <p>
                x = sqrt({D} · {t}) = {result.toFixed(6)} mm
              </p>
            </div>
          )}
        </div>

        <NumberField
          label="D"
          value={D}
          onChange={(v) => v !== undefined && setD(v)}
        />
        <NumberField
          label="t"
          value={t}
          onChange={(v) => v !== undefined && setT(v)}
        />

        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setResult(diffusionDepth(D, t))}
          >
            Calculate
          </button>
        </div>

        <div className="mt-4 space-y-2 text-base">
          <p>
            <strong>Depth:</strong>{" "}
            {result !== null ? result.toFixed(6) + " mm" : "—"}
          </p>
        </div>
      </CalculatorCard>
    </div>
  );
}
