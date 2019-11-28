
import React,{useState,useEffect} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import styles from '../styles/PagesStyles/MainStyles';
import Tenant from '../Pages/Tenant';
import Login from '../Pages/Login';
import Popup from '../comps/Popup';
import Manager from '../Pages/Manager';
import Fetch from '../comps/Fetch';


var timer = null;
function Main(props){
    // --------- Variables ------------
    // Across the app
    var mpopup = null;
    var page = null;
    const [showpage, setShowpage] = useState('Login'); 
    const [pop, showPop] = useState(''); 
    const [cont, setCont] = useState('Visitors');
    // Tenant - Visitors
    const [unit, setUnit] = useState();
    const [spots,setSpots] = useState();
    const [card1, setCard1] = useState(false);     
    const [card2, setCard2] = useState(false);
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [plate1, setPlate1] = useState('');
    const [plate2, setPlate2] = useState('');
    const [dur1, setDur1] = useState(1); // time left in UI
    const [dur2, setDur2] = useState(1);
    const [reg1, setReg1] = useState();
    const [reg2, setReg2] = useState();
    const [id1,setId1] = useState();
    const [id2,setId2] = useState();
    // Tenant - History  
    const [PinnedVisitors, setPinnedVisitors] = useState([]);
    const [UnpinnedVisitors, setUnpinnedVisitors] = useState([]);

    // --------------- Communicate with DB ----------------
    
    // Fetch() for getting and posting
    // Variable = await Fetch("filename", data, "console_log_message");
    // write "null" instead of "data" for GET 

    // Show all tables 
            // Fetch('getData',null,'get all tables');

    // Auto-remove expired visitors 
            // Fetch('autoRemove',null,null);

    // Get History data
            // Fetch('getHistory',{unit_num:unit},'Data for History');

    // Get Spots
            // Fetch('getSpots',null,'Spots left');

    // Get Current Visitor 
            // Fetch('getCurrentVisitors',{unit_num:unit},'Fetch Current Visitors');

    // Add a visitor
            // Fetch('addVisitor',{unit_num:unit, name:name,plate:plate, duration:duration},"Added a visitor");

    // Remove a visitor
            // Fetch('removeVisitor',{id: id},'Removed a visitor');

    // Extend a visitor
            // Fetch('extendVisitor',{id: id, extendhour: extendhour},'Extended a visitor');

    // Pin a visitor 
            // Fetch('pinVisitor',{unit_num:unit,id:id},'Pinned a visitor');

    // Unpin a visitor 
            // Fetch('unpinVisitor',{unit_num:unit,id:id},'Unpinned a visitor');

    const getSpots = async()=>{
        var spotnum = await Fetch('getSpots',null,null);
        setSpots(spotnum);
    }

    const getUnit = async()=>{ 
        
        var localunit = await AsyncStorage.getItem('unit');
        console.log('local unit',localunit);
        if(localunit !== null && localunit !==''){
            // if there IS unit number stored in local storage
            // run get current visitor 
            console.log('You are in unit',localunit);
            setUnit(localunit);
            getSpots();
            setCurrentVisitors(localunit);
            setHistory(localunit);
            setShowpage('Tenant');
            console.log('Logged in unit', localunit);
        } else {
            console.log('lalala unit');
            // if there ISN'T unit number stored in local storage
            setShowpage('Login');
            console.log('Unit has not logged in');
        }
    }

    const setCurrentVisitors = async(unit)=>{
        var currentVisitors = await Fetch('getCurrentVisitors',{unit_num:unit},null);
        // set visitor1 and visitor2 with current visitors info
        if (currentVisitors.length == 1){
            // console.log('there is 1 current visitor');
            setName1(currentVisitors[0].name);
            setPlate1(currentVisitors[0].plate);
            setDur1(currentVisitors[0].time_left);
            setReg1(currentVisitors[0].regtime);
            setId1(currentVisitors[0].id);
            setCard1(true);
        }
        if (currentVisitors.length == 2){
            // console.log('there are 2 current visitors');
            setName1(currentVisitors[0].name);
            setPlate1(currentVisitors[0].plate);
            setDur1(currentVisitors[0].time_left);
            setReg1(currentVisitors[0].regtime);
            setId1(currentVisitors[0].id);
            setCard1(true);
            setName2(currentVisitors[1].name);
            setPlate2(currentVisitors[1].plate);
            setDur2(currentVisitors[1].time_left);
            setReg2(currentVisitors[1].regtime);
            setId2(currentVisitors[1].id);
            setCard2(true);
        }
    }

    const setHistory = async(unit)=>{
        var History = await Fetch('getHistory',{unit_num:unit},null);
        setPinnedVisitors(History.pinned);
        setUnpinnedVisitors(History.notpinned);
    }
  

    // conditions to show and hide pages
    if(showpage == 'Login'){
        page = <Login 
                // show Login, Tenant or Manager page
                showpage={showpage}    
                setShowpage={setShowpage} 
                // unit info
                unit = {unit}
                setUnit = {setUnit}
                getUnit = {getUnit}
                />;
            props.setSafebg(false);
    }
    if(showpage == 'Tenant'){
        page = <Tenant 
                 unit = {unit}
                 cont={cont}
                 setCont={setCont}
                 pop = {pop} 
                 showPop = {showPop}
                 card1 = {card1}
                 setCard1 = {setCard1}
                 card2 = {card2}
                 setCard2 = {setCard2}
                 name1 = {name1}
                 setName1 ={setName1}
                 name2 = {name2}
                 setName2 ={setName2}
                 plate1 = {plate1}
                 setPlate1 ={setPlate1}
                 plate2 = {plate2}
                 setPlate2 ={setPlate2}
                 dur1 = {dur1}
                 setDur1 ={setDur1}
                 dur2 = {dur2}
                 setDur2 ={setDur2}
                 reg1 = {reg1}
                 reg2 = {reg2}
                 id1 = {id1}
                 id2 = {id2}
                 // spots
                 spots = {spots}
                 // async function 
                 getUnit = {getUnit}
                 // History Page
                 setHistory = {setHistory}
                 UnpinnedVisitors = {UnpinnedVisitors}
                 PinnedVisitors = {PinnedVisitors}
                />;
        props.setSafebg(true);
    }
    if(showpage == 'Manager'){
        page = <Manager 
                 pop = {pop} 
                 showPop = {showPop}
                //  visiName = {visiName}
                //  setVisiName = {setVisiName}
                //  visiPlate ={visiPlate} 
                //  setVisiPlate = {setVisiPlate}
                //  visiDur = {visiDur} 
                //  setVisiDur = {setVisiDur}
                />;
        props.setSafebg(true);
    }

     // Conditions to show Popup
     if (pop == ''){
        mpopup = null;
     } else {
         mpopup = <Popup 
                     // popup
                     pop = {pop} 
                     showPop = {showPop} 
                     // show page
                     setShowpage = {setShowpage}
                     // set content on Tenant page
                     cont = {cont}
                     setCont = {setCont}
                     // cards
                     card1 = {card1}
                     setCard1 = {setCard1}
                     card2 = {card2}
                     setCard2 = {setCard2}
                     // unit
                     unit = {unit}
                     // visitors info
                     name1 = {name1}
                     setName1 ={setName1}
                     name2 = {name2}
                     setName2 ={setName2}
                     plate1 = {plate1}
                     setPlate1 ={setPlate1}
                     plate2 = {plate2}
                     setPlate2 ={setPlate2}
                     dur1 = {dur1}
                     setDur1 ={setDur1}
                     dur2 = {dur2}
                     setDur2 ={setDur2}
                     reg1 = {reg1}
                     reg2 = {reg2}
                     id1 = {id1}
                     id2 = {id2}
                    // fetch 
                    setCurrentVisitors = {setCurrentVisitors}
                     />;                 
             }



// Fetch data when the app loads and update every second
             

    useEffect(()=>{
        // when the app loads
        // Fetch('getCurrentVisitors',{unit_num:101},'Current Visitors');
        // Fetch('getHistory',{unit_num:101},'Data for History');
        Fetch('getSpots',null,'Spots left');
        getUnit();
        
        // update every second
        if(timer === null){
            timer = setInterval(()=>{
                console.log("timer");
                //auto remove 
                // Fetch('autoRemove',null,null);
                // console.log(unit);
                // setCurrentVisitors(unit);
                // getSpots();
                // setHistory(unit);
            }, 1000)
        }
        return ()=>{
            if(timer){
                clearInterval(timer);
                timer = null;
            }
        }
        
    },[]);
      


    // -------------- UI ------------------
return (
        <View style={styles.container}>
           {mpopup} 
           {page}
        </View>

    )
}

export default Main;
