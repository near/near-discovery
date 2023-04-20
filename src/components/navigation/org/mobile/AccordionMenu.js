import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import "./AccordionMenu.css";
import CurrentComponent from "../CurrentComponent";

const AccordionMenu = (props) => (
  <Accordion.Root className="AccordionRoot" type="single" collapsible>
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>Discover</AccordionTrigger>
      <AccordionContent>
        <ul>
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
            <i className="ph-duotone ph-circles-four"></i>A quick tutorial to
            get you up and running with Radix Primitives.
          </ListItem>
          <ListItem
            title="Gateways"
            href="/docs/primitives/overview/getting-started"
          >
            <i className="ph-duotone ph-spiral"></i>A quick tutorial to get you
            up and running with Radix Primitives.
          </ListItem>
        </ul>
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-2">
      <AccordionTrigger>Develop</AccordionTrigger>
      <AccordionContent>
        <ul>
          <ListItem href="https://stitches.dev/" title="Sandbox">
            <i className="ph-duotone ph-code-block"></i>
            CSS-in-JS with best-in-class developer experience.
          </ListItem>
          <ListItem href="/colors" title="Documentation">
            <i className="ph-duotone ph-book-open-text"></i>
            Beautiful, thought-out palettes with auto dark mode.
          </ListItem>
          <ListItem href="https://icons.radix-ui.com/" title="Tutorials">
            <i className="ph-duotone ph-video"></i>A crisp set of 15x15 icons,
            balanced and consistent.
          </ListItem>
        </ul>
        <CurrentComponent {...props} />
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-3">
      <AccordionTrigger>Connect</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <ul>
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
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-4">
      <AccordionTrigger>Solutions</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
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
            href="/docs/primitives/overview/introduction"
          >
            <i className="ph-duotone ph-potted-plant"></i>
            Build high-quality, accessible design systems and web apps.
          </ListItem>
          <ListItem
            title="Early Adopters"
            href="/docs/primitives/overview/introduction"
          >
            <i className="ph-duotone ph-leaf"></i>
            Build high-quality, accessible design systems and web apps.
          </ListItem>
        </ul>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-5">
      <AccordionTrigger>More</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <ul>
          <ListItem title="About" href="/docs/primitives/overview/introduction">
            <i className="ph-duotone ph-info"></i>
            Build high-quality, accessible design systems and web apps.
          </ListItem>
          <ListItem title="News" href="/docs/primitives/overview/introduction">
            <i className="ph-duotone ph-newspaper"></i>
            Build high-quality, accessible design systems and web apps.
          </ListItem>
          <ListItem title="Learn" href="/docs/primitives/overview/introduction">
            <i className="ph-duotone ph-books"></i>
            Build high-quality, accessible design systems and web apps.
          </ListItem>
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <i className="ph ph-caret-down AccordionChevron" aria-hidden></i>
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <a
        className={classNames("ListItemLink", className)}
        {...props}
        ref={forwardedRef}
      >
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </a>
    </li>
  )
);

export default AccordionMenu;
