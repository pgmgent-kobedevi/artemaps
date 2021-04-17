import { Link } from "react-router-dom";
import { route, Routes } from "../../../../../core/routing"
import AdminContainer from "../../../../Shared/Admin/AdminContainer";
import MoviesOverview from "./Movies/Overview/MoviesOverview";

const DirectorDetail = ({director}) => {

    return (
        <>
            <h1 className='mt-3'>{director.name}</h1>
            <AdminContainer>
                <Link className='edit' to={route(Routes.DirectorsEdit, {id: director._id})}>
                    📝
                </Link>
            </AdminContainer>

            <h2>Movies</h2>
            <MoviesOverview directorId={director._id}/>
        </>
    )
}

export default DirectorDetail;