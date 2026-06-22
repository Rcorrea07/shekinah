import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { EventsPanel } from "./features/events/EventsPanel";
import { HomeDashboard } from "./features/home/HomeDashboard";
import { PrayerRequests } from "./features/prayer/PrayerRequests";
import { TestimoniesPanel } from "./features/testimonies/TestimoniesPanel";
import { useEvents } from "./hooks/useEvents";
import { usePrayerRequests } from "./hooks/usePrayerRequests";
import { useTestimonies } from "./hooks/useTestimonies";
import type { AppView } from "./types/domain";

const viewPaths: Record<AppView, string> = {
  home: "/",
  prayer: "/oracoes",
  events: "/avisos",
  testimonies: "/testemunhos",
};

const getActiveView = (pathname: string): AppView => {
  if (pathname.startsWith(viewPaths.prayer)) {
    return "prayer";
  }

  if (pathname.startsWith(viewPaths.events)) {
    return "events";
  }

  if (pathname.startsWith(viewPaths.testimonies)) {
    return "testimonies";
  }

  return "home";
};

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const prayerState = usePrayerRequests();
  const { events } = useEvents();
  const { testimonies, pendingCount } = useTestimonies();

  const handleNavigate = (view: AppView) => {
    navigate(viewPaths[view]);
  };

  return (
    <AppShell activeView={getActiveView(location.pathname)}>
      <Routes>
        <Route
          path="/"
          element={
            <HomeDashboard
              events={events}
              prayerRequests={prayerState.requests}
              testimonies={testimonies}
              onNavigate={handleNavigate}
            />
          }
        />

        <Route
          path="/oracoes"
          element={
            <PrayerRequests
              requests={prayerState.requests}
              error={prayerState.error}
              onCreate={prayerState.addPrayerRequest}
              onMarkPraying={prayerState.markPraying}
              hasPrayed={prayerState.hasPrayed}
            />
          }
        />

        <Route path="/avisos" element={<EventsPanel events={events} />} />

        <Route
          path="/testemunhos"
          element={<TestimoniesPanel testimonies={testimonies} pendingCount={pendingCount} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
