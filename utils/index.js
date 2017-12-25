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
		console.log('hit')
		try {
			CameraRoll.saveToCameraRoll(imageURI)
				.then(() => {
					Alert.alert('Success', 'Photo added to camera roll!')
				})
				.catch(e => {
					console.error(error)
				})
		} catch (error) {
			console.warn(error)
		}
	}
}

export const getAspectRatioHeight = (actualWidth, actualHeight, newWidth) => {
	const newHeight = actualHeight / actualWidth * newWidth
	return newHeight
}
