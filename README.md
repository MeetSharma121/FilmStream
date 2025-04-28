# FilmStream 🎥

<p align="center">
  <img src="https://via.placeholder.com/150?text=FilmStream" alt="FilmStream Logo" width="150" height="150"/>
</p>

<p align="center">
  <a href="https://flutter.dev"><img src="https://img.shields.io/badge/Flutter-3.10.0-blue.svg" alt="Flutter Version"></a>
  <a href="https://dart.dev"><img src="https://img.shields.io/badge/Dart-3.0.0-blue.svg" alt="Dart Version"></a>
  <a href="https://github.com/MeetSharma121/FilmStream"><img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-green.svg" alt="Supported Platforms"></a>
  <a href="https://github.com/MeetSharma121/FilmStream/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License"></a>
</p>

## 📱 About

FilmStream is a feature-rich Flutter application designed to provide users with a seamless streaming experience for movies and TV shows. With an intuitive interface, personalized recommendations, and offline viewing capabilities, FilmStream brings entertainment to your fingertips.

## ✨ Features

- **Extensive Content Library**: Access thousands of movies and TV shows from various genres and time periods
- **Personalized Experience**: User profiles with customized recommendations based on viewing history
- **Smart Search**: Advanced search functionality with filters for genre, year, rating, and more
- **Content Management**: Create and manage watchlists and mark favorites for quick access
- **Offline Viewing**: Download content for offline viewing when internet access is limited
- **User Ratings**: Rate and review content and view community ratings
- **High-Quality Streaming**: Adaptive streaming quality based on network conditions
- **Multi-device Sync**: Seamlessly switch between devices with synchronized viewing history
- **Cross-platform**: Available on both iOS and Android devices

## 📸 Screenshots

<p align="center">
  <img src="https://via.placeholder.com/200x400?text=Home+Screen" alt="Home Screen" width="200"/>
  <img src="https://via.placeholder.com/200x400?text=Movie+Details" alt="Movie Details" width="200"/>
  <img src="https://via.placeholder.com/200x400?text=User+Profile" alt="User Profile" width="200"/>
  <img src="https://via.placeholder.com/200x400?text=Search" alt="Search" width="200"/>
</p>

## 🛠️ Technologies Used

- **Flutter**: UI framework for building natively compiled applications
- **Dart**: Programming language optimized for building mobile, desktop, server, and web applications
- **Provider**: State management solution
- **Dio**: HTTP client for API communication
- **Hive**: Lightweight and blazing fast key-value database
- **ExoPlayer/AVPlayer**: Media players for Android and iOS
- **Firebase**: Backend services including authentication and analytics

## 🚀 Getting Started

### Prerequisites

- Flutter SDK (version 3.0.0 or higher)
- Dart SDK (version 3.0.0 or higher)
- Android Studio / Xcode
- A physical device or emulator/simulator

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/MeetSharma121/FilmStream.git
cd FilmStream
```

2. **Install dependencies**

```bash
flutter pub get
```

3. **Configure environment variables**

Create a `.env` file in the root directory and add your API keys:

```
API_BASE_URL=your_api_base_url
API_KEY=your_api_key
```

4. **Run the app**

```bash
flutter run
```

## 📱 Usage

### User Registration and Login

New users can create an account using email, phone number, or social media accounts. Existing users can log in using their credentials.

### Browsing Content

The home screen displays trending, recommended, and new releases. Users can browse content by categories, genres, or use the search function to find specific titles.

### Watching Content

Tap on a movie or TV show to view details, including synopsis, cast, ratings, and similar recommendations. Press the play button to start streaming.

### Managing Watchlist

Add content to your watchlist by tapping the "+" button on the content details page. Access your watchlist from the profile section.

### Downloading for Offline Viewing

On the content details page, tap the download icon to save the content for offline viewing. Access downloaded content from the "Downloads" section.

## 🧪 Running Tests

```bash
# Run unit tests
flutter test

# Run integration tests
flutter test integration_test
```

## 📊 Project Structure

```
lib/
├── api/              # API services and endpoints
├── constants/        # App constants and configuration
├── models/           # Data models
├── providers/        # State management
├── screens/          # UI screens
├── utils/            # Utility functions
├── widgets/          # Reusable widgets
└── main.dart         # App entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Meet Sharma - [@MeetSharma121](https://github.com/MeetSharma121)

Project Link: [https://github.com/MeetSharma121/FilmStream](https://github.com/MeetSharma121/FilmStream)

## 🙏 Acknowledgements

- [Flutter](https://flutter.dev)
- [The Movie Database (TMDb)](https://www.themoviedb.org) (if used for movie data)
- [Firebase](https://firebase.google.com)
- [All Contributors](../../contributors)
