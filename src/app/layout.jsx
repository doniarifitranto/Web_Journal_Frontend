import { AuthProvider } from "@/context/AuthContext";
import './globals.css';

export const metadata = {
  title: 'MoodLens',
  description: ' A safe place to reflect, understand your emotions, and track burnout probability'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}