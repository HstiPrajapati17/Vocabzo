import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './style/H_style.css';
import Navbar from './components/Navbar';
import AppShell from './components/AppShell';
import Home from './container/Home';
import Login from './container/Login';
import Signup from './container/Signup';
import Dashboard from './container/Dashboard';
import Courses from './container/Courses';
import Quests from './container/Quests';
import Shop from './container/Shop';
import LessonPage from './container/LessonPage';
import Leaderboard from './container/Leaderboard';
import Profile from './container/Profile';
import LanguageSelect from './container/LanguageSelect';

const shellPages = ['dashboard', 'courses', 'leaderboard', 'quests', 'shop', 'profile'];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [previewLanguage, setPreviewLanguage] = useState(null);
  const [lessonStats, setLessonStats] = useState({ total: 0, completed: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('linguaUser');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
      } catch {
        localStorage.removeItem('linguaUser');
      }
    }
  }, []);

  const navigate = (page, extra) => {
    if (page === 'lesson' && extra?.lessonId) {
      setCurrentLessonId(extra.lessonId);
    }
    if (page !== 'courses') {
      setPreviewLanguage(null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('linguaUser', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleSignupComplete = (partialUser) => {
    setUser(partialUser);
    setCurrentPage('language-select');
  };

  const handleLanguageSelected = (updatedUser) => {
    setUser(updatedUser);
    setIsLoggedIn(true);
    localStorage.setItem('linguaUser', JSON.stringify(updatedUser));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setPreviewLanguage(null);
    localStorage.removeItem('linguaUser');
    setCurrentPage('home');
  };

  const refreshUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('linguaUser', JSON.stringify(updatedUser));
    setPreviewLanguage(null);
  };

  const handleLessonStats = useCallback((stats) => {
    setLessonStats(stats);
  }, []);

  const renderLoggedInPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard navigate={navigate} user={user} onLessonStats={handleLessonStats} />;
      case 'courses':
        return (
          <Courses
            user={user}
            refreshUser={refreshUser}
            onPreviewLanguage={setPreviewLanguage}
            navigate={navigate}
          />
        );
      case 'quests':
        return <Quests user={user} navigate={navigate} />;
      case 'shop':
        return <Shop user={user} />;
      case 'leaderboard':
        return <Leaderboard user={user} />;
      case 'profile':
        return <Profile navigate={navigate} user={user} refreshUser={refreshUser} />;
      case 'lesson':
        return (
          <LessonPage
            navigate={navigate}
            user={user}
            lessonId={currentLessonId}
            refreshUser={refreshUser}
          />
        );
      default:
        return <Dashboard navigate={navigate} user={user} onLessonStats={handleLessonStats} />;
    }
  };

  const renderPublicPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} onLogin={handleLogin} />;
      case 'signup':
        return <Signup navigate={navigate} onSignupDone={handleSignupComplete} />;
      case 'language-select':
        return <LanguageSelect navigate={navigate} user={user} onDone={handleLanguageSelected} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  const useShell = isLoggedIn && shellPages.includes(currentPage);
  const isLesson = isLoggedIn && currentPage === 'lesson';

  return (
    <div className={`h_app_wrapper ${useShell ? 'h_app_logged_in' : ''} ${isLesson ? 'h_app_lesson' : ''}`}>
      {!isLoggedIn && (
        <Navbar navigate={navigate} isLoggedIn={false} currentPage={currentPage} />
      )}

      {useShell ? (
        <AppShell
          currentPage={currentPage}
          navigate={navigate}
          user={user}
          onLogout={handleLogout}
          previewLanguage={previewLanguage}
          lessonCount={lessonStats.total}
          completedCount={lessonStats.completed}
        >
          {renderLoggedInPage()}
        </AppShell>
      ) : (
        <main className="h_main_content">
          {isLoggedIn ? renderLoggedInPage() : renderPublicPage()}
        </main>
      )}
    </div>
  );
}

export default App;
