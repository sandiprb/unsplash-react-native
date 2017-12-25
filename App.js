import React from 'react'
import { StackNavigator } from 'react-navigation'

import Home from './components/Home'
import SplashScreen from './components/SplashScreen'
import ImageViewer from './components/ImageView'

const commonNavigationOptions = {
	header: null,
	headerMode: 'none',
}

const RootNavigator = StackNavigator({
	// Splash: {
	// 	screen: SplashScreen,
	// 	navigationOptions: ({ navigation }) => ({
	// 		...commonNavigationOptions,
	// 	}),
	// },
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			...commonNavigationOptions,
		}),
	},
	ImageViewer: {
		title: 'ImageViewer',
		screen: ImageViewer,
		navigationOptions: ({ navigation }) => ({
			...commonNavigationOptions,
		}),
	},
})

export default RootNavigator
