import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Title loading progress
    const titleText = this.add.text(width / 2, height / 2 - 50, '7 GIỜ KÉM 10', {
      fontFamily: "'Courier New', monospace",
      fontSize: '38px',
      color: '#ef4444',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const subtitleText = this.add.text(width / 2, height / 2 - 10, 'Đang thiết lập vòng lặp...', {
      fontFamily: "'Courier New', monospace",
      fontSize: '15px',
      color: '#64748b'
    }).setOrigin(0.5);

    // Progress Bar
    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    progressBox.fillStyle(0x020617, 0.8);
    progressBox.fillRoundedRect(width / 2 - 160, height / 2 + 30, 320, 20, 6);
    progressBox.lineStyle(2, 0xef4444, 0.5);
    progressBox.strokeRoundedRect(width / 2 - 160, height / 2 + 30, 320, 20, 6);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xef4444, 0.8);
      progressBar.fillRoundedRect(width / 2 - 156, height / 2 + 34, 312 * value, 12, 4);
    });

    this.load.on('complete', () => {
      progressBox.destroy();
      progressBar.destroy();
      titleText.destroy();
      subtitleText.destroy();
      
      // Build programmatic textures and Web Audio synthesizers
      this.generateTextures();
      this.setupSynthesizers();
      
      this.scene.start('MainMenuScene');
    });

    // Mock load callback to trigger progress visual
    this.load.json('dialogues', 'assets/dialogues.vi.json');
  }

  createCanvasTexture(key, width, height, drawFn) {
    const canvasTexture = this.textures.createCanvas(key, width, height);
    const ctx = canvasTexture.getContext();
    drawFn(ctx, width, height);
    canvasTexture.refresh();
  }

  setupSynthesizers() {
    window.gameSynth = {
      playClockTick: (ctx) => {
        try {
          if (!ctx || ctx.state === 'suspended') return;
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(850, now);
          
          gain.gain.setValueAtTime(0.015, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
          
          osc.start(now);
          osc.stop(now + 0.02);
        } catch (e) {}
      },
      
      playThunder: (ctx) => {
        try {
          if (!ctx || ctx.state === 'suspended') return;
          const now = ctx.currentTime;
          
          // Gentle rumble of a tropical summer morning rain
          const oscRumble = ctx.createOscillator();
          const gainRumble = ctx.createGain();
          oscRumble.connect(gainRumble);
          gainRumble.connect(ctx.destination);
          oscRumble.type = 'sine';
          oscRumble.frequency.setValueAtTime(70, now);
          oscRumble.frequency.linearRampToValueAtTime(30, now + 1.5);
          
          gainRumble.gain.setValueAtTime(0.15, now);
          gainRumble.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
          
          oscRumble.start(now);
          oscRumble.stop(now + 1.5);
        } catch (e) {}
      },

      playSchoolDrum: (ctx) => {
        try {
          if (!ctx || ctx.state === 'suspended') return;
          const now = ctx.currentTime;
          
          // Traditional Vietnamese School Drum: "Tùng... Tùng... Tùng..."
          const beats = [0, 0.7, 1.4];
          beats.forEach((delay) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(95, now + delay);
            osc.frequency.linearRampToValueAtTime(55, now + delay + 0.4); // Pitch drops slightly
            
            gain.gain.setValueAtTime(0.35, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.65);
            
            osc.start(now + delay);
            osc.stop(now + delay + 0.65);
          });
        } catch (e) {}
      },

      playClickBeep: (ctx) => {
        try {
          if (!ctx || ctx.state === 'suspended') return;
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          
          gain.gain.setValueAtTime(0.025, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
          
          osc.start(now);
          osc.stop(now + 0.05);
        } catch (e) {}
      },

      playHornCrash: (ctx) => {
        try {
          if (!ctx || ctx.state === 'suspended') return;
          const now = ctx.currentTime;
          
          // Dissonant horns and heavy crash
          const freqs = [290, 295, 140];
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = idx === 2 ? 'sawtooth' : 'sine';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.linearRampToValueAtTime(freq - 50, now + 0.8);
            
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
            
            osc.start(now);
            osc.stop(now + 0.85);
          });
        } catch (e) {}
      }
    };
  }

  generateTextures() {
    // Helper to draw a drop shadow on canvas context
    const drawShadow = (ctx, x, y, rx, ry) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
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

    // Local draw helper for classic Honda Cub 50cc with rider An
    const drawCubMotorbike = (ctx, w, h) => {
      // 1. Draw shadow under bike
      ctx.beginPath();
      ctx.ellipse(w/2, 71, 24, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fill();

      // 2. Rear Wheel/Tire (center x = w/2 = 64, y = 60)
      ctx.fillStyle = '#1e293b'; // dark tire color
      ctx.fillRect(w/2 - 6, 52, 12, 18); // tyre thickness 12px
      
      // Tire center groove
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 1.5, 52, 3, 18);
      
      // Chrome spokes/hub detail inside wheel
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(w/2 - 2, 58, 4, 4);

      // 3. Exhaust Pipe (pô xe Cub màu đen nhám cổ điển bên phải)
      // Main pipe body
      ctx.fillStyle = '#1e293b'; 
      ctx.beginPath();
      ctx.moveTo(w/2 + 6, 67);
      ctx.lineTo(w/2 + 15, 58);
      ctx.lineTo(w/2 + 12, 56);
      ctx.lineTo(w/2 + 3, 65);
      ctx.closePath();
      ctx.fill();
      
      // Black heat guard (Vỉ pô đen nhám bo góc)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(w/2 + 5, 65);
      ctx.lineTo(w/2 + 13, 57);
      ctx.lineTo(w/2 + 11, 56);
      ctx.lineTo(w/2 + 3, 63);
      ctx.closePath();
      ctx.fill();
      
      // Chrome tip at the end of exhaust
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(w/2 + 14, 57, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a'; // exhaust opening hole
      ctx.beginPath();
      ctx.arc(w/2 + 14, 57, 0.8, 0, Math.PI * 2);
      ctx.fill();

      // 4. Rear Fender (Yếm chắn bùn sau màu kem sữa ôm lấy bánh)
      ctx.fillStyle = '#f4ebd0'; // Cream/Ivory
      ctx.beginPath();
      ctx.moveTo(w/2 - 9, 39);
      ctx.quadraticCurveTo(w/2 - 10, 48, w/2 - 8, 55);
      ctx.lineTo(w/2 + 8, 55);
      ctx.quadraticCurveTo(w/2 + 10, 48, w/2 + 9, 39);
      ctx.closePath();
      ctx.fill();
      
      // Shadowing on rear fender
      ctx.strokeStyle = '#e6d8b3';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2 - 9, 39);
      ctx.lineTo(w/2 - 7, 54);
      ctx.moveTo(w/2 + 9, 39);
      ctx.lineTo(w/2 + 7, 54);
      ctx.stroke();

      // Black rubber mud flap at the very bottom of the fender
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 8, 55, 16, 3);

      // 5. Suspension Shock Absorbers (Ốp phuộc màu kem phía trên, lò xo kim loại phía dưới)
      // Left Shock
      ctx.fillStyle = '#f4ebd0'; // top shroud (kem)
      ctx.fillRect(w/2 - 10, 42, 2.5, 10);
      ctx.strokeStyle = '#94a3b8'; // bottom chrome rod
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(w/2 - 8.8, 52);
      ctx.lineTo(w/2 - 8.8, 62);
      ctx.stroke();

      // Right Shock
      ctx.fillStyle = '#f4ebd0'; // top shroud (kem)
      ctx.fillRect(w/2 + 7.5, 42, 2.5, 10);
      ctx.beginPath();
      ctx.moveTo(w/2 + 8.8, 52);
      ctx.lineTo(w/2 + 8.8, 62);
      ctx.stroke();

      // 6. License Plate
      ctx.fillStyle = '#f8fafc'; // white license plate
      ctx.fillRect(w/2 - 7, 47, 14, 8);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(w/2 - 7, 47, 14, 8);
      // plate text details
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 5, 49, 10, 1);
      ctx.fillRect(w/2 - 4, 52, 8, 1);

      // 7. Taillight (Red) & Indicator Lights (Amber round bulbs)
      // Taillight base (black)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 5, 38, 10, 4);
      // Brake light (red oval)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(w/2, 39, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Taillight gloss highlight
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w/2 - 1.5, 37.5, 3, 1);

      // Left & Right round amber turn signals nhô ra ngoài vè sau
      // Turn signal stems (chrome)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w/2 - 9, 41);
      ctx.lineTo(w/2 - 13, 41);
      ctx.moveTo(w/2 + 9, 41);
      ctx.lineTo(w/2 + 13, 41);
      ctx.stroke();
      // Round indicator lenses (orange/amber with chrome border)
      ctx.fillStyle = '#cbd5e1'; // outer chrome
      ctx.beginPath();
      ctx.arc(w/2 - 14, 41, 2.5, 0, Math.PI * 2);
      ctx.arc(w/2 + 14, 41, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f59e0b'; // orange lens
      ctx.beginPath();
      ctx.arc(w/2 - 14, 41, 1.7, 0, Math.PI * 2);
      ctx.arc(w/2 + 14, 41, 1.7, 0, Math.PI * 2);
      ctx.fill();

      // 8. Curved Leg Shield (Honda Cub signature white yếm xe, lộ rộng sang 2 bên)
      ctx.fillStyle = '#fcfbfa'; // Soft milk white
      ctx.beginPath();
      // Left flare
      ctx.moveTo(w/2 - 11, 29);
      ctx.quadraticCurveTo(w/2 - 21, 33, w/2 - 18, 44);
      ctx.lineTo(w/2 - 11, 44);
      ctx.quadraticCurveTo(w/2 - 13, 35, w/2 - 9, 29);
      // Right flare
      ctx.moveTo(w/2 + 11, 29);
      ctx.quadraticCurveTo(w/2 + 21, 33, w/2 + 18, 44);
      ctx.lineTo(w/2 + 11, 44);
      ctx.quadraticCurveTo(w/2 + 13, 35, w/2 + 9, 29);
      ctx.closePath();
      ctx.fill();
      
      // Outline for leg shield
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2 - 21, 33);
      ctx.lineTo(w/2 - 18, 44);
      ctx.moveTo(w/2 + 21, 33);
      ctx.lineTo(w/2 + 18, 44);
      ctx.stroke();

      // 9. Premium Tan Leather Seat (Yên xe màu nâu da bò cực kì cổ điển)
      // Base/Plate of seat
      ctx.fillStyle = '#5c3d25'; // dark brown shadow base
      ctx.fillRect(w/2 - 11.5, 33, 23, 6);
      // Cushion (nâu da bò ấm)
      ctx.fillStyle = '#855836';
      ctx.beginPath();
      ctx.roundRect(w/2 - 11, 31.5, 22, 5.5, [2, 2, 0, 0]);
      ctx.fill();
      // Seat top highlight cream band
      ctx.fillStyle = '#eedfcc'; 
      ctx.fillRect(w/2 - 11, 31.5, 22, 1.2);

      // 10. Chrome Rear Luggage Rack (Baga sau bằng chrome sáng bóng)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.strokeRect(w/2 - 8, 38, 16, 4);
      ctx.moveTo(w/2 - 4, 38); ctx.lineTo(w/2 - 4, 42);
      ctx.moveTo(w/2, 38); ctx.lineTo(w/2, 42);
      ctx.moveTo(w/2 + 4, 38); ctx.lineTo(w/2 + 4, 42);
      ctx.stroke();

      // 11. Driver An (Rear View)
      // Torso - Blue Jacket
      ctx.fillStyle = '#2b52b7';
      ctx.beginPath();
      ctx.moveTo(w/2 - 15, 32);
      ctx.lineTo(w/2 + 15, 32);
      ctx.lineTo(w/2 + 12, 21);
      ctx.lineTo(w/2 - 12, 21);
      ctx.closePath();
      ctx.fill();

      // Red Backpack (over the jacket)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(w/2, 27, 9, 7.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2 - 6, 27);
      ctx.lineTo(w/2 + 6, 27);
      ctx.stroke();
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(w/2, 29.5, 5, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w/2 - 6.5, 21);
      ctx.lineTo(w/2 - 8, 26);
      ctx.moveTo(w/2 + 6.5, 21);
      ctx.lineTo(w/2 + 8, 26);
      ctx.stroke();

      // 12. Handlebars & Mirrors
      // Handlebar stem (Màu kem đồng bộ sọ khỉ xe Cub)
      ctx.fillStyle = '#f4ebd0';
      ctx.fillRect(w/2 - 3, 22, 6, 4);
      
      // Chrome handlebars bars
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(w/2 - 18, 22);
      ctx.lineTo(w/2 + 18, 22);
      ctx.stroke();
      
      // Grips (black)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 20, 21, 3.5, 3);
      ctx.fillRect(w/2 + 16.5, 21, 3.5, 3);

      // Round Classic Chrome Mirrors (Gương chiếu hậu tròn viền kem)
      ctx.strokeStyle = '#cbd5e1'; // Chrome stem
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2 - 11, 22);
      ctx.lineTo(w/2 - 16, 15);
      ctx.moveTo(w/2 + 11, 22);
      ctx.lineTo(w/2 + 16, 15);
      ctx.stroke();

      // Mirror Backings (Cream color from rear view!)
      ctx.fillStyle = '#f4ebd0'; // cream backing shell
      ctx.beginPath();
      ctx.arc(w/2 - 16, 14, 4.0, 0, Math.PI * 2);
      ctx.arc(w/2 + 16, 14, 4.0, 0, Math.PI * 2);
      ctx.fill();
      // Chrome outer rim
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(w/2 - 16, 14, 4.0, 0, Math.PI * 2);
      ctx.arc(w/2 + 16, 14, 4.0, 0, Math.PI * 2);
      ctx.stroke();

      // 13. Head & Helmet (Yellow Helmet on top of Black Hair)
      ctx.fillStyle = '#fed7aa'; // Neck
      ctx.fillRect(w/2 - 2.5, 17, 5, 4);

      ctx.fillStyle = '#fed7aa'; // Head base
      ctx.beginPath();
      ctx.arc(w/2, 14, 6.0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1e293b'; // Black hair
      ctx.beginPath();
      ctx.arc(w/2, 13.5, 6.0, 0, Math.PI, true);
      ctx.fill();
      ctx.fillRect(w/2 - 5.5, 14, 11, 3.5);

      // Yellow Helmet
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(w/2, 12, 7.0, Math.PI, 0, false);
      ctx.lineTo(w/2 - 7.0, 12);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#f59e0b'; // helmet rim
      ctx.fillRect(w/2 - 8.0, 11, 16, 1.8);

      ctx.strokeStyle = '#0f172a'; // chin strap
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(w/2 - 5.5, 12);
      ctx.lineTo(w/2 - 4.5, 17);
      ctx.lineTo(w/2 + 4.5, 17);
      ctx.lineTo(w/2 + 5.5, 12);
      ctx.stroke();

      // 14. Arms
      ctx.strokeStyle = '#2b52b7'; // blue sleeves
      ctx.lineWidth = 3.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(w/2 - 12, 22);
      ctx.lineTo(w/2 - 17, 22);
      ctx.moveTo(w/2 + 12, 22);
      ctx.lineTo(w/2 + 17, 22);
      ctx.stroke();
    };

    // Local draw helper for empty classic Honda Cub 50cc
    const drawCubEmpty = (ctx, w, h) => {
      // 1. Draw shadow under bike
      ctx.beginPath();
      ctx.ellipse(w/2, 71, 24, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fill();

      // Center stand (Chân chống đứng sơn đen xám)
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(w/2 - 7, 58);
      ctx.lineTo(w/2 - 9, 71);
      ctx.moveTo(w/2 + 7, 58);
      ctx.lineTo(w/2 + 9, 71);
      ctx.stroke();

      // 2. Rear Wheel/Tire (center x = w/2 = 64, y = 60)
      ctx.fillStyle = '#1e293b'; // dark tire color
      ctx.fillRect(w/2 - 6, 52, 12, 18); // tyre thickness 12px
      
      // Tire center groove
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 1.5, 52, 3, 18);
      
      // Chrome spokes/hub detail
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(w/2 - 2, 58, 4, 4);

      // 3. Exhaust Pipe (pô xe Cub màu đen nhám cổ điển bên phải)
      // Main pipe body
      ctx.fillStyle = '#1e293b'; 
      ctx.beginPath();
      ctx.moveTo(w/2 + 6, 67);
      ctx.lineTo(w/2 + 15, 58);
      ctx.lineTo(w/2 + 12, 56);
      ctx.lineTo(w/2 + 3, 65);
      ctx.closePath();
      ctx.fill();
      
      // Black heat guard (Vỉ pô đen nhám bo góc)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(w/2 + 5, 65);
      ctx.lineTo(w/2 + 13, 57);
      ctx.lineTo(w/2 + 11, 56);
      ctx.lineTo(w/2 + 3, 63);
      ctx.closePath();
      ctx.fill();
      
      // Chrome tip
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(w/2 + 14, 57, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(w/2 + 14, 57, 0.8, 0, Math.PI * 2);
      ctx.fill();

      // 4. Rear Fender (Yếm chắn bùn sau màu kem sữa)
      ctx.fillStyle = '#f4ebd0'; // Cream/Ivory
      ctx.beginPath();
      ctx.moveTo(w/2 - 9, 39);
      ctx.quadraticCurveTo(w/2 - 10, 48, w/2 - 8, 55);
      ctx.lineTo(w/2 + 8, 55);
      ctx.quadraticCurveTo(w/2 + 10, 48, w/2 + 9, 39);
      ctx.closePath();
      ctx.fill();
      
      // Shadowing on rear fender
      ctx.strokeStyle = '#e6d8b3';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2 - 9, 39);
      ctx.lineTo(w/2 - 7, 54);
      ctx.moveTo(w/2 + 9, 39);
      ctx.lineTo(w/2 + 7, 54);
      ctx.stroke();

      // Black rubber mud flap
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 8, 55, 16, 3);

      // 5. Suspension Shock Absorbers
      // Left Shock
      ctx.fillStyle = '#f4ebd0';
      ctx.fillRect(w/2 - 10, 42, 2.5, 10);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(w/2 - 8.8, 52);
      ctx.lineTo(w/2 - 8.8, 62);
      ctx.stroke();

      // Right Shock
      ctx.fillStyle = '#f4ebd0';
      ctx.fillRect(w/2 + 7.5, 42, 2.5, 10);
      ctx.beginPath();
      ctx.moveTo(w/2 + 8.8, 52);
      ctx.lineTo(w/2 + 8.8, 62);
      ctx.stroke();

      // 6. License Plate
      ctx.fillStyle = '#f8fafc'; // white license plate
      ctx.fillRect(w/2 - 7, 47, 14, 8);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(w/2 - 7, 47, 14, 8);
      // plate text details
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 5, 49, 10, 1);
      ctx.fillRect(w/2 - 4, 52, 8, 1);

      // 7. Taillight (Red) & Indicator Lights (Amber round bulbs)
      // Taillight base (black)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 5, 38, 10, 4);
      // Brake light (red oval)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(w/2, 39, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Taillight gloss highlight
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w/2 - 1.5, 37.5, 3, 1);

      // Left & Right turn signals nhô ra ngoài
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w/2 - 9, 41);
      ctx.lineTo(w/2 - 13, 41);
      ctx.moveTo(w/2 + 9, 41);
      ctx.lineTo(w/2 + 13, 41);
      ctx.stroke();
      ctx.fillStyle = '#cbd5e1'; // outer chrome
      ctx.beginPath();
      ctx.arc(w/2 - 14, 41, 2.5, 0, Math.PI * 2);
      ctx.arc(w/2 + 14, 41, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f59e0b'; // orange lens
      ctx.beginPath();
      ctx.arc(w/2 - 14, 41, 1.7, 0, Math.PI * 2);
      ctx.arc(w/2 + 14, 41, 1.7, 0, Math.PI * 2);
      ctx.fill();

      // 8. Curved Leg Shield (white yếm xe)
      ctx.fillStyle = '#fcfbfa'; // Soft milk white
      ctx.beginPath();
      // Left flare
      ctx.moveTo(w/2 - 11, 29);
      ctx.quadraticCurveTo(w/2 - 21, 33, w/2 - 18, 44);
      ctx.lineTo(w/2 - 11, 44);
      ctx.quadraticCurveTo(w/2 - 13, 35, w/2 - 9, 29);
      // Right flare
      ctx.moveTo(w/2 + 11, 29);
      ctx.quadraticCurveTo(w/2 + 21, 33, w/2 + 18, 44);
      ctx.lineTo(w/2 + 11, 44);
      ctx.quadraticCurveTo(w/2 + 13, 35, w/2 + 9, 29);
      ctx.closePath();
      ctx.fill();
      
      // Outline for leg shield
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2 - 21, 33);
      ctx.lineTo(w/2 - 18, 44);
      ctx.moveTo(w/2 + 21, 33);
      ctx.lineTo(w/2 + 18, 44);
      ctx.stroke();

      // 9. Premium Tan Leather Seat (Yên xe màu nâu da bò cực kì cổ điển)
      // Base/Plate of seat
      ctx.fillStyle = '#5c3d25'; // dark brown shadow base
      ctx.fillRect(w/2 - 11.5, 33, 23, 6);
      // Cushion (nâu da bò ấm)
      ctx.fillStyle = '#855836';
      ctx.beginPath();
      ctx.roundRect(w/2 - 11, 31.5, 22, 5.5, [2, 2, 0, 0]);
      ctx.fill();
      // Seat top highlight cream band
      ctx.fillStyle = '#eedfcc'; 
      ctx.fillRect(w/2 - 11, 31.5, 22, 1.2);

      // 10. Chrome Rear Luggage Rack (Baga sau bằng chrome sáng bóng)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.strokeRect(w/2 - 8, 38, 16, 4);
      ctx.moveTo(w/2 - 4, 38); ctx.lineTo(w/2 - 4, 42);
      ctx.moveTo(w/2, 38); ctx.lineTo(w/2, 42);
      ctx.moveTo(w/2 + 4, 38); ctx.lineTo(w/2 + 4, 42);
      ctx.stroke();

      // 11. Handlebars & Mirrors
      // Handlebar stem (Màu kem đồng bộ sọ khỉ xe Cub)
      ctx.fillStyle = '#f4ebd0';
      ctx.fillRect(w/2 - 3, 22, 6, 4);
      
      // Chrome handlebars bars
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(w/2 - 18, 22);
      ctx.lineTo(w/2 + 18, 22);
      ctx.stroke();
      
      // Grips (black)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 20, 21, 3.5, 3);
      ctx.fillRect(w/2 + 16.5, 21, 3.5, 3);

      // Round Classic Chrome Mirrors (Gương chiếu hậu tròn viền kem)
      ctx.strokeStyle = '#cbd5e1'; // Chrome stem
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2 - 11, 22);
      ctx.lineTo(w/2 - 16, 15);
      ctx.moveTo(w/2 + 11, 22);
      ctx.lineTo(w/2 + 16, 15);
      ctx.stroke();

      // Mirror Backings (Cream color from rear view!)
      ctx.fillStyle = '#f4ebd0'; // cream backing shell
      ctx.beginPath();
      ctx.arc(w/2 - 16, 14, 4.0, 0, Math.PI * 2);
      ctx.arc(w/2 + 16, 14, 4.0, 0, Math.PI * 2);
      ctx.fill();
      // Chrome outer rim
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(w/2 - 16, 14, 4.0, 0, Math.PI * 2);
      ctx.arc(w/2 + 16, 14, 4.0, 0, Math.PI * 2);
      ctx.stroke();
    };

    // Local draw helper for sporty racing bike (Xe cọp / Phân khối lớn) with rider
    const drawSportMotorbike = (ctx, w, h) => {
      // A. Draw shadow under bike
      ctx.beginPath();
      ctx.ellipse(w/2, 71, 32, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fill();

      // B. Fat Rear Wheel/Tire (center x = w/2 = 64, y = 58)
      ctx.fillStyle = '#0f172a'; // extra dark tire
      ctx.fillRect(w/2 - 10, 48, 20, 22); // thick sporty tire
      // Tread grooves
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w/2 - 6, 50); ctx.lineTo(w/2 + 6, 68);
      ctx.moveTo(w/2 + 6, 50); ctx.lineTo(w/2 - 6, 68);
      ctx.stroke();

      // C. Sporty Exhaust (angled up sharply)
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(w/2 + 10, 64);
      ctx.lineTo(w/2 + 22, 42);
      ctx.lineTo(w/2 + 16, 40);
      ctx.lineTo(w/2 + 6, 62);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#f59e0b'; // golden tip
      ctx.beginPath();
      ctx.arc(w/2 + 19, 41, 3, 0, Math.PI * 2);
      ctx.fill();

      // D. Suspension (Mono-shock under seat)
      ctx.strokeStyle = '#ef4444'; // Red spring
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w/2, 44);
      ctx.lineTo(w/2, 54);
      ctx.stroke();

      // E. License Plate & Sporty Fender
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 8, 38, 16, 6);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(w/2 - 6, 42, 12, 8);
      
      // F. Taillight (Sharp LED strip)
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(w/2 - 14, 32, 28, 4);

      // G. Sport Seat (very high, black)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 14, 26, 28, 6);

      // H. Driver An (Leaning forward aggressively)
      // Torso - Leaning forward blue jacket
      ctx.fillStyle = '#1e40af';
      ctx.beginPath();
      ctx.moveTo(w/2 - 18, 30);
      ctx.lineTo(w/2 + 18, 30);
      ctx.lineTo(w/2 + 14, 16);
      ctx.lineTo(w/2 - 14, 16);
      ctx.closePath();
      ctx.fill();

      // Red Backpack (lower, pressed against back)
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(w/2, 24, 8, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // I. Handlebars (Lower position, clip-ons)
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w/2 - 24, 21);
      ctx.lineTo(w/2 + 24, 21);
      ctx.stroke();

      // J. Helmet with Visor (Yellow helmet, dark black shield visor)
      ctx.fillStyle = '#fed7aa'; // neck
      ctx.fillRect(w/2 - 3, 13, 6, 3);
      ctx.beginPath();
      ctx.arc(w/2, 10, 6.5, 0, Math.PI * 2);
      ctx.fill();
      // Hair
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(w/2, 9.5, 6.5, 0, Math.PI, true);
      ctx.fill();
      // Helmet
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(w/2, 8, 7.5, Math.PI, 0, false);
      ctx.lineTo(w/2 - 7.5, 8);
      ctx.closePath();
      ctx.fill();
      // Dark Visor (shield)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 6, 7, 12, 3);
    };

    // Local draw helper for empty sporty racing bike
    const drawSportEmpty = (ctx, w, h) => {
      // A. Draw shadow under bike
      ctx.beginPath();
      ctx.ellipse(w/2, 71, 32, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fill();

      // Sporty Kickstand (tilted slightly left)
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w/2 - 6, 56);
      ctx.lineTo(w/2 - 14, 71);
      ctx.stroke();

      // B. Fat Rear Wheel/Tire (center x = w/2 = 64, y = 58)
      ctx.fillStyle = '#0f172a'; // extra dark tire
      ctx.fillRect(w/2 - 10, 48, 20, 22); // thick sporty tire

      // C. Sporty Exhaust (angled up sharply)
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(w/2 + 10, 64);
      ctx.lineTo(w/2 + 22, 42);
      ctx.lineTo(w/2 + 16, 40);
      ctx.lineTo(w/2 + 6, 62);
      ctx.closePath();
      ctx.fill();

      // D. Mono-shock
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w/2, 44);
      ctx.lineTo(w/2, 54);
      ctx.stroke();

      // E. License Plate
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 8, 38, 16, 6);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(w/2 - 6, 42, 12, 8);
      
      // F. Taillight
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(w/2 - 14, 32, 28, 4);

      // G. Sport Seat (very high, black)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 14, 26, 28, 6);

      // I. Handlebars (Lower position, clip-ons)
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w/2 - 24, 21);
      ctx.lineTo(w/2 + 24, 21);
      ctx.stroke();
    };

    const drawTrafficScooter = (ctx, w, h) => {
      // 1. Draw shadow under bike
      ctx.beginPath();
      ctx.ellipse(w/2, 71, 24, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fill();

      // 2. Rear Wheel/Tire
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 6, 52, 12, 18);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 1.5, 52, 3, 18);

      // 3. Yellow scooter body / fender
      ctx.fillStyle = '#fbbf24'; // Bright yellow
      ctx.beginPath();
      ctx.moveTo(w/2 - 9, 39);
      ctx.quadraticCurveTo(w/2 - 10, 48, w/2 - 8, 55);
      ctx.lineTo(w/2 + 8, 55);
      ctx.quadraticCurveTo(w/2 + 10, 48, w/2 + 9, 39);
      ctx.closePath();
      ctx.fill();

      // Black rubber mud flap
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w/2 - 8, 55, 16, 3);

      // License Plate
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(w/2 - 7, 47, 14, 8);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(w/2 - 7, 47, 14, 8);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 5, 49, 10, 1);
      ctx.fillRect(w/2 - 4, 52, 8, 1);

      // Red brake light
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(w/2, 39, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w/2 - 1.5, 37.5, 3, 1);

      // Orange turn signals
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(w/2 - 12, 40, 2, 0, Math.PI * 2);
      ctx.arc(w/2 + 12, 40, 2, 0, Math.PI * 2);
      ctx.fill();

      // Torso - Blue Jacket Rider
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.moveTo(w/2 - 14, 32);
      ctx.lineTo(w/2 + 14, 32);
      ctx.lineTo(w/2 + 11, 20);
      ctx.lineTo(w/2 - 11, 20);
      ctx.closePath();
      ctx.fill();

      // Helmet (Yellow)
      ctx.fillStyle = '#fed7aa'; // Neck
      ctx.fillRect(w/2 - 2, 17, 4, 3);
      ctx.beginPath();
      ctx.arc(w/2, 12, 6, Math.PI, 0, false);
      ctx.lineTo(w/2 - 6, 12);
      ctx.closePath();
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
    };

    const drawTrafficCar = (ctx, w, h) => {
      // 1. Draw shadow under car
      ctx.beginPath();
      ctx.ellipse(w/2, h - 15, 60, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();

      // 2. Tires
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(22, h - 35, 20, 20);
      ctx.fillRect(w - 42, h - 35, 20, 20);

      // 3. Lower Chassis
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(30, h - 30, w - 60, 12);

      // 4. Car Body (dark blue metallic)
      ctx.fillStyle = '#1d4ed8'; // Dark blue body
      ctx.beginPath();
      ctx.roundRect(16, h - 75, w - 32, 48, [12, 12, 4, 4]);
      ctx.fill();

      // 5. Cabin/Roof
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.moveTo(35, h - 75);
      ctx.lineTo(48, h - 108);
      ctx.lineTo(w - 48, h - 108);
      ctx.lineTo(w - 35, h - 75);
      ctx.closePath();
      ctx.fill();

      // Rear window glass
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(38, h - 77);
      ctx.lineTo(50, h - 105);
      ctx.lineTo(w - 50, h - 105);
      ctx.lineTo(w - 38, h - 77);
      ctx.closePath();
      ctx.fill();

      // 6. License Plate
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(w/2 - 18, h - 50, 36, 14);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.strokeRect(w/2 - 18, h - 50, 36, 14);
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 7px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('29A-888', w/2, h - 43);

      // 7. Taillights (Red LED bar style)
      ctx.fillStyle = '#ef4444'; // Red brake lights
      ctx.fillRect(22, h - 68, 24, 6);
      ctx.fillRect(w - 46, h - 68, 24, 6);

      // Red reflectors below
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(25, h - 42, 10, 2);
      ctx.fillRect(w - 35, h - 42, 10, 2);
    };

    // Define all canvas textures
    this.createCanvasTexture('motorbike_cub', 128, 80, drawCubMotorbike);
    this.createCanvasTexture('motorbike_cub_empty', 128, 80, drawCubEmpty);
    this.createCanvasTexture('motorbike_sport', 128, 80, drawSportMotorbike);
    this.createCanvasTexture('motorbike_sport_empty', 128, 80, drawSportEmpty);
    this.createCanvasTexture('traffic_scooter', 128, 80, drawTrafficScooter);
    this.createCanvasTexture('traffic_car', 160, 120, drawTrafficCar);

    // Default keys for backward compatibility
    this.createCanvasTexture('motorbike', 128, 80, drawCubMotorbike);
    this.createCanvasTexture('motorbike_empty', 128, 80, drawCubEmpty);

    // 2. Obstacle: Pothole (Detailed broken concrete)
    this.createCanvasTexture('obstacle_pothole', 64, 32, (ctx, w, h) => {
      const cx = w / 2;
      const cy = h / 2;
      const rot = Math.PI / 12;

      // Helper to generate a jagged path and return the points
      const getJaggedPoints = (rx, ry, numPoints) => {
        const points = [];
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          // Deterministic noise using sine/cosine functions for a rugged edge
          const noise = Math.sin(angle * 9) * 1.5 + Math.cos(angle * 17) * 0.8;
          const currentRx = rx + noise;
          const currentRy = ry + noise * (ry / rx);

          const cosA = Math.cos(rot);
          const sinA = Math.sin(rot);
          const localX = currentRx * Math.cos(angle);
          const localY = currentRy * Math.sin(angle);

          const x = cx + localX * cosA - localY * sinA;
          const y = cy + localX * sinA + localY * cosA;
          points.push({ x, y, angle });
        }
        return points;
      };

      // Draw outer cracked asphalt border: #4a5568
      const outerPoints = getJaggedPoints(28, 10, 20);
      ctx.beginPath();
      ctx.moveTo(outerPoints[0].x, outerPoints[0].y);
      for (let i = 1; i < outerPoints.length; i++) {
        ctx.lineTo(outerPoints[i].x, outerPoints[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = '#4a5568';
      ctx.fill();

      // Draw shadow rim: #2d3748
      const midPoints = getJaggedPoints(23, 8, 18);
      ctx.beginPath();
      ctx.moveTo(midPoints[0].x, midPoints[0].y);
      for (let i = 1; i < midPoints.length; i++) {
        ctx.lineTo(midPoints[i].x, midPoints[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = '#2d3748';
      ctx.fill();

      // Draw deep bottom: #080a0f
      const innerPoints = getJaggedPoints(16, 5.5, 16);
      ctx.beginPath();
      ctx.moveTo(innerPoints[0].x, innerPoints[0].y);
      for (let i = 1; i < innerPoints.length; i++) {
        ctx.lineTo(innerPoints[i].x, innerPoints[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = '#080a0f';
      ctx.fill();

      // Draw fine cracks radiating from the outer points onto the road surface
      ctx.strokeStyle = '#4a5568';
      ctx.lineWidth = 1;
      
      const crackIndices = [0, 4, 8, 12, 16];
      crackIndices.forEach(idx => {
        if (idx < outerPoints.length) {
          const start = outerPoints[idx];
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          
          let curX = start.x;
          let curY = start.y;
          const angle = start.angle;
          
          // Crack path of 3 segments
          const segments = 3;
          for (let s = 1; s <= segments; s++) {
            const length = 3.5 + Math.sin(idx * 2 + s) * 1.5;
            const devAngle = angle + (Math.sin(idx * s + 5) * 0.5);
            curX += Math.cos(devAngle) * length;
            curY += Math.sin(devAngle) * length;
            ctx.lineTo(curX, curY);

            // Sub-branch crack sometimes
            if (s === 2 && idx % 8 === 0) {
              const branchAngle = devAngle + (idx % 2 === 0 ? 0.6 : -0.6);
              const bLen = 3;
              const bx = curX + Math.cos(branchAngle) * bLen;
              const by = curY + Math.sin(branchAngle) * bLen;
              
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(curX, curY);
              ctx.lineTo(bx, by);
              ctx.strokeStyle = '#2d3748';
              ctx.stroke();
              ctx.restore();
            }
          }
          ctx.stroke();
        }
      });
    });

    // 3. Obstacle: Puddle (Cyan water ripple)
    this.createCanvasTexture('obstacle_puddle', 64, 32, (ctx, w, h) => {
      const cx = w / 2;
      const cy = h / 2;
      const rot = -Math.PI / 16;

      // Draw the main organic puddle shape (semi-transparent cyan fill)
      ctx.beginPath();
      const numPoints = 24;
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        // Smooth organic variation (low frequency)
        const noise = Math.sin(angle * 3) * 1.5 + Math.cos(angle * 5) * 0.8;
        const currentRx = 28 + noise;
        const currentRy = 10 + noise * (10 / 28);

        const cosA = Math.cos(rot);
        const sinA = Math.sin(rot);
        const localX = currentRx * Math.cos(angle);
        const localY = currentRy * Math.sin(angle);

        const x = cx + localX * cosA - localY * sinA;
        const y = cy + localX * sinA + localY * cosA;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 220, 255, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 220, 255, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Helper for drawing concentric ripples offset slightly
      const drawRipple = (rx, ry, dx, dy, color, width) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.ellipse(cx + dx, cy + dy, rx, ry, rot, 0, Math.PI * 2);
        ctx.stroke();
      };

      // Draw multiple concentric thin ripples offset slightly to represent water movement
      drawRipple(18, 6.4, -2, 1, 'rgba(255, 255, 255, 0.35)', 0.8);
      drawRipple(12, 4.2, 1.5, -0.5, 'rgba(0, 220, 255, 0.5)', 0.7);
      drawRipple(6, 2.1, -0.5, 0.8, 'rgba(255, 255, 255, 0.5)', 0.6);
    });

    // 4. Obstacle: Street Vendor (Banh Mi Cart with striped canopy)
    this.createCanvasTexture('obstacle_vendor', 64, 64, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 6, 24, 5);

      // Wheels
      ctx.strokeStyle = '#4b5563';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(w/2 - 16, h - 14, 10, 0, Math.PI * 2);
      ctx.arc(w/2 + 16, h - 14, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Cart body (yellow oak panel)
      ctx.fillStyle = '#d97706';
      ctx.fillRect(w/2 - 24, h - 42, 48, 28);
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(w/2 - 24, h - 42, 48, 28);

      // Signboard
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(w/2 - 18, h - 36, 36, 12);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('BÁNH MÌ', w/2, h - 30);

      // Canopy poles
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w/2 - 20, h - 42);
      ctx.lineTo(w/2 - 20, h - 58);
      ctx.moveTo(w/2 + 20, h - 42);
      ctx.lineTo(w/2 + 20, h - 58);
      ctx.stroke();

      // Canopy cover (red and white stripes)
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(w/2 - 26, h - 60, 52, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w/2 - 16, h - 60, 10, 6);
      ctx.fillRect(w/2 + 6, h - 60, 10, 6);
    });

    // 5. Obstacle: Pedestrian (Student walking)
    this.createCanvasTexture('obstacle_pedestrian', 32, 64, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 4, 12, 3);

      // Pants
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(w/2 - 5, h - 26, 4, 22);
      ctx.fillRect(w/2 + 1, h - 26, 4, 22);

      // Shirt (white uniform)
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(w/2 - 7, h - 44, 14, 18);

      // Face skin
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(w/2, h - 50, 6, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(w/2, h - 52, 6, Math.PI, 0);
      ctx.fill();
    });

    // 6. Obstacle: Car (Orange sedan)
    this.createCanvasTexture('obstacle_car', 96, 64, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 8, 42, 6);

      // Body
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(12, h - 36, w - 24, 24);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(20, h - 48, w - 40, 14);

      // Windows
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(24, h - 44, w - 48, 10);

      // Wheels
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(28, h - 12, 10, 0, Math.PI * 2);
      ctx.arc(w - 28, h - 12, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    // 7. Obstacle: Truck (Large blue container)
    this.createCanvasTexture('obstacle_truck', 144, 96, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 10, 64, 8);

      // Cabin (blue)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(w - 44, h - 60, 36, 46);
      
      // Windshield
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(w - 38, h - 54, 26, 16);

      // Container body
      ctx.fillStyle = '#0369a1';
      ctx.fillRect(8, h - 76, w - 54, 62);

      // Wheels
      ctx.fillStyle = '#1e293b';
      for (let x of [24, 52, w - 30]) {
        ctx.beginPath();
        ctx.arc(x, h - 14, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 8. Map Sprite: An (Full body standing pixel figure)
    this.createCanvasTexture('avatar_an', 48, 48, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 4, 12, 3);

      // Blue pants
      ctx.fillStyle = '#2b52b7';
      ctx.fillRect(w/2 - 4, h - 18, 3, 14);
      ctx.fillRect(w/2 + 1, h - 18, 3, 14);

      // Uniform shirt
      ctx.fillStyle = '#fdfbf2';
      ctx.fillRect(w/2 - 6, h - 32, 12, 14);
      // Blue trim
      ctx.fillStyle = '#2b52b7';
      ctx.fillRect(w/2 - 6, h - 32, 12, 3);

      // Face skin
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(w/2, h - 38, 5, 0, Math.PI * 2);
      ctx.fill();

      // Black hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(w/2, h - 40, 5.5, Math.PI, 0);
      ctx.fill();
    });

    // 9. Map Sprite: Mom (Full body standing in teal blouse)
    this.createCanvasTexture('avatar_mom', 48, 48, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 4, 10, 3);

      // Black trousers
      ctx.fillStyle = '#111827';
      ctx.fillRect(w/2 - 3, h - 16, 2, 12);
      ctx.fillRect(w/2 + 1, h - 16, 2, 12);

      // Teal Blouse (Áo bà ba ngọc lam)
      ctx.fillStyle = '#0d9488';
      ctx.fillRect(w/2 - 6, h - 30, 12, 14);

      // Face skin
      ctx.fillStyle = '#ffedd5';
      ctx.beginPath();
      ctx.arc(w/2, h - 35, 5, 0, Math.PI * 2);
      ctx.fill();

      // Hair with Bun
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(w/2, h - 37, 5.5, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w/2 + 4, h - 35, 2.5, 0, Math.PI * 2); // hair bun
      ctx.fill();
    });

    // 10. Map Sprite: Neighbor Bác Nam (Full body in green shirt)
    this.createCanvasTexture('avatar_neighbor', 48, 48, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 4, 11, 3);

      // Brown pants
      ctx.fillStyle = '#78350f';
      ctx.fillRect(w/2 - 4, h - 18, 3, 14);
      ctx.fillRect(w/2 + 1, h - 18, 3, 14);

      // Green t-shirt
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(w/2 - 6, h - 32, 12, 14);

      // Tanned face
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(w/2, h - 37, 5, 0, Math.PI * 2);
      ctx.fill();

      // Graying hair
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(w/2, h - 39, 5.5, Math.PI, 0);
      ctx.fill();
    });

    // 11. Cozy sofa
    this.createCanvasTexture('room_sofa', 128, 64, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 8, 60, 8);
      ctx.fillStyle = '#0f766e'; // Teal sofa
      ctx.fillRect(4, 4, w - 8, h - 12);
      ctx.fillStyle = '#0d9488'; // Cushions
      ctx.fillRect(10, 8, w - 20, 24);
      ctx.fillRect(10, 36, w - 20, 16);
    });

    // 12. Student study desk
    this.createCanvasTexture('room_desk', 64, 64, (ctx, w, h) => {
      drawShadow(ctx, w/2, h - 6, 28, 5);
      
      // Wooden desk
      ctx.fillStyle = '#78350f';
      ctx.fillRect(8, 28, w - 16, 30);
      ctx.fillStyle = '#b45309'; // Surface
      ctx.fillRect(4, 18, w - 8, 10);

      // Banker lamp and yellow warm glow
      ctx.fillStyle = '#065f46'; // emerald shade
      ctx.fillRect(w - 22, 6, 8, 6);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(w - 19, 12, 2, 6);

      // Light beam
      ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
      ctx.beginPath();
      ctx.moveTo(w - 18, 12);
      ctx.lineTo(w - 36, 28);
      ctx.lineTo(w - 4, 28);
      ctx.closePath();
      ctx.fill();
    });

    // 13. Room door with window
    this.createCanvasTexture('room_door', 64, 128, (ctx, w, h) => {
      ctx.fillStyle = '#5c3d24'; // Frame
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#8c5e3c'; // Panel
      ctx.fillRect(4, 4, w - 8, h - 8);

      // Door window shining
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(16, 20, w - 32, 24);
      ctx.strokeStyle = '#78350f';
      ctx.strokeRect(16, 20, w - 32, 24);
    });

    // 14. UI Coin
    this.createCanvasTexture('ui_coin', 32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(w/2, h/2, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(w/2, h/2, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', w/2, h/2);
    });

    // 15. UI Helmet
    this.createCanvasTexture('ui_helmet', 32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(w/2, h/2 - 2, 10, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w/2 - 8, h/2 - 2, 16, 4);
    });

    // 16. Background Home (Terracotta floor & cream wall)
    this.createCanvasTexture('background_home', 800, 600, (ctx, w, h) => {
      ctx.fillStyle = '#faf6e3'; // wall
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#d4a373'; // floor
      ctx.fillRect(20, 100, w - 40, h - 120);
    });

    // 17. Portrait: An Neutral
    this.createCanvasTexture('avatar_an_neutral', 96, 96, (ctx, w, h) => {
      ctx.fillStyle = '#fffbeb';
      ctx.fillRect(0, 0, 96, 96);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 92, 92);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, 86, 86);

      // Body
      ctx.fillStyle = '#2b52b7';
      ctx.fillRect(28, 64, 40, 26);
      ctx.fillStyle = '#fdfbf2';
      ctx.beginPath();
      ctx.moveTo(34, 66);
      ctx.lineTo(62, 66);
      ctx.lineTo(68, h);
      ctx.lineTo(28, h);
      ctx.closePath();
      ctx.fill();

      // Face skin
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(w/2, 44, 20, 0, Math.PI * 2);
      ctx.fill();

      // Black hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(w/2, 40, 21, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(w/2 - 21, 40, 42, 6);

      // Eyes
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(38, 44, 3, Math.PI, 0);
      ctx.arc(58, 44, 3, Math.PI, 0);
      ctx.stroke();

      // Smile mouth
      ctx.beginPath();
      ctx.arc(w/2, 52, 4, 0, Math.PI);
      ctx.stroke();
    });

    // 18. Portrait: An Worried
    this.createCanvasTexture('avatar_an_worried', 96, 96, (ctx, w, h) => {
      ctx.fillStyle = '#fffbeb';
      ctx.fillRect(0, 0, 96, 96);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 92, 92);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, 86, 86);

      // Body
      ctx.fillStyle = '#2b52b7';
      ctx.fillRect(28, 64, 40, 26);
      ctx.fillStyle = '#fdfbf2';
      ctx.beginPath();
      ctx.moveTo(34, 66);
      ctx.lineTo(62, 66);
      ctx.lineTo(68, h);
      ctx.lineTo(28, h);
      ctx.closePath();
      ctx.fill();

      // Face skin
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(w/2, 44, 20, 0, Math.PI * 2);
      ctx.fill();

      // Black hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(w/2, 40, 21, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(w/2 - 21, 40, 42, 6);

      // Eyebrows
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(32, 34); ctx.lineTo(42, 38);
      ctx.moveTo(64, 34); ctx.lineTo(54, 38);
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(36, 42, 4, 4);
      ctx.fillRect(56, 42, 4, 4);

      // Mouth
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(42, 54); ctx.lineTo(54, 54);
      ctx.stroke();

      // Sweat
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.moveTo(70, 32);
      ctx.lineTo(67, 39);
      ctx.lineTo(73, 39);
      ctx.closePath();
      ctx.fill();
    });

    // 19. Portrait: Mom Caring
    this.createCanvasTexture('avatar_mom_caring', 96, 96, (ctx, w, h) => {
      ctx.fillStyle = '#fffbeb';
      ctx.fillRect(0, 0, 96, 96);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 92, 92);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, 86, 86);

      // Blouse
      ctx.fillStyle = '#0d9488';
      ctx.beginPath();
      ctx.moveTo(28, 68);
      ctx.lineTo(68, 68);
      ctx.lineTo(74, h);
      ctx.lineTo(22, h);
      ctx.closePath();
      ctx.fill();

      // Face skin
      ctx.fillStyle = '#ffedd5';
      ctx.beginPath();
      ctx.arc(w/2, 44, 20, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(w/2, 40, 21, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(w/2 - 21, 40, 42, 6);
      ctx.beginPath();
      ctx.arc(w/2 + 22, 42, 6, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(38, 44, 3, Math.PI, 0);
      ctx.arc(58, 44, 3, Math.PI, 0);
      ctx.stroke();

      // Mouth
      ctx.beginPath();
      ctx.arc(w/2, 51, 3.5, 0, Math.PI);
      ctx.stroke();
    });

    // 20. Portrait: Mom Worried
    this.createCanvasTexture('avatar_mom_worried', 96, 96, (ctx, w, h) => {
      ctx.fillStyle = '#fffbeb';
      ctx.fillRect(0, 0, 96, 96);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 92, 92);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, 86, 86);

      // Blouse
      ctx.fillStyle = '#8e7cc3';
      ctx.beginPath();
      ctx.moveTo(28, 68);
      ctx.lineTo(68, 68);
      ctx.lineTo(74, h);
      ctx.lineTo(22, h);
      ctx.closePath();
      ctx.fill();

      // Face skin
      ctx.fillStyle = '#ffedd5';
      ctx.beginPath();
      ctx.arc(w/2, 44, 20, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(w/2, 40, 21, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(w/2 - 21, 40, 42, 6);
      ctx.beginPath();
      ctx.arc(w/2 + 22, 42, 6, 0, Math.PI * 2);
      ctx.fill();

      // Eyebrows
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(32, 33); ctx.lineTo(42, 37);
      ctx.moveTo(64, 33); ctx.lineTo(54, 37);
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(36, 42, 4, 4);
      ctx.fillRect(56, 42, 4, 4);

      // Mouth
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(w/2, 52, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.stroke();
    });

    // 21. Portrait: Mom Angry
    this.createCanvasTexture('avatar_mom_angry', 96, 96, (ctx, w, h) => {
      ctx.fillStyle = '#fffbeb';
      ctx.fillRect(0, 0, 96, 96);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 92, 92);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, 86, 86);

      // Blouse
      ctx.fillStyle = '#0d9488';
      ctx.beginPath();
      ctx.moveTo(28, 68);
      ctx.lineTo(68, 68);
      ctx.lineTo(74, h);
      ctx.lineTo(22, h);
      ctx.closePath();
      ctx.fill();

      // Face skin
      ctx.fillStyle = '#ffedd5';
      ctx.beginPath();
      ctx.arc(w/2, 44, 20, 0, Math.PI * 2);
      ctx.fill();

      // Flushed cheeks
      ctx.fillStyle = 'rgba(239, 68, 68, 0.22)';
      ctx.beginPath();
      ctx.arc(32, 48, 5, 0, Math.PI * 2);
      ctx.arc(64, 48, 5, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(w/2, 40, 21, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(w/2 - 21, 40, 42, 6);
      ctx.beginPath();
      ctx.arc(w/2 + 22, 42, 6, 0, Math.PI * 2);
      ctx.fill();

      // Eyebrows
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(32, 38); ctx.lineTo(42, 35);
      ctx.moveTo(64, 38); ctx.lineTo(54, 35);
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(36, 42, 4, 3);
      ctx.fillRect(56, 42, 4, 3);

      // Mouth
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(42, 52); ctx.lineTo(54, 52);
      ctx.stroke();
    });

    // 22. Portrait: Bác Nam Friendly
    this.createCanvasTexture('avatar_neighbor_friendly', 96, 96, (ctx, w, h) => {
      ctx.fillStyle = '#fffbeb';
      ctx.fillRect(0, 0, 96, 96);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 92, 92);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, 86, 86);

      // Blouse
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.moveTo(24, 68);
      ctx.lineTo(72, 68);
      ctx.lineTo(76, h);
      ctx.lineTo(20, h);
      ctx.closePath();
      ctx.fill();

      // Face skin
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(w/2, 44, 20, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(w/2, 40, 21, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(w/2 - 21, 40, 42, 4);

      // Eyes
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(38, 45, 3.5, Math.PI, 0);
      ctx.arc(58, 45, 3.5, Math.PI, 0);
      ctx.stroke();

      // Mouth
      ctx.beginPath();
      ctx.arc(w/2, 51, 6, 0, Math.PI);
      ctx.stroke();
    });

    // 23. School Gate (Vietnamese university Đại học UEH style)
    this.createCanvasTexture('school_gate', 256, 192, (ctx, w, h) => {
      // Ground / grass background
      ctx.fillStyle = '#15803d'; // Green grass
      ctx.fillRect(0, 172, w, h - 172);

      // Silver flagpole on the left side
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(86, 160);
      ctx.lineTo(86, 15);
      ctx.stroke();

      // Red flag
      ctx.fillStyle = '#da251d';
      ctx.fillRect(87, 15, 28, 18);

      // Yellow star in the center of the flag
      const drawStar = (cx, cy, spikes, outerRadius, innerRadius, fillStyle) => {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;
          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.closePath();
        ctx.fillStyle = fillStyle;
        ctx.fill();
      };
      drawStar(101, 24, 5, 4, 1.8, '#ffff00');

      // Stone base of the monument
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(110, 160, 56, 12);

      // Tall vertical pillar (red-brown granite)
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(118, 30, 40, 130);

      // Vertical name plaque (dark blue with gold border)
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(124, 38, 28, 114);
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(124, 38, 28, 114);

      // Vertical gold text "ĐẠI HỌC UEH" drawn letter-by-letter
      const chars = ['Đ', 'Ạ', 'I', ' ', 'H', 'Ọ', 'C', ' ', 'U', 'E', 'H'];
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#fbbf24';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      chars.forEach((char, index) => {
        if (char !== ' ') {
          ctx.fillText(char, 138, 48 + index * 10);
        }
      });

      // Green bushes at the base of the pillar and flagpole
      ctx.fillStyle = '#166534';
      ctx.beginPath();
      ctx.arc(80, 165, 8, 0, Math.PI * 2);
      ctx.arc(92, 165, 9, 0, Math.PI * 2);
      ctx.arc(110, 166, 10, 0, Math.PI * 2);
      ctx.arc(125, 168, 8, 0, Math.PI * 2);
      ctx.arc(142, 167, 9, 0, Math.PI * 2);
      ctx.arc(158, 166, 10, 0, Math.PI * 2);
      ctx.arc(170, 165, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(86, 162, 6, 0, Math.PI * 2);
      ctx.arc(102, 163, 7, 0, Math.PI * 2);
      ctx.arc(118, 164, 8, 0, Math.PI * 2);
      ctx.arc(134, 164, 7, 0, Math.PI * 2);
      ctx.arc(150, 163, 8, 0, Math.PI * 2);
      ctx.arc(164, 162, 6, 0, Math.PI * 2);
      ctx.fill();

      // Steel fence segment attached to the right of the pillar
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(158, 100);
      ctx.lineTo(210, 100);
      ctx.moveTo(158, 150);
      ctx.lineTo(210, 150);
      ctx.stroke();

      ctx.beginPath();
      for (let bx = 166; bx <= 206; bx += 8) {
        ctx.moveTo(bx, 95);
        ctx.lineTo(bx, 160);
      }
      ctx.stroke();
    });
  }
}
