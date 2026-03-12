import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../theme/theme';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

const FAQ_ITEMS = [
  { q: 'How do I book an appointment?', a: 'Go to the Veterinary tab, select a clinic or doctor, and tap "Book Appointment". Choose a suitable time slot and confirm.' },
  { q: 'Can I add multiple pets?', a: 'Yes! Navigate to the Pets tab and tap the "+" icon at the top right to add as many pets as you have.' },
  { q: 'How does the SOS feature work?', a: 'The SOS button on the Emergency screen quickly displays a list of open nearby 24/7 clinics and allows you to quickly dial animal poison control or local authorities.' },
  { q: 'How are rescue shelters verified?', a: 'We work directly with registered 501(c)(3) animal rescues and municipal shelters to verify their status before listing them on our platform.' },
];

export const HelpSupportScreen = ({ navigation }: any) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScreenContainer>
      <Header title="Help & Support" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.contactSupport}>
          <Text style={styles.sectionTitle}>Need Immediate Help?</Text>
          <Text style={styles.supportText}>Our team is available 24/7 to assist you with any concerns.</Text>
          <View style={styles.supportActions}>
            <TouchableOpacity 
              style={styles.supportBtn} 
              onPress={() => navigation.navigate('PetAIChat')}
            >
              <MaterialDesignIcons name="robot" size={24} color={COLORS.primary} />
              <Text style={styles.supportBtnText}>AI Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.supportBtn}
              onPress={() => {}} 
            >
              <MaterialDesignIcons name="email" size={24} color={COLORS.primary} />
              <Text style={styles.supportBtnText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        <Input 
          placeholder="Search FAQs..." 
          value={query} 
          onChangeText={setQuery} 
          leftIcon="magnify"
        />

        <View style={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity style={styles.faqHeader} onPress={() => toggleFAQ(index)}>
                <Text style={styles.faqQ}>{item.q}</Text>
                <MaterialDesignIcons name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.textLight} />
              </TouchableOpacity>
              {expandedIndex === index && (
                <View style={styles.faqBody}>
                  <Text style={styles.faqA}>{item.a}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackTitle}>Still need help?</Text>
          <Button title="Contact Support Team" onPress={() => {}} style={{ width: '100%' }} />
        </View>

      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  contactSupport: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  supportText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.lg,
  },
  supportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary + '15',
    borderRadius: RADIUS.md,
    marginHorizontal: SPACING.xs,
  },
  supportBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  faqList: {
    marginTop: SPACING.md,
  },
  faqItem: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  faqQ: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  faqBody: {
    padding: SPACING.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  faqA: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
    marginTop: SPACING.md,
  },
  feedbackSection: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    padding: SPACING.lg,
    backgroundColor: COLORS.primary + '10',
    borderRadius: RADIUS.lg,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
});
