import { Flex, Grid, Text } from "@near-pagoda/ui";

import { Code } from "../Code";
import { BookOpenText } from "@phosphor-icons/react";

import { Button } from "../Button";

const fastNear = `
fetch("https://api.fastnear.com/v1/account/root.near/full")

fetch("https://api.nearblocks.io/v1/account/tkn.primitives.near/txns?method=create_token")
`

const BigQuery = `
SELECT new_owner_account_id 
  FROM \`bigquery-public-data.crypto_near_mainnet_us.nft_events\`
  WHERE block_date > "2024-09-01" AND contract_account_id = 'x.paras.near' AND cause = "nft_transfer" LIMIT 1000
`

const indexerLake = `
events.filter(e =>
  e.event == "nft_mint" && e.standard == "nep171"
)
`

export const Data = () => {

  return <>
    <Flex stack gap="l" style={{ padding: "0.5rem", flexGrow: 1, justifyContent: "space-between" }}>

      <Grid columns="542px minmax(0, 1fr)" gap="2xl" columnsTablet="minmax(0, 1fr)" columnsPhone="minmax(0, 1fr)" >
        <Flex stack gap="m">
          <Text as="h1" style={{ fontWeight: "normal" }}> A Rich Ecosystem of Community APIs </Text>
          <Text size="text-l" style={{ fontWeight: "lighter" }}>
            Our community of developers has built APIs to help you query the chain for user data and transactions
          </Text>
        </Flex>
        <Flex stack gap="m" style={{ justifyContent: "center" }}>
          <Code code={fastNear} language="js" />
          <Button iconLeft={<BookOpenText fill="bold" />} href="/documentation/build/data-infrastructure/big-query" label="Read on Data API" />
        </Flex>
      </Grid>

      <Grid columns="minmax(0, 1fr) 542px" gap="2xl" columnsTablet="minmax(0, 1fr)" columnsPhone="minmax(0, 1fr)">
        <Flex stack gap="m" style={{ justifyContent: "center" }}>
          <Code code={BigQuery} language="sql" />
          <Button iconLeft={<BookOpenText fill="bold" />} href="/documentation/build/data-infrastructure/lake-framework/near-lake" label="Discover BigQuery" />
        </Flex>
        <Flex stack gap="m" justify="space-between">
          <Text as="h1" style={{ fontWeight: "normal" }}> Public BigQuery Data Repositories </Text>
          <Text size="text-l" style={{ fontWeight: "lighter" }}>
            A well organized public dataset to help you query historical data and build your own analytics
          </Text>
        </Flex>
      </Grid>

      <Grid columns="542px minmax(0, 1fr)" gap="2xl" columnsTablet="minmax(0, 1fr)" columnsPhone="minmax(0, 1fr)">
        <Flex stack gap="m" style={{ textAlign: "left" }}>
          <Text as="h1" style={{ fontWeight: "normal" }}> A Simple Framework to Create Indexers </Text>
          <Text size="text-l" style={{ fontWeight: "lighter" }}>
            Do you need a more personalized solution? Build your own indexer using our Lake Framework
          </Text>
        </Flex>
        <Flex stack gap="m" style={{ justifyContent: "center" }}>
          <Code code={indexerLake} language="js" />
          <Button iconLeft={<BookOpenText fill="bold" />} href="/documentation/build/chain-abstraction/chain-signatures/getting-started" label="Discover Lake Framework" />
        </Flex>
      </Grid>

    </Flex>
  </>
}