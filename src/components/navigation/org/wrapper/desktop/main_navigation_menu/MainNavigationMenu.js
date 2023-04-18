import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import "./styles.css";
import { Widget } from "near-social-vm";
import styled from "styled-components";

const StyledCurrentComponent = styled.div`
  border: 1px solid #eeeeec;
  background-color: #f9f9f8;
  border-radius: 4px;
  min-height: 100%;

  .title {
    color: #868682;
    font-size: 12px;
    text-align: center;
    background-color: #f3f3f2;
    padding: 5px;
    margin-bottom: 20px;
  }
  h1 {
    color: #1b1b18;
  }
  p {
    color: #706f6c;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div {
    padding: 15px;
    div:nth-child(1) {
      flex-direction: column;
      text-align: center;
    }
    div:nth-child(2) {
      a {
        :nth-child(1) {
          flex: 100%;
          background-color: #161615;
          color: white !important;
        }
        :nth-child(2) {
          flex: auto;
        }
        :nth-child(3) {
          flex: auto;
        }
      }
      > button {
        display: none;
      }
    }
  }
`;

const MainNavigationMenu = (props) => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        {props.signedIn && (
          <NavigationMenu.Item>
            <NavigationMenu.Link className="NavigationMenuLink" href="/">
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        )}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Discover
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <ListItem
                title="Introduction"
                href="/docs/primitives/overview/introduction"
              >
                <i class="ph-duotone ph-shapes"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Getting started"
                href="/docs/primitives/overview/getting-started"
              >
                <i class="ph-duotone ph-circles-four"></i>A quick tutorial to
                get you up and running with Radix Primitives.
              </ListItem>
              <ListItem
                title="Gateways"
                href="/docs/primitives/overview/getting-started"
              >
                <i class="ph-duotone ph-spiral"></i>A quick tutorial to get you
                up and running with Radix Primitives.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Develop
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent develop">
            <div style={{ padding: "10px" }}>
              <StyledCurrentComponent>
                <div className="title">Current Component</div>
                <Widget
                  src={props.widgets?.componentSummary}
                  props={{
                    src: props.widgetSrc?.view,
                    size: "medium",
                    showTags: true,
                  }}
                />
              </StyledCurrentComponent>
            </div>
            <ul className="List one">
              <ListItem href="https://stitches.dev/" title="Sandbox">
                <i class="ph-duotone ph-code-block"></i>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem href="/colors" title="Documentation">
                <i class="ph-duotone ph-book-open-text"></i>
                Beautiful, thought-out palettes with auto dark mode.
              </ListItem>
              <ListItem href="https://icons.radix-ui.com/" title="Tutorials">
                <i class="ph-duotone ph-video"></i>A crisp set of 15x15 icons,
                balanced and consistent.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Connect
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <ListItem
                title="People"
                href="/docs/primitives/overview/introduction"
              >
                <i class="ph-duotone ph-user-list"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Groups"
                href="/docs/primitives/overview/introduction"
              >
                <i class="ph-duotone ph-users-three"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Ecosystem"
                href="/docs/primitives/overview/introduction"
              >
                <i class="ph-duotone ph-globe-hemisphere-west"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Events"
                href="/docs/primitives/overview/introduction"
              >
                <i class="ph-duotone ph-calendar-blank"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        {!props.signedIn && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Solutions
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List two">
                <ListItem
                  title="Developers"
                  href="/docs/primitives/overview/introduction"
                >
                  <i class="ph-duotone ph-code"></i>
                  Build high-quality, accessible design systems and web apps.
                </ListItem>
                <ListItem
                  title="Founders"
                  href="/docs/primitives/overview/introduction"
                >
                  <i class="ph-duotone ph-potted-plant"></i>
                  Build high-quality, accessible design systems and web apps.
                </ListItem>
                <ListItem
                  title="Early Adopters"
                  href="/docs/primitives/overview/introduction"
                >
                  <i class="ph-duotone ph-leaf"></i>
                  Build high-quality, accessible design systems and web apps.
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            More
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <ListItem
                title="About"
                href="/docs/primitives/overview/introduction"
              >
                <i class="ph-duotone ph-info"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="News"
                href="/docs/primitives/overview/introduction"
              >
                <i class="ph-duotone ph-newspaper"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Learn"
                href="/docs/primitives/overview/introduction"
              >
                <i class="ph-duotone ph-books"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default MainNavigationMenu;
