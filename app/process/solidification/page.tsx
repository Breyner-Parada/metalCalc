"use client";

import { useState } from "react";
import { solidificationTime } from "@/formulas/solidification";
import { NumberField } from "@/components/NumberField";
import CalculatorCard from "@/components/Card";
import BackButton from "@/components/BackButton";

export default function Page() {
  const [V, setV] = useState(1);
  const [A, setA] = useState(0.5);
  const [C, setC] = useState(100);
  const [n, setN] = useState(2);

  const [result, setResult] = useState<number | null>(null);

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 max-w-3xl mx-auto text-base sm:text-lg">
      <BackButton />

      <CalculatorCard title="Solidification">
        <div className="mb-4 p-4 bg-slate-50 rounded text-base text-slate-700">
          <p className="font-medium">Description</p>
          <p className="mt-1">
            Estimate solidification time as a function of volume, surface area
            and empirical constants.
          </p>

          <p className="font-medium mt-3">Variables (with units)</p>
          <ul className="list-disc pl-5 mt-1 text-base">
            <li>
              <strong>V</strong>: Volume (m³)
            </li>
            <li>
              <strong>A</strong>: Cooling area (m²)
            </li>
            <li>
              <strong>C</strong>: Empirical constant
            </li>
            <li>
              <strong>n</strong>: Exponent (default 2)
            </li>
          </ul>
        </div>

        <div className="mb-4 p-4 bg-white/50 rounded text-base text-slate-700">
          <p className="font-medium">Formula</p>
          <ul className="list-disc pl-5 mt-2 text-base">
            <li>
              <strong>Time</strong>: t = C · (V / A)^n
            </li>
          </ul>

          {result !== null && (
            <div className="mt-2 text-base">
              <p>
                <strong>Numerical example:</strong>
              </p>
              <p>
                t = {C} · ({V} / {A})^{n} = {result.toFixed(4)}
              </p>
            </div>
          )}
        </div>

        <NumberField
          label="V"
          value={V}
          onChange={(v) => v !== undefined && setV(v)}
        />
        <NumberField
          label="A"
          value={A}
          onChange={(v) => v !== undefined && setA(v)}
        />
        <NumberField
          label="C"
          value={C}
          onChange={(v) => v !== undefined && setC(v)}
        />
        <NumberField
          label="n"
          value={n}
          onChange={(v) => v !== undefined && setN(v)}
        />

        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setResult(solidificationTime(V, A, C, n))}
          >
            Calculate
          </button>
        </div>

        <div className="mt-4 space-y-2 text-base">
          <p>
            <strong>Solidification time:</strong>{" "}
            {result !== null ? result.toFixed(4) : "—"}
          </p>
        </div>
      </CalculatorCard>
    </div>
  );
}
