import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const { t } = useLanguage();
  const { user, signIn, signUp, signOut, loading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null); // Local error state for form validation
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      if (isSignUp) {
        if (!email || !password) {
          throw new Error(t('all_fields_required'));
        }
        const result = await signUp(email, password);
        if (result.error) {
          throw result.error;
        }
      } else {
        if (!email || !password) {
          throw new Error(t('all_fields_required'));
        }
        const result = await signIn(email, password);
        if (result.error) {
          throw result.error;
        }
      }
      navigate('/'); // Redirect to home after successful login/signup
    } catch (err) {
      if (err.message === 'Credentials incorrect') {
        setError(t('incorrect_credentials'));
      } else if (err.message === 'all_fields_required') {
        setError(t('all_fields_required'));
      } else {
        setError(t('generic_error')); // Generic error message for other issues
        console.error("Authentication error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Display appropriate content based on login status
  if (user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">{t('account')}</h1>
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{t('account_settings')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="input-field bg-gray-100 text-black"
                />
              </div>
              <button onClick={signOut} className="btn-outline-black w-full">
                {t('sign_out')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t('account')}</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            {isSignUp ? t('sign_up') : t('sign_in')}
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field text-black"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-outline-black w-full"
            >
              {loading ? t('processing') : isSignUp ? t('sign_up') : t('sign_in')}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black hover:text-gray-700 underline"
            >
              {isSignUp ? t('already_have_account') : t('create_account')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
