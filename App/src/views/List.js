import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';
import Repeater from '@enact/ui/Repeater';
import PropTypes from 'prop-types';

import Kitten from '../components/Kitten';

import css from './List.less';

const ListBase = kind({
	name: 'List',

	propTypes: {
		children: PropTypes.array,
		onSelectKitten: PropTypes.func
	},

	styles: {
		css
	},

	render: ({children, onSelectKitten, ...rest}) => (
		<Panel {...rest}>
			<Header title="Catflix" />
			<Repeater className={css.scrollable} childComponent={Kitten} indexProp="index" itemProps={{onSelect: onSelectKitten}}>
				{children}
			</Repeater>
		</Panel>
	)
});

export default ListBase;
export {ListBase as List, ListBase};