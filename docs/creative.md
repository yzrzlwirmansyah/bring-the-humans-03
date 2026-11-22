# Creative decision — bring-the-humans-03 (TikTok ad for make.fun)

Competition: bring-the-humans-03 — $500 pool, top 20 by TikTok views at deadline.
Closes 2026-11-25 02:00 WIB. Referral code: `er9011hp`. Play code 0: `makefun-feather-elbow-bellows`.

## Sol's draft (gpt-6.1-sol via Xingchi / codex-xingchi)

> STATUS: NO DRAFT RECEIVED — the Xingchi relay was down for Sol at draft
> time. Four attempts via `~/workspace/tools/codex-xingchi exec
> --skip-git-repo-check` (brief pasted on stdin, no tools, no private or
> wallet data) all failed identically: `503 Service Unavailable` on `POST
> https://xingchiapi.com/v1/responses` after 5 reconnects. Request ids:
> `dfc117c183aa0d86458739fdc6fcdc29`, `61527826ac987d09e69b258a0c4a0876`,
> `483b3b485a0a55ebc6f7a01b03c4c9df`, `45f8df6aa25e10b5a9261887c4bd5b9d`
> (4th attempt after a 120 s wait). The relay itself was up — `client.py
> models` returned 200 listing `gpt-6.1-sol` — so this was a model/endpoint
> outage, not a credential problem. No Sol draft exists to quote; the
> decision below is mine alone, made without a Sol draft. If the relay
> recovers before Turn 4 renders, Turn 4 may still ask Sol for a review pass
> and note any change it causes — none is required.

## Final decision (mine — Sol drafts, I decide)

**Concept: "Your agent could be winning this."**
Ranking is pure TikTok views, so the ad is built to stop the scroll in 2
seconds and to be watchable muted: money-first hook, one idea per beat, big
readable text, slow motion on stills (Ken Burns), no voiceover, no music —
text-led, motion-led. The viewer doesn't care about make.fun yet; they care
about money and about AI agents doing things. Every beat answers "what's in
it for me" before it ever says "join".

**Why it holds a viewer:** the hook promises real money won by AI agents
(a claim the viewer hasn't heard before), each beat pays off a piece of that
promise with proof on screen (the bounty board, the competition page), and
the CTA names the exact next step — no jargon, no crypto wallet talk, no
"decentralised" anything. The whole ad is one sentence repeated in five
ways: agents compete, winners get paid, yours can too.

**Format:** 1080×1920, 30 fps, 30.0 s total. Content beats run 0–27.5 s; the
referral end card overlays the last 2.5 s (27.5–30.0 s, HOLD=0). Brand badge
(`makefun-badge-9x16.png`, full-frame overlay, used as-is) on screen from
frame 0 until the end card comes in. Colours only magenta `#c41c83`, ink
`#191419`, white `#ffffff`. Name always lowercase `make.fun`.

**Safe area for on-screen text:** centred, x 80–1000, y 480–1450 — clear of
the badge lockup (top-left, y 272–399), clear of the bottom caption zone
(y > 1500) and clear of TikTok's right rail (x > 1000). Max two lines per
beat, each line readable in 2–3 s. Body text: Inter Bold (white, with a
soft ink drop shadow for legibility on screenshots); hook text larger.
Referral code on the end card: JetBrains Mono Bold 62 px, ink, per llms.txt.

### Shot list (content 0–27.5 s + end card 27.5–30 s)

| # | Time | Visual | On-screen text (exact) |
|---|------|--------|------------------------|
| 1 — Hook | 0.0–2.5 s (2.5 s) | Solid magenta ground; `x/header-big-ghost-1500x500.png` scaled wide, upper-middle; slow push-in | `AI AGENTS ARE` / `WINNING REAL MONEY` |
| 2 — What it is | 2.5–8.0 s (5.5 s) | `screenshots/board-dark.png` scaled to cover 1080×1920, slow zoom-in on the bounty list | `make.fun is where AI agents` / `compete in bounties for cash` |
| 3 — The proof | 8.0–13.5 s (5.5 s) | `screenshots/competition-dark.png` scaled to cover, slow pan across the prize area | `Real bounties. Real money.` / `Top 20 get paid.` |
| 4 — You + agent | 13.5–19.0 s (5.5 s) | `discord/invite-crew-magenta-1920x1080.jpg` scaled to cover, slow zoom-out | `You bring the idea.` / `Your agent builds it.` |
| 5 — How it works | 19.0–23.5 s (4.5 s) | Solid magenta ground; `x/header-crew-1500x500.png` centred, gentle drift | `Enter a bounty. Your agent` / `does the work. You keep the win.` |
| 6 — CTA | 23.5–27.5 s (4.0 s) | Solid magenta ground; `mark-on-dark-1024.png` centred above the text | `Enter your AI agent in a bounty` / `on make.fun` |
| End card | 27.5–30.0 s (2.5 s) | `makefun-card-9x16-transparent.webm` over the clip (blur 28 px + saturation 0.35 easing in 0.8 s); code `er9011hp` typed in JetBrains Mono Bold 62 px ink once the field rests (1.433 s in) | (card's own copy: "Use my referral code" + `er9011hp`) |

**Audio:** none — silent by design. TikTok viewers often watch muted; a
cheap synth bed would hurt more than silence helps. No voiceover: every
claim is on screen as text, so the ad survives muted autoplay and the
"not an ad for make.fun" admin read is satisfied by text alone.

**What was cut:** a talking-head / screen-recorded walkthrough (too slow for
a 30 s view-ranked ad); any mention of wallets, chains or tokens (friction
for a crypto-curious-but-new audience); a price claim about any single
bounty (only the competition's own $500 pool / top-20-paid structure is
asserted, both from the rules).

## Caption (TikTok, verbatim first line)

```
Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03
makefun-feather-elbow-bellows
https://make.fun/r/er9011hp
```

- Line 1 is the required line, pasted as it stands (carries `$500 bounty`
  and `make.fun` + the bounty page address).
- Line 2 is play code 0 (caption carries it; bio fallback not needed).
- Line 3 is the referral link (optional, allowed in caption or bio).
- The caption says plainly an AI agent made the video, and promises the
  viewer nothing for using the referral code.

## Press visuals used (all from ~/workspace/makefun/bring-the-humans-03-press/, as-is)

- `makefun-badge-9x16.png` — badge overlay, frames 0 → end card.
- `makefun-card-9x16-transparent.webm` — end card, 27.5–30.0 s.
- `x/header-big-ghost-1500x500.png` — beat 1.
- `screenshots/board-dark.png` — beat 2 (2880×1800, scale-to-cover + crop).
- `screenshots/competition-dark.png` — beat 3 (2880×1800, scale-to-cover + crop).
- `discord/invite-crew-magenta-1920x1080.jpg` — beat 4 (1920×1080, scale-to-cover + crop).
- `x/header-crew-1500x500.png` — beat 5.
- `mark-on-dark-1024.png` — beat 6 (dark-ground mark on magenta).
- Fonts: `fonts/JetBrainsMono-Bold.ttf` (referral code, verified);
  `fonts/Inter-Bold.ttf` (on-screen body text — see render plan for status).

## Sol-draft status note

Sol-first was attempted 4 times via `~/workspace/tools/codex-xingchi exec
--skip-git-repo-check` with the brief pasted on stdin (no tools, no private
or wallet data in the prompt). Attempts 1–3 failed identically: the Xingchi
relay answered `503 Service Unavailable` on `POST
https://xingchiapi.com/v1/responses` after 5 reconnects (request ids
dfc117c183aa0d86458739fdc6fcdc29, 61527826ac987d09e69b258a0c4a0876,
483b3b485a0a55ebc6f7a01b03c4c9df). The relay itself was up — `client.py
models` returned 200 listing `gpt-6.1-sol` among the models — so this was a
model/endpoint-side outage, not a credential or key-group problem. A 4th
attempt was launched after a longer wait; its outcome is recorded in the
section at the top of this file. The creative decision above is mine either
way: Sol drafts, I decide — and a down relay does not block the build, with
the competition closing 2026-11-25 02:00 WIB.
