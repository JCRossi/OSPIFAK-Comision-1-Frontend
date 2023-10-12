import  "./globals.css";
export default function Navbar() {
  return (
    <>
    <div className="navbar navbar-expand-md navbar-light navbar shadow-sm">
        <div className="container" >
            <a className="navbar-brand" href="/dashboard">
                <img src="/imagen.jpeg" alt="Imagen" style={{ width: '120px', height: 'auto' }} />
            </a>
            
        </div>
    </div>
    </>
  );
}