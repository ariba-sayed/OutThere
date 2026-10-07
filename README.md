# 🌿 OutThere

**OutThere** is a minimalist web application designed to encourage people to disconnect from their screens and reconnect with the physical world. It uses real-time weather data and AI-powered recommendations to give users a reason to "touch grass."

## ✨ Features

- **Dynamic Home Experience**: A personalized greeting and "OutThere Moment" card that changes based on the time of day (Sunrise, Morning, Afternoon, Sunset, Evening, Stargazing).
- **Real-time Weather Integration**: Fetches current temperature, wind speed, and celestial events (sunrise/sunset) via the Open-Meteo API.
- **AI-Powered Explore**: Uses Gemma AI to suggest the best nearby places to visit based on current weather conditions.
- **Event Discovery**: Integrates with Google Search (via SerpApi) to find real-world events happening today, tomorrow, and over the weekend.
- **Outdoor Missions**: A "Mission Builder" that generates a custom outdoor adventure based on the user's available time and desired mood.
- **Direct Navigation**: One-click "Get Directions" buttons that open the location directly in Google Maps.

## 🚀 Tech Stack

- **Frontend**: React, Lucide-React (Icons), CSS3 (Custom Variables & Grid/Flexbox).
- **Backend**: Python, Flask.
- **APIs**: 
  - Open-Meteo (Weather)
  - SerpApi (Google Events)
  - Gemma AI (Recommendations & Missions)

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd OutThere
```

### 2. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
SERPAPI_KEY=your_serpapi_key_here
```

### 4. Run the Application
**Start the Backend:**
```bash
python3 app.py
```

**Start the Frontend:**
```bash
cd ../frontend
npm install
npm run dev
```

## 📱 Usage
1. Open the app in your browser.
2. **Allow Location Access** when prompted so the app can find events and weather near you.
3. Navigate through **Home**, **Explore**, **Events**, and **Missions** to find your next outdoor activity.

## 🌿 Philosophy
The goal of OutThere is simple: **The best part of the app is when you close it.**
