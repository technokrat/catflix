import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';
import Repeater from '@enact/ui/Repeater';
import PropTypes from 'prop-types';

import Kitten from '../components/Kitten';

const ListBase = kind({
	name: 'List',

	propTypes: {
		children: PropTypes.array,
		onSelectKitten: PropTypes.func
	},

	render: ({children, onSelectKitten, ...rest}) => {console.log(children); return(
		<Panel {...rest}>
			<Header title="Catflix" />
			<Repeater childComponent={Kitten} indexProp="index" itemProps={{onSelect: onSelectKitten}}>
				{children}
			</Repeater>
		</Panel>
	)}
});

export default ListBase;
export {ListBase as List, ListBase};