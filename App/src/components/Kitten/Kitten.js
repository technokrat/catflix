import kind from '@enact/core/kind';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';

import css from './Kitten.less';

const KittenBase = kind({
	name: 'Kitten',

	propTypes: {
		children: PropTypes.string,
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
		acronym: ({children}) => {
			return children.acronym;
		},
		img_url: ({children}) => {
			return children.logo_url;
		}
	},

	handlers: {
		onSelect: (ev, {index, onSelect}) => {
			if (onSelect) {
				onSelect({index});
			}
		}
	},

	render: ({children, onSelect, acronym, img_url, ...rest}) => {
		delete rest.index;
		delete rest.size;
		console.log(acronym);
		return (
			<div {...rest} onClick={onSelect}>
				<img src={img_url} />
				<div>{acronym}</div>
			</div>
		);
	}
});

const Kitten = Spottable(KittenBase);

export default Kitten;
export {Kitten, KittenBase};