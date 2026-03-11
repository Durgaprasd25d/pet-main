import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../../theme/theme';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dates = ['14', '15', '16', '17', '18', '19'];
const mockSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:30 PM', '04:00 PM'];

export const SelectAppointmentTimeScreen = ({ route, navigation }: any) => {
  const { vetId, petId, reason } = route.params;
  const [selectedDate, setSelectedDate] = useState('15');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedSlot) {
      navigation.navigate('AppointmentConfirmation', {
        vetId,
        petId,
        reason,
        date: `2026-03-${selectedDate}`,
        time: selectedSlot
      });
    }
  };

  return (
    <ScreenContainer>
      <Header title="Select Time" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressLine, styles.progressLineActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
        </View>
        <Text style={styles.stepText}>Step 2: Time</Text>

        <View style={styles.calendarHeader}>
          <Text style={styles.monthText}>March 2026</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {dates.map((date, index) => (
            <TouchableOpacity 
              key={date}
              style={[styles.dateCard, selectedDate === date && styles.dateCardActive]}
              onPress={() => {
                setSelectedDate(date);
                setSelectedSlot(null); // Reset slot on date change
              }}
            >
              <Text style={[styles.dayText, selectedDate === date && styles.textActive]}>{days[index]}</Text>
              <Text style={[styles.dateNum, selectedDate === date && styles.textActive]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.slotsGrid}>
          {mockSlots.map(slot => (
            <TouchableOpacity 
              key={slot}
              style={[styles.slotCard, selectedSlot === slot && styles.slotCardActive]}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text style={[styles.slotText, selectedSlot === slot && styles.textActive]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Continue" 
          onPress={handleNext} 
          disabled={!selectedSlot}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  progressLine: {
    height: 2,
    width: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  progressLineActive: {
    backgroundColor: COLORS.primary,
  },
  stepText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: SPACING.xl,
  },
  calendarHeader: {
    marginBottom: SPACING.md,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dateScroll: {
    marginBottom: SPACING.xl,
  },
  dateCard: {
    width: 65,
    height: 80,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  dateNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  textActive: {
    color: COLORS.surface,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotCard: {
    width: '30%',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  slotCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  slotText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
