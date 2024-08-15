# Livia

Livia is a simple web app designed to facilitate the confirmation of attendance on special dates, such as anniversaries.

:::warning 🏗️ Working In Progress

Livia is currently in the planning phase. While we aim to deliver a smooth and reliable experience,  please note that development has not yet begun and features are still being defined.

:::

## Goals

- **Simplify Attendance Confirmation**: Ensure an intuitive and effortless experience for users to confirm their attendance with just a few clicks.
- **Visualize the confirmations**: Provide clear and concise visualizations of RSVPs, allowing event organizers to easily track and manage responses.

## Scope

Livia's core functionalities include:

- **Event Creation**: Allow users to create and configure events with details such as title, date, time, and location.
- **Attendance Confirmation**: Enable invitees to confirm or decline their attendance.
- **Event Management**: Provide tools for organizers to view and manage RSVPs.

The project does not include:

- **Notifications**: Send reminders and updates to users about upcoming events.

## Requirements

To use this project effectively, the users will need:

- **Modern Web Browser**: Compatibility with all major browsers, ensuring a consistent experience across different platforms.
- **Internet Connection**: A stable internet connection is essential for accessing Livia’s web interface and managing event details and RSVPs.

## Technologies

General
- TypeScript, Vite, Vinxi
- Zod
- Eslint
- release-it

Front-end
- React
- NextUI
- Tailwind
- TanStack Query
- react-hook-form
- react-router

Back-end
- Nitro
- Auth: Lucia, Oslo, Arctic

Database
- PostgreSQL
- Drizzle
- drizzle-kit
- drizzle-zod

### Concepts

- Server functions
- Streaming SSR
- Middleware
- File System Routing
