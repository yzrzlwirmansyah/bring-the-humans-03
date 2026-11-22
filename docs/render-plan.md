# Render plan — bring-the-humans-03 (Turn 4 build)

Creative decision: `docs/creative.md`. This file is the exact build spec for
Turn 4. Do NOT render in this turn; Turn 4 renders, checks frames, and hands
the file over for TikTok posting. Do NOT submit anything.

## Constants

```
PRESS=~/workspace/makefun/bring-the-humans-03-press
BUILD=~/workspace/makefun/bring-the-humans-03-build   # OUTSIDE the repo; keeps the submitted snapshot clean
REPO=~/workspace/makefun/bring-the-humans-03
W=1080  H=1920  FPS=30
D=30.0            # total clip length (s)
LEN=2.5           # end-card length (s)
REST=1.433        # card rests this far into the card (s)
HOLD=0            # card overlays the last 2.5 s of the clip (no held frame)
T=27.5            # card start: T = D + HOLD - LEN
CODE=er9011hp
FONT_CODE=$PRESS/fonts/JetBrainsMono-Bold.ttf   # referral code, 62 px, ink #191419
FONT_BODY=$PRESS/fonts/Inter-Bold.ttf           # on-screen text
MAGENTA=0xc41c83  INK=0x191419  WHITE=white
BADGE=$PRESS/makefun-badge-9x16.png             # full-frame 1080x1920 overlay, used as-is
CARD=$PRESS/makefun-card-9x16-transparent.webm  # VP9+alpha, 1080x1920, 60 fps, 2.5 s
```

Fonts verified Turn 2 (fc-scan + ffmpeg drawtext test renders):
- `JetBrainsMono-Bold.ttf` — "JetBrains Mono | Bold", sha256
  `5590990c82e097397517f275f430af4546e1c45cff408bde4255dad142479dcb`
  (from official JetBrains CDN zip `JetBrainsMono-2.304.zip`, SIL OFL).
  GitHub raw + jsDelivr both 403'd from this VM; download.jetbrains.com worked.
- `Inter-Bold.ttf` — "Inter | Bold", sha256
  `288316099b1e0a47a4716d159098005eef7c0066921f34e3200393dbdb01947f`
  (from `rsms/inter` release `Inter-4.1.zip`, `extras/ttf/Inter-Bold.ttf`).
- Fallback if a font file is ever missing at render time: STOP and re-download
  from the same official sources. Do NOT silently substitute another font for
  the referral code (llms.txt requires JetBrains Mono Bold or Inter Bold, ink).
  For body text only, installed DejaVu Sans Bold is the last-resort fallback,
  and the substitution must be noted in the Turn 4 report.

## Segment build (each beat rendered separately, then concatenated)

Render each beat as its own 1080×1920, 30 fps, yuv420p clip with NO audio,
then concat. Filenames: `$BUILD/seg1.mp4` … `$BUILD/seg6.mp4`.
Common text style (drawtext): `fontfile=$FONT_BODY:fontcolor=white:
shadowcolor=0x191419:shadowx=4:shadowy=4` (shadow keeps white text legible
over screenshots). Text is centred (`x=(w-text_w)/2`), inside the safe area
(x 80–1000, y 480–1450). Fade each text line in over 0.25 s at its beat start
(`fade=t=in:st=<beat_start>:d=0.25:alpha=1` on the drawtext via enable, or
`drawtext` + separate `fade` on the video — simplest: enable the drawtext
only inside the beat and add `fade=t=in:st=...:d=0.25:alpha=1` after the
overlay chain for the whole segment).

### Beat 1 — Hook, 0.0–2.5 s
- Base: `color=c=0xc41c83:s=1080x1920:d=2.5`, 30 fps.
- Overlay `$PRESS/x/header-big-ghost-1500x500.png`, scaled to width 1080
  (`scale=1080:-2`), centred at y≈560, slow push-in: pre-scale to 1180 wide
  and animate with `zoompan` OR static (still acceptable — keep the zoom only
  if it stays smooth; verify on frames).
- Text (110 px, two lines, centred, y≈950 / y≈1080):
  `AI AGENTS ARE` / `WINNING REAL MONEY`

### Beat 2 — What it is, 2.5–8.0 s (5.5 s)
- Visual: `$PRESS/screenshots/board-dark.png` (2880×1800).
  Scale-to-cover then slow zoom-in on the bounty list:
  `scale=3072:1920` (height 1920), then `crop=1080:1920:x='(in_w-1080)*0.30':y=0`
  with a slow zoom via `zoompan=z='min(zoom+0.0008,1.12)':d=165:s=1080x1920:fps=30`
  applied AFTER the crop (zoompan needs a single-image input — feed it one
  frame with `-loop 1 -t 5.5`, or use `scale` + animated `crop` x instead).
  Simpler robust route: `scale=3456:2160,crop=1080:1920:x='(in_w-1080)*(0.30+0.10*t/5.5)':y='(in_h-1920)*0.15'`
  — a slow rightward pan; verify the bounty list stays in frame.
- Text (68 px, two lines, centred, y≈600 / y≈700 — upper-middle so the list
  shows below; if the crop puts list text there, move to y≈1250/1350 after
  looking at a frame):
  `make.fun is where AI agents` / `compete in bounties for cash`

### Beat 3 — The proof, 8.0–13.5 s (5.5 s)
- Visual: `$PRESS/screenshots/competition-dark.png` (2880×1800), same
  scale-to-cover treatment, pan in the opposite direction
  (`x='(in_w-1080)*(0.70-0.10*t/5.5)'`) so the motion alternates.
- Text (68 px, two lines, centred, y≈600 / y≈700, adjust after frame check):
  `Real bounties. Real money.` / `Top 20 get paid.`

### Beat 4 — You + agent, 13.5–19.0 s (5.5 s)
- Visual: `$PRESS/discord/invite-crew-magenta-1920x1080.jpg` (1920×1080).
  Scale-to-cover: `scale=1080:1920:force_original_aspect_ratio=increase,
  crop=1080:1920` (covers; horizontal crop keeps the crew centred), slow
  zoom-out: start scale 1200 wide → 1080 over the beat (implement with
  `zoompan` on a looped single frame, or animated `crop` w/h — verify).
- Text (68 px, two lines, centred, y≈1250 / y≈1350 — lower-middle, the crew
  art fills the upper frame; adjust after frame check):
  `You bring the idea.` / `Your agent builds it.`

### Beat 5 — How it works, 19.0–23.5 s (4.5 s)
- Base: solid magenta `color=c=0xc41c83:s=1080x1920:d=4.5`.
- Overlay `$PRESS/x/header-crew-1500x500.png`, scaled to width 980,
  centred (x≈50, y≈560), gentle drift (`x='50+10*sin(t*0.5)'` — keep subtle).
- Text (68 px, two lines, centred, y≈1050 / y≈1150):
  `Enter a bounty. Your agent` / `does the work. You keep the win.`

### Beat 6 — CTA, 23.5–27.5 s (4.0 s)
- Base: solid magenta, 4.0 s.
- Overlay `$PRESS/mark-on-dark-1024.png` (dark-ground mark on magenta),
  scaled to 420×420, centred (x≈330, y≈520).
- Text (72 px, two lines, centred, y≈1050 / y≈1160):
  `Enter your AI agent in a bounty` / `on make.fun`

## Assembly

1. Concat the six segments (same size/fps/codec — use the concat demuxer
   with `-c copy` if all segments share exact parameters, else a
   `filter_complex concat` re-encode):
   `ffmpeg -f concat -safe 0 -i $BUILD/concat.txt -c copy $BUILD/ad-nocard.mp4`
   then `ffprobe` duration — must read 27.5 s.
2. Badge overlay from frame 0 until the end card: overlay `$BADGE` over the
   concatenated clip for the whole 0–27.5 s (`overlay` with
   `enable='lt(t,27.5)'`, or overlay then trim — badge must be visible on
   the VERY FIRST frame; verify with a frame grab at t=0).
   Order: badge first, then end-card pass (the card covers the badge in the
   last 2.5 s, which the rules allow: badge runs "until the end card comes in").
3. End-card pass — the llms.txt recipe verbatim, adapted (HOLD=0, T=27.5):

```sh
CLIP=$BUILD/ad-nocard.mp4   # 27.5 s, badge already on, no audio
CODE=er9011hp
FONT=$PRESS/fonts/JetBrainsMono-Bold.ttf
CARD=$PRESS/makefun-card-9x16-transparent.webm
W=1080 H=1920 LEN=2.5 REST=1.433 CX=210 CY=1232 CW=5 CH=78 MID=1271 SIZE=62
HOLD=0
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CLIP")
T=$(awk "BEGIN{print $D+$HOLD-$LEN}")   # expect 25.0 — card starts 2.5 s before the 27.5 s clip ends
ffmpeg -i "$CLIP" -c:v libvpx-vp9 -i "$CARD" -filter_complex "
[0:v]scale=$W:$H:force_original_aspect_ratio=increase,crop=$W:$H,setsar=1,fps=60,tpad=stop_mode=clone:stop_duration=$HOLD,format=yuva420p,split[clip][soft];
[soft]gblur=sigma=28,eq=saturation=0.35,fade=t=in:st=$T:d=0.8:alpha=1[soft];
[clip][soft]overlay[bg];
[1:v]format=yuva420p,setpts=PTS-STARTPTS+$T/TB[card];
[bg][card]overlay=eof_action=pass,
drawbox=x=$CX-2:y=$CY-2:w=$CW+4:h=$CH+4:color=white:t=fill:enable='gte(t,$T+$REST)',
drawtext=fontfile=$FONT:text=$CODE:fontsize=$SIZE:fontcolor=0x191419:x=$CX:y=$MID-(ascent-descent)/2:enable='gte(t,$T+$REST)'[v]" \
  -map '[v]' -map '0:a?' -c:v libx264 -pix_fmt yuv420p -crf 18 -c:a aac -movflags +faststart $BUILD/ad-final.mp4
```

   NOTE on the T arithmetic: the clip entering this pass is 27.5 s (content
   only), so T = 27.5 + 0 − 2.5 = 25.0. The card therefore starts at 25.0 s
   of the 27.5 s clip and the final file is 27.5 s long — NOT 30 s. The
   "30.0 s" in creative.md counts the card as if it were appended; with
   HOLD=0 the card overlays the last 2.5 s, so the true final duration is
   **27.5 s**. That is the correct reading of llms.txt (HOLD=0 lays the card
   over the last seconds of the clip). If a 30.0 s file is wanted instead,
   use HOLD=2.5 (clip's last frame held 2.5 s under the card) — decision for
   Turn 4: keep HOLD=0 and a 27.5 s final (simpler, matches the recipe's
   default; content beats already end on the CTA at 27.5 s). Either way,
   record the final duration in the Turn 4 report.
   Also note the recipe upscales to fps=60 (card is 60 fps) — fine.

4. Audio: none. Output has no audio stream (`-map '0:a?'` maps nothing).
   TikTok accepts silent video.

## Turn 4 verification checklist (do not skip)

- [ ] `ffprobe` final duration: 27.5 s (HOLD=0) — record exact value.
- [ ] Frame at t=0: badge lockup visible top-left, hook text present.
- [ ] Frames at t≈1, 5, 11, 16, 21, 25: each beat's text fully inside frame,
      no clipping at right/bottom edges, no text colliding with the badge.
- [ ] Frame at t≈26.5 (card mid-build): magenta wash + blur visible.
- [ ] Last frame (`ffmpeg -sseof -0.1`): code `er9011hp` sits inside the white
      field, left of the copy button, caret covered (no blinking caret beside
      the code); check the field region pixels, not just eyeballing.
- [ ] No segment is black/empty; Ken Burns motion is smooth (no zoompan jitter).
- [ ] Final file: `$BUILD/ad-final.mp4`, H.264 yuv420p, 1080×1920, faststart.
- [ ] Keep the six segments + concat list + final in `$BUILD/`; copy NOTHING
      into the repo (repo stays: LICENSE, docs/, main.ts, VIDEO.json — written
      in-session by the agent for the transcript gate).

## Handoff to Turn 5 (post + submit)

- Final file: `$BUILD/ad-final.mp4` (+ this plan + `docs/creative.md`).
- Caption (verbatim): see `docs/creative.md` — line 1 required, line 2 play
  code `makefun-feather-elbow-bellows`, line 3 `https://make.fun/r/er9011hp`.
- Post publicly on TikTok from a public account, in TikTok's own app/site
  (no unaudited API post — TikTok makes those private), keep it public and
  US-viewable until results are out, then put the full
  `https://www.tiktok.com/@<handle>/video/<id>` URL in the repo's VIDEO.json.
