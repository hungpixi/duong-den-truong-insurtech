# QUYẾT ĐỊNH THIẾT KẾ CUỐI CÙNG (FINAL DESIGN DECISIONS) — DỰ ÁN "ĐƯỜNG ĐẾN TRƯỜNG"

Tài liệu này đóng vai trò quyết định cứng (hard decisions), giải quyết các mâu thuẫn về thiết kế và cung cấp quy chuẩn trực quan chính thức cho các lập trình viên triển khai dự án game "Đường Đến Trường".

---

## 1. HỆ THỐNG PHỐI MÀU SONG SONG (DUAL COLOR SCHEME SYSTEM)

Để giải quyết sự xung đột màu sắc giữa các đề xuất của subagent, chúng ta thống nhất phân chia làm **hai hệ màu bổ trợ** cho hai nền tảng trải nghiệm khác nhau:

### 1.1. Bảng màu Arcade Game (Game UI & Gameplay Canvas)
Áp dụng cho Phaser Canvas ($800 \times 600\text{px}$) nhằm tạo phong cách retro cyberpunk-ish có độ tương phản cao, hỗ trợ tốt trên màn hình điện thoại di động:
*   **Màu nền chính (Background):** `#0b0c10` (Dark Slate Gray) - Đảm bảo chiều sâu không gian.
*   **Khung giao diện (Panel BG):** `#1f2833` (Slate Blue tối) với alpha $0.85$ (Glassmorphism).
*   **Màu nhấn Neon (Primary Cyan):** `#66fcf1` (Neon Cyan) - Cho tiêu đề, nút hover, viền hội thoại.
*   **Màu vàng cảnh báo (Accent Yellow):** `#f5a623` (Warm Amber) - Dành cho tiền xu, điểm số, và popup bài học.
*   **Màu an toàn/bảo vệ (GAIP Green):** `#2ecc71` (Emerald Green) - Biểu tượng lá chắn, claim thành công, thanh HP hồi.
*   **Màu rủi ro/chấn thương (Alert Red):** `#e74c3c` (Alizarin Red) - Viền cảnh báo rủi ro, thanh HP giảm, số trừ tiền.
*   **Màu chữ chính:** `#ffffff` (Trắng) và `#a9a9a9` (Xám nhạt).

### 1.2. Bảng màu Pitching & Dashboard (Parent/Corporate Portal)
Áp dụng cho Slide Pitch Deck (GAIP 2026 Pitching) và Trang web quản trị của phụ huynh:
*   **Nền chính (Background):** `#FAFAFA` (Frost White) - Tạo sự thoáng đãng, chuyên nghiệp.
*   **Nhận diện cốt lõi (Corporate Emerald):** `#10B981` (Safety Emerald) - Biểu thị sự an toàn và giải pháp tài chính số.
*   **Màu bổ trợ (Corporate Charcoal):** `#0F172A` (Slate Charcoal) - Font chữ và đường viền trang trọng.
*   **Màu nhấn chuyển đổi (Warning Amber):** `#F59E0B` (Warning Amber) - Điểm số KPI, chỉ số tài chính.
*   **Màu cảnh báo (Pulse Red):** `#FF4D4D` (Neon Pulse) - Chỉ số tai nạn giao thông (Loss Ratio).

---

## 2. QUY CHUẨN TYPOGRAPHY SONG SONG (TYPOGRAPHY PAIRINGS)

*   **Gameplay Font (`VT323`):** Sử dụng phông pixel 8-bit cho các chỉ số HUD game (Máu, Tiền, Điểm an toàn, Pháo chúc mừng, Ruy băng thắng cuộc).
*   **UI & Dialogue Font (`Courier New` / `Courier` / `monospace`):**
    Sử dụng cho văn bản hộp thoại, danh sách lựa chọn VN Choices, và hóa đơn ResultScene. Phaser 3 phải render kèm stroke đen dày và shadow để tăng khả năng tiếp cận (WCAG 2.1):
    ```javascript
    stroke: '#000000',
    strokeThickness: 4,
    shadow: { color: '#000000', fill: true, offsetX: 2, offsetY: 2, blur: 0 }
    ```
*   **Pitching & Web Font (`Outfit`):** Sử dụng font Sans-serif hình học hiện đại cho toàn bộ Slide Pitch Deck và Dashboard Web.

---

## 3. THÔNG SỐ CANVAS & QUY TẮC PHỐI CẢNH 2.5D (PHASER CANVAS SPECS)

*   **Cấu hình Phaser 3:**
    *   Kích thước: $800 \times 600\text{px}$ (Tỷ lệ 4:3).
    *   Chế độ Scale: `Phaser.Scale.FIT` (Tự động kéo giãn đầy màn hình di động).
    *   Chế độ Pixel Art: `pixelArt: true` (Vô hiệu hóa bộ lọc làm mịn để giữ pixel răng cưa sắc nét).

### 3.1. Các tham số phối cảnh Pseudo-2.5D (Math Rules)
Trục tọa độ sâu $z$ chạy từ $1.0$ (chân trời) về $0.0$ (cận cảnh đáy màn hình).

1.  **Tọa độ Y chân trời:** $Y_{\text{horizon}} = 200\text{px}$.
2.  **Tọa độ Y mép dưới:** $Y_{\text{bottom}} = 560\text{px}$.
3.  **Tọa độ X trung tâm:** $X_{\text{center}} = 400\text{px}$.
4.  **Chiều rộng mặt đường:**
    *   Tại chân trời ($z = 1.0$): $W_{\text{horizon}} = 70\text{px}$.
    *   Tại đáy màn hình ($z = 0.0$): $W_{\text{bottom}} = 500\text{px}$.
    *   Công thức tính độ rộng tại vị trí $z$:
        $$W(z) = 70 + (500 - 70) \times (1.0 - z)$$
5.  **Công thức scale Sprite theo z:**
    *   Tại chân trời: Scale = $0.15$ ($15\%$).
    *   Tại đáy màn hình: Scale = $1.0$ ($100\%$).
    *   Công thức scale:
        $$\text{Scale}(z) = 0.15 + (1.0 - z) \times 0.85$$

---

## 4. QUY QUYẾT UI THÀNH PHẦN (COMPONENT DRAW SPECS)

### 4.1. Khung hộp thoại (Dialogue Panel)
*   Tọa độ: $X = 40, Y = 430$. Rộng $720\text{px}$, Cao $140\text{px}$. Bo góc $8\text{px}$.
*   Màu viền: `#66fcf1` (Neon Cyan). Độ dày viền $2\text{px}$.
*   Màu nền: `#1a1a24` (Slate tối). Alpha $0.90$.
*   Speaker Tag: Góc trái đè viền $X = 60, Y = 420$, nền nhãn `#66fcf1`, chữ đen `#0b0c10` cỡ `16px` (`bold`).
*   Tốc độ typewriter: $30\text{ms/char}$ thường, $80\text{ms/char}$ chậm, $8\text{ms/char}$ khi click tua nhanh.

### 4.2. Khung lựa chọn quyết định (Choices Menu)
*   Bố cục: Nút dọc căn giữa $X = 150$. Rộng $500\text{px}$, Cao $45\text{px}$. Bắt đầu từ $Y = 230$, cách nhau $12\text{px}$.
*   Hiệu ứng:
    *   Mặc định: Nền `#1f2833`, chữ trắng.
    *   Hover/Touch: Nền `#66fcf1`, chữ đen, dịch sang phải X $+8\text{px}$.
    *   Nút rủi ro cao: Rung lắc liên tục trục ngang (biên độ $3\text{px}$, chu kỳ $50\text{ms}$), viền nháy đỏ `#e74c3c` tần số $2\text{Hz}$, hiện tooltip đỏ báo hiệu mất điểm an toàn.

### 4.3. Quy trình Claim 1-Chạm (1-Touch Claim Flow)
*   Rung camera chính: thời lượng $380\text{ms}$, cường độ $0.025$.
*   Nháy màn đỏ: chớp `#e74c3c` trong $100\text{ms}$ (Alpha $0 \to 0.8 \to 0$).
*   Chụp ảnh hiện trường: Khung ngắm chụp ảnh pixel nhấp nháy thu nhỏ, nháy flash trắng $100\text{ms}$, phát tiếng màn trập máy ảnh.
*   Kiểm định AI: Hiện thanh tiến trình `"Đang kiểm định hồ sơ..."` tại vị trí va chạm chạy trong $1$ giây ($0\% \to 100\%$).
*   Duyệt bồi thường: Phóng to biểu tượng dấu tích xanh `checkmark` tại trung tâm (Scale $0 \to 1.2 \to 1.0$), phát âm thanh chime thành công, sinh dòng tiền trôi nổi và bay đồng xu về HUD.

### 4.4. Thanh so sánh chi phí Coverage Bar (Result Scene)
*   Vị trí vẽ: Trung tâm hóa đơn tại $X = 250, Y = 380$.
*   Kích thước: Rộng $300\text{px}$, Cao $24\text{px}$.
*   Thanh so sánh 1 (Không bảo hiểm): Vẽ màu Đỏ `#e74c3c` toàn bộ thanh ($300\text{px}$).
*   Thanh so sánh 2 (Có bảo hiểm): Vẽ phân đoạn 1 màu Xanh lá `#2ecc71` dài $300 \times CoverageRatio$ và phân đoạn 2 màu Đỏ `#e74c3c` cho phần còn lại. Nhãn chữ hiển thị số tiền tương ứng đặt ngay trên thanh.

---

## 5. CÁC ĐIỀU KHOẢN NGOẠI LỆ & ĐẶC BIỆT (EXCEPTIONS)

*   **Vùng điều khiển ảo Mobile Web:** Khi phát hiện thiết bị di động (`desktop === false`), game tự động kích hoạt 2 nút ảo Left/Right Zone ở góc dưới màn hình.
    *   Left Zone: Hình tròn tâm tại $X=95, Y=490$, bán kính $70\text{px}$, màu xám nhạt `#a9a9a9`, alpha $0.4$, vẽ icon mũi tên trái.
    *   Right Zone: Tâm tại $X=705, Y=490$, bán kính $70\text{px}$, alpha $0.4$, vẽ mũi tên phải.
    *   Cơ chế: Nhấn giữ liên tục (Touch-hold) được tính là di chuyển liên tục, giúp lái xe mượt mà bằng ngón cái.
*   **Bình máu HP (Health Bar):** Bắt buộc phải có icon Trái tim đỏ và chỉ số văn bản đè lên (`100/100`). Tránh chỉ sử dụng màu thanh đổi từ xanh sang đỏ để bảo đảm hỗ trợ tối đa người mù màu.
*   **Popup bài học đệm (Forced Delay):** Để chống spam nút bỏ qua, nút xác nhận ở popup bài học bị khóa (màu xám, không bấm được) trong đúng $3$ giây đầu tiên và hiển thị bộ đếm ngược. Nút chỉ đổi sang màu xanh lá và cho phép bấm sau khi hết thời gian chờ.
