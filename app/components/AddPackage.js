import React, { Component } from 'react';
import {
  StyleSheet, 
    Text, 
    View,
    TextInput, 
    KeyboardAvoidingView, 
    TouchableOpacity, 
    AsyncStorage 
} from 'react-native';

export default class AddPackage extends Component{

render(){
  
return(
<View style={styles.container}><Text>Dashboard</Text></View>
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