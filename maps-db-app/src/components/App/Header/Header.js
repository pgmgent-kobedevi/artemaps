import LogoutButton from '../../Auth/LogoutButton';

const Header = () => {

    return (
        
        <header>
            <ul className="headerNav">
                <li>
                    <a className='logo' href="/">Movie DB</a>
                </li>
                <li className="nav-item text-nowrap">
                    <LogoutButton/>
                </li>
            </ul>
        </header>
    );

};

export default Header;
