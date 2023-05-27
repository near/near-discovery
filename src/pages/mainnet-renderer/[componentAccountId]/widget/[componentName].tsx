import * as nearAPI from 'near-api-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ViewComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const componentSrc = router.query.componentAccountId ? `${router.query.componentAccountId}/widget/${router.query.componentName}` : null;
  const [ componentCode, setComponentCode ] = useState('return <div>loading mainnet renderer..</div>')

  useEffect(() => {
    const getComponent = async (componentPath: string | null) => {
      if(!componentPath) return;
      const keyPair = nearAPI.KeyPair.fromRandom('ed25519');
      const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
      const nearConfig = {
        networkId: 'testnet',
        keyStore,
        nodeUrl: 'https://rpc.testnet.near.org', // todo from env?
        helperUrl: 'https://helper.testnet.near.org',
        headers: {},
      };
      await keyStore.setKey(
        nearConfig.networkId,
        'dontcare',
        keyPair,
      );

      const near = await nearAPI.connect(nearConfig);
      const account = await near.account('dontcare');

      const component = await account.viewFunction({
        contractId: 'v1.social08.testnet',
        methodName: 'get',
        args: {
          keys: [`${componentPath}/**`],
        },
      });

      return componentPath
        .split('/')
        .reduce((acc, curr) => acc[curr] || acc, component);
    }
    getComponent(componentSrc).then((code) => {
      if(code && code[""]) {
        setComponentCode(code[""])
      } else {
        setComponentCode('return <div>Not Found</div>')
      }
    })
  }, [componentSrc]);

  return (
    <div className="container-xl">
      <div className="row">
        <div
          className="d-inline-block position-relative overflow-hidden"
          style={{
            paddingTop: 'var(--body-top-padding)',
          }}
        >
          <VmComponent
            code={componentCode}
            mainnetWidget
          />
        </div>
      </div>
    </div>
  );
};

ViewComponentPage.getLayout = useDefaultLayout;

export default ViewComponentPage;
