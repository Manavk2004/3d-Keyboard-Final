import * as THREE from "three";
import { Float, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type KeycapProps = {
    position?: [number, number, number];
    rotation?: [number, number, number];
    floatSeed?: number;
    texture?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ;
}

type GLTFResult = GLTF & {
  nodes: {
    Keycap: THREE.Mesh;
  };
  materials: Record<string, unknown>;
};

export function Keycap({ position=[0,0,0], rotation=[0,0,0], floatSeed=0, texture = 0 }: KeycapProps) {

    const group = useRef<THREE.Group>(null!)

    const textures = [
        "/keycap_uv-1.png",
        "/keycap_uv-2.png",
        "/keycap_uv-3.png",
        "/keycap_uv-4.png",
        "/keycap_uv-5.png",
        "/keycap_uv-6.png",
        "/keycap_uv-7.png",
        "/keycap_uv-8.png",
        "/keycap_uv-9.png"
    ]

    const uvTexture = textures[texture]

    const keycapTexture = useTexture(uvTexture)
    keycapTexture.flipY = false;
    keycapTexture.colorSpace = THREE.SRGBColorSpace

    useFrame(() => {
        if(group.current){
            group.current.rotation.x += floatSeed
            group.current.rotation.y += floatSeed
        }
    })

  const { nodes } = useGLTF("/keycap.gltf") as unknown as GLTFResult;

  const placeholderMat = new THREE.MeshStandardMaterial({
    map: keycapTexture,
    roughness: 0.7,
  });

  return (
    <Float rotationIntensity={1} floatIntensity={1}>
        <group ref={group} dispose={null} position={position} rotation={rotation}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Keycap.geometry}
                material={placeholderMat}
                rotation={[Math.PI / 2, 0, 0]}
                scale={10}
            />
        </group>
    </Float>
  );
}
