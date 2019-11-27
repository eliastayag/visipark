import {StyleSheet} from 'react-native';
import {Colors} from './Colors'

// How to use in your Component.js
// import Texts from '../styles/Texts.js';

// <Text style={Texts.HeadL}> Heading L </Text>


var Texts = StyleSheet.create({
    // Section Heading
    SecHead:{
        fontFamily:'Poppins-Medium',
        fontSize:40,
        letterSpacing: 0.2,
        color: Colors.Black
    },

    // Heading L 
    HeadL:{
        fontFamily:'Poppins-SemiBold',
        fontSize:25,
        color: Colors.Black
    },

    // Heading S 
    HeadS:{
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        color: Colors.Black,
        letterSpacing: 1

    },

    // Link
    Link:{
        fontFamily:'OpenSans-SemiBold',
        fontSize:16,
        color: Colors.Purple,
        letterSpacing: 0.3

    },

    // Body 
    Body:{
        fontFamily:'OpenSans-Regular',
        fontSize:16,
        color: Colors.Black,
        letterSpacing: 0.3,
        lineHeight: 23
    },

    // Body bold 
    BodyBold:{
        fontFamily:'OpenSans-Bold',
        fontSize:16,
        color: Colors.Black,
        letterSpacing: 0.3,
        lineHeight: 23
    },

    // Body light
    BodyLight:{
        fontFamily:'OpenSans-Semibold',
        fontSize:16,
        color: Colors.Darkgrey,
        letterSpacing: 0.4,
        lineHeight: 23
    },
    // history date
    HistoryDate:{
        fontFamily:'OpenSans-Regular',
        fontSize:12,
        color: Colors.Darkgrey,
        letterSpacing: 0.3,
        lineHeight: 23
    },

    // Form Text
    FormText:{
        fontFamily:'OpenSans-SemiBold',
        fontSize:18,
        color: Colors.Black,
        letterSpacing: 0.3
    }
});

export default Texts;

