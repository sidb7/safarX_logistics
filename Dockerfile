# Use a specific version of the node image to ensure consistent environments across all builds.
FROM node:20-buster AS development
# Create app directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json first to leverage Docker cache layers
# This avoids re-installing all node_modules every build unless these files change.
COPY package.json ./
# Install dependencies with npm ci, which is faster and more reliable for production builds.
# Adjust npm settings to optimize installation time and reduce verbosity.
RUN npm install --verbose
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 8010
EXPOSE 3000
# Command to run the application
CMD ["npm", "run"]
