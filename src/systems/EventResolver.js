export class EventResolver {
  /**
   * Resolves an event collision at a specific spot.
   * 
   * @param {string} spot - 'hem_nho', 'cho_sang', 'nga_tu'
   * @param {string} choice - 'safe', 'danger'
   * @param {object} state - Current player state from LoopSystem
   * @returns {object} Detailed report of costs, coverage, and final deductions
   */
  static resolveEvent(spot, choice, state) {
    // 1. Establish base costs based on spot, choice, and loop state
    let baseMedical = 0;
    let baseRepair = 0;
    let description = "";

    const isUnprepared = !state.hasHelmet || !state.hasCheckedBike;
    const isLoop1 = state.loopCount === 1;

    if (choice === 'safe') {
      baseMedical = 0;
      baseRepair = 0;
      if (spot === 'hem_nho') {
        description = "Bạn đi chậm qua hẻm nhỏ lồi lõm, tránh được ổ gà nguy hiểm. Xe đi êm ái, hoàn toàn an toàn.";
      } else if (spot === 'cho_sang') {
        description = "Bạn phanh gấp nhường đường trước xe hàng rong lùi ra, lách qua nhẹ nhàng và an toàn.";
      } else if (spot === 'nga_tu') {
        description = "Dừng xe sát lề nhường đường cho xe tải lớn đi qua ngã tư hoàn toàn an toàn.";
      } else if (spot === 'cong_truong') {
        description = "Bạn lách chậm qua rìa đường sạch của công trường, tránh được bãi cát trơn trượt an toàn.";
      }
    } else {
      // choice === 'danger'
      if (isLoop1) {
        // Crash occurs, and financial damage forces a reset (coin <= 0)
        baseMedical = Math.max(150, state.coin);
        baseRepair = Math.max(150, state.coin);
        if (spot === 'hem_nho') {
          description = "Để kịp giờ thi UEH, bạn vội vã phóng nhanh vượt ổ gà trong hẻm nhỏ hẹp. Xe sụp cực mạnh xuống hố sâu, hỏng nặng và bạn văng ra đường chấn thương nặng! Do không có bảo hiểm hỗ trợ tài chính, gánh nặng tiền bạc nuốt chửng cơ hội dự thi.";
        } else if (spot === 'cho_sang') {
          description = "Hoảng loạn sợ trễ thi, bạn rồ ga cố lách qua xe hàng rong! Va chạm mạnh làm bạn ngã nhào và bửng xe Cub vỡ nát. Do hoàn toàn thiếu chuẩn bị và bảo hiểm, chi phí y tế và sửa xe lập tức làm bạn cạn kiệt ví tiền.";
        } else if (spot === 'nga_tu') {
          description = "Nhìn đồng hồ chỉ còn ít phút, bạn cố vượt đèn vàng và bị xe tải lớn đâm sầm! Cú ngã mạnh làm bạn chấn thương nặng và xe nát bét. Thiếu mũ bảo hộ khiến bạn ngất lịm, mất hoàn toàn cơ hội bước vào phòng thi UEH.";
        } else if (spot === 'cong_truong') {
          description = "Lo sợ phòng thi đóng cửa, bạn phóng nhanh qua đống cát công trường! Xe trượt bánh cực mạnh khiến bạn ngã chấn thương nặng. Thiếu kiểm tra phanh lốp và bảo hiểm khiến bạn rơi vào cảnh nợ nần, bỏ lỡ tương lai.";
        }
      } else {
        // Standard danger (Loop 2+)
        if (spot === 'hem_nho') {
          baseMedical = 50;
          baseRepair = 30;
          if (state.hasHelmet && state.hasCheckedBike) {
            description = "Vì vội vã chạy thi, bạn phóng nhanh sụp ổ gà sâu hoắm! Nhờ đội mũ bảo hiểm đỏ và xe đã bảo dưỡng chu đáo tại tiệm bác Nam, chấn thương đầu và hư hỏng xe được giảm thiểu tối đa.";
          } else if (state.hasHelmet && !state.hasCheckedBike) {
            description = "Vội vã chạy thi, bạn phóng nhanh sụp ổ gà trong hẻm nhỏ. Nhờ đội mũ bảo hiểm đỏ bảo vệ đầu nên chấn thương được giảm nhẹ, nhưng chiếc lốp chưa bảo dưỡng bị non hơi khiến vành xe sụp xuống méo mó nặng nề!";
          } else if (!state.hasHelmet && state.hasCheckedBike) {
            description = "Sốt ruột chạy thi, bạn phóng nhanh sụp ổ gà. Nhờ xe đã được bác Nam bảo dưỡng chu đáo nên phanh kịp giảm tốc giúp giảm hư hại xe, nhưng do không đội mũ bảo hiểm đỏ, cú ngã làm bạn chấn thương đầu đau đớn.";
          } else {
            description = "Sốt ruột vì muộn giờ thi, bạn phóng nhanh vượt ổ gà. Xe sụp mạnh xuống hố do lốp xe non hơi chưa bảo dưỡng làm méo vành nặng, và bạn ngã chấn thương tay lái! Thiếu cả mũ bảo hiểm đỏ khiến chấn thương thêm nghiêm trọng.";
          }
        } else if (spot === 'cho_sang') {
          baseMedical = 20;
          baseRepair = 60;
          if (state.hasHelmet && state.hasCheckedBike) {
            description = "Để kịp giờ thi, bạn rồ ga lách qua xe hàng rong và va quẹt mạnh làm vỡ bửng xe Cub. May mắn nhờ xe đã được kiểm tra phanh lốp chu đáo và bạn đội mũ bảo hiểm đỏ nên tổn hại cho cả người và xe được hạn chế tối đa.";
          } else if (state.hasHelmet && !state.hasCheckedBike) {
            description = "Rồ ga lách qua xe hàng rong để kịp giờ thi và va quẹt mạnh! Chiếc mũ bảo hiểm đỏ đã che chắn tốt cho vùng đầu của bạn, nhưng hệ thống phanh mòn chưa bảo dưỡng khiến bạn không kịp giảm tốc, làm yếm xe va đập vỡ nát.";
          } else if (!state.hasHelmet && state.hasCheckedBike) {
            description = "Cố lách qua xe hàng rong và va chạm mạnh! Nhờ lốp và phanh xe đã được bảo dưỡng tốt nên xe kịp phanh giảm lực va chạm, hạn chế hỏng hóc, nhưng do thiếu mũ bảo hiểm đỏ bảo vệ, bạn bị chấn thương vùng mặt khi ngã.";
          } else {
            description = "Cố lách qua xe hàng rong để kịp giờ thi! Bạn va quẹt mạnh, ngã nhào vỡ nát bửng xe. Do phanh lốp chưa được bảo dưỡng và thiếu mũ bảo hiểm đỏ bảo vệ, lực va quẹt làm cả cơ thể lẫn xe Cub tổn thất nặng nề.";
          }
        } else if (spot === 'nga_tu') {
          baseMedical = 100;
          baseRepair = 120;
          if (state.hasHelmet && state.hasCheckedBike) {
            description = "Cố vượt đèn vàng để kịp giờ thi và bị xe máy ngược chiều đâm sầm! Nhờ có mũ bảo hiểm đỏ che chắn đầu và xe Cub được bảo dưỡng tốt giúp giảm chấn lực, bạn tránh được chấn thương nghiêm trọng dù xe bị móp méo.";
          } else if (state.hasHelmet && !state.hasCheckedBike) {
            description = "Cố vượt đèn vàng và xảy ra va chạm mạnh ở ngã tư! Mũ bảo hiểm đỏ đã cứu bạn khỏi chấn thương sọ não nguy hiểm, nhưng chiếc xe Cub chưa được kiểm tra hệ thống phanh khiến cú va đập trực diện làm đầu xe méo xệch hoàn toàn.";
          } else if (!state.hasHelmet && state.hasCheckedBike) {
            description = "Vượt đèn vàng ngã tư và bị xe khác đâm trúng! Hệ thống phanh đã bảo dưỡng giúp xe giảm xung lực đáng kể, giảm hỏng hóc cho xe, nhưng việc thiếu chiếc mũ bảo hiểm đỏ khiến bạn chịu chấn thương đầu đau đớn.";
          } else {
            description = "Cố đánh cược vượt đèn vàng tại ngã tư để kịp thi, bạn bị xe khác đâm sầm! Cú ngã cực mạnh làm chấn thương và xe hỏng nặng. Thiếu cả mũ bảo hiểm đỏ lẫn bảo dưỡng phanh xe dẫn đến chi phí điều trị và sửa xe đắt đỏ.";
          }
        } else if (spot === 'cong_truong') {
          baseMedical = 40;
          baseRepair = 50;
          if (state.hasHelmet && state.hasCheckedBike) {
            description = "Phóng nhanh qua đống cát công trường để kịp giờ thi! Xe bị trượt cát loạng choạng ngã bầm tím chân tay. Nhờ phanh lốp được kiểm tra chu đáo bám đường tốt và có mũ bảo hiểm đỏ bảo vệ, bạn đã giảm thiểu tối đa tổn hại.";
          } else if (state.hasHelmet && !state.hasCheckedBike) {
            description = "Phóng nhanh qua đống cát công trường và bị trượt ngã. Nhờ đội mũ bảo hiểm đỏ nên đầu bạn không bị va đập, nhưng lốp xe mòn chưa kiểm tra bị trượt dài trên cát khiến xe ngã văng ra, xước xát hư hỏng nặng.";
          } else if (!state.hasHelmet && state.hasCheckedBike) {
            description = "Chạy nhanh qua đống cát công trường! Nhờ lốp xe mới bảo dưỡng bám đường tốt giúp xe không bị lật nhào nặng, xe chỉ trầy nhẹ, nhưng do thiếu mũ bảo hiểm đỏ, bạn bị cát bụi dội vào mặt và chấn thương nhẹ đầu.";
          } else {
            description = "Phóng nhanh qua cát công trường để kịp giờ thi! Xe trượt bánh mạnh trên nền cát trơn do phanh lốp không đảm bảo, khiến bạn mất lái hoàn toàn, ngã chấn thương nặng và hỏng xe do thiếu cả mũ bảo hiểm bảo vệ.";
          }
        }
      }
    }

    // 2. Apply item reductions
    let itemMedicalReduction = 0;
    let itemRepairReduction = 0;

    if (state.hasHelmet) {
      // Helmet reduces medical cost by 50%
      itemMedicalReduction = Math.round(baseMedical * 0.5);
    }
    if (state.hasCheckedBike) {
      // Checked bike reduces repair cost by 50% (preventive maintenance)
      itemRepairReduction = Math.round(baseRepair * 0.5);
    }

    const afterItemMedical = baseMedical - itemMedicalReduction;
    const afterItemRepair = baseRepair - itemRepairReduction;

    // 3. Apply Insurance coverage calculations
    let coveredMedical = 0;
    let coveredRepair = 0;
    const insuranceType = state.selectedInsurancePackage; // 'none', 'red_helmet', 'old_bike', 'school_route'

    if (insuranceType === 'red_helmet') {
      // Covers 100% of remaining medical
      coveredMedical = afterItemMedical;
      coveredRepair = 0;
    } else if (insuranceType === 'old_bike') {
      // Covers 100% of remaining repair
      coveredMedical = 0;
      coveredRepair = afterItemRepair;
    } else if (insuranceType === 'school_route') {
      // Covers 80% of both medical and repair
      coveredMedical = Math.round(afterItemMedical * 0.8);
      coveredRepair = Math.round(afterItemRepair * 0.8);
    } else {
      // 'none' - no coverage
      coveredMedical = 0;
      coveredRepair = 0;
    }

    // 4. Calculate Net Out-of-pocket costs
    const netMedical = afterItemMedical - coveredMedical;
    const netRepair = afterItemRepair - coveredRepair;
    const netCost = netMedical + netRepair;

    // 5. Deduct from player coin (allow coin to go below or equal to 0, which triggers game over)
    const originalCoin = state.coin;
    if (choice === 'safe') {
      // Award safety reward of +10 coins
      state.coin = originalCoin + 10;
    } else {
      state.coin -= netCost;
    }

    // 6. Calculate color percentage changes
    let colorDelta = 0;
    if (state.hasHelmet) {
      colorDelta += 10;
    } else {
      colorDelta -= 10;
    }

    if (state.hasCheckedBike) {
      colorDelta += 10;
    }

    if (state.selectedInsurancePackage === 'none') {
      colorDelta -= 15;
    } else {
      if (coveredMedical > 0 || coveredRepair > 0) {
        colorDelta += 15;
      }
    }

    if (choice === 'safe') {
      colorDelta += 10;
    } else {
      colorDelta -= 20;
    }

    const originalColorPercentage = state.colorPercentage !== undefined ? state.colorPercentage : 100;
    state.colorPercentage = Math.max(0, Math.min(100, originalColorPercentage + colorDelta));

    // Record this accident into the history
    const spotNames = {
      'hem_nho': 'Hẻm Nhỏ',
      'cho_sang': 'Chợ Sáng',
      'nga_tu': 'Ngã Tư',
      'cong_truong': 'Công Trường'
    };

    const report = {
      spot: spotNames[spot] || spot,
      choice: choice === 'safe' ? 'An toàn' : 'Nguy hiểm',
      description,
      baseMedical,
      baseRepair,
      itemMedicalReduction,
      itemRepairReduction,
      coveredMedical,
      coveredRepair,
      netMedical,
      netRepair,
      netCost,
      originalCoin,
      newCoin: state.coin,
      insuranceApplied: insuranceType,
      colorDelta,
      originalColorPercentage,
      newColorPercentage: state.colorPercentage
    };

    state.accidentHistory.push(report);

    return report;
  }
}
