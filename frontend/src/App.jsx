const API_URL = "http://127.0.0.1:5000";

const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        try {
          const response = await fetch(`${API_URL}/api/location/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(location),
          });

          const data = await response.json();

          console.log("Location response:", data);

          resolve(location);
        } catch (error) {
          console.error("Could not send location to backend:", error);
          reject(error);
        }
      },
      (error) => {
        console.error("Location error:", error);
        reject(error);
      }
    );
  });
};

import React from "react";

import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  Clock3,
  Compass,
  Crosshair,
  Filter,
  Footprints,
  Leaf,
  MapPin,
  Moon,
  Navigation,
  Search,
  Sparkles,
  Sun,
  Ticket,
  Users,
  Wind,
  CloudRain,
  Heart,
  SlidersHorizontal
} from "lucide-react";


const events = [
  {
    title: "Photography Walk",
    category: "Outdoor Activity",
    time: "5:00 PM",
    date: "Today",
    distance: "2.1 km",
    price: "Free",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    ai: true
  },
  {
    title: "Weekend Bird Walk",
    category: "Nature",
    time: "6:30 AM",
    date: "Tomorrow",
    distance: "3.8 km",
    price: "₹200",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80",
    ai: true
  },
  {
    title: "The Sunday Flea Market",
    category: "Market",
    time: "10:00 AM",
    date: "Sun, Oct 11",
    distance: "4.8 km",
    price: "Free",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Outdoor Yoga Session",
    category: "Wellness",
    time: "7:00 AM",
    date: "Sat, Oct 10",
    distance: "2.8 km",
    price: "₹300",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Cubbon Park Sketch Club",
    category: "Creative",
    time: "4:30 PM",
    date: "Today",
    distance: "3.2 km",
    price: "Free",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    ai: true
  },
  {
    title: "Sunrise Run Club",
    category: "Fitness",
    time: "6:00 AM",
    date: "Sat, Oct 10",
    distance: "1.9 km",
    price: "Free",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80"
  }
];


const places = [
  {
    title: "Lalbagh Botanical Garden",
    type: "Nature escape",
    distance: "3.4 km",
    cost: "₹30",
    time: "Best after 4:30 PM",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80",
    reason: "Easy green escape with enough time for a slow walk before sunset."
  },
  {
    title: "Ulsoor Lake",
    type: "Sunset + walk",
    distance: "4.1 km",
    cost: "Free",
    time: "Best 5:15–6:30 PM",
    image: "https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=1000&q=80",
    reason: "Tonight's clouds make this a strong sunset candidate."
  },
  {
    title: "Cubbon Park",
    type: "Walk + photography",
    distance: "3.0 km",
    cost: "Free",
    time: "Best before 6:00 PM",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80",
    reason: "Close, free, and good for a 45-minute phone-free reset."
  },
  {
    title: "Turahalli Forest",
    type: "Mini adventure",
    distance: "12.8 km",
    cost: "Free",
    time: "Best before sunset",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    reason: "Worth the extra travel if you want something that feels like an escape."
  }
];


const conditions = [
  { icon: Sun, label: "Sunset", value: "Excellent" },
  { icon: Moon, label: "Stargazing", value: "Good" },
  { icon: Footprints, label: "Running", value: "Excellent" },
  { icon: Camera, label: "Photography", value: "Excellent" },
  { icon: Leaf, label: "Nature walk", value: "Excellent" }
];


function EventCard({ event }) {
  return (
    <article className="event-card">

      <div className="event-image-wrap">

        <img
  src={event.image}
  alt=""
  className="event-image"
  onError={(event) => {
    event.currentTarget.style.display = "none";
  }}
/>

        {event.ai && (
          <span className="ai-badge">
            <Sparkles size={13} />
            AI Pick
          </span>
        )}

      </div>

      <div className="event-content">

        <h3>{event.title}</h3>

        <p className="event-category">
          <Leaf size={14} />
          {event.category}
        </p>

        <div className="event-meta">

          <span>
            <CalendarDays size={14} />
            {event.time}
          </span>

          <span>
            <MapPin size={14} />
            {event.distance}
          </span>

          <span>
            <Ticket size={14} />
            {event.price}
          </span>

          <button
            className="round-arrow"
            aria-label={`Open ${event.title}`}
          >
            <ArrowRight size={15} />
          </button>

        </div>

      </div>

    </article>
  );
}


function PlaceCard({ place }) {
  return (
    <article className="place-card">

      <div className="place-image">

        <img
  src={place.image}
  alt=""
  onError={(event) => {
    event.currentTarget.style.display = "none";
  }}
/>

        <span>{place.type}</span>

      </div>

      <div className="place-body">

        <div className="place-title-row">
  <h3>{place.title}</h3>

  {place.aiRank && (
    <span className="ai-rank">
      <Sparkles size={13} />
      #{place.aiRank} Gemma Pick
    </span>
  )}

  <button className="heart">
    <Heart size={17} />
  </button>
</div>

        <div className="place-meta">

          <span>
            <MapPin size={14} />
            {place.distance}
          </span>

          <span>{place.cost}</span>

        </div>

        <p className="place-time">
          <Clock3 size={14} />
          {place.time}
        </p>

        <div className="ai-reason">
          <Sparkles size={14} />
          <span>
            {place.aiReason || place.reason}
          </span>
        </div>

        <button className="green-button">
          Get directions
          <Navigation size={15} />
        </button>

      </div>

    </article>
  );
}


const outThereImages = {

  sunrise:
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",

  morning:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",

  lateMorning:
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85",

  afternoon:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85",

  sunset:
    "https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=1600&q=85",

  evening:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",

  stargazing:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85"

};


/*
  Convert Open-Meteo local time into minutes after midnight.

  Example:
  "2026-10-06T18:06"
       ↓
  1086 minutes
*/
function getTimeMinutes(time) {

  if (!time || !time.includes("T")) {
    return null;
  }

  const timePart = time.split("T")[1];

  const [hours, minutes] = timePart.split(":");

  return Number(hours) * 60 + Number(minutes);
}


/*
  Convert Open-Meteo local time into:
  6:08 AM
  6:06 PM
*/
function formatSunTime(time) {

  if (!time || !time.includes("T")) {
    return "—";
  }

  const timePart = time.split("T")[1];

  const [hours, minutes] = timePart.split(":");

  const hour = Number(hours);

  const displayHour = hour % 12 || 12;

  const period = hour >= 12
    ? "PM"
    : "AM";

  return `${displayHour}:${minutes} ${period}`;
}


/*
  Get the current OutThere moment.

  IMPORTANT:
  We do NOT use new Date("2026-10-06T18:06")
  for sunrise/sunset.

  Open-Meteo gives us local clock times, so we
  compare the clock values directly.
*/
function getOutThereMoment(weather) {

  if (!weather?.sunrise || !weather?.sunset) {

    return {
      type: "loading",
      label: "CHECKING TODAY'S SKY",
      icon: "☀️",
      time: "—",
      message: "Checking the best time to get outside.",
      image: outThereImages.morning
    };

  }


  const sunriseMinutes =
    getTimeMinutes(weather.sunrise);

  const sunsetMinutes =
    getTimeMinutes(weather.sunset);


  const now = new Date();

  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes();


  /*
    🌅 Before / around sunrise
  */
  if (currentMinutes < sunriseMinutes + 30) {

    return {

      type: "sunrise",

      label: "TODAY'S SUNRISE",

      icon: "🌅",

      time: formatSunTime(weather.sunrise),

      message:
        "The day is waking up. Perfect time for a quiet walk.",

      image:
        outThereImages.sunrise

    };

  }


  /*
    ☀️ Morning
  */
  if (currentMinutes < 10 * 60) {

    return {

      type: "morning",

      label: "GOOD MORNING",

      icon: "☀️",

      time: formatSunTime(weather.sunset),

      message:
        "Good morning. Get outside while it's cool.",

      image:
        outThereImages.morning

    };

  }


  /*
    🌤️ Late morning
  */
  if (currentMinutes < 12 * 60) {

    return {

      type: "lateMorning",

      label: "LATE MORNING",

      icon: "🌤️",

      time: formatSunTime(weather.sunset),

      message:
        "Still a good time to touch grass.",

      image:
        outThereImages.lateMorning

    };

  }


  /*
    🌞 Afternoon

    We start sunset mode 30 minutes
    before actual sunset.
  */
  if (currentMinutes < sunsetMinutes - 30) {

    return {

      type: "afternoon",

      label: "THIS AFTERNOON",

      icon: "🌞",

      time: formatSunTime(weather.sunset),

      message:
        "It’s warm out. Find some shade and get moving.",

      image:
        outThereImages.afternoon

    };

  }


  /*
    🌇 Around sunset
  */
  if (currentMinutes <= sunsetMinutes + 30) {

    return {

      type: "sunset",

      label: "TONIGHT'S SUNSET",

      icon: "🌇",

      time: formatSunTime(weather.sunset),

      message:
        "Golden hour is here. Go catch it.",

      image:
        outThereImages.sunset

    };

  }


  /*
    🌙 Evening
  */
  if (currentMinutes < 22 * 60) {

    return {

      type: "evening",

      label: "THIS EVENING",

      icon: "🌙",

      time: formatSunTime(weather.sunset),

      message:
        "The day’s winding down. How about a short evening walk.",

      image:
        outThereImages.evening

    };

  }


  /*
    🌌 Late night
  */
  return {

    type: "stargazing",

    label: "TONIGHT'S SKY",

    icon: "🌌",

    time: formatSunTime(weather.sunrise),

    message:
      "The city is quiet. Perfect time for a little stargazing.",

    image:
      outThereImages.stargazing

  };

}


/*
  Best sunset window = 30 minutes before sunset
  until sunset.
*/
function getBestSunsetWindow(sunset) {

  if (!sunset || !sunset.includes("T")) {
    return "—";
  }

  const timePart =
    sunset.split("T")[1];

  const [hours, minutes] =
    timePart.split(":");

  const sunsetMinutes =
    Number(hours) * 60 +
    Number(minutes);

  const startMinutes =
    sunsetMinutes - 30;


  const formatMinutes = (totalMinutes) => {

    const normalized =
      (totalMinutes + 1440) % 1440;

    const hour =
      Math.floor(normalized / 60);

    const minute =
      normalized % 60;

    const displayHour =
      hour % 12 || 12;

    const period =
      hour >= 12
        ? "PM"
        : "AM";

    return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;

  };


  return `${formatMinutes(startMinutes)} – ${formatMinutes(sunsetMinutes)}`;

}


function Home({ setActive }) {

  const [weather, setWeather] =
    React.useState(null);

  const [aiRecommendation, setAiRecommendation] =
    React.useState(
      "Finding something worth doing outside..."
    );
  const [nearbyEvents, setNearbyEvents] = React.useState([]);

  React.useEffect(() => {

    const loadWeather = async () => {

      try {

        const location =
          await getUserLocation();
        const eventsResponse = await fetch(
  `${API_URL}/api/events/?latitude=${location.latitude}&longitude=${location.longitude}`
);

if (eventsResponse.ok) {
  const eventsData = await eventsResponse.json();

  console.log("Home events:", eventsData);

  setNearbyEvents(
    (eventsData.events || []).slice(0, 3)
  );
}

        /*
          1. Get weather
        */
        const weatherResponse =
          await fetch(
            `${API_URL}/api/weather/?latitude=${location.latitude}&longitude=${location.longitude}`
          );


        if (!weatherResponse.ok) {

          throw new Error(
            "Failed to fetch weather"
          );

        }


        const weatherData =
          await weatherResponse.json();


        console.log(
          "Home weather:",
          weatherData
        );

        console.log(
          "Home sunrise:",
          weatherData.sunrise
        );

        console.log(
          "Home sunset:",
          weatherData.sunset
        );


        setWeather(weatherData);


        /*
          2. Ask Gemma for a recommendation
        */
        try {

          const recommendationResponse =
            await fetch(
              `${API_URL}/api/recommendations/`,
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json"
                },

                body: JSON.stringify({
                  places: [],
                  weather: weatherData
                })
              }
            );


          if (recommendationResponse.ok) {

            const recommendationData =
              await recommendationResponse.json();


            console.log(
              "Home Gemma recommendation:",
              recommendationData
            );


            const recommendations =
              recommendationData.recommendations || [];


            if (recommendations.length > 0) {

              setAiRecommendation(
                recommendations[0]
              );

            }

          } else {

            console.error(
              "Gemma recommendation failed:",
              recommendationResponse.status
            );

          }

        } catch (recommendationError) {

          console.error(
            "Home recommendation error:",
            recommendationError
          );

        }

      } catch (error) {

        console.error(
          "Failed to fetch home weather:",
          error
        );

      }

    };


    loadWeather();

  }, []);


  const moment =
    getOutThereMoment(weather);


  return (

    <>

      <section className="hero">

        <div className="hero-copy">

          <div className="location-label">

            <MapPin size={19} />

            <span>
              Bengaluru · Today
            </span>

          </div>


          <h1>
            Give yourself a<br />
            reason to go outside.
          </h1>


          <p>
            Here’s what’s happening around you today.
          </p>

        </div>


        <article className="sunset-card">

          <img
            src={moment.image}
            alt=""
          />


          <div className="sunset-overlay" />


          <div className="sunset-main">

            <div className="eyebrow">

              <Sun size={17} />

              {moment.label}

            </div>


            <div className="sunset-time">

              <strong>
                {moment.time.split(" ")[0]}
              </strong>

              <span>
                {moment.time.split(" ")[1] || ""}
              </span>

            </div>


            <p>
              {moment.message}
            </p>

          </div>


          <div className="sunset-stats">

            <div>

              <span>
                {moment.icon} OutThere now
              </span>

              <strong>

                {moment.type === "stargazing"
                  ? "Stargazing"
                  : moment.type === "sunset"
                    ? "Golden hour"
                    : moment.type === "loading"
                      ? "Checking..."
                      : "Good time"}

              </strong>

            </div>


            <div>

              <span>
                🌅 Sunrise
              </span>

              <strong>
                {formatSunTime(weather?.sunrise)}
              </strong>

            </div>


            <div>

              <span>
                🌇 Sunset
              </span>

              <strong>
                {formatSunTime(weather?.sunset)}
              </strong>

            </div>


            <div>

              <span>
                ◷ Best window
              </span>

              <strong>
                {getBestSunsetWindow(weather?.sunset)}
              </strong>

            </div>

          </div>

        </article>

      </section>


      <section className="section">

        <div className="section-heading">

          <h2>
            <Sparkles size={22} />
            Things happening near you
          </h2>


          <button
            className="text-button"
            onClick={() => setActive("Events")}
          >
            See all
            <ArrowRight size={16} />
          </button>

        </div>


        <div className="events-grid">

          {nearbyEvents.length > 0 ? (
  nearbyEvents.map((event, index) => (
    <EventCard
      key={event.id || index}
      event={event}
    />
  ))
) : (
  <p className="empty-state">
    Finding things happening near you...
  </p>
)}

        </div>

      </section>


      <section className="section options-section">

        <div className="section-heading">

          <h2>
            <Leaf size={22} />
            Your outdoor options
          </h2>

        </div>


        <div className="options-grid">

          <OptionCard
            icon={<Compass />}
            image={places[0].image}
            title="GO SOMEWHERE"
            text="3 places worth visiting today"
            button="Explore"
            onClick={() => setActive("Explore")}
          />


          <OptionCard
            icon={<Crosshair />}
            image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
            title="GIVE ME A MISSION"
            text="I have 45 minutes. Make me do something outside."
            button="Surprise me"
            onClick={() => setActive("Missions")}
          />


          <OptionCard
            icon={<Ticket />}
            image="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80"
            title="FIND AN EVENT"
            text="12 things happening around you"
            button="See events"
            onClick={() => setActive("Events")}
          />

        </div>

      </section>


      <section className="bottom-grid">

        <div>

          <div className="section-heading compact">

            <h2>
              <Sun size={22} />
              Good conditions today
            </h2>

          </div>


          <div className="conditions">

            {conditions.map(
              ({ icon: Icon, label, value }) => (

                <div
                  className="condition"
                  key={label}
                >

                  <Icon size={21} />

                  <div>

                    <span>
                      {label}
                    </span>

                    <strong>
                      {value}
                    </strong>

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        <div className="ai-recommendation">

          <div className="ai-title">

            <Sparkles size={18} />

            AI Recommendation

          </div>


          <p>
            {aiRecommendation}
          </p>


          <button
            className="round-arrow"
            onClick={() => setActive("Missions")}
          >
            <ArrowRight size={16} />
          </button>

        </div>

      </section>

    </>

  );

}


function Explore() {

  const [weather, setWeather] =
    React.useState(null);

  const [places, setPlaces] =
    React.useState([]);

  const [loading, setLoading] =
    React.useState(true);

  const [error, setError] =
    React.useState(false);

  const [recommendations, setRecommendations] =
    React.useState([]);


  React.useEffect(() => {

    const loadPlaces = async () => {

      try {

        const location =
          await getUserLocation();


        const response =
          await fetch(
            `${API_URL}/api/explore/?latitude=${location.latitude}&longitude=${location.longitude}`
          );


        if (!response.ok) {

          throw new Error(
            "Failed to fetch places"
          );

        }


        const data =
          await response.json();


        setPlaces(data.places);

        setWeather(data.weather);


        /*
          FIXED:
          weatherData did not exist here.

          We use data.weather because that is
          what the Explore API returned.
        */
        console.log(
          "Explore weather:",
          data.weather
        );

        console.log(
          "SUNRISE:",
          data.weather?.sunrise
        );

        console.log(
          "SUNSET:",
          data.weather?.sunset
        );


        const recommendationResponse =
          await fetch(
            `${API_URL}/api/recommendations/`,
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json"
              },

              body: JSON.stringify({
                places: data.places,
                weather: data.weather
              })
            }
          );


        if (recommendationResponse.ok) {

          const recommendationData =
            await recommendationResponse.json();


          console.log(
            "Gemma recommendations:",
            recommendationData
          );


          setRecommendations(
            recommendationData.recommendations || []
          );

        }


        setLoading(false);

      } catch (error) {

        console.error(
          "Failed to fetch places:",
          error
        );

        setError(true);

        setLoading(false);

      }

    };


    loadPlaces();

  }, []);


  if (loading) {

    return (

      <PageShell
        eyebrow="EXPLORE OUTSIDE"
        title="Find somewhere worth going."
        subtitle="Places nearby, picked for how good they are to be outside today."
      >

        <p>
          Finding places worth going to... 🌱
        </p>

      </PageShell>

    );

  }


  if (error) {

    return (

      <PageShell
        eyebrow="EXPLORE OUTSIDE"
        title="Find somewhere worth going."
        subtitle="Places nearby, picked for how good they are to be outside today."
      >

        <p>
          Couldn't load places. Make sure the TouchGrass backend is running.
        </p>

      </PageShell>

    );

  }


  return (

    <PageShell
      eyebrow="EXPLORE OUTSIDE"
      title="Find somewhere worth going."
      subtitle="Places nearby, picked for how good they are to be outside today."
    >

      {weather && (

        <div className="weather-card">

          <div>

            <div className="weather-label">
              CURRENT WEATHER
            </div>


            <div className="weather-temperature">
              {Math.round(weather.temperature)}°C
            </div>


            <div className="weather-description">
              {weather.weather}
            </div>

          </div>


          <div className="weather-details">

            <div>

              <span>
                Feels like
              </span>

              <strong>
                {Math.round(weather.feels_like)}°C
              </strong>

            </div>


            <div>

              <span>
                Humidity
              </span>

              <strong>
                {weather.humidity}%
              </strong>

            </div>


            <div>

              <span>
                Wind
              </span>

              <strong>
                {weather.wind_speed} km/h
              </strong>

            </div>

          </div>

        </div>

      )}


      <div className="search-row">

        <div className="search-box">

          <Search size={19} />

          <input
            placeholder="Search places, parks, walks..."
          />

        </div>


        <button className="filter-button">

          <SlidersHorizontal size={17} />

          Filters

        </button>

      </div>


      <div className="chip-row">

        <span className="chip active">
          For you
        </span>

        <span className="chip">
          Nature
        </span>

        <span className="chip">
          Walks
        </span>

        <span className="chip">
          Photography
        </span>

        <span className="chip">
          Peaceful
        </span>

        <span className="chip">
          Free
        </span>

      </div>


      <div className="ai-banner">
  <div className="ai-icon"><Sparkles size={18} /></div>

  <div>
    <strong>Gemma's pick for today</strong>

    <p>
      {recommendations.length > 0
        ? `${recommendations[0].place} — ${recommendations[0].reason}`
        : "Finding the best outdoor place near you..."}
    </p>
  </div>

  <span className="score">8.7</span>
</div>

     <div className="places-grid">
  {(() => {
    const recommendedPlaces = recommendations
      .map((recommendation) =>
        places.find(
          (place) =>
            place.title === recommendation.place ||
            place.name === recommendation.place
        )
      )
      .filter(Boolean);

    const recommendedNames = new Set(
      recommendations.map(
        (recommendation) => recommendation.place
      )
    );

    const otherPlaces = places.filter(
      (place) =>
        !recommendedNames.has(place.title) &&
        !recommendedNames.has(place.name)
    );

    const orderedPlaces = [
      ...recommendedPlaces,
      ...otherPlaces,
    ];

    return orderedPlaces.map((place, index) => {
      const recommendation = recommendations.find(
        (item) =>
          item.place === place.title ||
          item.place === place.name
      );

      return (
        <PlaceCard
          key={`${place.title || place.name}-${index}`}
          place={{
            ...place,
            ai: recommendation,
            aiRank: recommendation?.rank,
            aiReason: recommendation?.reason,
          }}
        />
      );
    });
  })()}
</div>

    </PageShell>

  );

}


function Events() {

  const [filter, setFilter] =
    React.useState("Today");

  const [events, setEvents] =
    React.useState([]);

  const [loading, setLoading] =
    React.useState(true);

  const [error, setError] =
    React.useState(false);


  React.useEffect(() => {

    const loadEvents = async () => {

      try {

        setLoading(true);

        setError(false);


        const location =
          await getUserLocation();


        const response =
          await fetch(
            `${API_URL}/api/events/?latitude=${location.latitude}&longitude=${location.longitude}`
          );


        if (!response.ok) {

          throw new Error(
            "Failed to fetch events"
          );

        }


        const data =
          await response.json();


        console.log(
          "Events:",
          data
        );

        console.log(
          "Events array:",
          data.events
        );


        if (Array.isArray(data.events)) {

          setEvents(data.events);


          console.log(
            "Event dates:",
            data.events.map((event) => ({
              title: event.title,
              date: event.date,
              date_filter: event.date_filter,
              event_type: event.event_type
            }))
          );

        } else {

          console.error(
            "Backend did not return an events array"
          );

          setEvents([]);

        }


        setLoading(false);

      } catch (error) {

        console.error(
          "Failed to fetch events:",
          error
        );

        setEvents([]);

        setError(true);

        setLoading(false);

      }

    };


    loadEvents();

  }, []);


  if (loading) {

    return (

      <PageShell
        eyebrow="EVENTS AROUND YOU"
        title="Something is happening outside."
        subtitle="Real-world things to do, close enough that you might actually go."
      >

        <p>
          Finding things happening near you... 🌱
        </p>

      </PageShell>

    );

  }


  if (error) {

    return (

      <PageShell
        eyebrow="EVENTS AROUND YOU"
        title="Something is happening outside."
        subtitle="Real-world things to do, close enough that you might actually go."
      >

        <p>
          Couldn't load events. Make sure the TouchGrass backend is running.
        </p>

      </PageShell>

    );

  }


  const filtered =

    filter === "All"

      ? events

      : filter === "Today"

        ? events.filter(
            (event) =>
              event.date === "Today" ||
              event.date_filter === "Today" ||
              event.event_type === "activity"
          )

        : filter === "Tomorrow"

          ? events.filter(
              (event) =>
                event.date === "Tomorrow" ||
                event.date_filter === "Tomorrow" ||
                event.event_type === "activity"
            )

          : events.filter(
              (event) =>
                event.date === "Weekend" ||
                event.date_filter === "Weekend" ||
                event.event_type === "activity"
            );


  return (

    <PageShell
      eyebrow="EVENTS AROUND YOU"
      title="Something is happening outside."
      subtitle="Real-world things to do, close enough that you might actually go."
    >

      <div className="event-toolbar">

        <div className="chip-row">

          <span
            className={`chip ${filter === "Today" ? "active" : ""}`}
            onClick={() => setFilter("Today")}
          >
            Today
          </span>


          <span
            className={`chip ${filter === "Tomorrow" ? "active" : ""}`}
            onClick={() => setFilter("Tomorrow")}
          >
            Tomorrow
          </span>


          <span
            className={`chip ${filter === "Weekend" ? "active" : ""}`}
            onClick={() => setFilter("Weekend")}
          >
            This weekend
          </span>


          <span
            className={`chip ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            All
          </span>

        </div>


        <button className="filter-button">

          <Filter size={17} />

          Categories

        </button>

      </div>


      <div className="events-feature">

        <div>

          <span className="eyebrow dark">

            <Sparkles size={15} />

            AI SHORTLIST

          </span>


          <h2>
            12 things are happening nearby.
          </h2>


          <p>
            We’d start with the photography walk. It ends right around the best sunset window.
          </p>

        </div>


        <button className="light-button dark-button">

          Show me

          <ArrowRight size={16} />

        </button>

      </div>


      <div className="events-grid events-page-grid">

        {filtered.map((event) => (

          <EventCard
            key={event.id || event.title}
            event={event}
          />

        ))}

      </div>

    </PageShell>

  );

}


function Missions() {

  const [minutes, setMinutes] =
    React.useState(45);

  const [mood, setMood] =
    React.useState("Peaceful");

  const [generated, setGenerated] =
    React.useState(false);

  const [mission, setMission] =
    React.useState(null);

  const [loading, setLoading] =
    React.useState(false);

  const [error, setError] =
    React.useState(false);


  const generateMission = () => {

    setLoading(true);

    setError(false);


    fetch(`${API_URL}/api/missions/`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        time: `${minutes} minutes`,

        budget: 300,

        mood: mood

      })

    })

      .then(response => {

        if (!response.ok) {

          throw new Error(
            "Failed to generate mission"
          );

        }

        return response.json();

      })

      .then(data => {

        setMission(data);

        setGenerated(true);

        setLoading(false);

      })

      .catch(error => {

        console.error(
          "Failed to generate mission:",
          error
        );

        setError(true);

        setLoading(false);

      });

  };


  return (

    <PageShell
      eyebrow="YOUR OUTDOOR MISSION"
      title="I have some time. Make me go outside."
      subtitle="Tell OutThere what you have. We'll turn it into a small adventure."
    >

      <div className="mission-builder">

        <div className="builder-side">

          <div className="builder-label">
            I HAVE
          </div>


          <div className="time-options">

            {[20, 45, 90].map(m => (

              <button
                key={m}
                className={
                  minutes === m
                    ? "time-option active"
                    : "time-option"
                }
                onClick={() => {

                  setMinutes(m);

                  setGenerated(false);

                  setMission(null);

                }}
              >

                <strong>
                  {m}
                </strong>

                <span>
                  minutes
                </span>

              </button>

            ))}

          </div>


          <div className="builder-label">
            I WANT TO FEEL
          </div>


          <div className="mood-options">

            {[
              "Peaceful",
              "Curious",
              "Social",
              "Adventurous"
            ].map(m => (

              <button
                key={m}
                className={
                  mood === m
                    ? "mood-option active"
                    : "mood-option"
                }
                onClick={() => {

                  setMood(m);

                  setGenerated(false);

                }}
              >

                {m}

              </button>

            ))}

          </div>


          <div className="budget-row">

            <span>

              <Ticket size={17} />

              Budget

            </span>


            <strong>
              ₹0–₹300
            </strong>

          </div>


          <button
            className="mission-generate"
            onClick={generateMission}
            disabled={loading}
          >

            <Sparkles size={18} />

            {loading
              ? "Creating your mission..."
              : generated
                ? "Make another mission"
                : "Give me a mission"
            }

          </button>

        </div>


        <div className="mission-preview">

          <div className="mission-orbit">

            <Crosshair size={30} />

          </div>


          <span className="mission-kicker">

            {loading
              ? "CREATING..."
              : generated
                ? "YOUR MISSION"
                : "READY WHEN YOU ARE"
            }

          </span>


          {error ? (

            <>

              <h2>
                Something went wrong.
              </h2>


              <p>
                Couldn't create your mission. Make sure the TouchGrass backend is running.
              </p>

            </>

          ) : !generated ? (

            <>

              <h2>
                A little outside time goes a long way.
              </h2>


              <p>
                Choose your time and mood, then let OutThere decide what is worth leaving the house for.
              </p>


              <div className="mission-hint">

                <Leaf size={17} />

                The goal isn't to use the app. It's to leave it.

              </div>

            </>

          ) : (

            <>

              <h2>
                {mission.title}
              </h2>


              <p>

                {mission.place}
                {" · "}
                {minutes} minutes
                {" · "}
                {mood.toLowerCase()}

              </p>


              <div className="mission-steps">

                {mission.steps.map(
                  (step, index) => (

                    <div key={step}>

                      <span>
                        {index + 1}
                      </span>

                      <p>
                        {step}
                      </p>

                    </div>

                  )
                )}

              </div>

            </>

          )}

        </div>

      </div>


      <div className="mission-rules">

        <div>

          <Clock3 />

          <strong>
            45 min default
          </strong>

          <span>
            Short enough to actually do
          </span>

        </div>


        <div>

          <MapPin />

          <strong>
            Nearby first
          </strong>

          <span>
            No epic planning required
          </span>

        </div>


        <div>

          <Sparkles />

          <strong>
            AI-guided
          </strong>

          <span>
            Gemma turns context into a plan
          </span>

        </div>

      </div>

    </PageShell>

  );

}


function PageShell({
  eyebrow,
  title,
  subtitle,
  children
}) {

  return (

    <div className="page-shell">

      <div className="page-heading">

        <span className="page-eyebrow">

          <Leaf size={15} />

          {eyebrow}

        </span>


        <h1>
          {title}
        </h1>


        <p>
          {subtitle}
        </p>

      </div>


      {children}

    </div>

  );

}


function OptionCard({
  icon,
  image,
  title,
  text,
  button,
  onClick
}) {

  return (

    <article className="option-card">

      <img
        src={image}
        alt=""
      />


      <div className="option-body">

        <div className="option-icon">
          {icon}
        </div>


        <span className="option-kicker">
          {title}
        </span>


        <h3>
          {text}
        </h3>


        <button
          className="green-button"
          onClick={onClick}
        >

          {button}

          <ArrowRight size={15} />

        </button>

      </div>

    </article>

  );

}


function App() {

  const [active, setActive] =
    React.useState("Home");


  const nav = [
    "Home",
    "Explore",
    "Events",
    "Missions"
  ];


  const page =
    active === "Explore"
      ? <Explore />
      : active === "Events"
        ? <Events />
        : active === "Missions"
          ? <Missions />
          : <Home setActive={setActive} />;


  return (

    <div className="app-shell">

      <header className="topbar">

        <div className="brand">

          <div className="brand-mark">

            <Leaf size={23} />

          </div>

          <span>
            OutThere
          </span>

        </div>


        <nav className="desktop-nav">

          {nav.map(item => (

            <button
              key={item}
              className={
                active === item
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setActive(item)}
            >

              {item}

            </button>

          ))}

        </nav>


        <button
          className="location-button"
          aria-label="Location"
        >

          <Navigation size={23} />

        </button>

      </header>


      <main>
        {page}
      </main>


      <footer className="footer">

        <div className="mobile-nav">

          {nav.map((item, i) => (

            <button
              key={item}
              onClick={() => setActive(item)}
              className={
                active === item
                  ? "mobile-nav-item active"
                  : "mobile-nav-item"
              }
            >

              {[
                <Compass />,
                <Search />,
                <Ticket />,
                <Crosshair />
              ][i]}

              <span>
                {item}
              </span>

            </button>

          ))}

        </div>


        <p className="phone-reminder">

          Put your phone down.

          <Leaf size={14} />

        </p>

      </footer>

    </div>

  );

}


export default App;