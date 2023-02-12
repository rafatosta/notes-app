function NavBar() {
  return (
    <nav className="fixed top-0 w-full h-16 flex flex-row justify-between items-center bg-white p-4 shadow-md gap-x-4">
      <p className="text-sm text-center lg:text-2xl font-semibold text-gray-800">Minhas notas</p>
      <button className="border border-gray-400 rounded-lg bg-gray-200 text-gray-700 p-2 px-4 w-[400px] text-left drop-shadow-md cursor-text">
        Criar uma nota...
      </button>
      <div className="hidden lg:flex">Sobre</div>
    </nav>
  );
}

export default NavBar;
