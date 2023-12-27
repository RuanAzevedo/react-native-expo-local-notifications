import { Button, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { useEffect } from 'react';

import * as Notifications from 'expo-notifications';

export default function TabOneScreen() {
  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    }).then((status) => {
      console.log('PERMISSIONS:', JSON.stringify(status, null, 2));
    });
  }, []);

  const scheduleNotification = async () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 5 },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
