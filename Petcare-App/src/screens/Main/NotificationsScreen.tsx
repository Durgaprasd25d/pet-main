import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import { useNotificationStore } from '../../store/useNotificationStore';
import { useAppStore } from '../../store/useAppStore';

export const NotificationsScreen = ({ navigation }: any) => {
  const { token } = useAppStore();
  const { notifications, fetchNotifications, markAsRead, loading } = useNotificationStore();

  React.useEffect(() => {
    if (token) fetchNotifications(token);
  }, [token]);

  const handleNotificationPress = (notif: any) => {
    if (token) markAsRead(notif.id, token);
    if (notif.post) {
      navigation.navigate('PostDetails', { postId: notif.post.id });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return 'heart';
      case 'comment': return 'comment';
      case 'adoption': return 'paw';
      case 'alert': return 'alert-circle';
      default: return 'bell';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'like': return COLORS.accent;
      case 'comment': return COLORS.primary;
      case 'adoption': return COLORS.success;
      case 'alert': return COLORS.error;
      default: return COLORS.textLight;
    }
  };

  return (
    <ScreenContainer>
      <Header title="Notifications" onBackPress={() => navigation.goBack()} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={() => token && fetchNotifications(token)} 
          />
        }
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialDesignIcons name="bell-off-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        ) : (
          notifications.map((notif) => (
            <TouchableOpacity 
              key={notif.id} 
              style={[
                styles.notificationCard,
                !notif.isRead && styles.unreadCard
              ]}
              onPress={() => handleNotificationPress(notif)}
            >
              <View style={[styles.iconContainer, { backgroundColor: getColor(notif.type) + '20' }]}>
                <MaterialDesignIcons name={getIcon(notif.type) as any} size={24} color={getColor(notif.type)} />
              </View>
              <View style={styles.textContainer}>
                <View style={styles.headerRow}>
                  <Text style={[styles.title, !notif.isRead && styles.unreadTitle]}>
                    {notif.sender?.name || 'System'}
                  </Text>
                  <Text style={styles.time}>{new Date(notif.createdAt).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.message}>{notif.content}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  time: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  message: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  unreadTitle: {
    color: COLORS.primary,
  },
  emptyState: {
    flex: 1,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: SPACING.md,
    fontSize: 16,
    color: COLORS.textLight,
  },
});
