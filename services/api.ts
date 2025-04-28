import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import { 
  MoviesResponse, 
  MovieDetails, 
  Credits, 
  VideoResponse 
} from '../types/movies';

// TMDB API configuration
const API_KEY = '2dca580c2a14b55200e784d157207b4d'; // This would usually be in an env file
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRY_DELAY = 10000; // 10 seconds

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  timeout: 20000, // Increased timeout to 20 seconds
});

// Image sizes for optimized loading
export const POSTER_SIZES = {
  small: `${IMAGE_BASE_URL}/w154`,
  medium: `${IMAGE_BASE_URL}/w342`,
  large: `${IMAGE_BASE_URL}/w500`,
  original: `${IMAGE_BASE_URL}/original`,
};

export const BACKDROP_SIZES = {
  small: `${IMAGE_BASE_URL}/w300`,
  medium: `${IMAGE_BASE_URL}/w780`,
  large: `${IMAGE_BASE_URL}/w1280`,
  original: `${IMAGE_BASE_URL}/original`,
};

export const PROFILE_SIZES = {
  small: `${IMAGE_BASE_URL}/w45`,
  medium: `${IMAGE_BASE_URL}/w185`,
  large: `${IMAGE_BASE_URL}/w300`,
  original: `${IMAGE_BASE_URL}/original`,
};

// Helper function to get appropriate poster size based on platform/device
export const getPosterSize = () => {
  if (Platform.OS === 'web') {
    // Higher res for web
    return POSTER_SIZES.large;
  }
  // Medium res for mobile
  return POSTER_SIZES.medium;
};

// Helper function to get appropriate backdrop size based on platform/device
export const getBackdropSize = () => {
  if (Platform.OS === 'web') {
    // Higher res for web
    return BACKDROP_SIZES.large;
  }
  // Medium res for mobile
  return BACKDROP_SIZES.medium;
};

// Helper function for exponential backoff
const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

// Generic retry function with exponential backoff
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries === 0 || !(error instanceof AxiosError)) {
      throw error;
    }

    // Only retry on network errors or timeouts
    if (!error.isAxiosError || (error.response && error.response.status < 500)) {
      throw error;
    }

    console.log(`Retrying request. Attempts remaining: ${retries - 1}`);
    await wait(Math.min(delay, MAX_RETRY_DELAY));
    return retryWithBackoff(operation, retries - 1, delay * 2);
  }
}

// API functions with retry mechanism
export const fetchTrendingMovies = async (page = 1): Promise<MoviesResponse> => {
  try {
    return await retryWithBackoff(() => 
      api.get<MoviesResponse>('/trending/movie/day', {
        params: { page },
      }).then(response => response.data)
    );
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw new Error('Failed to load movies. Please check your connection and try again.');
  }
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    return await retryWithBackoff(() =>
      api.get<MovieDetails>(`/movie/${id}`).then(response => response.data)
    );
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    throw new Error('Failed to load movie details. Please try again later.');
  }
};

export const fetchMovieCredits = async (id: number): Promise<Credits> => {
  try {
    return await retryWithBackoff(() =>
      api.get<Credits>(`/movie/${id}/credits`).then(response => response.data)
    );
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${id}:`, error);
    throw new Error('Failed to load movie credits. Please try again later.');
  }
};

export const fetchMovieVideos = async (id: number): Promise<VideoResponse> => {
  try {
    return await retryWithBackoff(() =>
      api.get<VideoResponse>(`/movie/${id}/videos`).then(response => response.data)
    );
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${id}:`, error);
    throw new Error('Failed to load movie videos. Please try again later.');
  }
};

export const searchMovies = async (query: string, page = 1): Promise<MoviesResponse> => {
  try {
    return await retryWithBackoff(() =>
      api.get<MoviesResponse>('/search/movie', {
        params: { query, page },
      }).then(response => response.data)
    );
  } catch (error) {
    console.error(`Error searching movies with query "${query}":`, error);
    throw new Error('Failed to search movies. Please check your connection and try again.');
  }
};