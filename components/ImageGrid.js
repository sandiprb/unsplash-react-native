import React from 'react'
import { View, Image, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export const ImageGrid = ({ photos = [], columns = 3 }) => {
  const styles = ImageGridStyles
	const images = photos.length && photos.map((obj, index) => {
				const { urls: { small: uri } } = obj
				return (
					<View key={`${uri}${index}`} style={styles.imgWrapper}>
						<Image style={styles.img} resizeMode="cover" source={{ uri }} />
					</View>
				)
			})
	return (
    <ScrollView>
      <View style={styles.container}>
        {images ? images: null}
      </View>
    </ScrollView>
	)
}

const ImageGridStyles = StyleSheet.create({
	container: {
		// display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
  },

	imgWrapper: {
    // flexBasis: '1'
    flexBasis: (WIDTH / 3) - 12,
		// height: 100,
		// width: 100,
		marginBottom: 8,
		// marginLeft: 4,
		// marginLeft: 4,
	},
	img: {
		height: 100,
		// flex:
	},
})
