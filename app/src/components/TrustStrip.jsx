export default function TrustStrip({ quality = 'B', lastReviewedAt, verifyOnSite, nowTs }) {
  const referenceTs = typeof nowTs === 'number' ? nowTs : new Date('2026-03-05T00:00:00Z').getTime()
  const daysAgo = Math.max(0, Math.floor((referenceTs - new Date(lastReviewedAt).getTime()) / 86400000))

  return (
    <div className="trust-strip" aria-label={`Trust tier ${quality}. Reviewed ${daysAgo} days ago.`}>
      <span className={`tier tier-${quality.toLowerCase()}`}>Tier {quality}</span>
      <span className="review-age">Reviewed {daysAgo}d ago</span>
      {verifyOnSite ? <span className="verify-chip">Verify on-site</span> : null}
    </div>
  )
}
