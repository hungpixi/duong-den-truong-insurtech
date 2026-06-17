# LUỒNG TRẢI NGHIỆM MÀN HÌNH MVP (MVP SCREEN FLOW) — ĐƯỜNG ĐẾN TRƯỜNG

Tài liệu này đặc tả chi tiết thứ tự hiển thị, bố cục nút bấm, logic chuyển dịch trạng thái (State Transition), cơ chế lưu trữ (`localStorage`) và các điểm kích hoạt rủi ro từ lúc mở game đến khi chuyển đổi O2O thực tế.

---

## 1. SƠ ĐỒ ĐIỀU HƯỚNG TỔNG QUAN (SCREEN FLOW OVERVIEW)

Game vận hành theo một vòng lặp tuần hoàn 5 ngày học của An. Mỗi ngày bao gồm các phân cảnh chuyển tiếp sau:

```
           [ MÀN HÌNH MENU CHÍNH (MainMenuScene) ]
                             |
         +-------------------+-------------------+
         | (Bắt đầu ngày 1)                      | (Tiếp tục hành trình)
         v                                       v
[Đọc dữ liệu mới]                      [Đọc localStorage]
         |                                       |
         +-------------------+-------------------+
                             |
                             v
      [ MÀN HÌNH CHỌN BẢO HIỂM (InsuranceSelectScene) ]
                             | (Bắt đầu di chuyển)
                             v
           [ MÀN HÌNH NHÀ CỦA AN (HomeScene) ]
                             | (Dắt xe máy khởi hành)
                             v
          [ PHÂN CẢNH ĐƯỜNG ĐI (RoadScene - Pseudo-3D) ]
                             | (Có sự cố / Claim / Đụng độ)
                             v
           [ MÀN HÌNH KẾT QUẢ NGÀY (ResultScene) ]
                             |
         +-------------------+-------------------+
         | (Nếu dưới Ngày 5)                     | (Nếu hoàn thành Ngày 5)
         v                                       v
[Ghi đè localStorage]                  [ MÀN HÌNH THẮNG CUỘC (VictoryScene) ]
[Tăng số Ngày lên 1]                             |
         |                                       v
         +--> (Quay lại Chọn Bảo hiểm)        [ quét mã QR MoMo - Nhận Quà O2O ]
```

---

## 2. ĐẶC TẢ CHI TIẾT TỪNG MÀN HÌNH & BỐ CỤC (SCENE DETAILS)

### 2.1. Màn hình Menu chính (MainMenuScene)
*   **Giao diện trực quan:** Logo game pixel lớn `"ĐƯỜNG ĐẾN TRƯỜNG"`, có mây trôi và tia nắng xiên retro ở nền sau.
*   **Các nút tương tác:**
    1.  *Bắt đầu chơi:* Reset toàn bộ dữ liệu trạng thái (về ngày 1, HP 100, coin 500, safety 100), xóa `localStorage`, chuyển tới `InsuranceSelectScene`.
    2.  *Tiếp tục hành trình:* Chỉ sáng lên khi phát hiện key `duongdentruong_save` trong `localStorage`. Đọc dữ liệu đã lưu để tiếp tục ngày tiếp theo.
    3.  *Bài học bảo hiểm:* Mở ra một popup hiển thị bộ cẩm nang luật giao thông và quyền lợi bảo hiểm GAIP Care dưới dạng thẻ lật pixel-art.
*   **Hiệu ứng chuyển cảnh:** Bấm nút chơi -> Rung nhẹ màn hình kèm tiếng nổ máy xe -> Màn hình mờ dần (Fade out) trong $500\text{ms}$ sang màn hình Chọn Bảo Hiểm.

### 2.2. Màn hình Chọn bảo hiểm (InsuranceSelectScene)
*   **Bối cảnh:** Bàn học của An vào sáng sớm, hiển thị 3 chiếc thẻ bảo hiểm trên bàn.
*   **Thao tác lựa chọn:** Người chơi rê chuột/chạm tay vào 3 thẻ:
    *   *Gói 0 (Không bảo hiểm):* Phí 0 xu. Hiển thị cảnh báo: *"Tự gánh chịu 100% rủi ro tài chính!"*. Viền xám tối.
    *   *Gói 1 (BH Học đường):* Phí 30 xu. Hỗ trợ 60% chi phí y tế, 0% sửa xe. Viền xanh dương.
    *   *Gói 2 (BH An toàn Di chuyển):* Phí 70 xu. Hỗ trợ 80% y tế, 60% sửa xe, có cứu hộ. Viền cyan neon phát sáng hạt.
*   **Xác nhận:** Chọn gói xong bấm nút `"BẮT ĐẦU DI CHUYỂN"`. Hệ thống trừ tiền xu phí mua bảo hiểm ngay lập tức và lưu cờ gói bảo hiểm hoạt động (`activeInsuranceId = 'basic' / 'mobility' / 'none'`).

### 2.3. Màn hình Nhà của An (HomeScene)
*   **Bối cảnh:** Cảnh 2D góc nhìn ngang (side-view) phòng khách nhà ống của An.
*   **Logic hội thoại (Visual Novel):**
    *   Mẹ khuyên dặn An về ngày đi học (Nội dung thay đổi theo cốt truyện ngày 1-5).
    *   Đưa ra các lựa chọn đệm (ví dụ ngày 1: đội mũ bảo hiểm chuẩn hay mũ lưỡi trai; ngày 2: chọn áo mưa bộ hay áo cánh dơi).
*   **Chuyển cảnh:** Hội thoại kết thúc -> An bước ra cửa chính trèo lên xe Wave đỏ -> Camera di chuyển trượt chéo xuống dưới góc nhìn của RoadScene.

### 2.4. Phân cảnh Đường đi học (RoadScene - Pseudo-2.5D)
*   **Bối cảnh di chuyển:** Xe máy của An chạy thẳng hướng về chân trời, mặt đường nhựa và nhà cửa trôi parallax chéo sang hai bên.
*   **Hệ thống HUD luôn hiển thị:**
    *   Thanh HP đỏ có icon trái tim, hiển thị text số lượng máu.
    *   Thanh số dư xu vàng có icon coin nhấp nháy.
    *   Thanh điểm an toàn giao thông (`Safety Score`).
    *   Nhãn hiển thị gói bảo hiểm đang kích hoạt ở góc phải (Chữ màu đỏ `"CHƯA BẢO VỆ"` nếu chọn Gói 0; chữ màu xanh lá `"ĐÃ BẢO VỆ"` kèm tên gói nếu chọn Gói 1/2).
*   **Trình kích hoạt sự cố (Z-trigger Events):** Khi xe đạt tọa độ sâu $z$ nhất định, game dừng cuộn nền và hiển thị Menu lựa chọn quyết định VN Choices:
    *   *Ví dụ:* Gặp xe lách ẩu -> Lựa chọn: 1. Giảm tốc nhường đường (Mất 3s thời gian, +10 an toàn); 2. Tăng ga lách qua trước đầu xe (Rủi ro cao - Nhấp nháy đỏ nút, nếu bấm sẽ ngã xe ngẫu nhiên hoặc bị phạt).
*   **Va chạm và Claim Flow:** Nếu chọn phương án rủi ro dẫn đến va chạm xe đẩy hàng rong (ngày 3) hoặc ô tô mở cửa (ngày 4):
    1.  Kích hoạt hoạt ảnh ngã xe, camera rung giật, màn hình nháy đỏ.
    2.  Nếu đã mua bảo hiểm: Bật hiệu ứng Claim 4 bước (Viewfinder camera -> nháy flash màn trập -> thanh tiến trình AI kiểm định -> Phê duyệt tích xanh -> Cộng tiền bồi thường trôi nổi).
    3.  Chuyển sang ResultScene sau khi kết thúc chuỗi sự kiện.

### 2.5. Màn hình Kết quả và Hóa đơn ngày (ResultScene)
*   **Bố cục:** Bảng hóa đơn tài chính retro in trên nền giấy màu kem.
*   **Nội dung chi tiết hóa đơn dòng kẻ chấm:**
    *   Số dư ban đầu: `500 xu`.
    *   Phí y tế phát sinh: `100 xu` (Đỏ) — chỉ hiện nếu có chấn thương.
    *   Phí sửa xe phát sinh: `80 xu` (Đỏ) — chỉ hiện nếu có hỏng xe.
    *   Bảo hiểm bồi thường hỗ trợ: `-128 xu` (Xanh lá) — chỉ hiện nếu đã mua Gói 1 hoặc Gói 2.
    *   Số dư thực lĩnh còn lại: `392 xu` (In to đậm).
*   **Đồ thị so sánh Coverage Bars:** Vẽ ngay dưới hóa đơn để so sánh trực quan dòng tiền (Thanh đỏ lòm tự gánh 180 xu vs Thanh xanh lá/đỏ được bảo hiểm gánh 128 xu).
*   **Nút chuyển đổi:** Bấm `"QUAY LẠI MENU"` hoặc `"ĐI TIẾP NGÀY MAI"` (Lưu dữ liệu sang localStorage, chuyển sang ngày tiếp theo).

### 2.6. Màn hình Thắng cuộc & QR MoMo (VictoryScene)
*   **Bối cảnh:** Tiếng pháo hoa nổ lả tả, ruy băng chiến thắng rơi trước cổng trường UEH.
*   **Số liệu tổng kết:**
    *   Điểm An toàn Giao thông tích lũy (Safety Score).
    *   Điểm Hiểu biết Bảo hiểm (Insurance Literacy Score).
*   **Điểm chuyển đổi O2O (Phễu MoMo):**
    *   Hiển thị chứng nhận tốt nghiệp khóa học lái xe an toàn ảo.
    *   Hiển thị mã QR Code lớn thu hút sự chú ý.
    *   *Lời kêu gọi hành động (Call-To-Action):* **"Quét QR thanh toán Bảo hiểm GAIP Care thật (Chỉ 90.000đ/năm) — Nhận ngay 01 mũ bảo hiểm 3/4 chính hãng UEH tại Booth sự kiện!"**

---

## 3. CƠ CHẾ QUẢN LÝ TRẠNG THÁI & LƯU TRỮ (STATE MANAGEMENT)

### 3.1. Cấu trúc đối tượng Trạng thái Toàn cục (Global State)
```json
{
  "day": 1,
  "health": 100,
  "coins": 500,
  "safety_score": 100,
  "insurance_literacy_score": 0,
  "active_insurance_id": "none"
}
```

### 3.2. Quy tắc Lưu trữ `localStorage`
*   **Key lưu trữ:** `duongdentruong_save`.
*   **Khi click "Bắt đầu chơi" (MainMenu):** Chạy `localStorage.removeItem('duongdentruong_save')`.
*   **Khi kết thúc một ngày (ResultScene, bấm "Đi tiếp ngày mai"):**
    Ghi đè đối tượng State mới nhất vào localStorage:
    ```javascript
    const nextState = {
        day: currentState.day + 1,
        health: currentState.health,
        coins: currentState.coins,
        safety_score: currentState.safety_score,
        insurance_literacy_score: currentState.insurance_literacy_score,
        active_insurance_id: "none" // Reset bảo hiểm vào đầu ngày mới
    };
    localStorage.setItem('duongdentruong_save', JSON.stringify(nextState));
    ```
*   **Khi click "Tiếp tục" (MainMenu):** Đọc dữ liệu bằng `JSON.parse(localStorage.getItem('duongdentruong_save'))` rồi gọi scene tương ứng với Ngày hiện tại.
