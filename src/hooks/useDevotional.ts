import { mockDevotional } from "../data/mockData";

export function useDevotional() {
  return {
    devotional: mockDevotional,
    isLoading: false,
    error: null,
  };
}
