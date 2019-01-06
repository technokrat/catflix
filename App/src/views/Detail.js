import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Repeater from '@enact/ui/Repeater';

import Talk from '../components/Talk';

// const genders = {
// 	m: 'Male',
// 	f: 'Female'
// };

// const DetailBase = kind({
// 	name: 'Detail',

// 	propTypes: {
// 		color: PropTypes.string,
// 		gender: PropTypes.string,
// 		name: PropTypes.string,
// 		weight: PropTypes.number
// 	},

// 	defaultProps: {
// 		gender: 'm',
// 		color: 'Tabby',
// 		weight: 9
// 	},

// 	render: ({color, gender, name, weight, ...rest}) => (
// 		<Panel {...rest}>
// 			<Header title={name} />
// 			<div>Gender: {genders[gender]}</div>
// 			<div>Color: {color}</div>
// 			<div>Weight: {weight}oz</div>
// 		</Panel>
// 	)
// });

//export default DetailBase;
//export {DetailBase as Detail, DetailBase};

class DetailBase extends React.Component {
	static displayName = 'Detail';

	static propTypes = {
		
		url: PropTypes.string

	};

	static defaultProps = {
		url: "",

	};

	constructor() {
	    super();
	    //this.onSelectConference = this.onSelectConference.bind(this);

	        this.state = {
      talks: [],
      isLoading: false,
      error: null,
    };
	  }

	componentDidMount() {
		console.log(this.props.url);
		this.setState({ isLoading: true });
		axios.get(this.props.url)
      .then(result => this.setState({
        talks: result.data.events,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
	  }));
	  
	}

	onSelectTalk(ev) {
	// 	if (this.props.onSelectConference) {
	// 		this.props.onSelectConference({
	// 			selectedConference: ev.index
	// 		});
	// 	}

	// 	// navigate to the detail panel on selection
	// 	if (this.props.onNavigate) {
	// 		this.props.onNavigate({
	// 			index: 1
	// 		});
	// 	}
	}

	render() {
		let {url, ...rest} = this.props;
		const { talks, isLoading, error } = this.state;
		    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
		
	  return (	<><Header title="Catflix" />
	  <p>Loading.... </p>	</>	)
	}
	
	console.log(talks);
		return (
			<Panel {...rest}>
			<Header title="Conference" />
			<Repeater childComponent={Talk} indexProp="index" >
			{talks.map((item) => ({ item, key: item.guid }))}
			</Repeater>
			</Panel>
			// <ActivityPanels {...rest} index={index} onSelectBreadcrumb={onNavigate}>
			// 	<List onSelectConference={this.onSelectConference}>{conferences.map((item) => ({ item, key: item.acronym }))}</List>
			// 	<Detail name="Conference" />
			// </ActivityPanels>
			// 		<Panel {...rest}>
 			//<Header title="loaded" />
// 			<div>Gender: {genders[gender]}</div>
// 			<div>Color: {color}</div>
// 			<div>Weight: {weight}oz</div>
// 		</Panel>
		)
	};
}

// const App = Changeable(
// 		{prop: 'index', change: 'onNavigate'},
// 		Changeable(
// 			{prop: 'selectedConference', change: 'onSelectConference'},
// 				MoonstoneDecorator(AppBase)
// 			)
// 		);

export default DetailBase;
export {DetailBase as Detail, DetailBase};