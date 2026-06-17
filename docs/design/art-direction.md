# HƯỚNG DẪN ĐỊNH HƯỚNG NGHỆ THUẬT (ART DIRECTION): "7 GIỜ KÉM 10"
## Dự án: Game O2O Slice-of-life Kỳ Ảo Việt Nam & InsurTech “7 Giờ Kém 10”

Tài liệu này quy định các tiêu chuẩn mỹ thuật, phong cách đồ họa và cơ chế thị giác kỹ thuật số nhằm chuyển đổi visual direction từ kinh dị u tối sang **Slice-of-life Kỳ ảo Việt Nam nắng ấm sớm mai** trên nền tảng Phaser 3.

---

## 1. Phong Cách Đồ Họa Ấm Áp & Kỳ Ảo (Warm & Magical Slice-of-life Pixel Art)

*   **Ý tưởng cốt lõi:** Tái hiện một buổi sáng Việt Nam thanh bình, ấm áp và gần gũi với hình ảnh ngõ hẻm quen thuộc, khu chợ sáng nhộn nhịp dưới ánh bình minh, và ngã tư ngập tràn ánh nắng. Khi rủi ro tài chính xảy ra, thế giới sẽ mất màu sắc để biểu thị tâm trí bị xám xịt do gánh nặng chi phí.
*   **Mood & Tone:** Ấm áp, rực rỡ, đầy màu sắc, kỳ ảo và gần gũi.
*   **Bảng màu chủ đạo (Color Palette):**
    *   **Ánh nắng sớm mai:** Vàng nắng ấm (`#fef08a`), Cam đào dịu (`#fed7aa`), Xanh da trời nhạt (`#bae6fd`). Các màu này chiếm phần lớn diện tích màn hình để tạo cảm giác trong trẻo của sớm mai.
    *   **Thế giới xám xịt (khi mất màu):** Chuyển dịch sắc độ từ các tone màu tươi tắn về dải màu xám nhạt (`#e2e8f0` đến `#475569`) tùy theo mức độ của Color Meter.
    *   **Màu sắc các gói bảo hiểm:** Đỏ mũ bảo hiểm (`#ef4444` cho Gói Mũ Đỏ), Vàng cam phương tiện (`#f59e0b` cho Gói Xe Cũ), Xanh lá tươi mát (`#10b981` cho Gói Đường Đến Trường).

---

## 2. Cơ Chế Color Meter & Sự Biến Đổi Màu Sắc (Color Meter Visual Mechanic)

Thay thế các yếu tố máu me hay ghê rợn bằng thanh trạng thái **Color Meter (Thanh Màu Sắc)** của thế giới:

### 2.1. Thanh Trạng Thái Color Meter
*   **Thiết kế:** Một thanh màu sắc gradient từ cầu vồng rực rỡ sang xám xịt đặt trên HUD.
*   **Tác động gameplay:**
    *   Khi Color Meter ở mức **100%**: Toàn bộ cảnh vật game hiện lên với đầy đủ màu sắc rực rỡ, nắng ấm sớm mai và mưa bóng mây lấp lánh phản chiếu cầu vồng bảy sắc.
    *   Khi người chơi gặp tai nạn (không có bảo hiểm) hoặc chọn phương án nguy hiểm: Color Meter tụt dần. Trình duyệt thực hiện giải thuật hạ độ bão hòa (desaturation) của các Sprite và Background, biến thế giới xung quanh thành xám xịt nhạt nhòa.
    *   Khi người chơi thực hiện Claim thành công nhờ có bảo hiểm: Hiệu ứng ánh sáng lấp lánh tràn ngập màn hình, khôi phục màu sắc rực rỡ 100% cho thế giới.

### 2.2. Hiệu Ứng Chuyển Đổi Kỳ Ảo
*   Khi vòng lặp reset, thay vì màn hình tối tăm u ám, một hiệu ứng lấp lánh như sương mai lướt qua màn hình, cuốn trôi đi sắc xám và đưa người chơi quay về căn phòng ngủ ngập tràn ánh nắng ấm lúc 6:50 AM.

---

## 3. Mưa Bóng Mây Lấp Lánh & Ánh Sáng Bình Minh (Magical Sun Shower & Sunrise Lighting)

*   **Mưa bóng mây (Vòng lặp 2):**
    *   Những hạt mưa nhỏ lấp lánh rơi chéo dưới ánh nắng vàng, phản chiếu bảy sắc cầu vồng đầy kỳ ảo.
    *   Các hạt mưa có màu sắc biến đổi óng ánh nhẹ (`#67e8f9`, `#f472b6`, `#fde047`, opacity $40\%$).
*   **Ánh sáng bình minh rực rỡ:**
    *   Nguồn sáng chiếu những quầng sáng vàng óng từ góc trên bên trái màn hình.
    *   Hiệu ứng bụi nắng (light particles) khẽ bay lơ lửng trong không trung tạo cảm giác slice-of-life kỳ ảo đầy thơ mộng.

---

## 4. UI Sổ Cái Kết Quả (Ledger HUD & Color Restore)

*   **Phong cách:** Thân thiện, tươi sáng như một trang sổ tay học sinh gọn gàng.
*   **Màu sắc:** Nền giấy trắng sữa ấm (`#fffbeb`), chữ nâu đậm thanh lịch (`#78350f`) và các điểm nhấn màu sắc rõ ràng (màu xanh lá cho phần bảo hiểm chi trả, màu đỏ dịu cho phần tự trả).
*   **Hiệu ứng:** Các con số tài chính chạy thanh cuộn trực quan. Thanh so sánh chi phí (Coverage Bars) thể hiện rõ rệt phần tiền bảo hiểm gánh vác, giúp người chơi lập tức thấy được giá trị của việc chuẩn bị tài chính.
