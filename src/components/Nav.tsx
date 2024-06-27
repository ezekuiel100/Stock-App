import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className=" bg-white drop-shadow flex justify-center items-center gap-6 p-4 mb-10">
      <Link to={"/"} className="text-xl">
        Logo
      </Link>
      <input
        className="outline-none bg-gray-100 rounded-lg p-2 w-72"
        placeholder="Buscar ativo"
      />
    </nav>
  );
}

export default Nav;
