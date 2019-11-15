import React, { Component } from 'react';
import {
  StyleSheet, 
    Text, 
    View, 
} from 'react-native';

import {Input, SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default class EditUser extends Component{

  state = {
    search: '',
  };

  updateSearch = search => {
    alert(search);
    this.setState({ search });
  
  };

  render() {
    const { search } = this.state;

    return (
     <View><Text>Edit User</Text></View>
    );
  }

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },



});