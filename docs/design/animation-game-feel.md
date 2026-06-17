# ĐẶC TẢ HOẠT ẢNH & CẢM GIÁC GAME (ANIMATION & GAME FEEL SPECIFICATION)
## Dự án: Game giáo dục bảo hiểm InsurTech “Đường Đến Trường”

Tài liệu này quy định chi tiết các thông số hoạt ảnh (Tweens), hệ thống hạt (Particles), hiệu ứng camera và chuyển động vật lý phụ nhằm tối ưu hóa "Game Feel" (độ nảy, sinh động, phản hồi xúc giác) cho game "Đường Đến Trường" trên Phaser 3 Canvas.

---

## 1. Hoạt Ảnh Xe Máy & Cảm Giác Lái (Motorbike & Riding Feel)

Để chuyển động của xe máy (sprite kích thước $64 \times 64\text{px}$) không bị khô cứng, game áp dụng các hiệu ứng chuyển động phụ sau:

### 1.1. Trạng Thái Chờ (Idle Juice)
*   **Hiệu ứng nhún (Breathing/Idle Tween):**
    *   Thuộc tính thay đổi: `y` (trục tung).
    *   Biên độ: Dịch chuyển $+1.5\text{px}$ và $-1.5\text{px}$ so với vị trí gốc.
    *   Thời lượng: $650\text{ms}$ cho một chu kỳ.
    *   Kiểu Ease: `Sine.easeInOut`.
*   **Hiệu ứng Khói Ống Xả (Exhaust Smoke Particles):**
    *   Điểm sinh hạt: Góc dưới bên trái xe máy (tọa độ tương đối $X_{local} = -28\text{px}, Y_{local} = 18\text{px}$).
    *   Tốc độ sinh hạt: 1 hạt mỗi $200\text{ms}$.
    *   Đặc tính hạt:
        *   Sprite: Hạt tròn xám mờ (`smoke_particle`).
        *   Vận tốc: $X = -40 \to -60\text{px/s}$, $Y = -15 \to -25\text{px/s}$ (bay chéo ngược ra sau và hướng lên).
        *   Độ phóng đại (Scale): Bắt đầu từ $0.2$, nở ra đến $0.6$, sau đó mờ dần.
        *   Thời gian tồn tại (Lifespan): $500\text{ms}$.
        *   Độ mờ (Alpha): Giảm từ $0.5 \to 0$ (Ease: `Quad.easeOut`).

### 1.2. Trạng Thái Di Chuyển & Tăng Tốc (Cruising & Acceleration)
*   **Độ nghiêng xe (Leaning Physics):**
    *   Khi tăng tốc tiến lên: Thân xe nghiêng nhẹ về phía trước $2^\circ$ (Tween `angle` từ $0 \to 2$ trong $300\text{ms}$, Ease `Quad.easeOut`).
    *   Khi di chuyển ổn định: Rung động cơ siêu nhỏ bằng cách nhấp nháy ngẫu nhiên giá trị Y từ $0 \to 0.8\text{px}$ mỗi $80\text{ms}$.
*   **Xoay bánh xe (Wheel Rotation):**
    *   Hai bánh xe máy (sprite riêng) xoay liên tục góc $360^\circ$.
    *   Tốc độ góc phụ thuộc trực tiếp vào vận tốc di chuyển thực tế của xe trên đường: `angularVelocity = speed * 1.5`.

### 1.3. Trạng Thế Phanh Gấp (Hard Braking)
*   **Nghiêng xe ngược lại (Anti-dive tilt):**
    *   Khi người chơi nhả phím đi tiếp và bấm phanh: Thân xe nghiêng ngược lại phía sau góc $-4^\circ$ (`angle` từ $2 \to -4$ trong $200\text{ms}$ để thể hiện lực quán tính).
*   **Hiệu ứng Vệt Phanh (Skid Marks):**
    *   Dưới bánh sau xe máy, sinh ra một dải màu đen sẫm `#000000` (độ dày $3\text{px}$, dài tương ứng với quãng đường phanh).
    *   Độ mờ của vệt phanh ban đầu là $0.6$, sau đó mờ dần về $0$ trong vòng $2$ giây tiếp theo rồi bị hủy.
*   **Hiệu ứng Bụi Đất Bánh Sau:**
    *   Khi phanh gấp, sinh ra cụm hạt bụi (`dust_particle`) từ bánh sau bắn ngược lại phía sau với số lượng $15$ hạt.
    *   Góc bắn: $160^\circ \to 200^\circ$.
    *   Tốc độ hạt: $120 \to 180\text{px/s}$ với gia tốc giảm chấn cao (hạt dừng lại nhanh).

---

## 2. Hệ Thống Thời Tiết Mưa & Vật Lý Vũng Nước Splash (Rain & Puddle Physics)

Mưa và ngập lụt là rủi ro môi trường chính trên đường đi học, đòi hỏi hiệu ứng hình ảnh sống động để tạo áp lực cho người chơi.

```
                  \  \  \  \  \ (Hạt mưa nghiêng -15 độ)
                   \  \  \  \  \
                    \  \  \  \  \
     =======[ BÁNH XE MÁY ]=======
      \ \ \                     / / /
     - - - - -> BẮN NƯỚC <- - - - -
```

### 2.1. Hoạt Ảnh Hạt Mưa (Rain Particle System)
Game sử dụng một `ParticleEmitter` toàn màn hình chạy liên tục trên lớp nền phía trước của cảnh chơi.
*   **Cấu hình Mưa Nhẹ (Light Rain):**
    *   Mật độ hạt tối đa: $40$ hạt xuất hiện đồng thời trên màn hình.
    *   Góc rơi (Gió thổi nhẹ): $-105^\circ$ (nghiêng chéo từ phải sang trái $15^\circ$).
    *   Kích thước hạt mưa: Đường kẻ mảnh dài $12\text{px}$, dày $1\text{px}$, màu xanh da trời nhạt `#a3e2f7` (Alpha $0.4$).
    *   Vận tốc rơi: Trục Y từ $450 \to 600\text{px/s}$, trục X từ $-120 \to -160\text{px/s}$.
*   **Cấu hình Mưa Lớn & Bão (Heavy Rain / Storm):**
    *   Mật độ hạt tối đa: $150$ hạt.
    *   Góc rơi: $-115^\circ$ (gió thổi mạnh nghiêng chéo $25^\circ$).
    *   Kích thước hạt: Dài $20\text{px}$, dày $1.5\text{px}$, màu xanh nhạt `#86d6f2` (Alpha $0.6$).
    *   Vận tốc rơi: Trục Y từ $850 \to 1100\text{px/s}$, trục X từ $-350 \to -450\text{px/s}$.

### 2.2. Vũng Nước & Hiệu Ứng Bắn Nước (Puddle Splash)
*   Khi xe máy đi qua các vũng nước ngập trên mặt đường:
    *   **Hạt nước bắn ra (Water Splash Particles):** Sinh ra liên tục từ điểm tiếp xúc giữa bánh xe và mặt đường ($X_{wheel}, Y_{wheel}$).
    *   Số lượng hạt sinh: $10$ hạt mỗi $100\text{ms}$ khi di chuyển trong nước.
    *   Góc bắn chéo sang hai bên:
        *   Nhóm bắn về phía trước: Góc $-35^\circ \to -55^\circ$.
        *   Nhóm bắn về phía sau: Góc $215^\circ \to 235^\circ$.
    *   Vận tốc bắn: $140 \to 220\text{px/s}$.
    *   Gia tốc trọng lực Y: $+600\text{px/s^2}$ (đảm bảo hạt bay lên rồi rơi cong xuống mặt đường).
    *   Màu sắc hạt: Xanh lam nhạt bán trong suốt `#a9e2f5` (Alpha $0.7$), kích thước hạt tròn giảm dần từ $4\text{px} \to 1\text{px}$ trước khi biến mất.

---

## 3. Va Chạm & Rung Màn Hình (Collision Impact & Screen Shake)

Khi xảy ra va chạm với vật cản (như chó chạy rông, nắp cống mất, xe vượt ẩu), game cần truyền tải độ khốc liệt của vụ tai nạn giao thông và kích hoạt chuỗi hiệu ứng Claim bảo hiểm.

### 3.1. Hoạt Ảnh Ngã Xe (Crash Sequence)
*   **Chuyển động văng:**
    *   Khi chạm vật cản, xe máy dừng chuyển động ngang lập tức, xoay góc bánh xe lên trên $-55^\circ$ (`angle` từ $0 \to -55$ trong $200\text{ms}$, Ease `Quad.easeOut`).
    *   Vị trí xe máy bị đẩy lùi lại phía sau $40\text{px}$ theo trục X (Tween X giảm đi $40\text{px}$ trong $250\text{ms}$).
    *   Nhân vật lái xe (sprite người chơi) bị văng ra khỏi xe máy bay chéo lên trên một khoảng cách $X = 30\text{px}, Y = -40\text{px}$, rơi chạm đất và nằm im (thời lượng bay $300\text{ms}$, Ease `Cubic.easeOut`).

### 3.2. Hiệu Ứng Rung Màn Hình (Screen Shake)
*   Khi va chạm xảy ra, camera chính của game (`this.cameras.main`) sẽ thực hiện rung lắc dữ dội.
*   **Thông số cấu hình:**
    *   Thời lượng rung (Duration): $380\text{ms}$.
    *   Cường độ rung (Intensity): $0.025$ (tương ứng với biên độ dịch chuyển ngẫu nhiên tối đa của toàn bộ khung hình lên tới $20\text{px}$).
    *   Hàm giảm chấn: Rung động mạnh nhất ở $50\text{ms}$ đầu tiên, sau đó nhỏ dần theo quy luật giảm bậc hai (`Quad.easeOut`).

### 3.3. Flash Màn Hình (Impact Flash Overlay)
*   Một màn phủ (overlay rect) kích thước toàn màn hình được vẽ đè lên trên tất cả các lớp.
*   **Thông số:**
    *   Nháy chớp màu Đỏ rực `#e74c3c` trong $100\text{ms}$ (Tween Alpha đột ngột từ $0 \to 0.8$, sau đó giảm dần mượt mà về $0$ trong $180\text{ms}$). Hiệu ứng này tạo phản xạ giật mình về mặt sinh học cho người chơi.

---

## 4. Hiệu Ứng Dòng Tiền Trôi Nổi & Đồng Xu (Financial Drift & Coin Effects)

Tác động tài chính được trực quan hóa thông qua dòng tiền rơi rụng hoặc bồi thường bảo hiểm chảy ngược vào ví.

```
       [ +150 XU ] (Màu xanh lá bay lên mượt mà từ vị trí Claim)
             ^
             | (Ease: Quad.easeOut)
             |
       [ VỊ TRÍ SỰ CỐ / CLAIM ]
             |
             v (Gia tốc trọng lực rơi tự do)
          *  *  * (Đồng xu vàng rơi vỡ ra đất khi bị phạt tiền)
```

### 4.1. Hiệu Ứng Số Trôi Nổi (Floating Cash Text)
*   **Nhận tiền (Claim Payout / Victory):**
    *   Text sinh ra tại điểm xảy ra sự kiện. Nội dung: `+XX xu` (ví dụ: `+120 xu`).
    *   Màu sắc: Xanh lá cây `#2ecc71`, viền đen dày $3\text{px}$, cỡ chữ `22px` (`bold`).
    *   Tween chuyển động:
        *   Di chuyển thẳng lên trên $60\text{px}$ theo trục Y.
        *   Thời lượng: $1000\text{ms}$.
        *   Scale tăng dần từ $0.8 \to 1.4$ rồi nhỏ lại $1.0$ (Ease: `Back.easeOut`).
        *   Độ mờ Alpha giảm từ $1.0 \to 0$ trong $300\text{ms}$ cuối cùng.
*   **Mất tiền (Phí sửa xe / Vi phạm hành chính):**
    *   Text sinh ra tại HUD đồng xu hoặc vị trí xe. Nội dung: `-XX xu` (ví dụ: `-80 xu`).
    *   Màu sắc: Đỏ rực `#e74c3c`, cỡ chữ `22px` (`bold`).
    *   Tween chuyển động tương tự nhưng di chuyển chéo sang phải và rơi xuống nhẹ ở cuối đường bay để tạo cảm giác nặng nề.

### 4.2. Hiệu Ứng Rơi Xu Khi Mất Tiền (Coin Loss Drops)
*   Khi bị trừ tiền, từ biểu tượng đồng xu trên thanh HUD ($X = 30, Y = 50$) sinh ra $6 - 10$ đồng xu vàng bay rớt tự do ra ngoài màn hình.
*   **Vật lý hạt đồng xu:**
    *   Vận tốc X ban đầu: Ngẫu nhiên từ $-80 \to +80\text{px/s}$.
    *   Vận tốc Y ban đầu: $-150 \to -250\text{px/s}$ (bắn vọt ngược lên trên một chút).
    *   Gia tốc trọng lực Y: $+750\text{px/s^2}$ (kéo đồng xu rơi thẳng xuống đáy màn hình).
    *   Góc xoay: Xoay tròn ngẫu nhiên từ $0 \to 720^\circ$ trong suốt quá trình rơi.
    *   Thời gian sống: $1.2$ giây trước khi tự hủy ở ngoài biên dưới Canvas.

### 4.3. Quỹ Đạo Bay Đồng Xu Khi Nhận Tiền (Coin Reward Drift)
*   Khi được bảo hiểm bồi thường (Claim Approved), các đồng xu vàng bay từ vị trí phê duyệt claim về phía icon tiền xu của HUD.
*   **Tween Quỹ đạo (Drift Tween):**
    *   Tọa độ xuất phát: Vị trí phê duyệt sự cố (ví dụ $X = 400, Y = 300$).
    *   Tọa độ đích: Icon HUD ($X = 30, Y = 50$).
    *   Tween di chuyển đồng thời trục X và Y trong thời gian $750\text{ms}$.
    *   Kiểu Ease: `Cubic.easeIn` (bay chậm lúc đầu, lao cực nhanh vào đích ở cuối).
    *   **Phản hồi chạm đích (HUD Pulse):** Ngay khi hạt đồng xu cuối cùng chạm đích tại HUD, kích hoạt một Tween scale icon HUD đồng xu tăng lên $1.35$ lần trong $120ms$, sau đó trả về scale $1.0$ ban đầu (Ease: `Back.easeOut`) để tạo cảm giác thu hoạch thực tế.

---

## 5. Check-in Cổng Trường Chiến Thắng (School Check-in Victory Splash)

Cảnh kết thúc màn chơi khi học sinh đến trường thành công an toàn. Cần tạo ra trải nghiệm chúc mừng tích cực, thỏa mãn người chơi.

### 5.1. Giảm Tốc Vạch Đích (Final Stop Tween)
*   Khi xe máy chạm vùng kích hoạt cổng trường:
    *   Vận tốc xe giảm dần từ tốc độ hiện tại về $0$ trong thời gian $1.2$ giây.
    *   Kiểu Ease: `Cubic.easeOut` giúp xe dừng lại vô cùng mượt mà ngay trước cổng trường học.
    *   Nhân vật thực hiện động tác vẫy tay chào (sprite đổi sang frame vẫy tay).

### 5.2. Hoạt Ảnh Cánh Cổng Trường Mở (Gate Opening Scene)
*   Cánh cổng trường pixel art ($2$ cánh bên trái và bên phải) bắt đầu di chuyển mở ra.
*   **Cấu hình chuyển động cổng:**
    *   Cánh trái: Di chuyển X từ $X_{base} \to X_{base} - 50\text{px}$ trong $800\text{ms}$.
    *   Cánh phải: Di chuyển X từ $X_{base} \to X_{base} + 50\text{px}$ trong $800\text{ms}$.
    *   Ease: `Back.easeOut` (cánh cổng mở ra kịch biên rồi nẩy nhẹ lại tạo tiếng va đập sắt thép gỗ chân thực).

### 5.3. Bắn Pháo Hoa Giấy Chúc Mừng (Confetti Spark Emitter)
*   Hai bộ phát hạt pháo giấy được kích hoạt ở hai góc dưới màn hình:
    *   Bộ phát trái: Đặt tại $X = 0, Y = 600\text{px}$. Góc bắn chéo lên $45^\circ$ (phạm vi từ $30^\circ \to 60^\circ$).
    *   Bộ phát phải: Đặt tại $X = 800\text{px}, Y = 600\text{px}$. Góc bắn chéo lên $135^\circ$ (phạm vi từ $120^\circ \to 150^\circ$).
    *   Vận tốc bắn ban đầu: Cực mạnh $450 \to 600\text{px/s}$.
    *   Gia tốc trọng lực Y: $+300\text{px/s^2}$ (kéo hạt pháo rơi rụng lả tả sau khi đạt đỉnh).
    *   Đặc tính hạt pháo giấy:
        *   Hình dáng: Các hình vuông pixel nhỏ kích thước ngẫu nhiên $3 \times 3\text{px}$ đến $6 \times 6\text{px}$.
        *   Màu sắc ngẫu nhiên chọn từ bảng màu: Neon Cyan `#66fcf1`, Vàng ấm `#f5a623`, Hồng sáng `#ff79c6`, Xanh lá `#2ecc71`.
        *   Tự động xoay quanh tâm liên tục tạo hiệu ứng lấp lánh chao nghiêng trong gió.

### 5.4. Bảng Chúc Mừng Ruy Băng (Victory Ribbon Pop)
*   Một dải ruy băng màu đỏ rực `#e74c3c` chứa dòng chữ `"BẠN ĐÃ ĐẾN TRƯỜNG AN TOÀN!"` rơi từ trên đỉnh màn hình xuống trung tâm.
*   **Tween chuyển động:**
    *   Tọa độ Y ban đầu: $-100\text{px}$ (ngoài màn hình).
    *   Tọa độ Y đích: $220\text{px}$ (căn giữa màn hình $X = 400$).
    *   Thời lượng rơi: $600\text{ms}$.
    *   Ease: `Bounce.easeOut` (hiệu ứng thả rơi tự do nảy tưng tưng như dây cao su cực kỳ bắt mắt).

Tài liệu hoạt ảnh này định hình rõ ràng các thông số cơ học và đồ họa động, giúp đội ngũ kỹ sư lập trình dễ dàng hiện thực hóa cảm giác chơi mượt mà và sinh động nhất cho game.
