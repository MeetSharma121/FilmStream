import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Star } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../config/theme';

interface RatingStarsProps {
  rating: number;
  count?: number;
  showText?: boolean;
  size?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  count,
  showText = true,
  size = 16,
}) => {
  // Convert to 5-star scale from TMDB's 10-point scale
  const normalizedRating = rating / 2;
  
  // Create an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    // Determine if this star should be filled, half-filled, or empty
    if (i < Math.floor(normalizedRating)) {
      return 'filled';
    } else if (i < Math.ceil(normalizedRating) && !Number.isInteger(normalizedRating)) {
      return 'half';
    }
    return 'empty';
  });

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {stars.map((type, index) => (
          <Star
            key={index}
            size={size}
            color={COLORS.accent[500]}
            fill={type !== 'empty' ? COLORS.accent[500] : 'transparent'}
            strokeWidth={2}
          />
        ))}
      </View>
      {showText && (
        <Text style={styles.ratingText}>
          {normalizedRating.toFixed(1)}
          {count !== undefined && count > 0 && (
            <Text style={styles.countText}> ({count})</Text>
          )}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.neutral[800],
  },
  countText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.neutral[600],
  },
});

export default RatingStars;