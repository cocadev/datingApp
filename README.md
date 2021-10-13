# React Native Dating App Features 3
## Our fully-coded app is highly customizable being built with ready-to-use screens, with easily configurable application design and optimized for user growth.

* Dynamic Matching Algorithm
* Dynamic Recommendations
* Tinder-like Swipe, for Like, Super like and Dislike
* Gorgeous Matching UI
* Dating preferences, such as gender, location, and age preference
* Location Filter / Geofencing
* Real-time Chat
  ** Photo Messaging
  ** Video Messaging
  ** Audio Messages
  ** Text Messaging & Emojis
  ** Push Notifications
  ** Clickable URLs
  ** Photo Gallery
  ** Online Indicators
  ** In-Reply To functionality
* In-App Purchases / Monetization
* Limited number of daily swipes for free accounts
* Upgrade to VIP + In-App Payment flow
* Recurring Subscriptions
* VIP Features
* Undo Swipe
* Unlimited Swipes
* Cancel subscription
* User Blocking and Reporting (per Apple’s guidelines)
* Push Notifications for Messages and Matches
* Localization (Multi-language translations) & RTL
* Dark Mode support
* Stunning Dating Profile Screen
* Photo Library
* Photo Gallery Carousel
* Bio, Distance, and School attributes
* Account Details (Edit Profile)
* Photo uploads from Camera & Library
* Photo removal
* Profile Photo editing
* Settings screen
* Contact us
* Photo Upload (with Firebase Storage)
* Phone Authentication with SMS confirmation
* Facebook Login
* E-mail & Password Login
* New User Onboarding with Walkthrough flow
* Save Password functionality
* User Management with Firebase Auth
* Full Backend Integration with Firebase Auth, Firestore and Storage

<a href="https://www.instamobile.io/app-templates/react-native-dating-app/">Go</a>

# Instadating
React Native

## Enable Push Notification

To enable push notification, you need to deploy the firebase functions.

## Steps to deploying the firebase functions

* At the root of InstadatingApp, change directory to firebaseFunctions:

```bash
$ cd firebaseFunctions
```

* First, we need to make sure that the Firebase Command Line Client is installed. Execute the following command to install the firebase-tools package:

```bash
$ npm install -g firebase-tools
```

* login to Firebase by using the following command:

```bash
$ firebase login
```

* The browser should open up and load a URL that was displayed in the console. At the same time the login is recognized by the Firebase CLI in the console.

* next, execute the command bellow to choose your firebase project:

```bash
$ firebase use --add
```

* when prompted for alias name, you can  enter: default

* deploy the Firebase function by using the following command:

```bash
$ firebase deploy
```


After this, you should have firebaseFunctions deployed on your firebase console and Push Notification working.
