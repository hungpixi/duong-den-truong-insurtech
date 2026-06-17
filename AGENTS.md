# Quy tắc Dự án - Thiết kế Đồ họa & Nhân vật (Visual Rules)

## Quy tắc 14 — Đồng bộ Mỹ thuật Nhân vật (Character Art Consistency)

*   **TUYỆT ĐỐI KHÔNG** sử dụng bất kỳ hình ảnh sinh ra bởi AI (AI generated images) hay tệp hình ảnh minh họa bên ngoài nào.
*   **Vẽ Lập trình 100% (Programmatic Canvas Art):**
    *   Toàn bộ chân dung hội thoại (Dialogue Portraits) và nhân vật di chuyển (Map Sprites) của An, Mẹ, Bác Nam, Tư vấn viên phải được **vẽ trực tiếp bằng code** sử dụng HTML5 Canvas 2D API (thông qua `createCanvasTexture` trong Phaser 3).
    *   Tuân thủ các thuật toán vẽ hình elip, đường cong bezier, đổ màu và nét vẽ có sẵn từ bản thiết kế `asset_drawer.html` để tạo hình ảnh sắc nét, có chiều sâu 2.5D và biểu cảm rõ ràng.
*   **Thể hiện Biểu cảm Chân dung:**
    *   Đối với hộp thoại hội thoại, vẽ các phiên bản chân dung biểu cảm cảm xúc (bình thường, lo lắng, giận dữ, thân thiện) trực tiếp qua code Canvas bằng cách điều chỉnh mắt, mày và khóe miệng pixel.

## Quy tắc 19 — Quy trình Tự động hóa & Kiểm toán qua Subagent (Subagent Auditing & Execution)

*   **Ủy quyền Subagent chuyên biệt:** Cho phép và khuyến khích định nghĩa các Subagent chuyên trách (như QA/Audit Agent, Code Optimizer, Game Designer, UI/UX Pro) để tự động hóa việc rà soát và kiểm toán mã nguồn.
*   **Vòng lặp Tự kiểm toán & Tự sửa lỗi (Self-Audit & Correction):** Các subagent phải tự động đọc mã nguồn mới viết, đối chiếu với `mission.md` và `idea.md`, phát hiện lỗi logic hoặc các phần chồng lấn UI, tự động chỉnh sửa và viết lại cho tối ưu nhất trước khi bàn giao.
*   **Đảm bảo chất lượng cao nhất:** Tuyệt đối không bàn giao code có lỗi cú pháp hoặc giao diện chồng chéo. Mọi hoạt cảnh và hiệu ứng phải được làm mượt mà, đầy đủ trước khi báo cáo hoàn thành.

