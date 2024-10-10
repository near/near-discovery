import { Button, Text } from '@near-pagoda/ui';

const CommunityTools = () => {
  return (
    <>
      <Text size="text-l" style={{ margin: '12px 0 0 0' }}>
        Community tools
      </Text>
      <Text>For more advanced options use community tools:</Text>
      <Button label="Token Homes" href="https://tkn.homes/" target="_blank" />
    </>
  );
};

export default CommunityTools;
