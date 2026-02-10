"use client";

import { useState } from "react";
import { massBalance } from "@/formulas/massBalance";
import { NumberField } from "@/components/NumberField";
import CalculatorCard from "@/components/Card";
import BackButton from "@/components/BackButton";

export default function Page() {
  const [mineral, setMineral] = useState(1000);
  const [fePercent, setFePercent] = useState(60);
  const [efficiency, setEfficiency] = useState(0.9);
  const [flux, setFlux] = useState(100);

  const [result, setResult] = useState<{
    iron: number;
    slag: number;
    realEfficiency: number;
  } | null>(null);

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 max-w-3xl mx-auto text-base sm:text-lg">
      <BackButton />

      <CalculatorCard title="Mass Balance">
        <div className="mb-4 p-4 bg-slate-50 rounded text-base text-slate-700">
          <p className="font-medium">Description</p>
          <p className="mt-1">
            Simple mass balance calculation to estimate recovered iron and slag
            in a process given the feed ore and process parameters.
          </p>

          <p className="font-medium mt-3">Variables (with units)</p>
          <ul className="list-disc pl-5 mt-1 text-base">
            <li>
              <strong>Mineral</strong>: Feed ore mass (kg)
            </li>
            <li>
              <strong>%Fe</strong>: Iron content in ore (%)
            </li>
            <li>
              <strong>Efficiency</strong>: Recovery fraction (0-1)
            </li>
            <li>
              <strong>Flux</strong>: Flux / additive mass (kg)
            </li>
          </ul>
        </div>

        <div className="mb-4 p-4 bg-white/50 rounded text-base text-slate-700">
          <p className="font-medium">Formulas</p>
          <ul className="list-disc pl-5 mt-2 text-base">
            <li>
              <strong>Recovered Fe</strong>: iron = mineral · (Fe%/100) ·
              efficiency
            </li>
            <li>
              <strong>Slag</strong>: slag = flux + mineral · (1 - Fe%/100)
            </li>
            <li>
              <strong>Real efficiency</strong>: realEfficiency = iron / (mineral
              · Fe%/100)
            </li>
          </ul>

          {result && (
            <div className="mt-2 text-base">
              <p>
                <strong>Numerical example:</strong>
              </p>
              <p>Recovered Fe = {result.iron.toFixed(2)} kg</p>
              <p>Slag = {result.slag.toFixed(2)} kg</p>
              <p>Real efficiency = {result.realEfficiency.toFixed(4)}</p>
            </div>
          )}
        </div>

        <NumberField
          label="Mineral"
          value={mineral}
          onChange={(v) => v !== undefined && setMineral(v)}
        />
        <NumberField
          label="%Fe"
          value={fePercent}
          onChange={(v) => v !== undefined && setFePercent(v)}
        />
        <NumberField
          label="Efficiency"
          value={efficiency}
          onChange={(v) => v !== undefined && setEfficiency(v)}
          step={0.01}
        />
        <NumberField
          label="Flux"
          value={flux}
          onChange={(v) => v !== undefined && setFlux(v)}
        />

        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() =>
              setResult(massBalance({ mineral, fePercent, efficiency, flux }))
            }
          >
            Calculate
          </button>
        </div>

        <div className="mt-4 space-y-2 text-base">
          <p>
            <strong>Recovered Fe:</strong>{" "}
            {result ? result.iron.toFixed(2) + " kg" : "—"}
          </p>
          <p>
            <strong>Slag:</strong>{" "}
            {result ? result.slag.toFixed(2) + " kg" : "—"}
          </p>
          <p>
            <strong>Real efficiency:</strong>{" "}
            {result ? result.realEfficiency.toFixed(4) : "—"}
          </p>
        </div>
      </CalculatorCard>
    </div>
  );
}
