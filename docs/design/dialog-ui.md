# ĐẶC TẢ GIAO DIỆN HỘI THOẠI & BÀI HỌC (DIALOGUE & VN CHOICE SPECIFICATION)
## Dự án: Game giáo dục bảo hiểm InsurTech “Đường Đến Trường”

Tài liệu này đặc tả chi tiết tọa độ cấu hình, bố cục trực quan, tốc độ hiển thị văn bản (typewriter), cơ chế cảnh báo quyết định rủi ro và giao diện popup bài học trong môi trường Phaser 3 Canvas ($800 \times 600\text{px}$).

---

## 1. Khung Hội Thoại Chính (Dialogue Panel Box)

Khung hội thoại xuất hiện ở nửa dưới màn hình khi người chơi tương tác với NPC (như Mẹ, Bạn học, Chú cảnh sát) hoặc khi AI Advisor đưa ra lời khuyên.

```
+---------------------------------------------------------+
|                                                         |
|                       [MÀN HÌNH GAME]                   |
|                                                         |
|    +-----------------------------------------------+    |
|    | [MẸ CỦA AN]                                   |    |
|    | "Con nhớ đi xe cẩn thận, trời mưa đường rất   |    |
|    | trơn trượt đấy nhé!"                          |    |
|    +-----------------------------------------------+    |
+---------------------------------------------------------+
```

### 1.1. Thông số Kỹ thuật Vẽ Khung (Phaser Graphics API)
*   **Vùng hiển thị (Dialogue Container):**
    *   Tọa độ góc trên bên trái: $X = 40\text{px}, Y = 430\text{px}$.
    *   Kích thước: Rộng $720\text{px}$, Cao $140\text{px}$.
    *   Bo góc (Radius): $8\text{px}$.
    *   Màu nền (Background Fill): `#1a1a24` (Slate tối cường độ cao).
    *   Độ mờ (Alpha): $0.90$ (Đảm bảo nhìn rõ các thực thể game di chuyển mờ phía dưới).
    *   Đường viền (Border): Dày $3\text{px}$, màu Neon Cyan (`#66fcf1`).
*   **Nhãn Tên Người Nói (Speaker Tag):**
    *   Tọa độ đặt đè lên viền trên khung: $X = 60\text{px}, Y = 415\text{px}$.
    *   Kích thước nhãn: Rộng $160\text{px}$, Cao $30\text{px}$.
    *   Bo góc: $4\text{px}$.
    *   Màu nền nhãn: `#66fcf1` (Neon Cyan nguyên bản).
    *   Nội dung Text: Căn giữa, cỡ chữ `16px` (`bold`), màu chữ đen `#0b0c10`, font `'Courier New'`.

### 1.2. Định Dạng Văn Bản (Text Format)
*   **Vùng văn bản thoại:** Bắt đầu từ $X = 70\text{px}, Y = 460\text{px}$.
*   **Kích thước hộp văn bản tự động xuống dòng (Word Wrap Width):** $660\text{px}$.
*   **Cấu hình Font:**
    *   Font family: `'Courier New'`, `Courier`, `monospace`.
    *   Cỡ chữ: `17px`.
    *   Màu chữ: Trắng (`#ffffff`).
    *   Khoảng cách dòng (Line Spacing): `8px`.
*   **Nút bỏ qua hội thoại (Skip/Next Prompt Indicator):**
    *   Đặt tại góc dưới bên phải khung hội thoại: $X = 735\text{px}, Y = 545\text{px}$.
    *   Hình dáng: Mũi tên tam giác hướng xuống màu Neon Cyan (`#66fcf1`), nhấp nháy liên tục (Tween Alpha từ $0.3 \to 1.0$, chu kỳ $600\text{ms}$).

---

## 2. Cơ Chế Đánh Chữ & Tốc Độ Hiển Thị (Typewriter Mechanism)

Để tăng tính trải nghiệm kể chuyện (Visual Novel) và kiểm soát nhịp độ, chữ trong khung hội thoại được dựng từng ký tự theo thời gian.

### 2.1. Cấu hình Tốc độ gõ chữ (Typewriter Speeds)
*   **Tốc độ Thường (Normal Mode):** $30\text{ms}$ mỗi ký tự. Áp dụng cho các hội thoại cốt truyện thông thường.
*   **Tốc độ Chậm (Hesitant/Suspense Mode):** $80\text{ms}$ mỗi ký tự. Áp dụng khi nhân vật ngập ngừng, suy nghĩ hoặc có sự cố nguy hiểm vừa xảy ra.
*   **Tốc độ Nhanh (Fast Mode):** $8\text{ms}$ mỗi ký tự. Kích hoạt khi người chơi click chuột hoặc chạm tay vào màn hình để tua nhanh văn bản đang chạy.
*   **Bỏ qua (Instant Complete):** Click/Chạm lần thứ hai khi chữ đang chạy sẽ hiển thị toàn bộ nội dung văn bản ngay lập tức.

### 2.2. Hiệu ứng Âm thanh gõ chữ (Typing SFX Feedback)
*   Mỗi khi có một ký tự mới xuất hiện trên màn hình, game sẽ phát một âm thanh click nhẹ để tạo phản hồi xúc giác.
*   **Thông số SFX:** Tần số dao động cao từ $750\text{Hz} \to 850\text{Hz}$ (Randomized nhẹ để tránh nhàm chán), thời lượng âm thanh $12\text{ms}$ siêu ngắn, âm lượng nhỏ bằng 15% âm lượng chính để không gây chói tai.

---

## 3. Khung Lựa Chọn Quyết Định (Visual Novel Choices Menu)

Khi người chơi đối mặt với tình huống giao thông hoặc tài chính trên đường đi học, danh sách lựa chọn sẽ xuất hiện đè lên trung tâm màn hình.

```
                  +-----------------------------------+
                  |      CHỌN PHƯƠNG ÁN XỬ LÝ         |
                  +-----------------------------------+
                  |  [ ] 1. Đi chậm qua vũng nước     | (An toàn - Mất thời gian)
                  |  [*] 2. Vượt nhanh qua vũng nước  | (Rủi ro cao - Nhấp nháy đỏ)
                  +-----------------------------------+
```

### 3.1. Bố Cục và Tọa Độ Menu Quyết Định
*   **Vị trí container lựa chọn:** Căn giữa màn hình ($X = 400\text{px}$).
*   **Tọa độ nút bấm:**
    *   Bắt đầu từ $Y = 180\text{px}$ (nếu có 3 lựa chọn) hoặc $Y = 220\text{px}$ (nếu có 2 lựa chọn).
    *   Khoảng cách giữa các nút (Vertical Gap): $16\text{px}$.
*   **Kích thước mỗi nút lựa chọn:** Rộng $520\text{px}$, Cao $50\text{px}$.
*   **Thiết kế hình ảnh nút bấm:**
    *   Nền nút mặc định: Xanh Slate tối `#1f2833`, Alpha $0.95$. Viền xám `#7f8c8d` dày $2\text{px}$.
    *   Chữ hiển thị: Căn giữa nút, cỡ chữ `16px`, màu trắng `#ffffff`, font Monospace.

### 3.2. Hiệu ứng Hover & Lựa Chọn
*   Khi con trỏ chuột di chuột vào nút (Hover) hoặc chạm giữ:
    *   Nền nút chuyển màu mượt mà sang Neon Cyan `#66fcf1` (hoặc Vàng ấm `#f5a623` cho tùy chọn có phí).
    *   Chữ chuyển sang màu đen `#0b0c10` để đạt độ tương phản tối đa.
    *   Nút hơi dịch sang phải $8\text{px}$ (Tween dịch chuyển X từ $X_{base} \to X_{base} + 8$ trong $100\text{ms}$ để phản hồi rõ ràng).
    *   Phát âm thanh hover bíp ngắn cường độ trung bình.

---

## 4. Cảnh Báo Quyết Định Rủi Ro Cao (Risky Action Visual Warnings)

Nhằm mục đích giáo dục nhận thức về rủi ro tai nạn hoặc mất mát tài chính trước khi người chơi bấm nút, game triển khai hệ thống cảnh báo trực quan cực mạnh cho các lựa chọn mang tính nguy hiểm cao (ví dụ: *Không đội mũ bảo hiểm để đỡ hỏng tóc*, *Vượt đèn đỏ để kịp giờ học*).

```
         +-------------------------------------------------------+
         | [!] 2. Vượt đèn vàng để kịp giờ học     <- [RUNG LẮC] |
         |     ! Cảnh báo: Nguy cơ va chạm cực cao (+80% Rủi ro) |
         +-------------------------------------------------------+
```

### 4.1. Hiệu ứng Cảnh Báo Trên Nút Rủi Ro
*   **Nháy viền cảnh báo:** Đường viền nút bấm nhấp nháy màu Đỏ tiêu cực (`#e74c3c`) với tần số $2\text{Hz}$ (chu kỳ thay đổi Alpha từ $0.2 \to 1.0$ trong $250\text{ms}$).
*   **Icon Nguy Hiểm:** Xuất hiện biểu tượng tam giác cảnh báo màu vàng đen (`warning_icon`) nhấp nháy bên trái nội dung văn bản (tại tọa độ cục bộ $X_{button} + 15\text{px}$).
*   **Hiệu ứng Rung Nút (Shake Tween):** Khi người chơi rê chuột vào nút rủi ro này, nút sẽ rung nhẹ liên tục theo trục ngang (Biên độ rung $3\text{px}$, tần số $50\text{ms}$, lặp lại liên tục cho đến khi bỏ hover). Hiệu ứng này tạo cảm giác không an toàn về mặt vật lý, kích thích tâm lý ngần ngại của người chơi.
*   **Chỉ số Rủi ro Nổi (Tooltip Rủi ro):**
    *   Khi hover vào nút rủi ro, một nhãn chú thích nhỏ màu Đỏ `#e74c3c` hiện ngay phía dưới nút ($Y_{button} + 52\text{px}$).
    *   Text hiển thị: `"-30 Điểm An Toàn | Nguy cơ chấn thương: Cao"` (`13px`, in đậm, nhấp nháy).

---

## 5. Popup Bài Học Giáo Dục Bảo Hiểm (Popup Lesson System)

Khi người chơi hoàn thành ngày đi học hoặc gặp sự cố và được bảo hiểm chi trả, game sẽ tạm dừng để hiển thị một bảng thông tin giáo dục (Popup Lesson) giải thích về luật giao thông hoặc cơ chế vận hành của bảo hiểm thực tế.

```
+-------------------------------------------------------------------+
|                        BÀI HỌC AN TOÀN                            |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                       [HÌNH MINH HỌA]                     |   |
|   |                Bánh xe bị trượt trên vũng nước            |   |
|   +-----------------------------------------------------------+   |
|                                                                   |
|   "Hiện tượng trượt nước (Hydroplaning) xảy ra khi lốp xe mất     |
|   ma sát hoàn toàn với mặt đường do lớp nước ngăn cách..."        |
|                                                                   |
|                   [ ĐÃ HIỂU & KHỞI HÀNH: 5S ]                     |
+-------------------------------------------------------------------+
```

### 5.1. Bố Cục Chi Tiết Popup Lesson Card
*   **Khung chính (Popup Card):**
    *   Tọa độ trung tâm Canvas: $X = 100\text{px}, Y = 60\text{px}$.
    *   Kích thước: Rộng $600\text{px}$, Cao $480\text{px}$.
    *   Nền: Màu đen sẫm `#0b0c10` với độ mờ viền ngoài lớn (Overlay che phủ toàn bộ phần còn lại của game bằng một màu đen mờ `alpha: 0.6`).
    *   Đường viền popup: Dày $4\text{px}$ màu Vàng ấm `#f5a623` tạo sự chú ý tối đa của người chơi.
*   **Tiêu đề bài học (Header):**
    *   Tọa độ: $X = 400\text{px}$ (Căn giữa), $Y = 100\text{px}$.
    *   Text: `"BÀI HỌC AN TOÀN ĐƯỜNG BỘ"` (hoặc `"BẢO HIỂM GIÚP BẠN THẾ NÀO?"`) - Cỡ chữ `24px` (`bold`), màu Vàng `#f5a623`.
*   **Khung chứa Hình ảnh Minh họa (Illustration Container):**
    *   Tọa độ: $X = 140\text{px}, Y = 135\text{px}$.
    *   Kích thước: Rộng $520\text{px}$, Cao $170\text{px}$.
    *   Nền: Màu Slate nhạt `#2c3e50`.
    *   Hiển thị: Một bức tranh pixel art minh họa sự cố vừa xảy ra (ví dụ: tư thế ngồi xe an toàn, hoặc cách hoạt động của quỹ bảo hiểm). Viền khung dày $2\text{px}$ màu trắng.
*   **Nội dung bài học (Lesson Body Text):**
    *   Tọa độ: Bắt đầu từ $X = 140\text{px}, Y = 325\text{px}$.
    *   Kích thước vùng văn bản tự động xuống dòng: $520\text{px}$.
    *   Cấu hình: Font `'Courier New'`, cỡ chữ `15px`, màu trắng sữa `#ecf0f1`, khoảng cách dòng `6px`.
    *   Nội dung: Phân tích ngắn gọn hành vi sai/đúng và giá trị của bảo hiểm (Ví dụ: *"Tham gia bảo hiểm bắt buộc trách nhiệm dân sự giúp bạn tự tin chi trả thiệt hại cho bên thứ ba khi xảy ra va quệt ngoài ý muốn."*).
*   **Nút Xác Nhận Đóng (Confirm Button):**
    *   Tọa độ: $X = 270\text{px}, Y = 475\text{px}$.
    *   Kích thước nút: Rộng $260\text{px}$, Cao $45\text{px}$.
    *   Nền nút: Xanh lá cây tích cực `#2ecc71`.
    *   Chữ trên nút: `"ĐÃ HIỂU & TIẾP TỤC HÀNH TRÌNH"` (`15px`, in đậm, chữ đen `#0b0c10`).
    *   **Bộ đếm ngược cưỡng chế (Forced Delay):** Để đảm bảo người chơi thực sự đọc nội dung giáo dục thay vì bấm bỏ qua quá nhanh, nút Xác nhận sẽ bị vô hiệu hóa (Disabled - màu xám) trong $3$ giây đầu tiên, hiển thị bộ đếm ngược: `"(Chờ 3s...)"`. Sau đó nút mới sáng lên xanh lá cây để bấm.

### 5.2. Hiệu ứng xuất hiện Popup (Entrance Animation)
*   Khi popup xuất hiện, game sử dụng hiệu ứng **Scale Bounce** để tạo độ nảy sinh động:
    *   Trạng thái ban đầu: `scaleX: 0.2`, `scaleY: 0.2`, `alpha: 0`.
    *   Tween đến trạng thái: `scaleX: 1.0`, `scaleY: 1.0`, `alpha: 1.0`.
    *   Thời lượng: $350\text{ms}$.
    *   Kiểu Ease: `Back.easeOut` (lực nảy biên độ nhẹ $1.2$).
    *   Phát âm thanh xoẹt mở thẻ giấy nhẹ nhàng.

Đặc tả này cung cấp chi tiết từng tọa độ, màu sắc, tốc độ và hiệu ứng động cho toàn bộ hệ thống giao diện hội thoại, quyết định rủi ro và các bài học trong game, sẵn sàng để đội ngũ phát triển tích hợp trực tiếp vào code Phaser 3.
