import {ActivityPanels} from '@enact/moonstone/Panels';
import Changeable from '@enact/ui/Changeable';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Detail from '../views/Detail';
import List from '../views/List';

const API = 'https://api.media.ccc.de/public/conferences';

const kittens = [
	'Garfield',
	'Nermal',
	'Simba',
	'Nala',
	'Tiger',
	'Kitty'
];

var conferences = [];




class AppBase extends React.Component {
	static displayName = 'Kittens';

	static propTypes = {
		index: PropTypes.number,
		kitten: PropTypes.number,
		onNavigate: PropTypes.func,
		onSelectKitten: PropTypes.func
	};
	
	static defaultProps = {
		index: 0,
		kitten: 0
	};

	constructor() {
	    super();
	    this.onSelectKitten = this.onSelectKitten.bind(this);
	  }

	componentDidMount() {
		axios.get(API)
		.then(function (response) {
		    // handle success
			conferences = response.data.conferences;
		    console.log(conferences);
		  });
	}

	onSelectKitten(ev) {
		if (this.props.onSelectKitten) {
			this.props.onSelectKitten({
				kitten: ev.index
			});
		}

		// navigate to the detail panel on selection
		if (this.props.onNavigate) {
			this.props.onNavigate({
				index: 1
			});
		}
	}

	render() {
		let {index, kitten, onNavigate, ...rest} = this.props;
		return (
			<ActivityPanels {...rest} index={index} onSelectBreadcrumb={onNavigate}>
		 		<List onSelectKitten={this.onSelectKitten}>{conferences}</List>
		 		<Detail name={kittens[kitten]} />
		 	</ActivityPanels>
	 	)
	};
}

const App = Changeable(
		{prop: 'index', change: 'onNavigate'},
		Changeable(
			{prop: 'kitten', change: 'onSelectKitten'},
				MoonstoneDecorator(AppBase)
			)
		);

export default App;
export {App, AppBase};