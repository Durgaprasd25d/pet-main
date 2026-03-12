import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { PostCard } from '../../components/cards/PostCard';
import { SPACING, COLORS, SHADOWS, RADIUS } from '../../theme/theme';
import { Post } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import { useCommunityStore } from '../../store/useCommunityStore';

export const CommunityFeedScreen = ({ navigation }: any) => {
  const { posts, loading, fetchPosts } = useCommunityStore();

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <ScreenContainer>
      <Header 
        title="Pet Community" 
        rightIcon="plus-circle" 
        onRightPress={() => navigation.navigate('CreatePost')} 
        onBackPress={() => navigation.goBack()}
        transparent
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={fetchPosts} 
            colors={[COLORS.primary]} 
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post, index) => (
          <PostCard 
            key={post.id} 
            post={post} 
            index={index}
            onPress={() => navigation.navigate('PostDetails', { postId: post.id })} 
            onUserPress={() => navigation.navigate('UserCommunityProfile', { userId: post.userId })}
          />
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('CreatePost')}
        activeOpacity={0.8}
      >
        <MaterialDesignIcons name="pencil" size={28} color={COLORS.surface} />
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: 100, // Space for FAB
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
});
