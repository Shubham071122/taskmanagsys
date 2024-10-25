// import React, { useContext } from 'react';
// import { AiFillHome } from 'react-icons/ai';
// import { FaUser, FaCalendarAlt, FaEnvelope, FaComments } from 'react-icons/fa';
// import AuthContext from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// function Sidebar({ activeTab, setActiveTab }) {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const tabs = [
//     { name: 'Board', key: 'board' },
//     // { name: 'My Board', key: 'my-board' },
//   ];

//   const handleClick = (e) => {
//     e.preventDefault();
//     logout();
//     navigate("/")
//   }

//   return (
//     <div className="w-64 bg-purple-700 text-white p-4 py-10 space-y-4 ">
//       <ul className="space-y-4 flex flex-col ">
//         {tabs.map((tab) => (
//           <li
//             key={tab.key}
//             className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-purple-500 ${
//               activeTab === tab.key ? 'bg-purple-500' : ''
//             }`}
//             onClick={() => setActiveTab(tab.key)}
//           >
//             <span className="">{tab.icon}</span>
//             {tab.name}
//           </li>
//         ))}
//         <button
//           className="flex items-center cursor-pointer p-2 rounded-md hover:bg-purple-500 w-full "
//           onClick={handleClick}
//         >
//           Logout
//         </button>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;




import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleClick = (e) => {
    e.preventDefault();
    logout();
    navigate("/")
  }

  return (
    <div className="w-64 bg-purple-700 text-white p-4 py-10 space-y-4 ">
      <div className="space-y-4 flex flex-col ">
        <NavLink to="/dd" className={({ isActive }) => 
    `flex items-center cursor-pointer p-2 rounded-md hover:bg-purple-500 ${isActive ? 'bg-purple-500' : ''}`
  }>Board</NavLink>
        <button
          className="flex items-center cursor-pointer p-2 rounded-md hover:bg-purple-500 w-full "
          onClick={handleClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;


