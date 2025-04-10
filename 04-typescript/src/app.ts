import { findHeroById } from "./services/hero.service";



const hero = findHeroById(5)

console.log(hero?.name ?? 'Hero not found');
