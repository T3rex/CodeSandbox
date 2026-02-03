<!-- prettier-ignore -->
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Build Project

cd ~/CodeSandbox/frontend
rm -rf dist
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
export NODE_OPTIONS="--max-old-space-size=1024" # 1024 MB
npm run build

# Nginx config path

sudo nano /etc/nginx/sites-available/react-app

# Ngnix config

server {
listen 80;
server_name mycodebox.live;

    # React (Vite build)
    root /var/www/react-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Editor backend (port 3000)
    location /editor/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

    # Terminal backend (port 4000)
    location /terminal/ {
        proxy_pass http://localhost:4000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

}

# Reset Nginx

`sudo rm -rf /var/www/html/*`
`sudo cp -r dist/* /var/www/html/`
sudo nginx -t
sudo systemctl restart nginx

# HTTPS bot

sudo certbot --nginx -d mycodebox.live -d www.mycodebox.live

# Git commands

git reset --hard
git clean -fd
git pull origin main
