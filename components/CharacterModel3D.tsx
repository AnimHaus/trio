'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface Props {
  src: string
  accentColor?: string
}

export default function CharacterModel3D({ src, accentColor = '#ffffff' }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 1.2, 4.5)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4)
    dirLight.position.set(2, 5, 3)
    dirLight.castShadow = true
    scene.add(dirLight)

    // Accent rim light
    const accentHex = parseInt(accentColor.replace('#', ''), 16)
    const rimLight = new THREE.PointLight(accentHex, 1.2, 12)
    rimLight.position.set(-2, 2, -3)
    scene.add(rimLight)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minPolarAngle = Math.PI / 6
    controls.maxPolarAngle = (Math.PI * 2) / 3
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.2
    controls.enablePan = false
    controls.enableZoom = false
    controls.target.set(0, 0.8, 0)

    // Load GLB
    const loader = new GLTFLoader()
    loader.load(src, (gltf) => {
      const model = gltf.scene

      // Center and scale model
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2.8 / maxDim
      model.scale.setScalar(scale)
      model.position.sub(center.multiplyScalar(scale))
      // Shift up slightly so the figure is vertically centered
      model.position.y += size.y * scale * 0.08

      scene.add(model)
      controls.target.set(0, size.y * scale * 0.3, 0)
      controls.update()
    })

    // Animation loop
    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize observer
    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    })
    ro.observe(mount)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(frameId)
      controls.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [src, accentColor])

  return <div ref={mountRef} className="w-full h-full" />
}
