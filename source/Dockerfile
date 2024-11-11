# Start from the official Node.js image
FROM node:18-slim

# Install necessary dependencies for Puppeteer
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        fonts-liberation \
        libasound2 \
        libatk1.0-0 \
        libcairo2 \
        libcups2 \
        libdbus-1-3 \
        libdrm2 \
        libgbm1 \
        libgdk-pixbuf2.0-0 \
        libglib2.0-0 \
        libgtk-3-0 \
        libnspr4 \
        libnss3 \
        libx11-xcb1 \
        libxcomposite1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxrandr2 \
        xdg-utils \
        xvfb && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /chall

COPY chall/ .

RUN npm install

# Run the Puppeteer chall script
CMD ["npm", "start"]
