import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);
      }

    render() {
        return (
            <nav className="navbar navbar-project navbar-expand-lg navbar-light" style={{ background: 'black' }}>
                <Link sx={{ ":hover":{bgcolor: "#1D1F1F"}}} style={{ marginLeft:'15px', color: 'white', fontWeight: 800 }} className="navbar-brand" to="/">Создать расширение</Link>
            </nav>
        );
    }
}

export default Header;