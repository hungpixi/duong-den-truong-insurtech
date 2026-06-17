# THIẾT KẾ UI/UX PIXEL NARRATIVE: "7 GIỜ KÉM 10"
*Tài liệu đặc tả cải tiến giao diện theo phong cách Pixel Art ấm áp, hoài niệm tuổi học trò Việt Nam*

---

## 1. Triết Lý Thiết Kế (Creative Philosophy)

Mục tiêu lớn nhất của đợt tái thiết kế UI/UX này là loại bỏ hoàn toàn cảm giác của một "giao diện gỡ lỗi" (debug interface) hay phong cách công nghệ khô cứng (cyberpunk/neon), thay thế bằng một **không gian trải nghiệm ấm áp, mộc mạc và giàu tính tự sự (cozy pixel narrative)**.

*   **Cảm hứng cốt lõi:** Những buổi sáng nắng sớm xiên qua vòm cây phượng, trang vở ô ly học sinh viết bằng mực tím mực xanh, chiếc nhãn vở vẽ tay nắn nót, bảng xanh phấn trắng của lớp học Việt Nam, và những lời dặn dò giản dị từ Mẹ trước khi con dắt xe ra khỏi cổng.
*   **Trải nghiệm người dùng:** Giao diện không chỉ để hiển thị thông số mà là một phần của câu chuyện. UI cần tạo cảm giác dễ chịu, hoài cổ nhưng vẫn đảm bảo độ tương phản cao, dễ đọc trên cả màn hình máy tính và thiết bị di động (tỷ lệ 16:9).

---

## 2. Bảng Màu Ấm Áp & Hoài Niệm (Cozy Color Palette)

Bảng màu mới chuyển dịch từ các tông màu neon tương phản gắt sang các gam màu ấm, dịu mắt và mang đậm hơi thở cuộc sống thường nhật tại Việt Nam.

| Tên Màu (Vietnamese Name) | Mã Hex | Vai trò trong Thiết kế & Trải nghiệm |
| :--- | :---: | :--- |
| **Nắng Sớm (Morning Yellow)** | `#FFE893` | Ánh sáng ban mai dịu nhẹ. Dùng làm màu nhấn nổi bật, nền các nhãn tiêu đề quan trọng, hoặc màu nắng chiếu rọi. |
| **Giấy Tập Cũ (Soft Cream)** | `#FDFBF2` | Nền của các bảng biểu, menu, sổ tay. Tránh dùng màu trắng tinh giúp bảo vệ mắt người chơi và tạo cảm giác giấy tập xưa cũ. |
| **Mực Tím Học Trò (Violet Ink)** | `#6C5CE7` | Màu mực bút máy quen thuộc của học sinh tiểu học/trung học. Dùng cho tiêu đề chính, các ghi chú cần chú ý. |
| **Mực Xanh Tập Vở (School Blue)** | `#2B52B7` | Màu xanh đồng phục học sinh và mực viết thông thường. Dùng cho nội dung chữ thường trên nền giấy kem. |
| **Đỏ Mũ Bảo Hiểm (Helmet Red)** | `#E15B64` | Màu đỏ ấm của gạch ngói hoặc mũ bảo hiểm. Dùng cho chỉ số sức khỏe (HP) bị mất, cảnh báo nguy hiểm nhưng không tạo cảm giác quá gắt. |
| **Xanh Lá Cây Bàng (Muted Green)** | `#4A8F68` | Màu của bóng mát cây bàng, cây phượng. Dùng cho chỉ số an toàn tăng, trạng thái bảo hiểm đã mua, quyết định đúng luật. |
| **Bảng Xanh Phấn Trắng (Board Green)**| `#1E3F24` | Tái hiện chiếc bảng đen/bảng xanh trong lớp học. Dùng làm màu nền cho các khung menu phụ hoặc popup giáo dục. |
| **Chì Than 2B (Charcoal Slate)** | `#2C3E50` | Thay thế hoàn toàn màu đen tuyệt đối (#000000) để viết chữ hoặc vẽ đường viền, giúp nét vẽ pixel art mềm mại, tự nhiên hơn. |

---

## 3. Tái Thiết Kế Thanh HUD (In-Game HUD Redesign)

Thanh HUD cũ sử dụng các khối chữ nhật to màu xám đen bóng bẩy kiểu cyberpunk. Thiết kế mới sẽ tinh giản, mộc mạc và lồng ghép các yếu tố đồ họa vẽ tay gọn nhẹ.

### 3.1. Bố Cục HUD Trực Quan (Tỷ lệ màn hình 16:9 - $800 \times 450$ hoặc $800 \times 600$)

```
+-------------------------------------------------------------------------+
| [Bottle/HP] 90%                    [ 06:50 ]               [Piggy] 150K |
|  [===---------]                   (7:00 Kém 10)            An Toàn: [95] |
|                                                                         |
|                                                                         |
| [LỚP CHƠI GAME - DI CHUYỂN TRÊN ĐƯỜNG PHỐ]                              |
|                                                                         |
+-------------------------------------------------------------------------+
```

### 3.2. Chi tiết các thành phần HUD trong Phaser

1.  **Chỉ số Sức khỏe (HP Bar):**
    *   **Concept:** Thay vì thanh máu khô khan, HP được biểu diễn bằng hình ảnh **Bình nước học sinh (Water Bottle)** đặt ở góc trên bên trái $(X: 20, Y: 20)$.
    *   **Đồ họa:** Bình nước pixel art màu xanh dương nhạt. Khi HP giảm, mực nước trong bình hạ xuống kèm hiệu ứng sủi bọt khí bong bóng nhẹ.
    *   **Thanh chỉ số:** Đặt ngay dưới bình nước, dài $120\text{px}$, cao $10\text{px}$. Nền màu Giấy Tập Cũ `#FDFBF2`, ruột màu Đỏ Mũ Bảo Hiểm `#E15B64`, viền Chì Than `#2C3E50` dày $2\text{px}$.
2.  **Chỉ số Tài chính (Coin/Tiền):**
    *   **Concept:** Đồng tiền được biểu diễn bằng chú **Heo Đất (Piggy Bank)** màu hồng pastel đặt ở góc trên bên phải $(X: 680, Y: 20)$.
    *   **Đồ họa:** Khi nhận được xu (tiền tiết kiệm), heo đất sẽ lắc lư nhẹ (Tween rotate) kèm biểu tượng đồng xu vàng nhỏ bay lên bay xuống.
    *   **Text hiển thị:** Cỡ chữ `16px` (font `'VT323'`), màu Mực Xanh `#2B52B7`, viền trắng mỏng. Ví dụ: `"150,000đ"` hoặc `"150 Xu"`.
3.  **Điểm An Toàn (Safety Score Badge):**
    *   **Concept:** Nằm ngay dưới Heo Đất $(X: 680, Y: 50)$, được thiết kế như một tấm **Phù hiệu Học sinh (Student Badge)** hình thoi hoặc hình tròn nhỏ.
    *   **Màu sắc:** Nền màu Nắng Sớm `#FFE893`, chữ màu Chì Than `#2C3E50`. Hiển thị: `"AN TOÀN: 95"` (hoặc biểu tượng một chiếc khiên lá cây nhỏ bên cạnh số điểm).
4.  **Đồng hồ Thời gian (In-Game Timer):**
    *   **Concept:** Đặt chính giữa đỉnh màn hình $(X: 400, Y: 25)$, được thiết kế như một chiếc **Đồng hồ đeo tay Casio huyền thoại** của học sinh hoặc đồng hồ quả quýt gỗ.
    *   **Màu sắc:** Khung đồng hồ màu Slate xám nhạt, màn hình LCD hiển thị số màu đen chì: `"06:50"` (nhấp nháy dấu `:` chậm rãi).
    *   **Tên game nhắc nhở:** Dưới đồng hồ có một dòng chữ nhỏ màu Mực Tím `#6C5CE7` viết hoa: `"7 GIỜ KÉM 10"` như một mốc thời gian thúc giục nhưng vô cùng đáng yêu.

---

## 4. Sổ Tay Nhiệm Vụ "Mẹ Dặn" (Notebook Checklist UI)

Thay thế hoàn toàn bảng checklist nhiệm vụ kiểu debug bằng một tấm giấy xé từ cuốn vở học sinh nằm ở góc màn hình hoặc hiển thị khi người chơi bấm nút mở nhanh.

```
       +---------------------------------------------+
       | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ | <-- Răng cưa xé giấy
       |  Mẹ dặn sáng nay:                           |
       |  =============================              |
       |  [v] Đội mũ bảo hiểm (loại có kính)         | <-- Dấu tích bút mực đỏ
       |  [ ] Mang theo áo mưa phòng khi trời dông   |
       |  [ ] Đi chậm qua ngã tư Nguyễn Trãi         |
       |                                             |
       +---------------------------------------------+
```

### 4.1. Cấu trúc Đồ họa (Phaser Graphics & Container)
*   **Nền tờ giấy (Paper Background):** Dựng hình chữ nhật có bo góc nhẹ, màu vàng kem nhạt `#FDFBF2`. Vẽ các đường kẻ ngang màu xanh nhạt (`#A5CAD2` với alpha $0.4$) mô phỏng **giấy tập học sinh có dòng kẻ/ô ly**.
*   **Răng cưa xé giấy (Torn Paper Edge):** Đường viền phía trên của bảng được vẽ hình răng cưa lồi lõm nhẹ bằng Phaser Graphics, tạo cảm giác người con đã xé vội tờ giấy ghi chú của mẹ dặn từ tối qua.
*   **Tiêu đề:** `"Mẹ dặn sáng nay:"` được viết bằng font chữ nét liền mô phỏng chữ viết tay (handwriting style), màu Mực Tím `#6C5CE7`, cỡ chữ `18px`.
*   **Các dòng nhiệm vụ (Checklist Items):**
    *   Chữ màu Mực Xanh Tập Vở `#2B52B7`, cỡ chữ `14px`, căn dòng thẳng tắp theo đường kẻ vở.
    *   **Hộp kiểm (Checkbox):** Một ô vuông nhỏ vẽ bằng nét chì màu nâu. Khi hoàn thành, thay vì dấu tích hệ thống, một nét vẽ tay dấu tích `[v]` màu đỏ ngói hiện lên giống như nét chấm điểm của thầy cô.
    *   **Hoa điểm 10:** Khi hoàn thành toàn bộ checklist, một chiếc sticker hình **Hoa Điểm 10** hoặc **Phiếu Bé Ngoan** màu đỏ sẽ được dán (stamp) đè lên góc dưới của tờ giấy để tạo động lực và phần thưởng tinh thần.

---

## 5. Khung Hội Thoại Nhãn Vở (Dialogue Box Style)

Khung hội thoại là nơi truyền tải nhiều cảm xúc nhất trong game pixel narrative. Thiết kế mới sẽ lấy cảm hứng từ chiếc nhãn vở học sinh thân thuộc.

```
         +-------------------------------------------------+
         |  +---------------+                              |
         |  |  MẸ CỦA AN    |                              | <-- Nhãn vở dán đè
         |  +---------------+---------------------------+  |
         |  | "Con nhớ cài quai mũ bảo hiểm thật chắc   |  |
         |  |  chắn nhé. Đường hôm nay đông lắm đấy!"   |  |
         |  |                                     (pen) |  | <-- Ngòi bút máy nhấp nháy
         |  +-------------------------------------------+  |
         +-------------------------------------------------+
```

### 5.1. Thông số thiết kế chi tiết
*   **Khung viền chính (Dialogue Box Frame):**
    *   Tọa độ: $X: 50, Y: 310$ (trong khung hình 16:9 có chiều cao $450\text{px}$).
    *   Nền: Màu Soft Cream `#FDFBF2`, viền Chì Than `#2C3E50` dày $3\text{px}$. Đường viền được vẽ hơi lệch một chút (hand-drawn imperfection) chứ không thẳng tắp tuyệt đối.
    *   Độ mờ: Alpha $0.95$ để giữ độ tập trung tối đa cho người đọc.
*   **Nhãn Tên Người Nói (Speaker Tag):**
    *   Thiết kế giống **Nhãn Vở Học Sinh** kẻ ngang đỏ-xanh huyền thoại.
    *   Tọa độ đặt đè lên góc trên bên trái khung thoại $(X: 70, Y: 295)$.
    *   Nền màu Nắng Sớm `#FFE893`, có đường viền đôi màu Mực Tím `#6C5CE7`.
    *   Chữ tên nhân vật in hoa, màu Chì Than `#2C3E50`, cỡ chữ `15px` (`bold`).
*   **Con Trỏ Nhắc Chuyển Dòng (Next Line Indicator):**
    *   Thay vì hình tam giác nháy đỏ kiểu cyber, game sử dụng hình ảnh **Ngòi bút máy màu tím (Pen Nib)** hoặc một ngôi sao vàng nhỏ ở góc dưới bên phải hộp thoại $(X: 710, Y: 390)$.
    *   Hiệu ứng: Ngòi bút máy di chuyển lên xuống nhẹ nhàng (Tween Y bounce biên độ $4\text{px}$, chu kỳ $800\text{ms}$) để nhắc người chơi click tiếp tục câu chuyện.

### 5.2. Khung Quyết Định Lựa Chọn (Narrative Choices Style)
*   **Thiết kế:** Các phương án lựa chọn không xuất hiện thành những nút bấm công nghiệp, mà hiển thị dưới dạng các **Tờ giấy nhớ (Sticky Notes)** hoặc các **Thanh gỗ/thước kẻ học sinh** xếp chồng lên nhau ở giữa màn hình.
*   **Màu sắc:** Mỗi lựa chọn là một tờ giấy nhớ màu pastel dịu nhẹ:
    *   Lựa chọn an toàn: Tờ giấy màu Xanh Lá Nhạt `#E8F8F5`.
    *   Lựa chọn thông thường: Tờ giấy màu Soft Cream `#FDFBF2`.
    *   Lựa chọn mạo hiểm (cần cảnh báo): Tờ giấy màu Hồng Nhạt `#FDEDEC` kèm nét vẽ một chiếc đinh ghim nhỏ màu đỏ phía trên.

---

## 6. Lời Nhắc Tương Tác Ít Xâm Phạm (Non-intrusive Interaction Prompts)

Trong quá trình di chuyển trên đường phố, người chơi sẽ gặp các NPC hoặc vật thể tương tác (bình nước rơi, em bé sang đường, hiệu thuốc). Thay vì hiện các thông báo đè lên màn hình gây phân tâm, game áp dụng các quy chuẩn sau:

### 6.1. Floating Emotion Bubble (Bong bóng cảm xúc nổi)
*   Khi nhân vật của người chơi đến gần một vật thể có thể tương tác, một chiếc bong bóng nhỏ màu trắng kem vẽ viền chì than sẽ tự động hiện lên trên đầu vật thể đó.
*   Bên trong bong bóng là biểu tượng pixel art đơn giản:
    *   `[...]` nếu là người có thể nói chuyện.
    *   `[!]` nếu là sự kiện khẩn cấp hoặc chướng ngại vật cần chú ý.
    *   `[?]` nếu là vật phẩm có thể nhặt được (ví dụ: ví tiền rơi, gói bảo hiểm rơi).
*   **Hiệu ứng xuất hiện:** Scale từ $0.1 \to 1.0$ bằng hiệu ứng nảy nhẹ (`Back.easeOut`) trong $200\text{ms}$. Điều này thu hút ánh nhìn một cách tự nhiên mà không cần dùng chữ to thô cứng.

### 6.2. Phím Tương Tác Cách Điệu
*   Nếu người chơi chơi trên PC, khi đứng sát vật thể, bong bóng sẽ đổi thành hình **Phím [E]** được thiết kế như một phím bấm cơ học bằng gỗ hoặc nhựa pastel tròn trịa, nhấp nháy viền màu Nắng Sớm `#FFE893`.
*   Nếu trên thiết bị di động, bong bóng đổi thành hình **Bàn Tay Nhỏ (Tap Icon)** đang chỉ vào vật thể, kích thích hành vi chạm (touch) của người chơi.

---

## 7. Khả Năng Thích Ứng Thiết Bị & Phaser Graphics Code

### 7.1. Hướng Dẫn Tỷ Lệ 16:9 và Màn Hình Nhỏ
Game được thiết kế trên lưới ảo cố định $800 \times 450$ (chuẩn tỷ lệ vàng 16:9 cho game narrative).
*   **Safe Zone (Vùng an toàn):** Toàn bộ các thông số HUD và khung thoại quan trọng phải nằm trong khoảng $X: [40 \to 760]$ và $Y: [20 \to 430]$ để tránh bị cắt lẹm trên các màn hình có tai thỏ (notch) của điện thoại di động.
*   **Chế độ Scale trong Phaser:**
    ```javascript
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 450
    }
    ```

### 7.2. Đoạn mã mẫu dựng Khung Thoại Nhãn Vở (Phaser 3 Graphics & Text)
Dưới đây là phương thức vẽ hộp thoại nhãn vở bằng mã nguồn Phaser 3 để đội ngũ lập trình có thể thực thi ngay lập tức:

```javascript
// Tạo container cho hộp thoại
const dialogContainer = this.add.container(0, 0);

// 1. Vẽ khung giấy nền (Cream Paper)
const paperBg = this.add.graphics();
paperBg.fillStyle(0xFDFBF2, 0.95); // Màu Soft Cream
paperBg.lineStyle(3, 0x2C3E50, 1);  // Viền Chì Than 2B

// Vẽ hình chữ nhật bo góc nhẹ làm nền hộp thoại
paperBg.fillRoundedRect(50, 310, 700, 110, 8);
paperBg.strokeRoundedRect(50, 310, 700, 110, 8);
dialogContainer.add(paperBg);

// 2. Vẽ Nhãn vở Tên người nói (Speaker Tag)
const labelBg = this.add.graphics();
labelBg.fillStyle(0xFFE893, 1);     // Màu Nắng Sớm
labelBg.lineStyle(2, 0x6C5CE7, 1);  // Viền đôi màu Mực Tím học sinh
labelBg.fillRoundedRect(70, 290, 150, 30, 4);
labelBg.strokeRoundedRect(70, 290, 150, 30, 4);
dialogContainer.add(labelBg);

// 3. Text Tên người nói (Speaker Name Text)
const nameText = this.add.text(145, 305, "MẸ CỦA AN", {
    fontFamily: '"VT323", monospace',
    fontSize: '18px',
    fill: '#2C3E50', // Chữ Chì Than
    fontStyle: 'bold'
}).setOrigin(0.5);
dialogContainer.add(nameText);

// 4. Text Hội thoại (Dialogue Body Text)
const bodyText = this.add.text(75, 335, "", {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '15px',
    fill: '#2B52B7', // Mực Xanh Tập Vở
    wordWrap: { width: 650 },
    lineSpacing: 6
});
dialogContainer.add(bodyText);

// 5. Ngòi bút máy nhấp nháy báo chuyển dòng (Next Line Indicator)
const nextIndicator = this.add.image(725, 400, 'pen_nib_icon');
nextIndicator.setScale(0.8);
this.tweens.add({
    targets: nextIndicator,
    y: 396,
    duration: 600,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
});
dialogContainer.add(nextIndicator);
```

---

## 8. Danh Sách Tài Nguyên Đồ Họa Cần Chuẩn Bị (Asset Checklist)

Để phục vụ giao diện mới này, họa sĩ pixel art cần chuẩn bị các tài nguyên sau:

1.  `water_bottle_hp.png` (32x32 pixel): Icon bình nước học sinh với các trạng thái nước đầy, nước vơi 50%, nước cạn.
2.  `piggy_bank_coin.png` (32x32 pixel): Icon chú heo đất màu hồng phấn dễ thương đựng tiền tiết kiệm.
3.  `safety_shield_badge.png` (24x24 pixel): Icon phù hiệu học sinh / khiên lá cây an toàn.
4.  `pen_nib_next.png` (16x16 pixel): Icon ngòi bút máy mực tím chỉ hướng xuống/ngang để bấm chuyển thoại.
5.  `torn_paper_texture.png`: Hoa văn viền xé giấy răng cưa để ghép vào đầu trang Checklist Mẹ Dặn.
6.  `sticker_star_10.png` (40x40 pixel): Sticker hoa điểm 10 màu đỏ để đóng dấu hoàn thành ngày di chuyển.

Bản đặc tả thiết kế này thiết lập một định hướng giao diện ấm áp, thống nhất và giàu cảm xúc, đưa game giáo dục bảo hiểm "7 Giờ Kém 10" chạm tới trái tim người chơi bằng sự giản dị và chân thực nhất của tuổi học trò Việt Nam.
