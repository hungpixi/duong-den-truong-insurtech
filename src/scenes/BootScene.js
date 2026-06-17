import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    // Quick transition to the PreloadScene
    this.scene.start('PreloadScene');
  }
}
