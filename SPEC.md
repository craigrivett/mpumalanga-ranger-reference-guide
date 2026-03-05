# Mpumalanga Ranger Reference Guide (Web App) — V1 Product Specification

**Version:** 1.0  
**Date:** 2026-03-05 (UTC)  
**Product Type:** Mobile-first web reference app for on-duty game rangers  
**Primary Region:** Mpumalanga, South Africa (with emphasis on Greater Kruger/Kruger-adjacent reserves)

---

## 1) Product Brief

### 1.1 Problem
Rangers are frequently asked fast, high-stakes questions by guests (wildlife behavior, bird IDs, safety, reserve rules, local context). Current answers often depend on memory, outdated handouts, or inconsistent sources. This risks:
- Inaccurate interpretation
- Lower guest trust
- Safety miscommunication
- Brand/reputation damage for lodges/reserves

### 1.2 Product Vision
A **fast, trustworthy, in-field reference guide** that helps rangers answer guest questions confidently in under 30 seconds, using verified facts and clear “verify on-site” flags where local conditions can change.

### 1.3 Primary Users
1. **Field Rangers / Guides (Primary)**
   - Need instant access while driving/walking
   - Often low-signal environments
   - Need concise, spoken-friendly facts
2. **Head Rangers / Trainers (Secondary)**
   - Curate and approve content
   - Standardize interpretation quality
3. **Lodge Operations / Safety Leads (Secondary)**
   - Need up-to-date safety and emergency references

### 1.4 Key User Goals
- Get accurate answers fast during game drives/walks
- Cross-check uncertain facts before sharing
- Deliver engaging guest-friendly narratives
- Access reserve-specific rules and emergency protocols quickly

### 1.5 Success Metrics (V1)
- **Time-to-answer:** median < 30 seconds for top queries
- **Answer confidence:** > 85% of ranger sessions end with “confident to present”
- **Adoption:** > 70% of active guides use app weekly
- **Content trust:** 100% of facts display source + last-reviewed date
- **Safety readiness:** emergency section reachable in ≤2 taps

### 1.6 Constraints & Assumptions
- Mobile-first usage; one-handed, sunlight-readable UI
- Intermittent/poor connectivity (must support offline cache)
- Content must be sourced from credible authorities
- Some details vary by reserve/season/day and require **on-site verification**
- No clinical medical advice beyond first-response guidance; always escalate to qualified medical services

---

## 2) Information Architecture (IA)

### 2.1 Top-Level Navigation (Bottom Tab Bar)
1. **Search** (default)
2. **Species**
3. **Safety**
4. **Reserve**
5. **Toolkit**

### 2.2 Section Structure

#### A) Search
- Universal search (species, rules, hazards, first aid topics, weather, culture)
- Suggests “Most asked today” + recently viewed
- Filters: Mammals, Birds, Plants, Safety, Rules, Culture, Emergency

#### B) Species
- Mammals
- Birds
- Trees & Plants
- Reptiles & Amphibians (optional in V1 if capacity allows)
- Each species page includes “Quick guest answer” + “Deep ranger notes”

#### C) Safety
- Dangerous animal encounters (elephant, buffalo, lion, hippo, rhino, crocodile, snake)
- Bush first-response protocols
- Heat/dehydration/sun exposure
- Vehicle and walking safety
- Incident reporting quick checklist

#### D) Reserve
- Reserve-specific rules (speed limits, off-road policy, sightings etiquette)
- Permit/zone notes
- Seasonal access alerts
- Guest conduct/etiquette expectations

#### E) Toolkit
- Emergency contacts templates
- Phrase bank (guest-friendly explanations)
- “Verify on-site” checklist
- Download/offline sync status

### 2.3 Core User Flows
1. **Fast fact flow:** Open app → Search “leopard behavior” → Quick Answer card → Source confidence shown → speak to guests
2. **Safety flow:** Tap Safety → “Snakebite protocol” → immediate do/don’t steps → emergency call template
3. **Reserve rule flow:** Tap Reserve → choose current reserve → “Off-road policy” + “verify with duty manager” flag

---

## 3) Content Model (Data Schema)

Use a unified content model with typed records.

### 3.1 Entity Types
- `species_profile`
- `safety_protocol`
- `reserve_rule`
- `culture_note`
- `weather_seasonality_note`
- `conservation_brief`
- `emergency_contact_template`
- `source_record`

### 3.2 Required Fields (All Fact-like Records)
- `id` (string, unique)
- `title`
- `category` (mammal/bird/plant/safety/rule/etc.)
- `region_scope` (e.g., Mpumalanga, Greater Kruger, reserve-specific)
- `quick_guest_snippet` (1–3 lines)
- `ranger_detail` (long-form)
- `key_takeaways` (bullets)
- `source_ids` (list; linked to source records)
- `source_quality` (High/Medium/Local-only)
- `last_reviewed_at` (ISO date)
- `reviewed_by` (role/name)
- `verify_on_site` (boolean)
- `verification_notes` (what to verify locally)
- `safety_critical` (boolean)
- `tags` (search terms)
- `language_variants` (optional: EN primary, others later)

### 3.3 Species-Specific Fields
- `common_name`
- `scientific_name`
- `identification_features`
- `sexual_dimorphism_notes`
- `habitat`
- `distribution_local`
- `diet`
- `behavior_patterns`
- `breeding_notes`
- `ecological_role`
- `similar_species_confusion`
- `best_guest_story_angles`
- `sensitive_distance_guidance` (if relevant)

### 3.4 Safety Protocol Fields
- `scenario`
- `risk_level`
- `immediate_actions`
- `do_not_actions`
- `escalation_threshold`
- `ppe_or_kit_required`
- `medical_disclaimer`
- `emergency_numbers_reference`

### 3.5 Reserve Rule Fields
- `reserve_name`
- `rule_statement`
- `enforcement_level`
- `exceptions`
- `effective_date`
- `local_manager_contact`

### 3.6 Emergency Contact Template Fields
- `contact_type` (gate control/medical/anti-poaching/SAPS/fire)
- `display_name`
- `phone_primary`
- `phone_backup`
- `radio_channel`
- `when_to_call`
- `call_script_template`
- `last_verified_at`
- `verified_by`

---

## 4) Resource Pack (Curated Sources)

> **Principle:** Prefer primary or near-primary authorities, recognized scientific/conservation organizations, and reserve management publications.  
> **Always label local operating conditions as “Verify on-site.”**

## 4.1 Wildlife Facts (Mammals, General Ecology)

1. **SANParks (South African National Parks)**  
   URL: https://www.sanparks.org  
   Why credible: Official park authority; operational rules, species context, conservation updates.

2. **Kruger National Park pages (via SANParks)**  
   URL: https://www.sanparks.org/parks/kruger  
   Why credible: Directly relevant to Mpumalanga safari context and reserve management practices.

3. **MammalMAP (Virtual Museum, University of Pretoria / Endangered Wildlife Trust linked initiatives)**  
   URL: https://vmus.adu.org.za  
   Why credible: Citizen-science data with academic oversight; useful for distribution/context checks.

4. **IUCN Red List**  
   URL: https://www.iucnredlist.org  
   Why credible: Global conservation status benchmark for species-level threat context.

## 4.2 Birds

1. **BirdLife South Africa**  
   URL: https://www.birdlife.org.za  
   Why credible: National authority for bird conservation, identification resources, and regional context.

2. **Roberts Bird Guide (publisher/resource ecosystem)**  
   URL: https://www.robertsbirds.co.za  
   Why credible: Widely used regional birding reference in Southern Africa.

3. **eBird (Cornell Lab) — South Africa hotspots/checklists**  
   URL: https://ebird.org  
   Why credible: Massive, regularly updated observational database; strong for seasonality/presence trends.

## 4.3 Trees & Plants

1. **SANBI PlantZAfrica**  
   URL: https://pza.sanbi.org  
   Why credible: Official national biodiversity institute resource; accurate plant profiles and ecology notes.

2. **SANBI (South African National Biodiversity Institute)**  
   URL: https://www.sanbi.org  
   Why credible: Authoritative institution for biodiversity, ecosystems, and conservation science in SA.

## 4.4 Conservation & Protected Area Context

1. **Mpumalanga Tourism & Parks Agency (MTPA)**  
   URL: https://www.mtpa.co.za  
   Why credible: Provincial authority for conservation/tourism governance in Mpumalanga.

2. **Department of Forestry, Fisheries and the Environment (DFFE)**  
   URL: https://www.dffe.gov.za  
   Why credible: National environmental policy/regulation source.

3. **Ezemvelo KZN Wildlife (for cross-border ecological context where relevant)**  
   URL: https://www.kznwildlife.com  
   Why credible: Regional conservation authority; useful adjacent ecosystem references.

## 4.5 Reserve Rules & Guest Conduct

1. **SANParks Visitor Rules and Park-specific notices**  
   URL: https://www.sanparks.org/parks/kruger/tourism/  
   Why credible: Official visitor conduct and safety policy baseline.

2. **Private reserve official websites (Sabi Sand, Timbavati, Klaserie, Balule etc.)**  
   Why credible: Primary source for local rules.  
   **Verification:** Must be confirmed with current reserve operations manager due to frequent updates.

## 4.6 Safety & First Aid (Bush Context)

1. **Wilderness Medical Society (practice guidelines where relevant)**  
   URL: https://wms.org  
   Why credible: Recognized wilderness medicine guidance body.

2. **Resuscitation Council South Africa (RCSA) / ERC-aligned updates where applicable**  
   URL: https://www.resuscitationcouncil.co.za  
   Why credible: Local resuscitation and first-response standards context.

3. **South African Red Cross / IFRC first aid fundamentals**  
   URL: https://www.redcross.org.za and https://www.ifrc.org  
   Why credible: Trusted first aid frameworks and educational materials.

4. **National Institute for Communicable Diseases (NICD) — vector, zoonotic context**  
   URL: https://www.nicd.ac.za  
   Why credible: Authoritative South African public health guidance.

> **Medical safety note:** App content must present first-response steps only and clearly instruct escalation to licensed medical professionals/emergency services.

## 4.7 Weather & Seasonality

1. **South African Weather Service (SAWS)**  
   URL: https://www.weathersa.co.za  
   Why credible: National official meteorological service.

2. **Yr.no / Windy / Open-Meteo (supplementary operational forecasts)**  
   URLs: https://www.yr.no | https://www.windy.com | https://open-meteo.com  
   Why credible: Helpful operational tools; use as secondary to SAWS.

## 4.8 Local Culture & Etiquette

1. **South African History Online (SAHO)**  
   URL: https://www.sahistory.org.za  
   Why credible: Broad historical/cultural reference with educational orientation.

2. **Official provincial tourism and heritage resources**  
   URL: https://www.mpumalanga.com (supplementary), plus local municipal heritage pages  
   Why credible: Regional visitor-facing context.  
   **Verification:** Cross-check local community-sensitive guidance with lodge/community liaison.

## 4.9 Anti-Poaching Context

1. **SANParks Ranger Services / Integrity & conservation communications**  
   URL: https://www.sanparks.org  
   Why credible: Official policy and operational narratives.

2. **Global Initiative Against Transnational Organized Crime (contextual research)**  
   URL: https://globalinitiative.net  
   Why credible: Structured analysis of wildlife crime trends.

3. **TRAFFIC (wildlife trade monitoring network)**  
   URL: https://www.traffic.org  
   Why credible: Internationally recognized wildlife trade intelligence and reports.

> **Comms caution:** Anti-poaching details should avoid sensitive operational specifics. Keep guest-facing content educational, non-operational.

## 4.10 Emergency Contacts Templates (Data to Capture)

For each reserve/lodge, collect and maintain:
- Control room / operations desk
- On-call medic / nearest clinic / nearest hospital
- Ambulance and medevac (if contracted)
- SAPS station + case line
- Fire services
- Anti-poaching operations contact (internal, restricted visibility)
- Gate/radio channels
- After-hours manager

**Template fields:** name, role, number(s), radio channel, call trigger, backup contact, last verified date, verifier initials.

---

## 5) Feature Scope

### 5.1 V1 (Must Have)
1. Mobile web app with offline-capable cached content
2. Fast universal search + filters
3. Structured species pages (mammals, birds, plants)
4. Safety protocols with do/don’t and escalation
5. Reserve rules module (per reserve profile)
6. Source citations + last-reviewed + confidence badge
7. “Verify on-site” flags where conditions are dynamic
8. Emergency contacts templates (editable by authorized role)
9. Quick guest snippet + ranger detail on each item
10. Admin-lite content update workflow (manual review + publish)

### 5.2 V1.5 / Later (Should Have)
- Multi-language snippets (e.g., English + local language support)
- Quiz/drill mode for ranger upskilling
- Audio mode (listen while driving between sightings)
- Image-assisted ID helper
- Usage analytics dashboard (top questions, content gaps)
- Push alerts for rule/protocol changes
- Deeper integration with weather and incident logs

### 5.3 Out of Scope (Now)
- Real-time vehicle telemetry
- Live guest chatbots
- Full medical decision support system
- Public-facing open encyclopedia

---

## 6) Suggested UI Wireframe Structure (Text)

## 6.1 Home / Search Screen
- Top: Search bar (“Ask anything: leopard, fever, speed limit…”)
- Row: Quick chips (Mammals, Birds, Plants, Safety, Rules, Emergency)
- Section: Recent items
- Section: Most asked this week
- Sticky button: **Emergency**

## 6.2 Search Results
- Result card:
  - Title + category icon
  - 1-line quick snippet
  - Confidence badge (High/Medium/Local Verify)
  - Last reviewed date
  - “Verify on-site” pill if applicable

## 6.3 Fact Detail Screen
- Header: Title + scientific name (if species)
- Block 1: **Quick guest answer** (large readable text)
- Block 2: Key takeaways (3–5 bullets)
- Block 3: Ranger detail (expandable)
- Block 4: Safety/etiquette notes (if relevant)
- Block 5: Sources + links + review metadata
- Footer actions: Save offline / Share internally / Report update needed

## 6.4 Safety Protocol Screen
- Banner: Risk level color code
- Step cards:
  1) Immediate action
  2) Do not do
  3) Escalate now if…
- Tap-to-call contacts
- Incident checklist

## 6.5 Reserve Rules Screen
- Reserve selector dropdown
- Rule cards grouped by: Driving, Sightings, Walking, Guest conduct, Restricted areas
- Each rule includes “effective date” + “verified by”

## 6.6 Toolkit Screen
- Emergency templates
- Verification checklist
- Phrase bank (guest-friendly)
- Offline status + last sync

---

## 7) Copy Style Guide

### 7.1 Voice Principles
- Accurate over dramatic
- Calm, clear, confident
- Respectful of wildlife, guests, and local communities
- No sensationalism, no speculative claims presented as fact

### 7.2 Ranger-Facing Copy
- Format: action-oriented, concise bullets
- Use operational verbs: “Check”, “Confirm”, “Escalate”, “Log”
- Clearly separate:
  - **Known fact**
  - **Local variable (verify on-site)**
  - **Safety-critical instruction**

**Example (Ranger-facing):**  
“Elephants may mock-charge when stressed. Keep engine ready, avoid blocking movement path, and increase distance. **Verify on-site**: current reserve distance protocol and radio instruction.”

### 7.3 Guest-Facing Snippets
- Short, engaging, educational
- Avoid jargon unless explained
- Include uncertainty honestly when relevant

**Example (Guest-facing):**  
“Leopards are mostly solitary and often active at dawn and dusk. If we keep a respectful distance and stay quiet, we may observe natural behavior for longer.”

### 7.4 Safety Copy Rules
- Start with immediate action
- Include one clear escalation trigger
- Add disclaimer where medical risk exists

**Example:**  
“Move patient to shade and begin cooling immediately. If confusion, collapse, or persistent vomiting occurs, treat as urgent heat illness and call emergency medical support now.”

### 7.5 Formatting Standards
- Reading level: plain language, short sentences
- One idea per bullet
- Highlight critical actions in bold
- Use consistent labels: **Quick Answer**, **Ranger Note**, **Verify On-Site**, **Source**, **Last Reviewed**

---

## Trust, Verification, and Governance (Operational Addendum)

### Content Trust Tiers
- **Tier A (High):** Official authorities, peer-reviewed or recognized institutions
- **Tier B (Medium):** Reputable NGOs/field references with strong track records
- **Tier C (Local):** Internal SOPs, local oral knowledge, reserve-specific updates

### Mandatory Verification Flags
Set `verify_on_site = true` for:
- Temporary rule changes
- Road/zone closures
- Active wildlife risk zones
- Emergency contact numbers not verified in last 30 days
- Weather-dependent access/safety decisions

### Review Cadence
- Safety + emergency contacts: monthly minimum
- Reserve rules: on every operations circular change; minimum monthly
- Species/ecology: quarterly
- Culture/community guidance: quarterly with local liaison input

---

## Implementation Notes (Practical for Daily Ranger Use)
- Offline-first caching for key modules (Safety, Reserve, Emergency, Top 200 species)
- High-contrast day mode for bright sunlight
- Large tap targets and minimal scrolling in emergency workflows
- Max 2 taps to emergency contacts
- Keep “Quick guest answer” visible without expansion
- Local admin can mark item “temporarily unverified” pending review

---

## Definition of Done for V1 Launch
- Core categories populated with vetted baseline content
- All entries show source + review date + confidence tier
- Reserve-specific profiles configured for target deployment sites
- Emergency templates filled and verified
- 5–10 rangers complete field pilot and confirm usability under drive conditions
- Feedback loop established for content corrections within 48 hours
