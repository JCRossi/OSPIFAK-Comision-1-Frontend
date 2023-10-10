import  "./dashboard.css";
import Navbar from "../navbar";
export default function Dashboard() {
  return (
    <>
        <Navbar></Navbar>

        <div className="cont text-center">
        <ul className="navbar">
          <li>
            <a href="/datos">Mis datos</a>
          </li>
          <li>
            <a href="/tramites">Mis tramites</a>
          </li>
        </ul>
        </div>
    </>
  );
}