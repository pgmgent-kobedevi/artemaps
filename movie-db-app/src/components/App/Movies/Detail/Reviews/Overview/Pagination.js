const Pagination = ({ maxPerPage, total, currentPage, onClick }) => {

    const max = Math.ceil(total / maxPerPage);

    if(maxPerPage < total && total !== 0) {
        let array = [];
        for (let i = 1; i <= max; i++) {
            array.push(
                <li key={i} className={currentPage === i ? 'active' : ''}>
                    <button onClick={() => onClick(i)}>{i}</button>
                </li>
            )
        }

        return (
            <nav className="pagination">
                <ul>
                    <button disabled={currentPage === 1} onClick={() => onClick(currentPage - 1)}>&lt;</button>
                    {array}
                    <button disabled={currentPage === max} onClick={() => onClick(currentPage + 1)}>&gt;</button>
                </ul>
            </nav>
        )
    }    

    return null;
};

export default Pagination;