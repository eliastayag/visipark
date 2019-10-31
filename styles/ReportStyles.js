import {StyleSheet} from 'react-native';
import {Colors} from './Colors';

var styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        padding:30,
        shadowColor: Colors.Purple,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.13,
        borderRadius: 23
    },
    input:{
        width:"100%",
        height: 45,
        padding: 10,
        borderWidth:2,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 10
    },
    button:{
        backgroundColor: Colors.Purple,
        borderRadius: 23,
        height: 45,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default styles;