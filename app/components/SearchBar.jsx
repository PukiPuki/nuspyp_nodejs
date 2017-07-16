import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { getModuleRequest } from '../actions/modules';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class SearchBar extends Component {

	goToMod = (obj) => {
		console.log("Go to Mod");
		console.log(this.props);
		browserHistory.push("/modules/" + obj);
	}

  componentWillMount() {
    this.props.getModuleRequest()
    console.log(this.props);
  }

  render() {
    const { modules } = this.props;
		const arrCodes = modules.map((module) => {
			return module.ModuleCode;
		})
    return (
      <div>
        <AutoComplete
          filter={AutoComplete.fuzzyFilter}
					maxSearchResults={5}
					dataSource={arrCodes} 
					onNewRequest = {this.goToMod} />
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		routing: state.routing,
		modules: state.module.modules
	}
}

export default connect(mapStateToProps, { getModuleRequest })(SearchBar);
