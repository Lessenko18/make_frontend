import { Pencil, SquarePen, Trash2 } from "lucide-react";
import {
  Actions,
  EmptyText,
  EmptyWrapper,
  IconButton,
  Table,
  TableWrapper,
  Tag,
  Td,
  Th,
} from "./TransactionTableStyled";

function TransactionTable({ rows }) {
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
            <Th>Acoes</Th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

export default TransactionTable;
