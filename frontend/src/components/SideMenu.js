import React,{Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {close} from '../actions/sidemenu';

class SideMenu extends Component {


  close =() => {
    this.props.close();
  }

  render() {
    return (
      <div>
        <Drawer open={this.props.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem onClick={() => this.close()}>Close menu</MenuItem>
        </Drawer>


        
      </div>
    );
  }
}

const mapStateToProps = state => ({ open: state.sideMenuReducer.open })
const mapDispatchToProps = { close }
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)