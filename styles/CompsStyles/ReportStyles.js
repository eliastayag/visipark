import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';

var styles = StyleSheet.create({
    container:{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 60,
        marginBottom: 70
    },
    card:{
        backgroundColor: '#fff',
        // shadowColor: Colors.Purple,
        // shadowOffset: {width: 0, height: 0},
        // shadowOpacity: 0.13,
        // borderRadius: 23,
        marginTop: 40,
        padding:30,
      
    },
    title:{
        alignItems:'center'
    },
    
    input:{
        width:"100%",
        height: 45,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: Colors.Lightgrey,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 10,
        borderColor: Colors.Purple
    },
    button:{
        backgroundColor: Colors.Purple,
        borderRadius: 23,
        height: 45,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10
    },
    popupsBg:{
        position: 'absolute',
        left:0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',

    }
});

export default styles;