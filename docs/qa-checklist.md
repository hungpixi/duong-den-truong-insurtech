# CHECKLIST KIỂM THỬ CHẤT LƯỢNG (QA CHECKLIST) - GAME "ĐƯỜNG ĐẾN TRƯỜNG"

Tài liệu này định nghĩa danh sách các kịch bản kiểm thử (test scenarios) toàn diện nhằm xác minh tính đúng đắn của game "Đường Đến Trường" trước khi phát hành.

---

## 1. Màn Hình Chính (MainMenu)
- [ ] **Khởi tạo Game:** Game khởi chạy thành công từ BootScene -> PreloadScene -> MainMenuScene mà không bị treo.
- [ ] **Giao diện Menu:** Hiển thị đầy đủ tiêu đề game "Đường Đến Trường", nút "Bắt đầu", nút "Chơi tiếp" (chỉ sáng khi có Save), và nút "Hướng dẫn".
- [ ] **Tương tác nút:** Các nút phản hồi hiệu ứng rê chuột (hover) và âm thanh click chuột chuẩn xác.
- [ ] **Âm thanh nền (BGM):** Nhạc nền của MainMenu tự động phát và dừng chính xác khi chuyển cảnh.

## 2. Hệ Thống Hội Thoại & Kịch Bản (Dialogues & Story Mode)
- [ ] **Đọc dữ liệu JSON:** DialogSystem tải thành công tệp `dialogues.vi.json` không gây lỗi cú pháp.
- [ ] **Hiển thị chữ (Typewriter):** Văn bản hiển thị chạy từng ký tự (typewriter) trơn tru, phát âm thanh blip nhẹ mỗi 2 ký tự.
- [ ] **Bỏ qua chữ (Skip):** Nhấn SPACE hoặc Click chuột khi chữ đang chạy sẽ lập tức hiển thị toàn bộ câu thoại.
- [ ] **Rẽ nhánh hội thoại:** Chọn các phương án lựa chọn dẫn đến node hội thoại tiếp theo chính xác như thuộc tính `next` cấu hình.
- [ ] **Ảnh hưởng lựa chọn (Effects):** Lựa chọn cộng/trừ các chỉ số (`coin`, `safety_score`, `risk_level`, `time`) được cập nhật trực tiếp vào hệ thống dữ liệu ngay sau khi chọn.

## 3. Điều Khiển Lái Xe (Driving Controls)
- [ ] **Di chuyển cơ bản:** Nhân vật di chuyển mượt mà bằng phím mũi tên hoặc WASD (lên, xuống, trái, phải).
- [ ] **Tốc độ di chuyển:** Xe máy có tốc độ di chuyển cao hơn xe đạp điện, quán tính phanh lớn hơn.
- [ ] **Hiệu ứng thời tiết (Ngày 2):** Khi trời mưa, tốc độ tối đa của xe bị giảm 15%, khoảng cách phanh dừng (trượt bánh) tăng 30%.
- [ ] **Giới hạn màn hình:** Nhân vật không thể đi ra ngoài biên bản đồ hoặc đi xuyên qua các lớp tường ranh giới (colliders).

## 4. Va Chạm Chướng Ngại Vật (Obstacle Collisions)
- [ ] **Hitbox vật cản:** Các vật cản tĩnh (gánh hàng rong, xe nước mía, ổ gà) và vật cản động (người đi bộ, xe tải lấn làn) có hitbox chuẩn xác với đồ họa pixel.
- [ ] **Sự kiện va chạm:** Khi xe va chạm vật cản, game tạm dừng điều khiển lái xe, kích hoạt âm thanh va chạm, giảm sức khỏe (`damage_health`) và kích hoạt DialogSystem hiển thị tình huống tương ứng.
- [ ] **Bất tử tạm thời:** Sau va chạm, người chơi có 1.5 giây nhấp nháy (bất tử tạm thời) để tránh bị va quẹt liên tiếp.

## 5. Tính Toán Bồi Thường Bảo Hiểm (Claim Calculations)
- [ ] **Không bảo hiểm (Gói `none`):**
  - Khi xảy ra tai nạn, chi phí y tế và sửa xe tự trả = 100%.
  - Phí mua bảo hiểm đầu ngày = 0 xu.
- [ ] **Bảo hiểm Học đường (Gói `basic`):**
  - Phí mua = 30 xu.
  - Hỗ trợ 60% chi phí y tế (Người chơi tự trả = `Cost * 0.4`).
  - Hỗ trợ 0% chi phí sửa xe (Người chơi tự trả = 100%).
- [ ] **Bảo hiểm An toàn Di chuyển (Gói `mobility`):**
  - Phí mua = 70 xu.
  - Hỗ trợ 80% chi phí y tế (Người chơi tự trả = `Cost * 0.2`).
  - Hỗ trợ 60% chi phí sửa xe (Người chơi tự trả = `Cost * 0.4`).
- [ ] **Làm tròn số:** Các số tiền lẻ sau khi nhân phần trăm bồi thường phải được làm tròn về số nguyên gần nhất bằng `Math.round()` để tránh số coin hiển thị bị lẻ thập phân.

## 6. Tổng Kết Kết Quả (Result Calculation)
- [ ] **Tổng kết Ngày:** Cuối mỗi ngày chơi, hiển thị bảng kết quả chi tiết:
  - Phí mua bảo hiểm (nếu có).
  - Chi phí y tế gốc vs. Thực tế tự trả.
  - Chi phí sửa xe gốc vs. Thực tế tự trả.
  - Tổng số xu còn lại.
  - Điểm lái xe an toàn (`Safety Score`).
  - Điểm hiểu biết bảo hiểm (`Insurance Literacy Score`).
- [ ] **Cập nhật Chỉ số:** Đảm bảo số xu ròng còn lại không bao giờ bị âm. Nếu xu về 0, kích hoạt màn hình Game Over.
- [ ] **Voucher thưởng:** Nếu hoàn thành game với `Safety Score > 80` và `Insurance Literacy Score > 70`, màn hình kết quả Ngày 5 hiển thị mã QR và voucher phần thưởng thực tế.

## 7. Lưu & Tải Tiến Trình (LocalStorage Saving & Loading)
- [ ] **Tự động lưu (Auto-save):** Game tự động lưu tiến trình (Ngày hiện tại, số xu, điểm an toàn, gói bảo hiểm đã mua) vào LocalStorage sau khi kết thúc màn hình tổng kết mỗi ngày.
- [ ] **Tải game (Load game):** Nút "Chơi tiếp" ở MainMenu tải đúng trạng thái ngày chơi đã lưu gần nhất.
- [ ] **Xóa dữ liệu (Reset):** Khi chọn "Bắt đầu" mới hoặc nhấn "Chơi lại", toàn bộ dữ liệu lưu cũ trong LocalStorage bị ghi đè/xóa sạch để tránh xung đột dữ liệu.
