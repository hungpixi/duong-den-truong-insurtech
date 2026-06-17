# CẨM NANG HƯỚNG DẪN THIẾT KẾ CHI TIẾT (DESIGN MASTER PLAN) — ĐƯỜNG ĐẾN TRƯỜNG

Tài liệu này là Cẩm nang Hướng dẫn Phong cách Thiết kế (Master Style Guide) chính thức cho dự án "Đường Đến Trường". Nó hợp nhất toàn bộ triết lý mỹ thuật, quy chuẩn giao diện, định hướng bối cảnh Việt Nam và các cơ chế InsurTech của dự án.

---

## 1. TRIẾT LÝ THIẾT KẾ & BA TRỤ CỘT (DESIGN PILLARS)

Dự án "Đường Đến Trường" được phát triển dựa trên ba trụ cột cốt lõi:

```
+-------------------------------------------------------------------+
|                           BA TRỤ CỘT CỐT LÕI                      |
+-------------------------------------------------------------------+
|  1. HOÀI CỔ ẤM ÁP        |  2. TRỰC QUAN HÓA RỦI RO  |  3. KHÔNG THỦ TỤC  |
|  (Retro Cozy Pixel Art)  |  (Nỗi đau ví tiền thực)   |  (Claim 1-chạm AI) |
+-------------------------------------------------------------------+
```

1.  **Hoài cổ Ấm áp (Cozy Nostalgia):** Sử dụng đồ họa pixel art 16-bit để biến những bài học giao thông khô khan thành một trải nghiệm nghệ thuật gần gũi, gợi nhắc những kỷ niệm đi học của học sinh Việt Nam.
2.  **Trực quan hóa Tổn thất Tài chính:** Rèn luyện ý thức lái xe thông qua tác động trực tiếp lên ví tiền ảo (`coin`) và máu (`HP`). Người chơi cảm nhận được "nỗi đau ví tiền" ngay lập tức khi vi phạm giao thông hoặc gặp tai nạn.
3.  **Bảo hiểm Không thủ tục (InsurTech Innovation):** Trình diễn sức mạnh của công nghệ bảo hiểm hiện đại. Xóa tan định kiến "thủ tục rườm rà" bằng quy trình Claim tự động chỉ trong 1 giây qua máy ảnh và thuật toán quét ảnh AI ảo.

---

## 2. PHONG CÁCH MỸ THUẬT & BỐI CẢNH VIỆT NAM (ART STYLE)

### 2.1. Đặc trưng Đường phố Đô thị Việt Nam
Môi trường trong game phải tái hiện chân thực các đặc trưng đời sống đường phố Việt Nam:
*   **Kiến trúc:** Dãy nhà ống cao 2-3 tầng sơn màu vàng nghệ cũ dầm mưa dãi nắng, ban công treo các chậu cây xanh hoặc quần áo, mái bạt kéo di động màu xanh đỏ lấn ra hè.
*   **Hạ tầng:** Cột điện bê tông tròn với các cuộn dây cáp chằng chịt quấn quanh, các biển quảng cáo dán trực tiếp như *"Khoan cắt bê tông"*, *"Hút hầm cầu"* kèm số điện thoại giả lập.
*   **Vỉa hè:** Các quán trà đá vỉa hè bày biện ghế nhựa đỏ, xe bánh mì patê inox phản chiếu ánh sáng, tủ nước mía siêu sạch khói bốc nghi ngút từ gánh xôi sáng.
*   **Chướng ngại vật thực tế:**
    *   *Ổ gà chứa nước:* Xuất hiện sau ngày mưa, đục ngầu, phản chiếu ánh sáng mờ.
    *   *Công trường thi công:* Đống cát tràn ra làn đường xe máy, rào chắn sọc đỏ trắng kèm biển báo thi công.
    *   *Xe chở hàng cồng kềnh:* Xe máy lôi chở các giỏ hoa quả chất cao hoặc bình gas đỏ che khuất tầm nhìn.

### 2.2. Quy tắc Pixel-Perfect
*   Đồ họa pixel phải giữ được cạnh răng cưa sắc nét (tắt tính năng làm mịn của Phaser 3 bằng `pixelArt: true`).
*   Hạn chế tối đa dither để đảm bảo giao diện sạch và dễ nhìn trên thiết bị di động.
*   Áp dụng đổ bóng đổ phẳng (flat shadow) góc chéo để tạo chiều sâu cho các đối tượng 2.5D di chuyển.

---

## 3. PHỐI CẢNH PSEUDO-2.5D & PARALLAX BACKGROUND

Gameplay di chuyển trên đường sử dụng phối cảnh Pseudo-3D (retro arcade):

```
                       [ Y = 200px - Chân Trời (Horizon) ]
                      /===================================\
                     /                 .                   \  <-- Đường hẹp (70px)
                    /                  .                    \
                   /                   .                     \
                  /         [Xe cộ / Vật cản]                 \
                 /                     .                       \
                /                      .                        \
               /                       .                         \
              /                        .                          \
             /=====================================================\
                    [ Y = 560px - Đáy màn hình (Bottom Screen) ]
                              <--- Đường rộng (500px) --->
```

*   **Tọa độ Chân trời (Horizon):** Cố định tại $Y = 200\text{px}$. Đường đi thu nhỏ chỉ còn $70\text{px}$ chiều rộng.
*   **Tọa độ Đáy màn hình (Bottom screen):** Cố định tại $Y = 560\text{px}$. Đường đi mở rộng tối đa đạt $500\text{px}$.
*   **Toán phối cảnh deep-z:**
    Các sprite xuất hiện từ chân trời ($z=1.0$) và di chuyển về đáy màn hình ($z=0.0$). Kích thước sprite scale theo công thức:
    $$\text{Scale}(z) = 0.15 + (1.0 - z) \times 0.85$$
*   **Cuộn Parallax:**
    *   *Lớp nền xa (Sky & Mountains):* Tốc độ cuộn $0\%$ (hoặc cực kỳ chậm khi rẽ).
    *   *Lớp nền trung (Dãy nhà ống, cột điện):* Cuộn với tốc độ tỷ lệ nghịch với khoảng cách. Cột điện ở gần trôi nhanh ra biên màn hình.
    *   *Mặt đường (Road pavement):* Đa giác vẽ bằng Graphics API cuộn liên tục tạo cảm giác chuyển động về phía trước.

---

## 4. QUY CHUẨN THIẾT KẾ NHÂN VẬT & PHƯƠNG TIỆN

*   **Lưới cơ sở (Base Grid):**
    *   Nhân vật chính An, Mẹ, Bạn học, Bảo vệ: $48 \times 48\text{px}$.
    *   Xe ô tô taxi, xe bán hàng rong: $96 \times 48\text{px}$.
    *   Xe tải container lấn làn: $144 \times 96\text{px}$.
*   **Avatar Hội thoại (Portraits):**
    *   Kích thước $96 \times 96\text{px}$, vẽ cận cảnh biểu cảm ngực trở lên (Bust shot).
    *   Mỗi nhân vật có ít nhất 2-3 biểu cảm phục vụ cốt truyện (bình thường, hốt hoảng, hiền từ lo lắng).
    *   Hỗ trợ bong bóng biểu cảm retro (Sweat drop, Question mark, Exclamation point) trên đầu để tăng độ sống động.

---

## 5. HỆ THỐNG THỜI TIẾT & VẬT LÝ VŨNG NƯỚC (WEATHER SYSTEMS)

Game triển khai hai hệ thống thời tiết đặc thù để tạo độ thử thách cho người chơi:

### 5.1. Hệ thống Ngày Mưa (Rainy State - Ngày 2)
*   **Hoạt ảnh hạt mưa:** Sử dụng hệ thống hạt (Particles) rơi chéo góc từ phải sang trái $15^\circ$ (Y-speed: $850 \to 1100\text{px/s}$, X-speed: $-350 \to -450\text{px/s}$). Màu hạt mưa xanh nhạt `#86d6f2` (Alpha 0.6).
*   **Vật lý trơn trượt:** Hệ số ma sát mặt đường giảm mạnh, quãng đường trượt khi nhả phanh dài gấp đôi ngày nắng.
*   **Hiệu ứng bắn nước (Splash):** Khi bánh xe đè lên vũng nước ngập lòng đường, sinh ra các hạt nước bắn chéo sang 2 bên bánh xe ($10$ hạt mỗi $100\text{ms}$), hạt bay cong rồi rơi xuống mặt đường.

### 5.2. Hệ thống Sương mù Sáng sớm (Foggy State - Ngày 5)
*   **Hiệu ứng thị giác:** Lớp overlay phủ camera màu trắng đục nhẹ (`#EAECEE`, alpha 0.15) làm mờ hoàn toàn các vật thể ở gần chân trời ($z > 0.6$). Người chơi chỉ nhận biết được chướng ngại vật khi chúng di chuyển lại gần ($z < 0.4$), đòi hỏi tốc độ phản xạ cao và di chuyển chậm.

---

## 6. QUY TRÌNH CLAIM BẢO HIỂM 1-CHẠM & SO SÁNH TÀI CHÍNH

### 6.1. Quy trình Claim 4 bước trực quan
Khi xảy ra va chạm, nếu người chơi đã sở hữu gói bảo hiểm tương ứng, hệ thống claim tự động hoạt động:
1.  **Va chạm (Collision):** Camera rung giật mạnh trong $380\text{ms}$, nhấp nháy màn hình đỏ cảnh báo.
2.  **Chụp ảnh hiện trường (Evidence Capture):** Một khung ngắm camera màu xanh lá cây hiện ra khóa mục tiêu chiếc xe máy bị ngã. Màn hình nháy flash sáng trắng kèm tiếng màn trập máy ảnh cơ kêu xoạch.
3.  **Kiểm định AI (AI Audit Progress):** Một thanh tiến trình chạy từ $0 \to 100\%$ hiện ngay trên đầu xe máy ghi chữ `"Đang kiểm định hồ sơ..."` trong vòng $1$ giây.
4.  **Phê duyệt & Chi trả (Approval & Payout):** Dấu tích xanh lớn hiện ra kèm tiếng nhạc hiệu thành công. Các đồng xu vàng bay từ vị trí va chạm về thanh HUD tiền xu, đồng thời số tiền bồi thường (+XX xu) màu xanh lá bay lên.

### 6.2. Thanh so sánh chi phí Coverage Bar
Tại màn hình kết quả ngày (ResultScene), game vẽ trực tiếp thanh đồ họa so sánh chi phí để làm nổi bật giá trị bảo hiểm mang lại:
*   **Thanh Đỏ (Không bảo hiểm):** Người chơi tự trả toàn bộ thiệt hại ($180$ xu).
*   **Thanh Xanh-Đỏ (Có bảo hiểm):** Phần màu xanh lá thể hiện số tiền bảo hiểm gánh chịu (ví dụ $128$ xu), phần màu đỏ thể hiện số tiền thực tế người chơi tự trả (chỉ còn $52$ xu). Sự trực quan hóa bằng màu sắc giúp người chơi lập tức nhận ra giá trị kinh tế của bảo hiểm.

---

## 7. GIAO DIỆN PHỤ HUYNH & DASHBOARD ĐỐI TÁC (PARENT PORTAL)

Để hoàn thiện bài thuyết trình pitching trước ban giám khảo GAIP 2026, thiết kế đề xuất cấu trúc trang web dashboard dành cho phụ huynh và hãng bảo hiểm quản lý hành vi:
*   **Hệ thống màu:** Safety Emerald `#10B981` phối hợp Slate Charcoal `#0F172A` trên nền Frost White `#FAFAFA` (đảm bảo độ chuyên nghiệp cao).
*   **Font chữ:** `Outfit` (Sans-serif hình học hiện đại).
*   **Biểu đồ radar hành vi (Radar Safety Chart):** Đánh giá 5 tiêu chí lái xe an toàn của con: Tốc độ trung bình, Giữ khoảng cách an toàn, Đội mũ bảo hiểm đúng chuẩn, Đi đúng làn đường, và Phản xạ tránh vật cản.
*   **Thanh trạng thái gói bảo hiểm (Active Insurance Status):** Hiển thị rõ thông tin hợp đồng thật, thời hạn và nút gia hạn chủ động hưởng chiết khấu dựa trên điểm lái xe an toàn tích lũy từ game.
