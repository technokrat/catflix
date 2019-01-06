import kind from '@enact/core/kind';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';

import css from './Talk.less';

const TalkBase = kind({
	name: 'Talk',

	propTypes: {
		children: PropTypes.array

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


	render: ({title, img_url, ...rest}) => {
		delete rest.item;
		console.log("Does not Render");
		return (
			<div {...rest}>
				<img className={css.thumbnail} src={img_url} />
				<div>{title}</div>
			</div>
		);
	}
});

const Talk = Spottable(TalkBase);

export default Talk;
export {Talk, TalkBase};