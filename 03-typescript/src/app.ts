import { findHeroById } from './services/hero.service';

const myHero = findHeroById(1);
console.log(myHero?.name ?? 'Hero not found');
