import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';
import Texts from '../Texts';

var styles = StyleSheet.create({
    container:{
        //paddingTop: 60,
        //paddingLeft: 20,
        //paddingRight: 20,
        //width:"100%",
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
        height: 45,
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
    List:{
       
        //borderWidth:1,
        position:"absolute",
        width: "60%",
        marginLeft: 30,
        marginTop: 18,
        alignItems:"flex-start",
        justifyContent:"space-between"
     },
     Status:{
        color:Colors.Purple,
        marginRight: 30,
        alignItems: 'center',
        justifyContent:"center",
        paddingLeft: 280,
        //paddingRight: 15,
     }
     
     
    
});

export default styles;