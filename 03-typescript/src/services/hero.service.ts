import { heroes } from '../heroes';

export const findHeroById = (id: number) => heroes.find((hero) => hero.id === id);
