# ĐẶC TẢ THIẾT KẾ UI/UX (UI/UX SPECIFICATION)
## Dự án: Game giáo dục bảo hiểm InsurTech “Đường Đến Trường”

Tài liệu này quy định chi tiết bố cục màn hình, kích thước font chữ, khoảng cách (padding), phân cấp nội dung và giải pháp hiển thị thích ứng cho thiết bị di động (Responsive Mobile Layout) áp dụng trong Phaser 3 Canvas.

---

## 1. Hệ Thống Màu Sắc & Font Chữ (Design System)

Để duy trì phong cách retro pixel art đồng bộ với yếu tố InsurTech hiện đại, game sử dụng bảng màu và font chữ thống nhất sau:

### 1.1. Bảng màu (Color Palette)
*   **Màu nền chính (Background):** `#0b0c10` (Dark Slate Gray) - Màu chủ đạo tạo cảm giác game chiều sâu.
*   **Khung giao diện (Panel BG):** `#1f2833` (Slate Blue tối) kết hợp độ mờ alpha $0.85$ (Glassmorphism).
*   **Màu nhấn chính (Primary Cyan):** `#66fcf1` (Neon Cyan) - Dành cho tiêu đề, nút được chọn, viền nổi bật.
*   **Màu nhấn phụ (Accent Yellow):** `#f5a623` (Warm Amber) - Dành cho điểm số, tiền xu và các cảnh báo quan trọng.
*   **Màu tích cực (Positive Green):** `#2ecc71` (Emerald Green) - Chỉ phần bảo hiểm chi trả, điểm an toàn tăng.
*   **Màu tiêu cực (Negative Red):** `#e74c3c` (Alizarin Red) - Chỉ số tiền bị trừ, chấn thương, mất an toàn.
*   **Màu chữ thường (Text):** `#ffffff` (Trắng) và `#a9a9a9` (Xám nhạt).

### 1.2. Font chữ (Typography)
Vì Phaser 3 dựng font chữ trực tiếp lên Canvas, game ưu tiên sử dụng các font chữ monospace có sẵn trên hệ điều hành hoặc Google Fonts tải trước:
*   **Font Pixel chính:** `'Courier New'`, `Courier`, `monospace` (được cấu hình nét vẽ sắt cạnh - `pixelArt: true`).
*   **Cấp bậc cỡ chữ (Text Hierarchies):**
    *   *Tiêu đề lớn (Title/Header):* `36px` - `48px`, in hoa, màu Cyan, độ dày nét chữ lớn (`Bold`).
    *   *Tiêu đề màn hình / Tên thẻ:* `24px` - `28px`, in hoa, màu Trắng/Cyan.
    *   *Chữ nội dung / Chỉ số HUD:* `16px` - `18px`, màu Trắng, khoảng cách dòng `6px`.
    *   *Chữ chú thích / Điều khoản phụ:* `12px` - `14px`, màu Xám nhạt.

---

## 2. Bố Cục Chi Tiết Các Màn Hình (Screen Layouts)

### 2.1. Màn hình Menu chính (MainMenuScene)
*   **Kích thước khung:** $800 \times 600\text{px}$.
*   **Bố cục trực quan:**
    *   **Tiêu đề Game (Y: 100 - 180):**
        *   Tọa độ: $X = 400\text{px}$ (Căn giữa), $Y = 130\text{px}$.
        *   Text: `"ĐƯỜNG ĐẾN TRƯỜNG"` (`48px`, Neon Cyan, viền đen `4px`).
        *   Slogan phụ: `"Hành Trình An Toàn & Bảo Vệ Tài Chính"` (`18px`, Xám nhạt, $Y = 185\text{px}$).
    *   **Danh sách nút bấm (Y: 280 - 480):** Dạng cột dọc căn giữa ($X = 400$).
        *   Nút "BẮT ĐẦU CHƠI": $Y = 300\text{px}$, kích thước $280 \times 50\text{px}$.
        *   Nút "TIẾP TỤC HÀNH TRÌNH": $Y = 370\text{px}$, kích thước $280 \times 50\text{px}$ (Chỉ bật khi có `localStorage`).
        *   Nút "BÀI HỌC BẢO HIỂM": $Y = 440\text{px}$, kích thước $280 \times 50\text{px}$.
*   **Hiệu ứng Hover:** Khi rê chuột qua, viền nút đổi thành Neon Cyan (`#66fcf1`), nền nút sáng lên với alpha từ $0.15 \to 0.35$, phát âm thanh click nhẹ.

### 2.2. Thanh thông số trong trận đấu (HUD - In-Game Dashboard)
HUD được đặt cố định ở lớp trên cùng (`Z-index: 100`) để người chơi kiểm soát trạng thái tức thì.
*   **Vùng hiển thị Trái (X: 20 - 300, Y: 15 - 60):**
    *   **Thanh Sức Khỏe (Health):** Icon trái tim đỏ ở $(30, 30)$. Thanh máu dạng hình chữ nhật dài $150\text{px}$, cao $16\text{px}$ nằm tại $(55, 22)$. Viền trắng, ruột đỏ (`#e74c3c`). Text đè lên: `"100/100"`.
    *   **Số dư Coin:** Icon đồng xu vàng lấp lánh tại $(30, 50)$, Text số tiền tại $(55, 45)$: `"500 xu"` (`18px`, màu Accent Yellow `#f5a623`).
*   **Vùng hiển thị Phải (X: 500 - 780, Y: 15 - 60):**
    *   **Điểm An Toàn (Safety Score):** Ô chữ nhật góc $(580, 20)$, kích thước $200 \times 32\text{px}$. Text hiển thị: `"AN TOÀN: 100"` (`16px`, Neon Cyan).
    *   **Trạng thái Bảo hiểm (Insurance Status):** Hiển thị nhãn gói đang dùng tại $(580, 55)$ kèm chấm tròn trạng thái. Đỏ nếu "Chưa bảo vệ", Xanh lá sáng nếu đã mua gói.
*   **Vùng hiển thị Giữa (X: 360 - 440, Y: 15 - 60):**
    *   **Thời gian đếm ngược:** Đặt tại $(400, 30)$ (Căn giữa). Chữ số to màu trắng: `"07:15"` hoặc `"Còn 75s"` (`24px`, Đậm). Kích hoạt nháy đỏ khi thời gian chỉ còn dưới $20$ giây.

### 2.3. Màn hình Chọn bảo hiểm (InsuranceSelectScene)
Xuất hiện ở đầu mỗi ngày để mô phỏng hành vi mua bảo hiểm trước khi tham gia giao thông.
*   **Tiêu đề chính:** $X = 400, Y = 50$, Text: `"LỰA CHỌN PHƯƠNG ÁN BẢO VỆ TÀI CHÍNH"` (`26px`, Neon Cyan).
*   **Bố cục 3 Thẻ Bảo hiểm (Spacing ngang):**
    *   Khoảng cách biên trái: $60\text{px}$. Khoảng cách giữa các thẻ: $40\text{px}$.
    *   Kích thước mỗi thẻ: Rộng $200\text{px}$, Cao $350\text{px}$.
    *   **Thẻ 1 (Không bảo hiểm):** Tâm tại $X = 180, Y = 280$. Màu chủ đạo Xám nhạt.
    *   **Thẻ 2 (BH Học đường):** Tâm tại $X = 400, Y = 280$. Màu chủ đạo Xanh dương nhạt.
    *   **Thẻ 3 (BH Di chuyển Toàn diện):** Tâm tại $X = 620, Y = 280$. Màu chủ đạo Neon Cyan.
*   **Bố cục chi tiết trong mỗi Thẻ:**
    *   *Tên gói (Y: 130):* Cỡ chữ `18px`, in hoa, đậm.
    *   *Phí bảo hiểm (Y: 170):* Nổi bật chữ vàng `"Phí: XX xu"`.
    *   *Quyền lợi chính (Y: 220 - 320):* 3 dòng text nhỏ mô tả tỷ lệ chi trả.
    *   *Nút "MUA GÓI BẢO HIỂM" (Y: 410):* Kích thước $160 \times 40\text{px}$.
*   **Nút xác nhận khởi hành:** Nằm dưới đáy màn hình tại $X = 400, Y = 520$, kích thước $260 \times 50\text{px}$ với nhãn `"BẮT ĐẦU DI CHUYỂN"`.

### 2.4. Khung đối thoại và Quyết định (Dialog / VN Choice Overlay)
Lớp overlay xuất hiện dưới đáy Canvas khi có sự kiện nói chuyện với NPC hoặc lựa chọn phương án xử lý tai nạn.
*   **Khung đối thoại chính (Dialog Box):**
    *   Tọa độ: $X = 40, Y = 430$ (Rộng $720\text{px}$, Cao $140\text{px}$). Viền bo tròn nhẹ, độ dày viền $2\text{px}$ màu Cyan, nền đen mờ 85%.
    *   Nhãn tên người nói (Speaker tag): Nằm đè lên viền trên tại $X = 60, Y = 420$. Text `"MẸ CỦA AN"` (`18px`, đậm, Neon Cyan).
    *   Nội dung thoại: Xuất hiện kiểu typewriter từ $X = 70, Y = 455$. Cỡ chữ `16px`, màu trắng.
*   **Khung lựa chọn Quyết định (VN Choices Menu):**
    *   Khi có sự lựa chọn rủi ro, danh sách lựa chọn hiển thị dạng các nút chữ nhật bo góc nằm dọc ngay phía trên khung đối thoại.
    *   Tọa độ: Bắt đầu từ $Y = 230$, mỗi nút cao $45\text{px}$, rộng $500\text{px}$, căn giữa màn hình ($X = 150 \to 650$). Khoảng cách giữa các nút là $12\text{px}$.
    *   Hiệu ứng: Khi rê chuột hoặc chạm tay vào nút, nút sẽ sáng màu vàng ấm, các chỉ số ảnh hưởng ảo (ví dụ: `+15 xu`, `-10 điểm an toàn`) sẽ nhấp nháy hiển thị mờ bên cạnh nút để người chơi cân nhắc.

### 2.5. Màn hình Kết quả và Hóa đơn Claim (ResultScene)
Nơi hiển thị kết quả ngày đi học và tính toán dòng tiền bồi thường bảo hiểm.
*   **Tiêu đề:** $X = 400, Y = 45$, Text: `"KẾT QUẢ HÀNH TRÌNH NGÀY X"` (`28px`, đậm).
*   **Khung Hóa đơn Tài chính (Financial Invoice Card):**
    *   Đặt tại trung tâm: $X = 150, Y = 110$, kích thước $500 \times 360\text{px}$.
    *   Nền mô phỏng hóa đơn giấy pixel art màu kem hoặc xám nhẹ (`#e5e5e5` hoặc `#1f2833`).
    *   *Nội dung chi tiết trên hóa đơn (dòng kẻ chấm chấm):*
        *   Phí y tế phát sinh: `100 xu` (Đỏ)
        *   Phí sửa xe phát sinh: `80 xu` (Đỏ)
        *   Khấu trừ bảo hiểm hỗ trợ: `-140 xu` (Xanh lá)
        *   Thực tế người chơi tự chi trả: `40 xu` (Đỏ đậm, to)
    *   *Quyền lợi bảo hiểm áp dụng:* Hiển thị rõ tên gói bảo hiểm đã cứu cánh tài chính cho người chơi.
*   **Nút chuyển tiếp:** Dưới đáy màn hình.
    *   Nút trái: `"QUAY LẠI MENU"` ($X = 260, Y = 520$).
    *   Nút phải: `"ĐI TIẾP NGÀY MAI"` ($X = 540, Y = 520$).

---

## 3. Quy Định Thiết Kế Giao Diện Cho Thiết Bị Di Động (Mobile Adaptability)

Mặc dù game được phát triển trên khung Canvas cố định $800 \times 600$, Phaser 3 sử dụng cấu hình `Scale.FIT` để tự động kéo giãn vừa khít màn hình điện thoại di động (cả dọc và ngang). Để đảm bảo trải nghiệm chơi bằng ngón tay tốt nhất, UI/UX tuân thủ các quy tắc sau:

### 3.1. Kích thước vùng tương tác bằng tay (Touch Target Size)
*   **Quy tắc ngón tay:** Không có nút tương tác nào có kích thước nhỏ hơn $44 \times 44\text{px}$. Toàn bộ các nút bấm chuyển cảnh chính có kích thước tối thiểu là $180 \times 48\text{px}$ để tránh bấm nhầm.
*   **Vùng đệm (Padding):** Khoảng cách tối thiểu giữa 2 nút bấm tương tác là $15\text{px}$.

### 3.2. Sơ đồ điều khiển trên màn hình cảm ứng (Mobile Controls Overlay)
Khi phát hiện thiết bị di động (qua kiểm tra hệ thống `this.sys.game.device.os.desktop === false`), game tự động hiển thị các nút điều khiển ảo trực quan ở góc dưới màn hình:

```
+---------------------------------------------------------+
| [Máu/Coin]                                 [Điểm an toàn] |
|                                                         |
|                     [MÀN HÌNH GAME]                     |
|                                                         |
|  +--------------+                     +--------------+  |
|  |   NÚT TRÁI   |                     |   NÚT PHẢI   |  |
|  |  (X:20-170)  |                     | (X:630-780)  |  |
|  | (Y:420-560)  |                     | (Y:420-560)  |  |
|  +--------------+                     +--------------+  |
+---------------------------------------------------------+
```

*   **Nút di chuyển sang Trái (Left Touch Zone):** Đặt tại góc dưới bên trái. Tọa độ $X = 95, Y = 490$. Kích thước $150 \times 140\text{px}$. Vẽ bằng một hình tròn bán trong suốt màu xám nhạt (`alpha: 0.4`), chứa icon mũi tên hướng sang trái màu trắng.
*   **Nút di chuyển sang Phải (Right Touch Zone):** Đặt tại góc dưới bên phải. Tọa độ $X = 705, Y = 490$. Kích thước $150 \times 140\text{px}$. Vẽ bằng hình tròn bán trong suốt chứa mũi tên hướng sang phải.
*   **Nhấn giữ để di chuyển:** Cơ chế điều khiển hỗ trợ vuốt/nhấn giữ trên 2 vùng cảm ứng này để xe di chuyển liên tục, giúp trải nghiệm lái xe mượt mà như dùng phím điều hướng trên máy tính.

Tài liệu đặc tả này đóng vai trò làm khung tham chiếu cứng cho toàn bộ công việc lập trình UI/UX trong game, đảm bảo tỷ lệ cân đối giữa các phân cảnh và khả năng thao tác dễ dàng trên mọi thiết bị.
