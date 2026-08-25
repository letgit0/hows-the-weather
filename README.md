# How's The Weather

A responsive weather application built with **React** that provides current weather information, forecasts, and location-based search through the OpenWeather API.

## Features

* **City Search** — Search for a city and select the intended location.
* **Current Location** — Use browser geolocation to retrieve weather.
* **Current Conditions** — Temperature, feels-like temperature, conditions, humidity, wind, pressure, and visibility.
* **Hourly Forecast** — Upcoming hourly temperature and weather conditions.
* **5-Day Forecast** — Daily weather conditions and temperature ranges.
* **UV Index** — View the current UV index.
* **Sunrise & Sunset** — Display local sunrise and sunset times.
* **Error Handling** — Handles search, API, and location errors.
* **Loading States** — Feedback while data is being retrieved.
* **Responsive Design** — Optimized for mobile, tablet, and desktop.

## Tech Stack

| Technology          | Purpose                       |
| ------------------- | ----------------------------- |
| **React**           | UI development                |
| **JavaScript**      | Application logic             |
| **Tailwind CSS**    | Styling and responsive design |
| **React Router**    | Client-side routing           |
| **Vite**            | Development and build tooling |
| **Lucide React**    | Interface icons               |
| **OpenWeather API** | Weather and geocoding data    |

## Project Structure

```text
src/
├── components/
│   ├── Error.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── Loader.jsx
├── pages/
│   ├── About.jsx
│   ├── Home.jsx
│   └── Weather.jsx
├── services/
│   ├── geoCoding.js
│   └── weatherApi.js
├── App.jsx
├── main.jsx
└── index.css
```

* **`components/`** — Reusable UI components.
* **`pages/`** — Main application views.
* **`services/`** — API and data-fetching logic.
* **`App.jsx`** — Application setup and routing.
* **`main.jsx`** — React entry point.
* **`index.css`** — Global styles and Tailwind configuration.

## License

This project is licensed under the **MIT License**.

Built with **React**, **OpenWeather**, and a little 👻.