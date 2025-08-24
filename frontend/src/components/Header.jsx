import React from "react";
import { useAuth } from "./AuthProviderWrapper";

export default function Header({ setSearch }) {
  const { user, login, logout } = useAuth();

  const quickLoginAdmin = () => login('admin');
  const quickLoginUser = () => login('guest');

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
      <div>
        <h1 style={{ margin: 0 }}>🌿 Plant Catalog</h1>
        <div style={{ color: '#666', fontSize: 14 }}>Search, filter & manage plants</div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          onChange={(e) => setSearch?.(e.target.value)}
          placeholder="Search by name or category"
          style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' }}
        />
        {user ? (
          <>
            <span style={{ marginLeft: 8 }}>{user.username}</span>
            <button onClick={logout} style={{ padding: '6px 10px' }}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={quickLoginUser} style={{ padding: '6px 10px' }}>Login (user)</button>
            <button onClick={quickLoginAdmin} style={{ padding: '6px 10px' }}>Login (admin)</button>
          </>
        )}
      </div>
    </header>
  );
}
