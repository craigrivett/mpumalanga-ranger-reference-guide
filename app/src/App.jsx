import { useMemo, useState } from 'react'
import './App.css'
import DetailPanel from './components/DetailPanel'
import EntryCard from './components/EntryCard'
import { emergencyContacts, entries, reserveProfiles, sources } from './data/content'

const modes = [
  { id: 'ask', label: 'Ask' },
  { id: 'protocols', label: 'Protocols' },
  { id: 'library', label: 'Library' },
]

const categoryFilters = ['All', 'Mammals', 'Birds', 'Plants/Trees', 'Safety', 'Conservation', 'Seasonality', 'Guest FAQ']

function App() {
  const [mode, setMode] = useState('ask')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [activeId, setActiveId] = useState(entries[0]?.id ?? null)
  const [selectedReserve, setSelectedReserve] = useState(reserveProfiles[0].id)

  const sourceMap = useMemo(() => Object.fromEntries(sources.map((source) => [source.id, source])), [])
  const nowTs = new Date('2026-03-05T00:00:00Z').getTime()
  const normalizePhone = (value) => String(value || '').replace(/\s+/g, '')

  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry) => (mode === 'protocols' ? ['protocols', 'ask'].includes(entry.mode) : entry.mode === mode || entry.mode === 'ask'))
      .filter((entry) => (category === 'All' ? true : entry.category === category))
      .filter((entry) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        return [entry.title, entry.quickGuestSnippet, entry.rangerDetail, ...(entry.tags || [])].join(' ').toLowerCase().includes(q)
      })
  }, [mode, category, query])

  const activeEntry = filteredEntries.find((entry) => entry.id === activeId) || filteredEntries[0] || null

  const reserve = reserveProfiles.find((item) => item.id === selectedReserve)

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-bar-overlay">
          <p className="eyebrow">Mpumalanga Ranger Reference Guide</p>
          <h1>Field-ready answers in seconds</h1>
          <p className="hero-sub">Beautifully structured, source-traceable fact cards for confident guest conversations.</p>
          <div className="hero-metrics">
            <span>{entries.length} ranger references</span>
            <span>{sources.length} trusted sources</span>
            <span>{reserveProfiles.length} reserve profiles</span>
          </div>
        </div>
      </header>

      <nav className="mode-tabs" aria-label="Primary app modes">
        {modes.map((tab) => (
          <button
            key={tab.id}
            className={mode === tab.id ? 'active' : ''}
            onClick={() => {
              setMode(tab.id)
              setCategory('All')
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="control-panel">
        <input
          type="search"
          placeholder="Ask anything: leopard, snakebite, marula, children on drives..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search ranger guide"
        />
        <div className="filters" aria-label="Category filters">
          {categoryFilters.map((filter) => (
            <button
              key={filter}
              className={category === filter ? 'active' : ''}
              onClick={() => setCategory(filter)}
              aria-pressed={category === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <main className="layout">
        <section className="results" aria-label="Search results">
          {filteredEntries.length ? (
            filteredEntries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} isActive={entry.id === activeEntry?.id} onSelect={setActiveId} />
            ))
          ) : (
            <div className="no-results">No entries match this search. Try broader terms or reset filters.</div>
          )}
        </section>

        <DetailPanel entry={activeEntry} sourceMap={sourceMap} nowTs={nowTs} />
      </main>

      <section className="reserve-and-emergency">
        <article className="panel reserve-panel">
          <h3>Reserve Rules (Verify On-Site)</h3>
          <label htmlFor="reserve-select">Reserve</label>
          <select id="reserve-select" value={selectedReserve} onChange={(event) => setSelectedReserve(event.target.value)}>
            {reserveProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
          <ul>
            {reserve.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="review-meta">
            Effective {reserve.effectiveDate} · Verified by {reserve.verifiedBy}
          </p>
        </article>

        <article className="panel emergency-panel" id="emergency">
          <h3>Emergency (max two taps to call)</h3>
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <h4>{contact.displayName}</h4>
              <p>{contact.whenToCall}</p>
              <p className="radio">{contact.radioChannel}</p>
              <div className="call-row">
                <a href={`tel:${normalizePhone(contact.phonePrimary)}`}>Call primary</a>
                <a href={`tel:${normalizePhone(contact.phoneBackup)}`}>Backup</a>
              </div>
              <details>
                <summary>Call script template</summary>
                <p>{contact.script}</p>
              </details>
            </div>
          ))}
        </article>
      </section>

      <a href="#emergency" className="emergency-fab" aria-label="Jump to emergency panel">
        Emergency
      </a>
    </div>
  )
}

export default App
