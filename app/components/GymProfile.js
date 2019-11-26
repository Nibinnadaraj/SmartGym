import React, { Component } from 'react';
import {
  StyleSheet, 
    View,
    ScrollView, 
    AsyncStorage,
} from 'react-native';
import {
  Avatar, 
  Divider,
  Text
} from 'react-native-elements';

import {Input, SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';      

export default class GymProfile extends Component{

  constructor (props){
    super(props);

    this.state = {
      gymid:'',
      username:'',
      gymname:'',
      email:'',
      phone:'',
    };

  }

  componentDidMount(){

    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({
        gymid: parsed.id,
        username: parsed.user,
        gymname: parsed.gymname,
        email: parsed.email,
        phone: parsed.phone,


      });
      
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {

    return (
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroller}>

      <View style={styles.container}>

      <View style={styles.heading}>
 
  </View>
    <View style={styles.personalinfo}>
    <Text h2>{this.state.username}</Text>
    <View style={styles.picture}>
      <Avatar
      size="xlarge"
        rounded
        source={{
          uri:'http://192.168.43.104/phpserver/assets/memberimages/user.png',
        }}
      />
      </View>
      <View style={styles.info}>
      <Text h3>{this.state.gymname}</Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style= {styles.infodata}>{this.state.phone}</Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style= {styles.infodata}>{this.state.email}</Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      </View>
      <Divider style={{ backgroundColor: 'blue' }} />
      </View>


      <View style={styles.packageinfo}>
          <TouchableOpacity
          onPress = { () => {
            this.props.navigation.navigate('AddPackage');
        
        }}
          
          >

            <Text h4> <Icon name ='ios-add-circle' size={30}/> Add Package</Text>
          </TouchableOpacity>

      </View>

      <View style={styles.packageinfo}>
          <TouchableOpacity
          onPress = { () => {
            this.props.navigation.navigate('PackageList', {
               id : this.state.gymid, 
            });
        
        }}
          
          >

            <Text h4> <Icon name ='ios-appstore' size={30}/> Packages</Text>
          </TouchableOpacity>

      </View>

      <View style={styles.packageinfo}>
      <Text h4> <Icon name = 'md-cog' size={30} /> Services</Text>
        
      </View>
        
      </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({

  container:{
    backgroundColor:'#dfdfdf',
    flex:1,
    flexDirection:"column",
    
    
},
scroller:{
  backgroundColor: '#dfdfdf',
  paddingVertical: 20,
},
personalinfo:{
  backgroundColor:'#ffffff',
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  padding:10,

},
picture:{
  flex: 1,
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  

},
info:{
  flex: 1,
  flex:1,
  alignItems:"center",
  justifyContent:"center",
   

},
packageinfo:{
  backgroundColor:'#ffffff',
  alignSelf:'stretch',
  padding:10,
  marginTop:10,
},
heading:{
  backgroundColor:'#ffffff',
  flex:1,
    flexDirection:"row",
    justifyContent:"flex-start",
  padding:10,
  
},
label:{
  fontSize:22,
  fontWeight:'bold',
},
data:{
  fontWeight: 'normal',
  fontStyle:'italic',
  
},
infodata:{
  fontSize:15,
  fontStyle:'italic',
}


});