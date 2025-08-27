<!-- prettier-ignore -->
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#Build Project
cd ~/CodeSandbox/frontend
rm -rf dist
export NODE_OPTIONS="--max-old-space-size=1024" # 1024 MB
npm run build

#Nginx config path
sudo nano /etc/nginx/sites-available/default

#Reset Nginx
`sudo rm -rf /var/www/html/*`
`sudo cp -r dist/* /var/www/html/`
sudo nginx -t
sudo systemctl restart nginx

#HTTPS bot
sudo certbot --nginx -d mycodebox.live -d www.mycodebox.live

#Git commands
git reset --hard
git clean -fd
git pull origin main
