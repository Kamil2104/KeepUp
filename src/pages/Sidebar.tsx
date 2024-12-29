import React from "react";

import { useActiveFunctionality } from "../hooks/useActiveFunctionality";

import { SidebarOption } from "../interfaces/SidebarInterfaces";

import Logo from "../components/Sidebar/Logo";
import Menu from "../components/Sidebar/Menu";

const Sidebar: React.FC = React.memo(() => {
  const { activeFunctionality, setActiveFunctionality } = useActiveFunctionality();

  const functionalities: SidebarOption[] = [
    {
      icon: <svg className={`h-6 w-6 transition-all duration-200 ${activeFunctionality === "Dashboard" ? 'stroke-brand-50' : 'stroke-black'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></g></svg>,
      name: "Dashboard",
      isActive: activeFunctionality === "Dashboard",
      onClick: () => setActiveFunctionality("Dashboard")
    },
    {
      icon: <svg className={`h-6 w-6 transition-all duration-200 ${activeFunctionality === "Calendar" ? 'stroke-brand-50' : 'stroke-black'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 16.5h2V23M5 12h22m-6-4V4M11 8V4M7 28h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2"/></svg>,
      name: "Calendar",
      isActive: activeFunctionality === "Calendar",
      onClick: () => setActiveFunctionality("Calendar")
    },
    {
      icon: <svg className={`h-6 w-6 transition-all duration-200 ${activeFunctionality === "Tasks" ? 'stroke-brand-50' : 'stroke-black'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M7.998 16h4m-4-5h8M7.5 3.5c-1.556.047-2.483.22-3.125.862c-.879.88-.879 2.295-.879 5.126v6.506c0 2.832 0 4.247.879 5.127C5.253 22 6.668 22 9.496 22h5c2.829 0 4.243 0 5.121-.88c.88-.879.88-2.294.88-5.126V9.488c0-2.83 0-4.246-.88-5.126c-.641-.642-1.569-.815-3.125-.862"/><path d="M7.496 3.75c0-.966.784-1.75 1.75-1.75h5.5a1.75 1.75 0 1 1 0 3.5h-5.5a1.75 1.75 0 0 1-1.75-1.75"/></g></svg>,
      name: "Tasks",
      isActive: activeFunctionality === "Tasks",
      onClick: () => setActiveFunctionality("Tasks")
    },
    {
      icon: <svg className={`h-6 w-6 transition-all duration-200 ${activeFunctionality === "Goals" ? 'stroke-brand-50' : 'stroke-black'}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M10.66 10.66A1.9 1.9 0 0 0 10.1 12a1.9 1.9 0 0 0 1.9 1.9a1.9 1.9 0 0 0 1.34-.56"/><path d="M12 6.3a5.7 5.7 0 1 0 5.7 5.7"/><path d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5m-5.975-3.524L12.95 11.05"/><path d="M20.94 5.844L17.7 6.3l.456-3.24a.19.19 0 0 0-.313-.161l-2.148 2.137a1.9 1.9 0 0 0-.513 1.72l.342 1.72l1.72.341a1.9 1.9 0 0 0 1.72-.513L21.1 6.157a.19.19 0 0 0-.162-.313"/></g></svg>,
      name: "Goals",
      isActive: activeFunctionality === "Goals",
      onClick: () => setActiveFunctionality("Goals")
    },
  ];

  const userActions: SidebarOption[] = [
    {
      icon: <svg className={`h-6 w-6 transition-all duration-200 ${activeFunctionality === "Settings" ? 'stroke-brand-50' : 'stroke-black'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M13.765 2.152C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353a1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7s-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555c.473.297.777.803.777 1.361s-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605c.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353c.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863c.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453s.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.562 12c0-.558.304-1.064.777-1.36c.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605c-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008a1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"/></g></svg>,
      name: 'Settings',
      isActive: activeFunctionality === "Settings",
      onClick: () => setActiveFunctionality("Settings")
    },
    {
      icon: <svg className='h-6 w-6 transition-all duration-200 stroke-error-50' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9l-4-4m4 4l-4 4m4-4H9"/></svg>,
      name: 'Log out',
      isActive: activeFunctionality === "Log out",
      onClick: () => alert("Logging out")
    }
  ]

  return (
    <section className="flex flex-col justify-start gap-4 h-full w-60 p-4 border-r-2 border-gray-200">
      <div className="h-auto w-full">
        <Logo />
      </div>
      <div className="flex flex-col justify-between w-full h-full">
        <Menu data={functionalities} />
        <Menu data={userActions} />
      </div>
    </section>
  );
});

export default Sidebar;
