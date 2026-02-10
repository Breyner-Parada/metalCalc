"use client";

import { useState } from "react";
import { leverRule } from "@/formulas/phases";
import { NumberField } from "@/components/NumberField";
import CalculatorCard from "@/components/Card";
import BackButton from "@/components/BackButton";

export default function Page() {
  const [C0, setC0] = useState(0.5);
  const [Ca, setCa] = useState(0.1);
  const [Cb, setCb] = useState(1);

  const [result, setResult] = useState<{ Wa: number; Wb: number } | null>(null);

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 max-w-3xl mx-auto text-base sm:text-lg">
      <BackButton />

      <CalculatorCard title="Lever Rule / Phases">
        <div className="mb-4 p-4 bg-slate-50 rounded text-base text-slate-700">
          <p className="font-medium">Description</p>
          <p className="mt-1">
            Apply the lever rule to determine phase fractions in a binary
            mixture at a given temperature.
          </p>

          <p className="font-medium mt-3">Variables (with units)</p>
          <ul className="list-disc pl-5 mt-1 text-base">
            <li>
              <strong>C0</strong>: Overall composition (fraction)
            </li>
            <li>
              <strong>Ca</strong>: Composition of phase A (fraction)
            </li>
            <li>
              <strong>Cb</strong>: Composition of phase B (fraction)
            </li>
          </ul>
        </div>

        <div className="mb-4 p-4 bg-white/50 rounded text-base text-slate-700">
          <p className="font-medium">Formula</p>
          <ul className="list-disc pl-5 mt-2 text-base">
            <li>
              <strong>Wa</strong>: Wa = (Cb - C0) / (Cb - Ca)
            </li>
            <li>
              <strong>Wb</strong>: Wb = (C0 - Ca) / (Cb - Ca)
            </li>
          </ul>

          {result && (
            <div className="mt-2 text-base">
              <p>
                <strong>Numerical example:</strong>
              </p>
              <p>Wa = {result.Wa.toFixed(4)}</p>
              <p>Wb = {result.Wb.toFixed(4)}</p>
            </div>
          )}
        </div>

        <NumberField
          label="C0"
          value={C0}
          onChange={(v) => v !== undefined && setC0(v)}
          step={0.01}
        />
        <NumberField
          label="Ca"
          value={Ca}
          onChange={(v) => v !== undefined && setCa(v)}
          step={0.01}
        />
        <NumberField
          label="Cb"
          value={Cb}
          onChange={(v) => v !== undefined && setCb(v)}
          step={0.01}
        />

        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setResult(leverRule(C0, Ca, Cb))}
          >
            Calculate
          </button>
        </div>

        <div className="mt-4 space-y-2 text-base">
          <p>
            <strong>Wa:</strong> {result ? result.Wa.toFixed(4) : "—"}
          </p>
          <p>
            <strong>Wb:</strong> {result ? result.Wb.toFixed(4) : "—"}
          </p>
        </div>
      </CalculatorCard>
    </div>
  );
}
