import { memo, useRef } from 'react';
import Loading from '@/components/Icons/Loading';
import { formatTitle } from '../../helpers';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableBody,
  StyledTableRow,
  StyledTableAction,
  StyledTableDapp,
  StyledTableDappImg,
  StyledTableDappName,
  StyledTableExecution,
  StyledExecutionButton,
  StyledClean,
} from './styles';

const COLUMNS = [
  {
    key: 'action',
    label: 'Action',
    width: '35%',
  },
  {
    key: 'dapp',
    label: 'dApp',
    width: '25%',
  },
  {
    key: 'execution-number',
    label: 'My Execution',
    width: '15%',
  },
  {
    key: 'execution',
    label: 'Execution',
    width: '15%',
  },
  {
    key: 'clean',
    label: 'Clean all',
    width: '10%',
  },
];

const Table = ({ loading, list, deleting, handleDelete, openModal }: any) => {
  const currentActionId = useRef<string>();
  return (
    <StyledTable>
      <StyledTableHeader>
        {COLUMNS.map((column) => (
          <div key={column.key} style={{ width: column.width }}>
            {column.label}
          </div>
        ))}
      </StyledTableHeader>
      <StyledTableBody>
        {list?.map((item: any, i: number) => (
          <StyledTableRow key={i + Date.now()} data-bp="100131-002">
            {COLUMNS.map((column) => (
              <div key={column.key} style={{ width: column.width }}>
                {column.key === 'action' && <StyledTableAction>{formatTitle(item)}</StyledTableAction>}
                {column.key === 'dapp' && (
                  <StyledTableDapp>
                    {item.dapp_logo && <StyledTableDappImg src={item.dapp_logo} />}
                    <StyledTableDappName>{item.template}</StyledTableDappName>
                  </StyledTableDapp>
                )}
                {column.key === 'execution-number' && (
                  <StyledTableExecution>{item.total_execution}</StyledTableExecution>
                )}
                {column.key === 'execution' && (
                  <StyledExecutionButton
                    onClick={() => {
                      openModal(item.action_type.toLowerCase(), {
                        defaultDapp: item.template,
                        defaultAmount: item.action_amount,
                      });
                    }}
                  >
                    One-Click Execution
                  </StyledExecutionButton>
                )}
                {column.key === 'clean' && (
                  <StyledClean
                    onClick={() => {
                      if (!(currentActionId.current === item.id && deleting)) {
                        handleDelete(item.id);
                        currentActionId.current = item.id;
                      }
                    }}
                  >
                    {currentActionId.current === item.action_id && deleting ? (
                      <Loading />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.6 8C14.6 11.6451 11.6451 14.6 8 14.6C4.35492 14.6 1.4 11.6451 1.4 8C1.4 4.35492 4.35492 1.4 8 1.4C11.6451 1.4 14.6 4.35492 14.6 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM3.8 7C3.35817 7 3 7.35817 3 7.8C3 8.24183 3.35817 8.6 3.8 8.6H12.2C12.6418 8.6 13 8.24183 13 7.8C13 7.35817 12.6418 7 12.2 7H3.8Z"
                          fill="#7C7F96"
                        />
                      </svg>
                    )}
                  </StyledClean>
                )}
              </div>
            ))}
          </StyledTableRow>
        ))}
      </StyledTableBody>
    </StyledTable>
  );
};

export default memo(Table);
