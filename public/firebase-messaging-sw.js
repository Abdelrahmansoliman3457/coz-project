// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyA3oiQ4-Bu1v2jR663DM-AMNEMWrDK0xx4",
    authDomain: "calla-ea319.firebaseapp.com",
    projectId: "calla-ea319",
    storageBucket: "calla-ea319.appspot.com",
    messagingSenderId: "698865801900",
    appId: "1:698865801900:web:c96a946d1a8a96d9179d09",
    measurementId: "G-ZPDXNRJ5S9"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        // icon: "~/assets/images/BellBing.svg",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
