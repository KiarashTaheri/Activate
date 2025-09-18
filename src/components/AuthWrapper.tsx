import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import AppleLogo from "../assets/applelogo.png"
import FacebookLogo from "../assets/facebook.png"
import GoogleLogo from "../assets/google.png"


export default function AuthWrapper() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  // ✅ Manage session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => subscription.unsubscribe();
  }, []);

  // ✅ Handler for both sign in & sign up
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let response;
    if (isSignUp) {
      response = await supabase.auth.signUp({ email, password });
    } else {
      response = await supabase.auth.signInWithPassword({ email, password });
    }

    if (response.error) setError(response.error.message);
  };

  const handleOAuth = async (provider: "google" | "facebook" | "github") => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  // ✅ UI
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-bold text-center mb-4"> 
            Welcome Back
          </h2>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 hover:underline"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>

          <div className="mt-4 space-y-2 flex flex-row">
            <button
              onClick={() => handleOAuth("google")}
              className="flex-1/3 h-10 bg-white mx-0.5 border-gray-300 border text-black py-2 px-2 rounded-md flex items-center justify-center"
            >
               <img src={GoogleLogo} alt="Google" className="h-7 w-7" />
            </button>
            <button
              onClick={() => handleOAuth("facebook")}
              className="flex-1/3 h-10 bg-white text-black py-2 border border-gray-300  mx-0.5 px-2 rounded-md flex items-center justify-center"
            >
               <img src={FacebookLogo} alt="Facebook" className="h-7 w-7" />
            </button>
            <button
              onClick={() => handleOAuth("github")}
              className="flex-1/3 h-10 bg-white text-black py-2 border border-gray-300 px-2 rounded-md mx-0.5 flex items-center justify-center"
            >
              <img src={AppleLogo} alt="Apple" className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged in UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200">
      <h1 className="text-3xl font-bold">Welcome back!</h1>
      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Log Out
      </button>
    </div>
  );
}
