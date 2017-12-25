import React from 'react'
import { CameraRoll, Platform, Alert } from 'react-native'
import RNFS from 'react-native-fs'

export const saveToCameraRoll = async imageURI => {
	if (Platform.OS === 'android') {
		const res = await RNFetchBlob.config({
			fileCache: true,
			appendExt: 'jpg',
		}).fetch('GET', image.urls.small)
		await CameraRoll.saveToCameraRoll(res.path())
		Alert.alert('Success', 'Photo added to camera roll!')
	} else {
		try {
			await CameraRoll.saveToCameraRoll(imageURI)
			Alert.alert('Success', 'Photo added to camera roll!')
		} catch (error) {
			console.log(error)
		}
	}
}
