# Spotify Top Items Tracker

A web-based application that integrates Spotify's API with Last.fm to display personalized insights into your top artists and tracks. This project showcases the seamless integration of third-party APIs, advanced DOM manipulation, and real-time data rendering.

## 🚀 Project Overview

The **Spotify Top Items Tracker** allows users to:

- Log in with their Spotify account.
- View their top artists and tracks over a specified time range.
- Access additional insights about tracks and artists using Last.fm data, such as play counts and listening duration.
- Enjoy a dynamic and interactive user experience with features like in-view audio previews.

## 🛠️ Technologies Used

This project leverages the following technologies:

- **Frontend**:
  - HTML5, CSS3, JavaScript (ES6+)
  - Modular JavaScript for organized and scalable code
  - Responsive design principles for optimal user experience
- **APIs**:
  - Spotify Web API: User authentication and top item data
  - Last.fm API: Enhanced metadata, including play counts and genres
- **Tools & Libraries**:
  - Fetch API for network requests
  - Intersection Observer API for lazy-loading and dynamic audio playback

## 🧠 Key Skills Demonstrated

This project demonstrates expertise in:

1. **API Integration**:
   - Securely handling OAuth 2.0 authentication with Spotify.
   - Fetching and processing user-specific data from multiple APIs.

2. **Frontend Development**:
   - Crafting modular and reusable JavaScript components.
   - Employing templates for dynamic and consistent DOM manipulation.
   - Implementing responsive and interactive elements, like audio previews.

3. **Problem-Solving**:
   - Tackling real-world challenges, such as handling API errors gracefully and combining data from diverse sources.

4. **Performance Optimization**:
   - Utilizing Intersection Observer for efficient resource loading.
   - Optimizing user experience through minimal API calls and efficient DOM updates.

## 📖 Setup Instructions

Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/spotify-top-items.git
   cd spotify-top-items
   ```

2. **Set Up Environment Variables**:
   Create a `config.js` file in the appropriate directories and add your API keys and configuration:
   ```javascript
   // ./config.js
   export const SPOTIFY = {
       CLIENT_ID: "your_spotify_client_id",
       REDIRECT_URI: "your_redirect_uri",
       SCOPES: "user-top-read",
   };

   export const LASTFM = {
       API_KEY: "your_lastfm_api_key",
       USERNAME: "your_lastfm_username",
   };
   ```

3. **Start a Local Server**:
   Serve the project files using a local server. For example:
   ```bash
   npx http-server
   ```

4. **Run the Application**:
   Open the served files in a browser and log in with Spotify credentials.

## 🌟 Future Enhancements

Potential improvements to enhance functionality and user experience:

1. **User Preferences**:
   - Allow users to filter data by custom time ranges (short, medium, or long term).

2. **Expanded Insights**:
   - Include track and artist statistics from additional platforms like Apple Music.

3. **UI Enhancements**:
   - Add themes and customization options.
   - Improve mobile responsiveness and accessibility.

4. **Progressive Web App (PWA)**:
   - Enable offline support and add-to-home functionality.
