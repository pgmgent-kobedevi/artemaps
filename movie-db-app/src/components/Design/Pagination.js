
const Pagination = ({page, pageAmount, onClick}) => {

    let array = [];
    for (let i = 1; i <= pageAmount; i++) {
        array.push(
            <li key={i} className={page === i-1 ? 'active' : ''}>
                <button disabled={page === i-1} onClick={() => onClick(i-1)}>{i}</button>
            </li>
        )
    }

    return(
        <nav className="pagination">
            <ul>
                <li key='0'>
                    <button disabled={page === 0} onClick={() => onClick(page - 1)}>&lt;</button>
                </li>
                {array}
                <li key={pageAmount+1}>
                    <button disabled={page === pageAmount -1} onClick={() => onClick(page + 1)}>&gt;</button>
                </li>
            </ul>
        </nav>
    )
}


export default Pagination;