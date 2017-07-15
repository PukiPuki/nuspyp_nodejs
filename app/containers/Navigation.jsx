import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';

// Material UI
import ReactDOM from 'react-dom';
import NavBar from '../components/NavBar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    return (
      <nav className={cx('navigation')} role="navigation">
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
