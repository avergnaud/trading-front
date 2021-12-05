import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            brochain.net
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/definitions">
                  Definitions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="my-3 App-header">
        <h1 className="display-1">Brochain.net</h1>
        <p className="lead">Backtesting & bot trading</p>
        <hr className="my-4" />
      </header>
    </>
  );
};

export default MainNavigation;
