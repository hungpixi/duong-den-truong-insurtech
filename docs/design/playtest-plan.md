# KẾ HOẠCH CHẠY THỬ GAME (PLAYTEST PLAN)
## Dự án: Game O2O Slice-of-life Kỳ Ảo “7 Giờ Kém 10”

Tài liệu này đặc tả chi tiết kế hoạch, phân bổ thời gian, mục tiêu thử nghiệm và chỉ số thành công cho các buổi chạy thử game (Playtest) trực tiếp tại booth sự kiện cổng trường đại học (thử nghiệm trên tệp sinh viên UEH và người chơi trẻ tuổi từ 16-25).

---

## 1. Cấu Trúc Playtest & Phân Bổ Thời Gian (5-Minute Playtest Structure)

Mỗi phiên playtest được thiết kế gói gọn trong đúng **5 phút** nhằm tối ưu hóa khả năng tập trung của sinh viên và tăng số lượng mẫu khảo sát thu được trong một ngày sự kiện O2O tại cổng trường.

| Thời gian | Giai đoạn | Hoạt động chi tiết | Người phụ trách |
| :--- | :--- | :--- | :--- |
| **Phút 0 - 0.5**<br>(30 giây) | **Thiết lập & Giới thiệu** | - CTV hướng dẫn người chơi quét mã QR trên standee để truy cập Web Game trên di động.<br>- Giới thiệu nhanh 15 giây: *"Bạn sẽ đóng vai An bị kẹt trong vòng lặp thời gian kỳ ảo lúc 7 giờ kém 10 sáng (6:50 AM). Bạn cần chọn mua gói bảo hiểm phù hợp, lái xe an toàn dưới mưa bóng mây lấp lánh để giữ gìn sắc màu rực rỡ cho thế giới và đến trường đúng 7:00 AM."* | PG / CTV tại booth |
| **Phút 0.5 - 3.5**<br>(3 phút) | **Trải nghiệm Game** | - Người chơi tự do trải nghiệm 3 vòng lặp cốt truyện.<br>- **Vòng lặp 1 (Mất màu):** Xuất phát lúc 6:50 AM. Lái xe qua **Hẻm Nhỏ** -> Sụp ổ gà sâu hoắm -> Chấn thương y tế (50 xu) & hỏng xe (30 xu) -> Không bảo hiểm, tự trả 80 xu -> Thế giới mất màu xám xịt và quay về 6:50 AM.<br>- **Vòng lặp 2 (Mưa Bóng Mây):** Xuất phát lúc 6:50 AM. Mưa bóng mây lấp lánh cầu vồng rơi nhẹ. Qua **Chợ Sáng** nhộn nhịp -> Va quẹt xe hàng rong -> Y tế (20 xu) & sửa xe (60 xu) -> Không bảo hiểm, tự trả 80 xu -> Reset về 6:50 AM. Nhận Cuốn Sổ Tay An Toàn phát sáng.<br>- **Vòng lặp 3 (Sắc Màu Trở Lại):** Xuất phát lúc 6:50 AM. An trang bị gói bảo hiểm **school_route** (Gói Đường Đến Trường - 30 xu) làm lá chắn tài chính. Đi qua **Ngã Tư** rực rỡ -> Va chạm xe máy lấn làn -> Tổn thất lớn (Y tế 100 xu, Sửa xe 120 xu).<br>- Nhờ **Gói Đường Đến Trường**: Bảo hiểm chi trả 80% y tế (80 xu) & 80% sửa xe (96 xu), An chỉ tự trả 44 xu (y tế 20, xe 24) -> Claim 1 chạm khôi phục sắc màu rực rỡ, An đến cổng trường đúng lúc 7:00 AM và phá vỡ vòng lặp thành công! | Người chơi tự trải nghiệm |
| **Phút 3.5 - 4.5**<br>(1 phút) | **Khảo sát Trực tuyến** | - Người chơi quét mã QR thứ 2 dẫn tới Biểu mẫu khảo sát (User Feedback Form).<br>- Điền nhanh đánh giá về Gameplay kỳ ảo, cơ chế Color Meter mất màu, tính trực quan của hóa đơn Ledger và giá trị thực tế của các gói bảo hiểm. | Người chơi tự điền |
| **Phút 4.5 - 5**<br>(30 giây) | **Phỏng vấn Nhanh & Phát Quà** | - CTV hỏi nhanh cảm tưởng về trải nghiệm claim bảo hiểm và sự chênh lệch chi phí trên Ledger giữa việc có và không có bảo hiểm.<br>- Phát voucher giảm giá 25% gói bảo hiểm thực tế và tặng quà lưu niệm (mũ bảo hiểm đạt chuẩn) tại booth. | CTV / Tư vấn viên |

---

## 2. Mục Tiêu Thử Nghiệm (Testing Goals)

Mục tiêu cốt lõi của playtest là đo lường hiệu quả tác động tâm lý của cơ chế vòng lặp kỳ ảo đối với nhận thức tài chính và ý thức an toàn của người chơi.

### 2.1. Nhận thức Rủi ro qua Ám ảnh Vòng lặp & Sự Mất Màu (Loss Aversion & Color Meter)
*   **Đo lường:** Người chơi có nhận ra mối liên hệ nhân quả giữa rủi ro tai nạn ngẫu nhiên trên đường đi học (Hẻm Nhỏ, Chợ Sáng, Ngã Tư) với việc ví tiền xu bị bào mòn và thế giới xung quanh bị mất dần màu sắc hay không.
*   **Điểm chạm đánh giá:** Tần suất người chơi chuyển từ việc thờ ơ sang chủ động chọn các gói bảo hiểm (Gói Mũ Đỏ bảo vệ y tế, Gói Xe Cũ bảo vệ xe, Gói Đường Đến Trường bảo vệ toàn diện) ở Vòng lặp 3.

### 2.2. Toán Bồi thường Bảo hiểm Trực quan (Claim Math Transparency)
*   **Đo lường:** Sự rõ ràng và dễ hiểu của số liệu tài chính khi xảy ra tai nạn va chạm ở Hẻm Nhỏ, Chợ Sáng, Ngã Tư dưới các gói bảo hiểm khác nhau.
*   **Yêu cầu:** Người chơi phải hiểu rõ bản chất toán học bồi thường:
    *   **Không tham gia:** Tự chi trả 100% thiệt hại (ví dụ: mất 220 xu ở Ngã Tư).
    *   **Gói Mũ Đỏ (red_helmet):** Hỗ trợ 100% y tế, 0% sửa xe (Ngã Tư: tự trả 0 xu y tế + 120 xu sửa xe = 120 xu).
    *   **Gói Xe Cũ (old_bike):** Hỗ trợ 0% y tế, 100% sửa xe (Ngã Tư: tự trả 100 xu y tế + 0 xu sửa xe = 100 xu).
    *   **Gói Đường Đến Trường (school_route):** Hỗ trợ 80% y tế, 80% sửa xe (Ngã Tư: tự trả 20 xu y tế + 24 xu sửa xe = 44 xu - Tiết kiệm được 176 xu).

### 2.3. Sổ Cái Kết Quả & Giao Diện Hóa Đơn Ledger
*   **Đo lường:** Khả năng đọc hiểu toàn bộ thông tin tài chính trên màn hình hóa đơn Ledger của game trong vòng **10 giây** mà không cần giải thích từ CTV.
*   **Đánh giá:** Hiệu quả thị giác của thanh so sánh chi phí (Coverage Bars) trong việc làm nổi bật giá trị kinh tế của bảo hiểm.

---

## 3. Chỉ Số Thành Công (Success Metrics)

Để phiên bản MVP v1.1.0 của game đạt chuẩn nghiệm thu và sẵn sàng đưa vào chiến dịch truyền thông O2O thực tế:

*   **Completion Rate (>90%):** Tỷ lệ người chơi hoàn thành cả 3 vòng lặp để thoát hiểm mà không bỏ cuộc giữa chừng.
*   **Claim Math Rate (>85%):** Tỷ lệ người chơi trả lời chính xác câu hỏi kiểm tra: *"Nhờ mua Gói Đường Đến Trường, bạn đã tiết kiệm được bao nhiêu xu khi gặp tai nạn ở Ngã Tư?"* (Đáp án đúng: 176 xu).
*   **Loop Experience Score (>4.6/5.0):** Điểm đánh giá mức độ hấp dẫn và tạo cảm xúc của cơ chế vòng lặp thời gian kỳ ảo "7 Giờ Kém 10" và Color Meter.
*   **Conversion Rate (>10%):** Tỷ lệ sinh viên quét mã đăng ký mua gói bảo hiểm học đường thực tế của GAIP Care sau khi kết thúc trải nghiệm game.
*   **Ledger Reading Time (<12s):** Thời gian trung bình người chơi dừng lại để đọc hiểu hóa đơn Ledger trước khi bấm "Tiếp tục".

---

## 4. Quy Trình Xác Minh Đội Phát Triển (Verification Steps)

Trước khi tiến hành chạy thử thực tế tại cổng trường học, đội ngũ kỹ thuật phải hoàn thành danh sách kiểm tra sau:

1.  **Kiểm tra Tương thích Thiết bị (Device Check):**
    *   [ ] Chạy thử link game trên các trình duyệt di động phổ biến (iOS Safari, Android Chrome, Zalo Webview).
    *   [ ] Đảm bảo game tự động co giãn tỷ lệ (Scale Manager) theo màn hình dọc/ngang mà không làm mất các nút điều hướng hay khuất văn bản hội thoại.
2.  **Kiểm tra Nhất quán Dữ liệu (Data Sanity Check):**
    *   [ ] Chạy script test tự động `src/test-flow.js` để xác minh cây hội thoại không có lỗi đứt gãy luồng hoặc rẽ nhánh sai hướng.
    *   [ ] Đảm bảo công thức tính toán claim của `InsuranceSystem.js` khớp 100% với số liệu trừ xu hiển thị trên hóa đơn Ledger và mô tả hội thoại dialogues.vi.json.
3.  **Kiểm tra Kết nối Chuyển đổi O2O (O2O Connection):**
    *   [ ] Kiểm tra mã QR chuyển hướng từ game sang trang ưu đãi bảo hiểm thực tế GAIP Care hoạt động chính xác.
