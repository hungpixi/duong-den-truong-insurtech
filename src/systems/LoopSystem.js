export const DEFAULT_LOOP_STATE = {
  loopCount: 1,
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
  endingState: "none",
  vehicleType: "cub50"
};

export class LoopSystem {
  static getStorageKey() {
    return 'seven_kem_ten_loop_state';
  }

  static loadState() {
    try {
      const serialized = localStorage.getItem(this.getStorageKey());
      if (serialized === null) {
        return { ...JSON.parse(JSON.stringify(DEFAULT_LOOP_STATE)) };
      }
      const state = JSON.parse(serialized);
      return {
        ...DEFAULT_LOOP_STATE,
        ...state
      };
    } catch (e) {
      console.error('Error loading loop state:', e);
      return { ...JSON.parse(JSON.stringify(DEFAULT_LOOP_STATE)) };
    }
  }

  static saveState(state) {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(this.getStorageKey(), serialized);
      return true;
    } catch (e) {
      console.error('Error saving loop state:', e);
      return false;
    }
  }

  static resetState() {
    try {
      localStorage.removeItem(this.getStorageKey());
      return { ...JSON.parse(JSON.stringify(DEFAULT_LOOP_STATE)) };
    } catch (e) {
      console.error('Error resetting loop state:', e);
      return { ...JSON.parse(JSON.stringify(DEFAULT_LOOP_STATE)) };
    }
  }

  static triggerNextLoop(state) {
    state.loopCount += 1;
    state.horrorLevel = Math.min(5, state.horrorLevel + 1);
    state.currentTime = "6:50";
    state.colorPercentage = 100;
    state.hasTalkedToMom = false;
    state.hasHelmet = false;
    state.hasCheckedBike = false;
    state.hasReadInsurance = false;
    state.selectedInsurancePackage = "none";
    state.accidentHistory = [];
    state.endingState = "none";
    // Replenish coin to a base amount if they went bankrupt, or keep some
    state.coin = Math.max(150, state.coin);
    this.saveState(state);
    return state;
  }
}
