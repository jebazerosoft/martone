# Martone Official Website

## Overview

This is a static website for Martone, "The Emperor of House Music" - an artist who is also an author, former TV show host, and radio personality. The website serves as a comprehensive digital presence showcasing Martone's music, biography, tours, press coverage, merchandise store, style, blog content, and subscription services. Built as a modern, responsive web application with rich animations and interactive features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML Structure**: Multi-page website with dedicated sections for different content types (biography, music, tour, press, store, style, blog, subscribe)
- **CSS Framework**: Bootstrap 5.3.0 for responsive grid system and component styling
- **Custom Styling**: Comprehensive CSS architecture with CSS custom properties for theming, including dark color scheme with gold/bronze accents
- **Typography**: Google Fonts integration featuring Playfair Display (serif) for headings and Inter (sans-serif) for body text
- **Responsive Design**: Mobile-first approach with viewport meta tags and responsive breakpoints

### Design System
- **Color Palette**: Dark theme with primary gold (#D4AF37), bronze secondary (#CD7F32), and accent colors
- **Animation System**: Custom JavaScript animation engine with configurable durations, easing functions, and stagger effects
- **Component Library**: Reusable UI components including loading screens, social sidebars, navigation, and content sections
- **Visual Effects**: Particle systems, scroll animations, hover effects, and music visualization components

### JavaScript Architecture
- **Modular Structure**: Separated concerns with main.js for core functionality and animations.js for visual effects
- **jQuery Dependency**: Heavy reliance on jQuery for DOM manipulation and event handling
- **Animation Engine**: Advanced animation system with intersection observers, custom easing, and sequence management
- **Interactive Features**: Loading screens, smooth scrolling, lazy loading, newsletter integration, and social media interactions

### Content Management
- **Static Content**: All content hardcoded in HTML files with no backend CMS
- **Asset Organization**: Structured asset folder containing CSS, JavaScript, and media files
- **SEO Optimization**: Proper meta tags, descriptions, and semantic HTML structure for search engine optimization

### Performance Considerations
- **CDN Integration**: External dependencies loaded from CDNs (Bootstrap, Font Awesome, Google Fonts)
- **Lazy Loading**: Image lazy loading implementation for improved page load times
- **Animation Optimization**: Configurable animation settings with performance considerations

## External Dependencies

### CSS Frameworks & Libraries
- **Bootstrap 5.3.0**: Primary CSS framework for responsive design and component styling
- **Font Awesome 6.4.0**: Icon library for social media icons and UI elements
- **Google Fonts**: Typography service for Playfair Display and Inter font families

### JavaScript Libraries
- **jQuery**: Core JavaScript library for DOM manipulation and event handling
- **Custom Animation Engine**: Proprietary animation system built on top of modern browser APIs

### Third-Party Services
- **CDN Services**: jsdelivr for Bootstrap, cdnjs for Font Awesome, Google Fonts API
- **Social Media Platforms**: Integration placeholders for Facebook, Twitter, LinkedIn, and Instagram
- **Newsletter Service**: Subscription form integration (implementation details not specified)

### Browser APIs
- **Intersection Observer**: For scroll-based animations and lazy loading
- **CSS Custom Properties**: For dynamic theming and style management
- **Modern Animation APIs**: For high-performance visual effects and transitions

### Asset Dependencies
- **Image Assets**: External image references and media content
- **Font Files**: Web font loading from Google Fonts service
- **Style Dependencies**: Modular CSS architecture with custom property system