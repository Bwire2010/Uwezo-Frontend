import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">UWEZO</h1>
        <nav>
          <Link
            to="/login"
            className="text-lg font-medium mr-4 hover:underline"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-lg font-medium hover:underline"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;