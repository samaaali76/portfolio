# Portfolio — 3D Hero Experience

## What I built

An interactive 3D robot in the hero section, built in Spline and embedded
via `<spline-viewer>`. The robot tracks the visitor's mouse movement in
real time. On mobile or when the OS has "reduce motion" turned on, a
lightweight static fallback is shown instead of the 3D scene.

## Performance note

The Spline viewer script (`@splinetool/viewer`) is not loaded until the
hero section actually scrolls into view, using an `IntersectionObserver`
instead of loading it eagerly with the page. It's also skipped entirely
on screens under 960px wide and when `prefers-reduced-motion: reduce` is
set, so mobile visitors never download the 3D runtime at all — they see
a small static panel instead. This keeps the initial page load light
regardless of device.

## What I'd add with more time

- A real screenshot of the robot as the mobile/reduced-motion fallback
  image, instead of the plain gradient panel
- Compress the Spline scene itself (fewer polygons / draco-compressed
  meshes) so it could be safely enabled on mobile too, instead of
  falling back entirely
- Measure actual Lighthouse performance scores before/after the lazy
  loading change and report the numbers here