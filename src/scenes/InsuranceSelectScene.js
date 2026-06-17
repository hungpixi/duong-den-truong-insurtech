import Phaser from 'phaser';
import { INSURANCE_PACKAGES } from '../systems/InsuranceSystem.js';
import { LoopSystem } from '../systems/LoopSystem.js';

export class InsuranceSelectScene extends Phaser.Scene {
  constructor() {
    super('InsuranceSelectScene');
  }

  init(data) {
    // Load state passed from previous scene or fallback to LoopSystem
    this.loopState = data.state || LoopSystem.loadState();
  }

  create() {
    const width = this.cameras.main.width; // 960
    const height = this.cameras.main.height; // 540

    // 1. Draw Background
    this.add.graphics()
      .fillGradientStyle(0x0f172a, 0x0f172a, 0x1e293b, 0x1e293b, 1)
      .fillRect(0, 0, width, height);

    // Grid details
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x334155, 0.2);
    for (let x = 0; x < width; x += 40) {
      grid.lineBetween(x, 0, x, height);
    }
    for (let y = 0; y < height; y += 40) {
      grid.lineBetween(0, y, width, y);
    }

    // Header Panel
    const dayName = `VÒNG LẶP THỨ ${this.loopState.loopCount}`;
    this.add.text(width / 2, 35, 'CHỌN GÓI BẢO HIỂM HÀNH TRÌNH', {
      fontFamily: "'Courier New', monospace",
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#38bdf8'
    }).setOrigin(0.5);

    this.add.text(width / 2, 70, `${dayName}  |  Ví tài chính: ${this.loopState.coin} xu`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '15px',
      color: '#fbbf24',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // 2. Draw Cards (4 cards: None, Red Helmet, Old Bike, School Route)
    // Canvas width = 960. 4 cards of width 200. Total width = 800.
    // 5 gaps of 32px: 32 + 200 + 32 + 200 + 32 + 200 + 32 + 200 + 32 = 960.
    const cardWidth = 200;
    const cardHeight = 350;
    const startX = 32;
    const spacing = 32;
    const cardY = 110;

    INSURANCE_PACKAGES.forEach((pkg, index) => {
      const cardX = startX + index * (cardWidth + spacing);
      this.drawInsuranceCard(cardX, cardY, cardWidth, cardHeight, pkg);
    });

    // 3. Floating help label
    this.add.text(width / 2, 495, '* Lưu ý: Bảo hiểm không ngăn chặn tai nạn, nó giảm thiểu cú sốc tài chính khi gặp rủi ro.', {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#94a3b8',
      fontStyle: 'italic'
    }).setOrigin(0.5);
  }

  drawInsuranceCard(x, y, width, height, pkg) {
    const cardContainer = this.add.container(x, y);

    // Determine color schemes
    let accentColor = 0x38bdf8; // Blue
    let titleColor = '#38bdf8';
    if (pkg.id === 'none') {
      accentColor = 0xef4444; // Red
      titleColor = '#ef4444';
    } else if (pkg.id === 'school_route') {
      accentColor = 0x10b981; // Green
      titleColor = '#10b981';
    } else if (pkg.id === 'old_bike') {
      accentColor = 0xf59e0b; // Amber/Orange
      titleColor = '#f59e0b';
    } else if (pkg.id === 'red_helmet') {
      accentColor = 0xf87171; // Light Red
      titleColor = '#f87171';
    }

    // Glassmorphic Card Frame
    const frame = this.add.graphics();
    frame.fillStyle(0x1e293b, 0.85); // Dark blue-gray glass
    frame.fillRoundedRect(0, 0, width, height, 12);
    frame.lineStyle(2, accentColor, 0.7);
    frame.strokeRoundedRect(0, 0, width, height, 12);
    cardContainer.add(frame);

    // Shadow panel for header
    frame.fillStyle(0x0f172a, 0.4);
    frame.fillRect(0, 0, width, 50);
    
    // Top border highlight inside card
    frame.lineStyle(1, 0xffffff, 0.1);
    frame.lineBetween(2, 50, width - 2, 50);

    // Large Emoji Icon
    const emojiText = this.add.text(width / 2, 25, pkg.icon, {
      fontSize: '26px'
    }).setOrigin(0.5);
    cardContainer.add(emojiText);
    
    // Add text fields
    const nameText = this.add.text(width / 2, 72, pkg.name, {
      fontFamily: "'Courier New', monospace",
      fontSize: '14px',
      fontStyle: 'bold',
      color: titleColor,
      align: 'center',
      wordWrap: { width: width - 20 }
    }).setOrigin(0.5);
    cardContainer.add(nameText);

    const priceText = this.add.text(width / 2, 100, pkg.price === 0 ? 'MIỄN PHÍ' : `${pkg.price} COIN`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#fef08a'
    }).setOrigin(0.5);
    cardContainer.add(priceText);

    // Description text
    const descText = this.add.text(12, 125, pkg.description, {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#cbd5e1',
      wordWrap: { width: width - 24 }
    });
    cardContainer.add(descText);

    // Benefits section
    const prosTitle = this.add.text(12, 175, 'Ưu điểm:', {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#22c55e'
    });
    cardContainer.add(prosTitle);

    const prosText = this.add.text(12, 190, pkg.pros, {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#a7f3d0',
      wordWrap: { width: width - 24 }
    });
    cardContainer.add(prosText);

    // Limitations section
    const consTitle = this.add.text(12, 240, 'Hạn chế:', {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#f97316'
    });
    cardContainer.add(consTitle);

    const consText = this.add.text(12, 255, pkg.cons, {
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      color: '#fed7aa',
      wordWrap: { width: width - 24 }
    });
    cardContainer.add(consText);

    // Select Button Container
    const btnContainer = this.add.container(width / 2, 315);
    cardContainer.add(btnContainer);

    const btnWidth = width - 40;
    const btnHeight = 30;
    
    // Check if player has enough money
    const hasEnoughCoins = this.loopState.coin >= pkg.price;

    const btnBg = this.add.graphics();
    if (!hasEnoughCoins) {
      btnBg.fillStyle(0x475569, 0.4);
      btnBg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 6);
      btnBg.lineStyle(1, 0x334155, 0.5);
      btnBg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 6);
    } else {
      btnBg.fillStyle(0x1e293b, 0.95);
      btnBg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 6);
      btnBg.lineStyle(1.5, accentColor, 0.8);
      btnBg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 6);
    }

    btnContainer.add(btnBg);

    const btnText = this.add.text(0, 0, hasEnoughCoins ? 'CHỌN GÓI' : 'HẾT TIỀN', {
      fontFamily: "'Courier New', monospace",
      fontSize: '12px',
      fontStyle: 'bold',
      color: hasEnoughCoins ? '#f8fafc' : '#64748b'
    }).setOrigin(0.5);
    btnContainer.add(btnText);

    // Button interactions
    if (hasEnoughCoins) {
      const zone = this.add.zone(0, 0, btnWidth, btnHeight)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      zone.on('pointerover', () => {
        btnBg.clear();
        btnBg.fillStyle(accentColor, 1.0);
        btnBg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 6);
        btnBg.lineStyle(1.5, 0xffffff, 1.0);
        btnBg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 6);
        btnText.setColor(accentColor === 0xef4444 ? '#ffffff' : '#0f172a');
        this.playHoverSound();
      });

      zone.on('pointerout', () => {
        btnBg.clear();
        btnBg.fillStyle(0x1e293b, 0.95);
        btnBg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 6);
        btnBg.lineStyle(1.5, accentColor, 0.8);
        btnBg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 6);
        btnText.setColor('#f8fafc');
      });

      zone.on('pointerdown', () => {
        this.selectPackage(pkg);
      });

      btnContainer.add(zone);
    }
  }

  selectPackage(pkg) {
    const cost = pkg.price;
    this.loopState.coin -= cost;
    this.loopState.selectedInsurancePackage = pkg.id;
    
    // Save updated state
    LoopSystem.saveState(this.loopState);
    
    // Play success chime
    this.playSuccessChime();

    // Disable cards and show overlay transition
    const overlay = this.add.graphics();
    overlay.fillStyle(0x0f172a, 0);
    overlay.fillRect(0, 0, 960, 540);
    overlay.setDepth(2000);

    const successText = this.add.text(480, 270, `ĐÃ ĐĂNG KÝ: ${pkg.name.toUpperCase()}`, {
      fontFamily: "'Courier New', monospace",
      fontSize: '22px',
      color: '#ffffff',
      fontStyle: 'bold',
      backgroundColor: '#0f172a',
      padding: { x: 20, y: 15 }
    }).setOrigin(0.5).setDepth(2001).setAlpha(0);

    // Fade in text and transition
    this.tweens.add({
      targets: successText,
      alpha: 1,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 500,
      ease: 'Quad.easeOut',
      onComplete: () => {
        this.time.delayedCall(800, () => {
          this.scene.start('RoadScene', { state: this.loopState });
        });
      }
    });
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
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch(e){}
  }

  playSuccessChime() {
    try {
      const ctx = this.sound.context;
      if (!ctx || ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      
      // Chime: E5 -> G5 -> C6
      const notes = [659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.03, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.15);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.15);
      });
    } catch(e){}
  }
}
