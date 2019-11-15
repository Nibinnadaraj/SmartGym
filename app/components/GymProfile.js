import React, { Component } from 'react';
import {
  StyleSheet, 
    Text, 
    View, 
} from 'react-native';

import {Input, SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default class GymProfile extends Component{

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
      <SearchBar 
        searchIcon = {<Icon name ='md-search' size={30}/>}
        clearIcon ={<Icon name='md-close' size = {30} />}
        onChangeText={this.updateSearch}
        value={search}
        />
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