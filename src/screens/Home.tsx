import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { storage, StorageKeys } from '../services/storage.service';
import QRCode from 'react-native-qrcode-skia';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Student {
  full_name: string;
  program_name: string;
  institute_email_id: string;
  phone_number: string;
  roll_no: string;
  hostel: string;
}

const intialStudent: Student = {
  full_name: '',
  roll_no: '',
  phone_number: '',
  program_name: '',
  hostel: '',
  institute_email_id: 'deepanshusaini502@gmail.com',
};

const DetailRow = ({ label, value }: any) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);
const Home = () => {
  
  const [user, setUser] = React.useState<Student>(intialStudent);
  const { theme } = useUnistyles();

  const qrData = useMemo(() => {
    const { full_name, program_name, roll_no } = user;
    return JSON.stringify({ full_name, program_name, roll_no });
  }, [user]);

  useEffect(() => {
    const userJson = storage.getString(StorageKeys.USER);
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <StatusBar />
        {/* --- Header --- */}

        <View style={styles.header}>
          <Image
            source={require('../assets/img/manit_logo.png')}
            style={styles.profileImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeMessage}>Welcome back,</Text>
            <Text style={styles.studentNameHeader}>{user.full_name}</Text>
          </View>
        </View>

        {/* --- QR Code Card --- */}
        <View style={styles.qrCard}>
          {qrData ? (
            <QRCode
              color={theme.colors.qr}
              style={styles.qrCodePlaceholder}
              value={qrData}
              size={300}
              shapeOptions={{shape:'square',eyePatternShape:'rounded'}}
            />
          ) : (
            <Text style={styles.qrCodeText}>Login Again</Text>
          )}

          <View style={styles.cardInfo}>
            <Text style={styles.studentNameCard}>{user.full_name}</Text>
            <Text style={styles.studentIdCard}>ID: {user.roll_no}</Text>
          </View>
        </View>

        {/* --- Student Details --- */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Your Information</Text>
          <DetailRow label="Program" value={user.program_name} />
          <DetailRow label="Hostel" value={user.hostel} />
          <DetailRow label="Email" value={user.institute_email_id} />
          <DetailRow label="Phone" value={user.phone_number} />
        </View>

        {/* --- Sign Out Button --- */}
        <Pressable
          style={styles.signOutButton}
          onPress={() => {
            storage.clearAll();
          }}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create(theme => ({
  // Main container
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  // Header section
  header: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeMessage: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.subtleText,
  },
  studentNameHeader: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  // QR Code Card
  qrCard: {
    margin: theme.spacing.lg,
    marginTop: -theme.spacing.md, // Pull the card up to overlap the header slightly
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: theme.spacing.lg,
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  qrCodePlaceholder: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    // color:theme.colors.qr
  },
  qrCodeText: {
    color: theme.colors.subtleText,
    fontWeight: 'medium',
  },
  cardInfo: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  studentNameCard: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  studentIdCard: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.subtleText,
    marginTop: theme.spacing.xs,
  },
  // Student Details Section
  detailsContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  detailsTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  detailLabel: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.subtleText,
    fontWeight: 'medium',
  },
  detailValue: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text,
    fontWeight: 'semibold',
    textAlign: 'right',
    flexShrink: 1, // Allow text to wrap if it's too long
  },
  // Sign Out Button
  signOutButton: {
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  signOutText: {
    color: theme.colors.error,
    textAlign: 'center',
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
  },
}));
