import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export function Auth() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Get current user on mount
        supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

        // Listen to auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Check your email for the login link!");
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    if (user) {
        return (
            <div className="max-w-sm mx-auto p-4 border rounded">
                <p className="mb-4">Welcome, {user.email}</p>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleLogin}
            className="max-w-sm mx-auto p-4 border rounded"
            noValidate
        >
            <h2 className="text-xl mb-4">Login / Signup</h2>

            <label className="block mb-2">
                Email
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                    autoComplete="email"
                    autoFocus
                />
            </label>

            {message && <p className="my-2 text-red-600">{message}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send Magic Link"}
            </button>
        </form>
    );
}