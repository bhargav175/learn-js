import React from 'react';
import ReactDOM from 'react-dom';
import Source from '../src/index';
/*
 * Root Dev Component
*/
class Main extends React.Component{
	render(){
		return <div>Main
		<Source/>
		</div>;
	}
}

export default Main;

ReactDOM.render(<Main/>,document.getElementById('app'));