import { Link } from "react-router-dom";
import { route, Routes } from "../../../../../core/routing"
import AdminContainer from "../../../../Shared/Admin/AdminContainer";

const DirectorDetail = ({director}) => {

    return (
        <>
            <h1>{director.name}</h1>
            <AdminContainer>
                <Link to={route(Routes.DirectorsEdit, {id: director._id})}>
                    Edit director
                </Link>
            </AdminContainer>
            
        </>
    )
}

export default DirectorDetail;