# CẨM NANG THƯƠNG HIỆU: ĐƯỜNG ĐẾN TRƯỜNG (BRAND GUIDE)
*Tài liệu Định hướng Nhận diện Thương hiệu cho Dự án Gamification InsurTech - GAIP 2026*

---

## 1. ĐỊNH VỊ THƯƠNG HIỆU & GIÁ TRỊ CỐT LÕI

Dự án **"Đường Đến Trường"** không chỉ đơn thuần là một trò chơi giáo dục, mà là một nền tảng **InsurTech Gamification** tiên phong tại Việt Nam, kết nối hành vi giao thông thực tế của học sinh với các giải pháp bảo hiểm học đường chủ động.

*   **Tầm nhìn:** Trở thành giải pháp công nghệ dẫn đầu trong việc giảm thiểu rủi ro giao thông học đường thông qua dữ liệu hành vi.
*   **Tinh thần thương hiệu (Brand Personality):**
    *   **Thân thiện & Gần gũi (Playful & Accessible):** Kết nối thế hệ học sinh thông qua đồ họa Pixel Art cổ điển.
    *   **Tin cậy & An toàn (Secure & Trusted):** Minh bạch về dữ liệu, bảo vệ toàn diện với chuẩn mực của ngành bảo hiểm.
    *   **Tiên phong & Sáng tạo (Innovative & Tech-forward):** Ứng dụng mô hình "Play-to-Insure" (Chơi để bảo vệ).

---

## 2. HỆ THỐNG PHỐI MÀU (COLOR PALETTE)

Bảng màu được thiết kế để cân bằng giữa hai yếu tố: **Tính an toàn/bảo hiểm (InsurTech)** và **Sự năng động/giao thông học đường (Gamification)**.

| Vai trò | Tên màu | Mã Hex | Ý nghĩa & Quy chuẩn sử dụng |
| :--- | :--- | :--- | :--- |
| **Primary (Chủ đạo)** | Safety Emerald | `#10B981` | Đại diện cho sự an toàn, bảo vệ và tăng trưởng. Đây là màu thương hiệu của bảo hiểm học đường thế hệ mới. Sử dụng cho các yếu tố nhận diện chính, nút bấm quan trọng. |
| **Secondary (Phụ)** | Warning Amber | `#F59E0B` | Lấy cảm hứng từ biển báo giao thông và ánh đèn tín hiệu. Mang tính cảnh báo tích cực, kích thích sự chú ý. Sử dụng cho các điểm số, cảnh báo nhẹ, và UI bổ trợ. |
| **Accent (Nhấn mạnh)** | Neon Pulse | `#FF4D4D` | Màu cam đỏ neon nổi bật. Dùng riêng cho các nút hành động khẩn cấp (SOS, Mua Bảo Hiểm Ngay, Claim Bảo Hiểm) hoặc các cột mốc rủi ro cao. |
| **Dark/Text** | Slate Charcoal | `#0F172A` | Màu xanh đen than (Slate 900) thay thế cho màu đen thuần túy. Đảm bảo độ tương phản cao (WCAG AA 4.5:1) và mang lại cảm giác công nghệ hiện đại. |
| **Muted Text** | Slate Muted | `#475569` | Màu xám xanh (Slate 600) dùng cho phụ đề, văn bản mô tả chi tiết và các chú thích nhỏ. |
| **Background** | Frost White | `#FAFAFA` | Màu trắng sữa dịu mắt làm nền chính cho Slide Pitching và giao diện quản lý dashboard của phụ huynh. |

> [!IMPORTANT]
> **Quy tắc phối màu 60-30-10:**
> *   **60%** Không gian trống/Nền: Frost White `#FAFAFA` (đảm bảo slide thoáng đãng, chuyên nghiệp).
> *   **30%** Nhận diện cấu trúc: Slate Charcoal `#0F172A` kết hợp cùng Safety Emerald `#10B981`.
> *   **10%** Điểm nhấn chuyển đổi: Warning Amber `#F59E0B` và Neon Pulse `#FF4D4D` cho các chỉ số tài chính/chuyển đổi quan trọng.

---

## 3. HỆ THỐNG PHÔNG CHỮ (TYPOGRAPHY)

Sự kết hợp giữa **VT323** (Retro Pixel) và **Outfit** (Geometric Sans-serif) tạo nên sự giao thoa hoàn hảo giữa thế giới Game (cho học sinh) và thế giới Tài chính/Bảo hiểm (cho giám khảo & phụ huynh).

```
+-------------------------------------------------------------+
|   [VT323]   --> Dành cho HUD Game, Điểm số, Gamification UI |
|   [Outfit]  --> Dành cho Tiêu đề Slide, Văn bản, Metrics    |
+-------------------------------------------------------------+
```

### Phông chữ Tiêu đề Game & Chỉ số Gamification: `VT323`
*   **Nguồn:** Google Fonts ([Liên kết](https://fonts.google.com/specimen/VT323))
*   **Đặc tính:** Font chữ Pixel Art mô phỏng hệ máy game thùng 8-bit.
*   **Ứng dụng:**
    *   Tên các màn chơi trong game.
    *   Chỉ số điểm số (Score), số xu vàng (Coins), và cấp độ (Level) trên giao diện HUD.
    *   Các đoạn hội thoại ngắn của nhân vật.
*   **CSS Import:**
    ```css
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
    ```

### Phông chữ Thương hiệu & Tài liệu Pitching: `Outfit`
*   **Nguồn:** Google Fonts ([Liên kết](https://fonts.google.com/specimen/Outfit))
*   **Đặc tính:** Font Sans-serif hình học hiện đại, có bo góc nhẹ tinh tế, độ đọc tốt ở mọi kích thước từ màn hình di động đến màn chiếu slide pitching.
*   **Ứng dụng:**
    *   Tiêu đề slide thuyết trình (GAIP 2026 Pitch Deck).
    *   Nội dung văn bản, bảng biểu, báo cáo phân tích.
    *   Giao diện ứng dụng dashboard dành cho phụ huynh và hãng bảo hiểm.
*   **CSS Import:**
    ```css
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
    ```

---

## 4. BẢN THIẾT KẾ LOGO (LOGO BLUEPRINTS)
*Khái niệm: Motorbike & Shield Concept (Xe Máy và Chiếc Khiên)*

Ý tưởng logo là sự lồng ghép giữa **Xe máy** (đại diện cho phương tiện giao thông phổ biến của học sinh Việt Nam trên đường đến trường) và **Chiếc khiên bảo vệ** (đại diện cho sự an toàn và giải pháp bảo hiểm của InsurTech).

```
       _______________
      /   _________   \       <-- Khung chiếc khiên bảo vệ (Shield)
     /   /    ^    \   \
    /   /   / | \   \   \     <-- Tay lái xe máy cách điệu cánh chim (Motorbike)
   |   |   |  o  |   |   |    
   |   |    \___/    |   |    <-- Đèn pha / Vạch kẻ đường an toàn (Zebra Crossing)
    \   \           /   /
     \   \         /   /
      \   \_______/   /
       \_____________/
```

### Cấu trúc Grid & Hình khối (Geometry Blueprint)
1.  **Khung ngoài (The Shield):**
    *   Hình dáng chiếc khiên 5 cạnh đối xứng biểu thị sự che chở toàn diện.
    *   Đường viền ngoài có độ dày cố định bằng `1/12` chiều rộng logo.
2.  **Trọng tâm bên trong (The Motorbike & Path):**
    *   **Tay lái cách điệu:** Hình chữ V ngược kéo dài sang hai bên, mô phỏng tay lái xe máy và cánh chim đang bay hướng lên trên (biểu trưng cho tương lai học đường).
    *   **Đèn pha:** Hình tròn đồng tâm ở chính giữa, cũng là điểm sáng dẫn đường.
    *   **Vạch kẻ đường (Zebra Crossing):** 3 vạch kẻ song song đi xuống từ tâm đèn pha, vừa tượng trưng cho vạch sang đường an toàn cho học sinh, vừa tạo chiều sâu 3D cho logo.

### Các phiên bản sử dụng
*   **Phiên bản Flat Vector (Dùng cho Slide Pitching & Văn bản pháp lý):** Màu sắc chuyển tiếp mượt mà (Gradient) từ Safety Emerald `#10B981` sang một tông xanh đậm hơn để tạo sự sang trọng, chuyên nghiệp.
*   **Phiên bản Pixel Art (Dùng cho Game UI):** Logo được vẽ lại trên lưới 32x32 pixel với độ tương phản cao, mang đậm phong cách arcade 8-bit.

---

## 5. KHẨU HIỆU & ĐỊNH NGHĨA SLOGAN (SLOGAN DEFINITIONS)

Hệ thống Slogan được thiết kế song ngữ để phục vụ cả thị trường nội địa (học sinh/phụ huynh Việt Nam) lẫn hội đồng giám khảo quốc tế tại cuộc thi GAIP 2026.

### Slogan Tiếng Việt: "Vững Tay Lái, Trọn Tương Lai"
*   **Giải nghĩa:**
    *   **"Vững Tay Lái":** Hành động thực tế của học sinh. Game rèn luyện phản xạ, giáo dục luật lệ giao thông để mỗi học sinh tự làm chủ hành trình di chuyển an toàn của mình.
    *   **"Trọn Tương Lai":** Giá trị cốt lõi của InsurTech. Sự bảo hộ của bảo hiểm giúp bảo vệ ước mơ và tương lai học tập của học sinh trước những rủi ro bất ngờ trên đường.
*   **Tần suất sử dụng:** Dùng trên giao diện ứng dụng phía phụ huynh, các chiến dịch truyền thông cộng đồng tại các trường THPT.

### Slogan Tiếng Anh (Chuyên biệt cho GAIP 2026): "Safe Ride, Secure Tomorrow"
*   **Giải nghĩa:**
    *   **"Safe Ride":** Cam kết giảm thiểu tỷ lệ tai nạn giao thông (Loss Ratio) thông qua giáo dục gamification trực quan.
    *   **"Secure Tomorrow":** Tương lai tài chính bền vững cho gia đình học sinh và bài toán quản trị rủi ro hiệu quả của doanh nghiệp bảo hiểm nhờ dữ liệu hành vi.
*   **Tần suất sử dụng:** Đặt tại trang bìa Slide Pitching, phần giới thiệu giải pháp công nghệ với đối tác quốc tế.

---

*Bản quyền tài liệu thuộc về Ban Dự án Đường Đến Trường - Đội thi GAIP 2026.*
