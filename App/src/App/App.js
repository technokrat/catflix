import {ActivityPanels} from '@enact/moonstone/Panels';
import {Header} from '@enact/moonstone/Panels';
import Changeable from '@enact/ui/Changeable';
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
		kitten: 0,
		conferences: []
	};

	constructor() {
	    super();
	    this.onSelectKitten = this.onSelectKitten.bind(this);

	        this.state = {
      conferences: [],
      isLoading: false,
      error: null,
    };
	  }

	componentDidMount() {
		this.setState({ isLoading: true });
		axios.get(API)
      .then(result => this.setState({
        conferences: result.data.conferences,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
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
		const { conferences, isLoading, error } = this.state;
		    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
	  return (	<><Header title="Catflix" />
	  <p>Loading.... </p>	</>	)
    }
		return (
			<ActivityPanels {...rest} index={index} onSelectBreadcrumb={onNavigate}>
				<List onSelectKitten={this.onSelectKitten}>{conferences.map((item) => ({ item, key: item.acronym }))}</List>
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