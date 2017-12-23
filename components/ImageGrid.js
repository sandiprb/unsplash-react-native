import React from 'react'
import { View, Image, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export const ImageGrid = ({ photos = [] }) => {
	const styles = ImageGridStyles
	const images =
		photos.length &&
		photos.map((obj, index) => {
			const { urls: { thumb: uri } } = obj
			return (
				<View key={`${uri}${index}`} style={styles.imgWrapper}>
					<Image style={styles.img} resizeMode="cover" source={{ uri }} />
				</View>
			)
		})
	return (
		<ScrollView
			ref={ref => (this.scrollView = ref)}
			onContentSizeChange={(contentWidth, contentHeight) => {
				this.scrollView.scrollToEnd({ animated: true })
			}}
		>
			<View style={styles.container}>{images ? images : null}</View>
		</ScrollView>
	)
}

const ImageGridStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingLeft: 8,
		paddingRight: 8,
	},

	imgWrapper: {
		flexBasis: WIDTH / 3 - 12,
		marginBottom: 8,
	},
	img: {
		height: 100,
	},
})
