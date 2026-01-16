import { useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'

function DataTable({ darkMode }) {
    const { t } = useLanguage()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const sampleData = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Inactive' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Manager', status: 'Active' },
        { id: 5, name: 'Edward Norton', email: 'edward@example.com', role: 'User', status: 'Active' },
        { id: 6, name: 'Fiona Apple', email: 'fiona@example.com', role: 'User', status: 'Inactive' },
        { id: 7, name: 'George Martin', email: 'george@example.com', role: 'Admin', status: 'Active' },
        { id: 8, name: 'Helen Troy', email: 'helen@example.com', role: 'Manager', status: 'Active' },
        { id: 9, name: 'Ivan Drago', email: 'ivan@example.com', role: 'User', status: 'Inactive' },
        { id: 10, name: 'Julia Roberts', email: 'julia@example.com', role: 'User', status: 'Active' }
    ]

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return '↕'
        return sortConfig.direction === 'asc' ? '↑' : '↓'
    }

    const filteredAndSortedData = useMemo(() => {
        let filtered = sampleData.filter(row =>
            Object.values(row).some(value =>
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        )

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            })
        }

        return filtered
    }, [searchQuery, sortConfig])

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredAndSortedData, currentPage])

    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

    return (
        <div className={`section-card ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`section-title ${darkMode ? 'text-white' : 'text-gray-800'}`} data-testid="data-table-title">
                {t('table.title')}
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('table.subtitle')}
            </p>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    data-testid="table-search-input"
                    placeholder={`🔍 ${t('table.searchPlaceholder')}`}
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1) // Reset to first page on search
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full bg-white" data-testid="data-table">
                    <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <tr>
                            {['id', 'name', 'email', 'role', 'status'].map((key) => (
                                <th
                                    key={key}
                                    data-testid={`table-header-${key}`}
                                    onClick={() => handleSort(key)}
                                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                        <span className="text-sm">{getSortIcon(key)}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <tr
                                    key={row.id}
                                    data-testid={`table-row-${row.id}`}
                                    className={`border-b border-gray-200 hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                        }`}
                                >
                                    <td className="px-6 py-4" data-testid={`table-cell-${row.id}-id`}>
                                        {row.id}
                                    </td>
                                    <td className="px-6 py-4 font-medium" data-testid={`table-cell-${row.id}-name`}>
                                        {row.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600" data-testid={`table-cell-${row.id}-email`}>
                                        {row.email}
                                    </td>
                                    <td className="px-6 py-4" data-testid={`table-cell-${row.id}-role`}>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                            {row.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4" data-testid={`table-cell-${row.id}-status`}>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${row.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className={`px-6 py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} data-testid="no-results">
                                    {t('table.noResults')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} data-testid="pagination-info">
                    {t('table.showing')} {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} {t('table.to')}{' '}
                    {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} {t('table.of')} {filteredAndSortedData.length} {t('table.entries')}
                </p>
                <div className="flex gap-2">
                    <button
                        data-testid="pagination-prev"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {t('table.previous')}
                    </button>
                    <div className="flex gap-1" data-testid="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                data-testid={`pagination-page-${page}`}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 font-semibold rounded-lg transition-colors ${currentPage === page
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        data-testid="pagination-next"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DataTable
