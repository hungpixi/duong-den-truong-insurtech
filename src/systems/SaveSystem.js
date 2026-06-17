export const DEFAULT_STATE = {
  day: 1,
  coins: 500,
  safetyScore: 100,
  insuranceLiteracy: 100,
  selectedInsuranceId: "none",
  health: 100,
  history: []
};

export class SaveSystem {
  static getStorageKey() {
    return 'duong_den_truong_save_state';
  }

  static loadState() {
    try {
      const serialized = localStorage.getItem(this.getStorageKey());
      if (serialized === null) {
        return { ...DEFAULT_STATE };
      }
      const state = JSON.parse(serialized);
      // Double check all keys are present
      return {
        ...DEFAULT_STATE,
        ...state
      };
    } catch (e) {
      console.error('Error loading game state from localStorage:', e);
      return { ...DEFAULT_STATE };
    }
  }

  static saveState(state) {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(this.getStorageKey(), serialized);
      return true;
    } catch (e) {
      console.error('Error saving game state to localStorage:', e);
      return false;
    }
  }

  static resetState() {
    try {
      localStorage.removeItem(this.getStorageKey());
      return { ...DEFAULT_STATE };
    } catch (e) {
      console.error('Error resetting game state:', e);
      return { ...DEFAULT_STATE };
    }
  }
}
