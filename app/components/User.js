import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Avatar,
  Divider,
  Text  } from 'react-native-elements';
  import Icon from 'react-native-vector-icons/Ionicons';

export default class User extends Component{

  constructor(props){
    super (props);

    this.state = {
      isLoading : true,
      search :'',
    };

    this.arrayHolder = [];

}


  userProfileFunction(id){

    return fetch('http://192.168.43.104/phpserver/index.php?purpose=profile&&id='+id)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        isLoading :false,
        dataSource : responseJson,
      },
      function(){
        this.arrayHolder = responseJson;
      }
      );
    })
    .catch(error => {
      console.error(error);

    });

    
  }

  callToPhone(phone){

    Linking.openURL(`tel:${phone}`);
  }
  toWhatsapp(phone){
    Linking.openURL('whatsapp://send?text=SmartGym&phone='+phone)
  }

render(){
    const { navigation } = this.props;
  id = '';
  id = JSON.stringify(navigation.getParam('param'));
  this.userProfileFunction(id);

  if(this.state.isLoading){
    return(
      <View style={styles.activeIndicator}>
        <ActivityIndicator
        size ="large"
        color="#00ff00"
        />
      </View>
    );
  } 
  
return(
<ScrollView 
showsVerticalScrollIndicator={false}
contentContainerStyle={styles.scroller}>

<View style={styles.container}>
  <View style={styles.heading}>
    <Text h2>Personal Info</Text>
  </View>
    <View style={styles.personalinfo}>
    <View style={styles.picture}>
      <Avatar
      size="xlarge"
        rounded
        source={{
          uri:
            'http://192.168.43.104/phpserver/assets/memberimages/user.png',
        }}
      />
      </View>
      <View style={styles.info}>
      <Text h3>{this.state.dataSource[0]['name']}</Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style= {styles.infodata}>{this.state.dataSource[0]['phone']}</Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style= {styles.infodata}>{this.state.dataSource[0]['email']}</Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style= {styles.infodata}>{this.state.dataSource[0]['gender']}</Text>
      </View>
      <Divider style={{ backgroundColor: 'blue' }} />
      
      </View>
      
      <View style={styles.packageinfo}>
    <Text h2>Package Info</Text>
      <Text style={styles.label}>Package : <Text style= {styles.data}>{this.state.dataSource[0]['package']}</Text></Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style={styles.label}>Amount: <Text style= {styles.data}>{this.state.dataSource[0]['totalamount']}</Text></Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style={styles.label}>Paid Amount: <Text style= {styles.data}>{this.state.dataSource[0]['paid']}</Text></Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style={styles.label}>Remainder: <Text style= {styles.data}>{this.state.dataSource[0]['remainder']}</Text></Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style={styles.label}>Paid On: <Text style= {styles.data}>{this.state.dataSource[0]['paiddate']}</Text></Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <Text style={styles.label}>Next Payment: <Text style= {styles.data}>{this.state.dataSource[0]['nextpayment']}</Text></Text>
      <Divider style={{ backgroundColor: 'blue' }} />
      <View style={styles.info}>
     
      </View>
      <Divider style={{ backgroundColor: 'blue' }} />
      
      </View>
      <View style={styles.packageinfo}>
      <Text h3>Quick Contact</Text>
        <TouchableOpacity  
        onPress ={ ()=>{
          this.callToPhone(this.state.dataSource[0]['phone'])
        }
        }
        >
        <Icon name ='md-call' size={30}/>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress ={ ()=>{
          this.toWhatsapp(this.state.dataSource[0]['phone'])
        }
          
          
        }
        >
        <Icon name ='logo-whatsapp' size={30}/>
        </TouchableOpacity>

      </View>

      <View style={styles.packageinfo}>
        <TouchableOpacity
        onPress ={() => {
            this.props.navigation.navigate('EditUser',{
              param: this.state.dataSource[0]['id'],
              });

        }}
        >
          <Text h3>Edit Info <Icon name ='ios-settings' size={30}/></Text>
        </TouchableOpacity>

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
        flexDirection:"row",
        justifyContent:"flex-start",
      padding:10,

    },
    picture:{
      flex: 1,
        alignSelf: 'stretch',
        width: undefined,
      
   
    },
    info:{
      flex: 1,
        alignSelf: 'stretch',
        width: undefined,
       
    
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