import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Cast } from '../types/movies';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW, FONT_SIZE, FONT_WEIGHT } from '../config/theme';
import { PROFILE_SIZES } from '../services/api';

interface CastCardProps {
  cast: Cast;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.33 > 150 ? 150 : width * 0.33;

const CastCard: React.FC<CastCardProps> = ({ cast }) => {
  return (
    <View style={[styles.container, SHADOW.sm]}>
      {cast.profile_path ? (
        <Image 
          source={{ uri: `${PROFILE_SIZES.medium}${cast.profile_path}` }}
          style={styles.profileImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageInitial}>
            {cast.name.charAt(0)}
          </Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text 
          style={styles.name} 
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {cast.name}
        </Text>
        <Text 
          style={styles.character} 
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {cast.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  profileImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  noImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    backgroundColor: COLORS.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  noImageInitial: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.neutral[600],
  },
  infoContainer: {
    padding: SPACING.sm,
  },
  name: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.neutral[900],
  },
  character: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.neutral[600],
    marginTop: SPACING.xs,
  },
});

export default CastCard;