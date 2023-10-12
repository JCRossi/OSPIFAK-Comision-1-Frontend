import  "./dashboard.css";
import Navbar from "../navbar";
export default function Dashboard() {
  return (
    <>
        <Navbar>
            <div className="text-right"> 
              <button className="navbar-toggler" type="button">
                    Cliente <i className="fas fa-user"></i>      
                  </button>
            </div>
        </Navbar>
        
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