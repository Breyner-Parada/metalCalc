import * as formula from '../../../formulas/massBalance'

export default function MassBalancePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Mass Balance</h1>
      <pre className="whitespace-pre-wrap">{JSON.stringify(Object.keys(formula), null, 2)}</pre>
    </main>
  )
}
