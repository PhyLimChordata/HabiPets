import React from 'react';
import { View, SafeAreaView, Text, Image, ScrollView } from 'react-native';

import MenuHeader from '../components/MenuHeader';
import styles from '../styling/Collaborators';
import HomeButton from '../components/HomeButton';

import { useTheme } from '@react-navigation/native';

function Collaborators(props) {
	const { colors } = useTheme();
	const style = styles(colors);

	return (
		<SafeAreaView style={{ height: '100%' }}>
			<MenuHeader
				text='Collaborators'
				navigation={props.navigation}
			></MenuHeader>
			<View style={style.headContainer}>
				<Image
					style={style.collabImg}
					source={require('../resources/images/Collaborators.png')}
				/>
				<ScrollView contentContainerStyle={style.container}>
					<Text style={style.textTitle}>A Special Thanks To</Text>
					<Text style={style.text}>Manola Yvonet</Text>
					<Text style={style.text}>Andy PhyLim</Text>
					<Text style={style.text}>Calvin Cheng</Text>
					<Text style={style.text}>Katrina Best</Text>
					<Text style={style.text}>Cheryl Chen</Text>
					<Text style={style.text}>Tuan Zi Li</Text>
					<Text style={style.text}>Rachelle Willemsma</Text>
					<Text style={style.text}>Prof. Joordens</Text>
				</ScrollView>
			</View>
			<HomeButton navigation={props.navigation} colors={colors} />
		</SafeAreaView>
	);
}

//https://reactnative.dev/docs/pixelratio

//<TextInput style={styles.textInput} defaultValue="Name unspecified" value={content} onChangeText={(text)=>setContent(text)}></TextInput>
//<Button title="Add it to the Database" onPress = {() => inputExample()}></Button>

export default Collaborators;
