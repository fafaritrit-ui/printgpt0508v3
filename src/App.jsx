
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

const users = [
  { username: "kasir", password: "123", role: "kasir" },
  { username: "desainer", password: "123", role: "desainer" },
  { username: "superviser", password: "123", role: "superviser" },
  { username: "owner", password: "123", role: "owner" },
];

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError("Username atau password salah");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login Aplikasi Printing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input className="border px-2 py-1" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="border px-2 py-1" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white py-1" type="submit">Login</button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

function Dashboard({ user }) {
  const roleMenus = {
    kasir: ["Transaksi Pesanan", "Transaksi Pengeluaran", "Cetak Struk"],
    desainer: ["Tambah/Edit Pesanan"],
    superviser: ["Transaksi Pesanan", "Transaksi Pengeluaran", "Cetak Struk", "Tambah/Edit Pesanan", "Laporan", "Hapus Transaksi"],
    owner: ["Semua Menu", "Manajemen Akun"]
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Selamat datang, {user.role}</h2>
      <ul className="list-disc ml-5">
        {roleMenus[user.role].map(menu => (
          <li key={menu}>{menu}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
