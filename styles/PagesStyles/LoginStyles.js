
import {StyleSheet} from 'react-native';

var styles = StyleSheet.create({
    container: {
        width: "100%",
        height:'100%',
        backgroundColor: "#863AE8",
        padding:20,
        justifyContent:"space-around"

    },
    Top: {
      alignItems:"center",
      justifyContent:"center",

    },

   Logo: {
      width:130,
      height: 100,

    }
    ,
    LogoText: {
      fontSize:25,
      fontFamily:"Poppins-Medium",
      color:"white"
    },
    Bottom:{
      justifyContent:"center",
      alignItems:"center"
    },
    title: {
      flexDirection: 'row'
    },
    LoginText: {
      fontFamily:"Poppins-SemiBold",
      color: "white",
      fontSize:20
    },
    Buttons:{
      width: "90%",
      alignItems:"center"

    },
    BMBtn: {
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor: '#863AE8',
      borderRadius: 25,
      borderWidth: 2,
      borderColor: 'white',
      width:'90%',
      height:45,
      margin: 20
    },
    BMText: {
      //color: "white",
      fontSize:18,
      fontFamily:"Poppins-Regular",
      color:"white",
      letterSpacing: 0.2

    },
    TenantBtn: {
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor: '#863AE8',
      borderRadius: 25,
      borderWidth: 2,
      borderColor: 'white',
      width:'90%',
      height: 45
    },
    TenantText: {
      color: "white",
      fontSize:18,
      fontFamily:"Poppins-Regular",
      letterSpacing: 0.2


    },
    BMForm: {
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor: 'white',
      borderRadius: 25,
      width:'90%',
      height: 45,
      padding: 9
    },
    Tform: {
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor: 'white',
      borderRadius: 25,
      width:'90%',
      height: 45
    },
    arrow:{
      justifyContent:'center',
      height: 25, 
      marginRight: 20 
      
    }

});

export default styles;
