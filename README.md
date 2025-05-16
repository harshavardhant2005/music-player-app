# Music Player Web App

A web application built with **React.js** and **Tailwind CSS** that allows users to upload, manage, and stream music tracks. It leverages **Firebase** for secure data storage and authentication, and **Cloudinary** for media file uploads and URL conversion.

---

## Features

- Upload music files and convert them to accessible URLs via Cloudinary  
- Create and manage music albums  
- Update user profiles with media uploads  
- Stream and control playback of music tracks  
- Data and metadata securely stored with Firebase  

## Tech Stack

- **React.js** — Frontend framework  
- **Tailwind CSS** — Styling  
- **Firebase** — Backend (authentication, database, storage)  
- **Cloudinary** — Media file hosting and transformation  

## Getting Started

### Prerequisites

- Node.js and npm installed  
- Firebase project with Firestore or Realtime Database enabled  
- Cloudinary account for media uploads  

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/music-player-webapp.git
cd music-player-webapp

2. Install dependencies

```bash
npm install
```

3. Configure Firebase

Create or update `src/backend.js` with your Firebase credentials:

```js
// src/backend.js

export const firebaseConfig = {
  apiKey: "your_firebase_api_key",
  authDomain: "your_firebase_auth_domain",
  projectId: "your_firebase_project_id",
  storageBucket: "your_firebase_storage_bucket",
  messagingSenderId: "your_firebase_messaging_sender_id",
  appId: "your_firebase_app_id",
};
```

4. Cloudinary Configuration

Cloudinary is integrated directly within the **Create Album** and **Update Profile** components for media uploads and URL conversion. Update your Cloudinary credentials (cloud name, upload preset) inside these components as needed.

5. Run the app

```bash
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Usage

* Upload music files through the **Create Album** section — files are uploaded to Cloudinary and their URLs stored in Firebase.
* Update your profile with images or audio in the **Update Profile** section using Cloudinary uploads.
* Browse and play music tracks using the built-in player interface.

## Folder Structure

```
/src
  /components         # React components (Player, TrackList, CreateAlbum, UpdateProfile, etc.)
  /firebase           # Firebase config and utilities (backend.js)
  /styles             # Tailwind CSS custom styles
  App.js              # Main app component
  index.js            # React entry point
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements and fixes.

## License

This project is licensed under the MIT License.

---

Thank you for checking out this project! Feel free to reach out with any questions or suggestions.

