# THIẾT KẾ NHÂN VẬT & DIỄN HOẠT (CHARACTER DESIGN)
## Dự án: Game giáo dục bảo hiểm “Đường Đến Trường”

Tài liệu này quy định các tiêu chuẩn visual brief, phong cách trang phục, hướng dẫn vẽ avatar chân dung hội thoại và phân rã các khung hình hoạt ảnh (animation frames) cho toàn bộ hệ thống nhân vật trong game.

---

## 1. Nguyên tắc Thiết kế Sprite & Chân dung (Design Principles)

*   **Độ phân giải Sprite Grid:** Sử dụng lưới cơ sở $48 \times 48 \text{ px}$ cho nhân vật đi bộ và người lái xe máy. Các loại xe tải lớn có kích thước rộng hơn ($96 \times 48 \text{ px}$ hoặc $144 \times 96 \text{ px}$).
*   **Chân dung Hội thoại (Conversation Portraits):**
    *   *Kích thước:* $96 \times 96 \text{ px}$.
    *   *Phong cách:* Vẽ cận cảnh từ ngực trở lên (Bust shot). Nét vẽ biểu cảm rõ nét (mắt to, miệng biểu cảm, tóc đặc trưng) để người chơi dễ đồng cảm.
    *   *Kỹ thuật hỗ trợ:* Sử dụng các bong bóng cảm xúc nhỏ (Emoticons) xuất hiện trên đầu nhân vật (như giọt mồ hôi lo lắng, dấu chấm hỏi bối rối, bóng đèn ý tưởng, đám mây tức giận) để tăng hiệu quả biểu cảm retro 16-bit.

---

## 2. Đặc tả Chi tiết Nhân vật (Character Specifications)

### 2.1. AN — Nhân vật chính (Player Character)
*   **Visual Brief:** Nam sinh viên năm nhất, dáng người mảnh khảnh, nhanh nhẹn nhưng còn nét vụng về, chủ quan của tuổi trẻ.
*   **Trang phục (Clothing Style):**
    *   *Mặc định:* Áo khoác gió đồng phục học sinh màu xanh dương navy phối trắng ở tay, quần jean xanh sẫm, chân đi giày sneaker trắng, đeo balo đen chéo sau lưng.
    *   *Mũ bảo hiểm:* Thay đổi theo lựa chọn của người chơi ở đầu ngày. Mũ bảo hiểm cam an toàn đạt chuẩn (Tăng Safety) hoặc mũ lưỡi trai đỏ điệu đà (Tăng Risk).
    *   *Ngày mưa:* Mặc thêm áo mưa cánh dơi màu xanh lá cây hoặc áo mưa bộ màu vàng dạ quang.
*   **Avatar Portrait (96x96px - 3 biểu cảm):**
    1.  `an_normal`: Cười nhẹ tự tin, ánh mắt lạc quan.
    2.  `an_shocked`: Mắt mở to tròn, lông mày nhướn cao, vệt mồ hôi rơi bên má (dùng khi va chạm hoặc mất coin phạt).
    3.  `an_thoughtful`: Tay chống cằm, mắt nhìn nghiêng suy nghĩ (dùng khi đàm thoại chọn gói bảo hiểm).
*   **Hoạt ảnh Sprite trong Phaser 3 (48x48px):**
    *   `an_idle` (2 frames): Xe nổ máy rung nhẹ tại chỗ, ống xả phun làn khói xám mờ.
    *   `an_drive` (4 frames): Người khom về phía trước lái xe, bánh xe quay tròn liên tục tạo vệt tốc độ.
    *   `an_drive_rain` (4 frames): Mặc áo mưa cánh dơi bay phấp phới phía sau yên xe.
    *   `an_crash` (4 frames): Xe đổ nghiêng lướt trên đường phát ra tia lửa, An bị văng ra nằm trượt dài.

---

### 2.2. MẸ CỦA AN (Mom)
*   **Visual Brief:** Người mẹ Việt Nam trung niên tảo tần, chu đáo, rất mực yêu thương con nhưng hay càm ràm dặn dò.
*   **Trang phục (Clothing Style):** Đồ bộ vải lanh hoa văn nhã nhặn màu tím nhạt hoặc xanh lam mặc ở nhà, tóc búi gọn gàng sau gáy, đeo tạp dề màu vàng nhạt hoặc khẩu trang vải hoa khi ra sân.
*   **Avatar Portrait (96x96px - 3 biểu cảm):**
    1.  `mom_warm`: Ánh mắt hiền hậu, nụ cười ấm áp động viên.
    2.  `mom_worried`: Lông mày nhíu lại, khóe miệng trễ xuống thể hiện sự lo âu, dặn dò.
    3.  `mom_happy`: Cười tươi híp mắt, tay cầm chiếc mũ bảo hiểm đưa ra phía trước.
*   **Hoạt ảnh Sprite trong Phaser 3 (48x48px):**
    *   `mom_stand_idle` (2 frames): Đứng khoanh tay trước ngực ở hiên nhà ống.
    *   `mom_wave_goodbye` (4 frames): Vẫy tay chào tạm biệt An đi học.
    *   `mom_hand_raincoat` (4 frames): Đưa tay trao bộ áo mưa và mũ bảo hiểm cho An.

---

### 2.3. BẠN CÙNG LỚP (Friend)
*   **Visual Brief:** Nam/Nữ sinh viên cùng khóa, am hiểu công nghệ, thực tế và có tư duy tài chính cá nhân tốt.
*   **Trang phục (Clothing Style):** Áo thun polo đồng phục trường đại học màu trắng phối xanh lá cây, đeo balo hai quai gọn gàng, tay cầm cuốn giáo trình quân sự hoặc điện thoại thông minh. Đeo kính cận gọng tròn đen trí thức.
*   **Avatar Portrait (96x96px - 2 biểu cảm):**
    1.  `friend_friendly`: Cười tươi rạng rỡ, tay vẫy chào.
    2.  `friend_explaining`: Gương mặt nghiêm túc hơn, ngón tay trỏ đẩy nhẹ gọng kính tròn (dùng khi tư vấn bảo hiểm học đường).
*   **Hoạt ảnh Sprite trong Phaser 3 (48x48px):**
    *   `friend_walk` (4 frames): Đi bộ thong thả trên vỉa hè cổng trường.
    *   `friend_idle` (2 frames): Đứng bấm điện thoại, balo đeo lệch một bên vai.

---

### 2.4. CÔ BÁN HÀNG RONG (Street Vendor)
*   **Visual Brief:** Người phụ nữ lao động nghèo đẩy xe hàng rong bán đồ ăn sáng dưới lòng đường, đại diện cho biến số rủi ro bất ngờ trên phố.
*   **Trang phục (Clothing Style):** Áo thun dài tay cũ màu xám, quần vải đen ống rộng, đội nón lá rách và đeo khẩu trang y tế xanh che nửa mặt. Chân đi dép tổ ong.
*   **Avatar Portrait (96x96px - 2 biểu cảm):**
    1.  `vendor_hardworking`: Ánh mắt hiền từ đầy nếp nhăn, nụ cười mộc mạc rám nắng.
    2.  `vendor_startled`: Mắt mở to hết cỡ, miệng chữ O hốt hoảng khi xe đẩy bị va chạm.
*   **Hoạt ảnh Sprite trong Phaser 3 (96x48px - Chiều rộng gấp đôi):**
    *   `vendor_push` (4 frames): Cúi khom lưng dồn lực đẩy chiếc xe gỗ chở đầy hoa quả/tủ bánh mì đi chéo từ vỉa hè xuống lòng đường.
    *   `vendor_crash` (4 frames): Bánh mì, hoa quả bay tung tóe ra xung quanh, xe hàng lật nghiêng sang một bên.

---

### 2.5. TƯ VẤN VIÊN AI (Insurance Advisor - AI Assistant)
*   **Visual Brief:** Đại diện hỗ trợ trực tuyến thông minh của GAIP Care, xuất hiện trên màn hình điện thoại thông minh hoặc bảng báo cáo để giải thích quyền lợi bảo hiểm.
*   **Trang phục (Clothing Style):** Vest công sở hiện đại màu xanh navy phối áo sơ mi trắng thắt nơ đỏ thanh lịch, đeo tai nghe call center có mic nhỏ sát miệng.
*   **Avatar Portrait (96x96px - 2 biểu cảm):**
    1.  `advisor_welcome`: Cười tươi tắn, ánh mắt đáng tin cậy hỗ trợ khách hàng.
    2.  `advisor_explain`: Gương mặt tự tin, tay chỉ vào biểu đồ tròn hiển thị quyền lợi bồi thường giảm thiểu thiệt hại.
*   **Hoạt ảnh Sprite trong Phaser 3 (48x48px):**
    *   `advisor_bubble` (4 frames): Biểu tượng chiếc khiên xanh lá nhấp nháy phát sáng trên góc HUD (biểu thị bảo hiểm đang hoạt động bảo vệ người chơi).

---

### 2.6. BÁC BẢO VỆ TRƯỜNG (School Guard)
*   **Visual Brief:** Người đàn ông lớn tuổi gác cổng trường nghiêm khắc nhưng tốt bụng, luôn túc trực kiểm tra giờ giấc sinh viên vào cổng.
*   **Trang phục (Clothing Style):** Đồng phục bảo vệ màu xanh da trời sẫm, đeo cầu vai đỏ, thắt lưng da bản to có còi inox dắt ở hông. Đầu đội mũ kê-pi xanh sẫm.
*   **Avatar Portrait (96x96px - 2 biểu cảm):**
    1.  `guard_strict`: Nhíu mày nghiêm nghị nhìn thẳng, còi ngậm ở miệng chuẩn bị thổi phạt đi muộn.
    2.  `guard_friendly`: Cười gật đầu hiền lành chào đón học sinh đi học đúng giờ.
*   **Hoạt ảnh Sprite trong Phaser 3 (48x48px):**
    *   `guard_stand` (2 frames): Đứng nghiêm trang gác cạnh bốt bảo vệ cổng trường.
    *   `guard_signal` (4 frames): Vẫy tay điều hướng, tay kia cầm gậy chỉ dẫn cho xe đi vào làn gửi xe.

---

### 2.7. XE LƯU THÔNG & CHƯỚNG NGẠI VẬT (Traffic & Obstacles)
*   **Xe tải container lấn làn (Truck - 144x96px):**
    *   *Visual:* Xe tải lớn màu xanh lục đậm, đầu cabin vuông, bánh xe lớn. Khói đen xả ra từ ống bô phía trên nóc cabin.
    *   *Frames:* `truck_drive` (4 frames) bánh xe quay và cabin nhấp nhô theo mặt đường dằn sóc.
*   **Xe máy chở hàng cồng kềnh (Cargo Bike - 48x48px):**
    *   *Visual:* Người lái xe mặc áo phông sờn, yên sau chất đống 4-5 giỏ hoa quả to hoặc 3 bình gas đỏ.
    *   *Frames:* `cargo_bike_drive` (4 frames) xe lạng lách rung lắc do tải nặng.
*   **Người đi bộ qua đường (Pedestrian - 48x48px):**
    *   *Visual:* Học sinh mặc đồng phục trắng xanh, cúi đầu bấm điện thoại đi qua vạch kẻ đường.
    *   *Frames:* `pedestrian_walk` (4 frames) bước đi thong thả không chú ý giao thông quanh mình.
