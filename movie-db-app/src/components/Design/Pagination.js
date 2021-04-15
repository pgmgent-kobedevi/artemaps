const Pagination = ({page, perPage, perPageClick, pageAmount, onClick}) => {

    let array = [];
    for (let i = 1; i <= pageAmount; i++) {
        array.push(
            <li key={i} className={page === i-1 ? 'active' : ''}>
                <button disabled={page === i-1} onClick={() => onClick(i-1)}>{i}</button>
            </li>
        )
    }

    return(
        <>
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
            <p>Per page:</p>
            <button className={perPage === 10 ? 'active': ''} onClick={() => perPageClick(10)}>
                10
            </button>
            <button className={perPage === 20 ? 'active': ''} onClick={() => perPageClick(20)}>
                20
            </button>
            <button className={perPage === 50 ? 'active': ''} onClick={() => perPageClick(50)}>
                50
            </button>
        </>
    )
}


export default Pagination;