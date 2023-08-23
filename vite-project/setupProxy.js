import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    createProxyMiddleware('/members', {
      target: '"proxy": "http://43.201.23.80:8080/"',
      changeOrigin: true,
    }),
  );
}