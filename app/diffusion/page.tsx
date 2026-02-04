import * as formula from "../../formulas/diffusion";

export default function DiffusionPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Diffusion</h1>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(Object.keys(formula), null, 2)}
      </pre>
    </main>
  );
}
