import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(18 11 24 / 0.5);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 140;
`;

const Dialog = styled.div`
  width: min(100%, 460px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  background: var(--surface-100);
  box-shadow: var(--shadow-card);
  padding: 18px;
`;

const Title = styled.h3`
  margin: 0;
  font-family: var(--font-heading);
  color: var(--text-main);
`;

const Message = styled.p`
  margin: 10px 0 0;
  color: var(--text-soft);
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;

  @media (max-width: 560px) {
    flex-direction: column-reverse;
  }
`;

const Button = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

const GhostButton = styled(Button)`
  background: #f4edf8;
  color: var(--text-main);
`;

const DangerButton = styled(Button)`
  background: #fde8ed;
  color: #8b2252;
`;

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  isLoading = false,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <Overlay onClick={onCancel} role="presentation">
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label={title || "Confirmar exclusão"}
        onClick={(event) => event.stopPropagation()}
      >
        <Title>{title || "Confirmar exclusão"}</Title>
        <Message>
          {message || "Tem certeza que deseja excluir este item?"}
        </Message>

        <Actions>
          <GhostButton type="button" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </GhostButton>
          <DangerButton type="button" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Excluindo..." : confirmLabel}
          </DangerButton>
        </Actions>
      </Dialog>
    </Overlay>
  );
}

export default ConfirmDialog;
