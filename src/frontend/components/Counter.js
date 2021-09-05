import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../styling/Habits';
import ColorSet from '../resources/global/themes';

import {useTheme} from '@react-navigation/native';

function Counter(props) {
	const {colors} = useTheme();
	if (props.last) {
		return (
			<View
				style={{
					flexDirection: 'row',
					marginRight: 60,
					paddingTop: 10,
					backgroundColor: colors.Secondary,
				}}
			>
				<Text style={styles.levelText}>{props.quantity}</Text>
				{props.supplementalInfo}
			</View>
		);
	}
	return (
		<View style={styles.horizontalContainerPaddingRight}>
			<Text style={styles.levelText}>{props.quantity}</Text>
			{props.supplementalInfo}
		</View>
	);
}

export default Counter;
