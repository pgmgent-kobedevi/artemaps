const Routes = Object.freeze({
    // old
    Login: '/login',
    
    Projects: '/projects',
    ProjectsDetail: '/projects/:id',
    ProjectsCreate: '/projects/create',
    ProjectsEdit: '/projects/:id/edit',

    ProjectsDetailAddLog: '/projects/:id/add',

    Clients: '/clients',
    ClientsDetail: '/clients/:id',
    ClientsEdit: '/clients/:id/edit',
    ClientsCreate: '/clients/create',

    Movies: '/movies',
    MoviesDetail: '/movies/:id',
    MoviesCreate: '/movies/create',
    MoviesEdit: '/movies/:id/edit',
});

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /movies/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach(key => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { Routes };
