# Use a minimal Nginx image as the base image
FROM nginx:alpine

# Copy your HTML and JavaScript files to the Nginx default serving directory
COPY index.html /usr/share/nginx/html/
COPY index.js /usr/share/nginx/html/

# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
