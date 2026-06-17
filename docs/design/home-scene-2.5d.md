# THIẾT KẾ BỐ CỤC VÀ TỌA ĐỘ 2.5D CẢNH NHÀ AN (HOMESCENE SPECIFICATION)

Tài liệu đặc tả thiết kế phối cảnh 2.5D, hệ tọa độ sân khấu, quy tắc phân lớp độ sâu (Z-sorting), hộp va chạm (collision zones) và hành vi camera cho phân cảnh **HomeScene** trong game "7 Giờ Kém 10".

---

## 1. Ý Tưởng Thiết Kế Phối Cảnh 2.5D

Thay vì sử dụng góc nhìn từ trên xuống (top-down grid) đơn điệu, `HomeScene` được thiết kế lại theo phối cảnh **2.5D Side-Scrolling (Side-Isometric)**. 

### Đặc điểm phối cảnh:
*   **Trục X (Ngang):** Thể hiện sự di chuyển từ trong nhà ra ngoài sân. Tổng chiều rộng màn chơi mở rộng ra **1200px** (vượt quá chiều rộng màn hình 800px), tạo trải nghiệm khám phá không gian.
*   **Trục Y (Sâu/Dọc):** Đóng vai trò là chiều sâu của căn phòng. Nhân vật di chuyển lên/xuống trên trục Y để tạo cảm giác đứng gần hoặc xa bức tường phía sau.
*   **Y-Sorting (Độ sâu động):** Độ sâu (`depth`) của mọi thực thể (Player, NPC, nội thất) được cập nhật động bằng chính tọa độ Y của chúng (`depth = y`). Nhân vật đi xuống dưới sẽ đè lên các vật thể phía trên.

```
       [ Bức tường phía sau: Y = 320 ]  <-- Không thể đi qua
   +---------------------------------------------------+
   |  [Giường/Nệm]    [Bàn học]             [Bếp ga]   |
   |   (X:180)         (X:380)               (X:600)   |
   |                                                   |  ==> Lối đi ra Sân (X: 750)
   |                 [Người chơi]                      |
   +---------------------------------------------------+
   [ Giới hạn mép dưới sàn nhà: Y = 520 ]
```

---

## 2. Bản Đồ Phân Chia Hai Khu Vực Liên Thông

Màn chơi được chia làm 2 khu vực chính nối liền nhau tại tọa độ $X = 750$:

### A. Khu Vực Trong Nhà (Indoor Living Room) — $X \in [0, 750]$
*   **Mô tả:** Không gian phòng khách kiêm phòng ngủ và bếp của căn nhà ống Việt Nam bình dân. Tường sơn vàng kem ấm áp, nền lát gạch men ceramic màu đỏ đất nung nhạt.
*   **Nội thất:** 
    *   Nệm ngủ đặt trực tiếp trên sàn gỗ ép sát tường phía sau.
    *   Bàn học gỗ học sinh đơn giản chứa sách vở và tờ giấy bảo hiểm.
    *   Móc treo mũ bảo hiểm gắn trên tường sát cửa chính.
    *   Góc bếp ga mini với nồi niêu, tủ chén nhỏ.

### B. Khu Vực Sân Trước (Front Yard) — $X \in [750, 1200]$
*   **Mô tả:** Khoảng sân xi măng nhỏ trước nhà, có tường rào thấp và một số chậu cây cảnh (bonsai).
*   **Vật thể:**
    *   Chiếc xe máy số Wave Alpha màu đỏ quen thuộc dựng chân chống.
    *   Cổng rào sắt màu xanh lá dẫn ra đường lớn (Điểm chuyển cảnh sang `RoadScene`).

---

## 3. Bảng Tọa Độ Đối Tượng (Object Coordinate Table)

Toàn bộ tọa độ được thiết kế cho kích thước màn chơi $1200 \times 600$, hiển thị trên viewport $800 \times 600$:

| Sprite Key | Đối Tượng | Tọa Độ X | Tọa Độ Y | Kích Thước (W x H) | Vật Lý / Va Chạm | Tương Tác | Ghi Chú |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `furniture_mattress` | Nệm ngủ | 180 | 335 | 160 x 60 | Static (Solid) | Không | Đặt sát tường phía sau bên trái. |
| `furniture_desk` | Bàn học | 380 | 330 | 96 x 48 | Static (Solid) | Không | Trên bàn có tờ giấy bảo hiểm. |
| `item_insurance` | Giấy bảo hiểm | 380 | 305 | 24 x 16 | Cảm biến | **Có (E/Space)** | Kích hoạt giao diện mua bảo hiểm hành trình. |
| `furniture_clock` | Đồng hồ treo tường | 380 | 170 | 32 x 32 | Không (Tường) | Không | Kim đồng hồ đứng yên chỉ **6:50**. |
| `furniture_kitchen` | Kệ bếp ga | 600 | 330 | 120 x 48 | Static (Solid) | Không | Góc bếp gia đình nhỏ. |
| `avatar_mom` | Mẹ (NPC) | 620 | 360 | 48 x 64 | Static (Solid) | **Có (E/Space)** | Đứng gần bếp, nhắc nhở đi học và bảo hiểm. |
| `furniture_hook` | Móc treo mũ | 710 | 210 | 16 x 32 | Không (Tường) | Không | Treo sát cửa ra vào. |
| `item_helmet` | Mũ bảo hiểm | 710 | 225 | 24 x 24 | Cảm biến | **Có (E/Space)** | Có thể nhặt nếu chưa chuẩn bị. |
| `furniture_wall` | Tường ngăn nhà/sân | 750 | 180 | 20 x 280 | Static (Solid) | Không | Bức tường chia đôi khu vực có ô cửa mở. |
| `obstacle_motorbike` | Xe máy Wave đỏ | 950 | 410 | 80 x 48 | Static (Solid) | **Có (E/Space)** | Dựng ngoài sân. Tương tác kiểm tra phanh lốp. |
| `furniture_pot` | Chậu cây cảnh | 830 | 350 | 40 x 48 | Static (Solid) | Không | Trang trí góc sân. |
| `furniture_gate` | Cổng sắt ra đường | 1170 | 420 | 20 x 180 | Cảm biến | **Có (E/Space)** | Kích hoạt xuất phát đi học. |
| `player` | Nhân vật An | 200 | 420 | 32 x 64 | Dynamic | Điều khiển | Điểm xuất phát của vòng lặp từ nệm ngủ. |

---

## 4. Phân Lớp Độ Sâu (Depth Layers) & Z-Index

Phòng tránh việc hiển thị đè hình sai phối cảnh bằng cấu trúc Z-index nghiêm ngặt:

```yaml
0 - 49: Lớp Nền Tĩnh (Sky, xa nhất)
  - 10: Bầu trời ngoài sân trước (X: 750 - 1200)
  - 20: Tường nhà trong phòng (X: 0 - 750, màu vàng kem)
  - 30: Hàng rào sân trước (X: 750 - 1200)

50 - 99: Lớp Chi Tiết Tường (Wall Decor)
  - 60: Cửa sổ phòng khách, tranh lịch treo tường
  - 70: Đồng hồ treo tường (Y: 170), Móc treo mũ (Y: 210)

100 - 149: Lớp Mặt Sàn & Mặt Sân (Floor Base)
  - 100: Mặt sàn lát gạch ceramic trong nhà
  - 110: Mặt sân xi măng xám nhạt

150 - 900: Lớp Độ Sâu Động (Y-Sorted Entities)
  - Quy tắc: depth = Sprite.y
  - Chứa: Nệm ngủ, Bàn học, Giấy bảo hiểm, Kệ bếp, Chậu cây, Mẹ, Xe máy, Nhân vật An

900 - 999: Lớp Hiệu Ứng Ánh Sáng (Light Overlays)
  - 910: Vệt nắng sớm hắt từ cửa sổ / cửa chính vào nhà
  - 920: Hiệu ứng chuyển cảnh (Flash trắng khi reset vòng lặp)

1000+: Lớp Giao Diện HUD & Đối Thoại (HUD & Dialogue UI)
  - 1010: Khung Checklist "Chuẩn bị đi học"
  - 1020: Hộp hội thoại DialogSystem
  - 1030: Giao diện mua bảo hiểm hành trình
```

---

## 5. Quy Tắc Va Chạm (Collisions) Và Vùng Tương Tác (Interaction Zones)

### A. Ranh Giới Di Chuyển (Walkable Corridor Bounds)
Người chơi chỉ được di chuyển trong hành lang đi lại an toàn để giữ vững góc nhìn phối cảnh:

*   **Khu vực trong nhà:**
    *   Giới hạn trên: $Y \ge 340$ (Không cho đi sát sạt vào mép tường trên).
    *   Giới hạn dưới: $Y \le 500$ (Tránh đi lệch xuống dưới mép sàn gỗ).
    *   Giới hạn trái: $X \ge 40$.
*   **Khu vực ngoài sân:**
    *   Giới hạn trên: $Y \ge 360$ (Tường rào lùi sâu hơn tường nhà một chút).
    *   Giới hạn dưới: $Y \le 520$.
    *   Giới hạn phải: $X \le 1160$.

### B. Vùng Tương Tác (Interaction Zones)
Khoảng cách Euclid từ người chơi đến tâm đối tượng để bật Prompt tương tác là **$d \le 60\text{px}$**:

$$d = \sqrt{(X_{player} - X_{object})^2 + (Y_{player} - Y_{object})^2}$$

*   **Giấy bảo hiểm (Desk):** Bật prompt `"Nhấn [E/Space] để đọc tờ khai bảo hiểm"` khi đứng gần bàn học.
*   **Móc mũ bảo hiểm:** Bật prompt `"Nhấn [E/Space] để lấy Mũ Bảo Hiểm đỏ"` (chỉ hiện khi chưa nhặt mũ).
*   **Mẹ:** Bật prompt `"Nhấn [E/Space] để nói chuyện với Mẹ"`.
*   **Xe máy:** Bật prompt `"Nhấn [E/Space] để kiểm tra phanh xe và lốp"`.
*   **Cổng sắt:** Bật prompt `"Nhấn [E/Space] để dắt xe đi học"`.

---

## 6. Thiết Lập Camera Phaser 3

Để tránh cảm giác giật cục và tối ưu hóa không gian hiển thị rộng 1200px:

1.  **Thiết lập giới hạn camera (Camera Bounds):**
    ```javascript
    this.cameras.main.setBounds(0, 0, 1200, 600);
    this.physics.world.setBounds(0, 0, 1200, 600);
    ```
2.  **Theo dõi người chơi (Camera Follow):**
    ```javascript
    // Lerp di chuyển mượt mà trên trục X (0.1) để tạo cảm giác cinematic
    this.cameras.main.startFollow(this.player, true, 0.1, 0.05);
    ```
3.  **Vùng chết của camera (Deadzone):**
    Định nghĩa vùng trung tâm màn hình rộng 100px. Khi người chơi di chuyển trong vùng này, camera không cuộn để tránh rung lắc màn hình khi người chơi nhích nhẹ:
    ```javascript
    this.cameras.main.setDeadzone(100, 100);
    ```

---

## 7. Đề Xuất Vẽ Asset Pixel Khuyết Danh Bằng Canvas (Programmatic Drawing)

Để đảm bảo game chạy độc lập không cần file ảnh bên ngoài, các asset mới sẽ được tạo tự động thông qua Canvas Texture trong `PreloadScene.js`:

### 1. Nệm ngủ (`furniture_mattress`)
```javascript
this.createCanvasTexture('furniture_mattress', 160, 80, (ctx, w, h) => {
  // Bóng đổ dưới sàn
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, h - 15, w, 15);
  // Nệm dày màu xanh lam nhạt (vibe retro)
  ctx.fillStyle = '#60a5fa';
  ctx.fillRect(5, 5, w - 10, h - 15);
  // Chiếu hoa văn sọc trải trên nệm
  ctx.fillStyle = '#93c5fd';
  ctx.fillRect(10, 10, w - 20, h - 25);
  // Gối ngủ màu trắng kem xếp ở góc trái
  ctx.fillStyle = '#fafaf9';
  ctx.fillRect(15, 15, 30, 20);
});
```

### 2. Bàn học 2.5D (`furniture_desk`)
```javascript
this.createCanvasTexture('furniture_desk', 96, 64, (ctx, w, h) => {
  // Bóng đổ bàn gỗ
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(4, h - 12, w - 8, 12);
  // Chân bàn gỗ màu nâu đậm
  ctx.fillStyle = '#5c3d24';
  ctx.fillRect(10, h - 30, 8, 26);
  ctx.fillRect(w - 18, h - 30, 8, 26);
  // Mặt bàn gỗ dày phối cảnh chéo
  ctx.fillStyle = '#8c5e3c';
  ctx.fillRect(4, 20, w - 8, 20);
  ctx.fillStyle = '#a1704c'; // Viền mặt trên sáng hơn
  ctx.fillRect(4, 16, w - 8, 4);
});
```

### 3. Móc treo mũ bảo hiểm (`furniture_hook`)
```javascript
this.createCanvasTexture('furniture_hook', 16, 32, (ctx, w, h) => {
  ctx.fillStyle = '#78350f'; // Đinh gỗ
  ctx.fillRect(w/2 - 2, 4, 4, 8);
  ctx.fillStyle = '#cbd5e1'; // Móc treo kim loại hướng lên
  ctx.fillRect(w/2 - 1, 10, 2, 10);
  ctx.fillRect(w/2 - 4, 18, 5, 2);
});
```

### 4. Xe máy dựng chân chống góc sân (`obstacle_motorbike_yard`)
```javascript
this.createCanvasTexture('obstacle_motorbike_yard', 96, 64, (ctx, w, h) => {
  // Bóng đổ dưới mặt sân
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(w/2, h - 8, 35, 6, 0, 0, Math.PI*2);
  ctx.fill();

  // Bánh xe trước & sau (màu xám đen thép)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(22, h - 18, 14, 0, Math.PI*2);
  ctx.arc(w - 22, h - 18, 14, 0, Math.PI*2);
  ctx.fill();
  
  // Trục căm xe bạc
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Chân chống xe nghiêng nhẹ
  ctx.strokeStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(w/2 - 4, h - 24);
  ctx.lineTo(w/2 - 12, h - 8);
  ctx.stroke();

  // Thân xe Wave đỏ đặc trưng
  ctx.fillStyle = '#dc2626'; // Đỏ tươi
  ctx.fillRect(28, h - 42, 45, 18);
  ctx.fillStyle = '#ef4444'; 
  ctx.fillRect(w/2 - 12, h - 38, 24, 14);

  // Đầu xe & Đèn xi nhan
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(20, h - 52, 12, 14);
  ctx.fillStyle = '#ffffff'; // Kính đèn pha
  ctx.fillRect(16, h - 50, 6, 6);

  // Yên xe màu đen kéo dài ra sau
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(44, h - 44, 34, 6);
});
```

---

## 8. Hướng Dẫn Tích Hợp Vào HomeScene.js

Khi cập nhật code, các thay đổi chính cần thực hiện bao gồm:
1.  Đổi tọa độ tạo Player sang sát Nệm ngủ ngủ dậy $(200, 420)$.
2.  Chuyển Sprite Motorbike từ trong nhà ra tọa độ ngoài sân trước $(950, 410)$.
3.  Cài đặt ranh giới di chuyển động cho người chơi bằng cách kiểm tra điều kiện tọa độ trong hàm `update()`.
4.  Cập nhật camera đi theo người chơi bằng `this.cameras.main.startFollow`.
5.  Thêm các vùng tương tực tương tự với khoảng cách Euclid và hiển thị phím tương tác.
