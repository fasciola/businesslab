# Business Lab redesign: image and video requests

Paste each prompt into another image AI (ChatGPT image, Midjourney, Imagen, etc.). Work in ONE conversation per group, in the order listed, and say "same style, lighting and palette as the previous image" so the set stays consistent. Video clips are generated from the approved still images (Veo, Runway, Kling, Sora or similar).

**Hard rule for every image: NO text, letters, numbers, logos, flags or watermarks.** Headlines, cards and the wordmark are built in code. No recognisable real people's faces (use silhouettes, backs, hands or out-of-focus figures).

## What the Kahraman animations need, and what Business Lab uses them for

| Kahraman animation | Business Lab version | Assets needed |
|---|---|---|
| Hero: looping video, headline hides during close-ups, then the hero image shrinks into the centre of a three-up row on scroll | Dubai skyline hero, shrinking into a three-up row | A1 to A3 + V1 |
| Scroll-scrubbed "Tree to plate" film with text per shot | "Idea to licence" film in 4 shots (the 4-step process) | B1 to B4 + V2 |
| Sliding product showcase (dark set, plates glide, glass card) | Sliding "service showcase" (6 services as objects on a plinth) | C0 to C6 |
| Image cards with reveal and lift | Mainland / Free zone / Offshore cards, insight cards | D1 to D6 |
| Statement words light up, count-up numbers, text reveals | Pure code, no images | none |
| Film lightbox | Optional company film | E1 (optional) |

Total: 20 stills (A1-A3, B1-B4, C0-C6, D1-D6), 2 videos (plus mobile versions), 1 optional.

## Brand palette (use in every prompt)

Deep navy `#173142` / `#18384c`, warm orange `#e87029`, soft peach `#f6a06d`, cream `#fff3ec`, with gold sunlight accents. Mood: premium, calm, trustworthy corporate advisory in Dubai. Not touristy, not neon.

---

## Group A. Hero

### A1. `hero-main.jpg` (3:2 landscape, 2400 x 1600 or larger)
This is the video's first and last frame and also the poster/fallback. Keep the LEFT 45% calm and uncluttered (the headline goes there); put the interest on the right.

```
Photorealistic cinematic wide shot of the Dubai skyline at golden hour seen from a high modern
office terrace at dusk. Foreground right: a sleek dark-navy desk edge with a closed leather
portfolio, a fountain pen and a small brass desk lamp with a warm glow. Background: Dubai Creek
and Downtown towers fading into soft warm haze, no recognisable branding, no signage. Sky is a
gradient from deep navy at the top to peach and orange at the horizon. The left 45% of the frame is
smooth, low-detail haze and sky so text can sit on it. Shallow depth of field, gentle lens flare,
premium corporate-advert look, ultra detailed, 8K feel.
Palette: deep navy #173142, orange #e87029, peach #f6a06d, cream highlights.
NO text, no logos, no signage, no people.
```

### A2. `hero-side-left.jpg` (16:9, 1672 x 941)
```
Photorealistic detail of a modern Dubai business district street canyon at blue hour: glass towers
reflecting orange sunset light, a light-trail of cars far below, soft haze. Same palette and
lighting mood as the hero image. Composition keeps the main subject on the right third.
NO text, no logos, no signage, no people.
```

### A3. `hero-side-right.jpg` (4:5 portrait, 1200 x 1500)
```
Photorealistic close shot of two hands signing a document with a fountain pen on a navy desk,
a brass stamp and a small plant beside it, warm window light from the left, shallow depth of
field. Faces not visible, no readable text on the paper (blurred lines only). Same palette and
lighting mood as the hero image (navy, orange, peach, cream).
NO text, no logos.
```

### V1. `hero-desktop.mp4` + `hero-mobile.mp4` (generate from A1)
About 20 to 24 seconds. **The last frame must equal A1 so the loop is seamless.** Kahraman keeps the headline visible during the opening and closing shots and hides it during the close-ups, so we need a calm start and end.

```
Start from the supplied image. Cinematic slow sequence, no abrupt cuts:
0-3s   slow push-in on the skyline, lights beginning to twinkle, haze drifting. Left side stays calm.
3-8s   slow dolly across the desk: pen, portfolio, lamp glow, shallow depth of field.
8-14s  slow pan to the glass towers, golden light moving across the facades.
14-20s time-lapse feel: sky shifts from dusk orange to navy, city lights come on.
20-24s gently return to the exact opening framing of the supplied image (same composition).
Smooth camera motion, no text, no logos, no people, no flicker. 16:9, 1080p, 24fps.
```
For mobile, run the same prompt from a 9:16 start image (re-crop A1, or ask the AI to "extend to 9:16 portrait, keep the subject centred").
Please also send the first frame as `hero-desktop-poster.jpg` and `hero-mobile-poster.jpg`, and tell me the timestamps where the calm opening shot ends and the calm closing shot begins (default I use: hide the headline from 2.6s to 20.3s).

---

## Group B. Scroll-scrubbed film: "Idea to licence"

Four shots, one per process step (Consultation, Structure selection, Documents and approvals, Launch and support). All share one palette and camera language.

### B1 to B4. Keyframes (16:9, 1920 x 1080)
```
B1 Consultation: Over-the-shoulder view of a consultant and a client (backs/silhouettes only) at a
   glass meeting table, a tablet showing a blurred abstract map of the UAE, warm lamp light,
   Dubai skyline through the window.
B2 Structure selection: Top-down view of a navy desk with three physical scale-model blocks of
   different heights in orange, peach and cream representing three company structures, a hand
   moving one block into place, soft shadows.
B3 Documents and approvals: Close macro of a stack of neatly tied documents, a brass stamp
   pressing onto paper (the stamp is a plain abstract seal, NO readable text), warm directional light.
B4 Launch and support: Wide shot of a bright modern Dubai office reception, a glass door opening
   to a sunlit lobby, a framed licence on the wall shown only as a blurred cream rectangle,
   golden hour light.
Common: photorealistic, shallow depth of field, palette navy #173142 / orange #e87029 / peach
#f6a06d / cream, premium corporate look. NO text, no logos, no recognisable faces.
```

### V2. `idea-to-licence-desktop.mp4` + `idea-to-licence-mobile.mp4`
About 10 seconds, **4 shots joined with hard cuts**, one per keyframe above (roughly 0-1.8s, 1.8-3.6s, 3.6-6.5s, 6.5-10s). Tell me the exact cut times, because the scroll text swaps at each cut. Slow forward camera motion in each shot, no text, 16:9 1080p (plus a 9:16 version).
**Export tip:** for scroll scrubbing the file must be keyframe-dense. With ffmpeg: `ffmpeg -i in.mp4 -c:v libx264 -g 1 -crf 23 -an out.mp4`. If you don't have it, send the file as is and I will re-encode.
Also supply `idea-to-licence-poster.jpg` (frame 1).

---

## Group C. Sliding service showcase

Replaces Kahraman's product plates with six service "objects" sitting on one shared plinth in a dark Dubai-night set. The layers must share ONE plinth anchor, so do not crop or rescale them individually.

### C0. `showcase-bg.png` (3:2, 1536 x 1024), generate this first
```
Photorealistic, empty studio set for a premium corporate-services brand, no objects and NO TEXT,
no logos, no people. A dark matte stone floor in the lower third fading into a dark wall behind it.
Colour palette: deep navy-black around #0c1c27 mixed with charcoal, faint warm orange rim light
on the right, soft directional key light from the upper left, fine dust in the air, gentle vignette.
A few out-of-focus warm bokeh lights (Dubai skyline at night) far in the background on the right.
Keep the centre and upper-left calm. The floor horizon sits about 62% down the frame. Slight
elevated three-quarter camera. Cinematic, moody, high-end commercial photography, 8K look.
```

### C1 to C6. Transparent objects (1024 x 1024, PNG with transparent background)
Generate C1 first as the style anchor and approve it. Then repeat for the rest with: "Same round matte navy-black plinth, camera and lighting as the previous image."

```
Using the same dark set, lighting and mood as the background, create a product hero image: [OBJECT]
The object sits centred on a matte navy-black round plinth (identical in every image), plinth
diameter about 70% of the frame width, in the lower-middle of a SQUARE 1:1 frame with ~35% empty
space above. Camera: slightly elevated three-quarter view, ~25 degrees above eye level, 85mm look,
shallow depth of field. Warm orange rim light, cool navy fill. Transparent background (cutout),
no text anywhere.
```
Objects:
```
C1 Mainland licence: a polished miniature glass-and-brass Dubai tower beside a closed leather
   trade-licence folder (no readable text).
C2 Free zone: a miniature white-and-orange modern business-park building model with a tiny
   glowing ring of light around it marking the zone boundary.
C3 Offshore: a small brass-and-glass globe with a tiny sailboat and a locked brass key on the plinth.
C4 Banking: a stack of navy-and-orange blank bank cards and a brass vault key, a soft glowing coin
   motif (no numbers, no logos).
C5 Residency visa: an open dark-navy passport-style booklet (blank pages, NO text, NO emblems),
   a brass stamp and a small ink pad.
C6 Accounting and tax: a brass abacus-calculator hybrid beside a neat stack of cream ledgers and a
   fountain pen (no numbers).
```

---

## Group D. Content cards (replace the Unsplash hotlinks)

All 3:2, 1600 x 1067, same palette, photorealistic, NO text or logos, no recognisable faces.

```
D1 Mainland: Dubai Downtown tower district at sunrise seen from a street-level plaza, warm light,
   a few blurred pedestrians as silhouettes.
D2 Free Zone: modern low-rise business-park campus with palm-lined paths and glass offices at golden
   hour, calm and spacious.
D3 Offshore: aerial of a turquoise coastline with a lone marina and a sailing yacht at dawn, soft haze.
D4 Insight "Mainland or free zone": a navy desk with two diverging paths drawn as light trails on a
   scale map (no text), top-down, warm lamp.
D5 Insight "Documents to prepare": tidy flat-lay of a passport-style booklet (blank), pen, folder and
   laptop on a cream desk, soft window light.
D6 Insight "Planning your first year": bright co-working space in Dubai at morning, a whiteboard with
   only abstract diagram shapes (no letters), plants, golden light.
```

---

## Group E. Optional

### E1. `film-poster.jpg` (16:9, 1600 x 900) and `business-lab-film.mp4`
Only if you want the "Watch the film" lightbox. Poster: wide Dubai skyline at sunset, dramatic, calm left side. Film: any 60 to 130 second company video you already have.

---

## Delivery checklist

- Stills: PNG or high-quality JPG at the sizes above (I convert to WebP).
- Transparent PNGs for C1 to C6 (the AI must output real transparency; if it gives a white or black background, run it through a background remover).
- Videos: MP4 (H.264), plus WebM if available; keep each under about 8 MB if possible.
- Send me the cut times for V1 and V2.
- Put everything in `public/images/` and `public/videos/` using the file names above, and I will wire up the animations.

Note: all of this is AI-generated imagery. Kahraman keeps an "imagery is illustrative" note on the page, and I will do the same.
