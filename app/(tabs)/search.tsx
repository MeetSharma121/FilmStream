import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@/config/theme';
import { searchMovies } from '@/services/api';
import { Movie } from '@/types/movies';
import MovieGridList from '@/components/MovieGridList';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }
    
    setPage(1);
    setLoading(true);
    setError(null);
    
    try {
      const response = await searchMovies(searchQuery, 1);
      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || page >= totalPages || !query.trim()) return;
    
    const nextPage = page + 1;
    setLoadingMore(true);
    
    try {
      const response = await searchMovies(query, nextPage);
      setMovies((prevMovies) => [...prevMovies, ...response.results]);
      setPage(nextPage);
    } catch (err) {
      console.error('Error loading more search results:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  // Render empty state when no search query
  const renderEmpty = () => {
    if (loading) return null;
    
    if (query && !movies.length) {
      return (
        <EmptyState
          title="No Results Found"
          message="We couldn't find any movies matching your search. Please try different keywords."
        />
      );
    }
    
    return (
      <EmptyState
        title="Find Your Favorite Movies"
        message="Search for movies by title"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Movies</Text>
      </View>
      
      <SearchBar onSearch={handleSearch} />
      
      {movies.length > 0 ? (
        <MovieGridList
          movies={movies}
          onMoviePress={handleMoviePress}
          loading={loading}
          loadingMore={loadingMore}
          onEndReached={handleLoadMore}
          error={error}
        />
      ) : (
        renderEmpty()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[50],
  },
  header: {
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
  },
});