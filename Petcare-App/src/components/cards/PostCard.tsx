import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { Post } from '../../types';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Avatar } from '../ui/Avatar';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  onUserPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  index?: number;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onPress, 
  onUserPress, 
  onLikePress, 
  onCommentPress, 
  onSharePress,
  index = 0
}) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={styles.card}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onUserPress} activeOpacity={0.7}>
          <Avatar source={{ uri: post.userAvatar }} size={44} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerInfo} onPress={onUserPress} activeOpacity={0.7}>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.timeAgo}>{post.timeAgo}</Text>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialDesignIcons name="dots-horizontal" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} disabled={!onPress}>
        <Text style={styles.content}>{post.content}</Text>
        
        {post.image ? (
          <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
        ) : null}
      </TouchableOpacity>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={onLikePress}>
          <MaterialDesignIcons name="heart-outline" size={22} color={COLORS.text} />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionBtn} onPress={onCommentPress}>
          <MaterialDesignIcons name="message-outline" size={21} color={COLORS.text} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareBtn} onPress={onSharePress}>
          <MaterialDesignIcons name="share-variant-outline" size={21} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border + '30',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  timeAgo: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 1,
  },
  content: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: SPACING.md,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.xl,
    paddingVertical: 4,
  },
  shareBtn: {
    marginLeft: 'auto',
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 6,
  },
});
