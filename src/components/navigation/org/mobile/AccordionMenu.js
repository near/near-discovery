import "./AccordionMenu.css";

import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";

import { recordTouchStart } from "../../../../utils/analytics";
import CurrentComponent from "../CurrentComponent";
import { navLinkData } from "../orgLinks";

const AccordionMenu = (props) => (
  <Accordion.Root className="AccordionRoot" type="single" collapsible>
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>Discover</AccordionTrigger>
      <AccordionContent>
        <ul>
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
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-2">
      <AccordionTrigger>Develop</AccordionTrigger>
      <AccordionContent>
        <ul>
          <ListItem
            route={navLinkData.sandbox.link}
            title={navLinkData.sandbox.title}
          >
            <i className="ph-duotone ph-code-block"></i>
            {navLinkData.sandbox.description}
          </ListItem>
          <ListItem
            href={navLinkData.documentation.link}
            title={navLinkData.documentation.title}
          >
            <i className="ph-duotone ph-book-open-text"></i>
            {navLinkData.documentation.description}
          </ListItem>
          <ListItem
            href={navLinkData.tutorials.link}
            title={navLinkData.tutorials.title}
          >
            <i className="ph-duotone ph-video"></i>
            {navLinkData.tutorials.description}
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
            title={navLinkData.people.title}
            route={navLinkData.people.link}
          >
            <i className="ph-duotone ph-user-list"></i>
            {navLinkData.people.description}
          </ListItem>
          <ListItem
            title={navLinkData.ecosystem.title}
            route={navLinkData.ecosystem.link}
          >
            <i className="ph-duotone ph-users-three"></i>
            {navLinkData.ecosystem.description}
          </ListItem>
          <ListItem
            title={navLinkData.events.title}
            route={navLinkData.events.link}
          >
            <i className="ph-duotone ph-globe-hemisphere-west"></i>
            {navLinkData.events.description}
          </ListItem>
        </ul>
      </Accordion.Content>
    </Accordion.Item>

    {!props.signedIn && (
      <Accordion.Item className="AccordionItem" value="item-4">
        <AccordionTrigger>Solutions</AccordionTrigger>
        <Accordion.Content className="AccordionContent">
          <ul className="List two">
            <ListItem
              title={navLinkData.developers.title}
              route={navLinkData.developers.link}
            >
              <i className="ph-duotone ph-code"></i>
              {navLinkData.developers.description}
            </ListItem>
            <ListItem
              title={navLinkData.founders.title}
              route={navLinkData.founders.link}
            >
              <i className="ph-duotone ph-potted-plant"></i>
              {navLinkData.founders.description}
            </ListItem>
            <ListItem
              title={navLinkData.earlyAdopters.title}
              route={navLinkData.earlyAdopters.link}
            >
              <i className="ph-duotone ph-leaf"></i>
              {navLinkData.earlyAdopters.description}
            </ListItem>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
    )}

    <Accordion.Item className="AccordionItem" value="item-5">
      <AccordionTrigger>More</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <ul>
          <ListItem
            title={navLinkData.about.title}
            route={navLinkData.about.link}
          >
            <i className="ph-duotone ph-info"></i>
            {navLinkData.about.description}
          </ListItem>
          <ListItem
            title={navLinkData.news.title}
            route={navLinkData.news.link}
          >
            <i className="ph-duotone ph-newspaper"></i>
            {navLinkData.news.description}
          </ListItem>
          <ListItem
            title={navLinkData.learn.title}
            route={navLinkData.learn.link}
          >
            <i className="ph-duotone ph-books"></i>
            {navLinkData.learn.description}
          </ListItem>
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header
      className="AccordionHeader"
      onTouchStart={(e) => recordTouchStart(e, "navmenu-touchstart")}
    >
      <Accordion.Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
        onTouchStart={recordTouchStart}
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
  ({ className, children, title, ...props }, forwardedRef) => {
    if (props.route) {
      return (
        <li onTouchStart={(e) => recordTouchStart(e)}>
          <NavLink
            className={classNames("ListItemLink", className)}
            ref={forwardedRef}
            to={props.route}
          >
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </NavLink>
        </li>
      );
    } else {
      return (
        <li onTouchStart={(e) => recordTouchStart(e)}>
          <a
            className={classNames("ListItemLink", className)}
            {...props}
            ref={forwardedRef}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </a>
        </li>
      );
    }
  }
);

export default AccordionMenu;
