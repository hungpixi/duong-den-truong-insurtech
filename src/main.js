import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { MainMenuScene } from './scenes/MainMenuScene.js';
import { HomeScene } from './scenes/HomeScene.js';
import { InsuranceSelectScene } from './scenes/InsuranceSelectScene.js';
import { RoadScene } from './scenes/RoadScene.js';
import { ResultScene } from './scenes/ResultScene.js';

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'game-container',
  backgroundColor: '#0b0c10',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [
    BootScene,
    PreloadScene,
    MainMenuScene,
    HomeScene,
    InsuranceSelectScene,
    RoadScene,
    ResultScene
  ]
};

// Initialize the game
const game = new Phaser.Game(config);

export default game;
