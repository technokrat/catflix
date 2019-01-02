import kind from '@enact/core/kind';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';

import css from './Kitten.less';

const KittenBase = kind({
	name: 'Kitten',

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
		className: 'kitten'
	},

	computed: {
		acronym: ({item}) => {

			return item.acronym;
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

	render: ({onSelect, acronym, img_url, ...rest}) => {
		delete rest.index;
		delete rest.size;
		delete rest.item;
		return (
			<div {...rest} onClick={onSelect}>
				<img className={css.thumbnail} src={img_url} />
				<div>{acronym}</div>
			</div>
		);
	}
});

const Kitten = Spottable(KittenBase);

export default Kitten;
export {Kitten, KittenBase};