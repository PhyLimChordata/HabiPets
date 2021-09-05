import React, {useState, useEffect, useContext} from 'react';
// import Toggle from 'react-native-toggle-element';
import { AuthContext } from '../context';

import {View, Text, TouchableOpacity, SafeAreaView, Image, AsyncStorage} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ColorSet from "../resources/global/themes";

import {useTheme} from '@react-navigation/native';

async function setLocalInfoTheme(color) {
    try {
        return await AsyncStorage.setItem('@ColorTheme:key', JSON.stringify(color));
    } catch (error) {
        console.log(error)
        // Error saving data
    }
}
async function UpdateTheme(setColorTheme) {
        try {
            let colorTheme =  JSON.parse(await AsyncStorage.getItem('@ColorTheme:key'));
                if (colorTheme != null)
                setColorTheme(colorTheme);
            return colorTheme
        } catch (error) {
            console.log(error)
            // Error saving data
        }
}

function InitializeColor(colorTheme, setColor) {
    const a = JSON.stringify(colorTheme)
    if (a == JSON.stringify(ColorSet.Yellow)) {
        setColor("yellow")
    } else if (a == JSON.stringify(ColorSet.Blue)) {
        setColor("blue")
    } else if (a == JSON.stringify(ColorSet.Purple)) {
        setColor("purple")
    } else if (a == JSON.stringify(ColorSet.Red)) {
        setColor("red")
    } else if (a == JSON.stringify(ColorSet.Green)) {
        setColor("green")
    }
}

function ThemeCircle ({colorTheme, onPress, selected}) {
    const { getColor } = useContext(AuthContext);
    return (<View>
        <TouchableOpacity style={{alignItems:"center", justifyContent:'center', flexDirection:'row', height:44,width:44,borderRadius:22,backgroundColor:selected ? colorTheme.Quinary:colorTheme.Tertiary}} onPress={onPress}>
            {selected ? <View style={{alignItems:"center", flexDirection:'row', height:30,width:30,borderRadius:15,backgroundColor: colorTheme.Tertiary}}/>:<></>}
        </TouchableOpacity>
    </View>);
}

const Tab = ({color, icon, onPress, title, isImage = false}) => (
        <TouchableOpacity style={{alignItems:"center", flexDirection:'row',width:"100%"}} onPress={onPress}>
            {isImage ?
                <Image source={icon}
                       resizeMode="contain"
                       style={{
                           width:40,
                           height:40,
                           tintColor: color,
                           // transform: [ { rotate: rotate }]
                       }}
                />
                :
                <MaterialCommunityIcons name={icon} color={color} size={40} />
            }
            <Text style={{ textAlign:'center', color:color, fontSize: 20, fontWeight: "bold"}}> {title} </Text>
        </TouchableOpacity>
)


function SideMenu(props) {
    const { signOut, changeColorTheme, getColor, changeModeTheme, getMode } = useContext(AuthContext);

    const {colors} = useTheme();
    const [color, setColor] = useState(getColor);
    const [toggleValue, setToggleValue] = useState(getMode);

    
    const [colorTheme, setColorTheme] = useState(colors);
    
    // useEffect( () => {
    //     UpdateTheme(setColorTheme).then(r => InitializeColor(r, setColor));

    // }, []);

    function colorChange(color) {
        changeColorTheme(color);
        setColor(color);

        // if (color == "yellow") {
        //     setLocalInfoTheme(ColorSet.Yellow).then(r => {
        //         console.log(r)
        //     })
        // } else if (color == "blue") {
        //     setLocalInfoTheme(ColorSet.Blue).then(r => {
        //         console.log(r)
        //     })
        // } else if (color == "purple") {
        //     setLocalInfoTheme(ColorSet.Purple).then(r => {
        //         console.log(r)
        //     })
        // } else if (color == "red") {
           

        //     setLocalInfoTheme(ColorSet.Red).then(r => {
        //         console.log(r)
        //     })
        // } else if (color == "green") {
            

        //     setLocalInfoTheme(ColorSet.Green).then(r => {
        //         console.log(r)
        //     })
        // } else {

        //     setLocalInfoTheme(ColorSet.Green).then(r => {
        //         console.log(r)
        //     })
        //     UpdateTheme(setColorTheme)
        //     setColor("green")
        //     return;
        // }
        // setColor(color)
        // UpdateTheme(setColorTheme)
    }

    return (
        <Modal
            swipeDirection="left"
            onSwipeComplete={(e) => {
                props.setModalVisible(false)
            }}
            transparent={true}
            backdropOpacity={0.2}
            onBackdropPress={() => props.setModalVisible(false)}
            style={{margin: 0}}
            isVisible={props.modalVisible}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
        >
            <View style={{
                height: "100%",
                width: "80%",
                paddingTop: "10%",
                paddingLeft: "5%",
                backgroundColor: colors.BackgroundGrey,
            }}>
                <SafeAreaView>
                    <View style={{marginHorizontal: "6%", height: "100%"}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: "6%"
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                                <TouchableOpacity style={{justifyContent: "center"}}
                                                  onPress={() => console.log('dsauda')}>
                                    <View style={{
                                        backgroundColor: colors.Tertiary,
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25
                                    }}>
                                    </View>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row',flex:1, marginHorizontal:'4%'}}>
                                <Text numberOfLines={1} style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: colors.Tertiary,
                                    textAlign: 'center',
                                }}>PhyLimChordata</Text>
                                {/* TODO: Needs to not be hard coded */}
                                </View>
                            </View>
                            <TouchableOpacity style={{height: 40, justifyContent: 'center'}}
                                              onPress={() => {
                                                  props.setModalVisible(false);
                                                  // console.log(props);
                                                  // props.navigation.navigate('SettingsScreen');
                                              }}>
                                <MaterialCommunityIcons name="cog" color={"white"} size={40}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{marginHorizontal: "6%", marginBottom: "6%"}}>
                            <Text style={{
                                fontSize: 18,
                                color: colors.Tertiary,
                                textAlign: 'center',
                            }}>"What you choose to struggle in is what you’ll ultimately become.”</Text>
                            <Text style={{fontSize: 18, color: colors.Tertiary, textAlign: 'right',}}> -
                                Mark Manson </Text>
                        </TouchableOpacity>
                        <View style={{marginLeft: "6%", height: "50%", justifyContent: 'space-between', marginBottom: "12%"}}>
                            <Tab color={colors.Tertiary} icon={'star'} title={'Achievements'}/>
                            <Tab color={colors.Tertiary} icon={'account-circle'} title={'Account'}/>
                            <Tab color={colors.Tertiary} icon={'bullhorn'} title={'Feedback'}/>
                            <Tab color={colors.Tertiary} icon={'bug'} title={'Report a Bug'}/>
                            <Tab color={colors.Tertiary} icon={'account-group'} title={'Collaborators'}/>
                            <Tab color={colors.Tertiary} icon={'hand-heart'} title={'Support Us!'}/>
                            <Tab color={colors.Tertiary} icon={require("../resources/images/icon.png")} title={'About'} isImage={true}/>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: "6%",
                            marginBottom: "6%"
                        }}>
                            <ThemeCircle colorTheme={ColorSet.Green} selected={color == 'green'}
                                         onPress={() => colorChange("green")}/>
                            <ThemeCircle colorTheme={ColorSet.Yellow} selected={color == 'orange'}
                                         onPress={() => colorChange("orange")}/>
                            <ThemeCircle colorTheme={ColorSet.Blue} selected={color == 'blue'}
                                         onPress={() => colorChange("blue")}/>
                            <ThemeCircle colorTheme={ColorSet.Purple} selected={color == 'purple'}
                                         onPress={() => colorChange("purple")}/>
                            <ThemeCircle colorTheme={ColorSet.Red} selected={color == 'red'}
                                         onPress={() => colorChange("red")}/>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            {/* <Toggle
                                value={toggleValue}
                                onPress={(newState) => changeModeTheme(newState)}
                                thumbButton={{
                                    activeBackgroundColor: colors.background,
                                    inActiveBackgroundColor: colors.background
                                }}
                                trackBar={{
                                    width: 100,
                                    height: 50,
                                    radius: 25,
                                    activeBackgroundColor: '#3c4145',
                                    inActiveBackgroundColor: '#3c4145',
                                }}
                                leftComponent={
                                    <MaterialCommunityIcons name={"weather-sunny"} color={colors.background} size={30}/>

                                }
                                rightComponent={
                                    <MaterialCommunityIcons name={"moon-waning-crescent"} color={colors.white}
                                                            size={30}/>
                                }
                            /> */}
                        </View>
                        <View style={{justifyContent: 'flex-end', flex: 1, marginHorizontal: "6%"}}>
                            <Tab color={colors.Tertiary} icon={"logout"} title={'Log Out'} onPress={() => {
                                props.setModalVisible(false)
                                signOut()
                            }}/>
                        </View>
                    </View>


                </SafeAreaView>
            </View>
        </Modal>
    );
}

export default SideMenu;
