import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    createProxyMiddleware('/members', {
      target: '"proxy": "http://3.39.233.168:8080/"',
      changeOrigin: true,
    }),
  );
}