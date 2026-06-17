# HỆ THỐNG TRỰC QUAN BẢO HIỂM (INSURANCE VISUAL SYSTEM GUIDE)
## Dự án: Game giáo dục bảo hiểm InsurTech “Đường Đến Trường”

Tài liệu này đặc tả các hướng dẫn thiết kế đồ họa, hiệu ứng hình ảnh (Animations) và logic vẽ Canvas trong Phaser 3 cho hệ thống thẻ bảo hiểm, quy trình yêu cầu bồi thường (Claim), hiệu ứng rơi tiền xu (Coin Drop) và thanh so sánh chi phí trước/sau bảo hiểm.

---

## 1. Thiết Kế Trực Quan 3 Gói Bảo Hiểm (Insurance Card Visuals)

Các gói bảo hiểm được hiển thị dưới dạng thẻ (Cards) xếp ngang trong màn hình chọn. Mỗi gói mang một bản sắc thị giác riêng biệt để người chơi dễ dàng liên tưởng đến mức độ bảo vệ.

```
+-------------------+   +-------------------+   +-------------------+
|   KHÔNG THAM GIA  |   | BH HỌC ĐƯỜNG      |   | BH AN TOÀN DI CHUY|
|  [Lá chắn nứt vỡ] |   | [Lá chắn chữ thập]|   | [Lá chắn Neon-Tia]|
|                   |   |                   |   |                   |
|  Tự chi trả: 100% |   | Y tế: 60%         |   | Y tế: 80%         |
|  Sửa xe: 100%     |   | Sửa xe: 0%        |   | Sửa xe: 60%       |
|                   |   |                   |   |                   |
|   [Chọn gói]      |   |   [Chọn gói]      |   |   [Chọn gói]      |
+-------------------+   +-------------------+   +-------------------+
```

### 1.1. Gói 0: Không tham gia (ID: `none`)
*   **Biểu tượng chính:** Lá chắn nứt đôi (`broken_shield`) màu xám tro, có dấu chấm than cảnh báo màu đỏ chính giữa.
*   **Màu sắc thẻ:**
    *   Nền thẻ: Xám tối `#2b2b2b` với viền xám nhạt `#555555`.
    *   Màu chữ chỉ số: Đỏ xỉn `#c0392b` cho toàn bộ các mục chi phí.
*   **Hiệu ứng thị giác:** Thẻ nằm im lặng, không có hiệu ứng phát sáng hay chuyển động phụ. Khi chọn gói này, màn hình nháy viền đỏ cảnh báo nguy cơ tài chính.

### 1.2. Gói 1: Bảo hiểm Học đường (ID: `basic`)
*   **Biểu tượng chính:** Lá chắn hình tròn màu xanh dương chứa biểu tượng chữ thập y tế màu trắng ở tâm (`medical_shield`).
*   **Màu sắc thẻ:**
    *   Nền thẻ: Xanh dương tối `#1a2536` với đường viền xanh da trời `#3498db`.
    *   Màu chữ chỉ số: Xanh lá cây nhạt cho phần y tế, Đỏ nhạt cho phần sửa xe (không được bảo vệ).
*   **Hiệu ứng thị giác:** Có một vòng hào quang màu xanh nhạt quay nhẹ phía sau biểu tượng lá chắn.

### 1.3. Gói 2: BH An toàn Di chuyển (ID: `mobility`)
*   **Biểu tượng chính:** Lá chắn hình khiên góc cạnh màu Neon Cyan lấp lánh, chứa biểu tượng đôi cánh và bánh xe máy cách điệu (`mobility_shield`).
*   **Màu sắc thẻ:**
    *   Nền thẻ: Xanh Slate đậm `#0f2027` chuyển sắc (Gradient) sang Cyan tối `#203a43`.
    *   Đường viền: Neon Cyan `#66fcf1` dày $3\text{px}$, phát sáng dạng bóng mờ (Glow effect).
    *   Màu chữ chỉ số: Màu vàng hoàng kim `#f1c40f` cho các chỉ số bảo vệ vượt trội.
*   **Hiệu ứng thị giác:** Viền thẻ có hạt sáng lấp lánh (Particle emitter) bay từ dưới lên trên, tạo cảm giác đây là gói bảo hiểm InsurTech công nghệ cao và bảo vệ toàn diện nhất.

---

## 2. Quy Trình Yêu Cầu Bồi Thường & Hiệu Ứng Claim (Claim Flow)

Khi người chơi va chạm với vật cản trên đường, nếu có bảo hiểm hỗ trợ, game sẽ kích hoạt chuỗi hiệu ứng claim tự động 4 bước cực kỳ trực quan và nhanh chóng để xóa bỏ định kiến thủ tục rườm rà:

```
[Tai nạn] ---> [Nháy Camera Chụp Ảnh] ---> [Thoại AI Advisor] ---> [Báo Cáo Claim Duyệt]
```

### Bước 1: Sự Cố Va Chạm (Crash Event)
*   **Hiệu ứng hình ảnh:** Camera game rung mạnh (Screen shake: thời lượng `300ms`, cường độ `0.02`), màn hình chớp màu đỏ nhạt rồi mờ đi. Xe dừng lại lập tức.
*   **Hộp thoại xuất hiện:** AI Advisor bảo hiểm xuất hiện dưới dạng một widget nhỏ góc trên bên phải màn hình: *"Đã phát hiện va chạm! Đang kích hoạt yêu cầu bồi thường..."*

### Bước 2: Chụp Ảnh Hiện Trường (Evidence Capture)
*   **Hiệu ứng:** Một khung ngắm máy ảnh (Camera viewfinder) pixel art màu xanh lá cây nhấp nháy thu nhỏ dần ôm trọn chiếc xe máy bị ngã và vật cản.
*   **Khoảnh khắc chụp:** Màn hình nháy flash trắng xóa trong `100ms`, đi kèm hiệu ứng âm thanh tiếng màn trập máy ảnh cơ (`camera-shutter.wav`) báo hiệu bằng chứng đã được ghi nhận thành công để làm cơ sở bồi thường.

### Bước 3: Đánh Giá Tự Động (AI Processing)
*   **Hiệu ứng:** Trên đầu xe máy hiển thị một thanh tiến trình (Progress Bar) chạy từ $0\% \to 100\%$ với chữ `"Đang kiểm định hồ sơ..."` trong thời gian $1$ giây.
*   **Âm thanh:** Tiếng bíp bíp liên tục của máy tính quét dữ liệu.

### Bước 4: Chấp Thuận Bồi Thường (Approval & Payout)
*   **Hiệu ứng:** Một biểu tượng dấu tích xanh (`checkmark`) lớn màu xanh lá cây hiện lên ở trung tâm màn hình, phóng to từ scale $0 \to 1.2$ rồi co về $1.0$ (hiệu ứng Bounce).
*   **Báo cáo:** Widget hiển thị: *"Yêu cầu bồi thường được DUYỆT! Bảo hiểm hỗ trợ XX% chi phí."* Phát âm thanh chime thành công retro vui tai.

---

## 3. Hiệu Ứng Tiền Rơi & Tổn Thất Tài Chính (Financial Loss & Coin Drop)

Để người chơi cảm nhận rõ ràng "nỗi đau ví tiền" khi gặp sự cố, game sử dụng hiệu ứng rơi tiền xu kết hợp số trừ đỏ trôi nổi.

### 3.1. Hiệu ứng Số Trừ Trôi Nổi (Floating Text Effect)
*   **Logic thực thi:** Khi người chơi bị trừ tiền, một đối tượng Text Phaser được sinh ra ngay tại vị trí đồng xu trên thanh HUD.
*   **Thông số Text:** Nội dung `-XX xu` (ví dụ: `-80 xu`), màu đỏ `#e74c3c`, cỡ chữ `20px`, in đậm, viền đen dày.
*   **Tween Animation:**
    *   Di chuyển hướng lên trên $50\text{px}$ theo trục Y.
    *   Độ phóng đại (Scale) tăng từ $1.0 \to 1.3$ rồi giảm dần.
    *   Độ mờ (Alpha) chuyển từ $1.0 \to 0.0$ trong thời gian $1200\text{ms}$.
    *   Sau đó tự động hủy đối tượng (`destroy()`).

### 3.2. Hiệu ứng Tiền Xu Rơi (Coin Particle Explosion)
*   **Logic:** Đồng thời với số trừ, từ biểu tượng đồng xu HUD sinh ra $5 - 8$ hạt sprite đồng xu vàng rơi tự do xuống dưới.
*   **Vật lý hạt (Particles physics):**
    *   Vận tốc ban đầu theo trục Y âm (phóng ngược lên trên một chút trước khi rơi tự do xuống dưới).
    *   Gia tốc trọng lực Y hướng xuống.
    *   Góc quay xoay ngẫu nhiên từ $0 \to 360^\circ$ tạo hiệu ứng đồng xu lật trong không gian.
    *   Khi rơi chạm mép dưới màn hình, đồng xu nảy lên nhẹ $1$ lần rồi mờ dần và biến mất.

---

## 4. Thanh So Sánh Chi Phí Trước/Sau Chi Trả (Coverage Bars)

Trong màn hình kết quả ngày (ResultScene), game vẽ trực tiếp thanh đồ họa so sánh chi phí để làm nổi bật giá trị bảo hiểm mang lại.

```
TỔNG CHI PHÍ THỰC TẾ: 180 xu
[=================== ĐỎ CẢ THANH: KHÔNG BẢO HIỂM ===================]

CÓ BẢO HIỂM DI CHUYỂN: Người chơi tự trả 60 xu
[==== XANH LÁ (Bảo hiểm trả 120 xu) ====][== ĐỎ (Tự trả: 60 xu) ==]
```

### 4.1. Logic vẽ bằng Phaser Graphics API
*   **Tọa độ cơ bản:** Đặt tại vị trí trung tâm hóa đơn ($X = 250, Y = 380$).
*   **Chiều rộng thanh:** Cố định $300\text{px}$, chiều cao $24\text{px}$.
*   **Vẽ thanh "Nếu không có Bảo hiểm" (Trường hợp so sánh):**
    *   Vẽ hình chữ nhật nền đen mờ viền trắng.
    *   Tô toàn bộ màu Đỏ `#e74c3c` từ chiều rộng $0 \to 300\text{px}$ để đại diện cho việc tự gánh chịu $100\%$ chi phí.

*   **Vẽ thanh "Khi có Bảo hiểm" (Trường hợp thực tế):**
    *   Tính toán tỷ lệ phần trăm được bảo hiểm chi trả:
        $$CoverageRatio = \frac{CoveredCost}{TotalCost}$$
    *   **Phân đoạn 1 (Bảo hiểm chi trả):** Vẽ hình chữ nhật màu Xanh lá `#2ecc71` từ vị trí $X = 250$ đến chiều rộng $300 \times CoverageRatio$.
    *   **Phân đoạn 2 (Tự chi trả):** Vẽ hình chữ nhật màu Đỏ `#e74c3c` bắt đầu từ điểm kết thúc của phân đoạn 1 đến hết thanh ($300\text{px}$).
    *   **Nhãn hiển thị (Labels):**
        *   Text đặt phía trên thanh màu Xanh lá: `"Bảo hiểm hỗ trợ: -120 xu"` (`14px`, màu Xanh lá).
        *   Text đặt phía trên thanh màu Đỏ: `"Tự trả: 60 xu"` (`14px`, màu Đỏ).

Sự phân bổ trực quan rõ nét bằng thanh màu này giúp người chơi lập tức nhận ra giá trị kinh tế thực tế của việc bỏ ra $30$ hoặc $70$ xu mua bảo hiểm trước đó so với tổn thất nặng nề khi đi "xe trần" không bảo vệ.
