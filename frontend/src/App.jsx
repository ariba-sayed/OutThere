import React from "react";
import {
  ArrowRight, CalendarDays, Camera, Check, Clock3, Compass, Crosshair,
  Filter, Footprints, Leaf, MapPin, Moon, Navigation, Search, Sparkles,
  Sun, Ticket, Users, Wind, CloudRain, Heart, SlidersHorizontal
} from "lucide-react";

const events = [
  { title: "Photography Walk", category: "Outdoor Activity", time: "5:00 PM", date: "Today", distance: "2.1 km", price: "Free", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80", ai: true },
  { title: "Weekend Bird Walk", category: "Nature", time: "6:30 AM", date: "Tomorrow", distance: "3.8 km", price: "₹200", image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80", ai: true },
  { title: "The Sunday Flea Market", category: "Market", time: "10:00 AM", date: "Sun, Oct 11", distance: "4.8 km", price: "Free", image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80" },
  { title: "Outdoor Yoga Session", category: "Wellness", time: "7:00 AM", date: "Sat, Oct 10", distance: "2.8 km", price: "₹300", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80" },
  { title: "Cubbon Park Sketch Club", category: "Creative", time: "4:30 PM", date: "Today", distance: "3.2 km", price: "Free", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80", ai: true },
  { title: "Sunrise Run Club", category: "Fitness", time: "6:00 AM", date: "Sat, Oct 10", distance: "1.9 km", price: "Free", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80" },
];

const places = [
  { title: "Lalbagh Botanical Garden", type: "Nature escape", distance: "3.4 km", cost: "₹30", time: "Best after 4:30 PM", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80", reason: "Easy green escape with enough time for a slow walk before sunset." },
  { title: "Ulsoor Lake", type: "Sunset + walk", distance: "4.1 km", cost: "Free", time: "Best 5:15–6:30 PM", image: "https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=1000&q=80", reason: "Tonight's clouds make this a strong sunset candidate." },
  { title: "Cubbon Park", type: "Walk + photography", distance: "3.0 km", cost: "Free", time: "Best before 6:00 PM", image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80", reason: "Close, free, and good for a 45-minute phone-free reset." },
  { title: "Turahalli Forest", type: "Mini adventure", distance: "12.8 km", cost: "Free", time: "Best before sunset", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80", reason: "Worth the extra travel if you want something that feels like an escape." },
];

const conditions = [
  { icon: Sun, label: "Sunset", value: "Excellent" },
  { icon: Moon, label: "Stargazing", value: "Good" },
  { icon: Footprints, label: "Running", value: "Excellent" },
  { icon: Camera, label: "Photography", value: "Excellent" },
  { icon: Leaf, label: "Nature walk", value: "Excellent" },
];

function EventCard({ event }) {
  return <article className="event-card">
    <div className="event-image-wrap">
      <img src={event.image} alt="" className="event-image" />
      {event.ai && <span className="ai-badge"><Sparkles size={13} /> AI Pick</span>}
    </div>
    <div className="event-content">
      <h3>{event.title}</h3>
      <p className="event-category"><Leaf size={14} /> {event.category}</p>
      <div className="event-meta">
        <span><CalendarDays size={14} /> {event.time}</span><span><MapPin size={14} /> {event.distance}</span><span><Ticket size={14} /> {event.price}</span>
        <button className="round-arrow" aria-label={`Open ${event.title}`}><ArrowRight size={15} /></button>
      </div>
    </div>
  </article>;
}

function PlaceCard({ place }) {
  return <article className="place-card">
    <div className="place-image"><img src={place.image} alt="" /><span>{place.type}</span></div>
    <div className="place-body">
      <div className="place-title-row"><h3>{place.title}</h3><button className="heart"><Heart size={17} /></button></div>
      <div className="place-meta"><span><MapPin size={14} /> {place.distance}</span><span>{place.cost}</span></div>
      <p className="place-time"><Clock3 size={14} /> {place.time}</p>
      <div className="ai-reason"><Sparkles size={14} /><span>{place.reason}</span></div>
      <button className="green-button">Get directions <Navigation size={15} /></button>
    </div>
  </article>;
}

function Home({ setActive }) {
  return <>
    <section className="hero">
      <div className="hero-copy"><div className="location-label"><MapPin size={19} /><span>Bengaluru · Today</span></div><h1>Give yourself a<br />reason to go outside.</h1><p>Here’s what’s happening around you today.</p></div>
      <article className="sunset-card"><img src="https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=1600&q=85" alt="Golden sunset over a city and trees" /><div className="sunset-overlay" /><div className="sunset-main"><div className="eyebrow"><Sun size={17} /> TONIGHT'S SUNSET</div><div className="sunset-time"><strong>6:07</strong><span>PM</span></div><p>Looks worth seeing</p><button className="light-button" onClick={() => setActive("Explore")}>Find a sunset spot <ArrowRight size={17} /></button></div><div className="sunset-stats"><div><span>☀️ Sunset quality</span><strong>8.2 / 10</strong></div><div><span>☁️ Cloud cover</span><strong>72%</strong></div><div><span>🌧️ Rain chance</span><strong>18%</strong></div><div><span>◷ Best window</span><strong>5:40 – 6:30 PM</strong></div></div></article>
    </section>
    <section className="section"><div className="section-heading"><h2><Sparkles size={22} /> Things happening near you</h2><button className="text-button" onClick={() => setActive("Events")}>See all <ArrowRight size={16} /></button></div><div className="events-grid">{events.slice(0,4).map(e => <EventCard key={e.title} event={e} />)}</div></section>
    <section className="section options-section"><div className="section-heading"><h2><Leaf size={22} /> Your outdoor options</h2></div><div className="options-grid">
      <OptionCard icon={<Compass />} image={places[0].image} title="GO SOMEWHERE" text="3 places worth visiting today" button="Explore" onClick={() => setActive("Explore")} />
      <OptionCard icon={<Crosshair />} image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80" title="GIVE ME A MISSION" text="I have 45 minutes. Make me do something outside." button="Surprise me" onClick={() => setActive("Missions")} />
      <OptionCard icon={<Ticket />} image="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80" title="FIND AN EVENT" text="12 things happening around you" button="See events" onClick={() => setActive("Events")} />
    </div></section>
    <section className="bottom-grid"><div><div className="section-heading compact"><h2><Sun size={22} /> Good conditions today</h2></div><div className="conditions">{conditions.map(({icon:Icon,label,value}) => <div className="condition" key={label}><Icon size={21}/><div><span>{label}</span><strong>{value}</strong></div></div>)}</div></div><div className="ai-recommendation"><div className="ai-title"><Sparkles size={18}/> AI Recommendation</div><p>Today looks especially good for a sunset walk. High clouds could create dramatic colours.</p><button className="round-arrow" onClick={() => setActive("Missions")}><ArrowRight size={16}/></button></div></section>
  </>;
}

function Explore() {
  return <PageShell eyebrow="EXPLORE OUTSIDE" title="Find somewhere worth going." subtitle="Places nearby, picked for how good they are to be outside today.">
    <div className="search-row"><div className="search-box"><Search size={19}/><input placeholder="Search places, parks, walks..." /></div><button className="filter-button"><SlidersHorizontal size={17}/> Filters</button></div>
    <div className="chip-row"><span className="chip active">For you</span><span className="chip">Nature</span><span className="chip">Walks</span><span className="chip">Photography</span><span className="chip">Peaceful</span><span className="chip">Free</span></div>
    <div className="ai-banner"><div className="ai-banner-icon"><Sparkles size={21}/></div><div><strong>Gemma's pick for today</strong><p>Cloudy skies + mild weather make outdoor walks especially comfortable this afternoon.</p></div><span className="score">8.7</span></div>
    <div className="place-grid">{places.map(p => <PlaceCard key={p.title} place={p}/>)}</div>
  </PageShell>;
}

function Events() {
  const [filter, setFilter] = React.useState("Today");
  const filtered = filter === "All" ? events : events.filter(e => filter === "Today" ? e.date === "Today" : e.date !== "Today");
  return <PageShell eyebrow="EVENTS AROUND YOU" title="Something is happening outside." subtitle="Real-world things to do, close enough that you might actually go.">
    <div className="event-toolbar"><div className="chip-row"><span className={`chip ${filter === "Today" ? "active" : ""}`} onClick={() => setFilter("Today")}>Today</span><span className={`chip ${filter === "Tomorrow" ? "active" : ""}`} onClick={() => setFilter("Tomorrow")}>Tomorrow</span><span className={`chip ${filter === "Weekend" ? "active" : ""}`} onClick={() => setFilter("Weekend")}>This weekend</span><span className={`chip ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>All</span></div><button className="filter-button"><Filter size={17}/> Categories</button></div>
    <div className="events-feature"><div><span className="eyebrow dark"><Sparkles size={15}/> AI SHORTLIST</span><h2>12 things are happening nearby.</h2><p>We’d start with the photography walk. It ends right around the best sunset window.</p></div><button className="light-button dark-button">Show me <ArrowRight size={16}/></button></div>
    <div className="events-grid events-page-grid">{filtered.map(e => <EventCard key={e.title} event={e}/>)}</div>
  </PageShell>;
}

function Missions() {
  const [minutes, setMinutes] = React.useState(45);
  const [mood, setMood] = React.useState("Peaceful");
  const [generated, setGenerated] = React.useState(false);
  const mission = minutes <= 20 ? {title:"Take the long way home", place:"A nearby quiet street or park", steps:["Leave your phone in your pocket for 15 minutes.","Walk without your usual route or playlist.","Stop somewhere green and notice five things around you."]} : minutes >= 75 ? {title:"Make an afternoon of it", place:"Lalbagh + a slow neighbourhood walk", steps:["Head to Lalbagh and pick a path without planning it.","Find one plant, bird, or view you haven't noticed before.","Sit outside for ten quiet minutes before heading back."]} : {title:"Chase the last light", place:"Ulsoor Lake", steps:["Leave around 5:20 PM and walk toward the lake.","Put your phone away until you reach the water.","Stay for the sunset. Take exactly one photo, then walk home."]};
  return <PageShell eyebrow="YOUR OUTDOOR MISSION" title="I have some time. Make me go outside." subtitle="Tell OutThere what you have. We'll turn it into a small adventure.">
    <div className="mission-builder"><div className="builder-side"><div className="builder-label">I HAVE</div><div className="time-options">{[20,45,90].map(m => <button key={m} className={minutes===m ? "time-option active" : "time-option"} onClick={() => {setMinutes(m);setGenerated(false)}}><strong>{m}</strong><span>minutes</span></button>)}</div><div className="builder-label">I WANT TO FEEL</div><div className="mood-options">{["Peaceful","Curious","Social","Adventurous"].map(m => <button key={m} className={mood===m ? "mood-option active" : "mood-option"} onClick={() => setMood(m)}>{m}</button>)}</div><div className="budget-row"><span><Ticket size={17}/> Budget</span><strong>₹0–₹300</strong></div><button className="mission-generate" onClick={() => setGenerated(true)}><Sparkles size={18}/> {generated ? "Make another mission" : "Give me a mission"}</button></div><div className="mission-preview"><div className="mission-orbit"><Crosshair size={30}/></div><span className="mission-kicker">{generated ? "YOUR MISSION" : "READY WHEN YOU ARE"}</span><h2>{generated ? mission.title : "A little outside time goes a long way."}</h2><p>{generated ? `${mission.place} · ${minutes} minutes · ${mood.toLowerCase()}` : "Choose your time and mood, then let OutThere decide what is worth leaving the house for."}</p>{generated && <div className="mission-steps">{mission.steps.map((s,i)=><div key={s}><span>{i+1}</span><p>{s}</p></div>)}</div>}{!generated && <div className="mission-hint"><Leaf size={17}/> The goal isn't to use the app. It's to leave it.</div>}</div></div>
    <div className="mission-rules"><div><Clock3/><strong>45 min default</strong><span>Short enough to actually do</span></div><div><MapPin/><strong>Nearby first</strong><span>No epic planning required</span></div><div><Sparkles/><strong>AI-guided</strong><span>Gemma turns context into a plan</span></div></div>
  </PageShell>;
}

function PageShell({eyebrow,title,subtitle,children}) { return <div className="page-shell"><div className="page-heading"><span className="page-eyebrow"><Leaf size={15}/> {eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>{children}</div>; }
function OptionCard({icon,image,title,text,button,onClick}) { return <article className="option-card"><img src={image} alt=""/><div className="option-body"><div className="option-icon">{icon}</div><span className="option-kicker">{title}</span><h3>{text}</h3><button className="green-button" onClick={onClick}>{button}<ArrowRight size={15}/></button></div></article>; }

function App() {
  const [active,setActive] = React.useState("Home");
  const nav=["Home","Explore","Events","Missions"];
  const page = active === "Explore" ? <Explore/> : active === "Events" ? <Events/> : active === "Missions" ? <Missions/> : <Home setActive={setActive}/>;
  return <div className="app-shell"><header className="topbar"><div className="brand"><div className="brand-mark"><Leaf size={23}/></div><span>OutThere</span></div><nav className="desktop-nav">{nav.map(item=><button key={item} className={active===item?"nav-item active":"nav-item"} onClick={()=>setActive(item)}>{item}</button>)}</nav><button className="location-button" aria-label="Location"><Navigation size={23}/></button></header><main>{page}</main><footer className="footer"><div className="mobile-nav">{nav.map((item,i)=><button key={item} onClick={()=>setActive(item)} className={active===item?"mobile-nav-item active":"mobile-nav-item"}>{[<Compass/>,<Search/>,<Ticket/>,<Crosshair/>][i]}<span>{item}</span></button>)}</div><p className="phone-reminder">Put your phone down. <Leaf size={14}/></p></footer></div>;
}
export default App;
