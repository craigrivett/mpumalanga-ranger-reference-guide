import ReferencePanel from './ReferencePanel'
import TrustStrip from './TrustStrip'

export default function DetailPanel({ entry, sourceMap, nowTs }) {
  if (!entry) {
    return (
      <section className="detail-panel empty">
        <p>Select a card to view quick answer, talking points, and source references.</p>
      </section>
    )
  }

  return (
    <section className="detail-panel">
      <header>
        <p className="detail-section">{entry.section}</p>
        <h2>{entry.title}</h2>
        {entry.scientificName ? <p className="sci-name">{entry.scientificName}</p> : null}
        <TrustStrip
          quality={entry.sourceQuality}
          lastReviewedAt={entry.lastReviewedAt}
          verifyOnSite={entry.verifyOnSite}
          nowTs={nowTs}
        />
      </header>

      <article className="panel quick-answer">
        <h4>Quick Answer</h4>
        <p>{entry.quickGuestSnippet}</p>
      </article>

      {entry.immediateActions?.length ? (
        <article className="panel urgent">
          <h4>Immediate Action</h4>
          <ol>
            {entry.immediateActions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h4>Do Not</h4>
          <ul>
            {entry.doNotActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="escalate"><strong>Escalate:</strong> {entry.escalation}</p>
        </article>
      ) : null}

      <article className="panel">
        <h4>Talking Points</h4>
        <ul>
          {entry.talkingPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>

      <article className="panel">
        <h4>Ranger Note</h4>
        <p>{entry.rangerDetail}</p>
      </article>

      {entry.verifyOnSite ? (
        <article className="panel verify-panel">
          <h4>Verify On-Site</h4>
          <p>{entry.verificationNotes}</p>
        </article>
      ) : null}

      <ReferencePanel sourceIds={entry.sourceIds} sourceMap={sourceMap} />
      <p className="review-meta">
        Reviewed on {entry.lastReviewedAt} by {entry.reviewedBy}
      </p>
    </section>
  )
}
