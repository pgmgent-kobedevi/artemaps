import { Link } from "react-router-dom";
import { route, Routes } from "../../../../core/routing";
import DeleteButton from "../../../Design/DeleteButton";
import AdminContainer from "../../../Shared/Admin/AdminContainer";

const DirectorTable = ({directors, deleter, deleterExtra}) => {
    return (
        <table className='mt-4'>
            <thead>
                <tr> 
                    <AdminContainer>
                        <th></th>
                        <th></th>
                    </AdminContainer>
                    <th>Director name</th>
                </tr>
            </thead>
            <tbody>
                { directors.map((director) => (
                    <tr key={director._id}>
                        <AdminContainer>
                            <td>
                                <DeleteButton deleter={() => deleter(director)}>director</DeleteButton>
                            </td>
                            <td>
                                <DeleteButton deleter={() => deleterExtra(director)}>director and all movies </DeleteButton>
                            </td>
                        </AdminContainer>
                        <td>
                            <Link to={route(Routes.DirectorsDetail, {id: director._id})}>
                                {director.name}
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DirectorTable;