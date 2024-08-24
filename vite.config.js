import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: "/login",
  },

  plugins: [react()],

  // plugins: [
  //   //
  //    new webpack.DefinePlugin({
  //      'process.env.NODE_ENV': JSON.stringify('development'),
  //      'process.env.PUBLIC_URL': JSON.stringify('http://localhost:8080/public')
  //  })
  //  ]
});
