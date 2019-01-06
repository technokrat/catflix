import kind from '@enact/core/kind';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';

import css from './Talk.less';

const TalkBase = kind({
	name: 'Talk',

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
		className: 'talk'
	},

	computed: {
		title: ({item}) => {

			return item.title;
		},
		img_url: ({item}) => {

			return item.thumb_url;
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
		console.log("Does not Render");
		return (
			<div {...rest} onClick={onSelect}>
				<img className={css.thumbnail} src={img_url} />
				<div>{title}</div>
			</div>
		);
	}
});

const Talk = Spottable(TalkBase);

export default Talk;
export {Talk, TalkBase};