# CHECKLIST TÀI NGUYÊN ĐỒ HỌA & ÂM THANH: GAME "ĐƯỜNG ĐẾN TRƯỜNG"

Tài liệu này cung cấp danh sách đầy đủ, đặc tả kích thước, số lượng khung hình (frame), và hướng dẫn thiết kế tài nguyên (assets) cho dự án game pixel-art giáo dục bảo hiểm **"Đường Đến Trường"**.

> [!IMPORTANT]  
> Tất cả các tài nguyên đồ họa trong game được thống nhất theo phong cách **Pixel Art Retro 2D**. Kích thước canvas tiêu chuẩn là **800x600 px** (tỷ lệ 4:3). Kích thước lưới gạch (Tile size) cơ bản là **32x32 px**.

---

## 1. PHƯƠNG TIỆN & NHÂN VẬT (SPRITESHEETS)
Tất cả sprite nhân vật di chuyển trên đường được tích hợp sẵn với phương tiện di chuyển (xe máy, xe đạp điện) hoặc đi bộ dưới dạng **Spritesheet**.

| Asset Key | File Path | Kích thước Frame | Số Frame | Mô tả các Animation & Frame Range | Trạng thái |
| :--- | :--- | :---: | :---: | :--- | :---: |
| `an` | `assets/characters/an.png` | 48x48 px | 14 | **Idle**: Frame 0-1 (đứng chờ đèn đỏ/đang đứng yên)<br>**Drive**: Frame 2-5 (chạy xe máy bình thường)<br>**Drive_Rain**: Frame 6-9 (mặc áo mưa, chạy xe chậm)<br>**Crash**: Frame 10-13 (ngã xe, va chạm, vỡ kính) | [ ] Chưa có |
| `mom` | `assets/characters/mom.png` | 48x48 px | 10 | **Idle**: Frame 0-1 (mẹ đứng trước hiên nhà)<br>**Wave**: Frame 2-5 (vẫy tay chào tạm biệt An)<br>**Give_Item**: Frame 6-9 (trao nón bảo hiểm hoặc áo mưa) | [ ] Chưa có |
| `friend` | `assets/characters/friend.png` | 48x48 px | 6 | **Idle**: Frame 0-1 (đứng đợi ở cổng trường)<br>**Walk**: Frame 2-5 (đi bộ đến chỗ An) | [ ] Chưa có |
| `vendor` | `assets/characters/vendor.png` | 96x48 px | 8 | **Push**: Frame 0-3 (cô đẩy xe bánh mì/trái cây đi ngang đường)<br>**Crash**: Frame 4-7 (xe hàng rong đổ, hoa quả rơi vãi) | [ ] Chưa có |
| `insurance_advisor` | `assets/characters/insurance_advisor.png` | 48x48 px | 4 | **Bubble_Glow**: Frame 0-3 (robot AI Advisor bay lơ lửng phát sáng) | [ ] Chưa có |
| `school_guard` | `assets/characters/school_guard.png` | 48x48 px | 6 | **Idle**: Frame 0-1 (bác bảo vệ đứng canh)<br>**Signal**: Frame 2-5 (thổi còi chỉ tay chặn xe đi học muộn) | [ ] Chưa có |
| `pedestrians` | `assets/characters/pedestrians.png` | 48x48 px | 4 | **Walk**: Frame 0-3 (người đi bộ qua đường ở vạch kẻ) | [ ] Chưa có |
| `traffic_truck` | `assets/characters/traffic_truck.png` | 144x96 px | 4 | **Drive**: Frame 0-3 (xe tải lấn làn lớn, có khói bụi xả ra từ ống bô) | [ ] Chưa có |
| `traffic_car` | `assets/characters/traffic_car.png` | 96x64 px | 4 | **Drive**: Frame 0-3 (xe taxi chạy ngược chiều hoặc cùng chiều) | [ ] Chưa có |

---

## 2. CHÂN DUNG HỘI THOẠI (PORTRAITS / AVATARS)
Ảnh chân dung hiển thị trong hộp thoại hội thoại để thể hiện biểu cảm của nhân vật. Kích thước tiêu chuẩn: **96x96 px** (Image đơn).

### An (Nhân vật chính)
- [ ] `an_normal.png`: Cười tự tin, trạng thái đi học ngày thường đầy hứng khởi.
- [ ] `an_shocked.png`: Trợn tròn mắt, hoảng hốt khi va quẹt xe hoặc bị cảnh sát/bác bảo vệ phạt.
- [ ] `an_thoughtful.png`: Sờ cằm suy nghĩ khi cân nhắc lựa chọn gói bảo hiểm.

### Mẹ của An
- [ ] `mom_warm.png`: Ánh mắt dịu dàng, mỉm cười khuyên bảo An đi xe cẩn thận.
- [ ] `mom_worried.png`: Nét mặt lo lắng khi trời đổ mưa lớn hoặc lúc dặn dò mang bảo hiểm.
- [ ] `mom_happy.png`: Vui mừng, nhẹ nhõm đón An đi học về an toàn.

### Bạn học (Bạn của An)
- [ ] `friend_friendly.png`: Nụ cười thân thiện vẫy chào ở cổng trường.
- [ ] `friend_explaining.png`: Nét mặt nghiêm túc khi tư vấn luật giao thông và ý nghĩa bảo hiểm.

### Cô bán hàng rong (Vendor)
- [ ] `vendor_hardworking.png`: Khuôn mặt tần tảo lam lũ, mỉm cười hiền lành.
- [ ] `vendor_startled.png`: Giật mình hoảng sợ khi chiếc xe đẩy va chạm với An trên đường chợ.

### AI Advisor (Cố vấn bảo hiểm kỹ thuật số)
- [ ] `advisor_welcome.png`: Trông thông minh, mỉm cười chuyên nghiệp mang lại cảm giác an tâm.
- [ ] `advisor_explain.png`: Ánh mắt tập trung, tay chỉ dẫn quy trình gửi yêu cầu bồi thường (claim).

### Bác bảo vệ trường (School Guard)
- [ ] `guard_strict.png`: Nghiêm nghị, đeo kính râm, thể hiện sự nghiêm khắc chấp hành đúng giờ.
- [ ] `guard_friendly.png`: Gật đầu cười thân thiện khi đón các học sinh đi đúng giờ và an toàn.

---

## 3. BẢN ĐỒ & TILESETS (TILEMAPS & TILES)
Bản đồ được thiết kế bằng phần mềm **Tiled Map Editor** và xuất ra định dạng JSON (.tmj). Kích thước mỗi ô lưới gạch là **32x32 px**.

### A. Tilesets (Tài nguyên gạch nền)
Các file ảnh chứa các mẫu gạch để ghép thành bản đồ:
- [ ] `vietnam_house.png` (512x512 px): Gạch nền nhà ống, ban công, dây điện, cột điện, tường vôi vàng đặc trưng Việt Nam.
- [ ] `vietnam_market.png` (512x512 px): Biển hiệu tạp hóa, sạp hoa quả, mái hiên di động, bàn ghế nhựa quán nước vỉa hè.
- [ ] `road_tiles.png` (256x256 px): Mặt đường nhựa, vạch kẻ đường, vỉa hè, ổ gà, vũng nước mưa, rào chắn thi công, đèn tín hiệu.
- [ ] `school_tiles.png` (512x512 px): Cổng trường cấp 3/Đại học lớn, phòng bảo vệ, bồn hoa, biểu ngữ "Học tốt - Dạy tốt".

### B. Tilemaps (Bản đồ màn chơi)
Cấu trúc các layer trong mỗi tệp tin `.tmj` (hoặc `.json` map):
1. **Background Layer**: Nền đất, mặt đường nhựa, vỉa hè.
2. **Obstacles Layer** (Có thuộc tính Collision = true): Tường nhà, cột điện, sạp hàng chợ cố định, rào chắn công trình.
3. **Objects Layer**: Vị trí xuất phát (Spawn), Điểm đích (Goal), Vị trí xuất hiện NPC, Vị trí kích hoạt sự kiện rủi ro (Trời mưa, ổ gà).

Các tệp tin map cụ thể:
- [ ] `home.tmj`: Khu vực trong nhà An và ngõ nhỏ trước nhà.
- [ ] `alley.tmj`: Hẻm nhỏ ngoằn ngoèo, nhiều cua gấp, khuất tầm nhìn.
- [ ] `market_street.tmj`: Đoạn đường qua chợ có đông người qua lại, hàng rong lấn chiếm vỉa hè.
- [ ] `rainy_road.tmj`: Đường lớn trơn trượt, vũng nước sâu, tầm nhìn hạn chế do mưa giông.
- [ ] `school_gate.tmj`: Khu vực cổng trường tấp nập xe cộ, có chốt bảo vệ kiểm tra giờ giấc.

---

## 4. GIAO DIỆN NGƯỜI DÙNG (UI GRAPHICS)
Tài nguyên giao diện được thiết kế tối giản, sắc nét, đồng bộ với bảng màu retro của game.

- [ ] `title_logo.png` (400x150 px): Tên game "ĐƯỜNG ĐẾN TRƯỜNG" cách điệu pixel-art rực rỡ dạng neon hoặc gỗ mộc.
- [ ] `dialog_box.png` (720x140 px): Khung hộp thoại hội thoại màu xanh tối `#1f2833` bo góc, viền cyan sáng `#66fcf1` sang trọng.
- [ ] `choice_button.png` (500x45 px): Nền nút lựa chọn phương án khi hội thoại.
- [ ] `ui_panel.png` (500x360 px): Bảng thông tin hóa đơn viện phí/sửa xe ở màn hình tổng kết kết quả hoặc bảng mua bảo hiểm.
- [ ] `icon_coin.png` (24x24 px): Đồng xu vàng lấp lánh (mất/nhận tiền ảo).
- [ ] `icon_heart.png` (24x24 px): Trái tim biểu tượng cho Sức khỏe/Máu (Health Bar).
- [ ] `icon_helmet.png` (24x24 px): Chiếc nón bảo hiểm (Trạng thái an toàn giao thông).
- [ ] `icon_insurance_card.png` (48x48 px): Thẻ bảo hiểm học đường/an toàn di chuyển sáng lấp lánh.
- [ ] `btn_start.png` (280x50 px): Nút "Bắt đầu chơi" phong cách pixel.
- [ ] `btn_continue.png` (280x50 px): Nút "Tiếp tục" hành trình ngày hôm sau.
- [ ] `btn_lessons.png` (280x50 px): Nút "Bài học bảo hiểm".

---

## 5. ÂM THANH (AUDIO)
Âm thanh bao gồm Nhạc nền (Background Music - BGM) chất lượng chiptune 8-bit/16-bit và Hiệu ứng âm thanh (Sound Effects - SFX) ngắn gọn.

### A. Nhạc nền (BGM)
- [ ] `bgm_menu.mp3` (Loop): Nhịp điệu vui vẻ, khơi gợi tinh thần khám phá hành trình mới.
- [ ] `bgm_home.mp3` (Loop): Nhẹ nhàng, êm đềm ở cảnh nhà An cùng mẹ.
- [ ] `bgm_street.mp3` (Loop): Nhộn nhịp, dồn dập vừa phải mô phỏng tiếng đường phố tấp nập.
- [ ] `bgm_rain.mp3` (Loop): Giai điệu trầm hơn, hòa tiếng mưa rơi tạo cảm giác nguy hiểm, trơn trượt.
- [ ] `bgm_school.mp3` (Loop): Nhạc học đường vui tươi, chiến thắng khi An tới trường thành công.

### B. Hiệu ứng âm thanh (SFX)
- [ ] `sfx_click.wav`: Tiếng động nhỏ vui tai khi nhấn nút trên giao diện UI.
- [ ] `sfx_coin.wav`: Tiếng "ting ting" khi nhặt hoặc nhận thưởng coin ảo.
- [ ] `sfx_crash.wav`: Tiếng va chạm cơ học khô khốc (khi xe của An đụng ổ gà, hàng rong, xe tải).
- [ ] `sfx_alarm.wav`: Tiếng chuông báo thức giục An thức dậy chuẩn bị đi học ở Ngày 1.
- [ ] `sfx_rain.mp3` / `sfx_rain.wav`: Tiếng mưa rơi rào rào liên tục (tiếng ồn trắng chạy nền).
- [ ] `sfx_thunder.wav`: Tiếng sấm sét đánh giật mình báo hiệu chuyển cảnh mưa giông nguy hiểm.
- [ ] `sfx_horn.wav`: Tiếng còi xe máy/xe tải bấm còi cảnh báo inh ỏi trên đường phố.
- [ ] `sfx_whistle.wav`: Tiếng còi thổi tuýt tuýt đanh thép của bác bảo vệ trường.
- [ ] `sfx_buy_insurance.wav`: Tiếng nhạc hiệu ngắn biểu lộ sự an toàn, bảo vệ thành công khi mua gói bảo hiểm.

---

## 6. HƯỚNG DẪN TÍCH HỢP VỚI PHASER 3

Để nạp toàn bộ các tài nguyên trên vào Phaser 3 một cách tự động, hãy sử dụng tệp cấu hình tập trung `asset-manifest.json` nằm tại `public/assets/asset-manifest.json`.

### Cách nạp Manifest tự động trong PreloadScene:

```javascript
class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Tải tệp cấu hình Asset Manifest JSON trước
    this.load.json('asset-manifest', 'assets/asset-manifest.json');
    
    // Tạo thanh tiến trình (Loading Bar)
    this.createLoadingBar();
  }

  create() {
    const manifest = this.cache.json.get('asset-manifest');

    // Tạo một Scene loader phụ để nạp toàn bộ danh sách tài nguyên
    this.load.once('complete', () => {
      this.scene.start('MainMenuScene');
    });

    // 1. Nạp hình ảnh tĩnh (Images)
    if (manifest.images) {
      manifest.images.forEach(img => {
        this.load.image(img.key, img.url);
      });
    }

    // 2. Nạp Spritesheets cho hoạt họa nhân vật
    if (manifest.spritesheets) {
      manifest.spritesheets.forEach(sheet => {
        this.load.spritesheet(sheet.key, sheet.url, {
          frameWidth: sheet.frameWidth,
          frameHeight: sheet.frameHeight
        });
      });
    }

    // 3. Nạp âm thanh (BGM & SFX)
    if (manifest.audio) {
      manifest.audio.forEach(aud => {
        this.load.audio(aud.key, aud.url);
      });
    }

    // 4. Nạp bản đồ Tiled Map JSON (.tmj)
    if (manifest.tilemaps) {
      manifest.tilemaps.forEach(map => {
        this.load.tilemapTiledJSON(map.key, map.url);
      });
    }

    // Bắt đầu quá trình nạp tài nguyên thực sự
    this.load.start();
  }

  createLoadingBar() {
    // Logic vẽ thanh tiến trình dựa trên sự kiện load progress
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x1f2833, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    
    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0x66fcf1, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
    });
  }
}
```

Tài liệu này được cập nhật lần cuối vào ngày **17/06/2026**. Vui lòng cập nhật checkbox tương ứng khi vẽ xong asset để phối hợp nhịp nhàng với bộ phận kỹ thuật lập trình.
