import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { StyleSheet } from 'react-native-unistyles';
import { useMMKVString } from 'react-native-mmkv';
import { storage, StorageKeys } from '../services/storage.service';

const ActiveStudentsCard = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [backendURL] = useMMKVString(StorageKeys.BACKEND_URL, storage);

  const fetchActiveStudents = async () => {
      const res = await axios.get(`${backendURL}/api/student/active-students`);
      setCount(res.data.activeStudents ?? 0);
  };

  useEffect(() => {
    setLoading(true);
    fetchActiveStudents().then(() => {
      setLoading(false);
    });

    const interval = setInterval(fetchActiveStudents, 10_000); // refresh every 10s
    return () => clearInterval(interval);
    //@ts-ignore
  }, []);

  return (
    <View style={styles.card}>
      {loading && count === null ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <>
          <Text style={styles.title}>Active Students</Text>
          <Text style={styles.count}>{count}</Text>
        </>
      )}
    </View>
  );
};

export default ActiveStudentsCard;

const styles = StyleSheet.create(theme => ({
  card: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.subtleText,
    marginBottom: theme.spacing.sm,
  },
  count: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
}));
