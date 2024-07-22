import { useRouter } from 'next/router';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 8px;
`;

const Tile = styled.div`
  display: flex;
  width: 100%;
`;
const ImageContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Tagline = styled.p`
  margin: 8px 0 0 8px;
  font-size: 14px;
  color: #666;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  color: #333;
  &:hover {
    cursor: pointer;
  }
`;

interface Item {
  slug: string;
  profile: {
    name: string;
    tagline: string;
    image: {
      url: string;
    };
    tags: {
      [key: string]: string;
    };
  };
}

interface AppsResultsProps {
  item: Item;
}

export const AppsResults: React.FC<AppsResultsProps> = ({ item }) => {
  const router = useRouter();
  const redirect = (url: string) => () => router.push(url);
  return (
    <Card>
      <Tile>
        <ImageContainer>
          <Image src={item.profile.image.url} alt={item.profile.name} />
        </ImageContainer>
        <div>
          <Name onClick={redirect(`/nearcatalog.near/widget/Index?id=${item.slug}`)}>{item.profile.name}</Name>

          <TagContainer>
            {Object.entries(item.profile.tags).map(([key, value]) => (
              <Tag key={key} onClick={redirect(`/nearcatalog.near/widget/Index?cat=${value}`)}>
                {value}
              </Tag>
            ))}
          </TagContainer>
        </div>
      </Tile>
      <Tile>
        <Tagline>{item.profile.tagline}</Tagline>
      </Tile>
    </Card>
  );
};
