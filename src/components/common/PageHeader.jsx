import {
  ActionButton,
  Breadcrumb,
  Header,
  HeaderInfo,
  Title,
} from "./PageHeaderStyled";

function PageHeader({ breadcrumb, title, actionLabel, actionIcon, onAction }) {
  return (
    <Header>
      <HeaderInfo>
        <Breadcrumb>{breadcrumb}</Breadcrumb>
        <Title>{title}</Title>
      </HeaderInfo>

      <ActionButton type="button" onClick={onAction}>
        {actionIcon}
        <span>{actionLabel}</span>
      </ActionButton>
    </Header>
  );
}

export default PageHeader;
