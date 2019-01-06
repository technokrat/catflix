import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';
import Repeater from '@enact/ui/Repeater';
import PropTypes from 'prop-types';
import axios from 'axios';
import Talk from '../components/Talk';

import css from './List.less';

// const TalkListBase = kind({
// 	name: 'TalkList',

// 	propTypes: {
// 		url: PropTypes.string,
// 		onSelectTalk: PropTypes.func
// 	},

// 	styles: {
// 		css
// 	},

// 	render: ({children, onSelectTalk, ...rest}) => (
// 		<Panel {...rest}>
// 			<Header title="Catflix" />
// 			<Repeater className={css.scrollable} childComponent={Talk} indexProp="index" itemProps={{onSelect: onSelectTalk}}>
// 				{children}
// 			</Repeater>
// 		</Panel>
// 	)
// });

// export default TalkListBase;
// export {TalkListBase as TalkList, TalkListBase};


class TalkListBase extends React.Component {
	static displayName = 'TalkList';

	static propTypes = {
		
		url: PropTypes.string,
		onSelectTalk: PropTypes.func

	};

	static defaultProps = {
		url: "",

	};

	constructor() {
	    super();
	    //this.onSelectTalk = this.onSelectTalk.bind(this);

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

	render() {
		let {url, onSelectTalk, ...rest} = this.props;
		const { talks, isLoading, error } = this.state;
		    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
		
	  return (	<><Header title="Talks" />
	  <p>Loading.... </p>	</>	)
	}
	
	
		return (
			<Panel {...rest}>
			<Header title="Talks" />
			<Repeater className={css.scrollable} childComponent={Talk} indexProp="index" itemProps={{onSelect: onSelectTalk}}>
				{talks.map((item) => ({ item, key: item.guid }))}
			</Repeater>
		</Panel>
		)
	};
}



export default TalkListBase;
export {TalkListBase as TalkList, TalkListBase};