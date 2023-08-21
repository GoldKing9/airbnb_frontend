import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    createProxyMiddleware('/members', {
      target: '"proxy": "http://api-server:8080"',
      changeOrigin: true,
    }),
  );
}