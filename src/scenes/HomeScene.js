import Phaser from 'phaser';
import { DialogSystem } from '../systems/DialogSystem.js';
import { LoopSystem } from '../systems/LoopSystem.js';

export class HomeScene extends Phaser.Scene {
  constructor() {
    super('HomeScene');
  }

  init(data) {
    this.loopState = data.state || LoopSystem.loadState();
    
    // Automatically set the insurance package based on the loop count:
    // 'school_route' (Gói Đường Đến Trường) from Loop 2 onwards, and 'none' (Không tham gia) in Loop 1.
    if (this.loopState.loopCount > 1) {
      this.loopState.selectedInsurancePackage = 'school_route';
    } else {
      this.loopState.selectedInsurancePackage = 'none';
    }
    LoopSystem.saveState(this.loopState);

    this.talkedToMom = false;
    this.doorOpened = false;
    this.talkedToNeighbor = false;
    this.initialDialogueTriggered = this.loopState.hasTalkedToMom;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 1. Create separate graphics layers for 2.5D Room
    this.bgGraphics = this.add.graphics().setDepth(5);
    this.fgGraphics = this.add.graphics().setDepth(1500);
    this.lightGraphics = this.add.graphics().setDepth(2000);

    // Draw background (walls, floors, sky) and foreground elements
    this.draw25DBackground();
    this.drawForeground();
    this.drawLightingOverlay();

    // 2. Setup Static Physics Obstacles (Furniture)
    this.furniture = this.physics.add.staticGroup();

    // Sofa (Indoor Room)
    const sofa = this.furniture.create(320, 360, 'room_sofa');
    sofa.body.setSize(128, 40);
    sofa.body.setOffset(0, 24);

    // 3. Create Invisible Boundaries (Walls) to restrict movement
    this.walls = this.physics.add.staticGroup();
    // Left boundary
    this.walls.create(20, 300).setSize(40, 600).setVisible(false);
    // Right boundary
    this.walls.create(width - 20, 300).setSize(40, 600).setVisible(false);
    // Bottom boundary
    this.walls.create(width / 2, 540).setSize(width, 40).setVisible(false);
    // Top boundary room wall
    this.walls.create(240, 220).setSize(400, 40).setVisible(false);
    // Top boundary yard wall
    this.walls.create(width - 220, 260).setSize(width - 440, 40).setVisible(false);
    // Partition wall top column
    this.walls.create(440, 235).setSize(20, 250).setVisible(false);
    // Partition wall bottom column
    this.walls.create(440, 500).setSize(20, 80).setVisible(false);

    // 4. Interactive Door (leads to yard)
    this.door = this.physics.add.staticSprite(440, 410, 'room_door');
    this.door.setDisplaySize(24, 100);
    this.door.body.setSize(24, 100);

    // 5. Motorbike (outside in the yard - empty)
    const vehicleType = this.loopState.vehicleType;
    let bikeTexture = 'motorbike_cub_empty';
    if (vehicleType === 'sport_bike') {
      bikeTexture = 'motorbike_sport_empty';
    }
    this.bike = this.physics.add.staticSprite(width - 200, 420, bikeTexture);
    this.bike.setScale(1.1);
    this.bike.body.setSize(48, 48);

    // 6. Helmet on the floor (Red Helmet sprite if not picked up)
    this.helmetSprite = null;
    if (!this.loopState.hasHelmet) {
      this.helmetSprite = this.physics.add.staticSprite(160, 440, 'ui_helmet');
      this.helmetSprite.setScale(1.3);
      this.helmetSprite.body.setSize(24, 24);
    }

    // 7. Spawn NPCs (Mom is in the room)
    this.mom = this.physics.add.staticSprite(240, 290, 'avatar_mom');
    this.mom.body.setSize(44, 44);

    // Neighbor Bác Nam (Outside in the yard)
    this.neighbor = this.physics.add.staticSprite(width - 120, 320, 'avatar_neighbor');
    this.neighbor.body.setSize(44, 44);

    // 8. Create Player (An) inside the room
    this.player = this.physics.add.sprite(150, 350, 'avatar_an');
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(32, 32);
    this.player.body.setOffset(16, 24);

    // Colliders setup
    this.physics.add.collider(this.player, this.furniture);
    this.physics.add.collider(this.player, this.mom);
    this.physics.add.collider(this.player, this.bike);
    this.physics.add.collider(this.player, this.neighbor);
    this.physics.add.collider(this.player, this.walls);
    if (this.helmetSprite) {
      this.physics.add.collider(this.player, this.helmetSprite);
    }
    this.doorCollider = this.physics.add.collider(this.player, this.door);

    // 9. Inputs setup
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interact: Phaser.Input.Keyboard.KeyCodes.E,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    this.input.keyboard.on('keydown-SPACE', () => { this.handleKeyPress(); });
    this.input.keyboard.on('keydown-E', () => { this.handleKeyPress(); });

    // 10. Dialogue System
    this.dialogSystem = new DialogSystem(this);
    this.dialogSystem.create();

    // 11. HUD UI Panels & Checklist
    this.createHUD();

    // 12. Interaction Prompt
    this.interactPrompt = this.add.text(width / 2, 500, '', {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#4a2c11',
      backgroundColor: '#fefae0',
      padding: { x: 10, y: 6 },
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(2600).setVisible(false);

    // 13. Light up the room with morning sun
    if (this.loopState.loopCount > 1) {
      this.time.delayedCall(1000, () => {
        try {
          this.cameras.main.flash(400, 255, 240, 200, 0.4);
        } catch (e) {}
      });
    }

    this.cameras.main.fadeIn(500);

    // 14. Auto-trigger Mom's dialogue at start if not yet talked to
    if (!this.loopState.hasTalkedToMom) {
      this.time.delayedCall(600, () => {
        if (this.scene.isActive('HomeScene')) {
          this.talkToMomFunc();
        }
      });
    }
  }

  draw25DBackground() {
    const width = this.cameras.main.width;

    // 1. SKY (above Y = 120 and behind yard fence Y = 280)
    // Draw a gorgeous morning orange/yellow gradient sky on the right side
    this.bgGraphics.fillGradientStyle(0xffb703, 0xffb703, 0xfd9e02, 0xfd9e02, 1);
    this.bgGraphics.fillRect(440, 120, width - 480, 160);

    // Draw a sun in the sky
    this.bgGraphics.fillStyle(0xfff3b0, 0.95);
    this.bgGraphics.beginPath();
    this.bgGraphics.arc(580, 180, 24, 0, Math.PI * 2);
    this.bgGraphics.fill();

    // 2. WALLS
    // Indoor wall (X: 40 to 440, Y: 120 to 240) - cozy warm cream
    this.bgGraphics.fillStyle(0xfaf6e3, 1.0);
    this.bgGraphics.fillRect(40, 120, 400, 120);

    // Indoor wall molding/bottom trim
    this.bgGraphics.fillStyle(0xd4a373, 1.0);
    this.bgGraphics.fillRect(40, 235, 400, 5);

    // Yard fence (X: 440 to width-40, Y: 240 to 280) - brick/slate fence
    this.bgGraphics.fillStyle(0x64748b, 1.0);
    this.bgGraphics.fillRect(440, 240, width - 480, 40);
    
    // Draw fence posts
    this.bgGraphics.fillStyle(0x475569, 1.0);
    for (let x = 440; x <= width - 40; x += 60) {
      this.bgGraphics.fillRect(x - 4, 230, 8, 50);
    }

    // 3. FLOORS
    // Indoor floor tiles (X: 40 to 440, Y: 240 to 520) - terracotta tiles
    this.bgGraphics.fillStyle(0xe29578, 1.0);
    this.bgGraphics.fillRect(40, 240, 400, 280);

    // Tile grid lines
    this.bgGraphics.lineStyle(1.5, 0xffdac1, 0.4);
    for (let x = 80; x < 440; x += 40) {
      this.bgGraphics.lineBetween(x, 240, x, 520);
    }
    for (let y = 280; y < 520; y += 40) {
      this.bgGraphics.lineBetween(40, y, 440, y);
    }

    // Yard floor (X: 440 to width-40, Y: 280 to 520) - grey concrete/slate paving stones
    this.bgGraphics.fillStyle(0x7f8c8d, 1.0);
    this.bgGraphics.fillRect(440, 280, width - 480, 240);

    // Yard paving lines
    this.bgGraphics.lineStyle(1.5, 0x95a5a6, 0.4);
    for (let x = 480; x < width - 40; x += 50) {
      this.bgGraphics.lineBetween(x, 280, x, 520);
    }
    for (let y = 320; y < 520; y += 40) {
      this.bgGraphics.lineBetween(440, y, width - 40, y);
    }

    // Threshold under the door (X: 435 to 445, Y: 360 to 460)
    this.bgGraphics.fillStyle(0x8c5e3c, 1.0);
    this.bgGraphics.fillRect(435, 360, 10, 100);

    // WINDOW (X: 200 to 280, Y: 130 to 190)
    this.bgGraphics.fillStyle(0xfff3b0, 0.6); // glass glow
    this.bgGraphics.fillRect(200, 130, 80, 60);
    this.bgGraphics.lineStyle(3, 0x8c5e3c, 1.0); // frame
    this.bgGraphics.strokeRect(200, 130, 80, 60);
    this.bgGraphics.lineBetween(240, 130, 240, 190);
    this.bgGraphics.lineBetween(200, 160, 280, 160);
  }

  drawForeground() {
    const width = this.cameras.main.width;

    // Left wall pillar (framing the view)
    this.fgGraphics.fillStyle(0x4a2c11, 1.0);
    this.fgGraphics.fillRect(20, 120, 20, 420);

    // Right wall pillar / gate post
    this.fgGraphics.fillStyle(0x2c3e50, 1.0);
    this.fgGraphics.fillRect(width - 40, 120, 20, 420);

    // Top beam
    this.fgGraphics.fillStyle(0x3e2723, 1.0);
    this.fgGraphics.fillRect(20, 100, width - 40, 20);

    // Partition wall columns around doorway (X = 440)
    // Top column: X: [435, 445], Y: [120, 360]
    this.fgGraphics.fillStyle(0x8c5e3c, 1.0);
    this.fgGraphics.fillRect(432, 120, 16, 240);
    // Bottom column: X: [435, 445], Y: [460, 540]
    this.fgGraphics.fillRect(432, 460, 16, 80);

    // Draw some hanging plants in the yard
    this.fgGraphics.fillStyle(0x27ae60, 0.85);
    this.fgGraphics.beginPath();
    this.fgGraphics.arc(500, 130, 15, 0, Math.PI * 2);
    this.fgGraphics.arc(520, 125, 12, 0, Math.PI * 2);
    this.fgGraphics.arc(650, 130, 20, 0, Math.PI * 2);
    this.fgGraphics.fill();

    // Draw simple iron gate bars on the right
    this.fgGraphics.lineStyle(3, 0x2c3e50, 0.9);
    this.fgGraphics.lineBetween(width - 40, 360, width - 25, 360);
    this.fgGraphics.lineBetween(width - 40, 460, width - 25, 460);
    for (let y = 370; y < 460; y += 15) {
      this.fgGraphics.lineBetween(width - 40, y, width - 25, y);
    }
  }

  drawLightingOverlay() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Soft yellow warm sunbeam from the window
    this.lightGraphics.fillStyle(0xfffdf0, 0.22);
    this.lightGraphics.beginPath();
    this.lightGraphics.moveTo(220, 190);
    this.lightGraphics.lineTo(260, 190);
    this.lightGraphics.lineTo(380, 520);
    this.lightGraphics.lineTo(120, 520);
    this.lightGraphics.closePath();
    this.lightGraphics.fill();

    // Soft yellow sunbeam from the sky in yard
    this.lightGraphics.fillStyle(0xfffdf0, 0.15);
    this.lightGraphics.beginPath();
    this.lightGraphics.moveTo(560, 120);
    this.lightGraphics.lineTo(600, 120);
    this.lightGraphics.lineTo(720, 520);
    this.lightGraphics.lineTo(520, 520);
    this.lightGraphics.closePath();
    this.lightGraphics.fill();

    // Ambient morning glow (overlay)
    this.lightGraphics.fillStyle(0xfef08a, 0.1);
    this.lightGraphics.fillRect(0, 0, width, height);
  }

  createHUD() {
    const width = this.cameras.main.width;

    // Header Panel - Notebook paper styling
    this.hudBg = this.add.graphics();
    this.hudBg.fillStyle(0xfefae0, 0.95);
    this.hudBg.fillRoundedRect(15, 15, width - 30, 48, 6);
    this.hudBg.lineStyle(1.5, 0x8c5e3c, 0.85);
    this.hudBg.strokeRoundedRect(15, 15, width - 30, 48, 6);
    this.hudBg.setDepth(2600);

    this.loopText = this.add.text(30, 28, `VÒNG LẶP: ${this.loopState.loopCount} | THỜI GIAN: 6:50`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#4a2c11',
      fontStyle: 'bold'
    }).setDepth(2600);

    this.coinText = this.add.text(280, 28, `VÍ TIỀN: ${this.loopState.coin} xu`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#b45309',
      fontStyle: 'bold'
    }).setDepth(2600);

    this.insText = this.add.text(480, 28, `BẢO HIỂM: Chưa mua`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#8c5e3c',
      fontStyle: 'bold'
    }).setDepth(2600);
    this.updateHUDText();

    // Instructions
    this.add.text(width - 30, 38, 'Di chuyển: WASD / Phím Mũi Tên', {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#8c5e3c'
    }).setOrigin(1, 0.5).setDepth(2600);

    // Checklist panel
    this.createChecklist();
  }

  createChecklist() {
    const width = this.cameras.main.width;
    const listX = width - 200;
    const listY = 90;
    
    // Backdrop - Warm notebook paper styling
    this.checklistBg = this.add.graphics();
    this.checklistBg.fillStyle(0xfefae0, 0.95);
    this.checklistBg.fillRoundedRect(listX, listY, 180, 115, 8);
    this.checklistBg.lineStyle(1.5, 0x8c5e3c, 0.85);
    this.checklistBg.strokeRoundedRect(listX, listY, 180, 115, 8);
    this.checklistBg.setDepth(2600);

    this.checklistTitle = this.add.text(listX + 10, listY + 10, 'MẸ DẶN SÁNG NAY ❤', {
      fontFamily: "'Courier New', monospace",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#b91c1c'
    }).setDepth(2600);

    this.checkMom = this.add.text(listX + 10, listY + 35, '[ ] Ôm chào tạm biệt Mẹ', {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#4a2c11'
    }).setDepth(2600);

    this.checkHelmet = this.add.text(listX + 10, listY + 60, '[ ] Đội mũ bảo hiểm đỏ', {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#4a2c11'
    }).setDepth(2600);

    this.checkBike = this.add.text(listX + 10, listY + 85, '[ ] Bóp phanh & kiểm lốp', {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#4a2c11'
    }).setDepth(2600);

    this.updateChecklistDisplay();
  }

  updateChecklistDisplay() {
    this.checkMom.setText(this.loopState.hasTalkedToMom ? '[✔] Ôm chào tạm biệt Mẹ' : '[ ] Ôm chào tạm biệt Mẹ');
    this.checkMom.setColor(this.loopState.hasTalkedToMom ? '#15803d' : '#4a2c11');

    const hasHelmet = this.loopState.hasHelmet;
    this.checkHelmet.setText(hasHelmet ? '[✔] Đội mũ bảo hiểm đỏ' : '[ ] Đội mũ bảo hiểm đỏ');
    this.checkHelmet.setColor(hasHelmet ? '#15803d' : '#4a2c11');

    const hasCheckedBike = this.loopState.hasCheckedBike;
    this.checkBike.setText(hasCheckedBike ? '[✔] Bóp phanh & kiểm lốp' : '[ ] Bóp phanh & kiểm lốp');
    this.checkBike.setColor(hasCheckedBike ? '#15803d' : '#4a2c11');
  }

  updateHUDText() {
    this.coinText.setText(`VÍ TIỀN: ${this.loopState.coin} xu`);
    
    let insName = 'Không tham gia';
    let insColor = '#c2410c';
    if (this.loopState.selectedInsurancePackage === 'red_helmet') {
      insName = 'Gói Mũ Đỏ';
      insColor = '#b45309';
    } else if (this.loopState.selectedInsurancePackage === 'old_bike') {
      insName = 'Gói Xe Cũ';
      insColor = '#1e3a8a';
    } else if (this.loopState.selectedInsurancePackage === 'school_route') {
      insName = 'Gói Đường Đến Trường';
      insColor = '#15803d';
    }
    
    this.insText.setText(`BẢO HIỂM: ${insName}`);
    this.insText.setColor(insColor);
  }

  update() {
    this.dialogSystem.update();

    // Freeze player if dialog is active OR if initial dialogue hasn't triggered yet
    if ((this.dialogSystem.container && this.dialogSystem.container.visible) || !this.initialDialogueTriggered) {
      this.player.setVelocity(0, 0);
      this.interactPrompt.setVisible(false);
      return;
    }

    // Move player
    let vx = 0;
    let vy = 0;
    const speed = 180;

    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      vx = -speed;
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      vx = speed;
    }

    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      vy = -speed;
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      vy = speed;
    }

    // Touch pointer movement for mobile responsiveness (excluding dialog box clicks)
    if (vx === 0 && vy === 0 && this.input.activePointer.isDown) {
      const activePointer = this.input.activePointer;
      const dialogVisible = this.dialogSystem.container && this.dialogSystem.container.visible;
      // Do not move player if clicking on the dialog UI area (typically bottom of screen Y >= 420)
      if (!dialogVisible && activePointer.y < 420) {
        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, activePointer.worldX, activePointer.worldY);
        const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, activePointer.worldX, activePointer.worldY);
        if (dist > 15) {
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
        }
      }
    }

    this.player.setVelocity(vx, vy);

    if (vx < 0) {
      this.player.setFlipX(true);
    } else if (vx > 0) {
      this.player.setFlipX(false);
    }

    // Depth sorting based on y-position
    this.player.setDepth(this.player.y);
    this.mom.setDepth(this.mom.y);
    this.neighbor.setDepth(this.neighbor.y);
    if (this.helmetSprite) this.helmetSprite.setDepth(this.helmetSprite.y);
    this.bike.setDepth(this.bike.y);
    this.door.setDepth(this.door.y);
    this.furniture.getChildren().forEach(child => {
      child.setDepth(child.y);
    });

    this.handleInteractions();
  }

  handleInteractions() {
    const width = this.cameras.main.width;
    const distToMom = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.mom.x, this.mom.y);
    const distToDoor = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.door.x, this.door.y);
    const distToBike = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.bike.x, this.bike.y);
    const distToGate = Phaser.Math.Distance.Between(this.player.x, this.player.y, width - 40, 410);
    const distToNeighbor = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.neighbor.x, this.neighbor.y);

    let distToHelmet = 999;
    if (this.helmetSprite && this.helmetSprite.active) {
      distToHelmet = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.helmetSprite.x, this.helmetSprite.y);
    }

    let isNearSomething = false;

    // A. Mom
    if (distToMom < 60) {
      isNearSomething = true;
      this.interactPrompt.setText('Nhấn [ SPACE / E ] nói chuyện với Mẹ').setVisible(true);
    } 
    // B. Helmet
    else if (distToHelmet < 50) {
      isNearSomething = true;
      this.interactPrompt.setText('Nhấn [ SPACE / E ] để nhặt Mũ Bảo Hiểm').setVisible(true);
    }
    // C. Motorbike
    else if (distToBike < 60) {
      isNearSomething = true;
      const bikeStatus = this.loopState.hasCheckedBike ? 'Đã kiểm tra' : 'Kiểm tra phanh & lốp';
      this.interactPrompt.setText(`Nhấn [ SPACE / E ] để: ${bikeStatus}`).setVisible(true);
    }
    // E. Door (Exit to Yard)
    else if (distToDoor < 60 && !this.doorOpened) {
      isNearSomething = true;
      this.interactPrompt.setText('Nhấn [ SPACE / E ] để mở cửa ra sân').setVisible(true);
    }
    // F. Gate (Exit to Street)
    else if (distToGate < 60) {
      isNearSomething = true;
      this.interactPrompt.setText('Nhấn [ SPACE / E ] dắt xe xuất phát đi học').setVisible(true);
    }
    // G. Neighbor (Bác Nam)
    else if (distToNeighbor < 60) {
      isNearSomething = true;
      this.interactPrompt.setText('Nhấn [ SPACE / E ] nói chuyện với Bác Nam').setVisible(true);
    }

    if (!isNearSomething) {
      this.interactPrompt.setVisible(false);
    }
  }

  handleKeyPress() {
    if ((this.dialogSystem.container && this.dialogSystem.container.visible) || !this.initialDialogueTriggered) {
      return;
    }

    const width = this.cameras.main.width;
    const distToMom = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.mom.x, this.mom.y);
    const distToDoor = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.door.x, this.door.y);
    const distToBike = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.bike.x, this.bike.y);
    const distToGate = Phaser.Math.Distance.Between(this.player.x, this.player.y, width - 40, 410);
    const distToNeighbor = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.neighbor.x, this.neighbor.y);

    let distToHelmet = 999;
    if (this.helmetSprite && this.helmetSprite.active) {
      distToHelmet = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.helmetSprite.x, this.helmetSprite.y);
    }

    if (distToMom < 60) {
      this.talkToMomFunc();
    } else if (this.helmetSprite && this.helmetSprite.active && distToHelmet < 50) {
      this.pickUpHelmet();
    } else if (distToBike < 60) {
      this.checkMotorbike();
    } else if (distToDoor < 60 && !this.doorOpened) {
      this.openDoor();
    } else if (distToGate < 60) {
      this.tryExitRoom();
    } else if (distToNeighbor < 60) {
      this.talkToNeighborFunc();
    }
  }

  openDoor() {
    if (this.doorOpened) return;

    if (!this.loopState.hasTalkedToMom) {
      this.dialogSystem.startDialogue([
        { speaker: "Hệ thống", text: "Bạn cần nói chuyện chào tạm biệt Mẹ trước khi ra sân!" }
      ]);
      return;
    }

    if (this.loopState.loopCount === 1 && !this.loopState.hasHelmet) {
      this.dialogSystem.startDialogue([
        { speaker: "Hệ thống", text: "Bạn cần lấy Mũ Bảo Hiểm đỏ treo gần cửa trước khi ra ngoài!" }
      ]);
      return;
    }

    this.doorOpened = true;

    try {
      const ctx = this.sound.context;
      if (window.gameSynth && ctx) {
        window.gameSynth.playClickBeep(ctx);
      }
    } catch (e) {}

    // Disable collision
    if (this.doorCollider) {
      this.doorCollider.active = false;
    }
    this.door.body.enable = false;

    // Slide the door up
    this.tweens.add({
      targets: this.door,
      y: 300,
      duration: 600,
      ease: 'Power1.easeOut'
    });

    this.dialogSystem.startDialogue([
      { speaker: "Hệ thống", text: "Cửa phòng đã mở. Bạn có thể ra ngoài sân trước." }
    ]);
  }

  talkToMomFunc() {
    const loop = this.loopState.loopCount;
    let dialogue = [];

    if (loop === 1) {
      dialogue = [
        { speaker: "Mẹ", text: "An ơi! Lại 6 giờ 50 rồi kìa! Nhìn cái đồng hồ xem, muộn buổi thuyết trình dự án tốt nghiệp ở UEH đến nơi rồi con! Dành vài phút chuẩn bị rồi dắt xe đi thi đi!" },
        { speaker: "An", text: "Dạ con biết rồi mẹ! Trễ buổi thuyết trình này là cả nhóm bị rớt môn, học lại tốn mấy triệu đồng học phí đó mẹ!" },
        { speaker: "Mẹ", text: "Biết thế thì mau đội mũ bảo hiểm đỏ vào, kiểm tra xe cẩn thận rồi đi đứng cho đàng hoàng. Đường xá đông đúc nguy hiểm lắm con ơi!" },
        { speaker: "An", text: "Con đang vội lắm mẹ ơi, không kịp kiểm tra gì đâu! Con dắt xe chạy luôn cho kịp!" }
      ];
    } else if (loop === 2) {
      dialogue = [
        { speaker: "Mẹ", text: "An ơi... Lại là 6 giờ 50 rồi kìa con..." },
        { speaker: "An", text: "Mẹ ơi... Con cảm giác như mình vừa trải qua một cơn ác mộng kinh hoàng. Con chạy vội không đội mũ bảo hiểm, không kiểm tra xe, rồi bị tai nạn. Tiền viện phí với tiền sửa xe cướp sạch ví của con, làm con trễ thi và rớt môn luôn..." },
        { speaker: "Mẹ", text: "Đó không phải chỉ là mơ đâu con, đó là lời cảnh báo đấy! Đi học mà cẩu thả là phải trả giá đắt. Mẹ đã để sẵn gói bảo hiểm Đường Đến Trường tích hợp bảo hiểm y tế và sửa xe trên bàn rồi. Hãy xem nó là lá chắn tài chính hộ mệnh của con!" },
        { speaker: "An", text: "(Lo lắng) Lá chắn tài chính sao mẹ? Nó giúp ích được gì cho con ạ?" },
        { speaker: "Mẹ", text: "Đúng vậy! Bảo hiểm không ngăn tai nạn xảy ra, nhưng nó là điểm tựa tài chính vững chắc. Nếu chẳng may có rủi ro, bảo hiểm sẽ gánh vác phần lớn chi phí điều trị và sửa xe, giúp con không bị kiệt quệ tài chính. Giờ thì đội mũ bảo hiểm đỏ vào, kiểm tra phanh lốp thật kỹ rồi hãy xuất phát!" }
      ];
    } else {
      dialogue = [
        { speaker: "Mẹ", text: "Nhớ dặn lòng đi đứng cẩn thận nhé con, 6 giờ 50 rồi..." },
        { speaker: "An", text: "Dạ mẹ, con đã rút ra bài học xương máu rồi. Lần này con sẽ không chủ quan nữa. Con chuẩn bị rất kỹ lưỡng để không phụ lòng nhóm thuyết trình." },
        { speaker: "Mẹ", text: "Tốt lắm con trai! Mũ bảo hiểm đỏ đội chắc chắn, phanh lốp xe Cub 50cc đã bảo dưỡng kỹ càng, cộng thêm gói bảo hiểm Đường Đến Trường làm lá chắn bảo vệ tài chính. Mẹ tin con sẽ đến UEH an toàn và hoàn thành tốt bài thi." },
        { speaker: "An", text: "Dạ! Sự chuẩn bị an toàn chính là trách nhiệm với bản thân và cả nhóm. Con đi thi đây mẹ!" }
      ];
    }

    this.dialogSystem.startDialogue(dialogue, () => {
      this.loopState.hasTalkedToMom = true;
      if (this.loopState.loopCount >= 2) {
        this.loopState.selectedInsurancePackage = "school_route";
      }
      this.initialDialogueTriggered = true;
      this.updateHUDText();
      this.updateChecklistDisplay();
      LoopSystem.saveState(this.loopState);
    });
  }

  talkToNeighborFunc() {
    const loop = this.loopState.loopCount;
    let dialogue = [];

    if (loop === 1) {
      dialogue = [
        { speaker: "Bác Nam", text: "Ơ cái thằng bé này, đi đâu mà hớt ha hớt hải thế? Ngõ nhỏ dạo này lắm ổ gà sâu hoắm ngập nước mưa, chạy xe Cub từ từ thôi cháu ơi, không dắt bộ qua là bay cả vành xe đấy!" },
        { speaker: "An", text: "Dạ cháu chào bác Nam, cháu đang vội đi thi thuyết trình kẻo trễ ạ!" }
      ];
    } else if (loop === 2) {
      dialogue = [
        { speaker: "An", text: "Cháu chào bác Nam ạ!" },
        { speaker: "Bác Nam", text: "Ừ, chào cháu. Đi thi hả? Mà này, sáng nay đoạn Chợ Sáng đông lắm nha. Mấy xe hàng rong bán đồ lùi xe cẩu thả lắm, lách nhanh bóp còi inh ỏi là dễ húc đổ hàng của người ta rồi đền ốm đòn đó. Cứ bóp phanh đi chậm, nhường đường lách qua cho lành cháu ạ." },
        { speaker: "An", text: "(Cảm giác quen thuộc...) Dạ cháu cảm ơn bác Nam, cháu sẽ đi thật chậm và chú ý nhường đường ở Chợ Sáng." }
      ];
    } else {
      dialogue = [
        { speaker: "An", text: "Cháu chào bác Nam buổi sáng ạ! Bác lại tưới cây sớm thế ạ?" },
        { speaker: "Bác Nam", text: "Ừ cháu. Đi thi sớm thế là tốt. Cơ mà lát ra Ngã Tư lớn nhớ cẩn thận đèn giao thông nha cháu. Đừng có cố vượt đèn vàng kẻo mấy chiếc xe tải ben nó phóng nhanh vượt ẩu quẹt trúng là tiền mất tật mang! Gặp đèn vàng thì cứ rẽ sát lề, phanh dừng lại chờ xe lớn đi qua cho chắc ăn. Còn đoạn cuối công trường thì cát sạt lở dữ lắm, nhớ giảm tốc độ đi chậm vệt đường sạch, chứ vít ga phóng nhanh là trượt bánh té ngã liền." },
        { speaker: "An", text: "Dạ, cháu đã kiểm tra kỹ phanh lốp, đội mũ đỏ và đi đúng tốc độ rồi bác. Cháu xin phép đi thi ạ!" },
        { speaker: "Bác Nam", text: "Ừ, đi thi tốt, vạn sự bình an nhé cháu!" }
      ];
    }

    this.dialogSystem.startDialogue(dialogue, () => {
      this.talkedToNeighbor = true;
    });
  }

  pickUpHelmet() {
    this.loopState.hasHelmet = true;
    this.updateChecklistDisplay();
    this.updateHUDText();
    LoopSystem.saveState(this.loopState);

    // Play click/pick beep
    try {
      const ctx = this.sound.context;
      if (window.gameSynth && ctx) {
        window.gameSynth.playClickBeep(ctx);
      }
    } catch (e) {}

    if (this.helmetSprite) {
      this.helmetSprite.destroy();
      this.helmetSprite = null;
    }

    this.dialogSystem.startDialogue([
      { speaker: "Hệ thống", text: "Bạn đã nhặt Mũ Bảo Hiểm đỏ. Sẵn sàng giảm 50% chấn thương y tế nếu xảy ra va quẹt." }
    ]);
  }

  checkMotorbike() {
    this.loopState.hasCheckedBike = true;
    this.updateChecklistDisplay();
    LoopSystem.saveState(this.loopState);

    try {
      const ctx = this.sound.context;
      if (window.gameSynth && ctx) {
        window.gameSynth.playClickBeep(ctx);
      }
    } catch (e) {}

    this.dialogSystem.startDialogue([
      { speaker: "Hệ thống", text: "Bạn đã kiểm tra lốp, phanh xe Honda Cub 50cc kỹ càng. Sẵn sàng giảm 50% chi phí sửa xe nếu xe bị hỏng hóc." }
    ]);
  }



  tryExitRoom() {
    if (this.loopState.vehicleType === 'sport_bike') {
      const warningText = "Cảnh báo: Bạn chuẩn bị lái xe phân khối lớn trái pháp luật khi chưa đủ tuổi. Việc này có thể dẫn đến phạt tiền hành chính và cực kỳ nguy hiểm! Vẫn tiếp tục?";
      const choices = [
        { text: "Yes", id: "yes", choiceId: "danger", resultText: "Bạn dắt xe phân khối lớn ra đường lớn..." },
        { text: "No", id: "no", resultText: "Bạn quay lại chuẩn bị." }
      ];

      this.dialogSystem.startChoice(warningText, choices, (choice) => {
        if (choice.id === 'yes') {
          this.exitToStreet();
        }
      });
      return;
    }

    // Check if player skipped checks (helmet or bike check) in Loop 2+
    const skippedChecks = !this.loopState.hasHelmet || !this.loopState.hasCheckedBike;
    if (this.loopState.loopCount > 1 && skippedChecks) {
      const warningText = "Cảnh báo: Bạn chưa chuẩn bị đầy đủ trang bị (chưa đội mũ bảo hiểm đỏ hoặc chưa kiểm tra phanh/lốp xe Honda Cub 50cc). Lái xe trong tình trạng này cực kỳ nguy hiểm. Vẫn tiếp tục đi thi?";
      const choices = [
        { text: "Vẫn đi thi ngay (Bỏ qua kiểm tra)", id: "yes", resultText: "Bạn dắt xe ra đường lớn..." },
        { text: "Ở lại chuẩn bị kỹ hơn", id: "no", resultText: "Bạn quay lại kiểm tra căn phòng." }
      ];

      this.dialogSystem.startChoice(warningText, choices, (choice) => {
        if (choice.id === 'yes') {
          this.exitToStreet();
        }
      });
    } else {
      this.exitToStreet();
    }
  }

  exitToStreet() {
    this.cameras.main.fadeOut(500);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      if (this.loopState.loopCount > 1) {
        this.scene.start('InsuranceSelectScene', { state: this.loopState });
      } else {
        this.scene.start('RoadScene', { state: this.loopState });
      }
    });
  }
}
