import styled from "styled-components";

export const CalendarPage = styled.section`
  max-width: 1120px;
  margin: 0 auto;
`;

export const CalendarCard = styled.section`
  border: 1px solid var(--border-soft);
  background: rgb(255 255 255 / 0.86);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-card);

  @media (max-width: 640px) {
    padding: 14px;
  }
`;

export const CalendarMeta = styled.p`
  margin: 0 0 12px;
  color: var(--text-soft);
  font-weight: 600;
`;

export const CalendarContainer = styled.div`
  margin-top: 8px;

  .fc {
    min-width: 0;
  }

  /* FullCalendar Event Styling */
  .fc-event {
    border: 0 !important;
    box-shadow: 0 2px 8px rgb(41 32 61 / 0.2);
    color: #3f3050 !important;
  }

  .fc-event-main {
    color: #3f3050 !important;
  }

  .fc-event-title {
    font-weight: 700;
    font-size: 0.88rem;
    padding: 4px 6px;
    color: #3f3050 !important;
  }

  .fc-daygrid-dot-event .fc-event-title {
    color: var(--text-main) !important;
  }

  .fc-daygrid-event-dot {
    border-width: 6px;
    display: none;
  }

  .fc-daygrid-dot-event .fc-event-time {
    margin-left: 2px;
  }

  .event-service-lilas {
    --event-start: #d9c8ef;
    --event-end: #eadcf9;
    --event-dot: #af8ad8;
  }

  .event-service-dourado {
    --event-start: #f0e1b7;
    --event-end: #f7ebcb;
    --event-dot: #d2b164;
  }

  .event-service-rosinha {
    --event-start: #f6cfe0;
    --event-end: #fbe0ec;
    --event-dot: #da90b1;
  }

  .event-service-lilas,
  .event-service-dourado,
  .event-service-rosinha {
    background: linear-gradient(
      135deg,
      var(--event-start),
      var(--event-end)
    ) !important;
  }

  .event-service-lilas .fc-daygrid-event-dot,
  .event-service-dourado .fc-daygrid-event-dot,
  .event-service-rosinha .fc-daygrid-event-dot {
    border-color: var(--event-dot) !important;
  }

  .event-is-encerrado {
    box-shadow:
      inset 0 0 0 2px rgb(255 255 255 / 0.7),
      0 2px 8px rgb(41 32 61 / 0.2) !important;
    filter: saturate(0.82) brightness(0.96);
  }

  .fc-daygrid-day-frame {
    min-height: 100px;
  }

  .fc-daygrid-day {
    position: relative;
  }

  .fc-daygrid-day.fc-daygrid-day-other {
    background-color: #fafafa;
  }

  .fc-daygrid-day.fc-day {
    padding: 8px 4px;
  }

  .fc-daygrid-day-number {
    padding: 6px 6px;
    font-weight: 600;
  }

  .fc-day-today {
    background-color: rgb(236 225 241 / 0.7) !important;
  }

  .fc-button-primary {
    background-color: var(--brand-700) !important;
    border-color: var(--brand-700) !important;
  }

  .fc-button-primary:hover {
    background-color: var(--brand-800) !important;
    border-color: var(--brand-800) !important;
  }

  .fc-button-primary.fc-button-active {
    background-color: var(--brand-900) !important;
    border-color: var(--brand-900) !important;
  }

  .fc-col-header-cell {
    padding: 8px 0 !important;
    background-color: transparent;
    border-bottom: 2px solid var(--border-soft);
  }

  .fc-daygrid-body-unbalanced .fc-daygrid-day {
    border: 1px solid var(--border-soft);
  }

  @media (max-width: 720px) {
    .fc-toolbar {
      gap: 10px;
    }

    .fc-toolbar.fc-header-toolbar {
      flex-direction: column;
      align-items: stretch;
    }

    .fc-toolbar-chunk {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .fc .fc-toolbar-title {
      font-size: 1.1rem;
      text-align: center;
    }

    .fc-daygrid-day-frame {
      min-height: 76px;
    }

    .fc-event-title {
      font-size: 0.76rem;
      line-height: 1.25;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(18 11 24 / 0.42);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 120;
`;

export const Modal = styled.div`
  width: min(100%, 680px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  background: var(--surface-100);
  box-shadow: var(--shadow-card);
  padding: 18px;
  max-height: 92vh;
  overflow: auto;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 14px;
  font-family: var(--font-heading);
  color: var(--brand-900);
`;

export const Form = styled.form`
  display: grid;
  gap: 12px;
`;

export const Split = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 6px;
  font-weight: 600;
  color: var(--text-main);
`;

export const Input = styled.input`
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: #fff;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: var(--brand-700);
    box-shadow: 0 0 0 3px rgb(114 65 138 / 0.16);
  }
`;

export const Select = styled.select`
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: #fff;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: var(--brand-700);
    box-shadow: 0 0 0 3px rgb(114 65 138 / 0.16);
  }
`;

export const Textarea = styled.textarea`
  border-radius: 12px;
  border: 1px solid var(--border-soft);
  background: #fff;
  padding: 10px 12px;
  outline: none;
  min-height: 84px;
  resize: vertical;

  &:focus {
    border-color: var(--brand-700);
    box-shadow: 0 0 0 3px rgb(114 65 138 / 0.16);
  }
`;

export const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-main);

  label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
  }
`;

export const ClientOption = styled.p`
  margin: 0;
  color: var(--text-soft);
  font-size: 0.93rem;
`;

export const Badge = styled.span`
  display: inline-flex;
  width: fit-content;
  border-radius: var(--radius-pill);
  padding: 6px 12px;
  background: var(--brand-100);
  color: var(--brand-900);
  font-weight: 700;

  &.status-badge {
    margin-bottom: 2px;
  }

  &.status-agendado {
    background: #e8f3ff;
    color: #195cad;
  }

  &.status-encerrado {
    background: #ece1f1;
    color: #5d2f7d;
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #b03145;
  font-weight: 700;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
  flex-wrap: wrap;

  @media (max-width: 560px) {
    flex-direction: column-reverse;
  }
`;

export const Button = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const GhostButton = styled(Button)`
  background: #f4edf8;
  color: var(--text-main);
`;

export const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, var(--brand-800), var(--brand-700));
  color: #fff;
`;

export const DangerButton = styled(Button)`
  background: #fde8ed;
  color: #8b2252;
`;
