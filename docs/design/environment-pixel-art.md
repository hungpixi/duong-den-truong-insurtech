# HƯỚNG DẪN THIẾT KẾ ĐỒ HỌA MÔI TRƯỜNG & PROPS PIXEL ART: "7 GIỜ KÉM 10"
*Tài liệu đặc tả hình ảnh và bộ prompt tạo ảnh AI cho các vật thể môi trường (props) trong căn nhà của An.*

---

## 1. Triết Lý Tạo Hình (Art Direction & Style Guidelines)

Để đồng bộ với định hướng nghệ thuật hoài niệm, ấm áp của dự án (theo [ui-ux-pixel.md](file:///d:/entertainment/game-test/docs/design/ui-ux-pixel.md)), toàn bộ các vật thể môi trường (environment assets/props) cần tuân thủ các quy tắc sau:

*   **Phong cách:** 16-bit Cozy Pixel Art (hoài cổ, ấm áp, các chi tiết được vẽ tay có độ hoàn thiện cao).
*   **Góc nhìn phối cảnh:** Góc nhìn xéo / liên hợp (oblique/isometric view) phù hợp với phong cách di chuyển 2.5D của phòng khách và sân trước (đặc tả tại [home-scene-2.5d.md](file:///d:/entertainment/game-test/docs/design/home-scene-2.5d.md)).
*   **Bảng màu (Palette):** Sử dụng các gam màu ấm áp làm chủ đạo:
    *   Nền gỗ/mộc: Tông nâu trầm của gỗ sồi hoặc gỗ đỏ cũ.
    *   Mặt sàn/Đất: Màu gạch nung đỏ nhạt hoặc xi măng xám ấm.
    *   Điểm nhấn: Màu đỏ ngói `#E15B64` (mũ bảo hiểm), vàng nắng `#FFE893` (ánh đèn, vệt nắng).
*   **Đường viền (Outlines):** Sử dụng màu Chì Than 2B `#2C3E50` thay cho màu đen tuyền để giữ độ mềm mại của nét vẽ.
*   **Độ trong suốt:** Tất cả ảnh xuất ra dạng PNG có nền trong suốt (transparent background).

---

## 2. Đặc Tả Chi Tiết Vật Thể & Prompt Sinh Ảnh (Image Generation Prompts)

Dưới đây là bộ prompt chi tiết cho từng vật thể phục vụ sinh ảnh bằng AI (như Midjourney V6, DALL-E 3 hoặc các bộ lọc Stable Diffusion chuyên dụng).

### 2.1. Xe máy Wave Alpha Việt Nam (`motorbike`)
*   **Vị trí:** Ngoài sân trước nhà An ($X: 950, Y: 410$).
*   **Mô tả:** Chiếc xe máy số Wave Alpha huyền thoại màu đỏ cờ hoặc cam-vàng đặc trưng Việt Nam. Nhìn từ góc chéo phía sau (rear-oblique view), dựng chân chống nghiêng. Có các chi tiết xích, bô xe bằng sắt màu xám bạc, lốp đen viền chì than.
*   **Kích thước chuẩn:** $64 \times 64$ pixels hoặc $80 \times 64$ pixels.
*   **AI Prompt:**
    > `16-bit cozy pixel art of a classic Vietnamese Wave Alpha motorbike, rear-oblique angle view, bright red plastic body, grey leather seat, silver metal exhaust pipe, standing on a kickstand, transparent background, flat color, clean charcoal outlines --v 6.0`

### 2.2. Bàn học học sinh (`room_desk`)
*   **Vị trí:** Sát tường phía sau bên trái trong nhà An ($X: 120, Y: 280$).
*   **Mô tả:** Chiếc bàn gỗ học sinh nhỏ gọn màu nâu sồi. Trên mặt bàn có một cuốn vở học sinh mở sẵn với các ô kẻ xanh nhạt và một chiếc đèn học nhỏ màu xanh lá đang tỏa ra vệt ánh sáng vàng ấm nhẹ.
*   **Kích thước chuẩn:** $64 \times 64$ pixels.
*   **AI Prompt:**
    > `16-bit cozy pixel art of a small wooden student study desk, isometric view, oak wood texture, with an open school notebook showing grid lines and a green retro reading desk lamp emitting a soft warm yellow glow, transparent background, clean outlines --v 6.0`

### 2.3. Nệm ngủ trải sàn (`room_mattress`)
*   **Vị trí:** Sát tường phía sau góc trái ($X: 180, Y: 335$).
*   **Mô tả:** Nệm ngủ mỏng trải trực tiếp trên sàn nhà (kiểu nhà ống chật hẹp). Ga nệm màu xanh lam nhạt dịu mắt, phía trên có một chiếc gối nằm màu trắng kem và một góc chăn bông màu vàng nhạt được gấp gọn gàng.
*   **Kích thước chuẩn:** $96 \times 64$ pixels.
*   **AI Prompt:**
    > `16-bit cozy pixel art of a tidy floor mattress bed, oblique view, light blue bedsheet, a soft white cotton pillow, a neatly folded light yellow blanket, transparent background, clean outlines --v 6.0`

### 2.4. Cửa ra vào (`room_door`)
*   **Vị trí:** Bức tường ngăn phòng và sân ($X: 440, Y: 410$).
*   **Mô tả:** Cánh cửa phòng bằng gỗ màu nâu vừa, có một ô kính vuông nhỏ phía trên. Có ánh sáng nắng sớm vàng ấm chiếu xuyên qua ô kính tạo hiệu ứng ấm áp.
*   **Kích thước chuẩn:** $64 \times 96$ pixels (hoặc $64 \times 64$ pixels tùy tỷ lệ co giãn).
*   **AI Prompt:**
    > `16-bit cozy pixel art of a wooden room door, medium brown oak wood, featuring a small square glass window pane at the top with warm golden morning light shining through, transparent background, clean outlines --v 6.0`

### 2.5. Móc treo & Mũ bảo hiểm đỏ (`ui_helmet` / `room_helmet`)
*   **Vị trí:** Treo sát cửa ra vào ($X: 710, Y: 210$).
*   **Mô tả:** Một chiếc móc treo tường bằng gỗ đơn giản giữ một chiếc mũ bảo hiểm nửa đầu màu đỏ tươi (có sọc vàng hoặc decal nhỏ), quai mũ màu đen buông thõng xuống.
*   **Kích thước chuẩn:** $32 \times 32$ pixels.
*   **AI Prompt:**
    > `16-bit cozy pixel art of a red Vietnamese motorcycle helmet hanging on a simple wooden wall hook, frontal view, black chin strap hanging down, transparent background, clean charcoal outlines --v 6.0`

### 2.6. Cổng sắt trước nhà (`yard_gate`)
*   **Vị trí:** Cổng rào sắt màu xanh lá dẫn ra đường lớn ($X: 1170, Y: 420$).
*   **Mô tả:** Chiếc cổng sắt truyền thống của nhà phố Việt Nam gồm các thanh sắt dọc sơn màu xanh lá cây hoặc xanh da trời đã sờn cũ, có chốt khóa sắt xám rỉ sét nhẹ.
*   **Kích thước chuẩn:** $64 \times 96$ pixels.
*   **AI Prompt:**
    > `16-bit cozy pixel art of a traditional Vietnamese townhouse yard gate, vertical iron bars painted in faded turquoise green, with a small metallic slide lock latch, transparent background, clean outlines --v 6.0`

---

## 3. Cấu hình Tải Tài Nguyên trong Phaser 3 (Asset Loader Configurations)

Để tích hợp các asset trên vào game sau khi đã được sinh và tối ưu hóa dung lượng (nén tin dạng PNG-8 để tối ưu hiệu suất), ta thực hiện cập nhật tệp tin cấu hình.

### 3.1. Cập nhật `public/assets/asset-manifest.json`

Thêm đường dẫn tải các asset này vào nhóm `images`:

```json
{
  "images": [
    ...
    { "key": "room_desk", "url": "assets/environment/desk.png" },
    { "key": "room_door", "url": "assets/environment/door.png" },
    { "key": "room_mattress", "url": "assets/environment/mattress.png" },
    { "key": "motorbike", "url": "assets/environment/motorbike.png" },
    { "key": "ui_helmet", "url": "assets/environment/helmet.png" },
    { "key": "yard_gate", "url": "assets/environment/gate.png" }
  ],
  ...
}
```

### 3.2. Mã nguồn Preload trong Phaser (`PreloadScene.js`)

Hiện tại, game đang sử dụng hàm `generateTextures()` vẽ tạm bằng Canvas để chạy thử nghiệm độc lập. Khi các tệp PNG thực tế đã sẵn sàng tại thư mục `public/assets/environment/`, ta có hai cách cấu hình:

1.  **Cách 1: Nạp trực tiếp qua Manifest (Khuyên dùng)**
    Phaser sẽ tự động ghi đè (override) khóa texture được nạp từ tệp ảnh PNG lên trên texture vẽ bằng Canvas nếu ảnh PNG được tải sau. Để làm điều này, ta chỉ cần đưa các đường dẫn trên vào `asset-manifest.json` và gọi nạp qua hàm `load.image`.

2.  **Cách 2: Sử dụng Canvas làm cơ chế dự phòng (Fallback)**
    Trong `PreloadScene.js`, ta kiểm tra xem ảnh đã được nạp thành công chưa. Nếu chưa (tải lỗi hoặc không tìm thấy file), ta mới tiến hành dựng hình vẽ bằng Canvas.

Mẫu cập nhật hàm `preload()` trong `PreloadScene.js`:

```javascript
preload() {
  // Nạp tệp cấu hình Manifest
  this.load.json('asset-manifest', 'assets/asset-manifest.json');
  
  // Tải các tài nguyên tĩnh thực tế từ thư mục assets
  this.load.on('filecomplete-json-asset-manifest', (key, type, data) => {
    if (data && data.images) {
      data.images.forEach(img => {
        // Tải ảnh PNG đè lên các key tạm
        this.load.image(img.key, img.url);
      });
    }
  });
}
```

---

## 4. Kế hoạch Phối hợp Sinh ảnh với Main Agent (Handoff Plan)

1.  **Tạo thư mục lưu trữ:** Main Agent (hoặc script) cần tạo thư mục `public/assets/environment/` nếu chưa tồn tại.
2.  **Sinh ảnh:** Main Agent sử dụng các prompt ở Mục 2 để chạy qua API sinh ảnh (ví dụ: DALL-E 3) thu về ảnh thô.
3.  **Hậu kỳ & Nén ảnh:** 
    *   Tách nền thành công (transparent background).
    *   Resize về đúng tỷ lệ khung hình đặc tả.
    *   Nén giảm dung lượng dạng PNG-8.
    *   Đặt tên tệp đúng định dạng: `motorbike.png`, `desk.png`, `mattress.png`, `door.png`, `helmet.png`, `gate.png`.
4.  **Tích hợp:** Lưu trữ các tệp ảnh vào thư mục `public/assets/environment/` và cập nhật tệp tin `public/assets/asset-manifest.json`.
