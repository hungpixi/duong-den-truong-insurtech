# ĐỊNH HƯỚNG THỊ GIÁC SLIDE PITCH DECK (PITCH VISUAL DIRECTION)
*Tài liệu Hướng dẫn Thiết kế Slide Thuyết trình tại Chung kết GAIP 2026*

---

## 1. QUY CHUẨN THIẾT KẾ SLIDE & HỆ THỐNG LƯỚI (SLIDE FORMATTING & LAYOUT GRIDS)

Slide thuyết trình là công cụ truyền tải thông điệp quan trọng nhất khi đứng trước hội đồng giám khảo quốc tế GAIP 2026. Thiết kế cần đảm bảo sự tối giản, tập trung và cấu trúc rõ ràng.

### Quy chuẩn cơ bản
*   **Tỉ lệ khung hình (Aspect Ratio):** `16:9` (Độ phân giải tiêu chuẩn `1920x1080`).
*   **Hệ thống màu:** Tuân thủ chặt chẽ bảng màu thương hiệu (60% Frost White `#FAFAFA`, 30% Slate Charcoal `#0F172A`, 10% Accent/Safety Emerald `#10B981` & Warning Amber `#F59E0B`).

### Hệ thống lưới bố cục (Layout Grids)
Chúng ta áp dụng 3 loại lưới chính tùy thuộc vào mục tiêu truyền tải của từng slide:

```
LƯỚI 12 CỘT (Nội dung hỗn hợp)
[||||||||||||] -> Phân chia tỷ lệ linh hoạt (Ví dụ: 8 cột nội dung | 4 cột hình ảnh).

LƯỚI 3 CỘT (Trình bày 3 trụ cột / Giải pháp)
[  Cột 1 (33%)  ] [  Cột 2 (33%)  ] [  Cột 3 (33%)  ]

LƯỚI SPLIT 50/50 (So sánh Trước/Sau hoặc Game/Insurance)
[    Bên trái (50% diện tích)    ]|[   Bên phải (50% diện tích)   ]
```

*   **Lưới 12 cột (12-column grid):** Dành cho các slide giới thiệu vấn đề, giải pháp tổng quan hoặc vận hành. Khoảng cách lề (Padding) tối thiểu là `80px` ở cả 4 cạnh để tạo khoảng thở (White space).
*   **Lưới 3 cột (3-column layout):** Dành riêng cho việc trình bày 3 tính năng cốt lõi hoặc 3 chỉ số tài chính chủ chốt.
*   **Lưới Split 50/50 (So sánh):** Chia dọc slide thành hai phần bằng nhau. Cực kỳ hiệu quả cho slide so sánh mô hình truyền thống (bên trái - nền tối/xám) và mô hình Đường Đến Trường (bên phải - nền sáng/xanh lá).

---

## 2. KÍCH THƯỚC TYPOGRAPHY TRÊN SLIDE (TYPOGRAPHY SIZES)

Sử dụng phông chữ **Outfit** cho toàn bộ slide thuyết trình để tạo cảm giác chuyên nghiệp, hiện đại của một dự án công nghệ tài chính (InsurTech).

| Loại văn bản | Cỡ chữ đề xuất | Độ dày (Font Weight) | Quy chuẩn sử dụng |
| :--- | :--- | :--- | :--- |
| **Slide Title** | `44px` - `48px` | `800` (Extra-Bold) | Tiêu đề chính của mỗi slide. Viết hoa chữ cái đầu, tối đa 1 dòng. |
| **Sub-title / Section** | `28px` - `32px` | `600` (Semi-Bold) | Tiêu đề phụ hoặc phân mục nhỏ trong slide. |
| **Body Text** | `16px` - `18px` | `300` hoặc `400` | Nội dung mô tả chi tiết. Dãn dòng (Line height) đặt ở mức `1.5` để dễ đọc. |
| **Metrics / Big Numbers**| `72px` - `96px` | `800` (Extra-Bold) | Các số liệu thống kê hoặc chỉ số tài chính đột phá cần nhấn mạnh. |
| **Captions / Source** | `12px` | `300` (Light) | Chú thích nguồn dữ liệu hoặc các ghi chú kỹ thuật ở góc dưới slide. |

---

## 3. THỂ HIỆN SỐ LIỆU ĐỘT PHÁ (INSURTECH & GAMIFICATION METRICS)

Giám khảo ngành bảo hiểm thường hoài nghi về tính hiệu quả của các dự án "Gamification". Họ cần những con số tài chính và hành vi cụ thể, chứ không phải các tính năng game giải trí.

### Cách trực quan hóa chỉ số Gamification (Game Metrics)
Tránh dùng bảng số liệu phức tạp. Hãy thể hiện theo phễu chuyển đổi hoặc biểu đồ xu hướng:
1.  **DAU/MAU & Engagement:** Sử dụng biểu đồ đường (Trend line) màu Safety Emerald `#10B981` thể hiện sự tăng trưởng ổn định của người dùng hoạt động hàng ngày.
2.  **Retention Rate (Tỷ lệ giữ chân người chơi):** Trình bày dưới dạng biểu đồ cột (Bar chart) so sánh tỷ lệ giữ chân của "Đường Đến Trường" với trung bình ngành game giáo dục (thường tăng từ `15%` lên `45%` nhờ cơ chế thưởng bảo hiểm thực tế).

### Cách trực quan hóa chỉ số bảo hiểm (InsurTech Metrics)
Đây là phần ban giám khảo GAIP 2026 sẽ tập trung chất vấn nhiều nhất:

```
[Hành vi Giao thông An toàn] --(Data API)--> [Giảm Tần suất Tai nạn] 
                                                    |
                                                    v
[Giảm Chi phí Bồi thường (Loss Ratio)] <--(Tối ưu)--> [Giảm Trục lợi Bảo hiểm (Fraud)]
```

*   **Tỷ lệ bồi thường (Loss Ratio Reduction):**
    *   *Cách vẽ:* Sử dụng biểu đồ so sánh hai cột chồng. Cột trước khi áp dụng game (Loss Ratio ở mức báo động `65%` - dùng màu đỏ `#FF4D4D`) và cột dự kiến sau khi áp dụng game nhờ rèn luyện ý thức lái xe (Loss Ratio giảm còn `42%` - dùng màu xanh `#10B981`).
*   **Tỷ lệ trục lợi bảo hiểm (Claim Fraud Reduction):**
    *   *Cách vẽ:* Biểu đồ tròn hoặc biểu đồ bánh donut đơn giản thể hiện phần trăm các ca bồi thường được xác thực tự động thông qua dữ liệu hộp đen/GPS hành trình ghi nhận từ game (Giảm `30%` thời gian và chi phí xác minh thủ công).

---

## 4. BẢN PHÁC THẢO MOCKUP (THUMBNAIL MOCKUPS)

Mỗi slide thuyết trình giải pháp công nghệ cần có các mockup giao diện để chứng minh sản phẩm đã được hiện thực hóa, tránh cảm giác "dự án trên giấy".

### Mockup 1: Giao diện Trải nghiệm Game (Học sinh)
*   **Bố cục đặt trên slide:** Đặt ở bên trái slide theo lưới Split. Mockup nằm trong khung một chiếc điện thoại xoay ngang (Landscape Mobile Mockup).
*   **Nội dung mockup:**
    *   Đồ họa Pixel Art 8-bit sống động của nhân vật đang điều khiển xe máy điện trên đường phố Việt Nam.
    *   Thanh HUD trên cùng hiển thị điểm số an toàn (Safety Score), số xu vàng (Coins) tích lũy để đổi quà.
    *   Góc màn hình có nút "SOS/Cứu hộ khẩn cấp" tích hợp gói bảo hiểm học sinh.

### Mockup 2: Dashboard Quản lý & Mua Bảo Hiểm (Phụ huynh)
*   **Bố cục đặt trên slide:** Đặt ở bên phải slide. Mockup nằm trong khung điện thoại đứng (Portrait Mobile Mockup).
*   **Nội dung mockup:**
    *   Giao diện hiện đại, tối giản sử dụng font Outfit.
    *   Biểu đồ radar đánh giá 5 tiêu chí lái xe an toàn của con (Tốc độ, Đi đúng làn, Đội mũ bảo hiểm, Phản xạ, Không vượt đèn đỏ).
    *   Nút bấm CTA lớn: **"Gia hạn Bảo hiểm Chủ động - Nhận chiết khấu 15% (Từ điểm lái xe an toàn)"** màu Warning Amber `#F59E0B`.

---

## 5. MẸO THỊ GIÁC CHINH PHỤC GIÁM KHẢO BẢO HIỂM (VISUAL TRICKS FOR INSURANCE JUDGES)

Ban giám khảo cuộc thi bảo hiểm GAIP thường là các chuyên gia quản trị rủi ro và định phí (Actuary). Họ bị thu hút bởi sự kiểm soát rủi ro và hiệu quả tài chính.

### Mẹo 1: Kỹ thuật "Điểm Nhấn Tương Phản Đỏ - Xanh" (Risk vs Protection Contrast)
*   Khi trình bày về thực trạng tai nạn giao thông học đường (Problem), sử dụng nền tối màu Slate Charcoal `#0F172A` với các con số thống kê thiệt hại khổng lồ màu đỏ neon `#FF4D4D` nhằm tạo ra sự cảnh báo mạnh mẽ về mặt thị giác.
*   Ngay slide tiếp theo (Solution), chuyển sang nền trắng Frost White `#FAFAFA` và hiển thị giải pháp Đường Đến Trường với màu Safety Emerald `#10B981` dịu mắt, mang lại cảm giác giải tỏa và an tâm.

### Mẹo 2: Trực quan hóa cơ chế "Play-to-Insure" bằng sơ đồ dòng chảy (Flowchart)
Thay vì viết các bước dạng bullet point nhàm chán, hãy dùng sơ đồ ngang tuyến tính:
1.  **Học sinh chơi game & đi xe an toàn** *(Biểu tượng tay lái + GPS)*
2.  `--->` **Hệ thống chấm điểm rủi ro** *(Biểu tượng bộ lọc thuật toán)*
3.  `--->` **Hãng bảo hiểm giảm phí đóng bảo hiểm năm tới** *(Biểu tượng đồng tiền và chiếc khiên màu xanh)*

### Mẹo 3: Cam kết "Bảo chứng dữ liệu" (Data Proof Badges)
Ở góc dưới của các slide trình bày số liệu, luôn đặt một "Badge" (Huy hiệu nhỏ) có nội dung: **"Data verified by Telematics API & Blockchain"** hoặc **"Simulation based on GAIP 2025 Risk Model"** nhằm tăng độ tin cậy khoa học cho bài thuyết trình.

---

*Tài liệu này là cẩm nang thiết kế bắt buộc cho đội ngũ thiết kế slide và diễn giả thuyết trình.*
