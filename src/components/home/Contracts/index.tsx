import { Flex, Grid, Tabs, Text, Title } from '@near-pagoda/ui';
import { BookOpenText } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Code } from '../Code';

const npxCNA = `
$> npx create-near-app@latest

✅ What do you want to build? › A Smart Contract
✅ Name your project to create a contract: hello-near
✅ Success! Created 'hello-near', a smart contract in Typescript

Build, test, and deploy the project using your package manager:
 * npm install
 * npm run build
 * npm run test
`;

const helloNearTS = `
import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {
  greeting: string = 'Hello';

  static schema = { "greeting": "string" };

  @view({})
  get_greeting(): string {
    return this.greeting;
  }

  @call({})
  set_greeting({ greeting }: { greeting: string }): void {
    this.greeting = greeting;
  }
}`;

const cargoNN = `
$> cargo near new

> Enter a new project name to create a contract: hello-near
✅ New project is created at 'hello-near'


Now you can build, test, and deploy your project using cargo-near:
 * cargo near build
 * cargo test
 * cargo near deploy
`;

const helloNearRS = `
use near_sdk::{log, near};

#[near(contract_state)]
pub struct Contract {
    greeting: String,
}

#[near]
impl Contract {
    pub fn get_greeting(&self) -> String {
        self.greeting.clone()
    }

    pub fn set_greeting(&mut self, greeting: String) {
        log!("Saving greeting: {}", greeting);
        self.greeting = greeting;
    }
}

impl Default for Contract {
    fn default() -> Self {
        Self { greeting: "Hello".to_string() }
    }
}`;

const uvInit = `
$> uv init your-contract

✅ Initialized project \`your-contract\`

$> cd your-contract
$> uv add near-sdk-py

* Build with uvx nearc
* Deploy and interact using near-cli-rs
# Quickstart on https://docs.near.org/smart-contracts/quickstart
`;

const helloNearPY = `
from near_sdk_py import view, call, Contract

# Define contract class
class HelloNear:
    @init
    def new(self):
        # Initialize state with default greeting
        self.storage["greeting"] = "Hello"

    @view
    def get_greeting(self) -> str:
        """Returns the current greeting"""
        return self.storage["greeting"]

    @call
    def set_greeting(self, message: str) -> str:
        """Sets a new greeting"""
        self.storage["greeting"] = message
        return message
`;

export const Contracts = () => {
  const [language, setLanguage] = useState('js');

  return (
    <Flex stack justify="space-between" style={{ flex: 'auto', padding: '.5rem' }}>
      <Grid
        columns="55% minmax(0, 45%)"
        gap="xl"
        columnsPhone="minmax(0, 1fr)"
        columnsTablet="minmax(0, 1fr)"
        style={{ height: '88%' }}
      >
        <Flex stack justify="space-between">
          <Flex stack gap="m">
            <Text as="h1" style={{ fontWeight: 'normal' }}>
              Building Contracts Has Never Been Easier
            </Text>
            <Text size="text-l" style={{ fontWeight: 'lighter' }}>
              Develop, test and deploy contracts using the stack you already know and love
            </Text>
          </Flex>

          <Tabs.Root value={language}>
            <Tabs.List style={{ fontSize: 'small' }}>
              <Tabs.Trigger onClick={() => setLanguage('js')} value="js">
                🌐 Javascript
              </Tabs.Trigger>
              <Tabs.Trigger onClick={() => setLanguage('rust')} value="rust">
                🦀 Rust
              </Tabs.Trigger>
              <Tabs.Trigger onClick={() => setLanguage('python')} value="python">
                🐍 Python
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="js">
              <Code code={npxCNA} language="sh" />
            </Tabs.Content>

            <Tabs.Content value="rust">
              <Code code={cargoNN} language="sh" />
            </Tabs.Content>

            <Tabs.Content value="python">
              <Code code={uvInit} language="sh" />
            </Tabs.Content>
          </Tabs.Root>
        </Flex>

        <Tabs.Root value={language}>
          <Flex stack justify="space-between" style={{ height: '100%' }}>
            <Tabs.Content value="js">
              <Title> One Command Setup </Title>
              <Code code={`npx create-near-app@latest`} language="bash" />
            </Tabs.Content>

            <Tabs.Content value="js">
              <Title> Easy to Read Contracts </Title>
              <Code code={helloNearTS} height={410} language="typescript" />
            </Tabs.Content>

            <Tabs.Content value="rust">
              <Title> One Command Setup </Title>
              <Code code={`cargo near new`} language="bash" />
            </Tabs.Content>

            <Tabs.Content value="rust">
              <Title> Easy to Read Contracts </Title>
              <Code code={helloNearRS} height={410} language="rust" />
            </Tabs.Content>

            <Tabs.Content value="python">
              <Title> One Command Setup </Title>
              <Code code={`uv init contract; cd contract; uv add-near-sdk-py`} language="bash" />
            </Tabs.Content>

            <Tabs.Content value="python">
              <Title> Easy to Read Contracts </Title>
              <Code code={helloNearPY} height={410} language="python" />
            </Tabs.Content>
          </Flex>
        </Tabs.Root>
      </Grid>

      <Button
        size="large"
        iconLeft={<BookOpenText fill="bold" />}
        href="/documentation/build/smart-contracts/quickstart"
        label="Start Now"
        style={{ marginTop: 'var(--gap-m)' }}
      />
    </Flex>
  );
};
