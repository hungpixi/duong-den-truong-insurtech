# THIẾT KẾ CHÂN DUNG NHÂN VẬT & PROMPT TẠO ẢNH (HUMAN AVATARS DESIGN & PROMPTS)
## Dự án: Game O2O Slice-of-life Kỳ Ảo Việt Nam & InsurTech “7 Giờ Kém 10”

Tài liệu này đặc tả chi tiết hồ sơ hình ảnh (visual profiles) và các câu lệnh tạo ảnh chính xác (image generation prompts) cho hệ thống avatar hội thoại của các nhân vật chính trong game. 

---

## 1. Định Hướng Nghệ Thuật & Phong Cách Chung (Visual Style Guide)

Để các biểu cảm khuôn mặt của nhân vật trông chân thực, đẹp đẽ, truyền tải rõ nét cảm xúc và dễ dàng thu nhỏ (scale down) xuống kích thước hiển thị trong game ($96 \times 96\text{ px}$ hoặc $128 \times 128\text{ px}$) mà không bị nhòe nét hay mất chi tiết, phong cách mỹ thuật được thống nhất như sau:

*   **Từ khóa phong cách (Style Prompt):** `beautiful warm cozy semi-realistic digital illustration, visual novel character portrait, clean detailed outlines, soft lighting, solid flat cream background`
*   **Đặc điểm nét vẽ:** Nét vẽ kỹ thuật số 2D (semi-realism) lai hoạt họa (anime-influenced), đường viền sắc nét, rõ ràng (clean detailed outlines) để tránh hiện tượng nhòe khi co nhỏ ảnh. Không sử dụng phong cách pixel art khối (blocky pixel art) để tối ưu hóa khả năng biểu cảm của khuôn mặt.
*   **Bảng màu & Ánh sáng:** Tông màu ấm áp, dễ chịu (warm and cozy). Ánh sáng dịu nhẹ (soft lighting), giảm thiểu bóng tối gắt để gương mặt nhân vật luôn sáng sủa.
*   **Bố cục (Composition):** Cận cảnh từ ngực trở lên (headshot, chest-up portrait), nhân vật nhìn thẳng hoặc hơi nghiêng nhẹ hướng về phía người chơi (front-facing), đặt trên nền màu kem phẳng đơn sắc (`solid flat cream background`, mã màu đề xuất `#fffbeb` hoặc tương đương) để dễ dàng tách nền (transparent background) hoặc cắt ghép sau này.
*   **Thông số loại bỏ (Negatives):** Tránh các chi tiết ảnh chụp thực tế (photographic), mô hình 3D (3d render), đổ bóng quá đậm (dark shadows) hoặc nền có gradient phức tạp.

---

## 2. Hồ Sơ Nhân Vật & Các Prompt Tạo Ảnh Chi Tiết (Visual Profiles & Prompts)

### 2.1. AN — Nhân Vật Chính (Main Character)
*   **Hồ sơ trực quan:** Nam sinh trung học (teenage high school boy) người Việt Nam, dáng người mảnh khảnh, nhanh nhẹn. Tóc đen cắt ngắn gọn gàng. Trang phục mặc định là áo sơ mi trắng học sinh có viền cổ màu xanh dương (white school shirt with blue collar detail) đặc trưng của học sinh Việt Nam.
*   **Yêu cầu biểu cảm:** Neutral (Tự nhiên), Worried (Lo lắng).

#### Biểu cảm 1: Tự nhiên (Neutral)
*   **Mô tả trạng thái:** Gương mặt bình thản, ánh mắt nhìn thẳng tự nhiên, khóe miệng khẽ cười nhẹ thoải mái.
*   **Prompt Midjourney (v6):**
    > `beautiful warm cozy semi-realistic digital illustration, visual novel character portrait, headshot, chest-up, front-facing, clean detailed outlines, soft lighting, solid flat cream background. A Vietnamese teenage high school boy, short neat black hair, calm neutral expression, direct gaze, soft looking eyes, wearing a white school uniform shirt with a blue collar detail. 2D anime-influenced semi-realism, high-resolution vector-like clean lines, smooth gradients --ar 1:1 --v 6.0 --style raw --no photo, 3d render, realistic, dark shadows, gradient background`
*   **Prompt DALL-E 3:**
    > `A beautiful warm cozy semi-realistic digital illustration in a visual novel character portrait style. Headshot, chest-up, front-facing view with clean detailed outlines and soft lighting on a solid flat cream background. The character is a Vietnamese teenage high school boy with short neat black hair. He has a calm neutral expression, a direct gaze with soft eyes, and is wearing a white school uniform shirt with a blue collar detail. 2D anime-influenced semi-realism with high-resolution clean lines and smooth gradients, no photo or 3D render elements.`

#### Biểu cảm 2: Lo lắng (Worried)
*   **Mô tả trạng thái:** Chân mày cau lại (furrowed brow), mắt mở to đầy lo âu, có một giọt mồ hôi lăn nhẹ trên trán/má (sweat drop), miệng hơi mím hoặc hé mở bồn chồn.
*   **Prompt Midjourney (v6):**
    > `beautiful warm cozy semi-realistic digital illustration, visual novel character portrait, headshot, chest-up, front-facing, clean detailed outlines, soft lighting, solid flat cream background. A Vietnamese teenage high school boy, short neat black hair, worried anxious expression, furrowed brow, a single sweat drop on his temple, nervous eyes, wearing a white school uniform shirt with a blue collar detail. 2D anime-influenced semi-realism, high-resolution vector-like clean lines, smooth gradients --ar 1:1 --v 6.0 --style raw --no photo, 3d render, realistic, dark shadows, gradient background`
*   **Prompt DALL-E 3:**
    > `A beautiful warm cozy semi-realistic digital illustration in a visual novel character portrait style. Headshot, chest-up, front-facing view with clean detailed outlines and soft lighting on a solid flat cream background. The character is a Vietnamese teenage high school boy with short neat black hair. He has a worried expression with a furrowed brow, a single sweat drop on his temple, nervous and anxious eyes, wearing a white school uniform shirt with a blue collar detail. 2D anime-influenced semi-realism with high-resolution clean lines, no photo or 3D render elements.`

---

### 2.2. MẸ CỦA AN (Mom)
*   **Hồ sơ trực quan:** Người mẹ Việt Nam trung niên ở độ tuổi 40 (middle-aged Vietnamese mother in her 40s), gương mặt tảo tần, phúc hậu. Tóc đen được búi gọn gàng sau gáy (hair tied in a neat bun). Mặc đồ bộ lanh mặc nhà hoặc áo blouse đơn giản, nhã nhặn.
*   **Yêu cầu biểu cảm:** Caring (Chu đáo/Quan tâm), Worried (Lo lắng), Angry (Tức giận).

#### Biểu cảm 1: Chu đáo/Quan tâm (Caring)
*   **Mô tả trạng thái:** Ánh mắt hiền từ ấm áp, nụ cười nhẹ nhàng và dịu dàng (gentle smile), toát lên vẻ quan tâm, khuyên bảo con.
*   **Prompt Midjourney (v6):**
    > `beautiful warm cozy semi-realistic digital illustration, visual novel character portrait, headshot, chest-up, front-facing, clean detailed outlines, soft lighting, solid flat cream background. A middle-aged Vietnamese mother in her 40s, black hair tied in a neat bun, caring gentle smile, kind warm eyes, wearing a simple casual domestic blouse. 2D anime-influenced semi-realism, high-resolution vector-like clean lines, smooth gradients --ar 1:1 --v 6.0 --style raw --no photo, 3d render, realistic, dark shadows, gradient background`
*   **Prompt DALL-E 3:**
    > `A beautiful warm cozy semi-realistic digital illustration in a visual novel character portrait style. Headshot, chest-up, front-facing view with clean detailed outlines and soft lighting on a solid flat cream background. The character is a middle-aged Vietnamese mother in her 40s, with her black hair tied in a neat bun. She has a caring, gentle smile, kind and warm eyes, and is wearing a simple casual domestic blouse. 2D anime-influenced semi-realism with high-resolution clean lines, no photo or 3D render elements.`

#### Biểu cảm 2: Lo lắng (Worried)
*   **Mô tả trạng thái:** Lông mày hơi xếch lên thể hiện sự quan ngại và lo lắng (slanted concerned eyebrows), ánh mắt lo âu nhìn con, khuôn miệng hơi hé mở (open mouth) như đang dặn dò hay nói lời lo lắng.
*   **Prompt Midjourney (v6):**
    > `beautiful warm cozy semi-realistic digital illustration, visual novel character portrait, headshot, chest-up, front-facing, clean detailed outlines, soft lighting, solid flat cream background. A middle-aged Vietnamese mother in her 40s, black hair tied in a neat bun, worried anxious expression, slanted concerned eyebrows, worried eyes, slightly open mouth as if speaking in concern, wearing a simple casual domestic blouse. 2D anime-influenced semi-realism, high-resolution vector-like clean lines, smooth gradients --ar 1:1 --v 6.0 --style raw --no photo, 3d render, realistic, dark shadows, gradient background`
*   **Prompt DALL-E 3:**
    > `A beautiful warm cozy semi-realistic digital illustration in a visual novel character portrait style. Headshot, chest-up, front-facing view with clean detailed outlines and soft lighting on a solid flat cream background. The character is a middle-aged Vietnamese mother in her 40s, with her black hair tied in a neat bun. She has a worried expression with slanted concerned eyebrows, anxious eyes, and a slightly open mouth as if speaking with concern, wearing a simple casual domestic blouse. 2D anime-influenced semi-realism with high-resolution clean lines, no photo or 3D render elements.`

#### Biểu cảm 3: Tức giận (Angry)
*   **Mô tả trạng thái:** Chân mày nhíu chặt (furrowed brows), gương mặt nghiêm khắc (strict expression), môi mím chặt giận dữ, ánh mắt sắc bén thể hiện sự không hài lòng khi con nghịch ngợm hoặc chủ quan.
*   **Prompt Midjourney (v6):**
    > `beautiful warm cozy semi-realistic digital illustration, visual novel character portrait, headshot, chest-up, front-facing, clean detailed outlines, soft lighting, solid flat cream background. A middle-aged Vietnamese mother in her 40s, black hair tied in a neat bun, angry stern expression, deeply furrowed brows, tight lips, strict intense gaze, wearing a simple casual domestic blouse. 2D anime-influenced semi-realism, high-resolution vector-like clean lines, smooth gradients --ar 1:1 --v 6.0 --style raw --no photo, 3d render, realistic, dark shadows, gradient background`
*   **Prompt DALL-E 3:**
    > `A beautiful warm cozy semi-realistic digital illustration in a visual novel character portrait style. Headshot, chest-up, front-facing view with clean detailed outlines and soft lighting on a solid flat cream background. The character is a middle-aged Vietnamese mother in her 40s, with her black hair tied in a neat bun. She has an angry, stern expression with deeply furrowed brows, tight lips, and a strict, intense gaze, wearing a simple casual domestic blouse. 2D anime-influenced semi-realism with high-resolution clean lines, no photo or 3D render elements.`

---

### 2.3. BÁC NAM — Hàng Xóm (Neighbor)
*   **Hồ sơ trực quan:** Người đàn ông hàng xóm trung niên ở độ tuổi 50 (middle-aged neighbor in his 50s) thân thiện, tốt bụng. Mái tóc cắt ngắn, hơi ngả hoa râm (slightly graying hair). Trang phục giản dị, mặc áo thun polo có cổ (simple polo collar shirt).
*   **Yêu cầu biểu cảm:** Friendly (Thân thiện).

#### Biểu cảm: Thân thiện (Friendly)
*   **Mô tả trạng thái:** Nụ cười rạng rỡ, thân thiện (friendly smile), đôi mắt híp nhẹ nếp nhăn đuôi mắt ấm áp, toát lên vẻ hiền hòa, dễ mến của một người hàng xóm lâu năm.
*   **Prompt Midjourney (v6):**
    > `beautiful warm cozy semi-realistic digital illustration, visual novel character portrait, headshot, chest-up, front-facing, clean detailed outlines, soft lighting, solid flat cream background. A middle-aged Vietnamese neighbor in his 50s, short slightly graying black hair, friendly warm smile, kind crinkling eyes, welcoming and approachable expression, wearing a simple polo collar shirt. 2D anime-influenced semi-realism, high-resolution vector-like clean lines, smooth gradients --ar 1:1 --v 6.0 --style raw --no photo, 3d render, realistic, dark shadows, gradient background`
*   **Prompt DALL-E 3:**
    > `A beautiful warm cozy semi-realistic digital illustration in a visual novel character portrait style. Headshot, chest-up, front-facing view with clean detailed outlines and soft lighting on a solid flat cream background. The character is a middle-aged Vietnamese neighbor in his 50s, with short, slightly graying black hair. He has a warm, friendly smile with kind, crinkling eyes, and a welcoming, approachable expression, wearing a simple polo collar shirt. 2D anime-influenced semi-realism with high-resolution clean lines, no photo or 3D render elements.`

---

## 3. Hướng Dẫn Tối Ưu Hóa Nhất Quán Nhân Vật (Character Consistency Tips)

Để đảm bảo các biểu cảm khác nhau của cùng một nhân vật có sự nhất quán cao về diện mạo (character consistency) khi tạo ảnh bằng AI, các kỹ thuật sau nên được áp dụng:

### 3.1. Đối với Midjourney v6
1.  **Sử dụng tính năng Character Reference (`--cref`):**
    *   Sau khi tạo được hình ảnh ưng ý đầu tiên (ví dụ: An ở trạng thái Neutral, ký hiệu URL ảnh là `https://url-to-an-neutral.jpg`), sử dụng URL đó làm tham chiếu cho các biểu cảm tiếp theo.
    *   *Cú pháp prompt lo lắng:* `[Prompt lo lắng của An] --cref https://url-to-an-neutral.jpg --cw 80`
    *   *Lưu ý:* Chỉ số `--cw` (Character Weight) từ `0` đến `100`. Mức `80` giúp giữ lại hầu hết đặc điểm khuôn mặt, tóc và trang phục, trong khi cho phép thay đổi biểu cảm khuôn mặt linh hoạt.
2.  **Khóa hạt giống ngẫu nhiên (`--seed`):**
    *   Lấy mã seed của bức ảnh ưng ý đầu tiên bằng cách phản hồi icon thư (envelope emoji) trong Discord.
    *   Thêm tham số `--seed [mã_seed]` vào cuối các prompt biểu cảm khác để giữ cấu trúc bố cục và phong cách vẽ giống nhau nhất có thể.

### 3.2. Đối với DALL-E 3 (trong ChatGPT Plus / API)
1.  **Sử dụng Gen ID (Generation ID):**
    *   Khi DALL-E tạo ra bức ảnh đầu tiên, hãy yêu cầu hệ thống cung cấp hạt giống `gen_id` của bức ảnh đó.
    *   Trong prompt tiếp theo, ghi rõ: *"Using the exact same character design and art style from image ID [gen_id], generate this character with a worried expression..."*
2.  **Mô tả chi tiết đặc điểm bất biến:**
    *   Giữ nguyên mô tả về kiểu tóc (`short neat black hair`), trang phục (`white school uniform shirt with a blue collar detail`), độ tuổi, quốc tịch trong mọi prompt để AI không tự ý thay đổi.
