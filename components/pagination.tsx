import styles from '../styles/components.module.css'

interface PaginationProps {
    onPageChange: (page: number) => void
    onItemsPerPageChange: (itemsPerPage: number) => void
    totalItems: number
    itemsPerPage: number
    currentPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
    onPageChange,
    onItemsPerPageChange,
    totalItems,
    itemsPerPage,
    currentPage,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const handleItemsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        onItemsPerPageChange(Number(event.target.value))
    }

    return (
        <div className={styles.pagination}>
            <button
                className={styles.previous}
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                    className={styles.number}
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={currentPage === page}
                >
                    {page}
                </button>
            ))}
            <button
                className={styles.next}
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
            <select
                className={styles.select}
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
            >
                <option value='20'>20</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
                <option value='250'>250</option>
                <option value='1000'>1000</option>
            </select>
        </div>
    )
}
