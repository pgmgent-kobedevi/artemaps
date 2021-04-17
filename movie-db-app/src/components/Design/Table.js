import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const Table = ({users, setter, deleter}) => {
    return (
        <table className='mt-4'>
            <thead>
                <tr>    
                    <th></th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { users.map((user) => (
                    <tr key={user._id}>
                        <td>
                            <DeleteButton deleter={() => deleter(user)}/>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.userName}</td>
                        <td>{user.role}</td>
                        <td>
                            <EditButton editor={() => setter(user)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;