# THIẾT KẾ CƠ CHẾ GAMEPLAY & CÔNG THỨC TÍNH TOÁN (GAMEPLAY LOGIC)

Tài liệu này định nghĩa chi tiết cấu trúc trạng thái người chơi, ảnh hưởng của các hành động chuẩn bị, sự khác biệt giữa lá chắn an toàn và bảo hiểm tài chính, các công thức tính toán thiệt hại, điều kiện phân định kết cục (Endings), và định hướng cập nhật danh sách việc cần làm (Checklist).

---

## 1. CẤU TRÚC TRẠNG THÁI NGƯỜI CHƠI (PLAYER STATE SCHEMA)

Trạng thái của người chơi được lưu trữ tập trung tại `gameState` ở root level để Phaser và các hệ thống phụ trợ dễ dàng truy xuất:

```json
{
  "loopCount": 1,
  "horrorLevel": 0,
  "currentTime": "6:50",
  "colorPercentage": 100,
  "coin": 150,
  "hasTalkedToMom": false,
  "hasHelmet": false,
  "hasCheckedBike": false,
  "hasReadInsurance": false,
  "selectedInsurancePackage": "none",
  "accidentHistory": [],
  "endingState": "none"
}
```

### Chi tiết các thuộc tính:
- `loopCount` (int): Vòng lặp hiện tại (bắt đầu từ 1).
- `horrorLevel` (int): Mức độ kinh dị/bất ổn của thế giới (0 đến 5, tăng theo số vòng lặp).
- `currentTime` (string): Thời gian hiển thị trên đồng hồ (mặc định luôn là `"6:50"`, chuyển sang `"6:51"` khi đạt Ending 3).
- `colorPercentage` (int): Tỷ lệ màu sắc của thế giới (0% - Xám xịt hoàn toàn, 100% - Rực rỡ ánh nắng sớm). Thay đổi dựa trên hành động lái xe an toàn và trang bị bảo hiểm.
- `coin` (int): Ví tiền tài chính của người chơi (bắt đầu với 150 xu). Chạm ngưỡng $\le 0$ xu sẽ dẫn đến phá sản.
- `hasTalkedToMom` (bool): Đã chào tạm biệt Mẹ trước khi xuất phát.
- `hasHelmet` (bool): Đã nhặt và đội mũ bảo hiểm màu đỏ ở góc phòng.
- `hasCheckedBike` (bool): Đã kiểm tra phanh và lốp chiếc xe máy.
- `hasReadInsurance` (bool): Đã tương tác xem thông tin các gói bảo hiểm tại bàn làm việc.
- `selectedInsurancePackage` (string): Gói bảo hiểm đã mua hôm nay (`"none"`, `"red_helmet"`, `"old_bike"`, hoặc `"school_route"`).
- `accidentHistory` (array): Mảng lưu trữ nhật ký va quẹt và bồi thường trên đường lớn.
- `endingState` (string): Trạng thái kết thúc game (`"none"`, `"ending1_bankrupt"`, `"ending2_closed_gate"`, hoặc `"ending3_open_gate"`).

---

## 2. PHÂN TÁCH LÁ CHẮN AN TOÀN VÀ BẢO HIỂM TÀI CHÍNH

Điểm cốt lõi của gameplay là giúp người học nhận thức rõ sự khác biệt giữa hai lớp bảo vệ:

```
+-----------------------------------------------------------------------+
|                        CÁC LỚP BẢO VỆ HÀNH TRÌNH                      |
+-----------------------------------------------------------------------+
| 1. LÁ CHẮN AN TOÀN CHỦ ĐỘNG           | 2. LÁ CHẮN TÀI CHÍNH THỤ ĐỘNG |
| (Trang bị & Lái xe cẩn thận)          | (Hợp đồng Bảo hiểm)          |
| -> Giảm thiểu mức độ tổn thất thực tế | -> Đền bù thiệt hại tài chính |
+-----------------------------------------------------------------------+
```

1. **Lớp bảo vệ chủ động (Lá chắn An toàn):**
   - **Đội mũ bảo hiểm (`hasHelmet`):** Giảm chấn thương phần đầu $\rightarrow$ Giảm **50% chi phí Y tế cơ bản** của mọi tai nạn.
   - **Bảo dưỡng phanh lốp (`hasCheckedBike`):** Phòng tránh hỏng hóc nặng $\rightarrow$ Giảm **50% chi phí Sửa xe cơ bản** của mọi tai nạn.
   - **Lái xe cẩn thận (Lựa chọn `safe` trên đường):** Tránh được xung đột lớn $\rightarrow$ Giảm đáng kể cả chi phí Y tế và Sửa xe cơ bản, đồng thời tăng điểm màu sắc `colorPercentage` (+10%).
   - **Lái xe liều lĩnh (Lựa chọn `danger` trên đường):** Nhận trọn vẹn tổn thất cơ bản và bị trừ nặng điểm màu sắc (-20%).

2. **Lớp bảo vệ thụ động (Bảo hiểm Tài chính):**
   - Bảo hiểm không ngăn chặn tai nạn xảy ra, nhưng sẽ chi trả (Cover) một phần hoặc toàn bộ chi phí phát sinh sau khi đã áp dụng các giảm trừ an toàn.
   - Giúp bảo toàn số dư ví tiền (`coin`) của học sinh, ngăn ngừa nguy cơ phá sản.

---

## 3. CÔNG THỨC TÍNH TOÁN KẾT QUẢ TAI NẠN (OUTCOME FORMULAS)

Mỗi sự cố va chạm tại 3 địa điểm trên đường (`hem_nho`, `cho_sang`, `nga_tu`) được giải quyết theo quy trình 4 bước toán học chặt chẽ:

### Bước 1: Xác định Chi phí Tổn thất Cơ bản (Base Costs)
Dựa vào địa điểm và hành vi lái xe của người chơi:

| Địa điểm | Lựa chọn Lái xe | Y tế cơ bản ($C_{\text{med}}$) | Sửa xe cơ bản ($C_{\text{rep}}$) | Mô tả sự kiện |
| :--- | :---: | :---: | :---: | :--- |
| **Hẻm Nhỏ** | `safe` | 10 | 10 | Đi chậm rà phanh qua ổ gà |
| | `danger` | 40 | 40 | Phóng nhanh sụp ổ gà sâu hoắm |
| **Chợ Sáng** | `safe` | 5 | 15 | Phanh gấp lách tránh xe hàng rong lùi |
| | `danger` | 30 | 50 | Rồ ga lách qua xe hàng rong va quẹt |
| **Ngã Tư** | `safe` | 0 | 10 | Tránh xe tải lấn làn sát lề |
| | `danger` | 80 | 80 | Cố vượt đèn vàng bị đụng trực diện |

### Bước 2: Khấu trừ do chuẩn bị An toàn (Safety Reduction)
Áp dụng giảm trừ chủ động nếu người chơi có trang bị an toàn:
$$C'_{\text{med}} = C_{\text{med}} - R_{\text{safety\_med}}$$
$$C'_{\text{rep}} = C_{\text{rep}} - R_{\text{safety\_rep}}$$

Trong đó:
- $R_{\text{safety\_med}} = \text{Math.round}(C_{\text{med}} \times 0.5)$ nếu `hasHelmet` là `true`.
- $R_{\text{safety\_rep}} = \text{Math.round}(C_{\text{rep}} \times 0.5)$ nếu `hasCheckedBike` là `true`.

### Bước 3: Chi trả của Bảo hiểm (Insurance Coverage)
Dựa trên gói bảo hiểm hành trình đã mua (`selectedInsurancePackage`):

| Gói Bảo hiểm | Tỷ lệ Y tế ($Cov_{\text{med}}$) | Tỷ lệ Sửa Xe ($Cov_{\text{rep}}$) | Số tiền Bảo hiểm chi trả |
| :--- | :---: | :---: | :--- |
| **Không tham gia** (`none`) | 0.0 (0%) | 0.0 (0%) | $Cov_{\text{med\_pay}} = 0$<br>$Cov_{\text{rep\_pay}} = 0$ |
| **Gói Mũ Đỏ** (`red_helmet`) | 1.0 (100%) | 0.0 (0%) | $Cov_{\text{med\_pay}} = C'_{\text{med}}$<br>$Cov_{\text{rep\_pay}} = 0$ |
| **Gói Xe Cũ** (`old_bike`) | 0.0 (0%) | 1.0 (100%) | $Cov_{\text{med\_pay}} = 0$<br>$Cov_{\text{rep\_pay}} = C'_{\text{rep}}$ |
| **Đường Đến Trường** (`school_route`) | 0.8 (80%) | 0.8 (80%) | $Cov_{\text{med\_pay}} = \text{Math.round}(C'_{\text{med}} \times 0.8)$<br>$Cov_{\text{rep\_pay}} = \text{Math.round}(C'_{\text{rep}} \times 0.8)$ |

### Bước 4: Chi phí Tự chi trả cuối cùng (Net Out-of-pocket Cost)
Số coin thực tế khấu trừ từ ví của người chơi:
$$\text{Net Medical} = C'_{\text{med}} - Cov_{\text{med\_pay}}$$
$$\text{Net Repair} = C'_{\text{rep}} - Cov_{\text{rep\_pay}}$$
$$\text{Net Cost} = \text{Net Medical} + \text{Net Repair}$$

Ví tiền mới của người chơi:
$$\text{coin}_{\text{new}} = \text{coin}_{\text{old}} - \text{Net Cost}$$

---

## 4. XÁC ĐỊNH NGƯỠNG PHÂN LOẠI KẾT THÚC (ENDING THRESHOLDS)

Kết cục hành trình đi học lúc 7:00 kém 10 được chia thành 3 kết cục chính rõ ràng dựa trên trạng thái tích lũy:

### 1. Kết cục 1: Phá sản & Bị kẹt trong hư vô (Bad Ending - Bankruptcy)
- **Điều kiện kích hoạt:** Số dư ví $\text{coin} \le 0$ ngay sau bất kỳ vụ tai nạn nào trên đường.
- **Biểu hiện:** Người chơi không thể tiếp tục hành trình, màn hình tối đen, hóa đơn nợ linh hồn hiện ra. Hệ thống kích hoạt quay ngược thời gian về Vòng lặp 1 và reset toàn bộ tiến trình.

### 2. Kết cục 2: Cổng trường đóng chặt (Partial Success - Closed Gate)
- **Điều kiện kích hoạt:** Người chơi đến được cổng trường UEH ($\text{distanceTravelled} \ge 1200\text{m}$) và ví $\text{coin} > 0$, nhưng thiếu ít nhất một trong các điều kiện an toàn/bảo hiểm toàn diện.
- **Biểu hiện:** Đồng hồ vẫn dừng lại ở 6:50 sáng. Cổng trường đóng chặt rêu phong. Học sinh nhận ra chuẩn bị sơ sài không thể giúp mình thoát khỏi lời nguyền rủi ro. Bấm nút để bắt đầu vòng lặp tiếp theo với mức độ kinh dị `horrorLevel` tăng lên.

### 3. Kết cục 3: Cổng trường rộng mở (Perfect Ending - Open Gate)
- **Điều kiện kích hoạt:**
  - Đi qua tối thiểu 2 vòng lặp (`loopCount` $\ge 2$).
  - Đã chuẩn bị đầy đủ thiết bị an toàn chủ động: `hasHelmet` là `true` VÀ `hasCheckedBike` là `true`.
  - Đăng ký gói bảo hiểm toàn diện cao cấp: `selectedInsurancePackage` là `"school_route"`.
  - Ví tài chính vẫn còn tiền: $\text{coin} > 0$.
- **Biểu hiện:** Đồng hồ tích tắc chuyển sang **6:51 sáng**, cổng trường mở ra, ánh nắng ấm áp xua tan sương mù rỉ sét. Bạn đã hóa giải hoàn toàn vòng lặp!

---

## 5. CẢI TIẾN GIAO DIỆN LỜI DẶN MẸ ĐỂ LẠI (CHECKLIST DESIGN)

Thay vì hiển thị các đầu mục khô khan như một bảng kiểm thử gỡ lỗi (debug task list), giao diện checklist ở góc phải màn hình được thiết kế dưới dạng một mảnh giấy ghi chú đặt trên bàn học sinh với nét bút ấm áp của người Mẹ:

- **Tiêu đề mảnh giấy:** `"MẸ DẶN SÁNG NAY ❤"` (Muted gold notebook paper style)
- **Danh sách lời dặn:**
  - `[ ] Ôm chào tạm biệt Mẹ trước khi đi học` (Nói chuyện với Mẹ)
  - `[ ] Đội mũ bảo hiểm đỏ của con ở góc phòng` (Đội mũ bảo hiểm)
  - `[ ] Bóp phanh và kiểm tra kỹ lốp xe` (Kiểm tra phanh/lốp)
  - `[ ] Chuẩn bị Thẻ Bảo hiểm an tâm đến trường` (Đăng ký bảo hiểm)

Khi hoàn thành mỗi đầu mục, dấu gạch chéo thô ráp `[x]` sẽ được đổi thành biểu tượng tích hoa hồng hoặc tích lá cây cổ điển đầy trực quan, chuyển màu xanh lá cây ấm áp để tạo động lực hoàn thành chuẩn bị hành trình.
