# 🚀 Game Development Roadmap - Infinite Wave Shooter (React + PixiJS)

## 🧠 Game Idea Summary
- **2D fixed-screen shooter**
- Player stands at the bottom, auto-firing upwards
- Enemies fly slowly from the top toward the player
- Waves of enemies, with boss fights every 5 waves
- Passive upgrades offered after each wave
- Active power-ups fall randomly; player can hold 2 and activate manually
- Infinite waves, difficulty ramps up over time
- Game ends when player's HP reaches 0

---

## 🛠 Tech Stack
- **React** – UI and component logic
- **PixiJS** – Canvas rendering and sprites
- **JavaScript (ES6+)**
- **Vite** – Project bundler and dev server


## 🧱 Development Milestones

### ✅ 1. Project Setup
- [x] Initialize Vite + React + PixiJS
- [x] Render basic canvas
- [ ] Add debug text or FPS counter

---

### 🧍‍♂️ 2. Player Setup
- [ ] Create \`Player\` class: position, HP, gun
- [ ] Auto-fire bullets upward
- [ ] Player sprite or colored box

---

### 👾 3. Enemy System
- [ ] Create \`Enemy\` class: position, HP, speed
- [ ] Spawn from top, move toward player
- [ ] Collision with bullet = damage
- [ ] Collision with player = explosion + damage

---

### 🔫 4. Bullets
- [ ] Create bullets that travel upward
- [ ] Auto-fire interval logic
- [ ] Collision detection with enemies

---

### 🌊 5. Wave Logic
- [ ] Track kills per wave
- [ ] Spawn next wave on completion
- [ ] Increase enemy HP/speed per wave
- [ ] Boss every 5 waves (shoots projectiles)

---

### 🎁 6. Passive Upgrade System
- [ ] After each wave, show 3 random upgrade options:
  - Weapon upgrades (fire rate, bullet size)
  - Defense (HP, shield)
  - Special (piercing bullets, freeze aura, etc.)
- [ ] Implement upgrade stacking logic

---

### ⚡ 7. Active Power-Ups
- [ ] Buffs fall randomly from sky
- [ ] Player can collect up to 2
- [ ] Click to activate:
  - Enemy wipe
  - Temporary invincibility
  - Firestorm, etc.
- [ ] Buff queue with icons in UI

---

### 🧠 8. Game Management
- [ ] Track game state: playing, game over, pause
- [ ] Show HP, wave count, score
- [ ] Game over screen and restart

---

### 🪄 9. Polish Phase
- [ ] Add sounds and simple music
- [ ] Animate sprites with PixiJS
- [ ] Visual effects: explosions, damage flashes
- [ ] Add UI: health bar, upgrade menu, buffs

---

## 📦 Assets Checklist
- [ ] Player sprite
- [ ] Bullet sprite
- [ ] Enemy sprites (basic + boss)
- [ ] Background image
- [ ] Explosion effect
- [ ] Buff icons
- [ ] UI components (HP bar, buttons)

Sources:
- https://kenney.nl/assets
- https://itch.io/game-assets
- https://opengameart.org/

---

## 🔥 Stretch Goals (Optional)
- [ ] Player movement (dodge mechanic)
- [ ] Different enemy types with behaviors
- [ ] Power-up chaining or combos
- [ ] Achievements or unlockable upgrades
- [ ] Touch controls for mobile
- [ ] LocalStorage save system

---
