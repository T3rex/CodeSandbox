# Use the official Ubuntu 24.04 image as the base
FROM ubuntu:20.04

# Set environment variables to non-interactive for apt
ENV DEBIAN_FRONTEND=noninteractive

# Create user 'sandbox'
RUN useradd -m -s /bin/bash sandbox

# Set initial working directory
WORKDIR /home/sandbox

# Update and install required packages in one layer
RUN apt-get update && \
    apt-get install -y curl nano gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set up bash prompt for sandbox user
RUN echo "PS1='\\w'" >> /home/sandbox/.bashrc

# Switch to sandbox user
USER sandbox

# Final working directory
WORKDIR /home/sandbox/app
