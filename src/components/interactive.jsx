import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function InteractiveParticles({ 
  count = 5000,
  baseColor = "#0067b8",
  hoverColor = "#4df0ff",
  size = 0.04,
  attractionStrength = 0.6, // How strongly particles react to cursor
  repulsionRadius = 6     // Area around cursor that repels particles
}) {
  const meshRef = useRef()
  const clock = useRef(new THREE.Clock())
  const mousePos = useRef(new THREE.Vector2(0, 0))
  const [hovered, setHovered] = useState(false)
  const { size: viewport } = useThree()

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mousePos.current.x = (event.clientX / viewport.width) * 2 - 1
      mousePos.current.y = -(event.clientY / viewport.height) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [viewport])

  // Create flower geometry with original positions stored
  const { geometry, originalPositions } = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const baseColorObj = new THREE.Color(baseColor)
    const hoverColorObj = new THREE.Color(hoverColor)
    
    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2
      const v = Math.random() * Math.PI * 2
      const r = 2 + 8 * Math.sin(3 * u) * Math.cos(8 * v)
      
      const x = r * Math.cos(u) * Math.cos(v)
      const y = r * Math.sin(u) * Math.cos(v)
      const z = r * Math.sin(v)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      // Store original positions for the "return to normal" effect
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      // Color variation - mix between base and hover color based on randomness
      const colorMix = Math.random() * 0.3
      colors[i * 3] = baseColorObj.r * (1 - colorMix) + hoverColorObj.r * colorMix
      colors[i * 3 + 1] = baseColorObj.g * (1 - colorMix) + hoverColorObj.g * colorMix
      colors[i * 3 + 2] = baseColorObj.b * (1 - colorMix) + hoverColorObj.b * colorMix

      sizes[i] = size * (0.8 + Math.random() * 0.4)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    return { geometry, originalPositions }
  }, [count, baseColor, hoverColor, size])

  // Animation loop with cursor interaction
  useFrame(({ camera }) => {
    if (!meshRef.current) return
    
    const time = clock.current.getElapsedTime()
    const positions = meshRef.current.geometry.attributes.position.array
    const mouseInWorld = new THREE.Vector3(mousePos.current.x, mousePos.current.y, 0)
    
    // Convert mouse position to 3D world coordinates
    mouseInWorld.unproject(camera)
    mouseInWorld.z = 0 // Flatten to a plane
    
    // Animate particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const particlePos = new THREE.Vector3(
        positions[i3],
        positions[i3 + 1],
        positions[i3 + 2]
      )
      
      // Calculate distance to mouse
      const distanceToMouse = particlePos.distanceTo(mouseInWorld)
      
      // Original position (for return force)
      const originalPos = new THREE.Vector3(
        originalPositions[i3],
        originalPositions[i3 + 1],
        originalPositions[i3 + 2]
      )
      
      // Gentle return to original position
      const returnForce = originalPos.clone().sub(particlePos).multiplyScalar(0.02)
      
      // Mouse interaction force
      let mouseForce = new THREE.Vector3()
      if (distanceToMouse < repulsionRadius) {
        // Repel particles near cursor
        mouseForce = particlePos.clone().sub(mouseInWorld).normalize()
        mouseForce.multiplyScalar((repulsionRadius - distanceToMouse) * attractionStrength)
      }
      
      // Combine forces
      const newPos = particlePos
        .add(returnForce)
        .add(mouseForce)
        .add(new THREE.Vector3(
          Math.sin(time + i) * 0.01,
          Math.cos(time + i * 0.3) * 0.01,
          Math.sin(time * 0.3 + i * 0.1) * 0.01
        ))
      
      // Update positions
      positions[i3] = newPos.x
      positions[i3 + 1] = newPos.y
      positions[i3 + 2] = newPos.z
    }
    
    // Mark positions as needing update
    meshRef.current.geometry.attributes.position.needsUpdate = true
    
    // Gentle rotation
    meshRef.current.rotation.x = time * 0.05
    meshRef.current.rotation.y = time * 0.1
  })

  return (
    <points 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        attach="material"
        size={size}
        sizeAttenuation={true}
        transparent
        opacity={hovered ? 0.9 : 0.7}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}






{/* <div className="particles-container">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <InteractiveParticles count={2000} />
            </Suspense>
          </Canvas>
        </div> */}




//         .particles-container {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
//   background: transparent;
// }