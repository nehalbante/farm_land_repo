import React, { useState } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { HomePage } from './components/home/HomePage';
import { Dashboard } from './components/dashboard/Dashboard';
import { ListingPage } from './components/listings/ListingPage';
import { SearchResults } from './components/search/SearchResults';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ChatPage } from './components/chat/ChatPage';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'admin';
  location: {
    district: string;
    village: string;
  };
};

type Page = 'login' | 'register' | 'home' | 'dashboard' | 'listing' | 'search' | 'admin' | 'chat';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  if (!user && currentPage !== 'register') {
    if (currentPage === 'login') {
      return (
        <LoginPage 
          onLogin={handleLogin} 
          onNavigateToRegister={() => setCurrentPage('register')}
        />
      );
    }
  }

  if (!user && currentPage === 'register') {
    return (
      <RegisterPage 
        onRegister={handleLogin}
        onNavigateToLogin={() => setCurrentPage('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'home' && (
        <HomePage 
          user={user!} 
          onNavigate={navigateTo}
          onSearch={handleSearch}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard 
          user={user!} 
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'listing' && (
        <ListingPage 
          user={user!} 
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'search' && (
        <SearchResults 
          user={user!} 
          searchQuery={searchQuery}
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'chat' && (
        <ChatPage 
          user={user!} 
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'admin' && user?.role === 'admin' && (
        <AdminDashboard 
          user={user} 
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}