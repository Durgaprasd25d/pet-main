import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { PostCard } from '../../components/cards/PostCard';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { dataService } from '../../services/dataService';
import { Post, User } from '../../types';

export const UserCommunityProfileScreen = ({ route, navigation }: any) => {
  const { userId } = route.params;
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      // Mock fetching user details (in a real app, you'd fetch user by ID)
      // Since our mock data.json only has one "loggedInUser", we'll mock the profile based on the posts
      const p = await dataService.getPosts();
      const userPostData = p.filter(post => post.userId === userId);
      setUserPosts(userPostData.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()));
      
      if (userPostData.length > 0) {
        setUserProfile({
          id: userId,
          name: userPostData[0].userName,
          email: 'user@example.com',
          avatar: userPostData[0].userAvatar,
          phone: '',
          location: ''
        });
      }
    };
    fetchUserAndPosts();
  }, [userId]);

  if (!userProfile) {
    return (
      <ScreenContainer>
        <Header title="Profile" onBackPress={() => navigation.goBack()} />
        <View style={styles.loading}>
          <Text>Loading profile...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Header title={userProfile.name} onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.profileHeader}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.bio}>Pet lover & parent to 3 beautiful rescues. Always happy to help the community!</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{userPosts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>1.2k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={[styles.statBox, { borderRightWidth: 0 }]}>
              <Text style={styles.statValue}>340</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <Button title="Follow" onPress={() => {}} style={{ flex: 1, marginRight: SPACING.md }} />
            <Button title="Message" variant="outline" onPress={() => {}} style={{ flex: 1 }} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Posts</Text>
        {userPosts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onPress={() => navigation.navigate('PostDetails', { postId: post.id })} 
            onUserPress={() => {}} // already on profile
          />
        ))}

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    paddingBottom: SPACING.lg,
    marginBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  bio: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.lg,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
});
