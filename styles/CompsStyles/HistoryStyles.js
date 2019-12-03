import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';

var styles = StyleSheet.create({
    container:{
        // paddingTop: 60,
        // paddingLeft: 20,
        // paddingRight: 20,
        // width:"100%",
        //height: "90%"
        flex: 1,
        marginBottom: 70

    }, 
    content:{
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,

    },  
    SectionStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth:2, 
        borderColor:Colors.Purple,
        height: 40,
        borderRadius: 25 ,
        marginTop: 40,
        marginBottom: 20
    },
    ImageStyle: {
        paddingRight: 30,
        margin: 10,
        //height: 36,
        width: 28,
       // alignSelf: 'flex-end',
        
    },
    searchBar:{
        flex:1,
        alignItems: 'flex-start',
        paddingLeft: 20

    },
    card:{
        backgroundColor: '#fff',
        marginTop: 10,
        marginLeft:1,
        marginRight:1,
        paddingTop:20,
        paddingBottom:20,
        // shadowColor: Colors.Purple,
        // shadowOffset: {width: 0, height: 0},
        // shadowOpacity: 0.13,
        // shadowRadius: 3,
        // borderRadius: 23,
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems:"center",
        height: 100
       // borderWidth:1,       
        //justifyContent:"flex-start"
    },
    pinImg:{
        width:23,
        height: 40,
        //marginRight: 5,
        marginLeft:25
    },
    
    visiBtn:{
        borderWidth:2,
        borderRadius:25,
        borderColor: Colors.Purple,
        //width: "45%",
        height: 40,
        //marginLeft: 10,
        marginRight: 25,
        alignItems: 'center',
        justifyContent:"center",
        paddingLeft: 15,
        paddingRight: 15,
        // alignSelf: 'flex-end'
        
    },
    List:{
       position:"absolute",
       width: "60%",
       marginLeft: 70,
       marginTop: 18,
       alignItems:"flex-start"
    },
    name:{
       // backgroundColor: "#fab"
       width: 170
    }


});

export default styles;