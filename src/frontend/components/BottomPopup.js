import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import ColorSet from "../resources/themes/Global";
const TitledIcon = ({icon, onPress, title}) => (
        <View style={{width:75}}>
    <TouchableOpacity activeOpacity={1} style={{justifyContent:"center", alignItems:"center"}} onPress={onPress}>
        <View style={{ backgroundColor:ColorSet.white, width:36, height:36,borderRadius:18}}>
        </View>
    </TouchableOpacity>
<Text style={{fontSize: 12, fontWeight: "bold", color:ColorSet.white, textAlign:"center"}}> {title} </Text>
        </View>
)

function BottomPopup(props) {
    console.log(props)

    console.log("changed");
    return (
            <Modal
                swipeDirection="down"
                onSwipeComplete={(e) => {props.setModalVisible(false)}}
                animationType="slide"
                transparent={true}
                backdropOpacity={0.2}
                style={{ justifyContent: 'flex-end', margin: 0}}
                isVisible={props.modalVisible}
            >
                <View style={{
                    height: 200,
                    backgroundColor:ColorSet.TertiaryGreen,
                    borderRadius:30,
                }}>
                    <View style={{marginHorizontal:30, marginTop:20}}>
                        <Text style={{fontSize: 24, fontWeight: "bold", color:ColorSet.white, marginBottom:20}}>Create</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                            <TitledIcon onPress={() => console.log("hi")} title={"Habits"}/>
                            <TitledIcon onPress={() => console.log("hey")} title={"Calender Entry"}/>
                            <TitledIcon onPress={() => console.log("bye")} title={"Calender Entry"}/>
                            <TitledIcon onPress={() => console.log("see ya")} title={"Reflection"}/>
                        </View>
                    </View>
                </View>
            </Modal>
    );
}

export default BottomPopup;