import { mockTestimonies } from "../data/mockData";

export function useTestimonies() {
  const approvedTestimonies = mockTestimonies.filter(
    (testimony) => testimony.status === "approved",
  );

  const pendingCount = mockTestimonies.length - approvedTestimonies.length;

  return {
    testimonies: approvedTestimonies,
    pendingCount,
    isLoading: false,
    error: null,
  };
}
