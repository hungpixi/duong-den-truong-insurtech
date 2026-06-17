# DANH MỤC TÀI NGUYÊN MASTER (ASSET MASTER LIST) — ĐƯỜNG ĐẾN TRƯỜNG

Tài liệu này tổng hợp toàn bộ danh sách tài nguyên đồ họa (spritesheets, avatars, tilemaps, UI) và âm thanh (BGM, SFX, và cấu hình nhạc tổng hợp động) của dự án. Tất cả asset key khớp chính xác với tệp cấu hình `public/assets/asset-manifest.json` phục vụ tải động trong Phaser 3.

---

## 1. SPRITESHEETS NHÂN VẬT & XE CỘ (SPRITESHEETS)
Tất cả các spritesheet có lưới pixel răng cưa sắc nét, được vẽ ở hệ màu Arcade Game và có viền đen để tăng độ tương phản.

| Key | Đường dẫn File | Kích thước Frame | Số Frame | Các Hoạt Ảnh & Frame Range (0-indexed) | Trạng thái |
| :--- | :--- | :---: | :---: | :--- | :---: |
| `an` | `assets/characters/an.png` | $48 \times 48\text{ px}$ | 14 | *   `an_idle`: Frame 0-1 (nổ máy tại chỗ)<br>*   `an_drive`: Frame 2-5 (khom người lái xe)<br>*   `an_drive_rain`: Frame 6-9 (chạy xe mặc áo mưa)<br>*   `an_crash`: Frame 10-13 (văng khỏi xe và trượt dài) | [ ] Chưa vẽ |
| `mom` | `assets/characters/mom.png` | $48 \times 48\text{ px}$ | 10 | *   `mom_stand_idle`: Frame 0-1 (đứng trước cửa nhà)<br>*   `mom_wave_goodbye`: Frame 2-5 (vẫy tay tạm biệt An)<br>*   `mom_hand_raincoat`: Frame 6-9 (trao áo mưa/mũ bảo hiểm) | [ ] Chưa vẽ |
| `friend` | `assets/characters/friend.png` | $48 \times 48\text{ px}$ | 6 | *   `friend_idle`: Frame 0-1 (đứng bấm điện thoại)<br>*   `friend_walk`: Frame 2-5 (đi bộ thong thả trên vỉa hè) | [ ] Chưa vẽ |
| `vendor` | `assets/characters/vendor.png` | $96 \times 48\text{ px}$ | 8 | *   `vendor_push`: Frame 0-3 (khom lưng đẩy xe hàng rong)<br>*   `vendor_crash`: Frame 4-7 (xe hàng đổ, bánh mì hoa quả tung té) | [ ] Chưa vẽ |
| `insurance_advisor` | `assets/characters/insurance_advisor.png` | $48 \times 48\text{ px}$ | 4 | *   `advisor_bubble`: Frame 0-3 (khiên xanh lá phát sáng bay nhẹ) | [ ] Chưa vẽ |
| `school_guard` | `assets/characters/school_guard.png` | $48 \times 48\text{ px}$ | 6 | *   `guard_stand`: Frame 0-1 (đứng gác cạnh bốt)<br>*   `guard_signal`: Frame 2-5 (thổi còi, vẫy gậy điều hướng xe) | [ ] Chưa vẽ |
| `pedestrians` | `assets/characters/pedestrians.png` | $48 \times 48\text{ px}$ | 4 | *   `pedestrian_walk`: Frame 0-3 (học sinh cúi đầu đi bộ qua vạch) | [ ] Chưa vẽ |
| `traffic_car` | `assets/characters/traffic_car.png` | $96 \times 64\text{ px}$ | 4 | *   `car_drive`: Frame 0-3 (xe taxi chạy) | [ ] Chưa vẽ |
| `traffic_truck` | `assets/characters/traffic_truck.png` | $144 \times 96\text{ px}$ | 4 | *   `truck_drive`: Frame 0-3 (xe container lấn làn, nhấp nhô cabin) | [ ] Chưa vẽ |

---

## 2. CHÂN DUNG HỘI THOẠI (CONVERSATION PORTRAITS - 96x96 px)
Ảnh đơn (static image) cận cảnh từ ngực trở lên của nhân vật, thể hiện biểu cảm cụ thể trong hộp thoại:

### 2.1. Nhân vật chính An
*   `an_normal`: Cười nhẹ lạc quan, tự tin.
*   `an_shocked`: Trợn tròn mắt hốt hoảng (dùng khi va chạm/bị phạt).
*   `an_thoughtful`: Tay chống cằm suy nghĩ (dùng khi chọn bảo hiểm).

### 2.2. Mẹ của An
*   `mom_warm`: Ánh mắt hiền hậu mỉm cười dặn dò.
*   `mom_worried`: Nhíu mày lo lắng (khi trời mưa/va chạm).
*   `mom_happy`: Cười tươi đón An về nhà an toàn.

### 2.3. Bạn học
*   `friend_friendly`: Cười tươi vẫy chào ở cổng trường.
*   `friend_explaining`: Đẩy nhẹ gọng kính cận nghiêm túc (khi giải thích bảo hiểm).

### 2.4. Cô bán hàng rong
*   `vendor_hardworking`: Gương mặt khắc khổ rám nắng, cười hiền từ.
*   `vendor_startled`: Mắt chữ O mồm chữ A giật mình hoảng hốt khi va quẹt.

### 2.5. AI Advisor (Cố vấn bảo hiểm)
*   `advisor_welcome`: Cười tươi đáng tin cậy.
*   `advisor_explain`: Gương mặt tự tin, tay chỉ dẫn gửi ảnh claim trực tuyến.

### 2.6. Bác bảo vệ trường
*   `guard_strict`: Nghiêm nghị, miệng ngậm còi chuẩn bị thổi.
*   `guard_friendly`: Cười gật đầu chào học sinh đi học đúng giờ.

---

## 3. TÀI NGUYÊN BẢN ĐỒ & TILESETS (TILEMAPS & TILES)
Tất cả map được thiết kế trên lưới ô $32 \times 32\text{px}$ bằng phần mềm Tiled Map Editor, xuất ra file JSON định dạng `.tmj`.

### 3.1. Tileset Images (Ảnh ghép nguồn)
*   `vietnam_house.png` ($512 \times 512\text{px}$): Gạch tường vàng, mái ngói đỏ, ban công sắt, cột điện cáp quấn.
*   `vietnam_market.png` ($512 \times 512\text{px}$): Biển tạp hóa vẽ tay, sạp rau, ghế nhựa đỏ quán cóc, xe bánh mì.
*   `road_tiles.png` ($256 \times 256\text{px}$): Nhựa đường xám, vạch kẻ, ổ gà, vũng nước ngập, đèn tín hiệu.
*   `school_tiles.png` ($512 \times 512\text{px}$): Cổng sắt đỏ trường học, phòng bảo vệ, bồn hoa phượng vĩ.

### 3.2. Tilemaps JSON Files (Bản đồ màn chơi)
*   `map_home` (`assets/maps/home.tmj`): Cảnh 2D side-view tĩnh trong nhà của An.
*   `map_alley` (`assets/maps/alley.tmj`): Hẻm nhỏ ngoằn ngoèo, đường hẹp bắt đầu RoadScene.
*   `map_market` (`assets/maps/market_street.tmj`): Đường đi qua chợ họp đông đúc dưới lòng đường.
*   `map_rainy` (`assets/maps/rainy_road.tmj`): Đoạn đường lớn ngập nước, trời mưa gió quất mạnh.
*   `map_school` (`assets/maps/school_gate.tmj`): Cảnh 2D side-view kết thúc ngày tại cổng trường.

---

## 4. GIAO DIỆN NGƯỜI DÙNG (UI GRAPHICS)

*   `title_logo.png` ($400 \times 150\text{px}$): Tên game "ĐƯỜNG ĐẾN TRƯỜNG" cách điệu pixel rực rỡ.
*   `dialog_box.png` ($720 \times 140\text{px}$): Khung hộp thoại màu navy tối viền cyan sáng.
*   `choice_button.png` ($500 \times 45\text{px}$): Nền nút lựa chọn phương án khi hội thoại.
*   `ui_panel.png` ($500 \times 360\text{px}$): Bảng hóa đơn viện phí/sửa xe cuối ngày.
*   `icon_coin.png` ($24 \times 24\text{px}$): Đồng xu vàng lấp lánh.
*   `icon_heart.png` ($24 \times 24\text{px}$): Trái tim biểu tượng HP.
*   `icon_helmet.png` ($24 \times 24\text{px}$): Chiếc mũ bảo hiểm an toàn.
*   `icon_insurance_card.png` ($48 \times 48\text{px}$): Thẻ bảo hiểm GAIP Care.
*   `btn_start.png`, `btn_continue.png`, `btn_lessons.png` ($280 \times 50\text{px}$): Các nút điều hướng menu chính phong cách pixel.

---

## 5. ÂM THANH (AUDIO ASSETS)

### 5.1. Nhạc nền (BGM - Chiptune loop)
*   `bgm_menu.mp3`: Giai điệu menu vui nhộn kích thích tinh thần.
*   `bgm_home.mp3`: Ấm áp bình yên tại phòng khách nhà An.
*   `bgm_street.mp3`: Tiết tấu nhộn nhịp, dồn dập đô thị Việt Nam.
*   `bgm_rain.mp3`: Trầm u ám phối hợp tiếng mưa rơi rào rào.
*   `bgm_school.mp3`: Giai điệu hào hùng chiến thắng cổng trường.

### 5.2. Hiệu ứng âm thanh cơ bản (SFX - wav/mp3 clip)
*   `sfx_click.wav`: Tiếng bíp ngắn khi click chuột.
*   `sfx_coin.wav`: Tiếng "ting ting" nhận coin ảo.
*   `sfx_crash.wav`: Tiếng đâm sầm cơ học vỡ nhựa cứng.
*   `sfx_alarm.wav`: Tiếng chuông báo thức giục sáng sớm.
*   `sfx_rain.mp3`: Tiếng mưa rơi liên tục sũng nước.
*   `sfx_thunder.wav`: Tiếng sấm sét đánh vang giật mình chuyển cảnh.
*   `sfx_horn.wav`: Tiếng còi xe máy/xe tải inh ỏi.
*   `sfx_whistle.wav`: Tiếng còi thổi tuýt tuýt sắc lạnh của bảo vệ/cảnh sát.
*   `sfx_buy_insurance.wav`: Nhạc hiệu an tâm khi mua bảo hiểm thành công.

---

## 6. CẤU HÌNH TỔNG HỢP ÂM THANH ĐỘNG (DYNAMIC AUDIO SYNTHESIS)
Khi không có sẵn file âm thanh vật lý tải về, Phaser 3 sẽ sử dụng Web Audio API để sinh âm thanh chiptune trực tiếp từ tần số cấu hình dưới đây (quy định tại `animation-config.json`):

*   **sfx_click (Tiếng gõ chữ/nút):** Sóng `sine`, tần số giảm từ $850\text{Hz} \to 750\text{Hz}$ trong $12\text{ms}$, volume 0.15.
*   **sfx_crash (Tiếng đụng độ):** Sóng `sawtooth`, tần số giảm mạnh từ $180\text{Hz} \to 40\text{Hz}$ trong $350\text{ms}$ kèm $40\%$ tiếng ồn trắng (noise mix), volume 0.8.
*   **sfx_coin_receive (Tiếng nhặt xu):** Sóng `sine`, tần số nhảy từ $987.77\text{Hz} \to 1318.51\text{Hz}$ (Nốt Ti lên nốt Đố) trong $180\text{ms}$, volume 0.5.
*   **sfx_coin_lose (Tiếng rớt xu):** Sóng `triangle`, tần số tụt từ $523.25\text{Hz} \to 261.63\text{Hz}$ (Nốt Đố xuống nốt Đồ) trong $250\text{ms}$, volume 0.6.
*   **claim_approved (Nhạc duyệt claim):** Giai điệu chiptune 4 nốt sóng `sine`:
    1.  $523.25\text{Hz}$ (Đố) trong $80\text{ms}$ (tại thời điểm 0s)
    2.  $659.25\text{Hz}$ (Mi) trong $80\text{ms}$ (tại thời điểm 0.08s)
    3.  $783.99\text{Hz}$ (Son) trong $80\text{ms}$ (tại thời điểm 0.16s)
    4.  $1046.50\text{Hz}$ (Đố cao) trong $200\text{ms}$ (tại thời điểm 0.24s)
*   **victory (Nhạc chiến thắng về đích):** Giai điệu chiptune tăng dần nốt sóng `triangle`: Đồ ($261.63$) -> Mi ($329.63$) -> Son ($392.00$) -> Đố ($523.25$) -> Mi ($659.25$) -> Son ($783.99$) -> Đố cao ($1046.50$) mỗi nốt chạy cách nhau $150\text{ms}$, nốt cuối ngân dài $400\text{ms}$.
