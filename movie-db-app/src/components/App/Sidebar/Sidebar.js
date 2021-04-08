import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';

const items = [{
    'label': 'Projects',
    'route': Routes.Projects,
    'icon': null,
}, {
    'label': 'Clients',
    'route': Routes.Clients,
    'icon': null,
},{
    'label': 'Movies',
    'route': Routes.Movies,
    'icon': null,
}, {
    'label': 'Directors',
    'route': Routes.Directors,
    'icon': null,
}]

const Sidebar = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    {
                        items.map((item) => (
                            <li key={item.route} className="nav-item">
                                <Link className="nav-link" to={item.route}>{item.label}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    );

};

export default Sidebar;
