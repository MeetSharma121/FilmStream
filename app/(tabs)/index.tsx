import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@/config/theme';
import { fetchTrendingMovies } from '@/services/api';
import { Movie } from '@/types/movies';
import MovieGridList from '@/components/MovieGridList';
import { Film } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Initial fetch
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async (refreshing = false) => {
    try {
      if (refreshing) {
        setRefreshing(true);
        setPage(1);
      } else if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError(null);
      const response = await fetchTrendingMovies(refreshing ? 1 : page);
      
      setTotalPages(response.total_pages);
      
      if (refreshing || page === 1) {
        setMovies(response.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.results]);
      }
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (loadingMore || page >= totalPages) return;
    setPage((prevPage) => prevPage + 1);
    loadMovies();
  };

  const handleRefresh = () => {
    loadMovies(true);
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Film size={24} color={COLORS.primary[500]} />
        <Text style={styles.title}>Trending Movies</Text>
      </View>
      
      <MovieGridList
        movies={movies}
        onMoviePress={handleMoviePress}
        loading={loading}
        loadingMore={loadingMore}
        onEndReached={handleLoadMore}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        error={error}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral[900],
    marginLeft: SPACING.sm,
  },
});