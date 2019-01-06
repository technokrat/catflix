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






class AppBase extends React.Component {
	static displayName = 'CatflixApp';

	static propTypes = {
		index: PropTypes.number,
		selectedConference: PropTypes.number,
		onNavigate: PropTypes.func,
		onSelectConference: PropTypes.func

	};

	static defaultProps = {
		index: 0,
		selectedConference: 0,
		selectedConferenceUrl: "",
		conferences: []
	};

	constructor() {
	    super();
	    this.onSelectConference = this.onSelectConference.bind(this);

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

	onSelectConference(ev) {
		if (this.props.onSelectConference) {
			this.props.onSelectConference({
				selectedConference: ev.index
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
		let {index, selectedConference, onNavigate, ...rest} = this.props;
		const { conferences, isLoading, error } = this.state;
		let url = "";
		    if (error) {
      return <p>{error.message}</p>;
	}
	
	try {
		url=conferences[selectedConference].url;
	}
	catch(e) {
		url=""
	}

    if (isLoading) {
	  return (	<><Header title="Catflix" />
	  <p>Loading.... </p>	</>	)
    }
		return (
			<ActivityPanels {...rest} index={index} onSelectBreadcrumb={onNavigate}>
				<List onSelectConference={this.onSelectConference}>{conferences.map((item) => ({ item, key: item.acronym }))}</List>
				<Detail url={url} />
			</ActivityPanels>
		)
	};
}

const App = Changeable(
		{prop: 'index', change: 'onNavigate'},
		Changeable(
			{prop: 'selectedConference', change: 'onSelectConference'},
				MoonstoneDecorator(AppBase)
			)
		);

export default App;
export {App, AppBase};