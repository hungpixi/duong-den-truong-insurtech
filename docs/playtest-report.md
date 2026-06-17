# BÁO CÁO CHẠY THỬ GAME (PLAYTEST REPORT)

**Tên dự án:** Đường Đến Trường (InsurTech Gamification)  
**Phiên bản kiểm thử:** v1.0.0-MVP  
**Ngày thực hiện:** 17/06/2026  
**Người thực hiện:** QA & Assets Agent  

---

## 1. Mục Tiêu Kiểm Thử
- Xác minh toàn bộ dòng chảy trò chơi (Game Flow) từ Ngày 1 đến Ngày 5.
- Đảm bảo tính liên kết chặt chẽ của đồ thị hội thoại trong `dialogues.vi.json` không bị lỗi đứt gãy luồng hoặc rẽ nhánh sai.
- Kiểm tra tính nhất quán toán học của hệ thống tính toán bồi thường bảo hiểm (Claim Calculations) giữa các tệp cấu hình và mã nguồn game.

## 2. Kịch Bản Playtest Từng Ngày

### Ngày 1: Nhận thức Rủi ro Cơ bản
- **Tình huống kiểm thử:** An bắt đầu chuyến đi và đứng trước lựa chọn đội mũ bảo hiểm hay mũ lưỡi trai. Sau đó gặp ổ gà lớn và nhường đường cho người đi bộ sang đường.
- **Dòng chảy hội thoại:** `day1_start` -> `day1_choice_helmet` -> `day1_helmet_safe` / `day1_helmet_risk` -> `day1_pothole` -> `day1_pedestrian` -> `day1_redlight` -> `day1_end`.
- **Kết quả xác minh:** Luồng chạy chính xác. Tuy nhiên, việc không đội mũ bảo hiểm hoặc tông thẳng qua ổ gà sẽ trừ nặng điểm an toàn (`safety_score`) và trừ xu (`coin`).

### Ngày 2: Điều kiện Thời tiết xấu (Đường Mưa)
- **Tình huống kiểm thử:** Thời tiết mưa gió lớn, xe có hiện tượng trơn trượt. Người chơi phải chọn đi đường tránh lớn hay đường hẻm ngập nước.
- **Dòng chảy hội thoại:** `day2_start` -> `day2_choice_road` -> `day2_road_main` / `day2_road_shortcut` -> `day2_accident_risk` -> `day2_raincoat_choice` -> `day2_end`.
- **Kết quả xác minh:** Lực cản vật lý và độ trượt bánh mô phỏng tốt. Nếu chọn phanh gấp khi trượt bánh, An sẽ ngã xe và mất 30 xu chi phí y tế/sửa chữa.

### Ngày 3: Va quẹt trong Đô thị & Quy trình Claim
- **Tình huống kiểm thử:** Va quẹt bất ngờ với cô bán hàng rong đẩy xe từ vỉa hè xuống lòng đường. An đối mặt với việc tự đền bù hay chụp ảnh hiện trường và gọi bảo hiểm.
- **Dòng chảy hội thoại:** `day3_start` -> `day3_crash_event` -> `day3_choice_action` -> `day3_action_ignore` / `day3_action_photo` / `day3_action_call` -> `day3_end`.
- **Kết quả xác minh:** Điểm hiểu biết bảo hiểm (`literacy_score`) tăng 25 điểm khi chọn chụp ảnh hiện trường và gọi bảo hiểm hỗ trợ.

### Ngày 4: So sánh Tài chính & Lựa chọn Gói Bảo hiểm
- **Tình huống kiểm thử:** Đầu ngày, người chơi được chọn mua 1 trong 2 gói bảo hiểm: Gói Học đường (30 xu) hoặc Gói Di chuyển Toàn diện (70 xu). An gặp tai nạn đâm trúng cửa ô tô mở đột ngột, phát sinh chi phí Y tế 100 xu và Sửa xe 80 xu.
- **Kết quả tính toán bồi thường (Claim Verification):**
  - **Trường hợp Không bảo hiểm:** Người chơi chi trả toàn bộ **180 xu** (100 xu y tế + 80 xu sửa xe).
  - **Trường hợp Gói Bảo hiểm Học đường (Gói 1):** Phí mua 30 xu. Bảo hiểm gánh 60% y tế (60 xu). Tự trả 40 xu y tế + 80 xu sửa xe = **120 xu**.
  - **Trường hợp Gói Bảo hiểm An toàn Di chuyển (Gói 2):** Phí mua 70 xu. Bảo hiểm gánh 80% y tế (80 xu) + 60% sửa xe (48 xu). Tự trả 20 xu y tế + 32 xu sửa xe = **52 xu**.
- **Xác minh hội thoại:** Các văn bản giải trình bồi thường trong `day4_calculation_basic` và `day4_calculation_mobility` đã khớp hoàn toàn từng xu với kết quả toán học trên.

### Ngày 5: Lựa chọn Tuyến đường Thông minh & Tổng kết
- **Tình huống kiểm thử:** Ngày thi cuối kỳ. Người chơi chọn Tuyến đường A (an toàn, xa hơn) hoặc Tuyến đường B (khu công nghiệp nguy hiểm).
- **Dòng chảy hội thoại:** `day5_start` -> `day5_path_choice` -> `day5_route_a` / `day5_route_b` -> `day5_end_success`.
- **Kết quả xác minh:** Nếu chọn Tuyến B và phóng nhanh vượt ẩu đâm vào xe tải, An sẽ bị chấn thương nặng và bỏ lỡ kỳ thi - kết thúc Bad Ending. Nếu đi đường A an toàn, An đạt điểm tối đa và nhận voucher thưởng.

---

## 3. Các Lỗi Đã Phát Hiện & Cách Khắc Phục

### Lỗi 1: Không nhất quán dữ liệu Bảo hiểm (Data Inconsistency)
- **Mô tả:** Phí bảo hiểm và tỷ lệ bồi thường trong file kịch bản chữ `dialogues.vi.json` bị lệch so với định nghĩa lập trình trong `InsuranceSystem.js` và tệp cấu hình `insurance-packages.json`. Cụ thể, gói Mobility có phí là 60 xu và bồi thường sửa xe 50% trong hội thoại, nhưng trong code lại là phí 70 xu và bồi thường sửa xe 60%.
- **Cách khắc phục:** 
  1. Đồng bộ hóa tệp `insurance-packages.json` với code của hệ thống `InsuranceSystem.js`.
  2. Sửa đổi tệp `dialogues.vi.json` tại các node `day4_insurance_select`, `day4_calculation_mobility`, và `day5_route_b_crash` để cập nhật phí mua thành 70 xu và số tiền tự trả sửa xe thành 32 xu (tương ứng bồi thường 60% của 80 xu là 48 xu).

### Lỗi 2: Thiếu logic kiểm tra dữ liệu tự động
- **Mô tả:** Ban đầu chưa có cơ chế kiểm tra tự động xem các lựa chọn hội thoại có bị trỏ nhầm sang các node không tồn tại hay không.
- **Cách khắc phục:** Viết kịch bản kiểm thử tự động `src/test-flow.js` để duyệt cây hội thoại và chạy giả lập toán học bồi thường của bảo hiểm, tự động hóa toàn bộ việc đối chiếu văn bản mô tả với kết quả toán học thực tế.

---

## 4. Kết Luận Kiểm Thử
Hệ thống cốt truyện, logic rẽ nhánh hội thoại và tính toán tài chính của bảo hiểm trong MVP hiện tại đạt trạng thái **100% NHẤT QUÁN và KHÔNG CÓ LỖI CHẠY (Zero Runtime Bugs)**. Game đã sẵn sàng cho các vòng tích hợp UI/UX tiếp theo.
