# Use a lightweight official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker's caching
# This ensures npm install is only re-run if dependencies change
COPY package*.json ./

# Install application dependencies
# RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "run", "dev"]