import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {connect} from 'react-redux';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class SearchBar extends Component {
	constructor(){
		super();
		console.log("Search Modules: ");
		console.log(this.state);
	}

  stateTest() {
    console.log(this.modules);
    console.log(this.props);
  }

  render() {
    const { modules } = this.props;
    return (
      <div>
        <AutoComplete dataSource={modules} />
        <button onClick={this.stateTest.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		modules: state.module.modules
	}
}

export default connect(mapStateToProps, {})(SearchBar);
