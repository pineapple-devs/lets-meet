import PushNotification from 'react-native-push-notification'
import notificationActions from '../Redux/NotificationRedux'
import store from '../Redux'

// https://github.com/zo0r/react-native-push-notification
PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: ({token, os}) => {
    if (__DEV__) console.log('TOKEN:', token)

    const userId = store.getState().login.userId
    console.log(userId)
    store.dispatch(notificationActions.notificationSignup(token, os, userId))
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: (notification) => {
    if (__DEV__) console.log('NOTIFICATION:', notification)

    const userId = store.getState().login.userId
    if (userId === notification.user_id) {
      PushNotification.localNotification({
        title: notification.title,
        message: notification.body
      })
    }
  },

  // ANDROID ONLY: (optional) GCM Sender ID.
  // senderID: setting it inside LoginSaga

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  // Leave this off unless you have good reason.
  popInitialNotification: false,

  /**
    * IOS ONLY: (optional) default: true
    * - Specified if permissions will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    * This example app shows how to best call requestPermissions() later.
    */
  requestPermissions: false
})
