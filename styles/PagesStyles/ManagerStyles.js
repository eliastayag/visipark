import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';
import Texts from '../Texts'

var styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
    },
    tabbar:{
        position:'absolute',
        bottom: 0,
        left: 0,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor: 'white',
        borderTopColor: Colors.Lightgrey,
        borderTopWidth: 2.5
        // drop shadow
        // shadowColor: Colors.Purple,
        // shadowOffset: {width: 0, height: 0},
        // shadowOpacity: 0.13,
        // shadowRadius: 13
    },
    tabcont:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    tabimg:{
        width: 32,
        height: 40
    },
    tabtext:{
        fontFamily:'OpenSans-Bold',
        fontSize: 10
    }
    
});

export default styles;