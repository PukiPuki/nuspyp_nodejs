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

	goToMod = (codeAndTitle) => {
    const code = codeAndTitle.substr(0, codeAndTitle.indexOf(' '));
		browserHistory.push("/modules/" + code );
	}

  componentWillMount() {
    this.props.getModuleRequest()
  }
	

  render() {
  	const style = {marginRight:200 };
		const { moduleList } = this.props;
		const arrCodes = moduleList.map((module) => {
			return `${module.ModuleCode} ${module.ModuleTitle}`;
		})
    return (
      <div style={style}>
        <AutoComplete
					hintText="Search"
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
		moduleList: state.module.moduleList,
	}
}

export default connect(mapStateToProps, { getModuleRequest })(SearchBar);
