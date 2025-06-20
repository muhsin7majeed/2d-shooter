import { PlayerJetTypeInterface } from '../types/player';

export const PLAYER_JETS: PlayerJetTypeInterface[] = [
  {
    name: 'player_jet_1',
    speed: 5,
    scale: 1,
    acceleration: 0.2,
  },
] as const;
