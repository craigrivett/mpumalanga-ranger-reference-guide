import TrustStrip from './TrustStrip'

export default function EntryCard({ entry, isActive, onSelect }) {
  return (
    <button className={`entry-card ${isActive ? 'active' : ''}`} onClick={() => onSelect(entry.id)}>
      <div className="entry-head">
        <span className="entry-category">{entry.category}</span>
        <h3>{entry.title}</h3>
      </div>
      <p className="quick-snippet">{entry.quickGuestSnippet}</p>
      <TrustStrip
        quality={entry.sourceQuality}
        lastReviewedAt={entry.lastReviewedAt}
        verifyOnSite={entry.verifyOnSite}
      />
    </button>
  )
}
