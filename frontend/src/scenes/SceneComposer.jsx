import { useRef } from "react";
import { useParallax } from "../hooks/useParallax.js";

// Biomes
import OceanBiome from "./biomes/OceanBiome.jsx";
import MountainBiome from "./biomes/MountainBiome.jsx";
import DesertBiome from "./biomes/DesertBiome.jsx";
import ForestBiome from "./biomes/ForestBiome.jsx";
import SpaceBiome from "./biomes/SpaceBiome.jsx";
import CityBiome from "./biomes/CityBiome.jsx";
import SnowBiome from "./biomes/SnowBiome.jsx";
import BeachBiome from "./biomes/BeachBiome.jsx";
import PlainsBiome from "./biomes/PlainsBiome.jsx";
import InteriorBiome from "./biomes/InteriorBiome.jsx";

// Nature
import TreePine from "./parts/nature/TreePine.jsx";
import TreePalm from "./parts/nature/TreePalm.jsx";
import TreeDead from "./parts/nature/TreeDead.jsx";
import TreeSakura from "./parts/nature/TreeSakura.jsx";
import Rock from "./parts/nature/Rock.jsx";
import Mountain from "./parts/nature/Mountain.jsx";
import Cactus from "./parts/nature/Cactus.jsx";
import Bush from "./parts/nature/Bush.jsx";

// Structures
import Castle from "./parts/structures/Castle.jsx";
import HousePink from "./parts/structures/HousePink.jsx";
import TempleAsia from "./parts/structures/TempleAsia.jsx";
import Pyramid from "./parts/structures/Pyramid.jsx";
import Windmill from "./parts/structures/Windmill.jsx";
import Cabin from "./parts/structures/Cabin.jsx";
import Skyscraper from "./parts/structures/Skyscraper.jsx";
import Spaceship from "./parts/structures/Spaceship.jsx";
import Longship from "./parts/structures/Longship.jsx";

// Sky
import Cloud from "./parts/sky/Cloud.jsx";
import Bird from "./parts/sky/Bird.jsx";
import Star from "./parts/sky/Star.jsx";
import Planet from "./parts/sky/Planet.jsx";
import Moon from "./parts/sky/Moon.jsx";
import Sun from "./parts/sky/Sun.jsx";
import Aurora from "./parts/sky/Aurora.jsx";

// Water
import Waves from "./parts/water/Waves.jsx";
import Ship from "./parts/water/Ship.jsx";
import Fish from "./parts/water/Fish.jsx";

// Items
import TreasureChest from "./parts/items/TreasureChest.jsx";
import Lantern from "./parts/items/Lantern.jsx";
import Sword from "./parts/items/Sword.jsx";
import Banner from "./parts/items/Banner.jsx";
import Crystal from "./parts/items/Crystal.jsx";

// Layers FX
import ParticlesLayer from "./layers/ParticlesLayer.jsx";
import AmbientLayer from "./layers/AmbientLayer.jsx";

const BIOMES = {
  ocean: OceanBiome,
  mountain: MountainBiome,
  desert: DesertBiome,
  forest: ForestBiome,
  space: SpaceBiome,
  city: CityBiome,
  snow: SnowBiome,
  beach: BeachBiome,
  plains: PlainsBiome,
  interior: InteriorBiome,
};

const PARTS = {
  // nature
  tree_pine: TreePine,
  tree_palm: TreePalm,
  tree_dead: TreeDead,
  tree_sakura: TreeSakura,
  rock: Rock,
  mountain: Mountain,
  cactus: Cactus,
  bush: Bush,
  // structures
  castle: Castle,
  house_pink: HousePink,
  temple_asia: TempleAsia,
  pyramid: Pyramid,
  windmill: Windmill,
  cabin: Cabin,
  skyscraper: Skyscraper,
  spaceship: Spaceship,
  longship: Longship,
  // sky
  clouds: Cloud,
  birds: Bird,
  stars: Star,
  planets: Planet,
  moon: Moon,
  sun: Sun,
  aurora: Aurora,
  // water
  waves: Waves,
  ship: Ship,
  fish: Fish,
  // items
  treasure_chest: TreasureChest,
  lantern: Lantern,
  sword: Sword,
  banner: Banner,
  crystal: Crystal,
};

export default function SceneComposer({ config }) {
  const rootRef = useRef(null);

  useParallax(rootRef, [
    { selector: ".layer-sky",       factor: 15 },
    { selector: ".layer-mid",       factor: 45 },
    { selector: ".layer-fore",      factor: 80 },
    { selector: ".layer-particles", factor: 100 },
  ]);

  const Biome = BIOMES[config.biome] || BIOMES.plains;

  const renderElement = (el, i) => {
    const Comp = PARTS[el.type];
    if (!Comp) return null;
    const position = el.position || "spread";
    const scale = el.scale || 1;
    return (
      <div
        key={`${el.type}-${i}`}
        className={`pos-${position}`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: position.includes("bottom") ? "bottom center" : "center",
        }}
      >
        <Comp palette={config.palette} intensity={config.intensity} />
      </div>
    );
  };

  return (
    <div ref={rootRef} className="scene">
      <Biome
        palette={config.palette}
        timeOfDay={config.timeOfDay}
        weather={config.weather}
        intensity={config.intensity}
      />

      <div className="layer layer-sky">
        {config.skyElements?.map((el, i) => {
          if (typeof el === "string") {
            const Comp = PARTS[el];
            return Comp ? <Comp key={i} palette={config.palette} /> : null;
          }
          return renderElement(el, i);
        })}
      </div>

      <div className="layer layer-mid">
        {config.midgroundElements?.map(renderElement)}
      </div>

      <div className="layer layer-fore">
        {config.foregroundElements?.map(renderElement)}
      </div>

      <div className="layer layer-particles">
        <ParticlesLayer
          type={config.particles}
          palette={config.palette}
          intensity={config.intensity}
        />
      </div>

      <div className="layer layer-ambient">
        <AmbientLayer type={config.ambient} palette={config.palette} />
      </div>

      <div className="scene-overlay-text" />
    </div>
  );
}