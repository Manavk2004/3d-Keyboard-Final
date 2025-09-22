
"use client"

import { FC, useCallback, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/bounded";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";


export const KEYCAP_TEXTURES = [
  {
    id: "goodwell",
    name: "Goodwell",
    path: "/goodwell_uv.png",
    knobColor: "#E44E21",
  },
  {
    id: "dreamboard",
    name: "Dreamboard",
    path: "/dreamboard_uv.png",
    knobColor: "#E9759F",
  },
  {
    id: "cherrynavy",
    name: "Cherry Navy",
    path: "/cherrynavy_uv.png",
    knobColor: "#F06B7E",
  },
  { id: "kick", 
    name: "Kick", 
    path: "/kick_uv.png", 
    knobColor: "#FD0A0A" },
  {
    id: "oldschool",
    name: "Old School",
    path: "/oldschool_uv.png",
    knobColor: "#B89D82",
  },
  {
    id: "candykeys",
    name: "Candy Keys",
    path: "/candykeys_uv.png",
    knobColor: "#F38785",
  },
];

type KeyCapTexture = (typeof KEYCAP_TEXTURES)[number]

/**
 * Props for `Colorchanger`.
 */
export type ColorchangerProps = SliceComponentProps<Content.ColorchangerSlice>;

/**
 * Component for "Colorchanger" Slices.
 */
const Colorchanger: FC<ColorchangerProps> = ({ slice }) => {

  const [selectedTextureId, setSelectedTextureId] = useState(KEYCAP_TEXTURES[0].id)
  const [backgroundText, setBackgroundText] = useState(KEYCAP_TEXTURES[0].name)
  const [isAnimating, setIsAnimating] = useState(false)


  function handleTextureSelect(texture: KeyCapTexture){
   if (texture.id === selectedTextureId || isAnimating) return 

    setIsAnimating(true)
    setSelectedTextureId(texture.id)

  }

  const handleAnimationComplete = useCallback( () => {
    setIsAnimating(false)
  }, [])


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex h-[90vh] min-h-[1000px] flex-col overflow-hidden bg-linear-to-br from-[#0f172a] to-[#062f4a] text-white"
    >
      <Canvas
        camera={{position: [0, .5, .5], fov:45, zoom:1.5}}
        className="-mb-[10vh] grow" 
        id="keycap-changer"
      >
        <Scene  selectedTextureId={selectedTextureId} onAnimationComplete={handleAnimationComplete}/>
      </Canvas>
      <Bounded className="relative shrink-0" innerClassName="gap-6 lg:gap-8 flex flex-col lg:flex-row">
        <div className="max-w-md shrink-0">
          <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
            <PrismicText field={slice.primary.heading} />
          </h2>
          <div className="text-pretty lg:text-lg">
            <PrismicRichText field={slice.primary.des} />
          </div>
        </div>
        <ul className="grid grow grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-black shadow-lg sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
          {KEYCAP_TEXTURES.map((texture) => (
            <li key={texture.id}>
              <button
              disabled={isAnimating} 
              onClick={(() => handleTextureSelect(texture))}
              className={clsx(
                "flex aspect-square flex-col items-center justify-center rounded-lg border-2 p-4 hover:scale-105 motion-safe:transition-all motion-safe:duration-300",
                selectedTextureId === texture.id ? 'border-[#81bfed] bg-[#81bfed]/20' : 'cursor-pointer border-gray-300 hover:border-gray-500',
                isAnimating && 'cursor-not-allowed opacity-50')}
              >
                <div className="mb-3 overflow-hidden rounded border-2 border-black bg-gray-100">
                  <img 
                    src={texture.path} 
                    alt={texture.name} 
                    width={400} 
                    height={255}
                    className="h-full w-full object.cover"
                    />
                </div>  
                <span className="text-center text-sm font-semibold">
                  {texture.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Bounded>

    </section>
  );
};

export default Colorchanger;
