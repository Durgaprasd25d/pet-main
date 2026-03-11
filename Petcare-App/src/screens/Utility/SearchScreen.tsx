import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Input } from '../../components/ui/Input';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');

  const RECENT_SEARCHES = ['Dr. Sarah', 'Golden Retriever mix', 'Vaccination clinic', 'Lost cat downtown'];
  const POPULAR_CATEGORIES = [
    { name: 'Vets', icon: 'stethoscope', color: COLORS.primary },
    { name: 'Adoption', icon: 'paw', color: COLORS.secondary },
    { name: 'Community', icon: 'account-group', color: '#8b5cf6' },
    { name: 'Emergency', icon: 'alert', color: COLORS.error },
  ];

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialDesignIcons name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Input 
            placeholder="Search for vets, pets, posts..." 
            value={query} 
            onChangeText={setQuery} 
            leftIcon="magnify"
            rightIcon={query ? 'close-circle' : undefined}
            onRightIconPress={() => setQuery('')}
            autoFocus
            containerStyle={{ marginBottom: 0 }}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate('FilterResults')}>
          <MaterialDesignIcons name="tune" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        
        {query.length === 0 ? (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
            </View>
            {RECENT_SEARCHES.map((search, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <MaterialDesignIcons name="history" size={20} color={COLORS.textLight} />
                <Text style={styles.recentText}>{search}</Text>
                <MaterialDesignIcons name="arrow-top-left" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Explore Categories</Text>
            <View style={styles.categoryGrid}>
              {POPULAR_CATEGORIES.map((cat, index) => (
                <TouchableOpacity key={index} style={styles.categoryCard}>
                  <View style={[styles.catIconBox, { backgroundColor: cat.color + '15' }]}>
                    <MaterialDesignIcons name={cat.icon as any} size={28} color={cat.color} />
                  </View>
                  <Text style={styles.catName}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsText}>Press Enter to search for "{query}"...</Text>
            {/* Logic to show actual results would go here */}
          </View>
        )}

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: SPACING.xs,
    marginRight: SPACING.sm,
  },
  searchContainer: {
    flex: 1,
  },
  filterBtn: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
    backgroundColor: COLORS.primary + '15',
    borderRadius: RADIUS.md,
  },
  content: {
    padding: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  clearText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recentText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  catName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  resultsContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
});
