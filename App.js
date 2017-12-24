import React from 'react'
import { StackNavigator } from 'react-navigation'

import Home from './components/Home'
import SplashScreen from './components/SplashScreen'

const RootNavigator = StackNavigator({
	SplashScreen: {
		screen: SplashScreen,
		navigationOptions: ({ navigation }) => ({
			header: null,
			headerMode: 'none',
		}),
	},
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			header: null,
			headerMode: 'none',
		}),
	},
})

export default RootNavigator
