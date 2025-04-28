import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Platform,
  Dimensions
} from 'react-native';
import { Movie } from '../types/movies';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW, FONT_SIZE, FONT_WEIGHT } from '../config/theme';
import { getPosterSize } from '../services/api';
import { Star } from 'lucide-react-native';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

const { width } = Dimensions.get('window');

// Calculate card width based on screen size
const getCardWidth = () => {
  if (Platform.OS === 'web') {
    // Different widths for web based on screen size
    if (width > 1200) return (width - SPACING.md * 6) / 5; // 5 columns for large screens
    if (width > 900) return (width - SPACING.md * 5) / 4; // 4 columns for medium screens
    if (width > 600) return (width - SPACING.md * 4) / 3; // 3 columns for small screens
    return (width - SPACING.md * 3) / 2; // 2 columns for very small screens
  }
  
  // For mobile, adapt based on screen width
  if (width > 700) return (width - SPACING.md * 4) / 3; // 3 columns for large mobile
  return (width - SPACING.md * 3) / 2; // 2 columns for standard mobile
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const cardWidth = getCardWidth();
  const imageHeight = cardWidth * 1.5; // Maintain poster aspect ratio
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderRating = () => {
    // Convert rating to 5-star scale
    const starRating = movie.vote_average / 2;
    
    return (
      <View style={styles.ratingContainer}>
        <Star size={16} color={COLORS.accent[500]} fill={COLORS.accent[500]} />
        <Text style={styles.ratingText}>
          {starRating.toFixed(1)}
        </Text>
      </View>
    );
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, { width: cardWidth }, SHADOW.md]}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {movie.poster_path ? (
          <Image 
            source={{ uri: `${getPosterSize()}${movie.poster_path}` }}
            style={[styles.poster, { height: imageHeight }]}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.noImage, { height: imageHeight }]}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}
        {renderRating()}
      </View>
      <View style={styles.infoContainer}>
        <Text 
          style={styles.title} 
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {movie.title}
        </Text>
        <Text style={styles.date}>{formatDate(movie.release_date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.xs,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  noImage: {
    width: '100%',
    backgroundColor: COLORS.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  noImageText: {
    color: COLORS.neutral[600],
    fontSize: FONT_SIZE.md,
  },
  infoContainer: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.neutral[900],
    marginBottom: SPACING.xs,
  },
  date: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.neutral[600],
  },
  ratingContainer: {
    position: 'absolute',
    bottom: SPACING.xs,
    left: SPACING.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    marginLeft: SPACING.xs,
  },
});

export default MovieCard;