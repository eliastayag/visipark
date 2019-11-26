import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';
import Texts from '../Texts'

var styles = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 60,
    },

    content:{
        paddingTop: 0,
        flex:5
    },

    headerDesc:{
        marginBottom: 20
    },

    input:{
        width:"100%",
        height: 45,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: Colors.Lightgrey,
        borderRadius: 25,
        marginBottom: 10,
        borderColor: Colors.Purple,
        borderWidth: 2
    },

    subHeader:{
        flexDirection:"row",
        marginBottom: 5,
        marginTop: 15,
        justifyContent: "center",
    },

    card:{
        backgroundColor: '#fff',
        paddingLeft: 30,
        paddingRight: 30,

        paddingTop:10,
        paddingBottom:10,
        shadowColor: Colors.Purple,
        shadowOffset: {width:0, height: 0},
        shadowOpacity: 0.13,
        borderRadius: 23,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center"
        
    },

    subUnit:{
        position: "absolute",
        left: 30

    },
    subActive:{
        position: "absolute",
        right: 30

    },

    tenantUnit:{




    },
    tenantSwitch:{


    },
    





    
    
});

export default styles;