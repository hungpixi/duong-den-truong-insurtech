# ĐẶC TẢ HỒ SƠ THỊ GIÁC & HƯỚNG DẪN PROMPT VẬT THỂ CẢNH QUAN (SCENIC PROPS)

Tài liệu này quy định chi tiết hồ sơ thiết kế thị giác, bảng màu, thông số tích hợp Phaser 3 và các câu lệnh (prompts) tối ưu cho Midjourney/DALL-E để tạo ra 6 vật thể cảnh quan chính cho bối cảnh nhà nhân vật An trong game **"7 Giờ Kém 10"**.

---

## 1. PHONG CÁCH MỸ THUẬT CHỦ ĐẠO (ART STYLE GUIDELINES)

Để đảm bảo tính đồng nhất với định hướng nghệ thuật của dự án, các hình ảnh tạo ra phải tuân thủ nghiêm ngặt các tiêu chuẩn sau:

*   **Vibe & Tone:** Ấm áp, bình yên, gợi nhớ ký ức học trò Việt Nam buổi sáng sớm.
*   **Key Phrase cho Style:** `"beautiful warm cozy semi-realistic 2.5D illustration, clean outlined details, soft morning sunlight shadows, transparent background"`
*   **Quy tắc phối cảnh:** Phối cảnh **2.5D Side-Isometric** hoặc **2.5D Side-Scrolling**, với góc nhìn hơi chéo từ trên xuống (rear-oblique hoặc ¾ angle) tùy theo vật thể, giúp hiển thị rõ chiều sâu.
*   **Đặc điểm nét vẽ:** Nét outline mảnh, rõ ràng nhưng không bị cứng (clean outlined details). Ánh sáng bình minh chiếu xiên tạo bóng đổ mềm mại, ấm áp (warm morning sunlight & soft shadows).
*   **Tách nền (Background):** Khi tạo ảnh, luôn yêu cầu xuất ra trên nền trắng trơn để dễ dàng khử nền (transparent background) và import vào Phaser.

---

## 2. BẢNG TỔNG HỢP CÁC VẬT THỂ TRONG HOMESCENE

| Tên Sprite (Phaser Key) | Đối Tượng | Kích Thước (W x H) | Tọa Độ X | Tọa Độ Y | Z-Index Layer | Vùng Tương Tác (Euclid) |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| `obstacle_motorbike` | Xe máy Wave đỏ | 80 x 48 | 950 | 410 | Dynamic Y-Sorted | $d \le 60\text{px}$ (Kiểm tra phanh/lốp) |
| `furniture_desk` | Bàn học gỗ sồi | 96 x 48 | 380 | 330 | Dynamic Y-Sorted | $d \le 60\text{px}$ (Đọc tờ bảo hiểm) |
| `furniture_mattress` | Nệm ngủ sàn nhà | 160 x 60 | 180 | 335 | Dynamic Y-Sorted | Không (Điểm thức dậy) |
| `furniture_door` | Cửa phòng ngủ | 64 x 128 | 750 | 280 | Tường tĩnh (Z: 60) | Không (Kết nối nhà/sân) |
| `item_helmet` | Mũ bảo hiểm (Móc) | 24 x 24 | 710 | 225 | Tường tĩnh (Z: 70) | $d \le 60\text{px}$ (Lấy mũ bảo hiểm) |
| `furniture_gate` | Cổng sắt sân trước | 20 x 180 | 1170 | 420 | Cảm biến chuyển cảnh | $d \le 60\text{px}$ (Dắt xe đi học) |

---

## 3. HỒ SƠ THỊ GIÁC CHI TIẾT & PROMPT CỦA TỪNG VẬT THỂ

### 3.1. Xe máy Wave Alpha đỏ (`obstacle_motorbike`)

*   **Mô tả thị giác:** Chiếc xe máy số Wave Alpha quốc dân của học sinh Việt Nam. Thân xe nhựa cứng màu đỏ tươi thắm (`#dc2626`), yên xe bọc da màu xám đậm (`#475569`), các chi tiết kim loại mạ crom sáng bóng như ống xả (bô xe), vành nan hoa và giảm xóc sau.
*   **Góc nhìn & Bố cục:** Góc nghiêng từ phía sau (rear-oblique angle), dựng chân chống nghiêng bên trái, đầu xe hướng về phía trước bên trái.
*   **Bảng màu chi tiết:** Đỏ thắm (`#dc2626`), Xám yên (`#475569`), Crom sáng (`#cbd5e1`), Lốp đen (`#1e293b`).

> [!NOTE]
> **Midjourney v6 Prompt:**
> `/imagine prompt: A classic Vietnamese red Wave Alpha underbone motorbike, rear-oblique angle view from behind, showing its bright red plastic body, grey vinyl seat, chrome exhaust pipe, metal details. Beautiful warm cozy semi-realistic 2.5D illustration, clean outlined details, soft morning sunlight shadows, transparent background, isolated on a solid white background --ar 1:1 --style raw --v 6.0`

> [!TIP]
> **DALL-E 3 Prompt:**
> `A 2.5D semi-realistic illustration of a classic Vietnamese red Wave Alpha underbone motorcycle. The vehicle is viewed from a rear-oblique angle, highlighting the tail light, bright red paint finish, a grey seat cushion, and polished chrome details on the exhaust pipe and wheels. Cozy, warm atmosphere with soft morning sunlight casting gentle shadows. The style has clean outlined details, modern vector-art style feel. The entire object must be isolated on a pure white background for easy transparency masking.`

*   **Phaser Canvas Fallback Code (Vẽ lập trình):**
    ```javascript
    this.createCanvasTexture('obstacle_motorbike', 80, 48, (ctx, w, h) => {
      // Bóng đổ xi măng sân
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(w/2, h - 6, 30, 5, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Bánh xe
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(15, h - 12, 10, 0, Math.PI*2);
      ctx.arc(w - 18, h - 12, 10, 0, Math.PI*2);
      ctx.fill();
      
      // Viền căm xe mạ bạc
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chân chống nghiêng
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(w/2 - 5, h - 18);
      ctx.lineTo(w/2 - 12, h - 6);
      ctx.stroke();

      // Thân xe đỏ Wave
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(20, h - 30, 42, 14);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(w/2 - 8, h - 28, 20, 10);

      // Đầu xe
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(12, h - 38, 10, 12);
      ctx.fillStyle = '#ffffff'; // Kính đèn pha
      ctx.fillRect(8, h - 36, 5, 5);

      // Yên xe xám
      ctx.fillStyle = '#475569';
      ctx.fillRect(32, h - 32, 28, 5);
      
      // Ống bô xe crom sáng
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(w/2 + 2, h - 16, 20, 4);
    });
    ```

---

### 3.2. Bàn học học sinh (`furniture_desk`)

*   **Mô tả thị giác:** Chiếc bàn học bằng gỗ sồi (oak wood) tự nhiên màu nâu sáng ấm áp. Trên mặt bàn bày biện một cuốn vở học sinh đang mở trang giấy trắng vẽ sơ đồ, và một chiếc đèn đọc sách retro chụp đèn màu xanh lá cây đậm (đèn ngân hàng xưa) đang tỏa ra ánh sáng màu vàng ấm (`#fef08a`).
*   **Góc nhìn & Bố cục:** Phối cảnh chéo 2.5D hướng nhìn từ phía trước góc ¾, thấy rõ cả mặt trên bàn và hai chân gỗ.
*   **Bảng màu chi tiết:** Gỗ sồi ấm (`#a1704c`), Vàng đèn ấm (`#fef08a`), Xanh lá retro (`#065f46`), Giấy trắng sữa (`#fffbeb`).

> [!NOTE]
> **Midjourney v6 Prompt:**
> `/imagine prompt: A wooden oak student study desk, an open notebook with blank pages on top, a green retro reading banker lamp emitting a warm yellow glow. Beautiful warm cozy semi-realistic 2.5D illustration, clean outlined details, soft morning sunlight shadows, transparent background, isolated on a solid white background --ar 1:1 --style raw --v 6.0`

> [!TIP]
> **DALL-E 3 Prompt:**
> `A warm and cozy 2.5D semi-realistic illustration of an oak wood student study desk. Resting on the desk surface is an open paper notebook with blank pages and a classic retro banker desk lamp with a green glass cover that glows with soft, warm yellow light. Beautiful outlined detailing, atmospheric lighting, soft morning sunbeams and shadows. Isolated on a pure white background for easy editing.`

*   **Phaser Canvas Fallback Code (Vẽ lập trình):**
    ```javascript
    this.createCanvasTexture('furniture_desk', 96, 64, (ctx, w, h) => {
      // Bóng đổ
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(6, h - 10, w - 12, 10);
      
      // Chân bàn gỗ sồi sậm
      ctx.fillStyle = '#78350f';
      ctx.fillRect(12, h - 32, 8, 28);
      ctx.fillRect(w - 20, h - 32, 8, 28);
      
      // Hộc tủ bàn
      ctx.fillStyle = '#92400e';
      ctx.fillRect(8, 24, w - 16, 16);

      // Mặt bàn chéo gỗ sáng
      ctx.fillStyle = '#b45309';
      ctx.fillRect(4, 16, w - 8, 10);

      // Vở mở ra
      ctx.fillStyle = '#fffbeb';
      ctx.fillRect(24, 15, 18, 6);
      ctx.strokeStyle = '#d97706';
      ctx.strokeRect(24, 15, 18, 6);

      // Đèn học retro xanh lá và quầng sáng
      ctx.fillStyle = '#065f46';
      ctx.fillRect(w - 32, 4, 10, 8); // Chụp đèn
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(w - 28, 12, 2, 8); // Thân đèn
      
      // Quầng sáng vàng hắt ra
      ctx.fillStyle = 'rgba(254, 240, 138, 0.3)';
      ctx.beginPath();
      ctx.moveTo(w - 32, 12);
      ctx.lineTo(w - 48, 26);
      ctx.lineTo(w - 12, 26);
      ctx.closePath();
      ctx.fill();
    });
    ```

---

### 3.3. Nệm ngủ đặt trên sàn (`furniture_mattress`)

*   **Mô tả thị giác:** Nệm ngủ ngủ dậy xếp gọn gàng sát vách tường. Ga nệm (sheet) màu xanh dương nhạt dịu mát (`#bae6fd`), gối nằm màu trắng tinh khôi đặt ở góc trái đầu nệm, và một chiếc chăn mỏng màu vàng nghệ (`#f59e0b`) được gấp nếp vuông vức, đặt gọn gàng ở cuối chân nệm.
*   **Góc nhìn & Bố cục:** Góc nhìn chéo phối cảnh 2.5D nghiêng nhẹ từ góc trên, thể hiện sự ấm áp, sạch sẽ.
*   **Bảng màu chi tiết:** Xanh nhạt (`#bae6fd`), Vàng ấm (`#f59e0b`), Trắng gối (`#fafaf9`).

> [!NOTE]
> **Midjourney v6 Prompt:**
> `/imagine prompt: A tidy floor mattress, light blue sheet, a single clean white pillow on the left, a neatly folded yellow blanket on the bottom right. Beautiful warm cozy semi-realistic 2.5D illustration, clean outlined details, soft morning sunlight shadows, transparent background, isolated on a solid white background --ar 1:1 --style raw --v 6.0`

> [!TIP]
> **DALL-E 3 Prompt:**
> `A 2.5D cozy illustration of a tidy floor bed arrangement. It consists of a thin mattress laid directly on the ground with a soft light-blue sheet, a fluffy white pillow placed at the top-left head of the bed, and a yellow summer blanket neatly folded into a rectangle at the foot of the bed. Warm, calm morning mood with soft, light shadows cast on the side. Outlined styling with gentle gradients, isolated on a solid white background.`

*   **Phaser Canvas Fallback Code (Vẽ lập trình):**
    ```javascript
    this.createCanvasTexture('furniture_mattress', 160, 60, (ctx, w, h) => {
      // Bóng đổ xung quanh nệm
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, h - 8, w, 8);

      // Thân nệm
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(4, 4, w - 8, h - 10);
      
      // Chiếu có sọc vân nhẹ
      ctx.fillStyle = '#93c5fd';
      ctx.fillRect(8, 8, w - 16, h - 18);

      // Gối nằm trắng (bên trái)
      ctx.fillStyle = '#fafaf9';
      ctx.fillRect(16, 12, 28, 16);
      ctx.strokeStyle = '#cbd5e1';
      ctx.strokeRect(16, 12, 28, 16);

      // Chăn gấp gọn màu vàng ấm (bên phải)
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(w - 52, 16, 36, 20);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(w - 48, 20, 28, 12);
    });
    ```

---

### 3.4. Cửa phòng bằng gỗ sồi (`furniture_door`)

*   **Mô tả thị giác:** Cửa phòng ngủ bằng chất liệu gỗ sồi tự nhiên màu cánh gián ấm áp. Ở vị trí tầm mắt có một ô cửa kính nhỏ hình chữ nhật nằm ngang (`small glass pane`), qua ô kính này chiếu rọi những quầng sáng bình minh rực rỡ và lấp lánh nhẹ từ thế giới bên ngoài vào phòng. Tay nắm cửa mạ crom mờ nằm ở mép phải.
*   **Góc nhìn & Bố cục:** Góc nhìn trực diện hoặc nghiêng góc 2.5D cực nhẹ (gần như phẳng để ốp vào sprite tường tĩnh của phòng).
*   **Bảng màu chi tiết:** Gỗ sồi ấm (`#8c5e3c`), Ánh sáng vàng (`#fef08a`), Kính mờ xanh hạt bụi (`#e2e8f0`).

> [!NOTE]
> **Midjourney v6 Prompt:**
> `/imagine prompt: An indoor wooden oak room door, a small glass pane in the upper portion glowing with warm morning light filtering through. Beautiful warm cozy semi-realistic 2.5D illustration, clean outlined details, soft morning sunlight shadows, transparent background, isolated on a solid white background --ar 1:1 --style raw --v 6.0`

> [!TIP]
> **DALL-E 3 Prompt:**
> `A 2.5D illustration of a closed indoor room door crafted from rich oak wood with a visible natural grain pattern. The door features a small rectangular glass window pane in the top section, which glows vividly with golden morning light passing from the other side. Minimalistic and cozy, clean black outlines, soft sunlight casting shadow lines. Isolated on a clean white background.`

*   **Phaser Canvas Fallback Code (Vẽ lập trình):**
    ```javascript
    this.createCanvasTexture('furniture_door', 64, 128, (ctx, w, h) => {
      // Khung cửa bao quanh sẫm màu
      ctx.fillStyle = '#5c3d24';
      ctx.fillRect(0, 0, w, h);

      // Cánh cửa gỗ sồi
      ctx.fillStyle = '#8c5e3c';
      ctx.fillRect(4, 4, w - 8, h - 8);

      // Các chi tiết pano gỗ chia ô
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.strokeRect(8, 8, w - 16, h/2 - 12);
      ctx.strokeRect(8, h/2 + 4, w - 16, h/2 - 12);

      // Ô cửa kính nhỏ hắt sáng bình minh
      ctx.fillStyle = '#fef08a'; // Vàng ấm bình minh
      ctx.fillRect(16, 20, w - 32, 24);
      // Ánh sáng loá nhẹ viền
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(18, 22, w - 36, 6);

      // Tay nắm cửa kim loại bạc
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(w - 14, h/2 + 2, 8, 16);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(w - 18, h/2 + 6, 4, 4);
    });
    ```

---

### 3.5. Mũ bảo hiểm treo trên móc (`furniture_hook` & `item_helmet`)

*   **Mô tả thị giác:** Một chiếc mũ bảo hiểm nửa đầu màu đỏ tươi cá tính (Red Helmet) có kính chắn gió nhỏ phía trước và quai mũ buông lỏng tự nhiên. Chiếc mũ đang treo ngược lửng lơ trên một chiếc móc treo gắn tường bằng gỗ sồi hình tròn mộc mạc.
*   **Góc nhìn & Bố cục:** Góc nhìn nghiêng từ một phía (¾ profile), thể hiện rõ hình dạng mũ bảo hiểm và chốt quai móc tiện lợi cho người chơi thu thập.
*   **Bảng màu chi tiết:** Đỏ tươi thương hiệu (`#ef4444` - gói bảo hiểm mũ đỏ), Trắng lót (`#fafaf9`), Gỗ móc (`#78350f`).

> [!NOTE]
> **Midjourney v6 Prompt:**
> `/imagine prompt: A bright red motorcycle helmet hanging from a wooden wall hook by its strap. Beautiful warm cozy semi-realistic 2.5D illustration, clean outlined details, soft morning sunlight shadows, transparent background, isolated on a solid white background --ar 1:1 --style raw --v 6.0`

> [!TIP]
> **DALL-E 3 Prompt:**
> `A 2.5D cozy semi-realistic illustration of a glossy bright red open-face motorcycle helmet hanging by its black nylon strap on a round oak wood wall peg. The light source comes from the top left, casting soft shadows beneath the helmet. Clean black outlines, vibrant warm colors. Isolated on a solid white background.`

*   **Phaser Canvas Fallback Code (Vẽ lập trình):**
    ```javascript
    this.createCanvasTexture('item_helmet', 24, 24, (ctx, w, h) => {
      // Vỏ mũ bảo hiểm tròn màu đỏ tươi
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(w/2, h/2 - 2, 8, Math.PI, 0, false);
      ctx.fill();
      
      // Vành mũ bảo hiểm nhô ra phía trước
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(w/2 - 10, h/2 - 2, 2, 2);

      // Phần kính chắn gió trong suốt nhẹ
      ctx.fillStyle = 'rgba(186, 230, 253, 0.4)';
      ctx.fillRect(w/2 - 8, h/2 - 2, 16, 3);

      // Quai mũ treo thòng xuống
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w/2 - 5, h/2);
      ctx.lineTo(w/2, h/2 + 8);
      ctx.lineTo(w/2 + 5, h/2);
      ctx.stroke();
    });
    ```

---

### 3.6. Cổng sắt sân trước (`furniture_gate`)

*   **Mô tả thị giác:** Cánh cổng sắt nhà phố cũ đặc trưng Việt Nam gồm các thanh chắn sắt đứng. Sơn cổng màu xanh ngọc lam hoặc xanh lá phai màu thời gian (turquoise/faded green) rỉ sét nhẹ ở các khớp nối. Cổng có một chốt sắt cài trượt ngang (slide latch) to bản bằng thép màu xám đậm.
*   **Góc nhìn & Bố cục:** Phối cảnh 2.5D nghiêng góc giúp thấy rõ các thanh chắn sắt đứng song song và cấu trúc của thanh ngang trượt chốt khóa.
*   **Bảng màu chi tiết:** Xanh ngọc phai màu (`#14b8a6`), Thép xám chốt (`#475569`), Sắt rỉ nhẹ (`#b45309`).

> [!NOTE]
> **Midjourney v6 Prompt:**
> `/imagine prompt: A weathered turquoise faded green iron bar yard gate, a heavy metal slide latch locked in place. Beautiful warm cozy semi-realistic 2.5D illustration, clean outlined details, soft morning sunlight shadows, transparent background, isolated on a solid white background --ar 1:1 --style raw --v 6.0`

> [!TIP]
> **DALL-E 3 Prompt:**
> `A 2.5D semi-realistic illustration of a traditional Vietnamese home courtyard gate. Made of thin vertical iron bars painted in a distressed, faded turquoise teal color with minor spots of rust. A horizontal slide latch made of grey weathered steel is installed across the bars. Bright soft morning sun casts long, thin shadows of the gate bars. Clear outlined cartoon look, isolated on a solid white background.`

*   **Phaser Canvas Fallback Code (Vẽ lập trình):**
    ```javascript
    this.createCanvasTexture('furniture_gate', 24, 180, (ctx, w, h) => {
      // Trụ cột sắt biên trái
      ctx.fillStyle = '#0f766e'; // Ngọc lam đậm
      ctx.fillRect(0, 0, 4, h);

      // Các thanh sắt đứng song song
      ctx.fillStyle = '#14b8a6'; // Ngọc lam tươi
      ctx.fillRect(8, 0, 3, h);
      ctx.fillRect(16, 0, 3, h);

      // Khung xương cổng ngang (Thanh trên và thanh dưới)
      ctx.fillStyle = '#0d9488';
      ctx.fillRect(0, 20, w, 6);
      ctx.fillRect(0, h - 26, w, 6);

      // Chốt cài trượt ngang khóa cổng (Slide Latch)
      ctx.fillStyle = '#475569'; // Thép xám tối
      ctx.fillRect(2, h/2 - 6, w - 4, 12);
      ctx.fillStyle = '#94a3b8'; // Tay gạt chốt sáng màu
      ctx.fillRect(8, h/2 - 12, 6, 6);
      
      // Các đốm rỉ sắt mộc mạc
      ctx.fillStyle = '#b45309';
      ctx.fillRect(0, 22, 3, 2);
      ctx.fillRect(16, h/2 - 4, 2, 2);
    });
    ```

---

## 4. HƯỚNG DẪN TÍCH HỢP VẬT THỂ VÀO PHASER 3

Để đảm bảo hiệu quả hiển thị 2.5D trong game:

1.  **Thiết lập Điểm Neo (Anchor Points / Origin):**
    Các vật thể tĩnh đặt trên sàn (`furniture_desk`, `furniture_mattress`, `obstacle_motorbike`) phải được gán điểm neo chân đế của chúng về đáy vật thể để hỗ trợ Z-sorting động:
    ```javascript
    sprite.setOrigin(0.5, 1.0); // Neo tại trung điểm đáy chân đế
    ```

2.  **Cập nhật Z-Sorting động trong vòng lặp `update()`:**
    ```javascript
    // Sắp xếp các vật thể thuộc nhóm y-sorted
    this.ysortGroup.getChildren().forEach(child => {
        child.depth = child.y;
    });
    ```

3.  **Thu hẹp Hộp va chạm Vật lý (Physics Body size tuning):**
    Đối với bàn học và xe máy, thu nhỏ chiều cao của body vật lý để người chơi có thể đi chéo qua phía sau vật thể (Y thấp hơn chân đế vật thể) mà không bị kẹt va chạm:
    ```javascript
    // Bàn học (96 x 48) -> Chỉ va chạm vùng chân bàn sâu 16px ở đáy
    this.desk.body.setSize(96, 16);
    this.desk.body.setOffset(0, 32);
    ```

---
*Tài liệu hướng dẫn thiết kế cảnh quan game "7 Giờ Kém 10" - GAIP 2026.*
