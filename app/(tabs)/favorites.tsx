import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@/config/theme';
import { Movie } from '@/types/movies';
import MovieGridList from '@/components/MovieGridList';
import EmptyState from '@/components/EmptyState';
import { Heart } from 'lucide-react-native';

// This would normally use proper storage like AsyncStorage
// For demo purposes, we're using a static list
const DEMO_FAVORITES: Movie[] = [];

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Movie[]>(DEMO_FAVORITES);
  const [loading, setLoading] = useState(true);

  // Simulate loading favorites
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Heart size={24} color={COLORS.primary[500]} />
        <Text style={styles.title}>Favorites</Text>
      </View>
      
      {favorites.length > 0 ? (
        <MovieGridList
          movies={favorites}
          onMoviePress={handleMoviePress}
          loading={loading}
        />
      ) : (
        <EmptyState
          title="No Favorites Yet"
          message="Movies you save to your favorites will appear here"
          actionLabel="Browse Movies"
          onAction={() => router.push('/')}
        />
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