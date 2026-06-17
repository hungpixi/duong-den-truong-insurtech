# HƯỚNG DẪN LẬP TRÌNH PHASER 3 (PHASER IMPLEMENTATION NOTES) — ĐƯỜNG ĐẾN TRƯỜNG

Tài liệu này hướng dẫn chi tiết cho đội ngũ phát triển game cách chuyển đổi các thông số thiết kế trực quan thành mã nguồn Phaser 3 (Javascript / Typescript), bao gồm vẽ mặt đường phối cảnh 2.5D, cấu hình camera, hạt vật lý, và bộ tổng hợp âm thanh Web Audio API.

---

## 1. CẤU HÌNH KHỞI TẠO GAME (GAME CONFIGURATION)

Để đảm bảo mỹ thuật pixel art sắc nét và khả năng co giãn tốt trên mọi thiết bị di động, file cấu hình chính của Phaser 3 phải được thiết lập như sau:

```javascript
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { InsuranceSelectScene } from './scenes/InsuranceSelectScene';
import { HomeScene } from './scenes/HomeScene';
import { RoadScene } from './scenes/RoadScene';
import { ResultScene } from './scenes/ResultScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#0b0c10',
    pixelArt: true, // VÔ HIỆU HÓA BỘ LỌC LÀM MỊN (BẮT BUỘC CHO PIXEL ART)
    scale: {
        mode: Phaser.Scale.FIT, // TỰ ĐỘNG CO GIÃN THÍCH ỨNG MOBILE
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
        InsuranceSelectScene, 
        HomeScene, 
        RoadScene, 
        ResultScene
    ]
};

const game = new Phaser.Game(config);
```

---

## 2. PHƯƠNG PHÁP VẼ MẶT ĐƯỜNG PHỐI CẢNH PSEUDO-2.5D (ROAD DRAWING)

Đoạn đường di chuyển trong `RoadScene` không sử dụng ảnh nền tĩnh mà được vẽ động bằng đối tượng **Phaser.GameObjects.Graphics** để tạo cảm giác chuyển động chéo về phía trước.

```javascript
class RoadScene extends Phaser.Scene {
    constructor() {
        super('RoadScene');
    }

    create() {
        this.graphics = this.add.graphics();
        this.roadZ = 0; // Vị trí cuộn đường đi
    }

    update(time, delta) {
        this.graphics.clear();
        this.drawRoadAndSidewalk();
        
        // Cập nhật vị trí cuộn đường dựa trên vận tốc
        this.roadZ += 0.02 * (delta / 16.67); 
        if (this.roadZ >= 1.0) this.roadZ -= 1.0;
    }

    drawRoadAndSidewalk() {
        const horizonY = 200;
        const bottomY = 560;
        const centerX = 400;
        
        // 1. Vẽ Vỉa hè bên trái và bên phải (Terracotta Tile `#C0392B`)
        this.graphics.fillStyle(0xC0392B, 1);
        // Đa giác vỉa hè trái
        this.graphics.fillPoints([
            { x: 0, y: bottomY },
            { x: 150, y: bottomY },
            { x: 365, y: horizonY },
            { x: 0, y: horizonY }
        ]);
        // Đa giác vỉa hè phải
        this.graphics.fillPoints([
            { x: 650, y: bottomY },
            { x: 800, y: bottomY },
            { x: 800, y: horizonY },
            { x: 435, y: horizonY }
        ]);

        // 2. Vẽ Lòng đường nhựa (Dry Asphalt `#2A2D34`)
        this.graphics.fillStyle(0x2A2D34, 1);
        this.graphics.fillPoints([
            { x: 150, y: bottomY },
            { x: 650, y: bottomY },
            { x: 435, y: horizonY },
            { x: 365, y: horizonY }
        ]);

        // 3. Vẽ Vạch kẻ đường đứt quãng (Z-axis perspective dash)
        this.graphics.fillStyle(0xFFFFFF, 1);
        const numDashes = 10;
        for (let i = 0; i < numDashes; i++) {
            // Tọa độ sâu z tính toán trôi ngược lại từ 1.0 về 0.0
            let z = (i / numDashes + this.roadZ) % 1.0;
            
            // Chiếu tọa độ phối cảnh sang 2D Y và X
            let y = horizonY + (bottomY - horizonY) * (1.0 - z);
            let roadWidth = 70 + (500 - 70) * (1.0 - z);
            let dashHeight = 15 * (1.0 - z); // Độ dài vạch kẻ thu hẹp ở xa
            let dashWidth = 6 * (1.0 - z);   // Độ dày vạch kẻ thu hẹp ở xa
            
            this.graphics.fillRect(
                centerX - dashWidth / 2, 
                y - dashHeight / 2, 
                dashWidth, 
                dashHeight
            );
        }
    }
}
```

---

## 3. TÍNH TOÁN TỌA ĐỘ VÀ SCALE VẬT CẢN (PERSPECTIVE SCALE)

Các sprite chướng ngại vật (xe hàng rong, vũng nước, xe tải) xuất hiện ở phía xa phải được cập nhật tọa độ và tỷ lệ co giãn liên tục trong vòng lặp `update`:

```javascript
updateObstacle(obstacle) {
    const horizonY = 200;
    const bottomY = 560;
    const centerX = 400;

    // obstacle.z chạy từ 1.0 (chân trời) về 0.0 (cận cảnh)
    let z = obstacle.z;

    // Tính toán tỷ lệ co giãn (Scale factor)
    let scale = 0.15 + (1.0 - z) * 0.85;
    obstacle.setScale(scale);

    // Tính toán chiều rộng mặt đường tại z
    let roadWidth = 70 + (500 - 70) * (1.0 - z);

    // obstacle.laneX chạy từ -1.0 (mép đường trái) đến 1.0 (mép đường phải)
    let roadX = centerX + (roadWidth / 2) * obstacle.laneX;
    let roadY = horizonY + (bottomY - horizonY) * (1.0 - z);

    obstacle.setPosition(roadX, roadY);
    
    // Quản lý Z-index: Vật thể ở gần (Z nhỏ) vẽ đè lên vật thể ở xa (Z lớn)
    obstacle.setDepth(100 - Math.floor(z * 50));
}
```

---

## 4. BỘ TỔNG HỢP ÂM THANH WEBAUDIO CHIPTUNE (AUDIO SYNTHESIZER HELPER)

Để game siêu nhẹ và loại bỏ sự phụ thuộc vào các file âm thanh mp3/wav tĩnh cho các tiếng click, claim, coin, chúng ta tạo một class **SoundSynth** sử dụng **Web Audio API** trực tiếp từ trình duyệt của người chơi.

```javascript
class SoundSynth {
    constructor() {
        // Khởi tạo AudioContext của trình duyệt
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = this.ctx.createGain();
        this.masterVolume.connect(this.ctx.destination);
        this.masterVolume.gain.setValueAtTime(0.5, this.ctx.currentTime); // Cài đặt volume 50%
    }

    // Phát âm thanh đơn từ cấu hình tần số
    playTone(config) {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(this.masterVolume);

        osc.type = config.type || 'sine'; // sine, triangle, sawtooth, square
        
        // Thiết lập phong bì âm lượng (Envelope ADSR)
        const env = config.envelope;
        gainNode.gain.setValueAtTime(0, now);
        // Attack
        gainNode.gain.linearRampToValueAtTime(config.volume, now + env.attack);
        // Decay & Sustain
        gainNode.gain.linearRampToValueAtTime(config.volume * env.sustain, now + env.attack + env.decay);
        // Release
        gainNode.gain.setValueAtTime(config.volume * env.sustain, now + config.duration - env.release);
        gainNode.gain.linearRampToValueAtTime(0, now + config.duration);

        // Thiết lập tần số trượt (Frequency slide)
        osc.frequency.setValueAtTime(config.startFrequency, now);
        osc.frequency.exponentialRampToValueAtTime(config.endFrequency, now + config.duration);

        osc.start(now);
        osc.stop(now + config.duration);
    }

    // Phát giai điệu chuỗi nốt (Melody)
    playMelody(melodyConfig) {
        const now = this.ctx.currentTime;
        melodyConfig.melody.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(this.masterVolume);
            
            osc.type = melodyConfig.type || 'sine';
            osc.frequency.setValueAtTime(note.freq, now + note.time);
            
            gainNode.gain.setValueAtTime(0, now + note.time);
            gainNode.gain.linearRampToValueAtTime(melodyConfig.volume, now + note.time + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, now + note.time + note.duration);
            
            osc.start(now + note.time);
            osc.stop(now + note.time + note.duration);
        });
    }
}

// Khởi tạo toàn cục trong game
window.soundSynth = new SoundSynth();
```

### Cách gọi trong code Phaser:
*   *Tiếng Click phím:* `window.soundSynth.playTone(animationConfig.sound_synthesis.click);`
*   *Tiếng claim được duyệt:* `window.soundSynth.playMelody(animationConfig.sound_synthesis.claim_approved);`

---

## 5. HƯỚNG DẪN CẤU HÌNH HỆ THỐNG HẠT VẬT LÝ (PARTICLE SYSTEMS)

Phaser 3 hỗ trợ sẵn `ParticleEmitter`. Dưới đây là cấu hình hạt mưa và tia splash nước bắn chéo sang hai bên bánh xe máy:

### 5.1. Cấu hình Hạt Mưa Lớn (Rain Emitter)
```javascript
createRain() {
    // Tạo texture vệt mưa 1.5x20 px bằng Graphics vẽ trực tiếp
    const rainTexture = this.make.graphics({ x: 0, y: 0, add: false });
    rainTexture.fillStyle(0x86d6f2, 0.6);
    rainTexture.fillRect(0, 0, 1.5, 20);
    rainTexture.generateTexture('rain_droplet', 1.5, 20);

    this.rainEmitter = this.add.particles(0, 0, 'rain_droplet', {
        x: { min: -100, max: 900 },
        y: -30,
        lifespan: 1200,
        speedY: { min: 850, max: 1100 },
        speedX: { min: -450, max: -350 }, // Nghiêng sang trái do gió thổi
        scaleY: { start: 1, end: 1 },
        maxParticles: 150,
        quantity: 3
    });
    this.rainEmitter.setDepth(60); // Nằm trên lớp nhân vật
}
```

### 5.2. Hạt Bắn Nước khi đè Vũng ngập (Water Splash Emitter)
Khi bánh xe đi qua vùng nước ngập, lập trình viên kích hoạt bắn hạt nước chéo chao lượn:
```javascript
createSplashEmitter() {
    // Tạo hạt tròn tròn nước 4x4 px
    const splashTexture = this.make.graphics({ x: 0, y: 0, add: false });
    splashTexture.fillStyle(0xa9e2f5, 0.7);
    splashTexture.fillCircle(2, 2, 2);
    splashTexture.generateTexture('splash_particle', 4, 4);

    this.splashEmitter = this.add.particles(0, 0, 'splash_particle', {
        lifespan: 400,
        gravityY: 600, // Gia tốc kéo hạt rơi cong xuống mặt đường
        scale: { start: 1.0, end: 0.2 },
        emitting: false
    });
    this.splashEmitter.setDepth(45);
}

triggerWheelSplash(wheelX, wheelY) {
    this.splashEmitter.emitParticleAt(wheelX, wheelY, 5); // Bắn 5 hạt chéo trái
    // Thay đổi speedX/speedY ngẫu nhiên chéo sang 2 bên
}
```

---

## 6. HỘP THOẠI & KÍNH MỜ (DIALOG PANEL GRAPHICS DRAW)

Vẽ hộp thoại kính mờ (Glassmorphism overlay) bằng API Graphics để tối ưu hóa thiết kế và tránh nạp ảnh rác bên ngoài:

```javascript
drawDialogueBox(scene, nameSpeaker, messageText) {
    const boxX = 40;
    const boxY = 430;
    const boxW = 720;
    const boxH = 140;

    let panel = scene.add.graphics();
    
    // Vẽ bóng đổ đen mờ phía sau
    panel.fillStyle(0x000000, 0.4);
    panel.fillRoundedRect(boxX + 5, boxY + 5, boxW, boxH, 8);

    // Vẽ khung chính nền navy tối alpha 90%
    panel.fillStyle(0x1a1a24, 0.9);
    panel.lineStyle(3, 0x66fcf1, 1); // Viền Neon Cyan dày 3px
    panel.fillRoundedRect(boxX, boxY, boxW, boxH, 8);
    panel.strokeRoundedRect(boxX, boxY, boxW, boxH, 8);

    // Vẽ nhãn Speaker Tag
    panel.fillStyle(0x66fcf1, 1);
    panel.fillRoundedRect(boxX + 20, boxY - 15, 160, 30, 4);
    
    // Add Speaker Text
    let speakerText = scene.add.text(boxX + 100, boxY, nameSpeaker.toUpperCase(), {
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '16px',
        fill: '#0b0c10',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Add Typewriter Message Text
    let contentText = scene.add.text(boxX + 30, boxY + 30, "", {
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '17px',
        fill: '#ffffff',
        wordWrap: { width: 660, useAdvancedWrap: true },
        lineSpacing: 8
    });

    // Kích hoạt Typewriter hiệu ứng gõ chữ
    let currentChar = 0;
    scene.time.addEvent({
        delay: 30, // Tốc độ thường 30ms/ký tự
        callback: () => {
            contentText.text += messageText[currentChar];
            currentChar++;
            // Phát âm thanh gõ chữ bíp bíp nhẹ
            if (currentChar % 1 === 0) {
                window.soundSynth.playTone(animationConfig.sound_synthesis.click);
            }
        },
        repeat: messageText.length - 1
    });
}
```
Những hướng dẫn lập trình này tạo cơ sở vững chắc để bộ phận kỹ thuật hiện thực hóa sản phẩm với độ chính xác cao và trải nghiệm người dùng tuyệt vời nhất.
