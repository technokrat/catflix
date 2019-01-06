import kind from '@enact/core/kind';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';

import css from './Conference.less';

const ConferenceBase = kind({
	name: 'Conference',

	propTypes: {
		children: PropTypes.array,
		index: PropTypes.number,
		onSelect: PropTypes.func,
		size: PropTypes.number
	},

	defaultProps: {
		size: 300
	},

	styles: {
		css,
		className: 'conference'
	},

	computed: {
		title: ({item}) => {

			return item.title;
		},
		img_url: ({item}) => {

			return item.logo_url;
		}
	},

	handlers: {
		onSelect: (ev, {index, onSelect}) => {
			if (onSelect) {
				onSelect({index});
			}
		}
	},

	render: ({onSelect, title, img_url, ...rest}) => {
		delete rest.index;
		delete rest.size;
		delete rest.item;
		return (
			<div {...rest} onClick={onSelect}>
				<img className={css.thumbnail} src={img_url} />
				<div>{title}</div>
			</div>
		);
	}
});

const Conference = Spottable(ConferenceBase);

export default Conference;
export {Conference, ConferenceBase};