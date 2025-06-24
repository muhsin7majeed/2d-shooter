import { PlayerJetTypeInterface } from '../types/player';

export const PLAYER_JETS: PlayerJetTypeInterface[] = [
  {
    name: 'player_jet_1',
    speed: 6,
    scale: 1,
    acceleration: 0.1,
    health: 100,
  },
] as const;
