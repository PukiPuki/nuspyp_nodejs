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
  state = {
    dataSource: [],
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {
    return (
        <AutoComplete
          hintText="Search"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        />

    );
  }
}

function mapStateToProps(state) {
	return {
		modules: state
	}
}

export default connect(mapStateToProps, {})(SearchBar);
