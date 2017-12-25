import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, WhiteSpace } from 'antd-mobile'
import { windowWidth, windowHeight } from '../utils/constants'

const ImageViewer = ({ navigation: { state: { params } } }) => {
	/* Image Preview Mode on Image Click */
	const style = ImageViewerStyles
	const { imgSrc: { regular: uri, full: downloadURI }, onDownloadClick } = params
	return (
		<View>
			<Image source={{ uri }} resizeMode="contain" style={style.image} />
			<Button style={style.button} icon="down" onClick={() => onDownloadClick(downloadURI)}>
				Download
			</Button>
			<WhiteSpace />
		</View>
	)
}

const ImageViewerStyles = StyleSheet.create({
	image: {
		width: windowWidth,
		height: windowHeight - 100,
	},
	button: {
		marginLeft: 8,
		marginRight: 8,
	},
})

export default ImageViewer
