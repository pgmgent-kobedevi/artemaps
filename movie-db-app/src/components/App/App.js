import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import MainRouting from './MainRouting';
import { fetchLikedMovies } from '../../core/modules/likedMovies/api';
import useFetch from '../../core/hooks/useFetch';
import { createContext, useContext } from 'react';
import Spinner from '../Design/Spinner';
import Alert from '../Design/Alert';

const LikedMovies = createContext();

const App = () => {

    const {
        data: likedMovies,
        setData: setLikedMovies,
        error,
        isLoading
    } = useFetch(fetchLikedMovies);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error.message}</Alert>;
    }

    return (
        <>
            <Header />
            <div className="content">
                <div className="app">
                    <Sidebar />
                    <main>
                        {/* add likedMovies to provider so we can prevent constant connections to check if movie is liked or not*/}
                        <LikedMovies.Provider value={{likedMovies, setLikedMovies}}>
                            <MainRouting />
                        </LikedMovies.Provider>
                    </main>
                </div>
            </div>
        </>
    )
};

const useLikedMovies = () => {
    return useContext(LikedMovies);
}

export {
    useLikedMovies,
}

export default App;
