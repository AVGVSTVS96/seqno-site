import { Actions } from "../Actions.tsx"
import { Odometer } from "../Odometer.tsx"
import { run, type Box } from "./school.ts"

const pad = 12

function avoidRects(hero: HTMLElement): Array<Box> {
  const base = hero.getBoundingClientRect()
  return [...hero.querySelectorAll("[data-avoid]")].map((el) => {
    const r = el.getBoundingClientRect()
    return {
      x: r.left - base.left - pad,
      y: r.top - base.top - pad,
      w: r.width + pad * 2,
      h: r.height + pad * 2,
    }
  })
}

function colorsOf(hero: HTMLElement) {
  const style = getComputedStyle(hero)
  const read = (name: string) => style.getPropertyValue(name).trim()
  return { field: read("--field"), bullet: read("--bullet"), ink: read("--field-ink") }
}

const smooth = (x: number) => x * x * (3 - 2 * x)

function start(hero: HTMLElement | null) {
  const canvas = hero?.querySelector("canvas")
  const soft = hero?.querySelector<HTMLElement>(".word .soft")
  const crisp = hero?.querySelector<HTMLElement>(".word .crisp")
  if (!hero || !canvas || !soft || !crisp) return
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches
  let stop: (() => void) | null = null
  let cancelled = false
  void document.fonts.ready.then(() => {
    if (cancelled) return
    stop = run(canvas, hero, {
      still,
      avoid: () => avoidRects(hero),
      colors: () => colorsOf(hero),
      onFrame(order) {
        const focus = smooth(Math.min(1, Math.max(0, (order - 0.25) / 0.45)))
        soft.style.opacity = String(1 - focus)
        crisp.style.opacity = String(focus)
      },
    })
    hero.dataset.live = ""
  })
  return () => {
    cancelled = true
    stop?.()
  }
}

export function Hero() {
  return (
    <header className="hero field" ref={start}>
      <canvas aria-hidden="true" />
      <div className="bar" data-avoid>
        <span className="lockup" />
      </div>
      <div className="stack">
        <p className="label" data-avoid>
          <span>Work in progress</span>
          <Odometer />
        </p>
        <h1 className="word" data-avoid>
          <span className="soft" />
          <span className="crisp" />
          <span className="sr">seqno</span>
        </h1>
        <ul className="tagline outline" data-avoid>
          <li>
            A local-first outliner, rebuilt to be minimal, solid and clean.
            <ul>
              <li>It's early, so keep your real notes where they are for now.</li>
            </ul>
          </li>
        </ul>
        <div className="actions" data-avoid>
          <Actions />
          <p className="browser">
            <span data-for="chromium">
              Runs in Chrome and Edge. Your notes never leave your device.
            </span>
            <span data-for="other">
              seqno runs in Chrome and Edge for now. Open this page in one of them to try it.
            </span>
            <span data-for="ios">
              Try it on a computer for now, in Chrome or Edge. The iOS app comes later.
            </span>
          </p>
        </div>
      </div>
    </header>
  )
}
