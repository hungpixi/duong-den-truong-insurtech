# THIẾT KẾ NHÂN VẬT PIXEL ART (CHARACTER VISUAL PROFILES & PROMPTS)
*Tài liệu đặc tả tạo hình nhân vật, bảng màu phối hợp và prompt sinh ảnh bằng AI (16-bit Cozy Pixel Art)*

---

## 1. Nguyên Tắc Tạo Hình Cốt Lõi (Core Visual Identity)
Toàn bộ chân dung nhân vật (Portraits) và sprite di chuyển được thiết kế theo phong cách **16-bit Cozy Pixel Art**, lấy cảm hứng từ các tựa game kể chuyện ấm áp cổ điển.
*   **Kích thước ảnh chân dung hội thoại:** $96 \times 96$ pixels (tăng tỷ lệ chi tiết biểu cảm khuôn mặt).
*   **Kích thước sprite di chuyển (Phaser Grid):** $48 \times 48$ pixels.
*   **Độ phân giải & Đường viền:** Đường nét rõ ràng, sử dụng màu **Chì Than 2B (`#2C3E50`)** làm viền ngoài (outline) và viền bóng đổ, thay thế hoàn toàn màu đen thuần `#000000` để nét vẽ mềm mại, thơ mộng.
*   **Ánh sáng & Bóng đổ:** Ánh sáng ấm áp từ góc trên bên trái chiếu xuống, tạo các điểm nhấn màu **Nắng Sớm (`#FFE893`)** ở rìa tóc hoặc vai.

---

## 2. Đặc Tả Chi Tiết Nhân Vật & Bảng Màu (Character Profiles & Color Palettes)

### 2.1. AN — Nam Sinh Học Sinh Trung Học
*   **Vai trò:** Nhân vật chính, đang vội vã đạp xe/lái xe máy đến trường học cho kịp giờ trước 7 giờ kém 10.
*   **Đặc điểm nhận dạng:**
    *   Khuôn mặt học sinh nam Việt Nam, tóc đen cắt ngắn gọn gàng trẻ trung.
    *   Trang phục: Đồng phục học sinh Việt Nam quen thuộc — Áo sơ mi trắng tinh khôi phối quần tây xanh sẫm.
    *   Phụ kiện bắt buộc: Đội mũ bảo hiểm nửa đầu có kính che bụi hoặc mũ bảo hiểm truyền thống màu **Đỏ Mũ Bảo Hiểm (`#E15B64`)**.
*   **Bảng phối màu (Color Scheme):**
    *   *Nền áo sơ mi:* `#FDFBF2` (Giấy Tập Cũ) kết hợp màu sáng trắng `#FFFFFF`.
    *   *Quần tây & Chi tiết áo:* `#2B52B7` (Mực Xanh Tập Vở).
    *   *Mũ bảo hiểm:* `#E15B64` (Đỏ Mũ Bảo Hiểm).
    *   *Màu tóc:* `#2C3E50` (Chì Than 2B).
*   **Các biểu cảm gương mặt:**
    1.  `an_neutral`: Vẻ mặt bình tĩnh, ánh mắt thẳng thắn, miệng ngậm nhẹ tự tin.
    2.  `an_worried`: Lông mày nhíu lại chéo góc, mắt mở to lo lắng nhìn đồng hồ, có giọt mồ hôi pixel màu xanh nước biển nhạt rơi nhẹ bên thái dương.

---

### 2.2. MẸ CỦA AN — Người Mẹ Việt Nam Tảo Tần
*   **Vai trò:** Người mẹ chu đáo dặn dò An trước khi đi học, trao cho cậu mũ bảo hiểm và áo mưa.
*   **Đặc điểm nhận dạng:**
    *   Gương mặt phúc hậu trung niên Việt Nam, tóc búi tròn gọn gàng sau gáy đúng kiểu các mẹ Việt.
    *   Trang phục: Áo bà ba truyền thống màu xanh ngọc lam (turquoise) hoặc tím nhạt nhã nhặn, mang phong cách giản dị của phụ nữ gia đình Việt Nam.
*   **Bảng phối màu (Color Scheme):**
    *   *Áo bà ba Ngọc Lam:* `#3B9C90` (Pastel Teal) phối bóng đổ `#1E5E56`.
    *   *Hoặc Áo bà ba Tím Nhạt:* `#8E7CC3` (Soft Purple) phối bóng đổ `#6C5CE7` (Mực Tím).
    *   *Màu tóc & Nét mặt:* `#2C3E50` (Chì Than 2B).
*   **Các biểu cảm gương mặt:**
    1.  `mom_caring` (Bình thường): Ánh mắt hiền từ, cười mỉm nhẹ nhàng trìu mến.
    2.  `mom_worried`: Lông mày nhướn lên lo lắng, miệng hơi mở như đang dặn dò thiết tha, biểu cảm ân cần lo lắng cho con.
    3.  `mom_angry`: Lông mày nhíu sâu xuống, mắt hơi híp lại nghiêm khắc, miệng mím thẳng (dùng khi An quên mang mũ bảo hiểm hoặc đòi phóng nhanh vượt ẩu).

---

### 2.3. BÁC NAM — Người Hàng Xóm Thân Thiện
*   **Vai trò:** Người hàng xóm trung niên tốt bụng, đang tưới cây hoặc quét dọn trước sân nhà bên cạnh. Có thể khuyên An về tình hình đường sá hoặc thời tiết sắp mưa giông.
*   **Đặc điểm nhận dạng:**
    *   Người đàn ông trung niên (~50 tuổi) rắn rỏi, da ngăm nhẹ, đuôi mắt có nếp nhăn cười hiền hậu, tóc muối tiêu (có vài sợi bạc).
    *   Trang phục: Quần áo lao động làm vườn giản dị thoải mái (áo phông/áo thun cộc tay màu xanh lá cây hoặc màu nâu bùn mộc mạc).
*   **Bảng phối màu (Color Scheme):**
    *   *Áo lao động:* `#4A8F68` (Xanh Lá Cây Bàng) phối bóng đổ `#1E3F24` (Bảng Xanh).
    *   *Màu da:* `#E3A87C` (Tông da ấm nắng).
    *   *Màu tóc muối tiêu:* Xen kẽ `#2C3E50` (Chì Than) và `#BDC3C7` (Xám bạc).
*   **Các biểu cảm gương mặt:**
    1.  `bac_nam_friendly`: Nụ cười sảng khoái hé răng, mắt nheo cười chân chất nhiệt tình, toát lên sự cởi mở, láng giềng tốt bụng.

---

## 3. Kịch Bản Prompt Sinh Ảnh Bằng AI (AI Prompt Generation Templates)
Dưới đây là các prompt được tinh chỉnh tối đa để dùng cho các AI sinh ảnh (Midjourney, DALL-E 3) để tạo ra các portrait $96 \times 96$ chuẩn game 16-bit.

> [!IMPORTANT]
> **Quy định kỹ thuật chung cho Prompts:**
> *   **Style:** `16-bit cozy pixel art, warm nostalgia visual style`
> *   **Background:** `solid flat light cream background (#FDFBF2), no gradient`
> *   **Camera:** `headshot portrait, chest up, front-facing view`
> *   **Negative Prompt:** `gradient background, device frame, mobile screenshot, text, border, realistic photo, 3D render, anti-aliasing shadow`

### 3.1. Danh Sách Prompt Cho An
*   **An (Neutral):**
    > *Prompt:* `16-bit cozy pixel art headshot portrait of a teenage Vietnamese male high school student. Wearing a traditional white school shirt uniform with a blue collar detail and a red motorcycle helmet. Dark hair, friendly neutral expression, facing forward. Cozy warm color palette, soft lighting. Solid flat cream background. Fine pixel grid, crisp edges, retro game asset --ar 1:1`
*   **An (Worried):**
    > *Prompt:* `16-bit cozy pixel art headshot portrait of a teenage Vietnamese male high school student. Wearing a white school shirt uniform and a red motorcycle helmet. Worried facial expression, furrowed eyebrows, wide eyes, a tiny pixelated blue sweat drop on his temple. Facing forward. Cozy warm color palette. Solid flat cream background. Fine pixel grid, crisp edges, retro game asset --ar 1:1`

### 3.2. Danh Sách Prompt Cho Mẹ của An (Mom)
*   **Mom (Caring):**
    > *Prompt:* `16-bit cozy pixel art headshot portrait of a middle-aged Vietnamese mother in her 40s. Hair tied neatly in a bun at the back. Wearing a cozy turquoise áo bà ba (Vietnamese traditional blouse). Warm caring expression, smiling eyes, gentle smile. Facing forward. Warm nostalgic lighting. Solid flat cream background. Crisp pixel art, retro game asset --ar 1:1`
*   **Mom (Worried):**
    > *Prompt:* `16-bit cozy pixel art headshot portrait of a middle-aged Vietnamese mother in her 40s. Hair tied in a neat bun. Wearing a light purple áo bà ba. Worried and protective expression, slanted concerned eyebrows, slightly parted mouth. Facing forward. Cozy warm color palette. Solid flat cream background. Crisp pixel art, retro game asset --ar 1:1`
*   **Mom (Angry):**
    > *Prompt:* `16-bit cozy pixel art headshot portrait of a middle-aged Vietnamese mother in her 40s. Hair in a neat bun. Wearing a turquoise áo bà ba. Angry and strict expression, furrowed eyebrows, tight lips, slightly flushed cheeks. Facing forward. Cozy warm color palette. Solid flat cream background. Crisp pixel art, retro game asset --ar 1:1`

### 3.3. Danh Sách Prompt Cho Bác Nam (Neighbor)
*   **Bác Nam (Friendly):**
    > *Prompt:* `16-bit cozy pixel art headshot portrait of a friendly middle-aged Vietnamese man in his 50s. Slightly tanned skin, short dark hair with hints of grey/silver. Wearing a simple muted green t-shirt. Broad friendly smile, happy crinkled eyes. Facing forward. Warm sunlight lighting. Solid flat cream background. Crisp pixel art, retro game asset --ar 1:1`

---

## 4. Đặc Tả Tải Tài Nguyên & Bản Đồ Tọa Độ Sprite (Phaser Sprite & Atlas Config)
Khi các ảnh chân dung riêng lẻ đã được tạo lập, chúng có thể được ghép thành một **Sprite Sheet** duy nhất hoặc nạp trực tiếp qua cấu hình Phaser Loader.

### 4.1. Cấu Trúc Thư Mục Asset Thực Tế
```text
public/assets/characters/
├── an_neutral.png        (96x96 px)
├── an_worried.png        (96x96 px)
├── mom_caring.png        (96x96 px)
├── mom_worried.png       (96x96 px)
├── mom_angry.png         (96x96 px)
└── bac_nam_friendly.png   (96x96 px)
```

### 4.2. Cách Nạp & Quản Lý Qua Phaser 3
Để tối ưu hóa việc quản lý mã nguồn, chúng ta sẽ lưu tọa độ và khóa nhân vật vào tệp cấu hình JSON hoặc gọi trực tiếp trong Phaser:

```javascript
// Nạp các hình ảnh chân dung vào Scene Preload
function preload() {
    // Chân dung AN
    this.load.image('char_an_neutral', 'assets/characters/an_neutral.png');
    this.load.image('char_an_worried', 'assets/characters/an_worried.png');
    
    // Chân dung MẸ
    this.load.image('char_mom_caring', 'assets/characters/mom_caring.png');
    this.load.image('char_mom_worried', 'assets/characters/mom_worried.png');
    this.load.image('char_mom_angry', 'assets/characters/mom_angry.png');
    
    // Chân dung BÁC NAM
    this.load.image('char_bac_nam_friendly', 'assets/characters/bac_nam_friendly.png');
}

// Hàm hiển thị Avatar tương ứng với nội dung hội thoại
function showSpeakerPortrait(scene, characterKey, emotion) {
    const assetKey = `char_${characterKey}_${emotion}`;
    
    // Kiểm tra xem assetKey có được định nghĩa sẵn trong cache Phaser không
    if (scene.textures.exists(assetKey)) {
        if (scene.portraitImage) {
            scene.portraitImage.setTexture(assetKey);
        } else {
            // Hiển thị chân dung tại góc trái phía trên khung hội thoại (X: 100, Y: 250)
            scene.portraitImage = scene.add.image(100, 250, assetKey);
            scene.portraitImage.setOrigin(0.5);
            scene.portraitImage.setScale(1.0); // 96x96px vừa vặn hoàn hảo
        }
    } else {
        console.warn(`Portrait asset not found: ${assetKey}`);
    }
}
```

---

## 5. Kế Hoạch Phối Hợp Sinh Ảnh (AI Execution Plan)
Chúng tôi sẽ gửi danh sách prompt chi tiết này tới **Main Agent** để kích hoạt công cụ tạo ảnh hoặc chuyển đổi thành hình ảnh pixel art thực tế. Sau khi sinh ảnh xong, các tệp ảnh sẽ được đổi tên tương ứng và lưu trữ tại đường dẫn `public/assets/characters/` để sẵn sàng tích hợp vào game.
