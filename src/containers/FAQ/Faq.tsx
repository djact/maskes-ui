/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FC, useEffect, useState } from 'react';
import './faq.css';

interface MenuItemProps {
	title: string;
	className?: string;
	href: string;
}

const MenuItem: FC<MenuItemProps> = ({ title, href }) => {
	return (
		<li>
			<a className="faq__category faq__category-selected truncate" href={href}>
				{title}
			</a>
		</li>
	);
};

interface ContentItemProps {
	title: string;
	content: string;
}

const ContentItem: FC<ContentItemProps> = ({ title, content }) => {
	return (
		<li className="faq__item">
			<h4 className="faq__trigger">{title}</h4>
			<div className="faq__content">
				<p className="text-component">{content}</p>
			</div>
		</li>
	);
};

const Category = (props) => {
	const { title, sheetNumber } = props;
	const [fetchedData, setFetchedData] = useState<
		[{ gs$cell: string; content: { $t: string } }]
	>();
	const url = `https://spreadsheets.google.com/feeds/cells/1XJ5zx7tOudqkajF6JzozYsYm01DBSflIgyAS7o1M4Tk/${sheetNumber}/public/full?alt=json`;
	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => setFetchedData(data.feed.entry.slice(2)));
	}, [url]);

	let id = title.split(' ').join('');
	id = id[0].toLowerCase() + id.slice(1);

	return (
		<ul id={id} className="faq__group">
			<li className="faq__title">
				<h2>{title}</h2>
			</li>
			{fetchedData &&
				fetchedData.map(
					(item: { gs$cell; content }, idx) =>
						item.gs$cell.col === '1' && (
							<ContentItem
								key={idx}
								title={item.content.$t}
								content={fetchedData[idx + 1].content.$t}
							/>
						)
				)}
		</ul>
	);
};

const General = () => <Category title={'General'} sheetNumber={1} />;

const RequestingSupport = () => (
	<Category
		title={'Requesting Support'}
		sheetNumber={2}
		id={'requestingSupport'}
	/>
);

const OfferingSupport = () => (
	<Category title={'Offering Support'} sheetNumber={3} />
);

const UsingTheApp = () => <Category title={'Using The App'} sheetNumber={4} />;

interface Props {}

const Faq: FC<Props> = () => {
	return (
		<div className="page-container">
			<header id="topOfPage">
				<h2>Frequently Asked Questions</h2>
			</header>
			<section className="faq">
				<ul className="faq__categories">
					<MenuItem title="General" href="#general" />
					<MenuItem title="Requesting support" href="#requestingSupport" />
					<MenuItem title="Offering support" href="#offeringSupport" />
					<MenuItem title="Using the app" href="#usingTheApp" />
				</ul>

				<div className="faq__items">
					<General />
					<RequestingSupport />
					<OfferingSupport />
					<UsingTheApp />
				</div>
			</section>
		</div>
	);
};

export default Faq;
