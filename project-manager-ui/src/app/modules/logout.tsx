// src/app/modules/user-authentication/logout.tsx
import React from 'react';
import { supabase } from '../../supabaseClient';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert('Logged out successfully!');
    // Optionally redirect or update the UI
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
