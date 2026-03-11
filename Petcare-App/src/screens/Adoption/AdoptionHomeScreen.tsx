import React from 'react';
import { View, StyleSheet, ScrollView, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS, wp, hp } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const AdoptionHomeScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer>
      <Header title="Adoption" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800' }} 
          style={styles.heroBanner}
          imageStyle={{ borderRadius: RADIUS.xl }}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Find Your New Best Friend</Text>
            <Text style={styles.heroSubtitle}>Give a rescue pet a forever home today.</Text>
            <Button 
              title="Browse Pets" 
              onPress={() => navigation.navigate('AdoptionList')} 
              style={styles.heroBtn}
              textStyle={{ color: COLORS.text }}
            />
          </View>
        </ImageBackground>

        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('AdoptionList', { filter: 'Dogs' })}>
            <View style={[styles.catIconBox, { backgroundColor: '#fef3c7' }]}>
              <MaterialDesignIcons name="dog" size={32} color="#d97706" />
            </View>
            <Text style={styles.catText}>Dogs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('AdoptionList', { filter: 'Cats' })}>
            <View style={[styles.catIconBox, { backgroundColor: '#f3e8ff' }]}>
              <MaterialDesignIcons name="cat" size={32} color="#9333ea" />
            </View>
            <Text style={styles.catText}>Cats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('AdoptionList', { filter: 'Birds' })}>
            <View style={[styles.catIconBox, { backgroundColor: '#dcfce7' }]}>
              <MaterialDesignIcons name="bird" size={32} color="#16a34a" />
            </View>
            <Text style={styles.catText}>Birds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('AdoptionList', { filter: 'Other' })}>
            <View style={[styles.catIconBox, { backgroundColor: '#e0f2fe' }]}>
              <MaterialDesignIcons name="paw" size={32} color="#0284c7" />
            </View>
            <Text style={styles.catText}>Other</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>How it works</Text>
        <View style={styles.stepCard}>
          <View style={styles.stepIcon}>
            <Text style={styles.stepNum}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Find a Pet</Text>
            <Text style={styles.stepDesc}>Browse our extensive list of rescue animals looking for a home.</Text>
          </View>
        </View>
        <View style={styles.stepCard}>
          <View style={styles.stepIcon}>
            <Text style={styles.stepNum}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Submit Application</Text>
            <Text style={styles.stepDesc}>Fill out a simple form to let the shelter know you're interested.</Text>
          </View>
        </View>
        <View style={styles.stepCard}>
          <View style={styles.stepIcon}>
            <Text style={styles.stepNum}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Meet & Greet</Text>
            <Text style={styles.stepDesc}>Schedule a visit to meet your potential new family member.</Text>
          </View>
        </View>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  heroBanner: {
    width: '100%',
    height: hp(25),
    marginBottom: SPACING.xl,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#eee',
    marginBottom: SPACING.md,
  },
  heroBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: SPACING.xl,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  categoryCard: {
    alignItems: 'center',
    width: '23%',
  },
  catIconBox: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  catText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
    alignItems: 'center',
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  stepNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 14,
    color: COLORS.textLight,
  },
});
