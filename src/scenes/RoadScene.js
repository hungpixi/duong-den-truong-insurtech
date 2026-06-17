import Phaser from 'phaser';
import { DialogSystem } from '../systems/DialogSystem.js';
import { EventResolver } from '../systems/EventResolver.js';
import { LoopSystem } from '../systems/LoopSystem.js';

export class RoadScene extends Phaser.Scene {
  constructor() {
    super('RoadScene');
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
    
    // Distance targets
    this.distanceTravelled = 0;
    this.distanceTarget = 650; // Total distance in meters
    this.speed = 130; // Current speed
    this.targetSpeed = 130;
    
    this.roadScroll = 0;
    this.isPaused = false;
    this.isGameOver = false;

    // Halt checkpoints (in meters)
    this.checkpoints = [
      { distance: 120, spot: 'hem_nho', triggered: false },
      { distance: 270, spot: 'cho_sang', triggered: false },
      { distance: 420, spot: 'nga_tu', triggered: false },
      { distance: 570, spot: 'cong_truong', triggered: false }
    ];

    // Scenery list for streetlights
    this.sceneryList = [];
    for (let z = 0.1; z <= 1.0; z += 0.25) {
      this.sceneryList.push({ z: z, side: -1 }); // Left side lights
      this.sceneryList.push({ z: z, side: 1 });  // Right side lights
    }

    // Active obstacles list
    this.activeObstacles = [];
    
    // Obstacle spawn triggers
    this.obstacleSpawners = [
      // Checkpoint obstacles (40m before checkpoint to keep pacing tight)
      { distance: 80, type: 'obstacle_pothole', x3d: 0.0, spot: 'hem_nho', isCheckpoint: true, spawned: false },
      { distance: 230, type: 'obstacle_vendor', x3d: -0.6, spot: 'cho_sang', isCheckpoint: true, spawned: false },
      { distance: 380, type: 'obstacle_truck', x3d: 0.6, spot: 'nga_tu', isCheckpoint: true, spawned: false },
      { distance: 520, type: 'obstacle_vendor', x3d: 0.0, spot: 'cong_truong', isCheckpoint: true, spawned: false },
      
      // Minor obstacles (for fun dodging gameplay, does not halt the game)
      { distance: 40, type: 'minor', spawned: false },
      { distance: 170, type: 'minor', spawned: false },
      { distance: 320, type: 'minor', spawned: false },
      { distance: 470, type: 'minor', spawned: false },

      // Traffic vehicles (same-direction traffic)
      { distance: 60, type: 'obstacle_traffic_scooter', spawned: false },
      { distance: 180, type: 'obstacle_traffic_car', spawned: false },
      { distance: 300, type: 'obstacle_traffic_scooter', spawned: false },
      { distance: 420, type: 'obstacle_traffic_car', spawned: false },
      { distance: 500, type: 'obstacle_traffic_scooter', spawned: false }
    ];
    this.wobbleAngle = 0;
    this.wheelieFactor = 0;
    this.steerTiltCurrent = 0;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 1. Sky Background (Horror twilight theme based on horror level)
    this.skyBg = this.add.graphics();
    
    // Determine sky colors for gradient (7h kém 10 sáng sủa ở Loop 1)
    let skyColorTop, skyColorBottom;
    this.isRainy = this.loopState.loopCount > 1 || this.loopState.horrorLevel > 0;
    
    if (this.loopState.horrorLevel >= 3) {
      skyColorTop = 0x110202; // Crimson black
      skyColorBottom = 0x220505;
    } else if (this.isRainy) {
      skyColorTop = 0x334155; // Cloudy dark slate
      skyColorBottom = 0x475569;
    } else {
      skyColorTop = 0x7dd3fc; // Morning sky blue (7h kém 10 trời sáng)
      skyColorBottom = 0xffedd5; // Warm peach sunrise near horizon
    }
    
    this.skyBg.fillGradientStyle(skyColorTop, skyColorTop, skyColorBottom, skyColorBottom, 1);
    this.skyBg.fillRect(0, 0, width, 220);

    // Horizon line
    this.horizonLine = this.add.graphics();
    const horizonColor = this.loopState.horrorLevel >= 3 ? 0xef4444 : (this.isRainy ? 0x64748b : 0xfbcfe8);
    this.horizonLine.lineStyle(1.5, horizonColor, 0.35);
    this.horizonLine.lineBetween(0, 220, width, 220);

    // 2. Road drawing canvas
    this.roadGraphics = this.add.graphics();

    // 3. Headlights cone
    this.headlightGraphics = this.add.graphics().setDepth(150);

    // 4. Motorcycle Sprite (oblique rear)
    const bikeTexture = this.loopState.vehicleType === 'sport_bike' ? 'motorbike_sport' : 'motorbike_cub';
    this.playerSprite = this.add.sprite(width / 2, 480, bikeTexture);
    this.playerSprite.setDepth(200);
    this.playerX = width / 2;

    // Exhaust smoke particle graphics
    this.smokeGraphics = this.add.graphics().setDepth(190);
    this.smokePuffs = [];

    // School Gate Sprite (oblique front/destination)
    this.schoolGateSprite = this.add.sprite(width / 2, 220, 'school_gate').setOrigin(0.5, 0.92).setDepth(180).setVisible(false);

    // Small bobbing animation
    this.playerSprite.bobY = 480;
    this.tweens.add({
      targets: this.playerSprite,
      bobY: 477,
      duration: 120,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // 5. Rain particles (always rainy in loop 2+ or higher horror levels)
    this.isRainy = this.loopState.loopCount > 1 || this.loopState.horrorLevel > 0;
    if (this.isRainy) {
      this.rainParticles = [];
      this.rainGraphics = this.add.graphics().setDepth(500);
      for (let i = 0; i < 70; i++) {
        this.rainParticles.push({
          x: Phaser.Math.Between(0, width),
          y: Phaser.Math.Between(0, height),
          length: Phaser.Math.Between(15, 30),
          speed: Phaser.Math.Between(400, 700)
        });
      }
    }

    // Spawn green highway signposts programmatically
    const distances = [150, 300, 450];
    const labels = ['UEH: 450m', 'UEH: 300m', 'UEH: 150m'];
    this.highwaySigns = [];
    
    distances.forEach((dist, index) => {
      const label = labels[index];
      const key = `highway_sign_${dist}`;
      const texWidth = 160;
      const texHeight = 120;
      
      let canvasTexture;
      if (this.textures.exists(key)) {
        canvasTexture = this.textures.get(key);
      } else {
        canvasTexture = this.textures.createCanvas(key, texWidth, texHeight);
      }
      const ctx = canvasTexture.getContext();
      ctx.clearRect(0, 0, texWidth, texHeight);
      
      // Draw posts (metallic grey)
      ctx.fillStyle = '#475569';
      ctx.fillRect(35, 70, 8, 50);
      ctx.fillRect(115, 70, 8, 50);
      
      // Draw green signboard
      ctx.fillStyle = '#065f46';
      ctx.fillRect(10, 10, 140, 60);
      
      // Draw signboard white border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.strokeRect(12, 12, 136, 56);
      
      // Draw outer thin border
      ctx.strokeStyle = '#022c22';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, 140, 60);
      
      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 80, 40);
      
      canvasTexture.refresh();
      
      // Create sprite
      const sprite = this.add.sprite(0, 0, key).setOrigin(0.5, 1.0).setDepth(180).setVisible(false);
      this.highwaySigns.push({
        distance: dist,
        sprite: sprite
      });
    });

    // 6. HUD UI Panels
    this.createHUD();

    // 7. Dialogue system
    this.dialogSystem = new DialogSystem(this);
    this.dialogSystem.create();

    // 8. Keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    // Fade in
    this.cameras.main.fadeIn(500);

    // Start engine hum
    this.startEngineHum();

    // Safety cleanup on scene shutdown
    this.events.once('shutdown', () => {
      this.stopEngineHum();
    });

    // Trigger Police Intercept event at start if player is riding 'sport_bike'
    if (this.loopState.vehicleType === 'sport_bike') {
      this.isPaused = true;
      this.speed = 0;
      this.targetSpeed = 0;

      this.time.delayedCall(500, () => {
        const dialogueList = [
          {
            speaker: "Cảnh sát giao thông",
            text: "Bác Cảnh sát giao thông phát hiện bạn lái xe phân khối lớn khi chưa đủ tuổi! Phương tiện của bạn đã bị tịch thu tạm thời để xử lý vi phạm. Không còn phương tiện, bạn đã bị trễ học nghiêm trọng!"
          }
        ];

        this.dialogSystem.startDialogue(dialogueList, () => {
          this.cameras.main.fadeOut(500);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.stopEngineHum();
            this.scene.start('ResultScene', { state: this.loopState, outcome: 'CONFISCATED' });
          });
        });
      });
    }
  }

  createHUD() {
    const width = this.cameras.main.width;

    // HUD banner backdrop
    this.hudBg = this.add.graphics();
    this.hudBg.fillStyle(0x020617, 0.9);
    this.hudBg.fillRoundedRect(10, 10, width - 20, 50, 6);
    this.hudBg.lineStyle(1.5, 0xef4444, 0.7);
    this.hudBg.strokeRoundedRect(10, 10, width - 20, 50, 6);
    this.hudBg.setDepth(300);

    // Coin display
    this.coinIcon = this.add.image(30, 35, 'ui_coin').setScale(0.7).setDepth(301);
    this.coinText = this.add.text(50, 26, `${this.loopState.coin} xu`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#fbbf24',
      fontStyle: 'bold'
    }).setDepth(301);

    // Active Insurance
    let insLabel = "Không tham gia";
    let insColor = "#ef4444";
    if (this.loopState.selectedInsurancePackage === 'red_helmet') { insLabel = "Gói Mũ Đỏ"; insColor = "#f87171"; }
    else if (this.loopState.selectedInsurancePackage === 'old_bike') { insLabel = "Gói Xe Cũ"; insColor = "#60a5fa"; }
    else if (this.loopState.selectedInsurancePackage === 'school_route') { insLabel = "Gói Đường Đến Trường"; insColor = "#34d399"; }

    this.insText = this.add.text(180, 28, `BẢO HIỂM: ${insLabel}`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: insColor,
      fontStyle: 'bold'
    }).setDepth(301);

    // Progress bar and distance
    this.distanceText = this.add.text(width - 20, 27, `Hành trình: 0 / ${this.distanceTarget}m`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '12px',
      color: '#cbd5e1',
      align: 'right'
    }).setOrigin(1, 0.5).setDepth(301);

    // Progress bar graphic
    this.progressBarGraphics = this.add.graphics().setDepth(301);
    this.drawProgressBar();
  }

  drawProgressBar() {
    this.progressBarGraphics.clear();
    const width = this.cameras.main.width;
    const barW = 200;
    const barX = width - 220;
    const barY = 40;

    // Background track
    this.progressBarGraphics.fillStyle(0x1e293b, 1);
    this.progressBarGraphics.fillRect(barX, barY, barW, 6);

    // Progress
    const percentage = this.distanceTravelled / this.distanceTarget;
    this.progressBarGraphics.fillStyle(0xef4444, 1);
    this.progressBarGraphics.fillRect(barX, barY, barW * percentage, 6);
  }

  update(time, delta) {
    this.dialogSystem.update();

    const ctx = this.sound.context;
    if (ctx && ctx.state === 'running' && !this.engineSoundActive) {
      this.startEngineHum();
    }

    if (this.engineSoundActive && this.engineOsc && this.engineGain && ctx) {
      if (this.isPaused || this.isGameOver) {
        if (!this.engineHumFaded) {
          this.engineHumFaded = true;
          const currentGain = this.engineGain.gain.value;
          this.engineGain.gain.setValueAtTime(currentGain, ctx.currentTime);
          this.engineGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
        }
      } else {
        this.engineHumFaded = false;
        let normSpeed = Phaser.Math.Clamp(this.speed / 160, 0, 1);
        let freq = 60 + normSpeed * 110;
        let gain = 0.01 + normSpeed * 0.015;
        this.engineOsc.frequency.setValueAtTime(freq, ctx.currentTime);
        this.engineGain.gain.setValueAtTime(gain, ctx.currentTime);
      }
    }

    if (this.isPaused || this.isGameOver) {
      this.speed = 0;
      this.targetSpeed = 0;
      if (this.playerSprite) {
        if (this.wobbleAngle !== 0) {
          this.playerSprite.angle = this.wobbleAngle;
          
          const rad = Phaser.Math.DegToRad(this.playerSprite.angle);
          const cy = 31;
          const pivotOffsetX = cy * Math.sin(rad);
          const pivotOffsetY = cy * (1 - Math.cos(rad));
          this.playerSprite.x = this.playerX + pivotOffsetX;
          this.playerSprite.y = this.playerSprite.bobY + pivotOffsetY;
        } else {
          this.playerSprite.angle = 0;
          if (this.playerSprite.bobY) {
            this.playerSprite.y = this.playerSprite.bobY;
          }
          this.playerSprite.x = this.playerX;
        }
      }
      return;
    }

    const dt = delta / 1000;
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Handle horizontal steering
    const isLeftPressed = this.cursors.left.isDown || this.wasd.left.isDown;
    const isRightPressed = this.cursors.right.isDown || this.wasd.right.isDown;

    if (this.playerX === undefined) {
      this.playerX = this.playerSprite.x;
    }

    if (isLeftPressed) {
      this.playerX -= 250 * dt;
    }
    if (isRightPressed) {
      this.playerX += 250 * dt;
    }

    this.playerX = Phaser.Math.Clamp(this.playerX, width / 2 - 180, width / 2 + 180);

    // Steering tilt interpolation
    let targetTilt = 0;
    if (isLeftPressed) {
      targetTilt = -8;
    } else if (isRightPressed) {
      targetTilt = 8;
    }
    this.steerTiltCurrent += (targetTilt - this.steerTiltCurrent) * 10 * dt;

    // Handle speed acceleration (touch top half to speed up, bottom half to slow down)
    const isUpPressed = this.cursors.up.isDown || this.wasd.up.isDown || (this.input.activePointer.isDown && this.input.activePointer.y < height / 2);
    const isDownPressed = this.cursors.down.isDown || this.wasd.down.isDown || (this.input.activePointer.isDown && this.input.activePointer.y >= height / 2);

    if (isUpPressed) {
      this.targetSpeed = 200;
    } else if (isDownPressed) {
      this.targetSpeed = 50;
    } else {
      this.targetSpeed = 130;
    }

    this.speed += (this.targetSpeed - this.speed) * 4 * dt;
    this.roadScroll += (this.speed * 0.4) * dt;

    // Update player sprite tilt, wobble, and position with pivot at rear wheel contact point (0, 31)
    if (this.loopState.vehicleType === 'sport_bike') {
      const targetFactor = isUpPressed ? 1.0 : 0.0;
      // Interpolate wheelieFactor smoothly
      this.wheelieFactor += (targetFactor - this.wheelieFactor) * 8 * dt;

      // Cartoonish wobble when in wheelie
      const wobbleSpeed = 20 + (this.speed / 160) * 10;
      const wobble = Math.sin(time * 0.001 * wobbleSpeed) * 2.2 * this.wheelieFactor;
      const yWobble = Math.cos(time * 0.001 * wobbleSpeed) * 1.5 * this.wheelieFactor;

      this.playerSprite.angle = -14 * this.wheelieFactor + wobble + (this.wobbleAngle || 0) + this.steerTiltCurrent;
      
      const rad = Phaser.Math.DegToRad(this.playerSprite.angle);
      const cy = 31; // vertical offset of rear tire contact point from center (64, 40) in the 128x80 sprite
      
      const pivotOffsetX = cy * Math.sin(rad);
      const pivotOffsetY = cy * (1 - Math.cos(rad));

      this.playerSprite.x = this.playerX + pivotOffsetX;
      this.playerSprite.y = this.playerSprite.bobY - 14 * this.wheelieFactor + yWobble + pivotOffsetY;
    } else {
      this.wheelieFactor = 0;
      this.playerSprite.angle = (this.wobbleAngle || 0) + this.steerTiltCurrent;

      const rad = Phaser.Math.DegToRad(this.playerSprite.angle);
      const cy = 31;
      const pivotOffsetX = cy * Math.sin(rad);
      const pivotOffsetY = cy * (1 - Math.cos(rad));

      this.playerSprite.x = this.playerX + pivotOffsetX;
      this.playerSprite.y = this.playerSprite.bobY + pivotOffsetY;
    }
    this.playerSprite.setDepth(this.playerSprite.y);

    // Update and draw exhaust smoke puffs
    this.smokeGraphics.clear();
    
    if (!this.smokeTimer) this.smokeTimer = 0;
    this.smokeTimer += dt;
    
    const spawnCooldown = isUpPressed ? 0.035 : 0.09;
    if (this.smokeTimer >= spawnCooldown) {
      this.smokeTimer = 0;
      
      // Determine tail pipe position in local coordinates relative to playerSprite center
      let localX = 13;
      let localY = 16;
      if (this.loopState.vehicleType === 'sport_bike') {
        localX = 19;
        localY = 1;
      }
      
      const rad = Phaser.Math.DegToRad(this.playerSprite.angle);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const pipeX = this.playerSprite.x + (localX * cos - localY * sin);
      const pipeY = this.playerSprite.y + (localX * sin + localY * cos);
      
      const startRadius = isUpPressed ? (10 + Math.random() * 5) : (5 + Math.random() * 3);
      const growth = isUpPressed ? (95 + Math.random() * 25) : (45 + Math.random() * 15);
      const maxLife = isUpPressed ? (0.85 + Math.random() * 0.25) : (1.0 + Math.random() * 0.3);
      const baseVy = isUpPressed ? (this.speed * 1.5 + 70 + Math.random() * 50) : (this.speed * 1.1 + 30 + Math.random() * 20);
      const baseVx = isUpPressed ? (-45 + Math.random() * 90) : (-20 + Math.random() * 40);
      
      this.smokePuffs.push({
        x: pipeX,
        y: pipeY,
        vx: baseVx,
        vy: baseVy,
        radius: startRadius,
        growth: growth,
        life: maxLife,
        maxLife: maxLife
      });
    }
    
    for (let i = this.smokePuffs.length - 1; i >= 0; i--) {
      const puff = this.smokePuffs[i];
      puff.life -= dt;
      if (puff.life <= 0) {
        this.smokePuffs.splice(i, 1);
        continue;
      }
      
      puff.x += puff.vx * dt;
      puff.y += puff.vy * dt;
      
      // Slow down expansion as the particle ages
      const ratio = puff.life / puff.maxLife;
      const growthFactor = Math.min(1.0, ratio * 1.25);
      puff.radius += puff.growth * dt * growthFactor;
      
      // Thick, smooth fading alpha (using power curve for smooth fade-out)
      const alpha = Math.pow(ratio, 1.5) * 0.75;
      
      // Helper function to draw a puffy volumetric cloud shape (3 overlapping circles)
      const drawFluffyCloud = (graphics, cx, cy, r, baseColor, alphaVal, offsetMult) => {
        graphics.fillStyle(baseColor, alphaVal);
        
        // Center main circle
        graphics.beginPath();
        graphics.arc(cx, cy, r, 0, Math.PI * 2);
        graphics.fill();
        
        // Left offset circle
        graphics.beginPath();
        graphics.arc(cx - r * 0.35 * offsetMult, cy + r * 0.12 * offsetMult, r * 0.75, 0, Math.PI * 2);
        graphics.fill();
        
        // Right offset circle
        graphics.beginPath();
        graphics.arc(cx + r * 0.3 * offsetMult, cy - r * 0.15 * offsetMult, r * 0.8, 0, Math.PI * 2);
        graphics.fill();
      };
      
      // 1. Draw outer shadow/volume base (dark gray-blue)
      drawFluffyCloud(this.smokeGraphics, puff.x, puff.y, puff.radius, 0x334155, alpha * 0.45, 1.0);
      
      // 2. Draw thick main cloud body (mid-tone gray)
      drawFluffyCloud(this.smokeGraphics, puff.x, puff.y, puff.radius * 0.85, 0x94a3b8, alpha, 0.95);
      
      // 3. Draw 3D highlights (bright white-gray) offset to the top-left
      const hlX = puff.x - puff.radius * 0.15;
      const hlY = puff.y - puff.radius * 0.15;
      drawFluffyCloud(this.smokeGraphics, hlX, hlY, puff.radius * 0.45, 0xf1f5f9, alpha * 0.9, 0.8);
    }

    // Update distance
    this.distanceTravelled += (this.speed * 0.28) * dt;
    this.distanceTravelled = Math.min(this.distanceTarget, this.distanceTravelled);
    this.distanceText.setText(`Hành trình: ${Math.round(this.distanceTravelled)} / ${this.distanceTarget}m`);
    this.drawProgressBar();

    // Check Win/Gate arrival
    if (this.distanceTravelled >= this.distanceTarget) {
      this.isPaused = true;
      this.speed = 0;
      this.targetSpeed = 0;
      
      // Immediately destroy all obstacle sprites in this.activeObstacles and set this.activeObstacles = [];
      this.activeObstacles.forEach(obs => {
        if (obs.sprite) {
          obs.sprite.destroy();
        }
      });
      this.activeObstacles = [];
      
      const width = this.cameras.main.width;
      
      // Project the gate on the right sidewalk (x3d = 0.85, z3d = 0)
      const proj = this.project(0.85, 0);
      this.schoolGateSprite.setVisible(true);
      this.schoolGateSprite.x = proj.x;
      this.schoolGateSprite.y = proj.y;
      this.schoolGateSprite.setScale(proj.scale * 2.2);
      this.schoolGateSprite.setDepth(proj.y);

      // Disable control and tween player to pull over next to the gate
      const targetX = this.schoolGateSprite.x - 60;
      this.tweens.add({
        targets: this,
        playerX: targetX,
        duration: 1500,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          // Determine if Ending 3 conditions are met
          const isEnding3 = 
            this.loopState.loopCount >= 2 &&
            this.loopState.hasHelmet &&
            this.loopState.hasCheckedBike &&
            this.loopState.selectedInsurancePackage === 'school_route' &&
            this.loopState.coin > 0;

          let dialogueList = [];
          if (isEnding3) {
            dialogueList = [
              { speaker: "An", text: "UEH... Đại học UEH đây rồi! Đúng 6 giờ 58 phút! Mình đã đến kịp giờ thuyết trình dự án tốt nghiệp! Cánh cổng trường đang mở ra chào đón mình!" },
              { speaker: "Hệ thống", text: "Ánh nắng ban mai rạng rỡ soi chiếu cổng trường Đại học UEH. Nhờ có sự chuẩn bị kỹ càng từ chiếc mũ bảo hiểm đỏ, chiếc xe Cub được kiểm tra chu đáo, cùng lá chắn bảo hiểm học đường làm tấm hộ mệnh tài chính, bạn đã vượt qua các sự cố dọc đường một cách vững vàng để đến phòng thi an toàn. Chúc mừng bạn!" }
            ];
          } else {
            dialogueList = [
              { speaker: "An", text: "Đại học UEH đây rồi! Nhưng sao cổng trường đã đóng thế này... Mình đã đến trễ buổi thi thuyết trình tốt nghiệp rồi sao?" },
              { speaker: "Hệ thống", text: "Bạn đã đến muộn do gặp quá nhiều sự cố dọc đường. Việc không chuẩn bị trang bị an toàn và thiếu gói bảo hiểm gánh đỡ thiệt hại đã làm bạn cạn kiệt tài chính lẫn thời gian. Thầy cô và cả nhóm đã vào phòng thi từ lâu. Cánh cổng sắt đóng chặt lại như lời nhắc nhở đắt giá. Bạn buộc phải chuẩn bị tốt hơn ở lần sau..." }
            ];
          }

          this.dialogSystem.startDialogue(dialogueList, () => {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', () => {
              this.stopEngineHum();
              this.scene.start('ResultScene', { state: this.loopState, outcome: 'WIN' });
            });
          });
        }
      });
      return;
    }

    // Check obstacle spawns
    this.obstacleSpawners.forEach(spawner => {
      if (this.distanceTravelled >= spawner.distance && !spawner.spawned) {
        spawner.spawned = true;
        this.spawnObstacle(spawner);
      }
    });

    // Scroll, check collisions, and render active obstacles
    for (let i = this.activeObstacles.length - 1; i >= 0; i--) {
      const obs = this.activeObstacles[i];
      if (obs.type === 'traffic_scooter' || obs.type === 'traffic_car') {
        obs.z -= (Math.max(0, this.speed - (obs.speed || 35)) * 0.16) * dt / 100;

        // Smoothly sway left/right
        if (!obs.swayTimer) {
          obs.swayTimer = 0;
        }
        obs.swayTimer += dt;
        if (obs.swayTimer >= 2.5) {
          obs.swayTimer = 0;
          obs.targetX3d = obs.targetX3d === -0.4 ? 0.4 : -0.4;
        }
        // lerp x3d using obs.x3d += (obs.targetX3d - obs.x3d) * 0.05 * dt (normalized to 60fps)
        obs.x3d += (obs.targetX3d - obs.x3d) * 0.05 * dt * 60;
        
        // tilt the sprite in the steering direction: sprite.angle = (obs.targetX3d - obs.x3d) * 10
        if (obs.sprite) {
          obs.sprite.angle = (obs.targetX3d - obs.x3d) * 10;
        }
      } else {
        obs.z -= (this.speed * 0.16) * dt / 100;
      }

      // Check automatic checkpoint trigger
      if (obs.isCheckpoint && obs.z <= 0.35 && !obs.triggeredDialogue) {
        obs.triggeredDialogue = true;
        this.showWarningExclamation();
        this.isPaused = true;
        this.speed = 0;
        this.targetSpeed = 0;
        
        // Mark checkpoint as triggered in checkpoints array
        const cp = this.checkpoints.find(c => c.spot === obs.spot);
        if (cp) {
          cp.triggered = true;
        }
        
        const spot = obs.spot;
        obs.sprite.destroy();
        this.activeObstacles.splice(i, 1);
        
        this.time.delayedCall(450, () => {
          this.triggerHalt(spot);
        });
        continue;
      }

      if (obs.z < 0.0) {
        obs.sprite.destroy();
        if (obs.isCheckpoint) {
          // Player successfully dodged it!
          const floatText = this.add.text(this.playerSprite.x, this.playerSprite.y - 60, '+10 xu / NÉ TRÁNH TỐT!', {
            fontFamily: "'Courier New', monospace",
            fontSize: '18px',
            color: '#10b981',
            fontStyle: 'bold',
            stroke: '#020617',
            strokeThickness: 3
          }).setOrigin(0.5).setDepth(250).setScale(0.4);

          // Juicy pop scale animation
          this.tweens.add({
            targets: floatText,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 180,
            ease: 'Back.easeOut',
            onComplete: () => {
              this.tweens.add({
                targets: floatText,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 120,
                ease: 'Sine.easeInOut'
              });
            }
          });

          // Float up and fade
          this.tweens.add({
            targets: floatText,
            y: floatText.y - 70,
            alpha: 0,
            duration: 1000,
            ease: 'Sine.easeIn',
            delay: 100,
            onComplete: () => {
              floatText.destroy();
            }
          });

          this.loopState.coin += 10;
          LoopSystem.saveState(this.loopState);
          this.coinText.setText(`${this.loopState.coin} xu`);

          const cp = this.checkpoints.find(c => c.spot === obs.spot);
          if (cp) {
            cp.triggered = true;
          }
        }
        this.activeObstacles.splice(i, 1);
        continue;
      }

      // Apply dynamic animated movements for specific obstacles
      if (obs.type === 'obstacle_truck') {
        const startX = obs.startX3d !== undefined ? obs.startX3d : -0.7;
        const targetX = obs.targetX3d !== undefined ? obs.targetX3d : 0.55;
        if (obs.z >= 0.75) {
          obs.x3d = startX;
        } else {
          // Smoothly swerve from opposite lane to player's lane as z decreases from 0.75 to 0.35
          const t = Phaser.Math.Clamp((0.75 - obs.z) / (0.75 - 0.35), 0, 1);
          const easeT = t * t * (3 - 2 * t); // smoothstep
          obs.x3d = startX + easeT * (targetX - startX);
        }
      } else if (obs.type === 'obstacle_vendor') {
        const startX = obs.startX3d !== undefined ? obs.startX3d : (obs.x3d < 0 ? -1.2 : 1.2);
        const targetX = obs.targetX3d !== undefined ? obs.targetX3d : (obs.x3d < 0 ? -0.4 : 0.4);
        if (obs.z >= 0.65) {
          obs.x3d = startX;
        } else {
          // Smoothly slide/roll from off-road onto the road as z decreases from 0.65 to 0.35
          const t = Phaser.Math.Clamp((0.65 - obs.z) / (0.65 - 0.35), 0, 1);
          const easeT = t * t * (3 - 2 * t); // smoothstep
          obs.x3d = startX + easeT * (targetX - startX);
        }
      }

      // Render obstacles in 3D
      const proj = this.project(obs.x3d, obs.z);
      obs.sprite.x = proj.x;
      obs.sprite.y = proj.y;
      if (obs.z > 1.0) {
        obs.sprite.setVisible(false);
      } else {
        obs.sprite.setVisible(true);
        obs.sprite.setScale(proj.scale);
        obs.sprite.setDepth(proj.y);
      }

      // Collision check (Adjusted Z-range to 0.05 - 0.14 to feel fairer)
      if (obs.z >= 0.05 && obs.z <= 0.14) {
        if (obs.type === 'traffic_scooter' || obs.type === 'traffic_car') {
          let colWidth = obs.type === 'traffic_scooter' ? 35 : 45;
          if (Math.abs(this.playerSprite.x - obs.sprite.x) < colWidth) {
            // Camera shake
            this.cameras.main.shake(150, 0.01);

            // Red flash tint feedback
            this.playerSprite.setTint(0xff3333);
            this.time.delayedCall(150, () => {
              this.playerSprite.clearTint();
            });

            // Synthesized sound
            try {
              const ctx = this.sound.context;
              if (window.gameSynth && ctx) {
                window.gameSynth.playHornCrash(ctx);
              }
            } catch(e){}

            // Deduct 5 coins
            this.loopState.coin = Math.max(0, this.loopState.coin - 5);
            LoopSystem.saveState(this.loopState);
            this.coinText.setText(`${this.loopState.coin} xu`);

            // Float text feedback
            const floatText = this.add.text(this.playerSprite.x, this.playerSprite.y - 60, '-5 xu / Va quẹt!', {
              fontFamily: "'Courier New', monospace",
              fontSize: '18px',
              color: '#ef4444',
              fontStyle: 'bold',
              stroke: '#020617',
              strokeThickness: 3
            }).setOrigin(0.5).setDepth(250).setScale(0.4);

            this.tweens.add({
              targets: floatText,
              scaleX: 1.0,
              scaleY: 1.0,
              duration: 180,
              ease: 'Back.easeOut'
            });
            this.tweens.add({
              targets: floatText,
              y: floatText.y - 70,
              alpha: 0,
              duration: 1000,
              ease: 'Sine.easeIn',
              delay: 100,
              onComplete: () => {
                floatText.destroy();
              }
            });

            obs.sprite.destroy();
            this.activeObstacles.splice(i, 1);
            continue;
          }
          // Bypass general obstacle collision block since this is same-direction traffic
          continue;
        }

        // Dynamic horizontal collision width based on obstacle size for premium arcade feel
        let colWidth = 50;
        if (obs.type === 'obstacle_truck') {
          colWidth = 80;
        } else if (obs.type === 'obstacle_vendor') {
          colWidth = 45;
        } else if (obs.type === 'obstacle_pothole' || obs.type === 'obstacle_puddle') {
          colWidth = 40;
        }

        if (Math.abs(this.playerSprite.x - obs.sprite.x) < colWidth) {
          if (!obs.isCheckpoint) {
            // Camera shake
            this.cameras.main.shake(150, 0.01);

            // Red flash tint feedback
            this.playerSprite.setTint(0xff3333);
            this.time.delayedCall(150, () => {
              this.playerSprite.clearTint();
            });

            // Synthesized sound
            try {
              const ctx = this.sound.context;
              if (window.gameSynth && ctx) {
                window.gameSynth.playHornCrash(ctx);
              }
            } catch(e){}

            // Wobble/near-crash tilt animation
            this.wobbleAngle = -20;
            this.tweens.add({
              targets: this,
              wobbleAngle: 20,
              duration: 90,
              yoyo: true,
              repeat: 1, // -20 -> 20 -> -20 -> 20 -> -20
              ease: 'Quad.easeInOut',
              onComplete: () => {
                this.tweens.add({
                  targets: this,
                  wobbleAngle: 0,
                  duration: 80,
                  ease: 'Quad.easeOut'
                });
              }
            });

            this.loopState.coin = Math.max(0, this.loopState.coin - 10);
            LoopSystem.saveState(this.loopState);
            this.coinText.setText(`${this.loopState.coin} xu`);

            const floatText = this.add.text(this.playerSprite.x, this.playerSprite.y - 60, '-10 xu', {
              fontFamily: "'Courier New', monospace",
              fontSize: '18px',
              color: '#ef4444',
              fontStyle: 'bold',
              stroke: '#020617',
              strokeThickness: 3
            }).setOrigin(0.5).setDepth(250).setScale(0.4);

            // Pop scale
            this.tweens.add({
              targets: floatText,
              scaleX: 1.1,
              scaleY: 1.1,
              duration: 180,
              ease: 'Back.easeOut',
              onComplete: () => {
                this.tweens.add({
                  targets: floatText,
                  scaleX: 1.0,
                  scaleY: 1.0,
                  duration: 120,
                  ease: 'Sine.easeInOut'
                });
              }
            });

            // Float up and fade
            this.tweens.add({
              targets: floatText,
              y: floatText.y - 70,
              alpha: 0,
              duration: 1000,
              ease: 'Sine.easeIn',
              delay: 100,
              onComplete: () => {
                floatText.destroy();
              }
            });

            obs.sprite.destroy();
            this.activeObstacles.splice(i, 1);
          } else {
            const cp = this.checkpoints.find(c => c.spot === obs.spot);
            if (cp) {
              cp.triggered = true;
            }
            this.triggerHalt(obs.spot);
            obs.sprite.destroy();
            this.activeObstacles.splice(i, 1);
          }
        }
      }
    }

    // Check checkpoints halts
    this.checkCheckpoints();

    // Render 2.5D road environment
    this.render3DRoad();
    this.updateScenery(dt);

    // Update highway signposts scrolling
    this.highwaySigns.forEach(sign => {
      const distToSign = sign.distance - this.distanceTravelled;
      const visibleRange = 200;
      
      if (distToSign > 0 && distToSign <= visibleRange) {
        sign.sprite.setVisible(true);
        const z3d = distToSign / visibleRange;
        const proj = this.project(-1.8, z3d);
        sign.sprite.x = proj.x;
        sign.sprite.y = proj.y;
        sign.sprite.setScale(proj.scale * 1.2);
        sign.sprite.setDepth(proj.y);
      } else {
        sign.sprite.setVisible(false);
      }
    });

    if (this.distanceTravelled >= this.distanceTarget - 100) {
      this.schoolGateSprite.setVisible(true);
      const distToGate = this.distanceTarget - this.distanceTravelled;
      const z3d = Math.max(0, distToGate) / 100;
      const proj = this.project(0.85, z3d);
      this.schoolGateSprite.x = proj.x;
      this.schoolGateSprite.y = proj.y;
      this.schoolGateSprite.setScale(proj.scale * 2.2);
      this.schoolGateSprite.setDepth(proj.y);
    } else {
      this.schoolGateSprite.setVisible(false);
    }

    this.updateHeadlights();

    // Rain scrolling
    if (this.isRainy) {
      this.updateRain(dt);
    }
  }

  spawnObstacle(spawner) {
    let texture = spawner.type;
    let x3d = spawner.x3d;
    let isCheckpoint = spawner.isCheckpoint || false;
    let spot = spawner.spot || null;
    let speed = undefined;

    if (spawner.type === 'minor') {
      texture = Math.random() < 0.5 ? 'obstacle_puddle' : 'obstacle_pothole';
      x3d = Math.random() < 0.5 ? -0.5 : 0.5;
    } else if (spawner.type === 'obstacle_traffic_scooter') {
      texture = 'traffic_scooter';
      x3d = Math.random() < 0.5 ? -0.4 : 0.4;
      speed = Phaser.Math.Between(35, 45);
    } else if (spawner.type === 'obstacle_traffic_car') {
      texture = 'traffic_car';
      x3d = Math.random() < 0.5 ? -0.4 : 0.4;
      speed = Phaser.Math.Between(35, 45);
    }

    const sprite = this.add.sprite(0, 0, texture);
    sprite.setOrigin(0.5, 1.0);
    sprite.setVisible(false);

    let startX3d = x3d;
    let targetX3d = x3d;

    if (texture === 'obstacle_truck') {
      startX3d = -0.7;
      targetX3d = 0.55;
      x3d = startX3d;
    } else if (texture === 'obstacle_vendor') {
      startX3d = x3d < 0 ? -1.2 : 1.2;
      targetX3d = x3d < 0 ? -0.4 : 0.4;
      x3d = startX3d;
    }

    this.activeObstacles.push({
      x3d: x3d,
      startX3d: startX3d,
      targetX3d: targetX3d,
      z: 1.0,
      type: texture,
      sprite: sprite,
      isCheckpoint: isCheckpoint,
      spot: spot,
      speed: speed
    });
  }

  checkCheckpoints() {
    this.checkpoints.forEach(cp => {
      if (this.distanceTravelled >= cp.distance && !cp.triggered) {
        cp.triggered = true;
        
        // Find the corresponding obstacle and set triggeredDialogue to true
        const cpObs = this.activeObstacles.find(obs => obs.spot === cp.spot);
        if (cpObs) {
          cpObs.triggeredDialogue = true;
        }

        // Destroy and remove all OTHER obstacles that do NOT match this checkpoint's spot
        for (let i = this.activeObstacles.length - 1; i >= 0; i--) {
          const obs = this.activeObstacles[i];
          if (obs.spot !== cp.spot) {
            if (obs.sprite) {
              obs.sprite.destroy();
            }
            this.activeObstacles.splice(i, 1);
          }
        }

        this.isPaused = true;
        this.speed = 0;
        this.targetSpeed = 0;
        this.showWarningExclamation();
        this.time.delayedCall(450, () => {
          this.triggerHalt(cp.spot);
        });
      }
    });
  }

  triggerHalt(spot) {
    let promptText = "";
    let choices = [];

    if (spot === 'hem_nho') {
      promptText = "HẺM NHỎ TRƠN TRƯỢT: Con hẻm nhỏ hẹp u ám sau trận mưa đêm. Bất thình lình, một vũng nước sâu hoắm, bên dưới là ổ gà lớn ngập bùn đất hiện ra ngay trước bánh xe của bạn!";
      choices = [
        {
          text: "Dậm phanh, dắt bộ cẩn thận qua đoạn ổ gà (Chọn An Toàn)",
          choiceId: "safe",
          resultText: "Bạn dạt xe vào rìa tường ẩm mốc, kiên nhẫn dắt bộ qua. Dù xích xe kêu lạch cạch đầy lo ngại, bạn vẫn vượt qua đoạn ổ gà nguy hiểm an toàn!"
        },
        {
          text: "Vít ga phóng vèo qua để tiết kiệm thời gian (Chọn Nguy Hiểm)",
          choiceId: "danger",
          resultText: "RẦM! Xe rơi tự do xuống ổ gà ngập nước bẩn. Lực va chạm mạnh bẻ cong vành xe, xích tuột bánh chao đảo, người bạn văng mạnh xuống đường đất ẩm ướt!"
        }
      ];
    } else if (spot === 'cho_sang') {
      promptText = "CHỢ SÁNG HỖN LOẠN: Tiếng người mua bán ồn ào chen chúc. Giữa đám đông, một chiếc xe đẩy chở đầy sọt hoa quả nặng nề bất ngờ mất kiểm soát lùi thẳng ra đường, tạo nên một chướng ngại vật nguy hiểm!";
      choices = [
        {
          text: "Bóp phanh, nhường đường lách qua từ từ (Chọn An Toàn)",
          choiceId: "safe",
          resultText: "Bạn nhấp phanh lùi lại, cúi đầu chào lịch sự. Người bán hàng kéo xe sang một bên nhường lối. Dù yếm xe có quẹt xước nhẹ vào thúng tre, bạn vẫn bình an vô sự."
        },
        {
          text: "Tăng ga lách qua đám đông một cách nhanh chóng (Chọn Nguy Hiểm)",
          choiceId: "danger",
          resultText: "RẦM! Bạn va chạm cực mạnh với xe chở hoa quả. Hàng loạt sọt trái cây đổ nhào rơi vãi khắp đường. Bạn ngã nhào vào sọt hàng tre sắc nhọn trầy xước khắp người, yếm xe vỡ nát tan tành!"
        }
      ];
    } else if (spot === 'nga_tu') {
      promptText = "NGÃ TƯ ĐÔNG ĐÚC: Đèn giao thông vừa chuyển sang màu vàng báo hiệu. Phía bên kia giao lộ, tiếng gầm rú từ chiếc xe tải ben lớn lấn làn đang tăng tốc cố vượt qua giao lộ lao thẳng về phía bạn!";
      choices = [
        {
          text: "Tập sát lề, phanh đứng chờ xe tải đi qua (Chọn An Toàn)",
          choiceId: "safe",
          resultText: "Bạn tấp xe sát vỉa hè, khóa chặt phanh chân. Chiếc xe tải ben rít còi quét qua sát sạt, luồng gió mạnh chực chờ hất tung bạn xuống đường. Xe Cub rung bần bật, kính chiếu hậu nứt toác nhưng mạng sống vẫn còn giữ được!"
        },
        {
          text: "Vít kịch ga, cố đánh cược vượt qua trước xe tải (Chọn Nguy Hiểm)",
          choiceId: "danger",
          resultText: "RẦM... ĐẤT TRỜI CHAO ĐẢO! Đầu xe Cub nát bét dưới gầm sắt. Bạn bị hất văng hàng chục mét trên đường nhựa nóng rát, chấn thương nghiêm trọng, tầm nhìn tối sầm lại trong đau đớn!"
        }
      ];
    } else if (spot === 'cong_truong') {
      promptText = "CÔNG TRƯỜNG MÙ CÁT: Gió bão cát cuộn tròn hung hãn từ công trường đang thi công dội thẳng vào mặt. Phía trước, một bãi cát sạt lở dày đặc chắn lối, trơn trượt như băng!";
      choices = [
        {
          text: "Rà phanh giảm tốc, bò chậm rãi qua dải đất sạch (Chọn An Toàn)",
          choiceId: "safe",
          resultText: "Bạn bình tĩnh bóp nhả phanh, ghìm chặt tay lái bò chậm qua dải đất ven rìa. Lốp xe lún sâu dưới cát mịn đầy khó khăn nhưng vẫn bám đường tốt, đưa bạn vượt qua bão cát."
        },
        {
          text: "Rồ ga phóng hết cỡ vượt qua đống cát (Chọn Nguy Hiểm)",
          choiceId: "danger",
          resultText: "VÙUU... XOÈ! Bánh sau xe trượt dài vô định trên nền cát mịn. Chiếc xe Cub văng đi xa, bạn ngã vật xuống đường, cát bụi chui vào mắt mũi tê tái!"
        }
      ];
    }

    this.dialogSystem.startChoice(promptText, choices, (choice) => {
      // Resolve using EventResolver
      const report = EventResolver.resolveEvent(spot, choice.choiceId, this.loopState);
      
      // Save state immediately
      LoopSystem.saveState(this.loopState);
      
      // Update HUD coin
      this.coinText.setText(`${this.loopState.coin} xu`);

      if (choice.choiceId === 'safe') {
        this.isPaused = true;

        // Show green text 'LÁI XE AN TOÀN! (+10 xu)' floating up
        const safeText = this.add.text(this.playerSprite.x, this.playerSprite.y - 60, 'LÁI XE AN TOÀN! (+10 xu)', {
          fontFamily: "'Courier New', monospace",
          fontSize: '18px',
          color: '#10b981',
          fontStyle: 'bold',
          stroke: '#020617',
          strokeThickness: 3
        }).setOrigin(0.5).setDepth(250);

        this.tweens.add({
          targets: safeText,
          y: safeText.y - 50,
          alpha: 0,
          duration: 1000,
          onComplete: () => {
            safeText.destroy();
          }
        });

        // Dodge tween: tween playerX to side and back, holding for 200ms
        const width = this.cameras.main.width;
        const targetOffset = (this.playerX >= width / 2) ? -90 : 90;
        const startX = this.playerX;
        
        this.tweens.add({
          targets: this,
          playerX: startX + targetOffset,
          duration: 250,
          ease: 'Cubic.easeOut',
          onComplete: () => {
            this.time.delayedCall(200, () => {
              this.tweens.add({
                targets: this,
                playerX: startX,
                duration: 250,
                ease: 'Cubic.easeInOut',
                onComplete: () => {
                  this.isPaused = false;
                }
              });
            });
          }
        });
      } else {
        // Danger choice: play crash feedback first, then show invoice
        this.playCrashFeedback(() => {
          this.showAccidentInvoice(report);
        });
      }
    });
  }

  showAccidentInvoice(report) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const invoice = this.add.container(width / 2, height / 2).setDepth(3000);

    const w = 720;
    const h = 440;
    const bg = this.add.graphics();
    bg.fillStyle(0x020617, 0.98); // Dark slate
    bg.fillRoundedRect(-w/2, -h/2, w, h, 12);
    bg.lineStyle(3, report.newCoin <= 0 ? 0xef4444 : 0x10b981, 1.0); // Red if bankrupt, green otherwise
    bg.strokeRoundedRect(-w/2, -h/2, w, h, 12);
    invoice.add(bg);

    const titleStr = report.newCoin <= 0 ? "BẢN KÊ KHAI BỊ NỢ TÀI CHÍNH" : "PHIẾU THANH TOÁN TAI NẠN";
    const titleColor = report.newCoin <= 0 ? "#ef4444" : "#10b981";

    const title = this.add.text(0, -190, titleStr, {
      fontFamily: "'Courier New', monospace",
      fontSize: '24px',
      fontStyle: 'bold',
      color: titleColor
    }).setOrigin(0.5);

    // Accident description
    const descText = this.add.text(0, -145, report.description, {
      fontFamily: "'Courier New', monospace",
      fontSize: '16px',
      color: '#e2e8f0',
      lineSpacing: 5,
      align: 'center',
      wordWrap: { width: 660, useAdvancedWrap: true }
    }).setOrigin(0.5, 0);

    // Resolve insurance package name
    let insName = "Không tham gia";
    if (report.insuranceApplied === 'red_helmet') insName = "Gói Mũ Đỏ (BH Y tế)";
    else if (report.insuranceApplied === 'old_bike') insName = "Gói Xe Cũ (BH Sửa xe)";
    else if (report.insuranceApplied === 'school_route') insName = "Gói Đường Đến Trường (BH Toàn diện)";

    // Compile line details
    const lines = [
      `Tổn thất y tế:    ${report.baseMedical} xu (Giảm do mũ: -${report.itemMedicalReduction} xu)`,
      `Tổn thất sửa xe:  ${report.baseRepair} xu (Giảm do xe kỹ: -${report.itemRepairReduction} xu)`,
      `Bảo hiểm:         ${insName}`,
      `Đền bù bảo hiểm:  +${report.coveredMedical + report.coveredRepair} xu`,
      `----------------------------------------------------`,
      `Khấu trừ ví:      -${report.netCost} xu`,
      `Số dư ví:         ${report.newCoin} xu`
    ];

    const details = this.add.text(-310, -60, lines.join('\n'), {
      fontFamily: "'Courier New', monospace",
      fontSize: '15px',
      color: '#cbd5e1',
      lineSpacing: 6,
      align: 'left',
      wordWrap: { width: 620, useAdvancedWrap: true }
    }).setOrigin(0, 0);

    // Rounded "BẢO HIỂM HỌC ĐƯỜNG - BÀI HỌC GIÁO DỤC" insight box
    const insightBg = this.add.graphics();
    insightBg.fillStyle(0x0f172a, 1.0); // darker slate background
    insightBg.fillRoundedRect(-330, 95, 660, 70, 8);
    
    const hasInsurance = report.insuranceApplied && report.insuranceApplied !== 'none';
    const borderColor = hasInsurance ? 0x10b981 : 0xf59e0b; // Green if insurance applied, Amber warning color if no insurance
    insightBg.lineStyle(1.5, borderColor, 0.85);
    insightBg.strokeRoundedRect(-330, 95, 660, 70, 8);

    let lessonText = "";
    const savedCoins = report.coveredMedical + report.coveredRepair;
    if (!hasInsurance) {
      lessonText = "💡 BÀI HỌC TÀI CHÍNH: Do không tham gia bảo hiểm, bạn phải tự gánh chịu 100% chi phí tai nạn. Khi rủi ro lớn xảy ra, việc thiếu lá chắn bảo vệ tài chính này sẽ khiến bạn nhanh chóng rơi vào cảnh cạn kiệt nguồn lực và nợ nần!";
    } else if (savedCoins > 0) {
      lessonText = `💡 BÀI HỌC TÀI CHÍNH: Nhờ tham gia bảo hiểm, bạn đã được chi trả ${savedCoins} xu tổn thất! Bảo hiểm chính là lá chắn bảo vệ tài chính đắc lực, giúp bạn giảm thiểu tối đa thiệt hại tự chi trả ngoài dự kiến khi gặp rủi ro tai nạn.`;
    } else {
      lessonText = `💡 BÀI HỌC TÀI CHÍNH: Gói bảo hiểm hiện tại của bạn không bao phủ loại tổn thất này. Điều này nhắc nhở chúng ta cần lựa chọn gói bảo hiểm toàn diện (như Gói Đường Đến Trường) để được bảo vệ đầy đủ trước mọi rủi ro tài chính!`;
    }

    const insightText = this.add.text(-320, 103, lessonText, {
      fontFamily: "'Courier New', monospace",
      fontSize: '12.5px',
      color: hasInsurance ? '#a7f3d0' : '#fef3c7',
      lineSpacing: 4,
      align: 'left',
      wordWrap: { width: 640, useAdvancedWrap: true }
    }).setOrigin(0, 0);

    const clickPrompt = this.add.text(0, 195, "(Nhấp chuột vào màn hình để tiếp tục)", {
      fontFamily: "'Courier New', monospace",
      fontSize: '14px',
      color: '#64748b'
    }).setOrigin(0.5);

    invoice.add([title, descText, details, insightBg, insightText, clickPrompt]);

    this.time.delayedCall(200, () => {
      this.input.once('pointerdown', () => {
        invoice.destroy();
        
        // If bankrupt (coin <= 0), trigger Ending 1 reset
        if (this.loopState.coin <= 0) {
          this.isGameOver = true;
          this.cameras.main.fadeOut(500);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.stopEngineHum();
            this.scene.start('ResultScene', { state: this.loopState, outcome: 'BANKRUPT' });
          });
        } else {
          // Resume driving
          this.isPaused = false;
        }
      });
    });
  }

  // 2.5D Road math projections
  project(x3d, z3d) {
    const horizonY = 220;
    const bottomY = 530;
    const horizonW = 80;
    const bottomW = 520;
    const width = this.cameras.main.width;

    const scale = 0.15 + (1.0 - z3d) * 0.85;
    const currentY = horizonY + (bottomY - horizonY) * (1.0 - z3d);
    const currentW = horizonW + (bottomW - horizonW) * (1.0 - z3d);
    const screenX = width / 2 + x3d * (currentW * 0.42);

    return { x: screenX, y: currentY, scale: scale };
  }

  render3DRoad() {
    const width = this.cameras.main.width;
    const horizonY = 220;
    const bottomY = 530;
    const horizonW = 80;
    const bottomW = 520;

    this.roadGraphics.clear();

    // Side grass
    const grassColor = this.loopState.horrorLevel >= 3 ? 0x220202 : 0x064e3b;
    this.roadGraphics.fillStyle(grassColor, 1);
    this.roadGraphics.fillRect(0, horizonY, width, bottomY - horizonY + 50);

    // Horizon fog gradient shadow
    this.roadGraphics.fillStyle(this.loopState.horrorLevel >= 3 ? 0x110202 : 0x020617, 0.7);
    this.roadGraphics.fillRect(0, horizonY, width, 40);

    // Asphalt road body
    this.roadGraphics.fillStyle(0x1e293b, 1);
    this.roadGraphics.beginPath();
    this.roadGraphics.moveTo(width / 2 - horizonW / 2, horizonY);
    this.roadGraphics.lineTo(width / 2 + horizonW / 2, horizonY);
    this.roadGraphics.lineTo(width / 2 + bottomW / 2, bottomY);
    this.roadGraphics.lineTo(width / 2 - bottomW / 2, bottomY);
    this.roadGraphics.closePath();
    this.roadGraphics.fill();

    // White solid side borders on the left and right edges
    this.roadGraphics.lineStyle(3, 0xffffff, 0.7);
    this.roadGraphics.beginPath();
    // Left border
    this.roadGraphics.moveTo(width / 2 - horizonW / 2, horizonY);
    this.roadGraphics.lineTo(width / 2 - bottomW / 2, bottomY);
    // Right border
    this.roadGraphics.moveTo(width / 2 + horizonW / 2, horizonY);
    this.roadGraphics.lineTo(width / 2 + bottomW / 2, bottomY);
    this.roadGraphics.strokePath();

    // White dashed center lane lines in 3D perspective
    const dashScroll = (this.roadScroll * 0.5) % 0.15;
    for (let zVal = 0.05; zVal <= 1.1; zVal += 0.15) {
      let z = zVal - dashScroll;
      if (z < 0.0 || z > 1.0) continue;

      const pStart = this.project(0.0, z);
      const pEnd = this.project(0.0, z + 0.05);

      const wStart = 2 * pStart.scale;
      const wEnd = 2 * pEnd.scale;

      this.roadGraphics.fillStyle(0xffffff, 0.8);
      this.roadGraphics.beginPath();
      this.roadGraphics.moveTo(pStart.x - wStart / 2, pStart.y);
      this.roadGraphics.lineTo(pStart.x + wStart / 2, pStart.y);
      this.roadGraphics.lineTo(pEnd.x + wEnd / 2, pEnd.y);
      this.roadGraphics.lineTo(pEnd.x - wEnd / 2, pEnd.y);
      this.roadGraphics.closePath();
      this.roadGraphics.fill();
    }

    // Checkered finish line (vạch đích) at target distance
    if (this.distanceTravelled >= this.distanceTarget - 100) {
      const distToSchool = this.distanceTarget - this.distanceTravelled;
      const zNorm = Math.max(0, distToSchool) / 100; // 1.0 (horizon) to 0.0 (bottom)
      
      if (zNorm >= 0 && zNorm <= 1.0) {
        // Draw 2 rows of checks
        const zRows = [zNorm, zNorm + 0.02, zNorm + 0.04];
        const cols = 12;
        for (let r = 0; r < 2; r++) {
          const z1 = zRows[r];
          const z2 = zRows[r + 1];
          if (z1 > 1.0) continue;
          
          const y1 = horizonY + (bottomY - horizonY) * (1.0 - z1);
          const w1 = horizonW + (bottomW - horizonW) * (1.0 - z1);
          const y2 = horizonY + (bottomY - horizonY) * (1.0 - z2);
          const w2 = horizonW + (bottomW - horizonW) * (1.0 - z2);
          
          for (let col = 0; col < cols; col++) {
            const isWhite = (r + col) % 2 === 0;
            this.roadGraphics.fillStyle(isWhite ? 0xf8fafc : 0x0f172a, 0.95);
            
            const x1a = width / 2 - w1 / 2 + w1 * (col / cols);
            const x1b = width / 2 - w1 / 2 + w1 * ((col + 1) / cols);
            const x2a = width / 2 - w2 / 2 + w2 * (col / cols);
            const x2b = width / 2 - w2 / 2 + w2 * ((col + 1) / cols);
            
            this.roadGraphics.beginPath();
            this.roadGraphics.moveTo(x1a, y1);
            this.roadGraphics.lineTo(x1b, y1);
            this.roadGraphics.lineTo(x2b, y2);
            this.roadGraphics.lineTo(x2a, y2);
            this.roadGraphics.closePath();
            this.roadGraphics.fill();
          }
        }
      }
    }

    // Muted side rumble strips and center gold dashed lines
    const stripeSegmentCount = 10;
    const baseScroll = this.roadScroll % 2.0;

    for (let i = 0; i < stripeSegmentCount; i++) {
      const zNorm = ((i + baseScroll) / stripeSegmentCount) % 1.0;
      const currentY = horizonY + (bottomY - horizonY) * (1 - zNorm);
      const currentW = horizonW + (bottomW - horizonW) * (1 - zNorm);
      const sideW = Math.max(2, 10 * (1 - zNorm));

      const isOdd = Math.floor(i + this.roadScroll) % 2 === 0;
      const stripeColor = isOdd ? 0x991b1b : 0x475569; // Red and gray

      this.roadGraphics.fillStyle(stripeColor, 0.8);
      // Left rumble line
      this.roadGraphics.fillRect(width / 2 - currentW / 2 - sideW, currentY, sideW, 4);
      // Right rumble line
      this.roadGraphics.fillRect(width / 2 + currentW / 2, currentY, sideW, 4);
    }
  }

  updateScenery(dt) {
    const width = this.cameras.main.width;
    const horizonY = 220;
    const bottomY = 530;
    const horizonW = 80;
    const bottomW = 520;

    this.sceneryList.forEach(light => {
      const relSpeed = this.speed / 100;
      light.z -= 0.16 * relSpeed * dt;
      if (light.z < 0.0) {
        light.z += 1.0;
      }

      const zNorm = light.z;
      const scale = 0.15 + (1.0 - zNorm) * 0.85;
      const currentY = horizonY + (bottomY - horizonY) * (1.0 - zNorm);
      const currentW = horizonW + (bottomW - horizonW) * (1.0 - zNorm);
      const screenX = width / 2 + light.side * 1.35 * (currentW * 0.42);

      const postH = 100 * scale;

      // Draw light post line (dark color)
      this.roadGraphics.lineStyle(2 * scale + 0.5, 0x0f172a, 0.9);
      this.roadGraphics.lineBetween(screenX, currentY, screenX, currentY - postH);

      // Arm towards road
      this.roadGraphics.lineBetween(screenX, currentY - postH, screenX - light.side * 16 * scale, currentY - postH + 3 * scale);

      const bulbX = screenX - light.side * 16 * scale;
      const bulbY = currentY - postH + 3 * scale;

      // Glow yellow
      this.roadGraphics.fillStyle(0xeab308, 0.1);
      this.roadGraphics.beginPath();
      this.roadGraphics.arc(bulbX, bulbY, 32 * scale, 0, Math.PI * 2);
      this.roadGraphics.fill();

      // Yellow light core bulb
      this.roadGraphics.fillStyle(0xfef08a, 0.7);
      this.roadGraphics.beginPath();
      this.roadGraphics.arc(bulbX, bulbY, 2.5 * scale + 1, 0, Math.PI * 2);
      this.roadGraphics.fill();
    });
  }

  updateHeadlights() {
    this.headlightGraphics.clear();
    // Headlight yellow light cone
    this.headlightGraphics.fillStyle(0xfef08a, 0.1);
    this.headlightGraphics.beginPath();
    this.headlightGraphics.moveTo(this.playerSprite.x, this.playerSprite.y - 12);
    this.headlightGraphics.lineTo(this.playerSprite.x - 140, 260);
    this.headlightGraphics.lineTo(this.playerSprite.x + 140, 260);
    this.headlightGraphics.closePath();
    this.headlightGraphics.fill();
  }

  updateRain(dt) {
    this.rainGraphics.clear();
    this.rainGraphics.lineStyle(1.5, 0x475569, 0.25); // wet dark blue rain drops

    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    this.rainParticles.forEach(p => {
      this.rainGraphics.lineBetween(p.x, p.y, p.x - 4, p.y + p.length);
      p.y += p.speed * dt;
      p.x -= p.speed * 0.12 * dt;

      if (p.y > h) {
        p.y = -20;
        p.x = Phaser.Math.Between(0, w);
      }
    });
  }

  startEngineHum() {
    try {
      const ctx = this.sound.context;
      if (!ctx || ctx.state === 'suspended') return;
      
      this.engineOsc = ctx.createOscillator();
      this.engineGain = ctx.createGain();
      
      this.engineOsc.type = 'triangle';
      this.engineOsc.frequency.setValueAtTime(60, ctx.currentTime);
      
      this.engineGain.gain.setValueAtTime(0.015, ctx.currentTime);
      
      this.engineOsc.connect(this.engineGain);
      this.engineGain.connect(ctx.destination);
      
      this.engineOsc.start(ctx.currentTime);
      this.engineSoundActive = true;
    } catch (e) {
      console.error("Failed to start engine hum:", e);
    }
  }

  stopEngineHum() {
    try {
      if (this.engineOsc) {
        this.engineOsc.stop();
        this.engineOsc.disconnect();
        this.engineOsc = null;
      }
      if (this.engineGain) {
        this.engineGain.disconnect();
        this.engineGain = null;
      }
      this.engineSoundActive = false;
    } catch (e) {}
  }

  showWarningExclamation() {
    const warning = this.add.text(this.playerSprite.x, this.playerSprite.y - 80, '⚠ NGUY HIỂM!', {
      fontFamily: "'Courier New', monospace",
      fontSize: '20px',
      color: '#ef4444',
      fontStyle: 'bold',
      stroke: '#ffffff',
      strokeThickness: 3,
      shadow: { color: '#000000', fill: true, blur: 5 }
    }).setOrigin(0.5).setDepth(2000).setScale(0);

    // Alert chime
    try {
      const ctx = this.sound.context;
      if (window.gameSynth && ctx) {
        window.gameSynth.playClickBeep(ctx);
      }
    } catch(e){}

    this.tweens.add({
      targets: warning,
      scaleX: 1.2,
      scaleY: 1.2,
      y: warning.y - 15,
      duration: 250,
      ease: 'Back.easeOut',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        warning.destroy();
      }
    });
  }

  playCrashFeedback(onComplete) {
    // Flash screen red
    this.cameras.main.flash(200, 255, 0, 0, false);

    // Flash player red on collision
    if (this.playerSprite) {
      this.playerSprite.setTint(0xff3333);
      this.time.delayedCall(150, () => {
        this.playerSprite.clearTint();
      });
    }

    // Wobble/near-crash tilt animation
    this.wobbleAngle = -22;
    this.tweens.add({
      targets: this,
      wobbleAngle: 22,
      duration: 90,
      yoyo: true,
      repeat: 2,
      ease: 'Quad.easeInOut',
      onComplete: () => {
        this.tweens.add({
          targets: this,
          wobbleAngle: 0,
          duration: 80,
          ease: 'Quad.easeOut',
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });
    
    // Play horn/crash warning sound
    try {
      const ctx = this.sound.context;
      if (window.gameSynth && ctx) {
        window.gameSynth.playHornCrash(ctx);
      }
    } catch(e){}

    // Screen shakes
    this.cameras.main.shake(250, 0.015);
  }
}
