import Link from 'next/link'

export default function FormulasIndex() {
  const formulas = [
    { id: 'deformation', name: 'Deformation' },
    { id: 'diffusion', name: 'Diffusion' },
    { id: 'energy', name: 'Energy' },
    { id: 'massBalance', name: 'Mass Balance' },
    { id: 'phases', name: 'Phases' },
    { id: 'solidification', name: 'Solidification' },
  ]

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Formulas</h1>
      <ul className="list-disc pl-6 space-y-2">
        {formulas.map((f) => (
          <li key={f.id}>
            <Link href={`/formulas/${f.id}`} className="text-blue-600 hover:underline">
              {f.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
