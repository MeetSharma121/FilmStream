import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  Keyboard
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../config/theme';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search movies...' 
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      Keyboard.dismiss();
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Search size={20} color={COLORS.neutral[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={COLORS.neutral[400]}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          clearButtonMode="while-editing" // iOS only
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={18} color={COLORS.neutral[500]} />
          </TouchableOpacity>
        )}
      </View>
      {Platform.OS !== 'web' && (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Search size={20} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.neutral[100],
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: FONT_SIZE.md,
    color: COLORS.neutral[900],
  },
  clearButton: {
    padding: SPACING.xs,
  },
  searchButton: {
    marginLeft: SPACING.sm,
    backgroundColor: COLORS.primary[500],
    width: 45,
    height: 45,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;