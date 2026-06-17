# THIẾT KẾ CỐT TRUYỆN THỰC TẾ (STORY REALISM DESIGN SPECIFICATION)
## Slice-of-life Kỳ Ảo Việt Nam & InsurTech Game: "7 Giờ Kém 10"

---

## 1. TIỀN ĐỀ CỐT TRUYỆN MỚI (NEW STORY PREMISE)

Để trò chơi mang đậm hơi thở cuộc sống thường nhật của học sinh Việt Nam và thoát khỏi cảm giác của một "phòng debug/phòng kỳ ảo chung chung", bối cảnh và tiền đề cốt truyện được thiết lập thực tế như sau:

### 1.1. Bối cảnh Nhân vật & Phương tiện
*   **Nhân vật chính (An):** 17 tuổi, học sinh lớp 11 tại một trường THPT công lập ở Việt Nam.
*   **Phương tiện di chuyển:** Chiếc xe máy Wave 50cc màu đỏ. Đây là phương tiện di chuyển phổ biến và hợp pháp cho học sinh cấp 3 tại Việt Nam chưa có bằng lái xe máy (>50cc), nhưng vẫn bắt buộc phải có **Bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới** và khuyến nghị đội mũ bảo hiểm đạt chuẩn.
*   **Lý do tự đi xe:** Bố của An đi công tác xa, Mẹ của An bận đi làm ca sáng từ sớm. An phải tự lái xe máy cá nhân để đi học.
*   **Không mua bán bảo hiểm hàng ngày:** Khác với phiên bản cũ nơi người chơi mua bảo hiểm hàng ngày ở một chiếc bàn giao dịch phi thực tế trong phòng ngủ, bảo hiểm trong game mới là một gói bảo hiểm năm (bao gồm Bảo hiểm trách nhiệm dân sự bắt buộc của chủ xe cơ giới kết hợp Bảo hiểm tai nạn học sinh - gói toàn diện "Đường Đến Trường") được kích hoạt trong cốt truyện bởi người mẹ.

### 1.2. Áp lực thời gian (Time Pressure) & Động cơ
*   **Mốc thời gian tỉnh dậy:** **6:50 AM** (7 giờ kém 10).
*   **Mốc thời gian vào học:** **7:00 AM** (7 giờ đúng).
*   **Thời gian di chuyển thực tế:** Chỉ có đúng **10 phút** để chuẩn bị và lái xe vượt qua quãng đường đến trường.
*   **Hậu quả nếu muộn giờ (Nỗi sợ của học sinh):** 
    *   Cổng trường đóng sập lúc 7:00.
    *   Đội Sao Đỏ ghi tên vào sổ đầu bài, trừ điểm thi đua của lớp (áp lực tâm lý lớn trong môi trường học đường Việt Nam).
    *   Bị giám thị phạt lao động công ích hoặc gọi điện báo phụ huynh.

---

## 2. QUY TRÌNH TƯƠNG TÁC TẠI NHÀ (HOMESCENE INTERACTIONS)

Khu vực chuẩn bị buổi sáng được chia làm hai phần: **Trong nhà (Inside)** và **Sân trước (Front Yard)**. Motorbike đỗ ở sân trước đúng thực tế, không để trong phòng ngủ.

```
+-------------------------------------------------------------+
|                     KHU VỰC TRONG NHÀ                       |
|  - Nói chuyện với Mẹ (để hiểu hoàn cảnh, kích hoạt BH)      |
|  - Nhặt Mũ Bảo Hiểm (treo trên giá treo gần cửa)             |
|  - Kiểm tra Cặp Sách (đảm bảo đủ sách vở, thẻ học sinh)     |
|  - Đọc Giấy Chứng Nhận Bảo Hiểm (trên bàn học học sinh)     |
+-------------------------------------------------------------+
                              |
                     [Đi ra cửa chính]
                              v
+-------------------------------------------------------------+
|                     KHU VỰC SÂN TRƯỚC                       |
|  - Gặp và chào hỏi Bác Nam (Hàng xóm tưới cây)              |
|  - Kiểm tra Phanh & Lốp xe Wave 50cc (đỗ ở sân)             |
+-------------------------------------------------------------+
                              |
                       [Mở cổng sắt]
                              v
                    [Bắt đầu RoadScene]
```

### 2.1. Các tương tác cụ thể:
1.  **Nói chuyện với Mẹ:** Mẹ đang vội đi làm, nhắc nhở An ăn gói xôi/bánh mì mua sẵn trên bàn và dặn đi xe cẩn thận.
2.  **Nhặt Mũ Bảo Hiểm:** Treo ở giá móc đồ cạnh cửa ra vào phòng khách.
3.  **Kiểm tra Cặp Sách & Đọc Giấy Bảo Hiểm (Bàn học):** An kiểm tra cặp sách và đọc Giấy chứng nhận bảo hiểm trên bàn.
    *   *Loop 1:* Giấy chứng nhận bảo hiểm trách nhiệm dân sự đã hết hạn từ tháng trước. Xe hoàn toàn không có bảo hiểm bảo vệ.
    *   *Loop 2 & 3:* Giấy chứng nhận mới đã được Mẹ mua và kích hoạt (Gói Đường Đến Trường bảo vệ 80% y tế và 80% sửa xe).
4.  **Kiểm tra xe máy (Sân trước):** Xe máy Wave 50cc được dựng ở sân trước. An kiểm tra phanh trước/sau và độ căng của lốp xe (tránh trường hợp xe bị xẹp lốp hoặc mất phanh giữa đường).

---

## 3. TIẾN TRÌNH 3 VÒNG LẶP CHI TIẾT (3-LOOP PROGRESSION)

### Vòng lặp 1: Không Bảo Hiểm & Tai Nạn Bắt Buộc (No Insurance, Destined Crash)
*   **Hành động:** An giật mình tỉnh dậy lúc 6:50. Hoảng loạn sợ muộn học nên vội vã phóng đi ngay mà không đội mũ bảo hiểm đỏ, không kiểm tra xe Wave 50cc và không có bảo hiểm hiệu lực.
*   **Sự cố:** Sụp ổ gà sâu chứa nước ở Hẻm Nhỏ (phanh bị đứt cáp do không bảo dưỡng nên không thể giảm tốc).
*   **Kết quả:** Ngã xe, chấn thương y tế nặng và hỏng xe hoàn toàn. Tổng chi phí là **160 xu** (Y tế 80 xu + Sửa xe 80 xu). Vì không có bảo hiểm, An phải tự trả 100%, vượt quá số ví ban đầu (150 xu) dẫn đến **Phá sản (Bankruptcy)** và kích hoạt quay ngược thời gian (Reset loop).

### Vòng lặp 2: Có Bảo Hiểm Nhưng Thiếu Bảo Hộ (Insurance but Unprepared)
*   **Hành động:** Vòng lặp reset. Mẹ bảo An rằng bà đã gia hạn Bảo hiểm TNDS bắt buộc và mua thêm bảo hiểm tai nạn học sinh (Gói Đường Đến Trường) cho An. Tuy nhiên, An vẫn chủ quan phóng đi mà **không đội mũ bảo hiểm** hoặc **không kiểm tra phanh lốp** xe Wave.
*   **Sự cố:** Gặp chướng ngại vật đột ngột trên đường (Chợ Sáng hoặc Ngã Tư). Dù bóp phanh tránh, nhưng do phanh mòn và lốp non hơi (chưa kiểm tra) khiến xe mất lái và gặp tai nạn.
*   **Kết quả:** Xe va chạm mạnh. Bảo hiểm chi trả 80% chi phí điều trị và sửa chữa. Tuy nhiên, do An không đội mũ bảo hiểm và không bảo dưỡng xe trước khi đi, An không nhận được mức giảm trừ 50% thiệt hại từ trang bị bảo hộ. Số tiền tự chi trả còn lại vẫn rất cao (khoảng **32 - 44 xu** tùy vị trí va chạm). Cuối hành trình, cổng trường đã đóng sập lúc 7:00, An muộn học và vòng lặp tiếp tục reset sang Loop 3.

### Vòng lặp 3: An Toàn và Chủ Động Toàn Diện (Full Protection & Loop Break)
*   **Hành động:** An tỉnh dậy, nhận thức đầy đủ và bình tĩnh chuẩn bị:
    1. Nói chuyện và chào tạm biệt Mẹ.
    2. Đội mũ bảo hiểm đỏ chắc chắn.
    3. Đọc kỹ giấy tờ bảo hiểm trên bàn học để nắm quyền lợi.
    4. Kiểm tra phanh lốp xe máy Wave 50cc cẩn thận ở sân trước.
*   **Sự cố:** Gặp chiếc xe tải lớn lấn làn đột ngột tại Ngã Tư. Nhờ xe được bảo dưỡng phanh tốt cùng sự tập trung cao độ, An chủ động phanh kịp và rẽ sát lề tránh được va chạm trực diện. Chỉ bị va quẹt nhẹ kính chiếu hậu (Y tế 0 xu, Sửa xe 10 xu).
*   **Kết quả:** Nhờ kiểm tra xe, chi phí sửa xe giảm 50% còn 5 xu. Bảo hiểm Đường Đến Trường chi trả tiếp 80%, An chỉ phải tự trả đúng **1 xu**. Ví tiền được bảo toàn gần như nguyên vẹn, An đến trường an toàn trước 7:00 sáng đúng lúc trống trường vang lên. Vòng lặp bị phá vỡ hoàn toàn!

---

## 4. KỊCH BẢN THOẠI TIẾNG VIỆT CHI TIẾT (VIETNAMESE DIALOGUE SAMPLES)

### 4.1. Thoại giữa An và Mẹ (Tại Phòng Khách)
#### Vòng lặp 1:
*   **Mẹ:** "An ơi! 6 giờ 50 rồi kìa! Nhìn cái đồng hồ xem, muộn học đến nơi rồi con! Dành vài phút chuẩn bị cặp sách rồi dắt xe đi học đi!"
*   **An:** "Ôi chết con rồi! Sao chuông báo thức không kêu thế này! Con đi học đây mẹ ơi!"
*   **Mẹ:** "Từ từ đã con! Đi xe máy thì phải cẩn thận. Nhớ lấy mũ bảo hiểm đỏ và ăn gói xôi trên bàn nhé."

#### Vòng lặp 2:
*   **Mẹ:** "An ơi... 6 giờ 50 rồi kìa... Nhớ dắt xe... Hôm nay... tuần lễ an toàn... đường sá đông đúc..."
*   **An:** "Ơ mẹ? Sao câu này con nghe quen thế nhỉ? Như là con đã nghe đúng từng chữ từ hôm qua..."
*   **Mẹ:** "Quen cái gì mà quen! Mẹ đã mua và kích hoạt Bảo hiểm bắt buộc TNDS với bảo hiểm học sinh cho con rồi đó. Giấy chứng nhận trên bàn học ấy, đọc đi! Nhưng đi xe máy thì phải đội mũ bảo hiểm đỏ và kiểm tra phanh lốp nghe chưa!"
*   **An:** "(Rùng mình) Mẹ đã mua bảo hiểm cho con sao? Nhưng hôm qua con đúng là đã bị tai nạn và tốn rất nhiều tiền..."

#### Vòng lặp 3:
*   **Mẹ:** "Bảo hiểm bắt buộc trách nhiệm dân sự và bảo hiểm học sinh đã được kích hoạt. Con nhớ đội mũ bảo hiểm đỏ và kiểm tra kỹ xe máy Wave 50cc trước khi ra đường nhé."
*   **Mẹ:** "Sự chuẩn bị an toàn và chu đáo luôn là lá chắn tốt nhất cho con."
*   **An:** "Dạ con hiểu rồi! Con sẽ chuẩn bị thật kỹ lưỡng để phá vỡ vòng lặp này!"

---

## 4.2. Thoại với Bác Nam hàng xóm (Tại Sân Trước)
*Bác Nam là hàng xóm tốt bụng, đang tưới chậu cây kiểng trước sân nhà khi An chuẩn bị dắt xe máy ra.*

#### Vòng lặp 1:
*(An vội vã phóng xe đi nhanh nên không chào hỏi bác)*
*   **Bác Nam:** "Ơ cái thằng bé này, đi đâu mà hớt ha hớt hải thế? Chạy xe từ từ thôi cháu ơi, ngõ nhỏ lắm ổ gà đấy!"

#### Vòng lặp 2:
*   **An:** "Cháu chào bác Nam ạ!"
*   **Bác Nam:** "Ừ, chào cháu. Đi học hả? Mà này, sáng nay trời mưa bóng mây lấp lánh thế kia nhưng đường trơn lắm đấy nhé. Mấy đống cát công trường cuối ngõ trôi ra đường rồi, đi xe máy cẩn thận cái phanh xe kẻo trượt bánh!"
*   **An:** "(Cảm giác quen thuộc...) Dạ... cháu cảm ơn bác dặn, cháu sẽ đi cẩn thận."

#### Vòng lặp 3:
*   **An:** "Cháu chào bác Nam buổi sáng ạ! Bác lại tưới cây sớm thế ạ?"
*   **Bác Nam:** "Ừ cháu. Đi học sớm thế là tốt. Nhìn xe cộ xích phanh căng thế kia là yên tâm rồi. Lát qua đoạn Chợ Sáng đi chậm thôi nhé, mấy hàng rong dạo này họp lấn cả ra lòng đường đấy."
*   **An:** "Dạ, cháu đã kiểm tra kỹ phanh lốp và đi đúng tốc độ rồi bác. Cháu xin phép đi học ạ!"
*   **Bác Nam:** "Ừ, đi học vui vẻ nhé cháu!"
