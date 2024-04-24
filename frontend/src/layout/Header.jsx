import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

class Header extends React.Component {

    constructor(props) {
        super(props);
      }

    render() {
        return (
            <AppBar position="static" sx={{ background: '#4b71bb', height: 'auto'}}>
            <MenuList sx={{ display: 'flex', flexDirection: 'row' }}>
                <MenuItem sx={{ width: 'auto', ml: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 700 }}>Создать расширение</Link>
                </MenuItem>
                <MenuItem sx={{ width: 'auto' }}>
                    <Link to="/criteria" style={{ textDecoration: 'none', color: 'white', fontWeight: 700 }}>Критерии</Link>
                </MenuItem>
            </MenuList>
    </AppBar>
        );
    }
}

export default Header;