const Routes = Object.freeze({
    // old
    Login: '/login',

    LikedMovies: '/likedMovies',
    
    Users: '/users',
    UsersEdit: '/users/edit',

    Movies: '/movies',
    MoviesDetail: '/movies/:id',
    MoviesCreate: '/movies/create',
    MoviesEdit: '/movies/:id/edit',
    MoviesCreateReview: '/movies/:id/review',

    Directors: '/directors',
    DirectorsDetail: '/directors/:id',
    DirectorsCreate: '/directors/create',
    DirectorsEdit: '/directors/:id/edit',
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
