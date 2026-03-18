import { Pencil, SquarePen, Trash2 } from "lucide-react";
import {
  Actions,
  EmptyText,
  EmptyWrapper,
  IconButton,
  MobileActions,
  MobileCard,
  MobileDate,
  MobileHeader,
  MobileLabel,
  MobileList,
  MobileMeta,
  MobileRow,
  MobileTitle,
  MobileValue,
  Table,
  TableWrapper,
  Tag,
  Td,
  Th,
} from "./TransactionTableStyled";

function TransactionTable({ rows, showActions = false }) {
  if (!rows.length) {
    return (
      <EmptyWrapper aria-label="Lancamentos do fluxo de caixa">
        <EmptyText>Nenhum lancamento adicionado ainda.</EmptyText>
      </EmptyWrapper>
    );
  }

  return (
    <TableWrapper aria-label="Lancamentos do fluxo de caixa">
      <Table>
        <thead>
          <tr>
            <Th>Data</Th>
            <Th>Descricao</Th>
            <Th>Categoria</Th>
            <Th>Valor</Th>
            <Th>Tipo</Th>
            {showActions ? <Th>Acoes</Th> : null}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={`${row.date}-${row.description}`}>
              <Td>{row.date}</Td>
              <Td>{row.description}</Td>
              <Td>{row.category}</Td>
              <Td>{row.amount}</Td>
              <Td>
                <Tag $income={row.type.toLowerCase() === "entrada"}>
                  {row.type}
                </Tag>
              </Td>
              {showActions ? (
                <Td>
                  <Actions>
                    <IconButton type="button" aria-label="Editar categoria">
                      <SquarePen size={18} />
                    </IconButton>
                    <IconButton type="button" aria-label="Editar lancamento">
                      <Pencil size={18} />
                    </IconButton>
                    <IconButton type="button" aria-label="Excluir lancamento">
                      <Trash2 size={18} />
                    </IconButton>
                  </Actions>
                </Td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>

      <MobileList>
        {rows.map((row) => (
          <MobileCard key={`${row.date}-${row.description}`}>
            <MobileHeader>
              <div>
                <MobileTitle>{row.description}</MobileTitle>
                <MobileDate>{row.date}</MobileDate>
              </div>
              <Tag $income={row.type.toLowerCase() === "entrada"}>
                {row.type}
              </Tag>
            </MobileHeader>

            <MobileMeta>
              <MobileRow>
                <MobileLabel>Categoria</MobileLabel>
                <MobileValue>{row.category}</MobileValue>
              </MobileRow>
              <MobileRow>
                <MobileLabel>Valor</MobileLabel>
                <MobileValue>{row.amount}</MobileValue>
              </MobileRow>
            </MobileMeta>

            {showActions ? (
              <MobileActions>
                <IconButton type="button" aria-label="Editar categoria">
                  <SquarePen size={18} />
                </IconButton>
                <IconButton type="button" aria-label="Editar lancamento">
                  <Pencil size={18} />
                </IconButton>
                <IconButton type="button" aria-label="Excluir lancamento">
                  <Trash2 size={18} />
                </IconButton>
              </MobileActions>
            ) : null}
          </MobileCard>
        ))}
      </MobileList>
    </TableWrapper>
  );
}

export default TransactionTable;
