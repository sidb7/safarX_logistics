# Base image with a specific version of node
FROM node:20-buster
# Create app directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache layers
COPY package.json ./
# Install all dependencies
RUN npm install 
# Copy the rest of the application code

ENV REACT_APP_AMAZON_APPLICATION_ID="amzn1.sp.solution.2539213c-5953-4a94-afc9-5008a8688ca7" \
    REACT_APP_LANDMARK_PROD="" \ 
    REACT_APP_GA4_ID="G-GM63CLZRZN"  \
    REACT_APP_ENV="production" \
    REACT_APP_SELLER_WEB_URL_PROD="https://sprint.shipyaari.com" \
    INVOCATION_ID="29edcec3500d4c4e908af47400f045e0" \
    REACT_APP_TRACKING_URL_PROD="" \
    REACT_APP_ADMIN_PROD="https://sprintadmin.shipyaari.com" \ 
    REACT_APP_SELLER_PROD="https://api-seller-sprint.shipyaari.com" \
    REACT_APP_COMPANY="Sprint" \ 
    REACT_APP_GTM_ID="GTM-KNH545L" \
    REACT_APP_FILE_SERVER_PROD="" \
    SENTRY_AUTH_TOKEN="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" \
    REACT_APP_SMALL_LOGO="https://blaze-whitelabel.s3.ap-south-1.amazonaws.com/sprint/assets/Sprint+Fav+icon+40.svg" \
    REACT_APP_LARGE_LOGO="https://blaze-whitelabel.s3.ap-south-1.amazonaws.com/sprint/assets/Sprint+logo+92+24.svg" \
    REACT_APP_WHITE_COMPANYNAME="Sprint" 

COPY . .
# Build the application
RUN npm run build
# Install 'serve' to serve the application, only if not already installed
RUN npm install -g serve  
# Set the working directory to the build folder to serve from there
WORKDIR /usr/src/app/build
# Command to serve the application, note the CMD instruction does not use && and fi as in shell scripts
# CMD ["serve", "-s", ".", "-l", "3000"]
CMD ["serve", "-s"]
# Expose the ports the app runs on
EXPOSE 8010 3000
