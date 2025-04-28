import React from 'react';
import { StyleSheet, FlatList, View, Text, RefreshControl } from 'react-native';
import { Movie } from '../types/movies';
import MovieCard from './MovieCard';
import LoadingIndicator from './LoadingIndicator';
import { COLORS, SPACING, FONT_SIZE } from '../config/theme';

interface MovieGridListProps {
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
  loading?: boolean;
  loadingMore?: boolean;
  onEndReached?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  error?: string | null;
}

const MovieGridList: React.FC<MovieGridListProps> = ({
  movies,
  onMoviePress,
  loading = false,
  loadingMore = false,
  onEndReached,
  onRefresh,
  refreshing = false,
  error = null,
}) => {
  if (loading && movies.length === 0) {
    return <LoadingIndicator fullscreen message="Loading movies..." />;
  }

  if (error && movies.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <LoadingIndicator message="Loading more movies..." />;
  };

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={onMoviePress} />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary[500]}
            colors={[COLORS.primary[500]]}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: SPACING.xs,
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
  },
});

export default MovieGridList;