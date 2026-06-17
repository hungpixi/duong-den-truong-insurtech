import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIALOGUES_PATH = path.join(__dirname, 'data', 'dialogues.vi.json');
const PUBLIC_DIALOGUES_PATH = path.join(__dirname, '..', 'public', 'assets', 'dialogues.vi.json');
const PACKAGES_PATH = path.join(__dirname, 'data', 'insurance-packages.json');

function logSuccess(message) {
  console.log(`\x1b[32m✔ THÀNH CÔNG: ${message}\x1b[0m`);
}

function logWarning(message) {
  console.log(`\x1b[33m⚠ CẢNH BÁO: ${message}\x1b[0m`);
}

function logError(message) {
  console.error(`\x1b[31m✘ LỖI: ${message}\x1b[0m`);
}

// Mock localStorage for Node.js test environment
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  }
};

async function runValidation() {
  console.log('=== KHỞI CHẠY BỘ THỬ NGHIỆM VÀ XÁC THỰC DỮ LIỆU GAME "7 GIỜ KÉM 10" ===\n');
  let hasErrors = false;

  // 1. Đọc và phân tích cấu trúc file dialogues.vi.json (src/data và public/assets)
  console.log('--- 1. Kiểm tra các tệp hội thoại (dialogues.vi.json) ---');
  let dialogues = null;
  let publicDialogues = null;

  try {
    const rawDialogues = fs.readFileSync(DIALOGUES_PATH, 'utf8');
    dialogues = JSON.parse(rawDialogues);
    logSuccess(`Đọc và phân tích cú pháp dialogues.vi.json (src/data) thành công.`);
  } catch (err) {
    logError(`Không thể đọc hoặc phân tích dialogues.vi.json ở src/data: ${err.message}`);
    process.exit(1);
  }

  try {
    if (fs.existsSync(PUBLIC_DIALOGUES_PATH)) {
      const rawPublicDialogues = fs.readFileSync(PUBLIC_DIALOGUES_PATH, 'utf8');
      publicDialogues = JSON.parse(rawPublicDialogues);
      logSuccess(`Đọc và phân tích cú pháp dialogues.vi.json (public/assets) thành công.`);
      
      // So sánh nội dung hai tệp
      const dialoguesStr = JSON.stringify(dialogues);
      const publicDialoguesStr = JSON.stringify(publicDialogues);
      if (dialoguesStr !== publicDialoguesStr) {
        logError('Cảnh báo: Tệp dialogues.vi.json ở src/data và public/assets không khớp nhau!');
        hasErrors = true;
      } else {
        logSuccess('Đồng bộ hóa: dialogues.vi.json ở src/data và public/assets khớp nhau 100%.');
      }
    } else {
      logWarning(`Không tìm thấy dialogues.vi.json tại public/assets: ${PUBLIC_DIALOGUES_PATH}`);
    }
  } catch (err) {
    logError(`Lỗi khi so khớp dialogues.vi.json công khai: ${err.message}`);
    hasErrors = true;
  }

  // 2. Đọc và phân tích cấu trúc file insurance-packages.json
  console.log('\n--- 2. Kiểm tra tệp gói bảo hiểm (insurance-packages.json) ---');
  let insuranceData = null;
  try {
    const rawPackages = fs.readFileSync(PACKAGES_PATH, 'utf8');
    insuranceData = JSON.parse(rawPackages);
    logSuccess('Đọc và phân tích cú pháp insurance-packages.json thành công.');
  } catch (err) {
    logError(`Không thể đọc hoặc phân tích insurance-packages.json: ${err.message}`);
    process.exit(1);
  }

  // 3. Xác thực cấu trúc hội thoại và phân nhánh 3-loop
  console.log('\n--- 3. Xác thực luồng hội thoại & phân nhánh cốt truyện 3-loop ---');
  if (!dialogues.dayDialogues) {
    logError('Thiếu đối tượng "dayDialogues" ở cấp gốc của dialogues.vi.json.');
    hasErrors = true;
  } else {
    const loops = Object.keys(dialogues.dayDialogues);
    if (loops.length !== 3) {
      logError(`Số lượng vòng lặp trong dayDialogues phải là 3, hiện tại là ${loops.length}.`);
      hasErrors = true;
    } else {
      ['1', '2', '3'].forEach(loopId => {
        if (!dialogues.dayDialogues[loopId]) {
          logError(`Thiếu đối thoại cho vòng lặp "${loopId}".`);
          hasErrors = true;
        } else {
          logSuccess(`Xác thực vòng lặp "${loopId}" hợp lệ.`);
        }
      });
    }
  }

  // Xác thực collisions
  if (!dialogues.collisions) {
    logError('Thiếu đối tượng "collisions" ở cấp gốc.');
    hasErrors = true;
  } else {
    const requiredCollisions = ['pothole', 'vendor', 'vehicle', 'puddle', 'pedestrian'];
    requiredCollisions.forEach(colKey => {
      if (!dialogues.collisions[colKey]) {
        logError(`Thiếu sự cố va chạm bắt buộc: "${colKey}".`);
        hasErrors = true;
      } else {
        logSuccess(`Sự cố va chạm "${colKey}" hợp lệ.`);
      }
    });
  }

  // 4. Xác thực cấu trúc gói bảo hiểm trong insurance-packages.json
  console.log('\n--- 4. Xác thực cấu trúc và phí mua các gói bảo hiểm ---');
  if (!insuranceData.packages || !Array.isArray(insuranceData.packages)) {
    logError('Tệp insurance-packages.json thiếu mảng "packages" ở cấp gốc.');
    process.exit(1);
  }

  const packagesMap = new Map();
  const expectedCosts = {
    'red_helmet': 10,
    'old_bike': 20,
    'school_route': 30
  };

  insuranceData.packages.forEach((pkg, index) => {
    const pkgId = pkg.id || `chỉ mục ${index}`;
    console.log(`Đang kiểm tra gói bảo hiểm: "${pkgId}"...`);
    if (!pkg.id || typeof pkg.id !== 'string') {
      logError(`Gói bảo hiểm ở chỉ mục ${index} thiếu "id" hợp lệ.`);
      hasErrors = true;
    } else {
      packagesMap.set(pkg.id, pkg);
    }

    if (!pkg.name || typeof pkg.name !== 'string') {
      logError(`Gói bảo hiểm "${pkgId}" thiếu tên hiển thị ("name").`);
      hasErrors = true;
    }

    if (typeof pkg.cost !== 'number' || pkg.cost < 0) {
      logError(`Gói bảo hiểm "${pkgId}" có phí mua ("cost") không hợp lệ.`);
      hasErrors = true;
    } else {
      // Đối chiếu phí bảo hiểm mới với yêu cầu
      if (expectedCosts[pkg.id] !== undefined) {
        if (pkg.cost !== expectedCosts[pkg.id]) {
          logError(`Gói bảo hiểm "${pkg.id}" có phí mua thực tế là ${pkg.cost} xu, mong muốn là ${expectedCosts[pkg.id]} xu.`);
          hasErrors = true;
        } else {
          logSuccess(`Gói bảo hiểm "${pkg.id}" có phí mua khớp chính xác: ${pkg.cost} xu.`);
        }
      }
    }

    if (!pkg.coverage || typeof pkg.coverage !== 'object') {
      logError(`Gói bảo hiểm "${pkgId}" thiếu thông tin bảo hiểm ("coverage").`);
      hasErrors = true;
    } else {
      const { medical, repair } = pkg.coverage;
      if (typeof medical !== 'number' || medical < 0 || medical > 1.0) {
        logError(`Tỷ lệ bảo hiểm y tế ("coverage.medical") của gói "${pkgId}" phải từ 0 đến 1.`);
        hasErrors = true;
      }
      if (typeof repair !== 'number' || repair < 0 || repair > 1.0) {
        logError(`Tỷ lệ bảo hiểm sửa xe ("coverage.repair") của gói "${pkgId}" phải từ 0 đến 1.`);
        hasErrors = true;
      }
    }
  });

  // Kiểm tra sự tồn tại của 3 gói mới
  const expectedPackages = ['red_helmet', 'old_bike', 'school_route'];
  expectedPackages.forEach(pkgId => {
    if (!packagesMap.has(pkgId)) {
      logError(`Thiếu gói bảo hiểm bắt buộc: "${pkgId}".`);
      hasErrors = true;
    } else {
      logSuccess(`Tìm thấy gói bảo hiểm: "${pkgId}".`);
    }
  });

  // 5. Kiểm tra toán học bồi thường thực tế & đối chiếu văn bản (Claim Deductions)
  console.log('\n--- 5. Biên dịch tính toán claim bảo hiểm thực tế (Claim Math Compilation) ---');
  
  // Định nghĩa các địa điểm, chi phí cơ sở và các gói
  const locations = {
    hem_nho: { name: 'Hẻm Nhỏ', medical: 50, repair: 30 },
    cho_sang: { name: 'Chợ Sáng', medical: 20, repair: 60 },
    nga_tu: { name: 'Ngã Tư', medical: 100, repair: 120 },
    cong_truong: { name: 'Công Trường', medical: 40, repair: 50 }
  };

  const explanations = dialogues.claim_math_explanations;
  if (!explanations) {
    logError('Thiếu đối tượng "claim_math_explanations" trong dialogues.vi.json để đối chiếu toán học.');
    hasErrors = true;
  }

  for (const [locKey, locData] of Object.entries(locations)) {
    console.log(`\n>> Địa điểm: ${locData.name} (Chi phí Y tế cơ bản: ${locData.medical} xu, Sửa xe cơ bản: ${locData.repair} xu)`);
    
    for (const [pkgId, pkg] of packagesMap.entries()) {
      const medicalCoverage = pkg.coverage.medical;
      const repairCoverage = pkg.coverage.repair;

      // Phép toán làm tròn giống game
      const coveredMedical = Math.round(locData.medical * medicalCoverage);
      const coveredRepair = Math.round(locData.repair * repairCoverage);
      const selfPaidMedical = locData.medical - coveredMedical;
      const selfPaidRepair = locData.repair - coveredRepair;
      const totalSelfPaid = selfPaidMedical + selfPaidRepair;
      const totalCovered = coveredMedical + coveredRepair;

      console.log(`  - Gói [${pkg.name}]: BH chi trả (Y tế: ${coveredMedical}, Xe: ${coveredRepair}). Khách tự trả (Y tế: ${selfPaidMedical}, Xe: ${selfPaidRepair}). Tổng tự trả = ${totalSelfPaid} xu.`);

      // Đối chiếu văn bản trong dialogues.vi.json
      if (explanations) {
        if (!explanations[locKey] || !explanations[locKey][pkgId]) {
          logError(`Thiếu văn bản giải thích claim math cho địa điểm "${locKey}" và gói "${pkgId}" trong dialogues.vi.json.`);
          hasErrors = true;
          continue;
        }

        const textToCheck = explanations[locKey][pkgId];
        
        // Kiểm tra các con số toán học xuất hiện trong văn bản
        const checkPoints = [
          { num: totalSelfPaid.toString(), desc: 'Tổng chi trả thực tế của khách' },
          { num: selfPaidMedical.toString(), desc: 'Số tiền tự trả y tế' },
          { num: selfPaidRepair.toString(), desc: 'Số tiền tự trả sửa xe' }
        ];

        if (coveredMedical > 0) {
          checkPoints.push({ num: coveredMedical.toString(), desc: 'Số tiền bảo hiểm chi trả y tế' });
          checkPoints.push({ num: Math.round(medicalCoverage * 100).toString(), desc: 'Phần trăm hỗ trợ y tế' });
        }
        if (coveredRepair > 0) {
          checkPoints.push({ num: coveredRepair.toString(), desc: 'Số tiền bảo hiểm chi trả sửa xe' });
          checkPoints.push({ num: Math.round(repairCoverage * 100).toString(), desc: 'Phần trăm hỗ trợ sửa xe' });
        }

        let mathValid = true;
        checkPoints.forEach(({ num, desc }) => {
          if (!textToCheck.includes(num)) {
            logError(`[${locData.name} - ${pkg.name}] Thiếu hoặc sai con số cho [${desc}] trong hội thoại. Mong muốn chứa: "${num}". Nội dung thực tế: "${textToCheck}"`);
            mathValid = false;
            hasErrors = true;
          }
        });

        if (mathValid) {
          logSuccess(`[Khớp 100%] Văn bản cho ${locData.name} - ${pkg.name} hoàn toàn chính xác.`);
        }
      }
    }
  }

  // 6. Thử nghiệm Động: Trình giải quyết Sự kiện & Hệ thống Vòng lặp
  console.log('\n--- 6. Thử nghiệm Động: Trình giải quyết Sự kiện & Hệ thống Vòng lặp (EventResolver & LoopSystem) ---');

  try {
    const { EventResolver } = await import('./systems/EventResolver.js');
    const { LoopSystem } = await import('./systems/LoopSystem.js');

    // Khởi tạo trạng thái giả lập ban đầu
    const testState = {
      loopCount: 2,
      horrorLevel: 0,
      currentTime: "6:50",
      colorPercentage: 100,
      coin: 150,
      hasTalkedToMom: false,
      hasHelmet: false,
      hasCheckedBike: false,
      hasReadInsurance: false,
      selectedInsurancePackage: "none",
      accidentHistory: [],
      endingState: "none"
    };

    // Test case 1: Ngã Tư va chạm nguy hiểm không có bảo hộ hay bảo hiểm
    console.log('Case 1: Va chạm ngã tư (danger), không bảo hộ, không bảo hiểm');
    const state1 = JSON.parse(JSON.stringify(testState));
    const report1 = EventResolver.resolveEvent('nga_tu', 'danger', state1);
    
    // Đánh giá chi phí: 100 y tế, 120 sửa xe. Tổng = 220.
    if (report1.netCost !== 220) {
      logError(`Sai sót Net Cost Case 1: Nhận ${report1.netCost}, mong muốn 220.`);
      hasErrors = true;
    } else if (state1.coin !== -70) {
      logError(`Sai sót số dư ví Case 1: Nhận ${state1.coin}, mong muốn -70.`);
      hasErrors = true;
    } else {
      logSuccess('Case 1 Đạt yêu cầu (Khấu trừ chính xác 220 xu, ví âm 70 xu).');
    }

    // Test case 2: Ngã Tư va chạm nguy hiểm, CÓ bảo hộ (Mũ bảo hiểm + kiểm xe), KHÔNG bảo hiểm
    console.log('Case 2: Va chạm ngã tư (danger), có bảo hộ, không bảo hiểm');
    const state2 = JSON.parse(JSON.stringify(testState));
    state2.hasHelmet = true;
    state2.hasCheckedBike = true;
    const report2 = EventResolver.resolveEvent('nga_tu', 'danger', state2);
    
    // Đánh giá chi phí:
    // Medical: 100 * 0.5 = 50.
    // Repair: 120 * 0.5 = 60.
    // Tổng = 110. Không có bảo hiểm.
    if (report2.netCost !== 110) {
      logError(`Sai sót Net Cost Case 2: Nhận ${report2.netCost}, mong muốn 110.`);
      hasErrors = true;
    } else if (state2.coin !== 40) {
      logError(`Sai sót số dư ví Case 2: Nhận ${state2.coin}, mong muốn 40 xu.`);
      hasErrors = true;
    } else {
      logSuccess('Case 2 Đạt yêu cầu (Giảm 50% y tế & sửa xe nhờ mũ/kiểm xe: tự trả 110 xu).');
    }

    // Test case 3: Ngã Tư va chạm nguy hiểm, KHÔNG bảo hộ, CÓ bảo hiểm Gói Đường Đến Trường
    console.log('Case 3: Va chạm ngã tư (danger), không bảo hộ, gói bảo hiểm Đường Đến Trường (80%)');
    const state3 = JSON.parse(JSON.stringify(testState));
    state3.selectedInsurancePackage = 'school_route';
    const report3 = EventResolver.resolveEvent('nga_tu', 'danger', state3);
    
    // Đánh giá chi phí:
    // Medical: 100. Bảo hiểm trả 100 * 0.8 = 80. Tự trả: 20.
    // Repair: 120. Bảo hiểm trả 120 * 0.8 = 96. Tự trả: 24.
    // Tổng tự trả: 44.
    if (report3.netCost !== 44) {
      logError(`Sai sót Net Cost Case 3: Nhận ${report3.netCost}, mong muốn 44.`);
      hasErrors = true;
    } else if (state3.coin !== 106) {
      logError(`Sai sót số dư ví Case 3: Nhận ${state3.coin}, mong muốn 106 xu.`);
      hasErrors = true;
    } else {
      logSuccess('Case 3 Đạt yêu cầu (Bảo hiểm 80% gánh đỡ: tự trả 44 xu).');
    }

    // Test case 4: Ngã Tư va chạm nguy hiểm, CÓ bảo hộ VÀ bảo hiểm Gói Đường Đến Trường kết hợp
    console.log('Case 4: Va chạm ngã tư (danger), có bảo hộ + bảo hiểm Đường Đến Trường (80%)');
    const state4 = JSON.parse(JSON.stringify(testState));
    state4.hasHelmet = true;
    state4.hasCheckedBike = true;
    state4.selectedInsurancePackage = 'school_route';
    const report4 = EventResolver.resolveEvent('nga_tu', 'danger', state4);
    
    // Đánh giá chi phí:
    // Base: 100 medical, 120 repair.
    // Sau giảm trừ an toàn (50%): Medical = 50, Repair = 60.
    // Bảo hiểm Đường Đến Trường chi trả 80%:
    // - Medical: Math.round(50 * 0.8) = 40. Còn lại: 10.
    // - Repair: Math.round(60 * 0.8) = 48. Còn lại: 12.
    // Tổng tự trả: 10 + 12 = 22 xu.
    if (report4.netCost !== 22) {
      logError(`Sai sót Net Cost Case 4: Nhận ${report4.netCost}, mong muốn 22.`);
      hasErrors = true;
    } else if (state4.coin !== 128) {
      logError(`Sai sót số dư ví Case 4: Nhận ${state4.coin}, mong muốn 128 xu.`);
      hasErrors = true;
    } else {
      logSuccess('Case 4 Đạt yêu cầu (Kết hợp cả hai lớp bảo vệ: chỉ còn tự trả 22 xu).');
    }

    // Test case 5: Kiểm tra LoopSystem.triggerNextLoop
    console.log('Case 5: Kiểm tra chuyển vòng lặp qua LoopSystem.triggerNextLoop');
    const testNextState = {
      loopCount: 1,
      horrorLevel: 1,
      currentTime: "6:50",
      colorPercentage: 40,
      coin: 20,
      hasTalkedToMom: true,
      hasHelmet: true,
      hasCheckedBike: true,
      hasReadInsurance: true,
      selectedInsurancePackage: "school_route",
      accidentHistory: [{ some: 'report' }],
      endingState: "none"
    };

    const nextStateResult = LoopSystem.triggerNextLoop(testNextState);
    if (nextStateResult.loopCount !== 2) {
      logError(`LoopSystem không tăng loopCount: nhận ${nextStateResult.loopCount}, mong muốn 2.`);
      hasErrors = true;
    } else if (nextStateResult.hasHelmet !== false || nextStateResult.hasCheckedBike !== false || nextStateResult.selectedInsurancePackage !== 'none') {
      logError('LoopSystem không reset chính xác các trang bị và bảo hiểm.');
      hasErrors = true;
    } else if (nextStateResult.coin !== 150) {
      logError(`LoopSystem không cấp lại base coin tối thiểu khi phá sản/hụt tiền: nhận ${nextStateResult.coin}, mong muốn 150.`);
      hasErrors = true;
    } else {
      logSuccess('Case 5 Đạt yêu cầu (Vòng lặp tăng lên, trang bị reset, ví tiền được bổ sung an toàn).');
    }

  } catch (err) {
    logError(`Lỗi thực thi kiểm thử động EventResolver/LoopSystem: ${err.message}\n${err.stack}`);
    hasErrors = true;
  }

  // 7. Tổng kết kết quả kiểm tra
  console.log('\n================================================================');
  if (hasErrors) {
    logError('Quá trình kiểm tra phát hiện lỗi dữ liệu. Vui lòng sửa các lỗi trên.');
    process.exit(1);
  } else {
    logSuccess('Tất cả kiểm tra cấu trúc dữ liệu 3-loop, liên kết phân nhánh và toán học bảo hiểm của "7 Giờ Kém 10" đều HỢP LỆ và CHÍNH XÁC 100%!');
    process.exit(0);
  }
}

// Chạy xác thực dạng async
runValidation().catch(err => {
  logError(`Lỗi kiểm thử không mong đợi: ${err.message}`);
  process.exit(1);
});
