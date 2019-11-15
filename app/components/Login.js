import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput, 
    KeyboardAvoidingView, 
    TouchableOpacity, 
    AsyncStorage,  } from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
    export default class Login extends Component{
    constructor(props){
        super(props );

        this.state = {
            username: '',
            password: '',

        }


    }

    render(){
        return(

<View style={ styles.container}>

    <Text style={styles.heading}>Smart Gym</Text>
    <Text style={styles.subhead}>Login</Text>
    <TextInput style={styles.textInput}
    placeholder="Username"
    onChangeText = {(username) => this.setState({username})}
    underlineColorAndroid='transparent'
    />

<TextInput style={styles.textInput}
    placeholder="Password"
    onChangeText = {(password) => this.setState({password})}
    underlineColorAndroid='transparent'
    secureTextEntry={true}
    />

    <TouchableOpacity
    style={styles.button} 
    onPress={this.login}>
    <Text>Login</Text>
    </TouchableOpacity>
</View>


        );


    }

    login = () => {
        fetch('http://192.168.43.104/phpserver/index.php?purpose=login',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username :this.state.username,
                password: this.state.password,

            })
        })
        .then((response) => response.json())
        .then((res) => { 
            if( res.success === true){
                
                AsyncStorage.setItem('username', res.user);
                AsyncStorage.setItem('gymname', res.gymname);
                this.props.navigation.navigate ('Dashboard');
            }
            else {
                alert (res);
                
            }
        })
        
        .done();
    }
}


const styles = StyleSheet.create(
{
container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c2526',
    paddingLeft: 40,
    paddingRight: 40,
},
heading: {
    fontSize :45,
    fontWeight:"bold",
    color: '#ddff00',
},
subhead: {
    fontSize:30,
    fontWeight:"bold",
    marginBottom:10,
    color: '#fff',

},

textInput:{
    alignSelf:"stretch",
    padding:10,
    marginBottom:20,
    backgroundColor: '#fff',
    borderRadius:50,

},
button:{
 alignSelf: 'stretch',
 alignItems: 'center',
 backgroundColor : '#f0fafc',
 padding:10,
 borderRadius:50,

},


}

);
