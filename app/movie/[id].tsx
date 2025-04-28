import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Platform 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import YoutubeIframe from 'react-native-youtube-iframe';
import { 
  COLORS, 
  SPACING, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  BORDER_RADIUS, 
  SHADOW 
} from '@/config/theme';
import { 
  fetchMovieDetails, 
  fetchMovieCredits, 
  fetchMovieVideos, 
  getBackdropSize, 
  getPosterSize 
} from '@/services/api';
import { MovieDetails, Cast, Video } from '@/types/movies';
import LoadingIndicator from '@/components/LoadingIndicator';
import CastCard from '@/components/CastCard';
import RatingStars from '@/components/RatingStars';
import { ChevronLeft, Clock, Calendar, ChartBar as BarChart, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const TRAILER_HEIGHT = width * 0.5625; // 16:9 aspect ratio

export default function MovieDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = parseInt(id || '0', 10);
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (movieId) {
      loadMovieData(movieId);
    }
  }, [movieId]);

  const loadMovieData = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch movie details, credits, and videos in parallel
      const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
        fetchMovieDetails(id),
        fetchMovieCredits(id),
        fetchMovieVideos(id)
      ]);
      
      setMovie(detailsResponse);
      setCast(creditsResponse.cast.slice(0, 10)); // Limit to first 10 cast members
      
      // Find the first YouTube trailer
      const trailerVideo = videosResponse.results.find(
        video => video.site === 'YouTube' && 
        (video.type === 'Trailer' || video.type === 'Teaser')
      );
      
      if (trailerVideo) {
        setTrailer(trailerVideo);
      }
    } catch (err) {
      setError('Failed to load movie details. Please try again later.');
      console.error('Error loading movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would save to AsyncStorage or a backend
  };

  if (loading) {
    return <LoadingIndicator fullscreen message="Loading movie details..." />;
  }

  if (error || !movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Movie not found'}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backIcon} 
        onPress={() => router.back()}
      >
        <ChevronLeft size={24} color={COLORS.white} />
      </TouchableOpacity>
      
      {/* Backdrop Image */}
      <View style={styles.backdropContainer}>
        {movie.backdrop_path ? (
          <Image
            source={{ uri: `${getBackdropSize()}${movie.backdrop_path}` }}
            style={styles.backdrop}
            resizeMode="cover"
          />
        ) : movie.poster_path ? (
          <Image
            source={{ uri: `${getPosterSize()}${movie.poster_path}` }}
            style={styles.backdrop}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noBackdrop} />
        )}
        <View style={styles.backdropGradient} />
      </View>
      
      {/* Movie Info Section */}
      <View style={styles.movieInfoContainer}>
        {/* Poster and Basic Info */}
        <View style={styles.headerRow}>
          {movie.poster_path && (
            <Image
              source={{ uri: `${getPosterSize()}${movie.poster_path}` }}
              style={styles.poster}
              resizeMode="cover"
            />
          )}
          
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            
            {movie.tagline && (
              <Text style={styles.tagline}>{movie.tagline}</Text>
            )}
            
            <View style={styles.metaRow}>
              <RatingStars 
                rating={movie.vote_average} 
                count={movie.vote_count} 
              />
            </View>
            
            <View style={styles.metaContainer}>
              {movie.runtime && (
                <View style={styles.metaItem}>
                  <Clock size={16} color={COLORS.neutral[600]} />
                  <Text style={styles.metaText}>{formatRuntime(movie.runtime)}</Text>
                </View>
              )}
              
              {movie.release_date && (
                <View style={styles.metaItem}>
                  <Calendar size={16} color={COLORS.neutral[600]} />
                  <Text style={styles.metaText}>{formatDate(movie.release_date).split(',')[0]}</Text>
                </View>
              )}
              
              {movie.popularity && (
                <View style={styles.metaItem}>
                  <BarChart size={16} color={COLORS.neutral[600]} />
                  <Text style={styles.metaText}>{Math.round(movie.popularity)}</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              style={[
                styles.favoriteButton, 
                isFavorite && styles.favoriteButtonActive
              ]}
              onPress={toggleFavorite}
            >
              <Heart 
                size={18} 
                color={isFavorite ? COLORS.white : COLORS.primary[500]} 
                fill={isFavorite ? COLORS.white : 'transparent'} 
              />
              <Text 
                style={[
                  styles.favoriteButtonText,
                  isFavorite && styles.favoriteButtonTextActive
                ]}
              >
                {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{movie.overview || 'No overview available.'}</Text>
        </View>
        
        {/* Trailer Section */}
        {trailer && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trailer</Text>
            <View style={styles.trailerContainer}>
              <YoutubeIframe
                height={TRAILER_HEIGHT}
                videoId={trailer.key}
                webViewProps={{
                  allowsFullscreenVideo: true,
                  javaScriptEnabled: true,
                }}
              />
            </View>
          </View>
        )}
        
        {/* Cast Section */}
        {cast.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cast</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castContainer}
            >
              {cast.map((person) => (
                <CastCard key={person.id} cast={person} />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[50],
  },
  content: {
    paddingBottom: SPACING.xl,
  },
  backdropContainer: {
    position: 'relative',
    height: 250,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  noBackdrop: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.neutral[300],
  },
  backdropGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundImage: 'linear-gradient(to bottom, rgba(249, 250, 251, 0), rgba(249, 250, 251, 1))',
  },
  movieInfoContainer: {
    padding: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    marginTop: -70,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
    ...SHADOW.md,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral[900],
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
    color: COLORS.neutral[600],
    marginBottom: SPACING.sm,
  },
  metaRow: {
    marginBottom: SPACING.sm,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginBottom: SPACING.xs,
  },
  metaText: {
    fontSize: FONT_SIZE.sm,
    fontFamily: 'Inter-Medium',
    color: COLORS.neutral[700],
    marginLeft: SPACING.xs,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral[900],
    marginBottom: SPACING.sm,
  },
  overview: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral[800],
    lineHeight: 24,
  },
  trailerContainer: {
    width: '100%',
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOW.sm,
  },
  castContainer: {
    paddingVertical: SPACING.sm,
  },
  backIcon: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: BORDER_RADIUS.full,
    padding: SPACING.xs,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary[500],
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: COLORS.primary[500],
    borderColor: COLORS.primary[500],
  },
  favoriteButtonText: {
    fontSize: FONT_SIZE.sm,
    fontFamily: 'Inter-Medium',
    color: COLORS.primary[500],
    marginLeft: SPACING.xs,
  },
  favoriteButtonTextActive: {
    color: COLORS.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.error[500],
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  backButton: {
    backgroundColor: COLORS.primary[500],
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontFamily: 'Inter-Medium',
  },
});