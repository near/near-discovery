import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import "./styles.css";
import CurrentComponent from "../../../CurrentComponent";
import { navLinkData } from "../../../orgLinks";
import { NavLink, useHistory } from "react-router-dom";

const MainNavigationMenu = (props) => {
  const history = useHistory();
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        {props.signedIn && (
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="NavigationMenuLink"
              onClick={() => history.push("/")}
            >
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
                title={navLinkData.components.title}
                route={navLinkData.components.link}
              >
                <i className="ph-duotone ph-shapes"></i>
                {navLinkData.components.description}
              </ListItem>
              <ListItem
                title={navLinkData.applications.title}
                route={navLinkData.applications.link}
              >
                <i className="ph-duotone ph-circles-four"></i>
                {navLinkData.applications.description}
              </ListItem>
              <ListItem
                title={navLinkData.gateways.title}
                route={navLinkData.gateways.link}
              >
                <i className="ph-duotone ph-spiral"></i>
                {navLinkData.gateways.description}
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Develop
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent develop">
            <CurrentComponent {...props} />
            <ul className="List one">
              <ListItem
                route={navLinkData.sandbox.link}
                title={navLinkData.sandbox.title}
              >
                <i className="ph-duotone ph-code-block"></i>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem
                href={navLinkData.documentation.link}
                title={navLinkData.documentation.title}
              >
                <i className="ph-duotone ph-book-open-text"></i>
                Beautiful, thought-out palettes with auto dark mode.
              </ListItem>
              <ListItem
                href={navLinkData.tutorials.link}
                title={navLinkData.tutorials.title}
              >
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
                title={navLinkData.people.title}
                route={navLinkData.people.link}
              >
                <i className="ph-duotone ph-user-list"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title={navLinkData.ecosystem.title}
                route={navLinkData.ecosystem.link}
              >
                <i className="ph-duotone ph-globe-hemisphere-west"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title={navLinkData.events.title}
                route={navLinkData.events.link}
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
                  title={navLinkData.developers.title}
                  route={navLinkData.developers.link}
                >
                  <i className="ph-duotone ph-code"></i>
                  Build high-quality, accessible design systems and web apps.
                </ListItem>
                <ListItem
                  title={navLinkData.founders.title}
                  route={navLinkData.founders.link}
                >
                  <i className="ph-duotone ph-potted-plant"></i>
                  Accelerate your Web3 Startup.
                </ListItem>
                <ListItem
                  title={navLinkData.earlyAdopters.title}
                  route={navLinkData.earlyAdopters.link}
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
                title={navLinkData.about.title}
                route={navLinkData.about.link}
              >
                <i className="ph-duotone ph-info"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title={navLinkData.news.title}
                route={navLinkData.news.link}
              >
                <i className="ph-duotone ph-newspaper"></i>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title={navLinkData.learn.title}
                route={navLinkData.learn.link}
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
  ({ className, children, title, ...props }, forwardedRef) => {
    if (props.route) {
      return (
        <NavigationMenu.Link asChild>
          <NavLink
            to={props.route}
            className={classNames("ListItemLink", className)}
          >
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </NavLink>
        </NavigationMenu.Link>
      );
    } else {
      return (
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
      );
    }
  }
);

export default MainNavigationMenu;
