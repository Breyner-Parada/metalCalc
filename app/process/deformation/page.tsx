"use client";

import { useState, useMemo } from "react";
import { rollingForce } from "@/formulas/deformation";
import { NumberField } from "@/components/NumberField";
import CalculatorCard from "@/components/Card";
import BackButton from "@/components/BackButton";

export default function Page() {
  const [h0, setH0] = useState(10);
  const [hf, setHf] = useState(5);
  const [K, setK] = useState(500);
  const [n, setN] = useState(0.2);
  const [area, setArea] = useState(100);

  const [result, setResult] = useState<{
    force: number;
    stress: number;
    strain: number;
  } | null>(null);

  const data = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const hf2 = 10 - i;
        return {
          reduction: hf2,
          force: rollingForce(h0, hf2, K, n, area).force,
        };
      }),
    [h0, K, n, area],
  );

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 max-w-3xl mx-auto text-base sm:text-lg">
      <BackButton />

      <CalculatorCard title="Deformation / Rolling">
        <div className="mb-4 p-4 bg-slate-50 rounded text-base text-slate-700">
          <p className="font-medium">Description</p>
          <p className="mt-1">
            Rolling deformation is a forming process where a metal workpiece is
            reduced in thickness by passing between rollers. It produces
            controlled final thicknesses and is common for sheet and plate
            production.
          </p>

          <p className="font-medium mt-3">Variables (with units)</p>
          <ul className="list-disc pl-5 mt-1 text-base">
            <li>
              <strong>h0</strong>: Initial thickness (mm)
            </li>
            <li>
              <strong>hf</strong>: Final thickness (mm)
            </li>
            <li>
              <strong>K</strong>: Strength coefficient (MPa)
            </li>
            <li>
              <strong>n</strong>: Strain hardening exponent (dimensionless)
            </li>
            <li>
              <strong>Area</strong>: Cross-sectional area (mm²)
            </li>
          </ul>

          <p className="mt-2 text-sm text-slate-500">
            Result: force in Newtons (N). Use consistent units.
          </p>
        </div>

        <div className="mb-4 p-4 bg-white/50 rounded text-base text-slate-700">
          <p className="font-medium">Formulas</p>
          <ul className="list-disc pl-5 mt-2 text-base">
            <li>
              <strong>Strain (ε)</strong>: ε = ln(h0 / hf)
            </li>
            <li>
              <strong>Stress (σ)</strong>: σ = K · ε^n
            </li>
            <li>
              <strong>Force (F)</strong>: F = σ · Area
            </li>
          </ul>

          {result && (
            <div className="mt-2 text-base">
              <p>
                <strong>Numerical example:</strong>
              </p>
              <p>
                ε = ln({h0} / {hf}) = {result.strain.toFixed(4)}
              </p>
              <p>
                σ = {K} · {result.strain.toFixed(4)}^{n} ={" "}
                {result.stress.toFixed(2)} MPa
              </p>
              <p>
                F = {result.stress.toFixed(2)} · {area} ={" "}
                {result.force.toFixed(2)} N
              </p>
            </div>
          )}
        </div>
        <NumberField
          label="h0"
          value={h0}
          onChange={(v) => v !== undefined && setH0(v)}
        />
        <NumberField
          label="hf"
          value={hf}
          onChange={(v) => v !== undefined && setHf(v)}
        />
        <NumberField
          label="K"
          value={K}
          onChange={(v) => v !== undefined && setK(v)}
        />
        <NumberField
          label="n"
          value={n}
          onChange={(v) => v !== undefined && setN(v)}
        />
        <NumberField
          label="Area"
          value={area}
          onChange={(v) => v !== undefined && setArea(v)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setResult(rollingForce(h0, hf, K, n, area))}
        >
          Calculate
        </button>

        <p>
          <strong>Strain:</strong> {result ? result.strain.toFixed(4) : "—"}{" "}
          (dimensionless)
        </p>
        <p>
          <strong>Stress:</strong> {result ? result.stress.toFixed(2) : "—"} MPa
        </p>
        <p>
          <strong>Force:</strong>{" "}
          {result ? result.force.toFixed(2) + " N" : "—"}
        </p>

        {/* <LineChartBox data={data} xKey="reduction" yKey="force" /> */}
      </CalculatorCard>
    </div>
  );
}
