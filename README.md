# SmartHomeApp 🏠✨

A premium, modern React Native application built with **Expo SDK 54**, **TypeScript**, and **NativeWind (Tailwind CSS v4)**. Designed with a gorgeous, fluid dark UI, it simulates a state-of-the-art smart home dashboard featuring elegant device controls, smooth micro-animations, and automation scenes.

---

## 🎯 Project Goals

The SmartHomeApp aims to deliver a top-tier companion application for modern automated homes, with focus on:
- **Visual Excellence**: Crafted with true-black backgrounds, subtle zinc tones, and high-contrast pastel accents (purple, gold, mint) that feel premium and modern.
- **Intelligent Controls**: Context-aware tiles for different appliances:
  - 💡 **Lights**: Smooth dimming with an integrated, custom-built intensity slider.
  - ❄️ **AC (Climate)**: Tactile temperature increments/decrements and mode switches.
  - 🌀 **Fans**: Discrete step controls (0–4) for speed adjustments.
  - 🌧️ **Terrace Roof**: Automated status monitoring and manual overrides.
- **Fluid Micro-Animations**: Native interpolations to smoothly shift colors and dimensions when turning devices on or off, avoiding sudden state jumps.
- **Modular & Type-safe Code**: Built strictly using TypeScript, reusable components, and separated screens.

---

## 🛠️ Tech Stack & Key Dependencies

- **Core**: [React Native 0.81.5](https://reactnative.dev/) & [React 19.1.0](https://react.dev/)
- **Framework**: [Expo SDK 54](https://docs.expo.dev/)
- **Navigation**: [React Navigation v7](https://reactnavigation.org/) (native-stack, bottom-tabs)
- **Styling & UI**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS v3.4.19 compiler)
- **Icons**: [Lucide React Native](https://lucide.dev/)
- **Animations**: [React Native Reanimated v4](https://docs.swmansion.com/react-native-reanimated/)

---

## 📂 Project Structure

```bash
SmartHomeApp/
├── App.tsx                   # Main app entry, Navigation setup (Stack & Bottom Tabs)
├── app.json                  # Expo app configuration
├── package.json              # Script commands and project dependencies
├── tailwind.config.js        # Tailwind & NativeWind configuration
├── src/
│   ├── components/           # Reusable UI elements
│   │   ├── CustomSlider.tsx  # Sleek intensity slider for lights & fans
│   │   ├── DeviceTile.tsx    # Card displaying status & controls for each device
│   │   ├── RoomTabs.tsx      # Top tabs for switching between rooms
│   │   └── ToggleSwitch.tsx  # Smooth animated switch for quick toggles
│   ├── data/
│   │   └── mockData.ts       # TypeScript schemas and initial device configurations
│   └── screens/              # Tab and main app screens
│       ├── LoginScreen.tsx   # Elegant entry screen for logging in
│       ├── DevicesScreen.tsx # Interactive room-based device dashboard
│       ├── AutomationsScreen.tsx # scene and trigger automation configurations
│       └── SettingsScreen.tsx    # Account preferences & sign-out options
```

---

## ⚙️ Setup & Installation Instructions

Follow these instructions to clone, install, and run the SmartHomeApp locally on your system.

### Prerequisites

Ensure you have the following installed on your developer machine:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node) or **yarn**
- **Expo Go** application installed on your physical device (iOS App Store or Google Play Store) **OR** Android Studio (for Android Emulator) / Xcode (for iOS Simulator).

---

### Step 1: Install Dependencies

Open your terminal in the project's root directory and run:

```bash
npm install
```

*This will fetch all dependencies, including NativeWind, Lucide icons, and React Navigation.*

---

### Step 2: Start the Expo Development Server

Run the start script to boot up the Metro bundler:

```bash
npm run start
```
*Or, run `npx expo start`.*

Once the bundler is running, you will see a QR code in your terminal.

---

### Step 3: Run the Application

#### A. Running on a Physical Device (Recommended)
1. Install the **Expo Go** app on your phone.
2. Ensure your phone and development computer are connected to the **same Wi-Fi network**.
3. Scan the QR code displayed in the terminal:
   - **Android**: Use the QR scanner in the Expo Go app.
   - **iOS**: Scan using the native Camera app.

#### B. Running on an Emulator / Simulator
- **Android Emulator**: Ensure your Android virtual device (AVD) is running, then press `a` in the terminal, or run:
  ```bash
  npm run android
  ```
- **iOS Simulator** (macOS only): Press `i` in the terminal, or run:
  ```bash
  npm run ios
  ```

---

## 🎨 Core Design Aesthetics

- **Glassmorphism & Contrast**: Dark grey tiles (`bg-zinc-800` / `#27272a`) against a pitch-black background (`bg-black` / `#000000`) give a true premium OLED aesthetic.
- **Active State Highlights**: When turned on, tiles smoothly transition to custom pastel palettes tailored to their functionality:
  - `Under Bed Light`: 🟣 Lavender (`#cba6f7`)
  - `Ceiling & Table Lights`: 🟡 Warm Gold (`#f9e2af`)
  - `AC (Climate Control)`: 🔵 Cool Indigo (`#e0e7ff`)
  - `Fan Control`: 🟢 Mint Green (`#dcfce7`)
  - `Terrace Roof`: 🌊 Turquoise (`#99f2c8`)
- **Animations**: Device card state changes interpolate seamlessly via `Animated.timing` over a `350ms` ease transition, making interactions feel physical and alive.
