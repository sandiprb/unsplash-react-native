import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { windowWidth, windowHeight } from '../utils/constants'

const ImageViewer = ({ navigation: { state: { params } } }) => {
	/* Image Preview Mode on Image Click */
	const style = ImageViewerStyles
	const { regular: uri } = params
	return (
		<View>
			<Image source={{ uri }} resizeMode="contain" style={style.image} />
		</View>
	)
}

const ImageViewerStyles = StyleSheet.create({
	image: {
		width: windowWidth,
		height: windowHeight,
	},
})

export default ImageViewer
