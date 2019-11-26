import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Picker,
    ScrollView,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Divider,
    Text
  } from 'react-native-elements';
export default class AddPackage extends Component{
    constructor(props){
        super(props);

        this.state = {
            packagename : 'sdfsdfdf',
            amount:'',
            validity: '',
            gymid:'',
        }
    }

    render(){
        return(
            <View>

<ScrollView 
showsVerticalScrollIndicator={false}
contentContainerStyle={styles.container}>
                <View style={styles.heading}>

                <Text h3>Add Package</Text>

                </View>
               
                <TextInput placeholder="Package Name"
                style={styles.textInput}
                onChangeText = {(name) => {this.setState({packagename : name})}}
                underlineColorAndroid='transparent'/>   

                <TextInput placeholder="Amount"
                style={styles.textInput}
                onChangeText = {(amount) => {this.setState({amount : amount})}}
                underlineColorAndroid='transparent'/> 
                                
                <View style={styles.textInput}>
                    <Picker 
                    selectedValue={this.state.validity} 
            onValueChange={(itemValue, itemIndex) =>
                this.setState({validity: itemValue})
            }>
            <Picker.Item value='' label='Select Package Validity'/>
            <Picker.Item label="1 Month" value="1" />
            <Picker.Item label="2 Month" value="2" />
            <Picker.Item label="3 Month" value="3" />
            <Picker.Item label="4 Month" value="4" />
            <Picker.Item label="5 Month" value="5" />
            <Picker.Item label="6 Month" value="6" />
            <Picker.Item label="7 Month" value="7" />
            <Picker.Item label="8 Month" value="8" />
            <Picker.Item label="9 Month" value="9" />
            <Picker.Item label="10 Month" value="10" />
            <Picker.Item label="10 Month" value="11" />
            <Picker.Item label="12 Month" value="12" />
            </Picker>


            </View>
            
            
                

            <TouchableOpacity
            style={styles.button}
            onPress = {this.addPackage}
            >
                
                <Text>Add Member</Text></TouchableOpacity>
                </ScrollView>
                </View>

              

        );

    }

    addPackage =() => {
     
        fetch('http://192.168.43.104/phpserver/index.php?purpose=addpackage&&gymid=1',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                packagename :this.state.packagename,
                amount: this.state.amount,
                validity: this.state.validity,

            })
        })
        .then((response) => response.json())
        .then((res) => { 
            if( res.success === true){ 
                alert("res");
                this.props.navigation.navigate('PackageList');
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: 40,
        paddingRight: 40,
        paddingVertical: 20,
    },
    textInput:{
        alignSelf:"stretch",
        padding:8,
        marginBottom:5,
        backgroundColor: '#9c9b98',
        borderRadius:10,
    
    },

    button:{
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor : '#ff4545',
        padding:10,
        borderRadius:50,
       
       },
    contentContainer: {
        paddingVertical: 20
      },
      heading :{
        backgroundColor: '#ffffff',
        height:150,
        justifyContent:"center",

      },
});