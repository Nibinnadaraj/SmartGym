import React, { Component } from 'react';
import {
  StyleSheet, 
    Text, 
    View,
    TextInput, 
    KeyboardAvoidingView, 
    TouchableOpacity,
    AsyncStorage ,
    ScrollView,
} from 'react-native';
export default class Dashboard extends Component{

render(){
  
return(
<View>
<ScrollView 
showsVerticalScrollIndicator={false}
contentContainerStyle={styles.scroller}>


<View style={styles.container}>



<View style={styles.heading}><Text style={styles.headingText}>Fees Details</Text></View>
<View style={styles.wrapper}>
<TouchableOpacity style={styles.styleRed}
onPress ={() => {this.props.navigation.navigate('AllMemberList',{

  param :'fullpaid', 
        });
    }
}
>
    <Text  style={styles.normaltext}>Full Paid</Text>
</TouchableOpacity>



<TouchableOpacity style={styles.styleGreen}
onPress = { () => {
    this.props.navigation.navigate('AllMemberList', {
       param : 'remainder', 
    });

}}
>
    <Text  style={styles.normaltext}>Remainder Balance</Text>
</TouchableOpacity>


</View>

<View style={styles.wrapper}>

<TouchableOpacity style={styles.styleBlue}
onPress = {
    () => {
        this.props.navigation.navigate('AllMemberList', {
            param : 'unpaid'
        });
    }
}
>

    <Text  style={styles.normaltext}>Unpaid Payment</Text>
</TouchableOpacity>

</View>



<View style={styles.heading}><Text style={styles.headingText}>Member Registration</Text></View>
<View style={styles.wrapper}>
<TouchableOpacity 
style={styles.styleRed}
onPress={() => {
    this.props.navigation.navigate('AllMemberList', {
        param: 'total',
      });
  }}
>
    <Text style={styles.normaltext}>Total Members</Text>
</TouchableOpacity>



<TouchableOpacity style={styles.styleGreen}
 onPress = {
     () => {
         this.props.navigation.navigate('AllMemberList',{
            param : 'lastmonthregister'
         });
     }
 }
>
    <Text style={styles.normaltext}>Last Month Register</Text>
</TouchableOpacity>


</View>

<View style={styles.wrapper}>

<TouchableOpacity style={styles.styleBlue}
 onPress = {
     () => {
         this.props.navigation.navigate('AllMemberList', {
             param : 'expiredin7'
         });
     }
 }
>
    <Text style={styles.normaltext}>Expired Membership in 7 Days</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.styleBlue}
    onPress = {
        () => {
            this.props.navigation.navigate('AllMemberList', {
                param : 'totalexpired',
            });
        }
    }
>
    <Text style={styles.normaltext}>Total Expired Membership</Text>
</TouchableOpacity>

</View>
</View>


</ScrollView>


</View>
);

}

}
const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection:"column",
        paddingLeft: 5,
        paddingRight: 5,
    },
    scroller:{
        backgroundColor: '#dfdfdf',
        paddingVertical: 20,
    },

    wrapper:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-start",
    },

    styleRed :{
        backgroundColor:"red",
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: 150,
        borderRadius:10,
        padding:20,
        margin:10,
    },

    styleBlue :{
        backgroundColor:"blue",
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: 150,
        borderRadius:10,
        padding:20,
        margin:10,
    },

    styleGreen :{
        backgroundColor:"green",
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: 150,
        borderRadius:10,
        padding:20,
        margin:10,
    },

    heading:{
        alignSelf: "stretch",
        height:50,
        alignItems:"center",
        justifyContent:"center",

    },
    headingText:{
      color:"#363636",
        fontWeight:"bold",
        fontSize:20,
    },
    normaltext:{
        color:"white",
        fontWeight:"bold",
        fontSize:15,

    },

});