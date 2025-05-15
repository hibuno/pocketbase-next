# Threads - Modern Blog Platform

Threads is a modern blog platform built with Next.js and PocketBase, featuring a clean and responsive UI inspired by medical blog designs. This application allows users to create, view, and interact with blog posts in a seamless experience.

## Features

- 📝 Create and publish blog posts with rich text formatting
- 🖼️ Upload cover images for posts
- 👤 User authentication and profiles
- 📱 Fully responsive design for all devices
- 🔍 Search and filter posts by various criteria

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: PocketBase (lightweight open source backend)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: PocketBase authentication

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- PocketBase server

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/threads.git
cd threads
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
POCKETBASE_ADMIN_EMAIL=your-admin-email@example.com
POCKETBASE_ADMIN_PASSWORD=your-admin-password
```

### Installing and Running PocketBase

1. Download PocketBase

   Visit the [PocketBase website](https://pocketbase.io/docs/) and download the appropriate version for your operating system.

2. Extract the downloaded file

3. Run PocketBase

   ```bash
   ./pocketbase serve
   ```

   This will start the PocketBase server at `http://127.0.0.1:8090`

4. Set up your admin account

   Open `http://127.0.0.1:8090/_/` in your browser and create an admin account.

5. Create the necessary collections

   - Create a `users` collection with fields for email, name, and avatar
   - Create a `posts` collection with fields for author, title, excerpt, content, and cover

### Seeding the Database

To populate your database with realistic mock data:

```bash
node --experimental-modules scripts/seed-posts.js
```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Design Reference

The UI design of this project is inspired by [Blog and Blog post - Medical landing](https://dribbble.com/shots/19220675-Blog-and-Blog-post-Medical-landing) by [leonardophoenix](https://dribbble.com/leonardophoenix) for Devolfs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
