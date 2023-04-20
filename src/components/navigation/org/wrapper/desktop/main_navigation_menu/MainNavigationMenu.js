import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import "./styles.css";
import CurrentComponent from "../../../CurrentComponent";

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
                <i className="ph-duotone ph-shapes"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Getting started"
                href="/docs/primitives/overview/getting-started"
              >
                <i className="ph-duotone ph-circles-four"></i>A quick tutorial
                to get you up and running with Radix Primitives.
              </ListItem>
              <ListItem
                title="Gateways"
                href="/docs/primitives/overview/getting-started"
              >
                <i className="ph-duotone ph-spiral"></i>A quick tutorial to get
                you up and running with Radix Primitives.
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
              <CurrentComponent {...props} />
            </div>
            <ul className="List one">
              <ListItem href="/sandbox" title="Sandbox">
                <i className="ph-duotone ph-code-block"></i>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem href="/colors" title="Documentation">
                <i className="ph-duotone ph-book-open-text"></i>
                Beautiful, thought-out palettes with auto dark mode.
              </ListItem>
              <ListItem href="https://icons.radix-ui.com/" title="Tutorials">
                <i className="ph-duotone ph-video"></i>A crisp set of 15x15
                icons, balanced and consistent.
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
                <i className="ph-duotone ph-user-list"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Groups"
                href="/docs/primitives/overview/introduction"
              >
                <i className="ph-duotone ph-users-three"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Ecosystem"
                href="/ecosystem"
              >
                <i className="ph-duotone ph-globe-hemisphere-west"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Events"
                href="/docs/primitives/overview/introduction"
              >
                <i className="ph-duotone ph-calendar-blank"></i>
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
                  <i className="ph-duotone ph-code"></i>
                  Build high-quality, accessible design systems and web apps.
                </ListItem>
                <ListItem
                  title="Founders"
                  href="/horizon"
                >
                  <i className="ph-duotone ph-potted-plant"></i>
                  Accelerate your Web3 Startup.
                </ListItem>
                <ListItem
                  title="Early Adopters"
                  href="/docs/primitives/overview/introduction"
                >
                  <i className="ph-duotone ph-leaf"></i>
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
                <i className="ph-duotone ph-info"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="News"
                href="/docs/primitives/overview/introduction"
              >
                <i className="ph-duotone ph-newspaper"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Learn"
                href="/docs/primitives/overview/introduction"
              >
                <i className="ph-duotone ph-books"></i>
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
