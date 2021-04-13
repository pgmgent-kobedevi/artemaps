import Button from "./Button";

const Table = ({users, setter, deleter}) => {
    return (
        <table>
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
                            <Button 
                                color='danger' 
                                className="edit" 
                                onClick={() => deleter(user)}
                            >
                                🚮
                            </Button>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.userName}</td>
                        <td>{user.role}</td>
                        <td>
                            <Button 
                                color='primary' 
                                className="edit" 
                                onClick={() => setter(user)}
                            >
                                📝
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;