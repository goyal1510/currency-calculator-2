import { useEffect, useState } from 'react';
import CurrencyCalculator from "./CurrencyCalculator";
import { ThemeProvider } from "./context/ThemeContext";
import { supabase } from "./supabaseClient";
import './styles/app.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <CurrencyCalculator initialSession={session} />
      )}
    </ThemeProvider>
  );
}

export default App;