import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '../actions/users';

// Material UI
import ReactDOM from 'react-dom';
import NavBar from '../components/NavBar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Navigation = ({ user, logOut }) => {
    return (
      <nav>
				<NavBar user={user} logOut={logOut} />
			</nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
