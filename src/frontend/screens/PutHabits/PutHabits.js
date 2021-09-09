import React, {useState, useContext} from 'react'
import ColorSet from '../../resources/themes/Global'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import {SafeAreaView} from 'react-native';
import MenuHeader from "../../components/MenuHeader";
import styles from "../../styling/Header";
import TextBox from "../../components/TextBox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TimeTab from "../../components/TimeTab";
import { AuthContext } from "../../context"
import ScrollViewElement from "../../components/ScrollViewElement";
import BottomPopup from "../../components/BottomPopup";
const Day = ({selected, letter, onPress}) => (
    <TouchableOpacity onPress={onPress} style={{alignItems:"center", width:40, height:40,
        backgroundColor: selected ? ColorSet.Green.Tertiary : ColorSet.white,
        borderRadius:20, justifyContent:'center', marginVertical:5, borderWidth: 2,
        borderColor:ColorSet.Green.Quaternary}} activeOpacity={0.6}>
        <Text style={{color:ColorSet.Green.Quinary, fontSize: 20, fontWeight: "bold"}}> {letter} </Text>
    </TouchableOpacity>
)


function PutHabits(props) {
    // console.log("REEEEEEEEEEEEEEE")
    console.log(props)
    let popup = React.useRef();
    const [days, setDays] = useState(props.days);
    const [alarms, setAlarms] = useState(props.alarms);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [reason, setReason] = useState(props.reason);
    const {getToken} = useContext(AuthContext);
    const [popupText, setPopupText] = useState('');
    const createHabit = () => {
        fetch('http://localhost:5000/api/v1.0.0/habit/create_habit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authentication-token': getToken,
            },
            body: JSON.stringify({
                title: title,
                description: description,
                reason: reason,
                schedule: days,
                date: new Date(),
                times: alarms.length,
                alarm: alarms,
            }),
        })
            .then((res) => {
                res.json().then((data) => {
                    // console.log(data);
                    // console.log(res.status)
                    if (res.status == 200) {
                        props.navigation.goBack(null)
                    } else {
                        setPopupText( 'The provided information cannot be saved');
                        popup.current?.togglePopup()
                    }
                });
            })
            .catch();
    };
    const modifyHabit = () => {
        fetch('http://localhost:5000/api/v1.0.0/habit/change_habit/' + props.userHabitId + '/' + props.habitId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authentication-token': getToken,
            },
            body: JSON.stringify({
                title: title,
                description: description,
                reason: reason,
                schedule: days,
                date: new Date(),
                times: alarms.length,
                alarm: alarms,
            }),
        })
            .then((res) => {
                res.json().then((data) => {
                    // console.log(data);
                    // console.log(res.status)
                    if (res.status == 200) {
                        props.navigation.goBack(null)
                    } else {
                        setPopupText( 'The provided information cannot be saved');
                        popup.current?.togglePopup()
                    }
                });
            })
            .catch();
    };
    const onPress = props.isCreate ? () => createHabit() : () => modifyHabit()

    function flipDay(index) {
        let newArr = [...days];
        newArr[index] = !newArr[index];
        setDays(newArr);
    }

    function addAlarm(time) {
        time.setSeconds(0,0)
        for (const alarm of alarms) {
            if (alarm.getTime() == time.getTime()) {
                setPopupText( 'Alarm Already Exists');
                popup.current?.togglePopup()
                return
            } else if (alarm.getTime() > time.getTime()) {
                break;
            }
        }
        setAlarms([...alarms, time].sort());
    }

    function removeAlarm(index) {
        console.log('removing');
        setAlarms([...alarms.slice(0, index), ...alarms.slice(index + 1)]);
    }

    function getPrettyDate(time) {
        let localeSpecificTime = new Date(time).toLocaleTimeString();
        return localeSpecificTime.replace(/:\d+ /, ' ');
    }

    const textboxSmallStyle = {
        backgroundColor: ColorSet.Green.Secondary,
        padding: 10,
        borderWidth: 0,
        height: 50,
        borderStyle: 'solid',
        fontSize: 15,
        borderRadius: 5,
        marginBottom: 20
    }
    const textboxBigStyle = {
        backgroundColor: ColorSet.Green.Secondary,
        padding: 10,
        borderWidth: 0,
        height: 100,
        borderStyle: 'solid',
        fontSize: 15,
        borderRadius: 5,
        marginBottom: 20
    }
    // console.log(title)
    return (
        <SafeAreaView style={styles.headContainer}>
            <MenuHeader back={true} text={props.header} navigation={props.navigation}
                        right={
                            <TouchableOpacity onPress={() => onPress()}>
                                <Text style={styles.headerText}> {props.buttonText} </Text>
                            </TouchableOpacity>}
            />
            <ScrollView>
                <View style={{marginHorizontal: 30, marginTop: 10}}>
                    <TextBox header={"Title"} boxStyle={textboxSmallStyle} multiline={true} setText={setTitle} text={title}/>
                    <TextBox header={"Description"} boxStyle={textboxBigStyle} multiline={true}
                             setText={setDescription} text={description}/>
                    <TextBox header={"Your Why"} boxStyle={textboxSmallStyle} multiline={true} setText={setReason} text={reason}/>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: ColorSet.Green.Quaternary}}>Schedule</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Day letter={'S'} selected={days[0]} onPress={() => flipDay(0)}/>
                        <Day letter={'M'} selected={days[1]} onPress={() => flipDay(1)}/>
                        <Day letter={'T'} selected={days[2]} onPress={() => flipDay(2)}/>
                        <Day letter={'W'} selected={days[3]} onPress={() => flipDay(3)}/>
                        <Day letter={'T'} selected={days[4]} onPress={() => flipDay(4)}/>
                        <Day letter={'F'} selected={days[5]} onPress={() => flipDay(5)}/>
                        <Day letter={'S'} selected={days[6]} onPress={() => flipDay(6)}/>
                    </View>
                    <View style={{alignItems: 'center', marginVertical: 20}}>
                        <TouchableOpacity style={{
                            width: 200, height: 50, backgroundColor: ColorSet.Green.Tertiary,
                            alignItems: 'center', justifyContent: 'center', borderRadius: 20
                        }} onPress={() => setDatePickerVisibility(true)}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: ColorSet.Green.Quinary}}>Add An
                                Alarm</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {alarms.map((time, index) => {
                            return (<View key={index}>
                                    <ScrollViewElement
                                        leftFunction={() => removeAlarm(index)}
                                        leftClose={true}
                                        content={<TimeTab time={getPrettyDate(time)}/>}/>
                                    <View style={{marginVertical:7}}/>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <BottomPopup ref={popup} text={popupText}/>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                date={new Date('Aug 29 2020 23:00:00 EST')}
                onConfirm={(time) => {
                    addAlarm(time)
                    setDatePickerVisibility(false)
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />

        </SafeAreaView>
    )
}

export default PutHabits;