# HƯỚNG DẪN THIẾT KẾ BẢN ĐỒ VÀ PHÂN CẢNH (MAP DESIGN SPECIFICATION)
## Dự án: Game giáo dục bảo hiểm InsurTech “Đường Đến Trường”

Tài liệu này đặc tả chi tiết bố cục, thông số kỹ thuật, tọa độ Phaser 3 và các yếu tố hình ảnh Việt Nam cho 6 phân cảnh (Locations/Segments) của game. Toàn bộ thiết kế được tối ưu hóa cho độ phân giải Canvas cố định **800x600 pixels**.

---

## 1. Phương Pháp Chiếu Phối Cảnh Pseudo-3D (RoadScene Perspective)

Đối với các phân cảnh di chuyển trên đường (`RoadScene`), game sử dụng công cụ dựng hình Pseudo-3D (phối cảnh 2.5D retro). Hệ trục tọa độ và các thông số chiếu phối cảnh được thiết lập như sau:

*   **Tọa độ Chân trời (Horizon):** $Y_{horizon} = 200\text{px}$. Chiều rộng mặt đường tại chân trời $W_{horizon} = 70\text{px}$ (tọa độ từ $X = 365\text{px}$ đến $X = 435\text{px}$).
*   **Tọa độ Mép đường dưới (Bottom screen):** $Y_{bottom} = 560\text{px}$. Chiều rộng mặt đường dưới đáy $W_{bottom} = 500\text{px}$ (tọa độ từ $X = 150\text{px}$ đến $X = 650\text{px}$).
*   **Tọa độ X Trung tâm:** $X_{center} = 400\text{px}$.
*   **Tọa độ sâu ($z$):** Chạy từ $1.0$ (chân trời, xa nhất) về $0.0$ (mép màn hình dưới, gần người chơi nhất).
*   **Độ rộng lề đường (Sidewalk):** Chiếm $120\text{px}$ mỗi bên tại đáy ($X = 30$ đến $150$ ở bên trái; $X = 650$ đến $770$ ở bên phải).

---

## 2. Chi Tiết Bố Cục 6 Phân Cảnh (Locations)

### Phân cảnh 1: Nhà của An (HomeScene)
*   **Loại cảnh:** 2D Side-view tĩnh (đối thoại nhập vai).
*   **Bối cảnh thị giác:** Không gian phòng khách của một ngôi nhà ống đặc trưng Việt Nam.
    *   **Trái (X: 50 - 250):** Góc bàn thờ gia tiên nhỏ phía trên, tủ gỗ đựng tivi CRT cổ, bộ bàn ghế gỗ Đồng Kỵ.
    *   **Giữa (X: 300 - 500):** Cửa chính mở ra sân nhỏ hẹp. Một chiếc xe máy số (Wave Alpha đỏ) đang dựng trên chân chống.
    *   **Phải (X: 550 - 750):** Góc bếp lò ga mini, giá treo nón bảo hiểm và áo mưa cánh dơi màu xanh lá.
*   **Vị trí NPC và nhân vật:**
    *   `mom_sprite` (Mẹ): Đứng ở tọa độ $(180, 420)$, kích thước $64 \times 128$px.
    *   `an_sprite` (An): Đứng ở tọa độ $(450, 420)$, kích thước $64 \times 128$px.
*   **Điểm kích hoạt rủi ro & Lựa chọn (Risk Triggers):**
    *   *Mũ bảo hiểm:* Tương tác tại $(680, 320)$ để chọn mũ bảo hiểm đạt chuẩn (3/4 đầu) hoặc mũ lưỡi trai thời trang.
    *   *Chìa khóa xe:* Tương tác tại tủ gỗ $(150, 400)$ để lấy chìa khóa và kiểm tra phanh xe.

### Phân cảnh 2: Hẻm nhỏ (Alley Segment - Khởi đầu RoadScene)
*   **Loại cảnh:** Pseudo-3D (Tốc độ cuộn chậm: $15\text{px/s}$).
*   **Bối cảnh thị giác:** Con hẻm chật hẹp của thành phố với nhà cao tầng che khuất một phần bầu trời.
    *   **Đường dây điện (Electrical Wires):** Các bó dây cáp đen nhằng nhịt treo trên cột điện chạy dọc lề đường, thu hẹp dần về phía chân trời ($Y = 200$).
    *   **Bảng hiệu Neon:** Các biển hiệu tạp hóa nhỏ treo chìa ra đường ("Tạp hóa Cô Vy", "Sửa xe 79").
    *   **Vật thể ven đường:** Các thùng rác nhựa màu xanh lá cây đặt sát mép hẻm.
*   **Thông số kỹ thuật vật lý:**
    *   **Chiều rộng lòng đường thực tế:** Rất hẹp ($W_{bottom} = 320\text{px}$). Xe chỉ có thể lách qua hai làn: Làn trái ($x = -0.4$) và Làn phải ($x = 0.4$).
*   **Vật cản & Điểm kích hoạt rủi ro:**
    *   `puddle_small` (Ổ gà nhỏ): Xuất hiện tại $z=1.0$, di chuyển về $z=0$ ở vị trí ngẫu nhiên trên 1 trong 2 làn.
    *   `trash_can` (Thùng rác đổ): Chướng ngại vật tĩnh sát mép đường bên phải ($x = 0.5$).

### Phân cảnh 3: Đường chợ/Hàng rong (Market Street Segment)
*   **Loại cảnh:** Pseudo-3D (Tốc độ cuộn trung bình: $25\text{px/s}$).
*   **Bối cảnh thị giác:** Đoạn đường chợ tự phát nhộn nhịp lúc 7 giờ sáng.
    *   **Lề đường:** Bày la liệt các phản gỗ bán cá, sạp rau quả, gánh xôi, xe bánh mì inox phản chiếu ánh nắng.
    *   **Quán cà phê cóc:** Các bộ bàn ghế nhựa đỏ/xanh lùn đặt lấn chiếm sát mép đường.
    *   **Khói bụi & Mái che:** Mái bạt di động màu xanh, đỏ nhô ra lấn chiếm không gian phía trên.
*   **Thông số kỹ thuật vật lý:**
    *   **Chiều rộng lòng đường:** $W_{bottom} = 420\text{px}$. Phân chia thành 3 làn di chuyển ảo: Trái ($x = -0.6$), Giữa ($x = 0$), Phải ($x = 0.6$).
*   **Vật cản & Điểm kích hoạt rủi ro:**
    *   `vendor_cart` (Xe đẩy hàng rong): Di chuyển cắt ngang từ lề đường phải ($x = 1.0$) sang làn giữa ($x = 0$) khi người chơi đi tới tọa độ sâu $z = 0.4$. Yêu cầu người chơi giảm tốc hoặc đánh lái gấp sang làn trái.
    *   `parked_motorbike` (Xe máy dựng dưới lòng đường): Chướng ngại vật tĩnh nằm ở làn phải ($x = 0.65$).

### Phân cảnh 4: Ngã tư (Intersection Segment)
*   **Loại cảnh:** Pseudo-3D tĩnh/di chuyển chậm (Tốc độ cuộn: $10\text{px/s}$).
*   **Bối cảnh thị giác:** Nút giao thông ngã tư lớn với hệ thống đèn tín hiệu và cảnh sát giao thông.
    *   **Giữa giao lộ:** Vạch kẻ đường cho người đi bộ (Zebra crossing) chạy ngang mặt đường. Bốt Cảnh sát giao thông hình tròn đặt góc bên phải.
    *   **Đèn giao thông:** Trụ đèn xanh/đỏ đặt ở góc phải phía trên chân trời ($X = 480, Y = 170$).
*   **Thông số kỹ thuật vật lý:**
    *   **Chiều rộng mặt đường rộng nhất:** $W_{bottom} = 500\text{px}$. Chia thành 4 làn xe máy và ô tô hỗn hợp.
*   **Vật cản & Điểm kích hoạt rủi ro:**
    *   `traffic_light_red` (Đèn đỏ): Kích hoạt đếm ngược $5$ giây khi người chơi đạt $z = 0.3$. Nếu không nhấn phím Giảm tốc để dừng trước vạch kẻ đường ($z = 0.1$), cảnh sát giao thông sẽ phạt $50$ xu.
    *   `pedestrian_group` (Nhóm sinh viên đi bộ qua đường): Băng ngang vạch kẻ đường khi đèn đỏ bật sáng.

### Phân cảnh 5: Đoạn đường mưa (Rainy Segment)
*   **Loại cảnh:** Pseudo-3D (Môi trường thời tiết xấu).
*   **Bối cảnh thị giác:** Bầu trời tối sầm, các hạt mưa rơi xiên chéo góc $45^\circ$, hiệu ứng loang loáng phản chiếu ánh đèn neon của vũng nước trên mặt đường.
    *   **Hiệu ứng Overlay:** Lớp kính mờ (vẽ bằng hạt nước bán trong suốt) phủ trên camera che khuất tầm nhìn xa.
    *   **Xe cộ:** Các phương tiện di chuyển xung quanh đều mặc áo mưa cánh dơi phấp phới.
*   **Thông số kỹ thuật vật lý:**
    *   **Hệ số trơn trượt (Physics Slipperiness):** Lực cản không khí giảm từ $0.82$ xuống $0.95$, khiến xe máy trượt đà dài khi người chơi nhả phím di chuyển.
    *   **Ổ gà ngập nước (Deep Puddle):** Nằm ẩn trong vũng nước ngập lớn chiếm trọn làn giữa ($x = 0$).
*   **Vật cản & Điểm kích hoạt rủi ro:**
    *   `sudden_braking_car` (Xe đi trước phanh gấp): Đèn phanh đỏ rực của xe phía trước bật sáng tại $z = 0.35$. Người chơi phải chọn phanh đều hai tay hoặc bóp chết phanh trước (dẫn đến trượt ngã do đường trơn).

### Phân cảnh 6: Cổng trường (SchoolGate Scene)
*   **Loại cảnh:** 2D Side-view tĩnh kết thúc ngày.
*   **Bối cảnh thị giác:** Cổng trường Đại học lớn với cổng sắt sơn đỏ, biển tên trường pixel art màu vàng chữ xanh.
    *   **Trái (X: 50 - 350):** Hàng rào trường học, các hàng quán nước mía sinh viên, bóng mát cây phượng vĩ cổ thụ.
    *   **Giữa (X: 380 - 550):** Cổng chính rộng mở, có bảo vệ đứng trực.
    *   **Phải (X: 560 - 780):** Booth sự kiện "An toàn giao thông & Bảo hiểm GAIP Care" đầy bóng bay.
*   **Vị trí NPC và nhân vật:**
    *   `an_vehicle` (An đi xe máy đến): Dừng lại tại $(280, 450)$.
    *   `advisor_sprite` (AI Advisor bảo hiểm): Đứng tại Booth $(620, 430)$.
*   **Hành động tổng kết:**
    *   Điểm dừng thành công: Người chơi chạm vạch đích tại $X = 350$ để kích hoạt hội thoại và hiển thị hóa đơn tài chính cuối ngày.

---

## 3. Bản Đồ Tọa Độ Phaser 3 & Chi Tiết Lớp (Coordinate Mapping & Layering)

Toàn bộ tài nguyên hình ảnh được sắp xếp theo các lớp độ sâu Z-index trong Phaser để đảm bảo tính phối cảnh chính xác:

| Z-Index | Tên Lớp (Layer) | Đối tượng chứa bên trong | Cách vẽ / Nguồn tài nguyên |
| :---: | :--- | :--- | :--- |
| **0** | `Background` | Bầu trời, dãy núi xa, nhà phố tĩnh | Hình vẽ tĩnh parallax di chuyển theo tốc độ xe |
| **10** | `Road Base` | Mặt đường xám, lề đường bê tông | Vẽ động bằng các đa giác (`Graphics.fillTriangle`) |
| **20** | `Road Markings` | Vạch kẻ đường đứt quãng ở giữa | Vẽ động tỉ lệ thu hẹp dựa trên toán học chiếu $z$ |
| **30** | `Scenery` | Cột điện, cây xanh ven đường, biển hiệu | Nhân bản và tăng scale khi di chuyển từ $z=1.0 \to z=0.0$ |
| **40** | `Obstacles` | Xe tải, hàng rong, ổ gà, vũng nước | Tọa độ tính toán động trên lưới phối cảnh |
| **50** | `Player` | Sprite nhân vật An lái xe máy | Tọa độ X điều khiển bằng phím. Y cố định tại $500\text{px}$ |
| **60** | `Weather Effect` | Hạt mưa, sấm sét, sương mù overlay | Sinh hạt ngẫu nhiên rơi từ đỉnh màn hình |
| **100** | `HUD` | Máu, Coin, Điểm an toàn | Text và icon cố định góc trên màn hình |
| **200** | `Overlay UI` | Hộp thoại hội thoại, Hóa đơn claim, Bảng chọn | Khung nền kính mờ vẽ đè toàn màn hình |

---

## 4. Danh Sách Tình Huống Kịch Bản (Map Risk Event Configuration)

Dưới đây là cấu hình JSON cho các sự cố đặc thù trên từng bản đồ để phục vụ lập trình hệ thống va chạm và kích hoạt hội thoại:

```json
{
  "events": [
    {
      "map_id": "alley_segment",
      "trigger_z": 0.4,
      "event_id": "alley_puddle",
      "name": "Vấp ổ gà ngập nước trong hẻm",
      "base_damage_vehicle": 20,
      "base_damage_health": 5,
      "base_repair_cost": 30,
      "base_medical_cost": 10
    },
    {
      "map_id": "market_street",
      "trigger_z": 0.35,
      "event_id": "vendor_clash",
      "name": "Va chạm xe đẩy hàng rong",
      "base_damage_vehicle": 40,
      "base_damage_health": 20,
      "base_repair_cost": 50,
      "base_medical_cost": 60
    },
    {
      "map_id": "rainy_segment",
      "trigger_z": 0.3,
      "event_id": "slip_fall",
      "name": "Trượt bánh ngã xe dưới trời mưa",
      "base_damage_vehicle": 50,
      "base_damage_health": 35,
      "base_repair_cost": 60,
      "base_medical_cost": 100
    },
    {
      "map_id": "intersection",
      "trigger_z": 0.25,
      "event_id": "car_door_open",
      "name": "Ô tô mở cửa đột ngột",
      "base_damage_vehicle": 80,
      "base_damage_health": 50,
      "base_repair_cost": 80,
      "base_medical_cost": 150
    }
  ]
}
```

Tài liệu thiết kế bản đồ này đảm bảo tính khả thi cao khi lập trình trực tiếp các phần tử hình học trên màn hình 800x600 của Phaser 3 mà không lo lỗi tải ảnh từ bên ngoài.
