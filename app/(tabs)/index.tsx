import { Button, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { useEffect, useRef } from 'react';

import * as Notifications from 'expo-notifications';

export default function TabOneScreen() {
  const notififReceivedListener = useRef<Notifications.Subscription>();
  const notifResponseListener = useRef<Notifications.Subscription>();

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

    /**
     * This listener is fired whenever a notification is received while the app is foregrounded
     */
    notififReceivedListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        console.log(
          'NOTIFICATION RECEIVED:',
          JSON.stringify(notification, null, 2)
        );

        const count = await Notifications.getBadgeCountAsync();
        console.log('COUNT:', count);
        Notifications.setBadgeCountAsync(count + 1);
      });

    /**
     * This listener is fired whenever a user taps on or interacts with a notification
     * (works when app is foregrounded, backgrounded, or killed)
     */
    notifResponseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          'NOTIFICATION RESPONSE:',
          JSON.stringify(response, null, 2)
        );
        alert(response.notification.request.content.data.data);
        Notifications.dismissAllNotificationsAsync();
        Notifications.setBadgeCountAsync(0);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notififReceivedListener.current!
      );
      Notifications.removeNotificationSubscription(
        notifResponseListener.current!
      );
    };
  }, []);

  const scheduleNotification = async () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'notification data' },
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
