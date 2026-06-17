# QUY CHUẨN BẢNG MÀU THIẾT KẾ (COLOR PALETTE SPECS)
## Dự án: Game giáo dục bảo hiểm “Đường Đến Trường”

Tài liệu này định nghĩa bảng màu chuẩn (Hex và HSL) cho toàn bộ tài nguyên đồ họa của game, bao gồm bối cảnh đường phố, phương tiện giao thông, giao diện HUD, các ký hiệu neon cảnh báo rủi ro và quy định quy tắc tương phản.

---

## 1. Bảng màu Hệ thống & Giao diện (Core UI Palette)

Bảng màu giao diện cần thể hiện tính chuyên nghiệp của sản phẩm InsurTech, đồng thời đảm bảo cảm giác năng động, trẻ trung của Gen Z.

| Tên Màu (Color Name) | Mã Hex (Hex Code) | Giá trị HSL (HSL Value) | Vai trò trong Game (Usage / Role) |
| :--- | :---: | :---: | :--- |
| **Deep Navy** | `#1E3D59` | $\text{HSL}(209, 50\%, 23\%)$ | Màu nền chính của UI, hộp thoại, bảng tin cậy của bảo hiểm GAIP Care. |
| **Safety Orange** | `#FF6E40` | $\text{HSL}(14, 100\%, 63\%)$ | Màu mũ bảo hiểm của An, các nút hành động khẩn cấp, nút nộp claim. |
| **GAIP Green** | `#2ECC71` | $\text{HSL}(145, 58\%, 49\%)$ | Màu chỉ số an toàn tăng, nút đồng ý mua bảo hiểm, thanh máu hồi phục. |
| **Alert Red** | `#E74C3C` | $\text{HSL}(6, 78\%, 57\%)$ | Màu cảnh báo rủi ro cao, thanh máu sụt giảm, chỉ số tiền phạt. |
| **Warm Ivory** | `#F5F0E1` | $\text{HSL}(43, 42\%, 92\%)$ | Màu chữ chính trên hộp thoại tối, màu nền các bảng biểu báo cáo kết quả. |

---

## 2. Bảng màu Đường phố & Bối cảnh (Street & Environmental Palette)

Để tái hiện không khí đường phố Việt Nam, bảng màu môi trường được chia làm hai trạng thái thời tiết rõ rệt.

### 2.1. Trạng thái Ngày Nắng (Sunny Day - Ngày 1, 3, 4, 5)
*   **Dry Asphalt (Mặt đường khô):** `#2A2D34` — $\text{HSL}(221, 11\%, 18\%)$. Màu xám đậm trung tính, tương phản tốt với vạch kẻ đường.
*   **Golden Ochre (Tường cổ kính):** `#E5A93B` — $\text{HSL}(39, 75\%, 57\%)$. Tái hiện tường nhà ống đặc trưng hoặc tường trường học.
*   **Terracotta Tile (Vỉa hè gạch đỏ):** `#C0392B` — $\text{HSL}(6, 63\%, 46\%)$. Màu gạch vỉa hè hoặc mái ngói đỏ Việt Nam.
*   **Sunny Sky (Bầu trời sáng sớm):** `#87CEEB` — $\text{HSL}(197, 71\%, 73\%)$. Màu xanh da trời nhạt dịu mát.

### 2.2. Trạng thái Ngày Mưa (Rainy Day - Ngày 2)
*   **Wet Asphalt (Mặt đường ướt):** `#1F2421` — $\text{HSL}(150, 6\%, 13\%)$. Màu xám đen gần như đen, tăng tính bóng loáng phản chiếu.
*   **Storm Cloud (Bầu trời dông bão):** `#5F6A7A` — $\text{HSL}(215, 13\%, 42\%)$. Màu xám xanh u ám.
*   **Water Splash (Vết ngập / Bong bóng):** `#A5CAD2` — $\text{HSL}(190, 31\%, 74\%)$ (với opacity $40\%$). Màu nước loãng đọng vũng.

---

## 3. Bảng màu Neon & Đèn Tín hiệu (Neon Indicators & Signals)

Các chỉ số trạng thái giao thông và bảng hiệu quảng cáo neon ban ngày/ban đêm sử dụng các tông màu phát quang cực mạnh (Neon/Cyberpunk-ish) để dễ quan sát ở tốc độ di chuyển nhanh:

*   **Traffic Red (Đèn đỏ / Cấm vượt):** `#FF003F` — $\text{HSL}(345, 100\%, 50\%)$.
*   **Traffic Yellow (Đèn vàng / Đi chậm):** `#FFCC00` — $\text{HSL}(48, 100\%, 50\%)$.
*   **Traffic Green (Đèn xanh / Đi tiếp):** `#00FF66` — $\text{HSL}(144, 100\%, 50\%)$.
*   **Juice Neon Blue (Bảng nước mía/tạp hóa):** `#00FFFF` — $\text{HSL}(180, 100\%, 50\%)$.
*   **Bakery Neon Pink (Bảng hiệu bánh mì):** `#FF1493` — $\text{HSL}(328, 100\%, 54\%)$.

---

## 4. Quy tắc Tương phản & Khả năng Tiếp cận (Contrast & Accessibility)

Đảm bảo mọi người chơi (kể cả những người có khiếm khuyết về thị lực như mù màu) đều có thể trải nghiệm game mượt mà và nhận thức rõ các rủi ro.

### 4.1. Tiêu chuẩn Tương phản WCAG 2.1
*   **Văn bản UI thông thường:** Bắt buộc đạt tỷ lệ tương phản tối thiểu **$4.5:1$** so với nền.
*   **Văn bản UI cỡ lớn / Biểu tượng:** Đạt tỷ lệ tối thiểu **$3:1$**.
*   **Kỹ thuật render Text trong Phaser 3:**
    Mọi chữ hiển thị trên canvas di động phải được vẽ kèm nét viền đen (stroke) và bóng đổ (shadow) để không bị chìm vào cảnh nền chuyển động liên tục:
    ```javascript
    this.add.text(x, y, "Nhanh một giây, chậm cả đời!", {
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '20px',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 4,
        shadow: { color: '#000000', fill: true, offsetX: 2, offsetY: 2, blur: 0 }
    });
    ```

### 4.2. Hỗ trợ người chơi Mù màu (Colorblind-Friendly Design)
Không dùng màu sắc đơn độc để biểu thị trạng thái an toàn hay nguy hiểm. Luôn áp dụng thiết kế đa kênh thông tin (màu sắc + hình dáng/ký hiệu):

*   **Trạng thái Nguy hiểm (Đụng độ/Phạt tiền):**
    *   *Màu sắc:* Đỏ `#E74C3C`.
    *   *Ký hiệu đi kèm:* Hình tam giác cảnh báo có dấu chấm than `(!)` màu đen ở giữa, hoặc dải sọc chéo Vàng - Đen.
*   **Trạng thái An toàn (Đã mua bảo hiểm/Đi đúng luật):**
    *   *Màu sắc:* Xanh lá `#2ECC71`.
    *   *Ký hiệu đi kèm:* Hình chiếc khiên bảo vệ có chữ `V` (tick) màu trắng ở giữa.
*   **Bình màu máu / Sức khỏe (Health Bar):**
    *   Thay vì chỉ đổi màu từ xanh sang đỏ, thanh HP phải có biểu tượng Trái tim hoặc Chữ thập đỏ ở đầu thanh và hiển thị số phần trăm cụ thể (`80/100`).
