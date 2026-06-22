import { mockEvents } from "../data/mockData";

export function useEvents() {
  return {
    events: mockEvents,
    isLoading: false,
    error: null,
  };
}
