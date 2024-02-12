import chains from '@/config/chains';

export function formatTitle(record: any) {
  let tokens = [];
  try {
    tokens = JSON.parse(record.action_tokens);
  } catch (e) {
    tokens = eval(record.action_tokens);
  }
  console.log('====tokens', tokens)

  if (record.action_type === 'Swap') {
    return (
      <>
        Swap <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]} to {tokens[1]}
      </>
    );
  }
  if (record.action_type === 'Bridge') {
    return (
      <>
        Bridge <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]}{' '}
        {chains[record.chain_id]?.chainName} to {chains[record.to_chain_id]?.chainName}
      </>
    );
  }
  if (record.action_type === 'Lending') {
    return (
      <>
        Supply <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]} on {record.template}
      </>
    );
  }

  if (record.action_type === 'Liquidity') {
    return (
      <>
        Deposit <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]}-{tokens[1]}
      </>
    );
  }
}
