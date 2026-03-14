import AppShell from "../../components/layout/AppShell";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import {
  CalendarPage,
  CalendarTitle,
  CalendarContainer,
} from "./calendarStyled";

function Calendar({ title }) {
  const isAgendaPage = title?.toLowerCase() === "agenda";

  const handleDateClick = (info) => {
    window.alert(`Data clicada: ${info.dateStr}`);
  };

  return (
    <AppShell activeSection={title?.toLowerCase()}>
      <CalendarPage>
        <CalendarTitle>{title}</CalendarTitle>

        {isAgendaPage ? (
          <CalendarContainer>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              locale={ptBrLocale}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              selectable
              dateClick={handleDateClick}
              height="auto"
            />
          </CalendarContainer>
        ) : null}
      </CalendarPage>
    </AppShell>
  );
}

export default Calendar;
