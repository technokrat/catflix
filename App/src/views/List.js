import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';
import Repeater from '@enact/ui/Repeater';
import PropTypes from 'prop-types';

import Conference from '../components/Conference';

import css from './List.less';

const ListBase = kind({
	name: 'List',

	propTypes: {
		children: PropTypes.array,
		onSelectConference: PropTypes.func
	},

	styles: {
		css
	},

	render: ({children, onSelectConference, ...rest}) => (
		<Panel {...rest}>
			<Header title="Catflix" />
			<Repeater className={css.scrollable} childComponent={Conference} indexProp="index" itemProps={{onSelect: onSelectConference}}>
				{children}
			</Repeater>
		</Panel>
	)
});

export default ListBase;
export {ListBase as List, ListBase};