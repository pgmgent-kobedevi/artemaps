import LogoutButton from '../../Auth/LogoutButton';

const Header = () => {

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Movie DB</a>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <LogoutButton/>
                </li>
            </ul>
        </header>
    );

};

export default Header;
