import { Character } from '../character';
import { CharacterSize } from '../character-size.enum';
import { MkItem } from '../mk-item';
import { Vehicle } from '../vehicle';
import { VehicleType } from '../vehicle-type.enum';
import { ALL_GAMES, MK7, MK8, MK8D, MK8_DELUXE } from '../game-version.util';

const S = CharacterSize.Small;
const M = CharacterSize.Medium;
const L = CharacterSize.Large;
const Mi = CharacterSize.Mii;

export const CHARACTERS: Character[] = [
  // MK7 roster (shared icons with later games where applicable)
  { size: S, name: 'Toad', image: '32px-MK8_Toad_Icon.png', games: MK7 | MK8_DELUXE },
  { size: S, name: 'Koopa', image: '32px-MK8_Koopa_Icon.png', games: MK7 | MK8_DELUXE },
  { size: S, name: 'Shy Guy', image: '32px-MK8_ShyGuy_Icon.png', games: MK7 | MK8_DELUXE },
  { size: S, name: 'Lakitu', image: '32px-MK8_Lakitu_Icon.png', games: MK7 | MK8_DELUXE },
  { size: S, name: 'Toadette', image: '32px-MK8_Toadette_Icon.png', games: MK7 | MK8_DELUXE },
  { size: M, name: 'Mario', image: '32px-MK8_Mario_Icon.png', games: MK7 | MK8_DELUXE },
  { size: M, name: 'Luigi', image: '32px-MK8_Luigi_Icon.png', games: MK7 | MK8_DELUXE },
  { size: M, name: 'Peach', image: '32px-MK8_Peach_Icon.png', games: MK7 | MK8_DELUXE },
  { size: M, name: 'Daisy', image: '32px-MK8_Daisy_Icon.png', games: MK7 | MK8_DELUXE },
  { size: M, name: 'Yoshi', image: '32px-MK8_Yoshi_Icon.png', games: MK7 | MK8_DELUXE },
  { size: M, name: 'Metal Mario', image: '32px-MK8_MMario_Icon.png', games: MK7 | MK8_DELUXE },
  { size: L, name: 'Wario', image: '32px-MK8_Wario_Icon.png', games: MK7 | MK8_DELUXE },
  { size: L, name: 'Waluigi', image: '32px-MK8_Waluigi_Icon.png', games: MK7 | MK8_DELUXE },
  { size: L, name: 'Rosalina', image: '32px-MK8_Rosalina_Icon.png', games: MK7 | MK8_DELUXE },
  { size: L, name: 'Bowser', image: '32px-MK8_Bowser_Icon.png', games: MK7 | MK8_DELUXE },
  { size: L, name: 'Donkey Kong', image: '32px-MK8_DKong_Icon.png', games: MK7 | MK8_DELUXE },
  { size: S | Mi, name: 'Mii (Small)', image: '32px-Mii_MK8.png', games: MK7 | MK8_DELUXE },
  { size: M | Mi, name: 'Mii (Medium)', image: '32px-Mii_MK8.png', games: MK7 | MK8_DELUXE },
  { size: L | Mi, name: 'Mii (Large)', image: '32px-Mii_MK8.png', games: MK7 | MK8_DELUXE },
  // Mario Kart 8 additions
  { size: S, name: 'Baby Mario', image: '32px-MK8_BabyMario_Icon.png', games: MK8_DELUXE },
  { size: S, name: 'Baby Luigi', image: '32px-MK8_BabyLuigi_Icon.png', games: MK8_DELUXE },
  { size: S, name: 'Baby Peach', image: '32px-MK8_BabyPeach_Icon.png', games: MK8_DELUXE },
  { size: S, name: 'Baby Daisy', image: '32px-MK8_BabyDaisy_Icon.png', games: MK8_DELUXE },
  { size: S, name: 'Baby Rosalina', image: '32px-MK8_BabyRosalina_Icon.png', games: MK8_DELUXE },
  { size: S, name: 'Lemmy', image: '32px-MK8_Lemmy_Icon.png', games: MK8_DELUXE },
  { size: S, name: 'Larry', image: '32px-MK8_Larry_Icon.png', games: MK8_DELUXE },
  { size: S, name: 'Wendy', image: '32px-MK8_Wendy_Icon.png', games: MK8_DELUXE },
  { size: M, name: 'Iggy', image: '32px-MK8_Iggy_Icon.png', games: MK8_DELUXE },
  { size: M, name: 'Ludwig', image: '32px-MK8_Ludwig_Icon.png', games: MK8_DELUXE },
  { size: M, name: 'Tanooki Mario', image: '32px-MK8_Tanooki_Mario_Icon.png', games: MK8_DELUXE },
  { size: M, name: 'Cat Peach', image: '32px-MK8_Cat_Peach_Icon.png', games: MK8_DELUXE },
  { size: M, name: 'Pink Gold Peach', image: '32px-MK8_PGPeach_Icon.png', games: MK8_DELUXE },
  { size: L, name: 'Roy', image: '32px-MK8_Roy_Icon.png', games: MK8_DELUXE },
  { size: L, name: 'Morton', image: '32px-MK8_Morton_Icon.png', games: MK8_DELUXE },
  { size: L, name: 'Dry Bowser', image: '32px-MK8_Dry_Bowser_Icon.png', games: MK8_DELUXE },
  { size: M, name: 'Villager', image: '50px-MK8_Villager_Icon.png', games: MK8_DELUXE },
  { size: S, name: 'Isabelle', image: '32px-MK8_Isabelle_Icon.png', games: MK8_DELUXE },
  { size: L, name: 'Link', image: '32px-MK8_Link_Icon.png', games: MK8_DELUXE },
];

export const VEHICLES: Vehicle[] = [
  // MK7 karts & bikes (MK8 artwork as stand-in)
  { type: VehicleType.Kart, name: 'Standard Kart', image: '100px-StandardKartBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Pipe Frame', image: '100px-PipeFrameBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Mach 8', image: '100px-Mach8BodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Steel Driver', image: '100px-Steel_Driver.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Circuit Special', image: '100px-CircuitSpecialBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Tri-Speeder', image: '100px-TrispeederBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Badwagon', image: '100px-BadwagonBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Prancer', image: '100px-PrancerBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Biddybuggy', image: '100px-BiddybuggyBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Landship', image: '100px-LandshipBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Sneeker', image: '100px-SneakerBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Sports Coupe', image: '100px-SportsCoupeMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Gold Standard', image: '100px-Gold_Standard.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Standard Bike', image: '100px-StandardBikeBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Comet', image: '100px-CometBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Sport Bike', image: '100px-SportBikeBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'The Duke', image: '100px-TheDukeBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Flame Rider', image: '100px-FlameRiderBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Varmint', image: '100px-VarmintBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Mr. Scooty', image: '100px-MrScootyBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Jet Bike', image: '100px-JetBikeBodyMK8.png', games: MK7 | MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Yoshi Bike', image: '100px-YoshiBikeBodyMK8.png', games: MK7 | MK8_DELUXE },
  // Mario Kart 8 additions
  { type: VehicleType.Kart, name: 'Cat Cruiser', image: '100px-CatCruiserBodyMK8.png', games: MK8_DELUXE },
  { type: VehicleType.Kart, name: 'GLA', image: '100px-GLA-MK8.png', games: MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Silver Arrow', image: '100px-W25SilverArrow-MK8.png', games: MK8_DELUXE },
  { type: VehicleType.Kart, name: '300 SL Roadster', image: '100px-300SLRoadster-MK8.png', games: MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Blue Falcon', image: '100px-MK8BlueFalcon.png', games: MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Tanooki Kart', image: '100px-Tanooki-Buggy.png', games: MK8_DELUXE },
  { type: VehicleType.Kart, name: 'B Dasher', image: '100px-ZeldaMK8Bdasher.png', games: MK8_DELUXE },
  { type: VehicleType.Kart, name: 'Streetle', image: '100px-MK8Streetle.png', games: MK8_DELUXE },
  { type: VehicleType.Kart, name: 'P-Wing', image: '100px-MK8PWing.png', games: MK8_DELUXE },
  { type: VehicleType.Bike, name: 'Master Cycle', image: '100px-MK8MasterCycle.png', games: MK8_DELUXE },
  { type: VehicleType.Bike, name: 'City Tripper', image: '100px-MK8CityTripper.png', games: MK8_DELUXE },
  { type: VehicleType.ATV, name: 'Standard ATV', image: '100px-StandardATVBodyMK8.png', games: MK8_DELUXE },
  { type: VehicleType.ATV, name: 'Wild Wiggler', image: '100px-WildWigglerBodyMK8.png', games: MK8_DELUXE },
  { type: VehicleType.ATV, name: 'Teddy Buggy', image: '100px-TeddyBuggyBodyMK8.png', games: MK8_DELUXE },
  { type: VehicleType.ATV, name: 'Bone Rattler', image: '100px-MK8BoneRattler.png', games: MK8_DELUXE },
];

/** Tire catalog per https://www.mariowiki.com/Tire */
export const WHEELS: MkItem[] = [
  // MK7 & MK8 / Deluxe shared
  { name: 'Standard', image: '100px-StandardTiresMK8.png', games: ALL_GAMES },
  { name: 'Gold', image: '100px-Gold_Tires_MK8.png', games: ALL_GAMES },
  { name: 'Roller', image: '100px-RollerTiresMK8.png', games: ALL_GAMES },
  { name: 'Slim', image: '100px-SlimTiresMK8.png', games: ALL_GAMES },
  { name: 'Slick', image: '100px-SlickTiresMK8.png', games: ALL_GAMES },
  { name: 'Sponge', image: '100px-SpongeTiresMK8.png', games: ALL_GAMES },
  { name: 'Wood', image: '100px-WoodTiresMK8.png', games: ALL_GAMES },
  { name: 'Monster', image: '100px-MonsterTiresMK8.png', games: ALL_GAMES },
  // MK7 only
  { name: 'Mushroom', image: '100px-MK7_Mushroom_Wheels.png', games: MK7 },
  { name: 'Red Monster', image: '100px-MK7_Red_Monster.png', games: MK7 },
  // MK8 / Deluxe additions (not in MK7)
  { name: 'Metal', image: '100px-MetalTiresMK8.png', games: MK8_DELUXE },
  { name: 'Button', image: '100px-ButtonTiresMK8.png', games: MK8_DELUXE },
  { name: 'Off-Road', image: '100px-Off-Road.png', games: MK8_DELUXE },
  { name: 'Cushion', image: '100px-CushionTiresMK8.png', games: MK8_DELUXE },
  { name: 'Blue Standard', image: '100px-Blue_Standard.png', games: MK8_DELUXE },
  { name: 'Hot Monster', image: '100px-HotMonsterTiresMK8.png', games: MK8_DELUXE },
  { name: 'Azure Roller', image: '100px-AzureRollerTiresMK8.png', games: MK8_DELUXE },
  { name: 'Crimson Slim', image: '100px-CrimsonSlimTiresMK8.png', games: MK8_DELUXE },
  { name: 'Cyber Slick', image: '100px-CyberSlickTiresMK8.png', games: MK8_DELUXE },
  { name: 'Retro Off-Road', image: '100px-Retro_Off-Road.png', games: MK8_DELUXE },
  { name: 'GLA Tires', image: '100px-GLATires-MK8.png', games: MK8_DELUXE },
  { name: 'Triforce Tires', image: 'MK8-TriforceTires.png', games: MK8_DELUXE },
  { name: 'Leaf Tires', image: '100px-Leaf_Tires_MK8.png', games: MK8_DELUXE },
  // MK8 Deluxe only
  { name: 'Ancient', image: '100px-MK8D_Ancient_Tires.png', games: MK8D },
];

export const GLIDERS: MkItem[] = [
  // MK7 gliders
  { name: 'Super Glider', image: 'SuperGliderMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Parafoil', image: 'ParafoilGliderMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Flower Glider', image: 'FlowerGliderMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Gold Glider', image: 'GoldGliderMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Peach Parasol', image: 'PeachParasolGliderMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Parachute', image: 'ParachuteGliderMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Cloud Glider', image: 'Cloud_Glider.png', games: MK7 | MK8_DELUXE },
  { name: 'Wario Wing', image: 'WarioWingMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Bowser Kite', image: 'BowserKiteMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Plane Glider', image: 'PlaneGliderMK8.png', games: MK7 | MK8_DELUXE },
  { name: 'Paper Glider', image: 'PaperGliderIconMK8.png', games: MK7 | MK8_DELUXE },
  // MK8 additions
  { name: 'Waddle Wing', image: 'WaddleWingMK8.png', games: MK8_DELUXE },
  { name: 'MKTV Parafoil', image: 'MKTVParafoilGliderMK8.png', games: MK8_DELUXE },
  { name: 'Hylian Kite', image: 'MK8-HylianKite.png', games: MK8_DELUXE },
];
