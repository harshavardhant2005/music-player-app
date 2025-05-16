# Music Player Web App

A web application built with **React.js** and **Tailwind CSS** that allows users to upload, manage, and stream music tracks. It leverages **Firebase** for secure data storage and authentication, and **Cloudinary** for media file uploads and URL conversion.


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
```

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
Perfect! I’ve now updated the **Cloudinary Configuration** section in your README to also **mention exactly where** to paste your Cloudinary `cloud name` and `upload preset` in the codebase (like `CreateAlbum.jsx`, `AddProfile.jsx`, etc.).

4. Cloudinary Configuration

Cloudinary is used to upload media files and convert them into accessible URLs, which are then stored in Firebase.

#### Steps to Find Your `cloud name` and `upload preset`

1. Go to [https://cloudinary.com/](https://cloudinary.com/) and log in.
2. On your **Dashboard**, locate your **Cloud Name** under “Account Details”.
3. Navigate to **Settings → Upload**.
4. Scroll down to **Upload Presets**:

   * Click **"Add upload preset"** or use the default one.
   * Enable **unsigned uploads** if you are not using API keys in the frontend.
   * Set options like allowed formats, folder name, etc.
   * Save and **copy the Upload Preset Name**.

#### Where to Paste in Your Code

Paste your Cloudinary credentials in the components where uploads happen:

```js
// Inside src/AdminComponents/CreateAlbum.jsx
AlbumPosterFormData.append("upload_preset", "your preset name");
// Similarly, inside src/userComponents/AddProfile.jsx
AlbumPosterFormData.append("upload_preset", "your preset name");
```

These variables are usually used with `FormData` to send files to:

```
https://api.cloudinary.com/v1_1/<cloud_name>/upload
```

Make sure to replace `<cloud_name>` and preset wherever applicable in the upload code.


5. Run the app

```bash
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Snapshot of project
**Home page**

![Screenshot 2025-05-16 210319](https://github.com/user-attachments/assets/1377df93-f24a-42d5-be33-d16ef94c9d6e)

**User Profile page**

![Screenshot 2025-05-16 210337](https://github.com/user-attachments/assets/8a048b63-8812-4288-b328-104e9ebbcf46)

**Admin page**

![Screenshot 2025-05-16 210404](https://github.com/user-attachments/assets/6d0cef90-5b57-4c51-92bc-06a91cb64255)


## Usage

* Upload music files through the **Create Album** section — files are uploaded to Cloudinary and their URLs stored in Firebase.
* Update your profile with images or audio in the **Update Profile** section using Cloudinary uploads.
* Browse and play music tracks using the built-in player interface.

## Folder Structure
```
src/
│
├── AdminComponents/        # Components for admin dashboard and album creation
│   ├── AdminDashboard.jsx
│   ├── AdminMainContainer.jsx
│   ├── AdminSideBar.jsx
│   ├── AllAlbums.jsx
│   └── CreateAlbum.jsx
│
├── backend/                # Firebase configuration
│   └── firebase.js
│
├── Components/
│   ├── AlbumComponents/    # Album-related UI components
│   │   ├── AlbumDetails.jsx
│   │   ├── AlbumSidebar.jsx
│   │   ├── TopAlbums.jsx
│   │   └── TrendingSongs.jsx
│   │
│   ├── Auth/               # Authentication components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ResetPassword.jsx
│   │
│   └── NavbarComponents/   # Navigation bar UI
│       ├── Logo.jsx
│       ├── Menu.jsx
│       └── NavbarContainer.jsx
│
├── userComponents/         # User account management
│   ├── AddProfile.jsx
│   ├── DeleteAccount.jsx
│   ├── MyAccount.jsx
│   └── UpdatePassword.jsx
│
├── App.js                  # Main app logic and routing
└── index.js                # React app entry point

```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements and fixes.
