export class DialogSystem {
  constructor(scene) {
    this.scene = scene;
    this.container = null;
    this.bg = null;
    this.nameText = null;
    this.dialogText = null;
    this.cursor = null;
    this.choiceButtons = [];
    
    this.dialogueList = [];
    this.currentIndex = 0;
    this.onComplete = null;
    
    this.isTyping = false;
    this.typingTimer = null;
    this.currentText = "";
    this.fullText = "";
    this.charIndex = 0;

    // Standard styling dimensions
    this.width = scene.sys.game.config.width * 0.9;
    this.height = 140;
    this.x = (scene.sys.game.config.width - this.width) / 2;
    this.y = scene.sys.game.config.height - this.height - 20;
  }

  // Plays a retro blip sound per character typed
  playBlip() {
    try {
      const ctx = this.scene.sound.context;
      if (!ctx || ctx.state === 'suspended') return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130 + Math.random() * 30, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  // Plays a low horror buzz sound on dangerous choices
  playRiskyBuzz() {
    try {
      const ctx = this.scene.sound.context;
      if (!ctx || ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.linearRampToValueAtTime(40, now + 0.6);
      
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {}
  }

  create() {
    if (this.container) {
      this.container.destroy();
    }

    this.container = this.scene.add.container(this.x, this.y);
    this.container.setScrollFactor(0);
    this.container.setDepth(2500); // Overlay on top

    // Slate dark background
    this.bg = this.scene.add.graphics();
    this.bg.fillStyle(0x020617, 0.96); // Slate 950
    this.bg.fillRoundedRect(0, 0, this.width, this.height, 10);
    this.bg.lineStyle(2, 0xef4444, 0.85); // Glowing Red Border
    this.bg.strokeRoundedRect(0, 0, this.width, this.height, 10);
    this.container.add(this.bg);

    // Speaker Portrait Image
    this.portraitImg = this.scene.add.image(65, 70, 'avatar_an_neutral');
    this.portraitImg.setDisplaySize(96, 96);
    this.portraitImg.setVisible(false);
    this.container.add(this.portraitImg);

    // Name Plate Box
    this.nameBg = this.scene.add.graphics();
    this.nameBg.fillStyle(0xef4444, 1.0); // Neon Red Nameplate
    this.nameBg.fillRoundedRect(20, -15, 120, 30, 6);
    this.container.add(this.nameBg);

    this.nameText = this.scene.add.text(80, 0, "", {
      fontFamily: "'Courier New', monospace",
      fontSize: "15px",
      fontStyle: "bold",
      color: "#020617"
    }).setOrigin(0.5);
    this.container.add(this.nameText);

    // Dialogue text block
    this.dialogText = this.scene.add.text(25, 30, "", {
      fontFamily: "'Courier New', monospace",
      fontSize: "14px",
      color: "#f8fafc",
      wordWrap: { width: this.width - 50, useAdvancedWrap: true },
      lineSpacing: 6
    });
    this.container.add(this.dialogText);

    // Prompt Arrow
    this.cursor = this.scene.add.text(this.width - 25, this.height - 25, "▼", {
      fontFamily: "'Courier New', monospace",
      fontSize: "14px",
      color: "#ef4444"
    }).setOrigin(0.5);
    this.container.add(this.cursor);
    this.cursor.setVisible(false);

    // Pulsing cursor
    this.scene.tweens.add({
      targets: this.cursor,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    // Event listeners
    this.scene.input.on('pointerdown', this.handleInteract, this);
    
    // Bind Keyboard keys
    this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.container.setVisible(false);
  }

  handleInteract(pointer, event) {
    if (!this.container || !this.container.visible) return;
    if (this.choiceButtons.length > 0) return; // Must pick choice button
    if (this.lastChoiceTime && (this.scene.time.now - this.lastChoiceTime < 150)) return;

    if (this.isTyping) {
      this.skipTyping();
    } else {
      this.next();
    }
  }

  update() {
    if (!this.container || !this.container.visible) return;
    
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) || Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.handleInteract();
    }
  }

  startDialogue(dialogueList, onComplete) {
    if (!this.container) this.create();
    
    this.dialogueList = dialogueList;
    this.currentIndex = 0;
    this.onComplete = onComplete;
    this.clearChoices();
    
    this.container.setVisible(true);
    this.showLine();
  }

  showLine() {
    this.clearChoices();
    this.cursor.setVisible(false);

    if (this.currentIndex >= this.dialogueList.length) {
      this.finishDialogue();
      return;
    }

    const currentLine = this.dialogueList[this.currentIndex];
    const speaker = currentLine.speaker || "";
    this.nameText.setText(speaker || "An");

    // Dynamic Speaker Portrait Selector
    let showPortrait = false;
    let portraitKey = '';

    if (speaker === 'An') {
      showPortrait = true;
      const text = currentLine.text || "";
      const isWorried = text.includes('chết con rồi') || text.includes('báo thức') || text.includes('Ơ mẹ?') || text.includes('tai nạn') || text.includes('muộn') || (this.scene.loopState && this.scene.loopState.loopCount === 2);
      portraitKey = isWorried ? 'avatar_an_worried' : 'avatar_an_neutral';
    } else if (speaker === 'Mẹ') {
      showPortrait = true;
      const loop = (this.scene.loopState && this.scene.loopState.loopCount) || 1;
      if (loop === 1) portraitKey = 'avatar_mom_caring';
      else if (loop === 2) portraitKey = 'avatar_mom_worried';
      else portraitKey = 'avatar_mom_angry';
    } else if (speaker === 'Bác Nam') {
      showPortrait = true;
      portraitKey = 'avatar_neighbor_friendly';
    }

    if (showPortrait && this.scene.textures.exists(portraitKey)) {
      this.portraitImg.setTexture(portraitKey);
      this.portraitImg.setVisible(true);
      
      // Shift text layouts to the right
      this.nameText.setX(180);
      const textWidth = this.nameText.width;
      this.nameBg.clear();
      this.nameBg.fillStyle(0xef4444, 1.0);
      this.nameBg.fillRoundedRect(130, -15, Math.max(100, textWidth + 20), 30, 6);
      this.nameText.setX(130 + Math.max(100, textWidth + 20) / 2);
      
      this.dialogText.setX(140);
      this.dialogText.setStyle({ wordWrap: { width: this.width - 170, useAdvancedWrap: true } });
    } else {
      this.portraitImg.setVisible(false);
      
      // Default left-aligned layouts
      this.nameText.setX(80);
      const textWidth = this.nameText.width;
      this.nameBg.clear();
      this.nameBg.fillStyle(0xef4444, 1.0);
      this.nameBg.fillRoundedRect(15, -15, Math.max(100, textWidth + 20), 30, 6);
      this.nameText.setX(15 + Math.max(100, textWidth + 20) / 2);
      
      this.dialogText.setX(25);
      this.dialogText.setStyle({ wordWrap: { width: this.width - 50, useAdvancedWrap: true } });
    }

    this.startTypewriter(currentLine.text);
  }

  startTypewriter(text) {
    if (this.typingTimer) {
      this.typingTimer.destroy();
    }

    this.fullText = text;
    this.currentText = "";
    this.charIndex = 0;
    this.isTyping = true;
    this.dialogText.setText("");

    this.typingTimer = this.scene.time.addEvent({
      delay: 20,
      callback: this.typeCharacter,
      callbackScope: this,
      loop: true
    });
  }

  typeCharacter() {
    if (this.charIndex < this.fullText.length) {
      this.currentText += this.fullText.charAt(this.charIndex);
      this.dialogText.setText(this.currentText);
      this.charIndex++;
      
      if (this.charIndex % 2 === 0) {
        this.playBlip();
      }
    } else {
      this.finishTyping();
    }
  }

  skipTyping() {
    if (this.typingTimer) {
      this.typingTimer.destroy();
    }
    this.isTyping = false;
    this.dialogText.setText(this.fullText);
    this.cursor.setVisible(true);
  }

  finishTyping() {
    if (this.typingTimer) {
      this.typingTimer.destroy();
    }
    this.isTyping = false;
    this.cursor.setVisible(true);
  }

  next() {
    this.currentIndex++;
    this.showLine();
  }

  finishDialogue() {
    this.container.setVisible(false);
    if (this.onComplete) {
      this.onComplete();
    }
  }

  startChoice(promptText, choices, onSelect) {
    if (!this.container) this.create();
    
    this.clearChoices();
    this.container.setVisible(true);
    
    if (this.portraitImg) {
      this.portraitImg.setVisible(false);
    }
    this.dialogText.setX(25);
    this.dialogText.setStyle({ wordWrap: { width: this.width - 50, useAdvancedWrap: true } });
    
    this.nameBg.clear();
    this.nameBg.fillStyle(0xef4444, 1.0);
    this.nameBg.fillRoundedRect(15, -15, 180, 30, 6);
    this.nameText.setText("HÀNH VI QUYẾT ĐỊNH");
    this.nameText.setX(105);

    this.cursor.setVisible(false);
    this.isTyping = false;
    this.dialogText.setText(promptText);

    // Stack buttons vertically
    const btnStartY = -15 - (choices.length * 42);

    choices.forEach((choice, index) => {
      const btnY = btnStartY + (index * 42);
      const btnContainer = this.scene.add.container(0, btnY);
      
      const btnBg = this.scene.add.graphics();
      btnBg.fillStyle(0x0f172a, 0.95);
      btnBg.fillRoundedRect(0, 0, this.width, 38, 6);
      btnBg.lineStyle(1.5, 0xef4444, 0.6);
      btnBg.strokeRoundedRect(0, 0, this.width, 38, 6);
      btnContainer.add(btnBg);

      const labelStr = choice.label || choice.text || "";
      const btnText = this.scene.add.text(20, 19, `${index + 1}. ${labelStr}`, {
        fontFamily: "'Courier New', monospace",
        fontSize: "12px",
        color: "#cbd5e1"
      }).setOrigin(0, 0.5);
      btnContainer.add(btnText);

      const zone = this.scene.add.zone(0, 0, this.width, 38)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });
        
      btnContainer.add(zone);

      zone.on('pointerover', () => {
        btnBg.clear();
        btnBg.fillStyle(0xef4444, 0.95);
        btnBg.fillRoundedRect(0, 0, this.width, 38, 6);
        btnBg.lineStyle(1.5, 0xffffff, 1.0);
        btnBg.strokeRoundedRect(0, 0, this.width, 38, 6);
        btnText.setColor("#020617");
      });

      zone.on('pointerout', () => {
        btnBg.clear();
        btnBg.fillStyle(0x0f172a, 0.95);
        btnBg.fillRoundedRect(0, 0, this.width, 38, 6);
        btnBg.lineStyle(1.5, 0xef4444, 0.6);
        btnBg.strokeRoundedRect(0, 0, this.width, 38, 6);
        btnText.setColor("#cbd5e1");
      });

      zone.on('pointerdown', (pointer, localX, localY, event) => {
        if (event) event.stopPropagation();
        this.lastChoiceTime = this.scene.time.now;

        // Clear choices immediately
        this.clearChoices();

        // Check if high-risk choice (danger)
        const isDanger = choice.choiceId === 'danger';

        if (isDanger) {
          // 1. Shake screen
          this.scene.cameras.main.shake(300, 0.018);
          
          // 2. Flash red borders
          const flash = this.scene.add.graphics().setScrollFactor(0).setDepth(4000);
          flash.lineStyle(8, 0xef4444, 1.0);
          flash.strokeRect(0, 0, this.scene.sys.game.config.width, this.scene.sys.game.config.height);
          this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 600,
            onComplete: () => flash.destroy()
          });

          // 3. Play risky buzz sound
          this.playRiskyBuzz();
        }

        // Show result dialogue if resultText is set
        if (choice.resultText) {
          this.nameText.setText("KẾT QUẢ HÀNH VI");
          this.nameBg.clear();
          this.nameBg.fillStyle(0xef4444, 1.0);
          this.nameBg.fillRoundedRect(15, -15, 170, 30, 6);
          this.nameText.setX(100);

          this.startDialogue([
            { speaker: "Hệ thống", text: choice.resultText }
          ], () => {
            onSelect(choice);
          });
        } else {
          onSelect(choice);
        }
      });

      this.choiceButtons.push(btnContainer);
      this.container.add(btnContainer);
    });
  }

  clearChoices() {
    this.choiceButtons.forEach(btn => btn.destroy());
    this.choiceButtons = [];
  }

  destroy() {
    if (this.typingTimer) this.typingTimer.destroy();
    if (this.container) this.container.destroy();
    this.scene.input.off('pointerdown', this.handleInteract, this);
  }
}
