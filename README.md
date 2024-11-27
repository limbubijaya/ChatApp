# Full Stack Chat Application

A robust chat application built with a full stack approach, utilizing Node.js, Express, MongoDB, and React. This application allows users to register, log in, and communicate in real time through a user-friendly interface.

## Features

- User authentication (signup, login, logout, check)
- Real-time messaging using WebSockets
- Media uploads via Cloudinary

## Configuration

Create a `.env` file in the root of your project and add the necessary environment variables.

```plaintext
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
