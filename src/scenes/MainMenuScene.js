import Phaser from 'phaser';
import { LoopSystem } from '../systems/LoopSystem.js';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create() {
    this.loopState = LoopSystem.loadState();
    const hasExistingSave = this.loopState && this.loopState.loopCount > 1;

    // 1. Play intro chime
    this.playIntroSound();

    // 2. Synthesize clock ticking sound
    this.tickTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        try {
          const ctx = this.sound.context;
          if (window.gameSynth && ctx) {
            window.gameSynth.playClockTick(ctx);
          }
        } catch (e) {}
      },
      loop: true
    });

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 3. Warm, bright morning sunrise background
    this.add.graphics()
      .fillGradientStyle(0xffd166, 0xffd166, 0xfefae0, 0xfefae0, 1)
      .fillRect(0, 0, width, height);

    // Muted grid lines (warm brown tint)
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x8c5e3c, 0.08);
    for (let x = 0; x < width; x += 40) grid.lineBetween(x, 0, x, height);
    for (let y = 0; y < height; y += 40) grid.lineBetween(0, y, width, y);

    // Sun dust particles floating
    this.sunParticles = [];
    this.sunGraphics = this.add.graphics();
    for (let i = 0; i < 35; i++) {
      this.sunParticles.push({
        x: Phaser.Math.Between(0, width),
        y: Phaser.Math.Between(0, height),
        radius: Phaser.Math.FloatBetween(2, 6),
        alpha: Phaser.Math.FloatBetween(0.15, 0.45),
        speedY: Phaser.Math.Between(15, 40),
        driftX: Phaser.Math.FloatBetween(-5, 5),
        driftTime: Phaser.Math.FloatBetween(0, 100)
      });
    }

    // 4. Title: "7 GIỜ KÉM 10" in cozy sunset glow
    this.titleText = this.add.text(width / 2, 130, '7 GIỜ KÉM 10', {
      fontFamily: "'Courier New', monospace",
      fontSize: '64px',
      color: '#4a2c11',
      fontStyle: 'bold',
      stroke: '#faf6e3',
      strokeThickness: 4,
      shadow: {
        color: '#d4a373',
        blur: 10,
        stroke: true,
        fill: true
      }
    }).setOrigin(0.5);

    // Subtle breathing animation for title
    this.tweens.add({
      targets: this.titleText,
      scaleX: 1.02,
      scaleY: 1.02,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.subtitleText = this.add.text(width / 2, 195, 'VÒNG LẶP ĐƯỜNG ĐẾN TRƯỜNG - KỲ ẢO ẤM ÁP', {
      fontFamily: "'Courier New', monospace",
      fontSize: '14px',
      color: '#8c5e3c',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Decorative road silhouette at bottom
    this.add.graphics()
      .fillStyle(0x8c5e3c, 1)
      .fillRect(0, height - 120, width, 4)
      .fillStyle(0xf5ebe0, 0.8)
      .fillRect(0, height - 116, width, 60);

    this.roadStripes = [];
    for (let i = 0; i < 12; i++) {
      const stripe = this.add.graphics()
        .fillStyle(0x8c5e3c, 0.3)
        .fillRect(i * 120, height - 90, 50, 4);
      this.roadStripes.push(stripe);
    }

    // Generate custom textures for the title screen animation
    const drawShadow = (ctx, x, y, rx, ry) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fill();
    };

    const drawWheel = (ctx, cx, cy, rx, ry, tilt, spokeAngle) => {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, tilt, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Spokes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      const numSpokes = 5;
      for (let i = 0; i < numSpokes; i++) {
        const theta = spokeAngle + (i * Math.PI * 2 / numSpokes);
        const x = rx * Math.cos(theta);
        const y = ry * Math.sin(theta);
        
        // Rotate by tilt
        const rotX = x * Math.cos(tilt) - y * Math.sin(tilt);
        const rotY = x * Math.sin(tilt) + y * Math.cos(tilt);
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + rotX, cy + rotY);
        ctx.stroke();
      }
      
      // Center cap
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx * 0.25, ry * 0.25, tilt, 0, Math.PI * 2);
      ctx.fill();
    };

    // Helper to draw a pixel-perfect filled circle
    const drawPixelCircle = (ctx, cx, cy, r, color) => {
      ctx.fillStyle = color;
      for (let y = -r; y <= r; y++) {
        for (let x = -r; x <= r; x++) {
          if (x * x + y * y <= r * r) {
            ctx.fillRect(cx + x, cy + y, 1, 1);
          }
        }
      }
    };

    // 1. Wheels frame 0 (horizontal/vertical spokes)
    this.createCanvasTexture('title_wheel_0', 128, 80, (ctx, w, h) => {
      // Rear wheel (near x=28,y=58, radius 10)
      drawPixelCircle(ctx, 28, 58, 10, '#1e293b'); // tire
      drawPixelCircle(ctx, 28, 58, 7, '#cbd5e1');  // chrome rim
      drawPixelCircle(ctx, 28, 58, 5, '#111827');  // spokes area
      ctx.strokeStyle = '#64748b'; // spokes
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(28, 53); ctx.lineTo(28, 63);
      ctx.moveTo(23, 58); ctx.lineTo(33, 58);
      ctx.stroke();
      drawPixelCircle(ctx, 28, 58, 2, '#475569');  // center hub

      // Front wheel (near x=92,y=58, radius 10)
      drawPixelCircle(ctx, 92, 58, 10, '#1e293b'); // tire
      drawPixelCircle(ctx, 92, 58, 7, '#cbd5e1');  // chrome rim
      drawPixelCircle(ctx, 92, 58, 5, '#111827');  // spokes area
      ctx.strokeStyle = '#64748b'; // spokes
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(92, 53); ctx.lineTo(92, 63);
      ctx.moveTo(87, 58); ctx.lineTo(97, 58);
      ctx.stroke();
      drawPixelCircle(ctx, 92, 58, 2, '#475569');  // center hub
    });

    // 2. Wheels frame 1 (diagonal spokes)
    this.createCanvasTexture('title_wheel_1', 128, 80, (ctx, w, h) => {
      // Rear wheel (near x=28,y=58, radius 10)
      drawPixelCircle(ctx, 28, 58, 10, '#1e293b'); // tire
      drawPixelCircle(ctx, 28, 58, 7, '#cbd5e1');  // chrome rim
      drawPixelCircle(ctx, 28, 58, 5, '#111827');  // spokes area
      ctx.strokeStyle = '#64748b'; // spokes
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(28 - 4, 58 - 4); ctx.lineTo(28 + 4, 58 + 4);
      ctx.moveTo(28 - 4, 58 + 4); ctx.lineTo(28 + 4, 58 - 4);
      ctx.stroke();
      drawPixelCircle(ctx, 28, 58, 2, '#475569');  // center hub

      // Front wheel (near x=92,y=58, radius 10)
      drawPixelCircle(ctx, 92, 58, 10, '#1e293b'); // tire
      drawPixelCircle(ctx, 92, 58, 7, '#cbd5e1');  // chrome rim
      drawPixelCircle(ctx, 92, 58, 5, '#111827');  // spokes area
      ctx.strokeStyle = '#64748b'; // spokes
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(92 - 4, 58 - 4); ctx.lineTo(92 + 4, 58 + 4);
      ctx.moveTo(92 - 4, 58 + 4); ctx.lineTo(92 + 4, 58 - 4);
      ctx.stroke();
      drawPixelCircle(ctx, 92, 58, 2, '#475569');  // center hub
    });

    // 3. Shadow
    this.createCanvasTexture('title_shadow', 128, 80, (ctx, w, h) => {
      ctx.beginPath();
      ctx.ellipse(w/2 - 4, 69, 50, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fill();
    });

    // 4. Motorbike Body (chassis, seat, exhaust, handlebars, headlight)
    this.createCanvasTexture('title_motorbike_body', 128, 80, (ctx, w, h) => {
      // A. Shadow
      ctx.beginPath();
      ctx.ellipse(w/2 - 4, 69, 50, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fill();

      // Front fork (metal shock absorber, behind fender)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(92, 58);
      ctx.lineTo(84, 28);
      ctx.stroke();

      // Main U-shaped step-through red frame
      ctx.fillStyle = '#dc2626'; // Cub Red
      ctx.beginPath();
      ctx.moveTo(32, 42); // under rear rack
      ctx.lineTo(44, 42); // under seat
      ctx.quadraticCurveTo(56, 56, 76, 52); // low step-through curve
      ctx.lineTo(62, 58); // engine bottom
      ctx.lineTo(36, 52); // rear swingarm
      ctx.closePath();
      ctx.fill();

      // Frame highlight
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(34, 44);
      ctx.lineTo(44, 44);
      ctx.quadraticCurveTo(55, 54, 72, 51);
      ctx.stroke();

      // Engine block (small 50cc grey engine)
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(52, 52, 14, 10);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(54, 54, 10, 2);
      ctx.fillRect(54, 58, 10, 2);

      // Rear fender & Front fender
      // Curved rear mudguard hugging tire
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(16, 56);
      ctx.quadraticCurveTo(16, 42, 32, 42);
      ctx.lineTo(34, 46);
      ctx.quadraticCurveTo(22, 46, 20, 56);
      ctx.closePath();
      ctx.fill();

      // Front fender
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(82, 52);
      ctx.quadraticCurveTo(92, 42, 102, 50);
      ctx.lineTo(100, 53);
      ctx.quadraticCurveTo(92, 46, 84, 54);
      ctx.closePath();
      ctx.fill();

      // Split seat design: front black pad, rear chrome rack
      // Front seat (black pad)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(44, 34, 22, 7);
      
      // Rear luggage rack (chrome rack)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(20, 39, 20, 3);
      ctx.beginPath();
      ctx.moveTo(25, 39); ctx.lineTo(25, 42);
      ctx.moveTo(30, 39); ctx.lineTo(30, 42);
      ctx.moveTo(35, 39); ctx.lineTo(35, 42);
      ctx.stroke();

      // Front fairing / White Leg Shield (yếm trắng - vertical & curved)
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(76, 24);
      ctx.lineTo(84, 24);
      ctx.lineTo(89, 54);
      ctx.lineTo(76, 54);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(76, 24, 8, 30);

      // Handlebars (higher, upright stance)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(80, 26);
      ctx.lineTo(76, 14);
      ctx.stroke();

      ctx.fillStyle = '#0f172a'; // grips
      ctx.fillRect(73, 12, 6, 3);

      // Round mirror
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(76, 14);
      ctx.lineTo(72, 8);
      ctx.stroke();
      ctx.fillStyle = '#cbd5e1'; // mirror back
      ctx.beginPath();
      ctx.arc(71, 7, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e2e8f0'; // reflection surface
      ctx.beginPath();
      ctx.arc(71, 7, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Round headlight at front of handlebars
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(79, 17, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Exhaust pipe (completely horizontal straight chrome tube)
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(20, 56, 44, 4);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(20, 56, 44, 4);
      // exhaust tip
      ctx.fillStyle = '#475569';
      ctx.fillRect(19, 57, 1.5, 2);
    });

    // 4b. Sport Motorbike Body (tilted sharp chassis, carbon muffler, no white yếm shield)
    this.createCanvasTexture('title_motorbike_sport', 128, 80, (ctx, w, h) => {
      // Front fork (metal shock absorber, behind fender/body)
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(92, 58);
      ctx.lineTo(84, 32);
      ctx.stroke();

      // Main body/frame (tilted sharp chassis, sporty dark grey/black with bright accents)
      ctx.fillStyle = '#1e293b'; // Charcoal frame
      ctx.beginPath();
      ctx.moveTo(30, 44); // low under-seat
      ctx.lineTo(50, 32); // high tail rise
      ctx.lineTo(76, 32); // tank top
      ctx.lineTo(84, 46); // nose fairing bottom
      ctx.lineTo(76, 56); // engine bottom front
      ctx.lineTo(42, 56); // engine bottom rear
      ctx.closePath();
      ctx.fill();

      // Neon green sporty highlight decals
      ctx.fillStyle = '#22c55e'; // Bright sporty green accents
      ctx.beginPath();
      ctx.moveTo(58, 34);
      ctx.lineTo(74, 34);
      ctx.lineTo(78, 44);
      ctx.lineTo(66, 50);
      ctx.closePath();
      ctx.fill();

      // Engine block detail
      ctx.fillStyle = '#475569';
      ctx.fillRect(52, 48, 22, 10);
      ctx.fillStyle = '#334155';
      ctx.fillRect(54, 50, 18, 2);
      ctx.fillRect(54, 54, 18, 2);

      // Rear fender & Front fender
      // Minimalist rear fender/tail tidy for sport bike
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(22, 48);
      ctx.lineTo(30, 44);
      ctx.lineTo(32, 46);
      ctx.lineTo(24, 50);
      ctx.closePath();
      ctx.fill();

      // Front fender
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(82, 52);
      ctx.quadraticCurveTo(92, 44, 102, 50);
      ctx.lineTo(100, 53);
      ctx.quadraticCurveTo(92, 48, 84, 54);
      ctx.closePath();
      ctx.fill();

      // Slanted high-back double seat (sport seat)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(34, 34); // high rear pillion seat
      ctx.lineTo(52, 35);
      ctx.lineTo(64, 42); // low front rider seat position
      ctx.lineTo(66, 46);
      ctx.lineTo(34, 40);
      ctx.closePath();
      ctx.fill();

      // Seat styling line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(34, 36);
      ctx.lineTo(64, 44);
      ctx.stroke();

      // Handlebars (sporty clip-ons, lower stance)
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(80, 26);
      ctx.lineTo(77, 18);
      ctx.stroke();

      ctx.fillStyle = '#0f172a'; // grips
      ctx.fillRect(74, 16, 6, 3);

      // Bar end mirror (sporty, pointing down or sleek)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(77, 18);
      ctx.lineTo(73, 14);
      ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(72, 13, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Sharp yellow headlight at front fairing nose
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(82, 28);
      ctx.lineTo(87, 30);
      ctx.lineTo(83, 34);
      ctx.closePath();
      ctx.fill();

      // Carbon Muffler (large, chunky, angled upwards at rear)
      ctx.save();
      ctx.translate(34, 54);
      ctx.rotate(-Math.PI / 6); // 30 degrees angle up
      ctx.fillStyle = '#334155';
      ctx.fillRect(-12, -5, 22, 10);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.strokeRect(-12, -5, 22, 10);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(8, -5.5, 2, 11); // chrome band
      ctx.fillStyle = '#475569';
      ctx.fillRect(-14, -3, 2, 6); // metallic tip outlet
      ctx.restore();

      // Pipe from engine leading to muffler
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 55);
      ctx.quadraticCurveTo(45, 59, 36, 56);
      ctx.stroke();
    });

    // 5a. Rider An - Cub Upright Posture
    this.createCanvasTexture('title_rider_cub', 128, 80, (ctx, w, h) => {
      // legs
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 4.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(48, 40);
      ctx.lineTo(58, 48);
      ctx.lineTo(60, 56);
      ctx.stroke();

      // backpack (behind torso)
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(41, 23, 7, 15);

      // torso (vertical rectangle at x=48, y=21, width=12, height=19)
      ctx.fillStyle = '#2b52b7';
      ctx.fillRect(48, 21, 12, 19);

      // arm (reaches forward to handlebars)
      ctx.strokeStyle = '#2b52b7';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(56, 24);
      ctx.lineTo(73, 13);
      ctx.stroke();

      // face (upright)
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(54, 13, 5, 0, Math.PI * 2);
      ctx.fill();

      // black hair under helmet
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(53, 14, 5.2, Math.PI * 0.5, Math.PI * 1.5);
      ctx.fill();

      // helmet
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(54, 11, 6.5, Math.PI * 1.15, 0.15);
      ctx.fill();

      // visor / chin strap details
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(56, 11);
      ctx.lineTo(60, 13);
      ctx.stroke();
    });

    // 5b. Rider An - Sport Racing Posture
    this.createCanvasTexture('title_rider_sport', 128, 80, (ctx, w, h) => {
      // legs
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 4.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(48, 40);
      ctx.lineTo(58, 48);
      ctx.lineTo(60, 56);
      ctx.stroke();

      // torso
      ctx.fillStyle = '#2b52b7';
      ctx.beginPath();
      ctx.moveTo(44, 40);
      ctx.lineTo(54, 40);
      ctx.lineTo(68, 24);
      ctx.lineTo(58, 22);
      ctx.closePath();
      ctx.fill();

      // backpack
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(48, 30, 6, 9, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();

      // arm
      ctx.strokeStyle = '#2b52b7';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(60, 24);
      ctx.lineTo(76, 20);
      ctx.stroke();

      // face
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(66, 16, 5, 0, Math.PI * 2);
      ctx.fill();

      // black hair under helmet
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(65, 17, 5.2, Math.PI * 0.5, Math.PI * 1.5);
      ctx.fill();

      // helmet
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(66, 14, 6.5, Math.PI * 1.15, 0.15);
      ctx.fill();

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(68, 14);
      ctx.lineTo(72, 16);
      ctx.stroke();
    });

    // Exhaust puff graphics (behind player container)
    this.exhaustParticles = [];
    this.exhaustTimer = 0;
    this.exhaustGraphics = this.add.graphics();

    // Motorcycle silhouette container assembly
    this.playerDemo = this.add.container(220, height - 100);
    this.playerDemo.setScale(1.3); // Scale container to match the new larger Wave bike style

    this.shadowSprite = this.add.sprite(0, 0, 'title_shadow');
    this.wheelsSprite = this.add.sprite(0, 0, 'title_wheel_0');
    const initialTexture = this.loopState.vehicleType === 'sport_bike' ? 'title_motorbike_sport' : 'title_motorbike_body';
    this.bodySprite = this.add.sprite(0, 0, initialTexture);
    
    const initialRiderTexture = this.loopState.vehicleType === 'sport_bike' ? 'title_rider_sport' : 'title_rider_cub';
    this.riderSprite = this.add.sprite(0, 0, initialRiderTexture);

    // Headlight glow graphics (inside player container so it inherits scale & transform)
    this.headlightGlow = this.add.graphics();

    this.playerDemo.add([
      this.shadowSprite, 
      this.wheelsSprite, 
      this.bodySprite, 
      this.riderSprite, 
      this.headlightGlow
    ]);

    // Vehicle Selection Panel (at Y = 250)
    this.add.text(140, 250, 'CHỌN PHƯƠNG TIỆN:', {
      fontFamily: "'Courier New', monospace",
      fontSize: '14px',
      color: '#4a2c11',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    const btnWidth = 230;
    const btnHeight = 40;

    const updateButtonVisual = (container, isSelected, isHovered, isCub) => {
      const bg = container.getAt(0);
      const txt = container.getAt(1);
      bg.clear();
      if (isSelected) {
        if (isCub) {
          bg.fillStyle(0xe8f5e9, 0.95);
          bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
          bg.lineStyle(2.5, 0x2e7d32, 1.0);
          bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
          txt.setColor('#1b5e20');
        } else {
          bg.fillStyle(0xffebee, 0.95);
          bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
          bg.lineStyle(2.5, 0xc62828, 1.0);
          bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
          txt.setColor('#b71c1c');
        }
      } else if (isHovered) {
        bg.fillStyle(0xfefae0, 0.95);
        bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
        bg.lineStyle(2, 0x8c5e3c, 1.0);
        bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
        txt.setColor('#4a2c11');
      } else {
        bg.fillStyle(0xfefae0, 0.5);
        bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
        bg.lineStyle(1.5, 0xcbaf87, 0.6);
        bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
        txt.setColor('#cbaf87');
      }
    };

    // Cub Button
    const cubContainer = this.add.container(440, 250);
    const cubBg = this.add.graphics();
    const cubTxt = this.add.text(0, 0, 'Xe Cub 50cc (Hợp pháp)', {
      fontFamily: "'Courier New', monospace",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#cbaf87'
    }).setOrigin(0.5);
    cubContainer.add([cubBg, cubTxt]);

    // Sport Button
    const sportContainer = this.add.container(710, 250);
    const sportBg = this.add.graphics();
    const sportTxt = this.add.text(0, 0, 'Xe Phân Khối Lớn (Sai luật)', {
      fontFamily: "'Courier New', monospace",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#cbaf87'
    }).setOrigin(0.5);
    sportContainer.add([sportBg, sportTxt]);

    const cubZone = this.add.zone(0, 0, btnWidth, btnHeight)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    cubContainer.add(cubZone);

    const sportZone = this.add.zone(0, 0, btnWidth, btnHeight)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    sportContainer.add(sportZone);

    const refreshVehicleButtons = () => {
      const current = this.loopState.vehicleType;
      updateButtonVisual(cubContainer, current === 'cub50', false, true);
      updateButtonVisual(sportContainer, current === 'sport_bike', false, false);
      if (this.bodySprite) {
        this.bodySprite.setTexture(current === 'sport_bike' ? 'title_motorbike_sport' : 'title_motorbike_body');
      }
      if (this.riderSprite) {
        this.riderSprite.setTexture(current === 'sport_bike' ? 'title_rider_sport' : 'title_rider_cub');
      }
    };

    cubZone.on('pointerover', () => {
      if (this.loopState.vehicleType !== 'cub50') {
        updateButtonVisual(cubContainer, false, true, true);
      }
      this.playHoverSound();
    });
    cubZone.on('pointerout', () => {
      refreshVehicleButtons();
    });
    cubZone.on('pointerdown', () => {
      this.playClickSound();
      this.loopState.vehicleType = 'cub50';
      LoopSystem.saveState(this.loopState);
      refreshVehicleButtons();
    });

    sportZone.on('pointerover', () => {
      if (this.loopState.vehicleType !== 'sport_bike') {
        updateButtonVisual(sportContainer, false, true, false);
      }
      this.playHoverSound();
    });
    sportZone.on('pointerout', () => {
      refreshVehicleButtons();
    });
    sportZone.on('pointerdown', () => {
      this.playClickSound();
      this.loopState.vehicleType = 'sport_bike';
      LoopSystem.saveState(this.loopState);
      refreshVehicleButtons();
    });

    // Initialize display state
    refreshVehicleButtons();

    // 5. Menu Buttons (shifted down to Y = 350, 410, 470)
    this.createButton(width / 2, 350, 'BẮT ĐẦU VÒNG LẶP', '#8c5e3c', () => {
      this.stopClockTimer();
      const vehicleType = this.loopState.vehicleType;
      const freshState = LoopSystem.resetState();
      freshState.vehicleType = vehicleType;
      LoopSystem.saveState(freshState);
      this.scene.start('HomeScene', { state: freshState });
    });

    this.createButton(width / 2, 410, 'TIẾP TỤC VÒNG LẶP', hasExistingSave ? '#8c5e3c' : '#94a3b8', () => {
      if (!hasExistingSave) return;
      this.stopClockTimer();
      this.scene.start('HomeScene', { state: this.loopState });
    }, !hasExistingSave);

    if (hasExistingSave) {
      this.createButton(width / 2, 470, 'XÓA KÝ ỨC VÒNG LẶP', '#8c5e3c', () => {
        this.stopClockTimer();
        LoopSystem.resetState();
        this.scene.restart();
      });
    }

    // Credits
    this.add.text(width / 2, height - 30, 'UEH InsurTech Lab 2026 - GAIP Competition', {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#8c5e3c'
    }).setOrigin(0.5);
  }

  createButton(x, y, label, themeColor, onClick, isDisabled = false) {
    const btnContainer = this.add.container(x, y);
    const btnWidth = 280;
    const btnHeight = 44;

    const bg = this.add.graphics();
    const paperColor = 0xfefae0; // Cream paper
    const borderOutline = 0x8c5e3c; // Oak brown border
    const darkWood = 0x4a2c11;

    if (isDisabled) {
      bg.fillStyle(0xe5e5e5, 0.5);
      bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
      bg.lineStyle(2, 0xcccccc, 0.5);
      bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
    } else {
      bg.fillStyle(paperColor, 0.95);
      bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
      bg.lineStyle(2, borderOutline, 0.8);
      bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
    }
    btnContainer.add(bg);

    const txt = this.add.text(0, 0, label, {
      fontFamily: "'Courier New', monospace",
      fontSize: '14px',
      fontStyle: 'bold',
      color: isDisabled ? '#8c8c8c' : '#4a2c11'
    }).setOrigin(0.5);
    btnContainer.add(txt);

    if (!isDisabled) {
      const zone = this.add.zone(0, 0, btnWidth, btnHeight)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      zone.on('pointerover', () => {
        bg.clear();
        bg.fillStyle(0xd4a373, 0.95); // Clay orange
        bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
        bg.lineStyle(2, darkWood, 1.0);
        bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
        txt.setColor('#fefae0');
        this.playHoverSound();
      });

      zone.on('pointerout', () => {
        bg.clear();
        bg.fillStyle(paperColor, 0.95);
        bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
        bg.lineStyle(2, borderOutline, 0.8);
        bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
        txt.setColor('#4a2c11');
      });

      zone.on('pointerdown', () => {
        this.playClickSound();
        onClick();
      });

      btnContainer.add(zone);
    }
  }

  stopClockTimer() {
    if (this.tickTimer) {
      this.tickTimer.destroy();
      this.tickTimer = null;
    }
  }

  playIntroSound() {
    try {
      const ctx = this.sound.context;
      if (!ctx || ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      const notes = [130.81, 146.83, 164.81, 196.00];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.04, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.4);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.4);
      });
    } catch (e) {}
  }

  playHoverSound() {
    try {
      const ctx = this.sound.context;
      if (!ctx || ctx.state === 'suspended') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playClickSound() {
    try {
      const ctx = this.sound.context;
      if (window.gameSynth && ctx) {
        window.gameSynth.playClickBeep(ctx);
      }
    } catch (e) {}
  }

  createCanvasTexture(key, width, height, drawFn) {
    if (this.textures.exists(key)) {
      this.textures.remove(key);
    }
    const canvasTexture = this.textures.createCanvas(key, width, height);
    const ctx = canvasTexture.getContext();
    drawFn(ctx, width, height);
    canvasTexture.refresh();
  }

  update(time, delta) {
    const dt = delta / 1000;

    // Scroll sun dust particles
    this.sunGraphics.clear();
    this.sunParticles.forEach(p => {
      this.sunGraphics.fillStyle(0xffffff, p.alpha);
      this.sunGraphics.beginPath();
      this.sunGraphics.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.sunGraphics.fill();
      
      p.y -= p.speedY * dt;
      p.x += Math.sin(p.driftTime) * 10 * dt;
      p.driftTime += dt;
      
      if (p.y < -10) {
        p.y = 610;
        p.x = Phaser.Math.Between(0, this.cameras.main.width);
      }
    });

    // Scroll road stripes demo (slower for a cozy feel)
    this.roadStripes.forEach((stripe, i) => {
      stripe.x -= 65 * dt;
      if (stripe.x + i * 120 < -120) {
        stripe.x += 1440;
      }
    });

    // --- Dynamic Motorbike Animations ---
    const timeSec = time / 1000;

    // 1. Suspension bounce: alternating body/rider position and rotation
    // Slow, cozy frequency (around 3.5 rad/s) and small offsets
    const bodyBob = Math.sin(timeSec * 3.5) * 1.0;
    this.bodySprite.y = bodyBob;
    // Tiny organic tilt for weight & bounce simulation
    this.bodySprite.rotation = Math.sin(timeSec * 3.5) * 0.015;

    // Rider bobs with a slight phase lag
    const riderBob = Math.sin(timeSec * 3.5 - 0.8) * 1.4;
    this.riderSprite.y = riderBob;
    this.riderSprite.rotation = Math.sin(timeSec * 3.5 - 0.4) * 0.01;

    // 2. Wheel rotation: alternate textures every 240ms (slow & cozy)
    const wheelFrame = Math.floor(time / 240) % 2;
    this.wheelsSprite.setTexture(wheelFrame === 0 ? 'title_wheel_0' : 'title_wheel_1');

    // 3. Exhaust puffs: Spawn tiny grey puff particles behind the exhaust pipe
    this.exhaustTimer += delta;
    if (this.exhaustTimer >= 220) { // spawn every 220ms
      this.exhaustTimer = 0;
      const scale = this.playerDemo.scaleX;
      // Exhaust pipe tip is located at around x = -44, y = 14 relative to container center
      const px = this.playerDemo.x - 44 * scale;
      const py = this.playerDemo.y + 14 * scale + bodyBob * scale;
      this.exhaustParticles.push({
        x: px,
        y: py,
        vx: -75 + Phaser.Math.FloatBetween(-10, 10), // matching slower road speed, with slight variation
        vy: -20 + Phaser.Math.FloatBetween(-8, 4),   // slowly rising
        radius: Phaser.Math.FloatBetween(2.0, 3.5) * scale,
        alpha: 0.6,
        maxLife: 1000, // longer lifetime
        life: 0
      });
    }

    // Update and draw exhaust particles
    this.exhaustGraphics.clear();
    for (let i = this.exhaustParticles.length - 1; i >= 0; i--) {
      const p = this.exhaustParticles[i];
      p.life += delta;
      const progress = p.life / p.maxLife;
      
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha = 0.6 * (1 - progress);
      p.radius *= 1.008; // expand slightly
      
      if (p.life >= p.maxLife) {
        this.exhaustParticles.splice(i, 1);
      } else {
        this.exhaustGraphics.fillStyle(0xd1d5db, p.alpha); // soft light grey puff
        this.exhaustGraphics.beginPath();
        this.exhaustGraphics.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.exhaustGraphics.fill();
      }
    }

    // 4. Subtle headlight glow: glowing yellow light cone at the front that flickers slightly
    // Since headlightGlow is inside playerDemo container, we use local coordinates of headlight relative to body
    this.headlightGlow.clear();
    
    const hx_rel = 16;
    const hy_rel = -20;
    const cosA = Math.cos(this.bodySprite.rotation);
    const sinA = Math.sin(this.bodySprite.rotation);
    
    // Rotate headlight relative coordinates by body rotation and offset by body bob
    const hx = hx_rel * cosA - hy_rel * sinA;
    const hy = hx_rel * sinA + hy_rel * cosA + bodyBob;

    this.headlightGlow.fillStyle(0xfef08a, 0.15);
    this.headlightGlow.beginPath();
    this.headlightGlow.moveTo(hx, hy);
    
    // Draw cone pointing forward, taking body rotation into account
    const topX = 110 * cosA - (-15) * sinA;
    const topY = 110 * sinA + (-15) * cosA;
    const botX = 130 * cosA - 30 * sinA;
    const botY = 130 * sinA + 30 * cosA;
    
    this.headlightGlow.lineTo(hx + topX, hy + topY);
    this.headlightGlow.lineTo(hx + botX, hy + botY);
    this.headlightGlow.closePath();
    this.headlightGlow.fill();

    // Flickering effect (opacity random modulation)
    const flicker = Phaser.Math.FloatBetween(0.75, 1.0);
    this.headlightGlow.setAlpha(flicker);
  }
}
