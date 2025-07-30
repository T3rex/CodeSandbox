# Dockerfile for Backend Service

# Use the official Ubuntu 24.04 image as the base
FROM ubuntu:24.04

# Setup user sandbox
RUN useradd -m -s /bin/bash sandbox

#Setup working directory
WORKDIR /home/sandbox

#Update and install necessary packages
RUN apt-get update && apt-get install -y 

# install nano and curl
RUN apt-get install -y nano curl

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && apt-get install -y nodejs 

# Set up bash prompt
RUN echo "PS1='\w'" >> /home/sandbox/.bashrc

# setup final working directory
WORKDIR /home/sandbox/app