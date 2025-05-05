import { useState, useEffect } from 'react';
import { Search, PlusCircle, Edit2, Trash2, Filter, X } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';

// Mock data
const initialDiscounts = [
    { id: 1, bookId: 'BK001', discountPercentage: 15, startDate: '2025-05-10', endDate: '2025-05-30', isActive: true, isSaleFlag: true },
    { id: 2, bookId: 'BK002', discountPercentage: 25, startDate: '2025-05-15', endDate: '2025-06-15', isActive: true, isSaleFlag: false },
    { id: 3, bookId: 'BK003', discountPercentage: 10, startDate: '2025-04-01', endDate: '2025-05-01', isActive: false, isSaleFlag: true },
    { id: 4, bookId: 'BK004', discountPercentage: 30, startDate: '2025-06-01', endDate: '2025-06-30', isActive: true, isSaleFlag: true },
    { id: 5, bookId: 'BK005', discountPercentage: 20, startDate: '2025-05-01', endDate: '2025-07-01', isActive: true, isSaleFlag: false },
];

export default function DiscountPage() {
    const [discounts, setDiscounts] = useState(initialDiscounts);
    const [filteredDiscounts, setFilteredDiscounts] = useState(initialDiscounts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState('all');
    const [filterSale, setFilterSale] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [editingDiscount, setEditingDiscount] = useState(null);

    const [formData, setFormData] = useState({
        bookId: '',
        discountPercentage: 0,
        startDate: '',
        endDate: '',
        isActive: true,
        isSaleFlag: false
    });

    useEffect(() => {
        let results = discounts;
        if (searchTerm) {
            results = results.filter(discount =>
                discount.bookId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterActive !== 'all') {
            const isActiveFilter = filterActive === 'active';
            results = results.filter(discount => discount.isActive === isActiveFilter);
        }
        if (filterSale !== 'all') {
            const isSaleFilter = filterSale === 'sale';
            results = results.filter(discount => discount.isSaleFlag === isSaleFilter);
        }
        setFilteredDiscounts(results);
    }, [searchTerm, filterActive, filterSale, discounts]);

    const handleOpenModal = (discount = null) => {
        if (discount) {
            setEditingDiscount(discount);
            setFormData({ ...discount });
        } else {
            setEditingDiscount(null);
            setFormData({
                bookId: '',
                discountPercentage: 0,
                startDate: '',
                endDate: '',
                isActive: true,
                isSaleFlag: false
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingDiscount) {
            setDiscounts(discounts.map(discount =>
                discount.id === editingDiscount.id ? { ...formData, id: discount.id } : discount
            ));
        } else {
            const newDiscount = {
                ...formData,
                id: Math.max(...discounts.map(d => d.id), 0) + 1
            };
            setDiscounts([...discounts, newDiscount]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setDiscounts(discounts.filter(discount => discount.id !== id));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminLayout />

            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-5">
                        <h1 className="text-2xl font-semibold text-gray-800">Discount Management</h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by Book ID"
                                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            </div>

                            <button
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <Filter size={18} className="mr-2" />
                                Filters
                            </button>

                            <button
                                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg"
                                onClick={() => handleOpenModal()}
                            >
                                <PlusCircle size={18} className="mr-2" />
                                New Discount
                            </button>
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {isFilterOpen && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-gray-700">Filter Options</h3>
                                <button onClick={() => setIsFilterOpen(false)} className="text-gray-500">
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={filterActive}
                                        onChange={(e) => setFilterActive(e.target.value)}
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sale Type</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={filterSale}
                                        onChange={(e) => setFilterSale(e.target.value)}
                                    >
                                        <option value="all">All Types</option>
                                        <option value="sale">Sale</option>
                                        <option value="regular">Regular Discount</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Book ID</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Discount %</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Start Date</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">End Date</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Status</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Sale Flag</th>
                                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredDiscounts.map(discount => (
                                        <tr key={discount.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-4">{discount.bookId}</td>
                                            <td className="py-4 px-4">{discount.discountPercentage}%</td>
                                            <td className="py-4 px-4">{formatDate(discount.startDate)}</td>
                                            <td className="py-4 px-4">{formatDate(discount.endDate)}</td>
                                            <td className="py-4 px-4">{discount.isActive ? 'Active' : 'Inactive'}</td>
                                            <td className="py-4 px-4">{discount.isSaleFlag ? 'Sale' : 'Regular'}</td>
                                            <td className="py-4 px-4 text-right space-x-2">
                                                <button onClick={() => handleOpenModal(discount)}>
                                                    <Edit2 size={16} className="text-blue-600" />
                                                </button>
                                                <button onClick={() => handleDelete(discount.id)}>
                                                    <Trash2 size={16} className="text-red-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">
                                    {editingDiscount ? 'Edit Discount' : 'Add Discount'}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        name="bookId"
                                        placeholder="Book ID"
                                        value={formData.bookId}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="number"
                                        name="discountPercentage"
                                        placeholder="Discount %"
                                        value={formData.discountPercentage}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={formData.isActive}
                                                onChange={handleInputChange}
                                            />
                                            <span>Active</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                name="isSaleFlag"
                                                checked={formData.isSaleFlag}
                                                onChange={handleInputChange}
                                            />
                                            <span>Sale</span>
                                        </label>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded">
                                            Cancel
                                        </button>
                                        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
                                            {editingDiscount ? 'Update' : 'Add'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
