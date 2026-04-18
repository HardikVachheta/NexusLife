import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { Search, Plus, X, Trash2 } from 'lucide-react';

import { fetchCompanies } from '../services/companyService';
import { addMails, deleteMails, fetchMailsByType, updateMails } from '../services/mailService';
import Swal from 'sweetalert2';

const MailsSentDetails = () => {
    const { type } = useParams();
    const [mails, setMails] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isBulkOpen, setIsBulkOpen] = useState(false);
    const [bulkText, setBulkText] = useState('');


    const fetchData = async () => {
        try {
            const mailsRes = await fetchMailsByType(type);
            console.log("mailsRes", mailsRes);
            setMails(mailsRes);
        } catch (err) {
            console.error("Error fetching mails: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    useEffect(() => {
        if (!isOpen) return;
        const getCompanies = async () => {
            try {
                const res = await fetchCompanies();
                setCompanies(res);
            } catch {
                toast.error("Failed to fetch companies");
            }
        };
        getCompanies();
    }, [isOpen]);

    const formik = useFormik({
        initialValues: {
            companyId: '',
            email: '',
            date: '',
            description: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            companyId: Yup.string().required('Company is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            date: Yup.date().required('Date is required'),
            description: Yup.string().max(1000, 'Max 1000 characters')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                if (editingId) {
                    console.log("updateMails", editingId, { ...values, type })
                    await updateMails(editingId, { ...values, type });
                    toast.success('Mail updated');
                } else {
                    console.log("addMails", { ...values, type })
                    await addMails({ ...values, type });
                    toast.success('Mail added');
                }
                resetForm();
                setEditingId(null);
                setIsOpen(false);
                fetchData();
            } catch {
                toast.error('Submit failed');
            }
        }
    });

    const openEdit = (mail) => {
        setEditingId(mail._id);
        formik.setValues({
            companyId: mail.companyId?._id || '',
            email: mail.email,
            date: mail.date?.split('T')[0],
            description: mail.description || ''
        });
        setIsOpen(true);
    };

    const openNew = () => {
        formik.resetForm();
        setEditingId(null);
        setIsOpen(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this mail?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e53e3e',
            cancelButtonColor: '#4a5568',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: '#1a202c',
            color: '#e2e8f0',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMails(id)
                    .then(() => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The mail has been successfully deleted.',
                            icon: 'success',
                            background: '#1a202c',
                            color: '#e2e8f0',
                        });
                        fetchData(); // Refresh your list after deletion
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Something went wrong while deleting.',
                            icon: 'error',
                            background: '#1a202c',
                            color: '#e2e8f0',
                        });
                    });
            }
        });
    };

    const filteredMails = mails.filter(mail => {
        const query = searchQuery.toLowerCase();
        return (
            mail.companyId?.name.toLowerCase().includes(query) ||
            mail.email.toLowerCase().includes(query) ||
            (mail.date && formatDate(mail.date).toLowerCase().includes(query))
        );
    });

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'dd/MM/yyyy');
        } catch {
            return 'Invalid Date';
        }
    };

    const handleClose = () => {
        setIsBulkOpen(false);
        setBulkText('');
    };


    return (
        <div className="min-h-screen text-white p-4 sm:p-6">
            <Link to="/" className="hidden sm:inline-block p-2 rounded-md bg-gray-200 text-gray-900 hover:underline">← Back to Dashboard</Link>
            <div className="hidden sm:block mb-4">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                    Mails {type} to Companies
                </h1>
            </div>

            {/* Search & Add - Mobile */}
            <div className="sm:hidden sticky top-0 p-2 z-10 rounded-xl pb-4 flex gap-2 bg-gray-900/70 backdrop-blur-md">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
                    />
                </div>
                <button onClick={openNew} className="bg-white text-blue-500 font-semibold hover:bg-gray-100 p-2 rounded-md ">
                    <Plus size={20} />
                </button>
            </div>

            {/* Search & Add - Desktop */}
            <div className="hidden sm:flex sticky top-0 z-10 flex flex-col sm:flex-row sm:justify-between gap-2 sm:items-center bg-gray-900/80 p-3 rounded-md mb-4">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or date"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
                    />
                </div>
                <div className="flex gap-2">
                    <button onClick={openNew} className="bg-blue-600 text-blue-400 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1">
                        <Plus size={16} /> Add Company
                    </button>
                    <button onClick={() =>  (true)} className="bg-green-600 text-green-500 py-2 rounded-md hover:bg-green-700 flex items-center gap-1">
                        <Plus size={16} /> Bulk Add
                    </button>
                </div>
            </div>

            {/* Table - Desktop */}
            <div className="hidden sm:block overflow-x-auto bg-gray-800 rounded-md">
                <table className="min-w-full table-auto text-sm text-left text-gray-300">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Company Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMails.map((mail, index) => (
                            <tr key={mail._id || index} className="border-t border-gray-700 hover:bg-gray-700/30">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{mail.companyId?.name}</td>
                                <td className="px-4 py-3">{mail.email}</td>
                                <td className="px-4 py-3">{formatDate(mail.date)}</td>
                                <td className="px-4 py-3 flex gap-3">
                                    <button onClick={() => openEdit(mail)} className="text-blue-400 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(mail._id)} className="text-red-500 hover:text-red-600">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredMails.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">No matching records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Cards - Mobile */}
            <div className="space-y-4 sm:hidden mt-4">
                {filteredMails.map((mail, index) => (
                    <div key={mail._id || index} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-semibold">{mail.companyId?.name}</div>
                            <div className="text-gray-300 text-sm">#{index + 1}</div>
                        </div>
                        <div className="text-gray-400 text-sm break-words mb-2">{mail.email}</div>
                        <div className="flex justify-between text-sm">
                            <div className="text-gray-500">Date: {formatDate(mail.date)}</div>
                            <div className="flex gap-3">
                                <button onClick={() => openEdit(mail)} className="bg-white text-blue-500 font-semibold hover:bg-gray-100">Edit</button>
                                <button onClick={() => handleDelete(mail._id)} className="text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredMails.length === 0 && (
                    <div className="text-center text-gray-500">No matching records found.</div>
                )}
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-gray-800 w-full max-w-md mx-4 p-6 rounded-lg border border-gray-600 relative">
                        <button onClick={() => { setIsOpen(false); setEditingId(null); }} className="absolute top-3 right-3 text-gray-600 hover:text-white">
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Mail" : "Add New Mail"}</h2>
                        <form className="space-y-4" onSubmit={formik.handleSubmit}>
                            <div>
                                <label className="block mb-1">Select Company</label>
                                <select
                                    name="companyId"
                                    value={formik.values.companyId}
                                    onChange={formik.handleChange}
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                                >
                                    <option value="">-- Select Company --</option>
                                    {companies.map(company => (
                                        <option key={company._id} value={company._id}>{company.name}</option>
                                    ))}
                                </select>
                                {formik.touched.companyId && formik.errors.companyId && (
                                    <p className="text-red-400 text-sm">{formik.errors.companyId}</p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Email *'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-400 text-sm">{formik.errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                                />
                                {formik.touched.date && formik.errors.date && (
                                    <p className="text-red-400 text-sm">{formik.errors.date}</p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    placeholder='Description *'
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <p className="text-red-400 text-sm">{formik.errors.description}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => { setIsOpen(false); setEditingId(null); }} className="px-4 py-2 text-blue-400 rounded border">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-blue-400 rounded hover:bg-blue-900">
                                    {editingId ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isBulkOpen && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-gray-800 w-full max-w-lg mx-4 p-6 rounded-lg border border-gray-600 relative">
                        <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Bulk Add Mails</h2>
                        <textarea
                            rows={10}
                            placeholder={`Paste data like:\nEmail: someone@example.com\nDate: 09-May-2025 18:39:22`}
                            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md"
                            value={bulkText}
                            onChange={(e) => setBulkText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 text-gray-500 rounded border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        const regex = /Email:\s*(.+?)\s*Date:\s*(.+?)(?=Email:|$)/gs;
                                        const parsed = [];
                                        let match;
                                        while ((match = regex.exec(bulkText)) !== null) {
                                            parsed.push({
                                                email: match[1].trim(),
                                                date: new Date(match[2].trim()).toISOString(),
                                                type,
                                            });
                                        }

                                        if (parsed.length === 0) {
                                            toast.error("No valid data found.");
                                            return;
                                        }

                                        for (const item of parsed) {
                                            console.log("item", item);
                                            await addMails(item);
                                        }

                                        toast.success(`${parsed.length} mails added!`);
                                        setIsBulkOpen(false);
                                        setBulkText('');
                                        fetchData();
                                    } catch (err) {
                                        console.error(err);
                                        toast.error("Bulk upload failed");
                                    }
                                }}
                                className="px-4 py-2 bg-green-600 text-green-500 rounded hover:bg-green-700"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MailsSentDetails;
