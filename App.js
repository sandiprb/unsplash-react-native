import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableHighlight } from 'react-native'
import { StackNavigator } from 'react-navigation'

import { SearchBar, Button, WhiteSpace, WingBlank, ActivityIndicator } from 'antd-mobile'
import AutoHeightImage from 'react-native-auto-height-image'

import { getPhotoByKeyword } from './utils/Unsplash'
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
