import Phaser from 'phaser';
import { LoopSystem } from '../systems/LoopSystem.js';

export class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  init(data) {
    this.loopState = data.state || LoopSystem.loadState();
    this.outcome = data.outcome || 'WIN'; // 'WIN' or 'BANKRUPT'

    if (this.loopState.coin <= 0 && this.outcome !== 'CONFISCATED') {
      this.outcome = 'BANKRUPT';
    }

    this.failedSafetyChecks = !this.loopState.hasHelmet || !this.loopState.hasCheckedBike;
    
    // Evaluate if Ending 3 conditions are met
    this.isEnding3 = 
      this.loopState.loopCount >= 2 &&
      this.loopState.hasHelmet &&
      this.loopState.hasCheckedBike &&
      this.loopState.selectedInsurancePackage === 'school_route' &&
      this.loopState.coin > 0;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 1. Solid dark background
    this.add.graphics()
      .fillGradientStyle(0x020617, 0x020617, 0x090d16, 0x090d16, 1)
      .fillRect(0, 0, width, height);

    // Faint neon red grid lines
    const grid = this.add.graphics();
    grid.lineStyle(1, 0xef4444, 0.04);
    for (let x = 0; x < width; x += 40) grid.lineBetween(x, 0, x, height);
    for (let y = 0; y < height; y += 40) grid.lineBetween(0, y, width, y);

    // 2. Synthesize ticking clock sound
    this.startClockTicking();

    // 3. Render Slate / Red invoice based on outcome & endings
    if (this.outcome === 'CONFISCATED') {
      this.showEnding4Confiscated();
    } else if (this.outcome === 'BANKRUPT') {
      this.showEnding1Bankruptcy();
    } else if (this.failedSafetyChecks) {
      this.showEndingSafetyFailure();
    } else if (this.isEnding3) {
      this.showEnding3OpenGate();
    } else {
      this.showEnding2ClosedGate();
    }

    // Fade camera in
    this.cameras.main.fadeIn(500);
  }

  startClockTicking() {
    this.playClockTick();
    this.tickTimer = this.time.addEvent({
      delay: 1000,
      callback: this.playClockTick,
      callbackScope: this,
      loop: true
    });
  }

  playClockTick() {
    try {
      const ctx = this.sound.context;
      if (window.gameSynth && ctx) {
        window.gameSynth.playClockTick(ctx);
      }
    } catch (e) {}
  }

  stopClockTicking() {
    if (this.tickTimer) {
      this.tickTimer.destroy();
      this.tickTimer = null;
    }
  }

  showEnding1Bankruptcy() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Slate graphic
    const ledger = this.add.graphics();
    ledger.fillStyle(0x020617, 0.95);
    ledger.fillRoundedRect(width / 2 - 320, height / 2 - 250, 640, 500, 10);
    ledger.lineStyle(2, 0xef4444, 1.0); // Intense neon red border
    ledger.strokeRoundedRect(width / 2 - 320, height / 2 - 250, 640, 500, 10);

    // Title
    this.add.text(width / 2, height / 2 - 200, 'ENDING 1: 6:50 MÃI MÃI', {
      fontFamily: "'Courier New', monospace",
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#ef4444'
    }).setOrigin(0.5);

    // Clock
    this.add.text(width / 2, height / 2 - 160, 'ĐỒNG HỒ DỪNG LẠI: 6:50 sáng', {
      fontFamily: "'Courier New', monospace",
      fontSize: '18px',
      color: '#94a3b8',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Summary description (clean single string for word wrap)
    const desc = 
      "Chi phí điều trị chấn thương và sửa chữa phương tiện sau tai nạn quá lớn đã hoàn toàn nuốt chửng ví tiền của bạn. " +
      "Bạn lâm vào cảnh cạn kiệt tài chính khi số dư tài khoản chạm ngưỡng 0 xu. " +
      "Không có bảo hiểm gánh đỡ rủi ro, bạn phải bỏ lỡ buổi thi thuyết trình tốt nghiệp quan trọng tại UEH. " +
      "Hành trình thi cử thất bại, bạn buộc phải thiết lập lại vòng lặp để chuẩn bị kỹ càng hơn.";

    this.add.text(width / 2, height / 2 - 110, desc, {
      fontFamily: "'Courier New', monospace",
      fontSize: '16px',
      color: '#cbd5e1',
      align: 'center',
      lineSpacing: 6,
      wordWrap: { width: 580, useAdvancedWrap: true }
    }).setOrigin(0.5, 0);

    // Stats Table
    let tableY = height / 2 + 50;
    this.add.text(width / 2 - 270, tableY, `Số dư cuối cùng:`, { fontFamily: "'Courier New', monospace", fontSize: '14px', color: '#94a3b8' });
    this.add.text(width / 2 + 270, tableY, `${this.loopState.coin} xu`, { fontFamily: "'Courier New', monospace", fontSize: '14px', color: '#ef4444', fontStyle: 'bold' }).setOrigin(1, 0);
    
    tableY += 28;
    this.add.text(width / 2 - 270, tableY, `Vòng lặp thất bại ở loop:`, { fontFamily: "'Courier New', monospace", fontSize: '14px', color: '#94a3b8' });
    this.add.text(width / 2 + 270, tableY, `Vòng thứ ${this.loopState.loopCount}`, { fontFamily: "'Courier New', monospace", fontSize: '14px', color: '#cbd5e1' }).setOrigin(1, 0);

    // Button: Reset loop
    this.createButton(width / 2, height / 2 + 180, `THIẾT LẬP LẠI VÒNG LẶP`, '#ef4444', () => {
      this.stopClockTicking();
      const nextState = LoopSystem.resetState();
      this.scene.start('HomeScene', { state: nextState });
    });
  }

  drawSplitScreen(borderColor, titleText, titleColorStr, clockText, clockColorStr, captionText) {
    // Left Ledger Box
    const ledger = this.add.graphics();
    ledger.fillStyle(0x020617, 0.95);
    ledger.fillRoundedRect(30, 40, 520, 460, 10);
    ledger.lineStyle(2.5, borderColor, 1.0);
    ledger.strokeRoundedRect(30, 40, 520, 460, 10);

    // Right Polaroid Frame
    const polaroid = this.add.graphics();
    // Shadow under polaroid frame
    polaroid.fillStyle(0x000000, 0.4);
    polaroid.fillRoundedRect(730 - 170 + 4, 250 - 150 + 4, 340, 300, 8);
    // White background
    polaroid.fillStyle(0xffffff, 1);
    polaroid.fillRoundedRect(730 - 170, 250 - 150, 340, 300, 8);
    polaroid.lineStyle(1.5, 0x94a3b8, 0.5);
    polaroid.strokeRoundedRect(730 - 170, 250 - 150, 340, 300, 8);

    // Inner photo box
    polaroid.fillStyle(0x0f172a, 1);
    polaroid.fillRect(730 - 160, 240 - 120, 320, 240);

    // Gate Image (centered at 730, 240)
    this.add.image(730, 240, 'school_gate').setScale(1.25);

    // Polaroid caption text
    this.add.text(730, 380, captionText, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#0f172a'
    }).setOrigin(0.5);

    // Title on Ledger
    this.add.text(290, 75, titleText, {
      fontFamily: "'Courier New', monospace",
      fontSize: '24px',
      fontStyle: 'bold',
      color: titleColorStr,
      align: 'center',
      wordWrap: { width: 480, useAdvancedWrap: true }
    }).setOrigin(0.5);

    // Clock on Ledger
    this.add.text(290, 110, clockText, {
      fontFamily: "'Courier New', monospace",
      fontSize: '18px',
      color: clockColorStr,
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  showEndingSafetyFailure() {
    this.drawSplitScreen(
      0xef4444,
      'CHẤN THƯƠNG & ĐẾN TRỄ',
      '#ef4444',
      'ĐỒNG HỒ HIỂN THỊ: 6:50 sáng',
      '#eab308',
      'ĐẠI HỌC UEH - ĐÃ ĐẾN TRỄ'
    );

    // Explanation
    const desc = 
      "Bạn đã đến trước cổng trường Đại học UEH nhưng do thiếu sự chuẩn bị chu đáo trước khi đi (không đội mũ bảo hiểm hoặc không kiểm tra xe kỹ), bạn gặp tai nạn dọc đường, dẫn đến chấn thương và trễ giờ thi. Cánh cổng trường đã đóng chặt lại. Bạn phải chuẩn bị an toàn đầy đủ mới có thể hoàn thành hành trình an toàn!";

    this.add.text(290, 125, desc, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#cbd5e1',
      align: 'center',
      lineSpacing: 4,
      wordWrap: { width: 470, useAdvancedWrap: true }
    }).setOrigin(0.5, 0);

    // Invoice Table
    let tableY = 245;
    const addTableRow = (lab, val, valCol = '#cbd5e1') => {
      this.add.text(60, tableY, lab, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: '#94a3b8' });
      this.add.text(520, tableY, val, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: valCol, align: 'right' }).setOrigin(1, 0);
      tableY += 20;
    };

    let insName = "Không tham gia";
    if (this.loopState.selectedInsurancePackage === 'red_helmet') insName = "Gói Mũ Đỏ (100% Y tế)";
    else if (this.loopState.selectedInsurancePackage === 'old_bike') insName = "Gói Xe Cũ (100% Sửa xe)";
    else if (this.loopState.selectedInsurancePackage === 'school_route') insName = "Gói Đường Đến Trường (80%)";

    addTableRow("Vòng lặp hiện tại:", `Vòng thứ ${this.loopState.loopCount}`);
    addTableRow("Tài chính còn lại:", `${this.loopState.coin} xu`, '#fbbf24');
    addTableRow("Mũ bảo hiểm bảo vệ:", this.loopState.hasHelmet ? "ĐÃ ĐỘI" : "CHƯA ĐỘI", this.loopState.hasHelmet ? "#22c55e" : "#ef4444");
    addTableRow("Bảo dưỡng phanh lốp:", this.loopState.hasCheckedBike ? "ĐÃ KIỂM TRA" : "CHƯA KIỂM TRA", this.loopState.hasCheckedBike ? "#22c55e" : "#ef4444");

    // Hint box
    const hintY = 365;
    const hintW = 470;
    const hintH = 65;
    const hintBox = this.add.graphics();
    hintBox.fillStyle(0x0a0f1d, 0.7);
    hintBox.fillRoundedRect(290 - hintW / 2, hintY, hintW, hintH, 5);
    hintBox.lineStyle(1, 0xef4444, 0.3);
    hintBox.strokeRoundedRect(290 - hintW / 2, hintY, hintW, hintH, 5);

    this.add.text(290, hintY + 32, "MẸO HÓA GIẢI: Hãy đội Mũ bảo hiểm, kiểm tra phanh lốp kỹ và đăng ký bảo hiểm Gói Đường Đến Trường ở vòng lặp tiếp theo.", {
      fontFamily: "'Courier New', monospace",
      fontSize: '12px',
      color: '#fca5a5',
      align: 'center',
      lineSpacing: 4,
      wordWrap: { width: 450, useAdvancedWrap: true }
    }).setOrigin(0.5);

    // Button: Next loop
    this.createButton(290, 470, `BẮT ĐẦU VÒNG LẶP THỨ ${this.loopState.loopCount + 1}`, '#ef4444', () => {
      this.stopClockTicking();
      const nextState = LoopSystem.triggerNextLoop(this.loopState);
      this.scene.start('HomeScene', { state: nextState });
    });
  }

  showEnding2ClosedGate() {
    this.drawSplitScreen(
      0xd97706,
      'ENDING 2: ĐẾN TRƯỜNG, CỔNG ĐÓNG',
      '#ef4444',
      'ĐỒNG HỒ HIỂN THỊ: 6:50 sáng',
      '#eab308',
      'ĐẠI HỌC UEH - CỔNG KHÓA'
    );

    // Explanation
    const desc = 
      "Bạn đã đến trước cổng trường Đại học UEH, nhưng do trước đó gặp quá nhiều tai nạn dọc đường gây mất nhiều thời gian giải quyết, bạn đã bị trễ giờ thi nghiêm trọng. Bạn nhận ra: Vội vã phóng nhanh, thiếu sự chuẩn bị an toàn và thiếu lá chắn tài chính bảo hiểm sẽ khiến mọi nỗ lực của bạn đổ sông đổ bể. Bạn buộc phải chuẩn bị lại từ đầu!";

    this.add.text(290, 125, desc, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#cbd5e1',
      align: 'center',
      lineSpacing: 4,
      wordWrap: { width: 470, useAdvancedWrap: true }
    }).setOrigin(0.5, 0);

    // Invoice Table
    let tableY = 245;
    const addTableRow = (lab, val, valCol = '#cbd5e1') => {
      this.add.text(60, tableY, lab, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: '#94a3b8' });
      this.add.text(520, tableY, val, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: valCol, align: 'right' }).setOrigin(1, 0);
      tableY += 20;
    };

    let insName = "Không tham gia";
    if (this.loopState.selectedInsurancePackage === 'red_helmet') insName = "Gói Mũ Đỏ (100% Y tế)";
    else if (this.loopState.selectedInsurancePackage === 'old_bike') insName = "Gói Xe Cũ (100% Sửa xe)";
    else if (this.loopState.selectedInsurancePackage === 'school_route') insName = "Gói Đường Đến Trường (80%)";

    addTableRow("Vòng lặp hiện tại:", `Vòng thứ ${this.loopState.loopCount}`);
    addTableRow("Tài chính còn lại:", `${this.loopState.coin} xu`, '#fbbf24');
    addTableRow("Mũ bảo hiểm bảo vệ:", this.loopState.hasHelmet ? "ĐÃ ĐỘI" : "CHƯA ĐỘI", this.loopState.hasHelmet ? "#22c55e" : "#ef4444");
    addTableRow("Bảo dưỡng phanh lốp:", this.loopState.hasCheckedBike ? "ĐÃ KIỂM TRA" : "CHƯA KIỂM TRA", this.loopState.hasCheckedBike ? "#22c55e" : "#ef4444");

    // Hint box
    const hintY = 365;
    const hintW = 470;
    const hintH = 65;
    const hintBox = this.add.graphics();
    hintBox.fillStyle(0x0a0f1d, 0.7);
    hintBox.fillRoundedRect(290 - hintW / 2, hintY, hintW, hintH, 5);
    hintBox.lineStyle(1, 0xef4444, 0.3);
    hintBox.strokeRoundedRect(290 - hintW / 2, hintY, hintW, hintH, 5);

    this.add.text(290, hintY + 32, "MẸO HÓA GIẢI: Ở vòng sau, hãy chuẩn bị đầy đủ Mũ bảo hiểm, kiểm tra phanh kỹ và mua bảo hiểm Gói Đường Đến Trường toàn diện.", {
      fontFamily: "'Courier New', monospace",
      fontSize: '12px',
      color: '#fca5a5',
      align: 'center',
      lineSpacing: 4,
      wordWrap: { width: 450, useAdvancedWrap: true }
    }).setOrigin(0.5);

    // Button: Next loop
    this.createButton(290, 470, `BẮT ĐẦU VÒNG LẶP THỨ ${this.loopState.loopCount + 1}`, '#ef4444', () => {
      this.stopClockTicking();
      const nextState = LoopSystem.triggerNextLoop(this.loopState);
      this.scene.start('HomeScene', { state: nextState });
    });
  }

  showEnding3OpenGate() {
    this.drawSplitScreen(
      0x10b981,
      'ENDING 3: QUA NGÃ TƯ',
      '#10b981',
      'ĐỒNG HỒ HIỂN THỊ: 6:51 sáng',
      '#34d399',
      'ĐẠI HỌC UEH - THOÁT VÒNG LẶP'
    );

    // Success description
    const desc = 
      "Đồng hồ điểm giờ thi! Cánh cổng trường UEH từ từ hé mở chào đón bạn bước vào trong ánh nắng ban mai rạng rỡ. Nhờ có sự chuẩn bị chu đáo (đội mũ bảo hiểm đỏ, kiểm tra xe kỹ càng) cùng gói bảo hiểm Đường Đến Trường toàn diện làm lá chắn bảo vệ tài chính, bạn đã đến đích an toàn, tự tin vượt qua mọi rủi ro dọc đường để hoàn thành kỳ thi!";

    this.add.text(290, 125, desc, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#cbd5e1',
      align: 'center',
      lineSpacing: 4,
      wordWrap: { width: 470, useAdvancedWrap: true }
    }).setOrigin(0.5, 0);

    // Sum details
    let tableY = 245;
    const addTableRow = (lab, val, valCol = '#cbd5e1') => {
      this.add.text(60, tableY, lab, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: '#94a3b8' });
      this.add.text(520, tableY, val, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: valCol, align: 'right' }).setOrigin(1, 0);
      tableY += 20;
    };

    addTableRow("Số vòng lặp đã qua:", `${this.loopState.loopCount} vòng`);
    addTableRow("Tài sản tích lũy an toàn:", `${this.loopState.coin} xu`, '#fbbf24');
    addTableRow("Trang bị an toàn cá nhân:", "Đầy đủ (Mũ + Phanh)", '#22c55e');
    addTableRow("Lá chắn tài chính áp dụng:", "Gói Đường Đến Trường (80%)", '#10b981');
    addTableRow("Địa điểm cán đích:", "Đại học UEH (Thoát Lặp)", '#34d399');

    // Button: Back to main menu
    this.createButton(290, 470, 'QUAY VỀ MÀN HÌNH CHÍNH', '#10b981', () => {
      this.stopClockTicking();
      LoopSystem.resetState();
      this.scene.start('MainMenuScene');
    });
  }

  showEnding4Confiscated() {
    this.drawSplitScreen(
      0xef4444,
      'ENDING 4: TỊCH THU XE & TRỄ HỌC',
      '#ef4444',
      'ĐỒNG HỒ DỪNG LẠI: 7:15 sáng',
      '#eab308',
      'ĐẠI HỌC UEH - ĐÃ ĐẾN TRỄ'
    );

    const desc = 
      "Do tự ý lái xe phân khối lớn khi chưa đủ tuổi, phương tiện của bạn đã bị Cảnh sát giao thông tạm giữ để xử lý vi phạm. Bạn không thể đến trường học và bị trễ giờ nghiêm trọng. Hãy luôn tuân thủ luật an toàn giao thông và lựa chọn phương tiện phù hợp với lứa tuổi!";

    this.add.text(290, 125, desc, {
      fontFamily: "'Courier New', monospace",
      fontSize: '13px',
      color: '#cbd5e1',
      align: 'center',
      lineSpacing: 4,
      wordWrap: { width: 470, useAdvancedWrap: true }
    }).setOrigin(0.5, 0);

    // Table rows
    let tableY = 245;
    const addTableRow = (lab, val, valCol = '#cbd5e1') => {
      this.add.text(60, tableY, lab, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: '#94a3b8' });
      this.add.text(520, tableY, val, { fontFamily: "'Courier New', monospace", fontSize: '13px', color: valCol, align: 'right' }).setOrigin(1, 0);
      tableY += 20;
    };

    addTableRow("Phương tiện sử dụng:", "Xe Phân Khối Lớn (Vi Phạm)", "#ef4444");
    addTableRow("Mũ bảo hiểm bảo vệ:", this.loopState.hasHelmet ? "ĐÃ ĐỘI" : "CHƯA ĐỘI", this.loopState.hasHelmet ? "#22c55e" : "#ef4444");
    addTableRow("Bảo dưỡng phanh lốp:", this.loopState.hasCheckedBike ? "ĐÃ KIỂM TRA" : "CHƯA KIỂM TRA", this.loopState.hasCheckedBike ? "#22c55e" : "#ef4444");
    addTableRow("Vòng lặp hiện tại:", `Vòng thứ ${this.loopState.loopCount}`);
    addTableRow("Tài chính còn lại:", `${this.loopState.coin} xu`, '#fbbf24');

    // Button: Reset loop
    this.createButton(290, 470, 'THIẾT LẬP LẠI VÒNG LẶP', '#ef4444', () => {
      this.stopClockTicking();
      const nextState = LoopSystem.resetState();
      this.scene.start('HomeScene', { state: nextState });
    });
  }

  createButton(x, y, label, themeColor, onClick) {
    const btnContainer = this.add.container(x, y);
    const btnWidth = 320;
    const btnHeight = 44;

    const bg = this.add.graphics();
    bg.fillStyle(0x020617, 0.95);
    bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
    bg.lineStyle(2, parseInt(themeColor.replace('#', '0x')), 0.8);
    bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
    btnContainer.add(bg);

    const txt = this.add.text(0, 0, label, {
      fontFamily: "'Courier New', monospace",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#cbd5e1'
    }).setOrigin(0.5);
    btnContainer.add(txt);

    const zone = this.add.zone(0, 0, btnWidth, btnHeight)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    zone.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(parseInt(themeColor.replace('#', '0x')), 0.95);
      bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
      bg.lineStyle(2, 0xffffff, 1.0);
      bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
      txt.setColor('#020617');
      this.playHoverSound();
    });

    zone.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x020617, 0.95);
      bg.fillRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
      bg.lineStyle(2, parseInt(themeColor.replace('#', '0x')), 0.8);
      bg.strokeRoundedRect(-btnWidth/2, -btnHeight/2, btnWidth, btnHeight, 8);
      txt.setColor('#cbd5e1');
    });

    zone.on('pointerdown', () => {
      this.playClickSound();
      onClick();
    });

    btnContainer.add(zone);
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
}
