import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "font-semibold underline" : "";

  return (
    <nav className="flex gap-6 p-4 bg-white shadow-sm">
      <NavLink to="/" className={linkClass}>Profile</NavLink>
      <NavLink to="/swipe" className={linkClass}>Swipe</NavLink>
      <NavLink to="/group-vote" className={linkClass}>Group Vote</NavLink>
      <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      <NavLink to="/authWrapper" className={linkClass}>LogIN</NavLink>
    </nav>
  );
}
