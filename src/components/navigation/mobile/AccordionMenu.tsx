import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';

import { CurrentComponent } from '../CurrentComponent';
import { navLinkData } from '../org-links';

const Wrapper = styled.div`
  .AccordionItem {
    all: unset;
    overflow: hidden;
    margin-top: 1px;
    border-bottom: 1px solid #eeeeec;
  }

  .AccordionItem:first-child {
    margin-top: 0;
    border-top: 1px solid #eeeeec;
  }

  .AccordionItem:last-child {
    border-bottom: none;
  }

  .AccordionItem:focus-within {
    position: relative;
    z-index: 1;
  }

  .AccordionHeader {
    display: flex;
  }

  .AccordionTrigger {
    all: unset;
    font-family: inherit;
    background-color: transparent;
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    color: #1b1b18;
  }

  .AccordionTrigger:hover {
    background-color: white;
  }

  .AccordionContent {
    overflow: hidden;
    font-size: 15px;
    color: #1b1b18;
    background-color: white;
  }

  .AccordionContent ul {
    padding: 0;
    list-style: none;
  }

  .AccordionContent[data-state='open'] {
    animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
  .AccordionContent[data-state='closed'] {
    animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  .AccordionChevron {
    color: #868682;
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
  .AccordionTrigger[data-state='open'] > .AccordionChevron {
    transform: rotate(180deg);
  }

  .ListItemLink {
    display: block;
    outline: none;
    text-decoration: none;
    user-select: none;
    padding: 16px 8px 4px 8px;
    padding-left: 55px;
    border-radius: 6px;
    font-size: 15px;
    line-height: 1;
    position: relative;
  }
  .ListItemLink i {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    font-size: 22px;
    color: #706f6c;
  }

  .ListItemLink:hover {
    text-decoration: none;
    background-color: #f3f3f2;
  }

  .ListItemHeading {
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 5px;
    color: #1b1b18;
  }

  .ListItemText {
    line-height: 1.4;
    font-weight: initial;
    color: #868682;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

const AccordionTrigger = forwardRef<HTMLButtonElement, ComponentProps<typeof Accordion.Trigger>>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames('AccordionTrigger', className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <i className="ph ph-caret-down AccordionChevron" aria-hidden></i>
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = forwardRef<HTMLDivElement, ComponentProps<typeof Accordion.Content>>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content className={classNames('AccordionContent', className)} {...props} ref={forwardedRef}>
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  ),
);
AccordionContent.displayName = 'AccordionContent';

const ListItem = forwardRef<
  HTMLAnchorElement,
  {
    className?: string;
    children: ReactNode;
    title: string;
    route?: string;
    href?: string;
  }
>(({ className, children, title, ...props }, forwardedRef) => {
  if (props.route) {
    return (
      <li>
        <Link className={classNames('ListItemLink', className)} ref={forwardedRef} href={props.route}>
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </Link>
      </li>
    );
  } else {
    return (
      <li>
        <a
          className={classNames('ListItemLink', className)}
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
});
ListItem.displayName = 'ListItem';

export const AccordionMenu = () => (
  <Wrapper>
    <Accordion.Root className="AccordionRoot" type="single" collapsible>
      <Accordion.Item className="AccordionItem" value="item-1">
        <AccordionTrigger>Discover</AccordionTrigger>
        <AccordionContent>
          <ul>
            <ListItem title={navLinkData.components.title} route={navLinkData.components.link}>
              <i className="ph-duotone ph-shapes"></i>
              {navLinkData.components.description}
            </ListItem>
            <ListItem title={navLinkData.applications.title} route={navLinkData.applications.link}>
              <i className="ph-duotone ph-circles-four"></i>
              {navLinkData.applications.description}
            </ListItem>
            <ListItem title={navLinkData.gateways.title} route={navLinkData.gateways.link}>
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
            <ListItem route={navLinkData.sandbox.link} title={navLinkData.sandbox.title}>
              <i className="ph-duotone ph-code-block"></i>
              {navLinkData.sandbox.description}
            </ListItem>
            <ListItem href={navLinkData.documentation.link} title={navLinkData.documentation.title}>
              <i className="ph-duotone ph-book-open-text"></i>
              {navLinkData.documentation.description}
            </ListItem>
            <ListItem href={navLinkData.tutorials.link} title={navLinkData.tutorials.title}>
              <i className="ph-duotone ph-video"></i>
              {navLinkData.tutorials.description}
            </ListItem>
          </ul>
          <CurrentComponent />
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className="AccordionItem" value="item-3">
        <AccordionTrigger>Connect</AccordionTrigger>
        <Accordion.Content className="AccordionContent">
          <ul>
            <ListItem title={navLinkData.people.title} route={navLinkData.people.link}>
              <i className="ph-duotone ph-user-list"></i>
              {navLinkData.people.description}
            </ListItem>
            <ListItem title={navLinkData.ecosystem.title} route={navLinkData.ecosystem.link}>
              <i className="ph-duotone ph-users-three"></i>
              {navLinkData.ecosystem.description}
            </ListItem>
            <ListItem title={navLinkData.events.title} route={navLinkData.events.link}>
              <i className="ph-duotone ph-globe-hemisphere-west"></i>
              {navLinkData.events.description}
            </ListItem>
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item className="AccordionItem" value="item-4">
        <AccordionTrigger>Solutions</AccordionTrigger>
        <Accordion.Content className="AccordionContent">
          <ul className="List two">
            <ListItem title={navLinkData.developers.title} route={navLinkData.developers.link}>
              <i className="ph-duotone ph-code"></i>
              {navLinkData.developers.description}
            </ListItem>
            <ListItem title={navLinkData.founders.title} route={navLinkData.founders.link}>
              <i className="ph-duotone ph-potted-plant"></i>
              {navLinkData.founders.description}
            </ListItem>
            <ListItem title={navLinkData.earlyAdopters.title} route={navLinkData.earlyAdopters.link}>
              <i className="ph-duotone ph-leaf"></i>
              {navLinkData.earlyAdopters.description}
            </ListItem>
          </ul>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item className="AccordionItem" value="item-5">
        <AccordionTrigger>More</AccordionTrigger>
        <Accordion.Content className="AccordionContent">
          <ul>
            <ListItem title={navLinkData.about.title} route={navLinkData.about.link}>
              <i className="ph-duotone ph-info"></i>
              {navLinkData.about.description}
            </ListItem>
            <ListItem title={navLinkData.news.title} route={navLinkData.news.link}>
              <i className="ph-duotone ph-newspaper"></i>
              {navLinkData.news.description}
            </ListItem>
            <ListItem title={navLinkData.learn.title} route={navLinkData.learn.link}>
              <i className="ph-duotone ph-books"></i>
              {navLinkData.learn.description}
            </ListItem>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </Wrapper>
);
