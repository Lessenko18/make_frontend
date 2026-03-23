import { useState } from "react";
import { Pencil, SquarePen, Trash2 } from "lucide-react";
import {
  Actions,
  EmptyText,
  EmptyStateCell,
  EmptyStateRow,
  FilterInput,
  FilterSelect,
  HeaderFilterContainer,
  HeaderLabelButton,
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
  MutedText,
  RangeFilter,
  Table,
  TableWrapper,
  Tag,
  Td,
  Th,
} from "./TransactionTableStyled";

function TransactionTable({
  rows,
  showActions = false,
  filters,
  onFilterChange,
  categoryOptions = [],
}) {
  const hasFilters = Boolean(filters && onFilterChange);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);

  const toggleFilterColumn = (column) => {
    if (!hasFilters) return;
    setActiveFilterColumn((prev) => (prev === column ? null : column));
  };

  const renderFilterControl = (column) => {
    if (!hasFilters || activeFilterColumn !== column) return null;

    if (column === "date") {
      return (
        <HeaderFilterContainer>
          <RangeFilter>
            <FilterInput
              type="date"
              value={filters.dateFrom}
              onChange={(event) =>
                onFilterChange("dateFrom", event.target.value)
              }
              aria-label="Filtrar data inicial"
            />
            <FilterInput
              type="date"
              value={filters.dateTo}
              onChange={(event) => onFilterChange("dateTo", event.target.value)}
              aria-label="Filtrar data final"
            />
          </RangeFilter>
        </HeaderFilterContainer>
      );
    }

    if (column === "description") {
      return (
        <HeaderFilterContainer>
          <FilterInput
            value={filters.description}
            onChange={(event) =>
              onFilterChange("description", event.target.value)
            }
            placeholder="Descrição"
            aria-label="Filtrar por descrição"
          />
        </HeaderFilterContainer>
      );
    }

    if (column === "category") {
      return (
        <HeaderFilterContainer>
          <FilterSelect
            value={filters.category}
            onChange={(event) => onFilterChange("category", event.target.value)}
            aria-label="Filtrar por categoria"
          >
            <option value="">Todas</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
        </HeaderFilterContainer>
      );
    }

    if (column === "notes") {
      return (
        <HeaderFilterContainer>
          <FilterInput
            value={filters.notes}
            onChange={(event) => onFilterChange("notes", event.target.value)}
            placeholder="Observação"
            aria-label="Filtrar por observação"
          />
        </HeaderFilterContainer>
      );
    }

    if (column === "paymentMethod") {
      return (
        <HeaderFilterContainer>
          <FilterSelect
            value={filters.paymentMethod}
            onChange={(event) =>
              onFilterChange("paymentMethod", event.target.value)
            }
            aria-label="Filtrar por forma de pagamento"
          >
            <option value="">Todos</option>
            <option value="pix">Pix</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao_credito">Cartão crédito</option>
            <option value="cartao_debito">Cartão débito</option>
            <option value="transferencia">Transferência</option>
            <option value="outro">Outro</option>
          </FilterSelect>
        </HeaderFilterContainer>
      );
    }

    if (column === "amount") {
      return (
        <HeaderFilterContainer>
          <RangeFilter>
            <FilterInput
              type="number"
              min="0"
              step="0.01"
              value={filters.amountMin}
              onChange={(event) =>
                onFilterChange("amountMin", event.target.value)
              }
              placeholder="Mín"
              aria-label="Valor mínimo"
            />
            <FilterInput
              type="number"
              min="0"
              step="0.01"
              value={filters.amountMax}
              onChange={(event) =>
                onFilterChange("amountMax", event.target.value)
              }
              placeholder="Máx"
              aria-label="Valor máximo"
            />
          </RangeFilter>
        </HeaderFilterContainer>
      );
    }

    if (column === "type") {
      return (
        <HeaderFilterContainer>
          <FilterSelect
            value={filters.type}
            onChange={(event) => onFilterChange("type", event.target.value)}
            aria-label="Filtrar por tipo"
          >
            <option value="">Todos</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </FilterSelect>
        </HeaderFilterContainer>
      );
    }

    return null;
  };

  return (
    <TableWrapper aria-label="Lancamentos do fluxo de caixa">
      <Table>
        <thead>
          <tr>
            <Th>
              <HeaderLabelButton
                type="button"
                onClick={() => toggleFilterColumn("date")}
                $active={activeFilterColumn === "date"}
              >
                Data
              </HeaderLabelButton>
              {renderFilterControl("date")}
            </Th>
            <Th>
              <HeaderLabelButton
                type="button"
                onClick={() => toggleFilterColumn("description")}
                $active={activeFilterColumn === "description"}
              >
                Descricao
              </HeaderLabelButton>
              {renderFilterControl("description")}
            </Th>
            <Th>
              <HeaderLabelButton
                type="button"
                onClick={() => toggleFilterColumn("category")}
                $active={activeFilterColumn === "category"}
              >
                Categoria
              </HeaderLabelButton>
              {renderFilterControl("category")}
            </Th>
            <Th>
              <HeaderLabelButton
                type="button"
                onClick={() => toggleFilterColumn("notes")}
                $active={activeFilterColumn === "notes"}
              >
                Observacao
              </HeaderLabelButton>
              {renderFilterControl("notes")}
            </Th>
            <Th>
              <HeaderLabelButton
                type="button"
                onClick={() => toggleFilterColumn("paymentMethod")}
                $active={activeFilterColumn === "paymentMethod"}
              >
                Forma de pagamento
              </HeaderLabelButton>
              {renderFilterControl("paymentMethod")}
            </Th>
            <Th>
              <HeaderLabelButton
                type="button"
                onClick={() => toggleFilterColumn("amount")}
                $active={activeFilterColumn === "amount"}
              >
                Valor
              </HeaderLabelButton>
              {renderFilterControl("amount")}
            </Th>
            <Th>
              <HeaderLabelButton
                type="button"
                onClick={() => toggleFilterColumn("type")}
                $active={activeFilterColumn === "type"}
              >
                Tipo
              </HeaderLabelButton>
              {renderFilterControl("type")}
            </Th>
            {showActions ? <Th>Acoes</Th> : null}
          </tr>
        </thead>

        <tbody>
          {rows.length ? (
            rows.map((row, index) => (
              <tr key={`${row.date}-${row.description}-${index}`}>
                <Td>{row.date}</Td>
                <Td>{row.description}</Td>
                <Td>{row.category}</Td>
                <Td>
                  <MutedText>{row.notes || "-"}</MutedText>
                </Td>
                <Td>{row.paymentMethod || "-"}</Td>
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
            ))
          ) : (
            <EmptyStateRow>
              <EmptyStateCell colSpan={showActions ? 8 : 7}>
                <EmptyText>
                  Nenhum lancamento encontrado para este filtro.
                </EmptyText>
              </EmptyStateCell>
            </EmptyStateRow>
          )}
        </tbody>
      </Table>

      <MobileList>
        {rows.length ? (
          rows.map((row, index) => (
            <MobileCard key={`${row.date}-${row.description}-${index}`}>
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
                <MobileRow>
                  <MobileLabel>Observacao</MobileLabel>
                  <MobileValue>{row.notes || "-"}</MobileValue>
                </MobileRow>
                <MobileRow>
                  <MobileLabel>Pagamento</MobileLabel>
                  <MobileValue>{row.paymentMethod || "-"}</MobileValue>
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
          ))
        ) : (
          <MobileCard>
            <EmptyText>
              Nenhum lancamento encontrado para este filtro.
            </EmptyText>
          </MobileCard>
        )}
      </MobileList>
    </TableWrapper>
  );
}

export default TransactionTable;
