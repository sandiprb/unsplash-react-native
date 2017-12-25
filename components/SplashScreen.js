import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { windowHeight, windowWidth } from '../utils/constants'

const SplashScreen = ({ navigation }) => {
	console.log(navigation)
	const { textName, logo } = SplashScreenStyles
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: windowHeight }}>
			<TouchableHighlight onPress={() => navigation.navigate('Home')}>
				<View>
					<Image
						source={{
							url:
								'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_Unsplash.svg/2000px-Logo_of_Unsplash.svg.png',
						}}
						style={logo}
					/>
					<Text style={textName}>Unsplash</Text>
				</View>
			</TouchableHighlight>
		</View>
	)
}

const SplashScreenStyles = StyleSheet.create({
	logo: {
		width: 100,
		height: 100,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	textName: {
		textAlign: 'center',
		fontSize: 44,
		fontWeight: 'bold',
	},
})

export default SplashScreen
