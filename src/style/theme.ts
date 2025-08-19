import { StyleSheet,  } from 'react-native-unistyles';

// It's a good practice to define your colors and fonts in a shared space
// so you can maintain consistency across both light and dark themes.

const palette = {
  // Primary Colors
  blue500: '#3498db', // A friendly and calming blue
  blue700: '#2980b9',

  // Accent Colors
  green500: '#2ecc71', // For success states and the QR code
  red500: '#e74c3c', // For error states

  // Neutral Colors
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray400: '#9ca3af',
  gray600: '#4b5563',
  gray800: '#1f2937',
  gray900: '#111827',
  white: '#ffffff',
  black: '#000000',
};

const typography = {
  fonts: {
    // Using system fonts is a safe bet for cross-platform consistency.
    // For a more custom feel, you could use a Google Font like 'Inter' or 'Poppins'.
    body: 'System',
    heading: 'System',
  },
  fontSizes: {
    xs: 12, // Extra Small: for captions, disclaimers
    sm: 14, // Small: for secondary text, input labels
    md: 16, // Medium: for body text, paragraphs
    lg: 20, // Large: for subheadings, card titles
    xl: 24, // Extra Large: for main headings (h2)
    xh: 32,
  },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// --- Light Theme ---
const lightTheme = {
  colors: {
    // Core Colors
    primary: palette.blue500,
    primaryContrast: palette.white,
    background: palette.gray100, // A soft, off-white background
    surface: palette.white, // For cards, modals, and other elevated surfaces

    // Text Colors
    text: palette.gray800, // High contrast for readability
    subtleText: palette.gray600, // For less important text
    placeholder: palette.gray400,

    // Functional Colors
    accent: palette.green500, // Bright and positive for QR codes and success
    error: palette.red500,
    success: palette.green500,
    border: palette.gray200, // For subtle dividers
    link: palette.blue700,
    shadow: palette.black,
    qr: palette.black,
  },
  typography,
  spacing,
};

// --- Dark Theme ---
const darkTheme = {
  colors: {
    // Core Colors
    primary: palette.blue500, // Blue stands out nicely on a dark background
    primaryContrast: palette.white,
    background: palette.gray900, // A deep, comfortable dark background
    surface: palette.gray800, // Slightly lighter for cards to create depth

    // Text Colors
    text: palette.gray50, // Light text for high contrast on dark surfaces
    subtleText: palette.gray400, // Muted for secondary information
    placeholder: palette.gray600,

    // Functional Colors
    accent: palette.green500,
    error: palette.red500,
    success: palette.green500,
    border: palette.gray600, // Lighter border to be visible
    link: palette.blue500,
    shadow: palette.white,
    qr: palette.white,

  },
  typography,
  spacing,
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}


StyleSheet.configure({
  themes: appThemes,
  settings: {
    adaptiveThemes: true,
  },
});
