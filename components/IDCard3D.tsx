'use client'

import { useEffect, useRef } from 'react'
import type { Character } from '@/lib/characters'

const CARD_W = 2.5
const CARD_H = 1.4
const CARD_D = 0.4

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace('#', '')
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]
}

function seededRng(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = (Math.imul(h, 16777619) >>> 0)
  }
  return () => {
    h ^= h << 13; h ^= h >> 7; h ^= h << 17
    return (h >>> 0) / 4294967296
  }
}

// ── Card silhouette ───────────────────────────────────────────────────────────
// Rounded outer corners (RC) + soft notch corners (R).
// Proportions derived from the reference artwork (448 × 231 source).
function cardClipPath(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const fx = (v: number) => (v / 448) * W
  const fy = (v: number) => (v / 231) * H
  const R  = Math.round(W * 0.016)  // notch corner radius (~14 px at W=860)
  const RC = Math.round(W * 0.052)  // outer corner radius (~45 px at W=860)
  const LX = fx(8),  RX = fx(432)
  const TY = fy(7),  BY = fy(221)

  ctx.beginPath()
  ctx.moveTo(LX + RC, TY)
  // top edge → notch step
  ctx.arcTo(fx(252), TY,      fx(278), fy(25), R)
  ctx.arcTo(fx(278), fy(25),  fx(368), fy(25), R)
  ctx.arcTo(fx(368), fy(25),  fx(398), TY,     R)
  ctx.arcTo(fx(398), TY,      RX,      TY,     R)
  // outer corners
  ctx.arcTo(RX, TY, RX, BY, RC)   // top-right
  ctx.arcTo(RX, BY, LX, BY, RC)   // bottom-right
  ctx.arcTo(LX, BY, LX, TY, RC)   // bottom-left
  ctx.arcTo(LX, TY, LX + RC, TY, RC) // top-left
  ctx.closePath()
}

// ── Saturn / orbit-stack icon ─────────────────────────────────────────────────
function drawSaturnStack(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, INK: string) {
  ctx.strokeStyle = INK; ctx.lineWidth = 1.3
  ctx.beginPath(); ctx.moveTo(x, y - r * 1.6); ctx.lineTo(x, y + r * 1.6); ctx.stroke()
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath()
    ctx.ellipse(x, y + i * r * 0.55, r, r * 0.62, 0, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.beginPath(); ctx.arc(x, y, r * 0.18, 0, Math.PI * 2); ctx.fillStyle = INK; ctx.fill()
}

// ── Hazard stripe swatches (filled / striped / faded variants) ──────────────
function drawHazardStripe(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  INK: string,
  variant: 'striped' | 'filled' | 'faded'
) {
  ctx.save()
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  if (variant === 'filled') {
    ctx.fillStyle = INK; ctx.fillRect(x, y, w, h)
  } else {
    const gap = h * 0.95
    ctx.strokeStyle = variant === 'faded' ? `${INK}55` : INK
    ctx.lineWidth = h * 0.42
    for (let sx = x - h * 2; sx < x + w + h * 2; sx += gap) {
      ctx.beginPath()
      ctx.moveTo(sx, y + h); ctx.lineTo(sx + h, y)
      ctx.stroke()
    }
  }
  ctx.restore()
  ctx.strokeStyle = INK; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h)
}

// ── Hurricane / spiral icon ───────────────────────────────────────────────────
function drawSwirl(ctx: CanvasRenderingContext2D, cx: number, cy: number, R: number, INK: string) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.fillStyle = INK
  const turns = 1.7 * Math.PI * 2
  const steps = 140
  const outerPath: [number, number][] = []
  const innerPath: [number, number][] = []
  const rOuterStart = R, rOuterEnd = R * 0.08
  const bandWidth = (t: number) => R * (0.34 - 0.27 * t)
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = -turns * t
    const r = rOuterStart + (rOuterEnd - rOuterStart) * t
    const bw = bandWidth(t)
    outerPath.push([Math.cos(a) * (r + bw / 2), Math.sin(a) * (r + bw / 2)])
    innerPath.push([Math.cos(a) * Math.max(r - bw / 2, 0), Math.sin(a) * Math.max(r - bw / 2, 0)])
  }
  ctx.beginPath()
  ctx.moveTo(outerPath[0][0], outerPath[0][1])
  for (const p of outerPath) ctx.lineTo(p[0], p[1])
  for (let i = innerPath.length - 1; i >= 0; i--) ctx.lineTo(innerPath[i][0], innerPath[i][1])
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

// ── Target / bullseye badge (filled disc + concentric accent rings) ─────────
function drawTargetBadge(ctx: CanvasRenderingContext2D, x: number, y: number, R: number, INK: string, accent: string) {
  ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fillStyle = INK; ctx.fill()
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath(); ctx.arc(x, y, R - i * (R / 4), 0, Math.PI * 2)
    ctx.strokeStyle = accent; ctx.lineWidth = 1.3; ctx.stroke()
  }
  ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fillStyle = accent; ctx.fill()
}

// ── 2x2 dot cluster (one filled) ─────────────────────────────────────────────
function drawDotCluster(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, gap: number, INK: string, filledIndex = 1) {
  const offsets: [number, number][] = [[-1, -1], [1, -1], [-1, 1], [1, 1]]
  offsets.forEach(([dx, dy], i) => {
    const px = cx + (dx * gap) / 2
    const py = cy + (dy * gap) / 2
    ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2)
    if (i === filledIndex) { ctx.fillStyle = INK; ctx.fill() }
    else { ctx.strokeStyle = INK; ctx.lineWidth = 1; ctx.stroke() }
  })
}

// ── Globe icon ────────────────────────────────────────────────────────────────
function drawGlobe(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, INK: string) {
  ctx.strokeStyle = INK; ctx.lineWidth = 1.2
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.4, 0, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.ellipse(x, y, r * 0.4, r, 0, 0, Math.PI * 2); ctx.stroke()
}

// ── Round glyph badges (—, pencil, i) ─────────────────────────────────────────
function drawGlyphBadge(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, glyph: string, INK: string, BG: string) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = INK; ctx.fill()
  ctx.fillStyle = BG
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if (glyph === 'dash') {
    ctx.fillRect(x - r * 0.42, y - 1.5, r * 0.84, 3)
  } else if (glyph === 'pencil') {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 4)
    ctx.fillRect(-r * 0.45, -2, r * 0.9, 4)
    ctx.restore()
  } else {
    ctx.font = `700 ${r}px Arial, sans-serif`
    ctx.fillText('i', x, y + 1)
  }
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
}

// ── Word-wrap helper ──────────────────────────────────────────────────────────
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y0: number, maxW: number, lh: number, maxL: number) {
  const words = text.split(' '); let line = '', y = y0, l = 0
  for (const w of words) {
    const t = line ? line + ' ' + w : w
    if (ctx.measureText(t).width > maxW && line) {
      ctx.fillText(line, x, y); line = w; y += lh; l++
      if (l >= maxL) { ctx.fillText(line + '…', x, y); return }
    } else line = t
  }
  if (line) ctx.fillText(line, x, y)
}

// ────────────────────────────────────────────────────────────────────────────────
// FRONT CANVAS
// ────────────────────────────────────────────────────────────────────────────────
function buildFront(char: Character): HTMLCanvasElement {
  const W = 860, H = 500
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  const rng = seededRng(char.id)
  const ac = char.accentColor
  const INK = '#0C0C0C'
  const INK_M = 'rgba(12,12,12,0.55)'

  ctx.clearRect(0, 0, W, H)
  cardClipPath(ctx, W, H); ctx.fillStyle = ac; ctx.fill()
  ctx.save(); cardClipPath(ctx, W, H); ctx.clip()

  // Flat matte fill — no gradient. Very fine, low-contrast dot texture only.
  for (let gx = 14; gx < W; gx += 22)
    for (let gy = 14; gy < H; gy += 22) {
      ctx.fillStyle = 'rgba(0,0,0,0.035)'
      ctx.beginPath(); ctx.arc(gx, gy, 0.7, 0, Math.PI * 2); ctx.fill()
    }

  // ── Top label strip ──────────────────────────────────────────────────────
  ctx.font = '600 13px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText(`[${char.class}]`, 70, 35)
  ctx.fillText(`[${char.studentId}]`, W * 0.29, 35)
  ctx.textAlign = 'right'; ctx.fillText(char.year.toUpperCase(), W - 175, 35); ctx.textAlign = 'left'

  // ── Wordmark (character name, big block letters) ────────────────────────
  ctx.font = '900 64px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText(char.name.toUpperCase(), 38, 145)

  // small caption block, upper-center
  ctx.font = '7px Arial, sans-serif'; ctx.fillStyle = INK
  wrapText(ctx, char.bio, 410, 100, 150, 9, 2)

  // body paragraph under wordmark
  ctx.font = '13px Arial, sans-serif'; ctx.fillStyle = INK
  wrapText(ctx, char.bio, 38, 192, 540, 17, 2)

  // ── Center column: saturn icon + label ──────────────────────────────────
  drawSaturnStack(ctx, 472, 165, 38, INK)
  ctx.font = '700 13px Arial, sans-serif'; ctx.fillStyle = INK; ctx.textAlign = 'center'
  ctx.fillText(char.role.toUpperCase(), 472, 235); ctx.textAlign = 'left'

  // hazard stripe stack
  const hsX = 565, hsW = 110, hsH = 20, hsGap = 8
  drawHazardStripe(ctx, hsX, 90, hsW, hsH, INK, 'striped')
  drawHazardStripe(ctx, hsX, 90 + (hsH + hsGap), hsW, hsH, INK, 'faded')
  drawHazardStripe(ctx, hsX, 90 + 2 * (hsH + hsGap), hsW, hsH, INK, 'filled')
  drawHazardStripe(ctx, hsX, 90 + 3 * (hsH + hsGap), hsW, hsH, INK, 'striped')

  // HEADLINE block, upper-right
  ctx.font = '700 16px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText('HEADLINE', 700, 100)
  ctx.font = '10px Arial, sans-serif'
  wrapText(ctx, char.bio, 700, 125, 150, 15, 3)

  // ── personal space / class tagline ──────────────────────────────────────
  ctx.font = '400 40px "Century Gothic", Futura, Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText(char.role.toLowerCase(), 38, 322)

  // ring icon, bottom-left
  ctx.strokeStyle = INK; ctx.lineWidth = 6
  ctx.beginPath(); ctx.arc(70, 375, 28, 0.2 * Math.PI, 1.9 * Math.PI); ctx.stroke()
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.arc(70, 375, 28, 0, Math.PI * 2); ctx.stroke()

  // three glyph badges
  drawGlyphBadge(ctx, 150, 375, 18, 'dash', INK, ac)
  drawGlyphBadge(ctx, 200, 375, 18, 'pencil', INK, ac)
  drawGlyphBadge(ctx, 250, 375, 18, 'info', INK, ac)

  // HEADLINE caption, bottom-left
  ctx.font = '700 13px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText('HEADLINE', 132, 415)
  ctx.font = '8px Arial, sans-serif'
  wrapText(ctx, char.bio, 132, 428, 240, 10, 1)

  // ── Center swirl emblem ─────────────────────────────────────────────────
  drawSwirl(ctx, 480, 360, 70, INK)

  // vertical tick divider, mid-right
  ctx.strokeStyle = INK; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(605, 290); ctx.lineTo(605, 330); ctx.stroke()

  // globe + dot
  drawGlobe(ctx, 700, 280, 22, INK)
  ctx.beginPath(); ctx.arc(770, 282, 7, 0, Math.PI * 2); ctx.fillStyle = INK; ctx.fill()

  // target badge + dot cluster
  drawTargetBadge(ctx, 695, 362, 40, INK, ac)
  drawDotCluster(ctx, 775, 362, 9, 24, INK, 1)

  // bottom-right fine print
  ctx.font = '7px Arial, sans-serif'; ctx.fillStyle = INK
  wrapText(ctx, `${char.studentId} ${char.height} ${char.age}`, 700, 420, 140, 10, 3)

  // Noise grain (kept extremely subtle to preserve matte look)
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = `rgba(0,0,0,${rng() * 0.035})`
    ctx.fillRect(rng() * W, rng() * H, 1, 1)
  }

  ctx.restore()
  return cv
}

// ────────────────────────────────────────────────────────────────────────────────
// BACK CANVAS
// ────────────────────────────────────────────────────────────────────────────────
function buildBack(char: Character): HTMLCanvasElement {
  const W = 860, H = 500
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  const rng = seededRng(char.id + '-back')
  const ac = char.accentColor
  const INK = '#0C0C0C'
  const INK_M = 'rgba(12,12,12,0.45)'

  ctx.clearRect(0, 0, W, H)
  cardClipPath(ctx, W, H); ctx.fillStyle = ac; ctx.fill()
  ctx.save(); cardClipPath(ctx, W, H); ctx.clip()

  for (let gx = 14; gx < W; gx += 22)
    for (let gy = 14; gy < H; gy += 22) {
      ctx.fillStyle = 'rgba(0,0,0,0.035)'
      ctx.beginPath(); ctx.arc(gx, gy, 0.7, 0, Math.PI * 2); ctx.fill()
    }

  // Diagonal watermark
  ctx.save(); ctx.globalAlpha = 0.05
  ctx.translate(W / 2, H / 2); ctx.rotate(-0.18)
  ctx.fillStyle = INK
  ctx.font = '900 120px Arial, sans-serif'
  ctx.textAlign = 'center'; ctx.fillText(char.name.toUpperCase(), 0, 40)
  ctx.restore()

  // Left column icons
  const LX = 44
  drawSaturnStack(ctx, LX + 28, 148, 26, INK)
  drawSwirl(ctx, LX + 28, 260, 36, INK)
  drawTargetBadge(ctx, LX + 28, 360, 32, INK, ac)

  // Center info block
  const CX = 178
  ctx.strokeStyle = INK_M; ctx.lineWidth = 1; ctx.setLineDash([5, 5])
  ctx.beginPath(); ctx.moveTo(CX - 10, 100); ctx.lineTo(CX - 10, H - 30); ctx.stroke()
  ctx.setLineDash([])

  ctx.font = '700 12px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText('PERSONAL CARD', CX, 122)
  ctx.strokeStyle = INK; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(CX, 128); ctx.lineTo(CX + 280, 128); ctx.stroke()

  ctx.font = '900 26px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText(char.name.toUpperCase(), CX, 166)
  ctx.font = '700 11px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText(char.role.toUpperCase(), CX, 186)
  ctx.strokeStyle = INK; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(CX, 194); ctx.lineTo(CX + 280, 194); ctx.stroke()

  const details: [string, string][] = [
    ['Class', char.class], ['Year', char.year],
    ['Age', `${char.age}`], ['Height', char.height], ['ID', char.studentId],
  ]
  details.forEach(([lbl, val], i) => {
    const dy = 214 + i * 22
    ctx.font = '9px Arial, sans-serif'; ctx.fillStyle = INK_M; ctx.fillText(`${lbl}:`, CX, dy)
    ctx.font = '700 10px Arial, sans-serif'; ctx.fillStyle = INK; ctx.fillText(val, CX + 56, dy)
  })

  // Right column
  const RX = 562
  ctx.strokeStyle = INK_M; ctx.lineWidth = 1; ctx.setLineDash([5, 5])
  ctx.beginPath(); ctx.moveTo(RX - 10, 100); ctx.lineTo(RX - 10, H - 30); ctx.stroke()
  ctx.setLineDash([])

  drawGlobe(ctx, RX + 24, 130, 22, INK)
  drawDotCluster(ctx, RX + 100, 132, 9, 24, INK, 1)
  drawTargetBadge(ctx, RX + 24, 240, 34, INK, ac)
  drawDotCluster(ctx, RX + 100, 240, 9, 24, INK, 1)

  ctx.font = '700 9px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText('CULPA QUI OFFICIA', RX, 320)
  ctx.font = '8px Arial, sans-serif'
  wrapText(ctx, char.bio, RX, 334, 240, 11, 3)

  ctx.textAlign = 'right'
  ctx.font = '700 10px Arial, sans-serif'; ctx.fillStyle = INK
  ctx.fillText(`[${char.year}]`, W - 36, H - 26)
  ctx.fillText('[ PROPERTY OF TRIO ACADEMY ]', W - 36, H - 12)
  ctx.textAlign = 'left'

  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = `rgba(0,0,0,${rng() * 0.035})`
    ctx.fillRect(rng() * W, rng() * H, 1, 1)
  }

  ctx.restore()
  return cv
}

export interface IDCard3DProps {
  character: Character
  active: boolean
}

export default function IDCard3D({ character, active }: IDCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let mounted = true
    let rafId: number

    import('three').then((THREE) => {
      if (!mounted || !container) return

      const W = container.clientWidth
      const H = container.clientHeight
      if (W === 0 || H === 0) return

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      // Flat tone mapping keeps the matte fill from blowing out into a
      // glossy highlight under the key light.
      renderer.toneMapping = THREE.NoToneMapping
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 50)
      camera.position.z = 2.7

      const frontTex = new THREE.CanvasTexture(buildFront(character))
      const backTex = new THREE.CanvasTexture(buildBack(character))
      frontTex.colorSpace = THREE.SRGBColorSpace
      backTex.colorSpace = THREE.SRGBColorSpace

      const geo = new THREE.BoxGeometry(CARD_W, CARD_H, CARD_D)
      const [er, eg, eb] = hexToRgb(character.accentColor)
      const edgeHex =
        (Math.round(er * 0.5) << 16) | (Math.round(eg * 0.5) << 8) | Math.round(eb * 0.5)
      const edgeColor = new THREE.Color(edgeHex)

      // Fully matte, paper-like material: no metalness, max roughness, no
      // specular highlight or env reflection contribution.
      const matteEdge = () =>
        new THREE.MeshStandardMaterial({
          color: edgeColor,
          roughness: 1,
          metalness: 0,
          transparent: true,
          opacity: 0.92,
        })

      const mats = [
        matteEdge(),
        matteEdge(),
        matteEdge(),
        matteEdge(),
        new THREE.MeshStandardMaterial({
          map: frontTex,
          roughness: 1,
          metalness: 0,
          transparent: true,
          alphaTest: 0.04,
        }),
        new THREE.MeshStandardMaterial({
          map: backTex,
          roughness: 1,
          metalness: 0,
          transparent: true,
          alphaTest: 0.04,
        }),
      ]

      const card = new THREE.Mesh(geo, mats)
      scene.add(card)

      // Soft, even lighting — mostly ambient/hemisphere so the matte
      // surface reads as flat color rather than picking up a glossy hot
      // spot from a strong directional light.
      scene.add(new THREE.AmbientLight(0xffffff, 1.6))
      scene.add(new THREE.HemisphereLight(0xffffff, 0xcccccc, 0.6))
      const key = new THREE.DirectionalLight(0xffffff, 0.35)
      key.position.set(1, 2, 4); scene.add(key)
      const fill = new THREE.DirectionalLight(0xffffff, 0.2)
      fill.position.set(-2, -1, 2); scene.add(fill)

      const onMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      container.addEventListener('mousemove', onMove)

      let t = 0
      const animate = () => {
        if (!mounted) return
        rafId = requestAnimationFrame(animate)
        t += 0.01
        const tY = activeRef.current ? mouseRef.current.x * 0.38 : 0
        const tX = activeRef.current ? mouseRef.current.y * 0.2 : 0
        card.rotation.y += (tY - card.rotation.y) * 0.06
        card.rotation.x += (tX - card.rotation.x) * 0.06
        card.position.y = Math.sin(t) * 0.022
        renderer.render(scene, camera)
      }
      animate()

      const dispose = () => {
        mounted = false
        cancelAnimationFrame(rafId)
        container.removeEventListener('mousemove', onMove)
        mats.forEach((m) => m.dispose())
        geo.dispose(); frontTex.dispose(); backTex.dispose()
        renderer.dispose()
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      }
      ;(container as HTMLDivElement & { _d?: () => void })._d = dispose
    })

    return () => {
      mounted = false
      cancelAnimationFrame(rafId)
      const d = (container as HTMLDivElement & { _d?: () => void })._d
      if (d) d()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.id])

  return <div ref={containerRef} className="w-full h-full" style={{ cursor: active ? 'default' : 'pointer' }} />
}