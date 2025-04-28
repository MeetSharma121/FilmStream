import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Switch, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '@/config/theme';
import { Settings, ChevronRight, Sun, Moon, Globe, Bell, User, Shield, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  // For demo purposes, we're not implementing actual settings functionality
  
  const renderSetting = (icon: React.ReactNode, title: string, description?: string, isToggle = false) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      {isToggle ? (
        <Switch
          value={false}
          onValueChange={() => {}}
          trackColor={{ false: COLORS.neutral[300], true: COLORS.primary[500] }}
          thumbColor={COLORS.white}
        />
      ) : (
        <ChevronRight size={20} color={COLORS.neutral[400]} />
      )}
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Settings size={24} color={COLORS.primary[500]} />
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          {renderSetting(<Sun size={22} color={COLORS.accent[500]} />, 'Light Theme', 'Switch to light theme', true)}
          {renderSetting(<Moon size={22} color={COLORS.primary[700]} />, 'Dark Theme', 'Switch to dark theme', true)}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderSetting(<Globe size={22} color={COLORS.secondary[500]} />, 'Language', 'English (US)')}
          {renderSetting(<Bell size={22} color={COLORS.error[500]} />, 'Notifications', 'Manage notification settings')}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {renderSetting(<User size={22} color={COLORS.primary[500]} />, 'Profile', 'Edit your profile')}
          {renderSetting(<Shield size={22} color={COLORS.success[500]} />, 'Privacy', 'Manage privacy settings')}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          {renderSetting(<Info size={22} color={COLORS.neutral[700]} />, 'Version', '1.0.0')}
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral[900],
    marginLeft: SPACING.sm,
  },
  content: {
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'Inter-Medium',
    color: COLORS.neutral[700],
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral[900],
  },
  settingDescription: {
    fontSize: FONT_SIZE.sm,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral[500],
    marginTop: 2,
  },
  button: {
    margin: SPACING.md,
    backgroundColor: COLORS.error[500],
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'Inter-Bold',
    color: COLORS.white,
  },
});