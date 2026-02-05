"use client";

import { useState, useMemo } from "react";
import { rollingForce } from "@/formulas/deformation";
import { NumberField } from "@/components/NumberField";
import CalculatorCard from "@/components/Card";

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
    <div className="p-10 max-w-2xl mx-auto text-lg">
      <CalculatorCard title="Deformación / Laminación">
        <div className="mb-4 p-4 bg-slate-50 rounded text-base text-slate-700">
          <p className="font-medium">Descripción</p>
          <p className="mt-1">
            La deformación por laminación es un proceso de conformado en el que
            una pieza metálica se reduce en espesor al pasar entre rodillos.
            Permite obtener espesores finales controlados y es común en procesos
            de producción de chapa y lámina.
          </p>

          <p className="font-medium mt-3">Variables (con unidades)</p>
          <ul className="list-disc pl-5 mt-1 text-base">
            <li>
              <strong>h0</strong>: Espesor inicial (mm)
            </li>
            <li>
              <strong>hf</strong>: Espesor final (mm)
            </li>
            <li>
              <strong>K</strong>: Coeficiente de resistencia / dureza (MPa)
            </li>
            <li>
              <strong>n</strong>: Exponente de endurecimiento por deformación
              (adimensional)
            </li>
            <li>
              <strong>Área</strong>: Área de la sección (mm²)
            </li>
          </ul>

          <p className="mt-2 text-sm text-slate-500">
            Resultado: fuerza en Newtons (N). Asegúrese de usar unidades
            consistentes al introducir valores.
          </p>
        </div>

        <div className="mb-4 p-4 bg-white/50 rounded text-base text-slate-700">
          <p className="font-medium">Fórmulas</p>
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
                <strong>Ejemplo numérico:</strong>
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
          label="Área"
          value={area}
          onChange={(v) => v !== undefined && setArea(v)}
        />

        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setResult(rollingForce(h0, hf, K, n, area))}
          >
            Calcular
          </button>
        </div>

        <div className="mt-4 space-y-2 text-base">
          <p>
            <strong>Strain:</strong> {result ? result.strain.toFixed(4) : "—"}{" "}
            (adimensional)
          </p>
          <p>
            <strong>Stress:</strong> {result ? result.stress.toFixed(2) : "—"}{" "}
            MPa
          </p>
          <p>
            <strong>Force:</strong>{" "}
            {result ? result.force.toFixed(2) + " N" : "—"}
          </p>
        </div>

        {/* <LineChartBox data={data} xKey="reduction" yKey="force" /> */}
      </CalculatorCard>
    </div>
  );
}
