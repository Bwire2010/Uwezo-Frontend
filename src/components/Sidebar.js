import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-full lg:w-72 py-4 px-6 space-y-4 lg:space-y-2 flex-shrink-0 h-full">
      <div className="text-xl font-semibold">Dashboard</div>
      <nav className="space-y-2">
        <NavLink
          to="/partners"
          activeClassName="bg-blue-800"
          className="block px-2 py-1 hover:bg-blue-800 rounded transition duration-300"
        >
          Partners
        </NavLink>
        <NavLink
          to="/accounts"
          activeClassName="bg-blue-800"
          className="block px-2 py-1 hover:bg-blue-800 rounded transition duration-300"
        >
          Accounts
        </NavLink>
        <NavLink
          to="/invoices"
          activeClassName="bg-blue-800"
          className="block px-2 py-1 hover:bg-blue-800 rounded transition duration-300"
        >
          Invoices
        </NavLink>
        <NavLink
          to="/mobile-payments"
          activeClassName="bg-blue-800"
          className="block px-2 py-1 hover:bg-blue-800 rounded transition duration-300"
        >
          Mobile Payments
        </NavLink>
        <NavLink
          to="/contracts"
          activeClassName="bg-blue-800"
          className="block px-2 py-1 hover:bg-blue-800 rounded transition duration-300"
        >
          Contracts
        </NavLink>
        <NavLink
          to="/drivers"
          activeClassName="bg-blue-800"
          className="block px-2 py-1 hover:bg-blue-800 rounded transition duration-300"
        >
          Drivers
        </NavLink>
        <NavLink
          to="/vehicles"
          activeClassName="bg-blue-800"
          className="block px-2 py-1 hover:bg-blue-800 rounded transition duration-300"
        >
          Vehicles
        </NavLink>
        <NavLink
          to="/transactions"
          activeClassName="bg-blue-800"
          className="block px-2 py-1 hover:bg-blue-800 rounded transition duration-300"
        >
          Transactions
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
