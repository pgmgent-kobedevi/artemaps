import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import MainRouting from './MainRouting';

const App = () => {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <MainRouting />
                    </main>
                </div>
            </div>
        </>
    )

};

export default App;
