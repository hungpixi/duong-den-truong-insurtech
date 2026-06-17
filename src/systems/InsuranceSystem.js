export const INSURANCE_PACKAGES = [
  {
    id: "none",
    name: "Không tham gia",
    price: 0,
    medicalCoverage: 0.0,
    repairCoverage: 0.0,
    description: "Không tốn chi phí mua ban đầu. Tự trả 100% khi gặp nạn.",
    pros: "Không tốn xu mua ban đầu.",
    cons: "Tự chịu mọi thiệt hại y tế và sửa xe.",
    icon: "❌"
  },
  {
    id: "red_helmet",
    name: "Gói Mũ Đỏ",
    price: 10,
    medicalCoverage: 1.0,
    repairCoverage: 0.0,
    description: "Tập trung bảo vệ y tế khi xảy ra va chạm.",
    pros: "Hỗ trợ 100% chi phí y tế.",
    cons: "Không bồi thường chi phí sửa xe.",
    icon: "⛑️"
  },
  {
    id: "old_bike",
    name: "Gói Xe Cũ",
    price: 20,
    medicalCoverage: 0.0,
    repairCoverage: 1.0,
    description: "Tập trung bồi thường sửa chữa phương tiện cũ.",
    pros: "Hỗ trợ 100% chi phí sửa xe.",
    cons: "Không bồi thường chi phí điều trị y tế.",
    icon: "🚲"
  },
  {
    id: "school_route",
    name: "Gói Đường Đến Trường",
    price: 30,
    medicalCoverage: 0.8,
    repairCoverage: 0.8,
    description: "Gói bảo vệ toàn diện cao cấp cho học sinh.",
    pros: "Hỗ trợ 80% y tế và 80% sửa xe.",
    cons: "Phí tham gia cao nhất (30 xu).",
    icon: "🎒"
  }
];

export class InsuranceSystem {
  static getPackage(id) {
    return INSURANCE_PACKAGES.find(p => p.id === id) || INSURANCE_PACKAGES[0];
  }

  /**
   * Calculates the financial breakdown of an accident.
   * @param {string} packageId - Selected insurance package ID
   * @param {number} baseMedicalCost - Medical cost incurred
   * @param {number} baseRepairCost - Vehicle repair cost incurred
   * @returns {object} Breakdown including covered amounts and player out-of-pocket costs.
   */
  static processClaim(packageId, baseMedicalCost, baseRepairCost) {
    const pkg = this.getPackage(packageId);

    const coveredMedical = Math.round(baseMedicalCost * pkg.medicalCoverage);
    const coveredRepair = Math.round(baseRepairCost * pkg.repairCoverage);

    const outOfPocketMedical = Math.max(0, baseMedicalCost - coveredMedical);
    const outOfPocketRepair = Math.max(0, baseRepairCost - coveredRepair);

    const totalBase = baseMedicalCost + baseRepairCost;
    const totalCovered = coveredMedical + coveredRepair;
    const totalOutOfPocket = outOfPocketMedical + outOfPocketRepair;

    return {
      packageId,
      packageName: pkg.name,
      baseMedicalCost,
      baseRepairCost,
      coveredMedical,
      coveredRepair,
      outOfPocketMedical,
      outOfPocketRepair,
      totalBase,
      totalCovered,
      totalOutOfPocket
    };
  }
}
