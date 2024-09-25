import { Accordion, Text } from '@near-pagoda/ui';
import Image from 'next/image';
import styled from 'styled-components';

import type { NFT } from '@/pages/tools';
import { ImgDefault } from '../Linkdrops/SelectFT';

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
`;

const ImgCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: 4px;
  border-radius: 6px;
  cursor: pointer;
`;

const ListToken = ({ tokens }: { tokens: NFT[] }) => {
  return (
    <Accordion.Root type="multiple">
      <Accordion.Item value="one">
        <Accordion.Trigger>NFT you minted</Accordion.Trigger>
        <Accordion.Content>
          <CarouselContainer>
            {tokens.map((token) => {
              return (
                <ImgCard key={`Carousel-${token.token_id}`}>
                  <RoundedImage
                    src={token.media}
                    alt={token.title}
                    width={100}
                    height={100}
                    // TODO: onError={() => <ImgDefault />}
                  />

                  <Text>{token.title}</Text>
                </ImgCard>
              );
            })}
          </CarouselContainer>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ListToken;
