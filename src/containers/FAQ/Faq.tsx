/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FC } from 'react';
import './faq.css';

interface MenuItemProps {
  title: string;
  className?: string;
  href: string;
}

const MenuItem: FC<MenuItemProps> = ({
  title,
  href,
}) => {
  return (
    <li>
      <a
        className="faq__category faq__category-selected truncate"
        href={href}
      >
        {title}
      </a>
    </li>
  )
};


interface ContentItemProps {
  title: string;
  content: string;
}

const ContentItem: FC<ContentItemProps> = ({
  title,
  content,
}) => {
  return (
    <li className="faq__item">
      <h4 className="faq__trigger">{title}</h4>
      <div className="faq__content">
        <p className="text-component">
          {content}
        </p>
      </div>
    </li>
  )
};

interface Props { }

const Faq: FC<Props> = () => {
  return (
    <div className="page-container">
      <header>
        <h3>Frequently Asked Questions</h3>
      </header>
      <section className="faq">
        <ul className="faq__categories">
          <MenuItem
            title="General"
            href="#general"
          />
          <MenuItem
            title="Requesting support"
            href="#requestingSupport"
          />
          <MenuItem
            title="Offering support"
            href="#offeringSupport"
          />
          <MenuItem
            title="Using the app"
            href="#usingTheApp"
          />
        </ul>

        <div className="faq__items">
          <ul id="general" className="faq__group">
            <li className="faq__title">
              <h2>General</h2>
            </li>
            <ContentItem
              title="What is SKCE Mutual Aid (South King County and Eastside Covid 19 Mutual Aid)?"
              content=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam."
            />
            <ContentItem
              title="How did SKCE Mutual Aid start?"
              content="Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem!"
            />
            <ContentItem
              title="How many requests do you get a month?"
              content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et."
            />
            <ContentItem
              title="How much cash do you redistribute?"
              content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione"
            />
            <ContentItem
              title="Who are the organizers?"
              content="Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti."
            />
            <ContentItem
              title="Who pays for essential items?"
              content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam."
            />

            <ContentItem
              title="How do I become an organizer of my own neighborhood mutual aid network?"
              content=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione"
            />
            <ContentItem
              title="How do I contact the organizers?"
              content="Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum?"
            />
          </ul>
          <ul id="requestingSupport" className="faq__group">
            <li className="faq__title">
              <h2>Requesting support</h2>
            </li>
          </ul>

          <ul id="offeringSupport" className="faq__group">
            <li className="faq__title">
              <h2>Offering support</h2>
            </li>
          </ul>

          <ul id="usingTheApp" className="faq__group">
            <li className="faq__title">
              <h2>Using the App</h2>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
};

export default Faq;
