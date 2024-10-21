import { Button, Card, Container, Flex, Section, SvgIcon, Tabs, Text } from '@near-pagoda/ui';
import { Coin, Gift, ImagesSquare } from '@phosphor-icons/react';
import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { NearContext } from '@/components/wallet-selector/WalletSelector';
import { useContext } from 'react';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';


const ToolsPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { signedAccountId } = useContext(NearContext);
    const { requestAuthentication } = useSignInRedirect();

    return (
        <Section grow="available" style={{ background: 'var(--sand3)' }}>
            <Container size="s">
                <Flex stack gap="l">
                    <Text as="h1" size="text-2xl">
                        Claims
                    </Text>
                    {signedAccountId ? (<Card>
                        <Text>Please sign in to use wallet utilities</Text>
                        <Button label="Sign In" fill="outline" onClick={() => requestAuthentication()} />
                    </Card>) : (
                        <Card>
                            <Text>Please sign in to use wallet utilities</Text>
                            <Button label="Sign In" fill="outline" onClick={() => requestAuthentication()} />
                        </Card>
                    )}
                </Flex>
            </Container>
        </Section>
    );
};

ToolsPage.getLayout = useDefaultLayout;

export default ToolsPage;
