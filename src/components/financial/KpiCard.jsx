import { Card, Helper, Label, Value } from "./KpiCardStyled";

function KpiCard({ label, value, helper, highlight = false }) {
  return (
    <Card>
      <Label>{label}</Label>
      <Value $highlight={highlight}>{value}</Value>
      <Helper>{helper}</Helper>
    </Card>
  );
}

export default KpiCard;
