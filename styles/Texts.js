import {StyleSheet} from 'react-native';
import {Colors} from './Colors'

// How to use in your Component.js
// import Texts from '../styles/Texts.js';

// <Text style={Texts.HeadL}> Heading L </Text>


var Texts = StyleSheet.create({
    // Section Heading
    SecHead:{
        fontFamily:'Poppins-SemiBold',
        fontSize:40,
        color: Colors.Black,
        letterSpacing: 1.5
    },

    // Heading L 
    HeadL:{
        fontFamily:'Poppins-SemiBold',
        fontSize:25,
        color: Colors.Black,
        letterSpacing: 1.5
    },

    // Heading S 
    HeadS:{
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        color: Colors.Black,
        letterSpacing: 3
    },

    // Link
    Link:{
        fontFamily:'OpenSans-Bold',
        fontSize:16,
        color: Colors.Purple,
        letterSpacing: 4
    },

    // Body 
    Body:{
        fontFamily:'OpenSans-Regular',
        fontSize:16,
        color: Colors.Black,
        letterSpacing: 1.5,
        lineHeight: 23
    },

    // Body bold 
    BodyBold:{
        fontFamily:'OpenSans-Bold',
        fontSize:16,
        color: Colors.Black,
        letterSpacing: 1.5,
        lineHeight: 23
    },

    // Body light
    BodyLight:{
        fontFamily:'OpenSans-Regular',
        fontSize:16,
        color: Colors.Darkgrey,
        letterSpacing: 1.5,
        lineHeight: 23
    },

    // Form Text
    FormText:{
        fontFamily:'OpenSans-SemiBold',
        fontSize:18,
        color: Colors.Black,
        letterSpacing: 1.5
    }
});

export default Texts;