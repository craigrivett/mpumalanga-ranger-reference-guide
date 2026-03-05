export default function ReferencePanel({ sourceIds = [], sourceMap }) {
  if (!sourceIds.length) return null

  return (
    <section className="panel refs-panel" aria-label="Data sources and references">
      <h4>Sources & Traceability</h4>
      <ul>
        {sourceIds.map((id) => {
          const source = sourceMap[id]
          if (!source) return null
          return (
            <li key={id}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.name}
              </a>
              <div className="source-meta">Tier {source.tier} · {source.note}</div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
