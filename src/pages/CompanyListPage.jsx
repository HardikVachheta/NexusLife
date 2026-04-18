// import React, { useState, useEffect, useMemo } from 'react';
// import { Search, AlertCircle, Plus } from "lucide-react";
// import { fetchCompanies, addCompany } from '../services/companyService';
// import { useNavigate } from 'react-router-dom';
// // import { Navigate } from 'react-router-dom';

// const Button = ({ onClick, disabled, className, children, ...props }) => (
//     <button {...props} onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-lg font-semibold ${className}`}>{children}</button>
// );
// const JobButton = ({ onClick, disabled, className, children, ...props }) => (
//     <button {...props} onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-lg font-semibold w-full mt-4 bg-gray-800 text-blue-500 border border-gray-700
//                hover:bg-gray-100 hover:text-black hover:border-gray-100
//                transition-colors duration-300 ease-in-out${className}`}>{children}</button>
// );

// export const extractDomainName = (url) => {
//     try {
//         const urlObject = new URL(url);
//         const hostnameParts = urlObject.hostname.split('.');
//         return hostnameParts.length > 2
//             ? hostnameParts[hostnameParts.length - 2]
//             : hostnameParts[0];
//     } catch (error) {
//         return null;
//     }
// };
// const Card = ({ className, children, ...props }) => <div {...props} className={className}>{children}</div>;
// const CardContent = ({ className, children, ...props }) => <div {...props} className={className}>{children}</div>;
// const CardHeader = ({ className, children, ...props }) => <div {...props} className={className}>{children}</div>;
// const CardTitle = ({ className, children, ...props }) => <h3 {...props} className={className}>{children}</h3>;
// const Alert = ({ variant = 'default', className, children, ...props }) => {
//     const baseClass = "relative w-full rounded-md border p-4";
//     const variantClasses = variant === 'destructive'
//         ? 'bg-red-100 text-red-700 border-red-300'
//         : 'bg-blue-100 text-blue-700 border-blue-300';
//     return <div {...props} className={`${baseClass} ${variantClasses} ${className}`} role="alert">{children}</div>;
// };
// const AlertTitle = ({ className, children, ...props }) => <h4 {...props} className={`text-lg font-bold ${className}`} >{children}</h4>;
// const AlertDescription = ({ className, children, ...props }) => <p {...props} className={`text-sm ${className}`} >{children}</p>;
// const Modal = ({ show, onClose, children }) => {
//     if (!show) return null;
//     return (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg relative">
//                 <button onClick={onClose} className="absolute top-2 right-3 text-red-500 text-2xl font-bold">&times;</button>
//                 {children}
//             </div>
//         </div>
//     );
// };
// const Input = ({ className, ...props }) => <input {...props} className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} />;

// const CompanyListPage = () => {
//     const [companyList, setCompanyList] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         logoUrl: '',
//         website: '',
//         phoneNumber: '',
//         address: ''
//     });

//     const navigate = useNavigate();


//     useEffect(() => {
//         setLoading(true);
//         const timer = setTimeout(() => setLoading(false), 1000);
//         return () => clearTimeout(timer);
//     }, []);

//     useEffect(() => {
//         const getCompanies = async () => {
//             setLoading(true);
//             try {
//                 const data = await fetchCompanies();
//                 console.log("compnay list : ", data);
//                 setCompanyList(data);
//             } catch (err) {
//                 setError("Failed to load companies");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getCompanies();
//     }, []);

//     const filteredList = useMemo(() => {
//         return companyList.filter(company =>
//             company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (company.address || '').toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [searchTerm, companyList]);

//     const handleAddCompany = async () => {
//         if (!formData.name) return alert("Company name is required");
//         try {
//             const newCompany = await addCompany(formData);
//             setCompanyList(prev => [...prev, newCompany]);
//             setFormData({ name: '', logoUrl: '', website: '', phoneNumber: '', address: '' });
//             setShowModal(false);
//         } catch (err) {
//             alert("Failed to add company");
//         }
//     };

//     return (
//         <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen tex  t-white p-4">
//             <header className="text-center mb-10">
//                 <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
//                     Company Explorer
//                 </h1>
//                 <p className="text-gray-400 mt-2">Discover businesses, their services, and contact details</p>
//             </header>

//             {/* Search & Add Button Row */}
//             <div className="sticky top-0 z-10 bg-gray-950 py-4 mb-6">
//                 <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto px-2">
//                     <div className="relative flex-grow">
//                         <Input
//                             type="text"
//                             placeholder="Search companies..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="pr-10"
//                         />
//                         <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
//                     </div>
//                     <Button
//                         onClick={() => setShowModal(true)}
//                         className="hidden sm:flex bg-white text-blue-500 font-semibold hover:bg-gray-100 transition disabled:opacity-50"
//                     >
//                         Add Company
//                     </Button>
//                     <button
//                         onClick={() => setShowModal(true)}
//                         className="sm:hidden bg-white text-blue-500 font-semibold hover:bg-gray-100 transition disabled:opacity-50 p-2 rounded-full"
//                     >
//                         <Plus className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>

//             {/* Error Display */}
//             {error && (
//                 <Alert variant="destructive" className="mb-6">
//                     <div className="flex items-start space-x-2">
//                         <AlertCircle className="w-5 h-5 mt-1 text-red-500" />
//                         <div>
//                             <AlertTitle>Error</AlertTitle>
//                             <AlertDescription>{error}</AlertDescription>
//                         </div>
//                     </div>
//                 </Alert>
//             )}

//             {/* Modal Form */}
//             <Modal show={showModal} onClose={() => setShowModal(false)}>
//                 <h2 className="text-2xl font-bold mb-4 text-center">Add New Company</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Input placeholder="Company Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
//                     <Input placeholder="Logo URL" value={formData.logoUrl} onChange={e => setFormData({ ...formData, logoUrl: e.target.value })} />
//                     <Input placeholder="Website" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} />
//                     <Input placeholder="Phone Number" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
//                     <Input placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
//                 </div>
//                 <div className="text-center mt-6">
//                     <Button onClick={handleAddCompany} className="bg-white text-blue-500 font-semibold hover:bg-gray-100">
//                         Save Company
//                     </Button>
//                 </div>
//             </Modal>

//             {/* Company Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {loading ? (
//                     [...Array(8)].map((_, i) => (
//                         <div key={i} className="p-6 rounded-xl bg-gray-800 shadow-md space-y-4 animate-pulse">
//                             <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
//                             <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
//                             <div className="h-4 w-full bg-gray-700 rounded"></div>
//                             <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
//                             <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
//                         </div>
//                     ))
//                 ) : (
//                     filteredList.map((company, index) => (
//                         <Card
//                             key={index}
//                             className="p-6 rounded-xl bg-gray-900 border border-gray-700 hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col"
//                         >
//                             <CardHeader className="mb-4 flex flex-col items-center text-center">
//                                 {company.logoUrl && (
//                                     <div className="w-full sm:w-55 h-32 mb-4 bg-white rounded-xl flex items-center justify-center shadow-sm">
//                                         <img
//                                             src={company.logoUrl}
//                                             alt={`${company.name} Logo`}
//                                             className="max-w-[70%] max-h-[70%] object-contain"
//                                         />
//                                     </div>
//                                 )}
//                                 <CardTitle className="text-xl font-semibold">{company.name}</CardTitle>
//                             </CardHeader>
//                             <CardContent className="space-y-2 text-sm text-gray-300 flex-grow">
//                                 <p><strong className="text-white">Website:</strong>{' '}
//                                     {company.website ? (
//                                         <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//                                             {company.website}
//                                         </a>
//                                     ) : 'N/A'}
//                                 </p>
//                                 <p><strong className="text-white">Phone:</strong> {company.phoneNumber || 'N/A'}</p>
//                                 <p><strong className="text-white">Address:</strong> {company.address || 'N/A'}</p>
//                             </CardContent>
//                             <button
//                                 onClick={() => navigate(`/company/${company._id}/jobs`)}
//                                 className="..." // your existing classes
//                             >
//                                 Job Details
//                             </button>
//                             {/* <JobButton onClick={() => navigate(`/job-detail/${extractDomainName(company.website)}`)}>
//                                 Job Details
//                             </JobButton> */}
//                         </Card>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CompanyListPage;
import React, { useState, useEffect, useMemo } from 'react';
import { Search, AlertCircle, Plus } from "lucide-react";
import { fetchCompanies, addCompany } from '../services/companyService';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

const Button = ({ onClick, disabled, className, children, ...props }) => (
    <button {...props} onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-lg font-semibold ${className}`}>{children}</button>
);
const JobButton = ({ onClick, disabled, className, children, ...props }) => (
    <button {...props} onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-lg font-semibold w-full mt-4 bg-gray-800 text-blue-500 border border-gray-700
               hover:bg-gray-100 hover:text-black hover:border-gray-100
               transition-colors duration-300 ease-in-out${className}`}>{children}</button>
);

export const extractDomainName = (url) => {
    try {
        const urlObject = new URL(url);
        const hostnameParts = urlObject.hostname.split('.');
        return hostnameParts.length > 2
            ? hostnameParts[hostnameParts.length - 2]
            : hostnameParts[0];
    } catch (error) {
        return null;
    }
};
const Card = ({ className, children, ...props }) => <div {...props} className={className}>{children}</div>;
const CardContent = ({ className, children, ...props }) => <div {...props} className={className}>{children}</div>;
const CardHeader = ({ className, children, ...props }) => <div {...props} className={className}>{children}</div>;
const CardTitle = ({ className, children, ...props }) => <h3 {...props} className={className}>{children}</h3>;
const Alert = ({ variant = 'default', className, children, ...props }) => {
    const baseClass = "relative w-full rounded-md border p-4";
    const variantClasses = variant === 'destructive'
        ? 'bg-red-100 text-red-700 border-red-300'
        : 'bg-blue-100 text-blue-700 border-blue-300';
    return <div {...props} className={`${baseClass} ${variantClasses} ${className}`} role="alert">{children}</div>;
};
const AlertTitle = ({ className, children, ...props }) => <h4 {...props} className={`text-lg font-bold ${className}`} >{children}</h4>;
const AlertDescription = ({ className, children, ...props }) => <p {...props} className={`text-sm ${className}`} >{children}</p>;
const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-2 right-3 text-red-500 text-2xl font-bold">&times;</button>
                {children}
            </div>
        </div>
    );
};
const Input = ({ className, ...props }) => <input {...props} className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} />;

const CompanyListPage = () => {
    const [companyList, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        logoUrl: '',
        website: '',
        phoneNumber: '',
        address: ''
    });

    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const getCompanies = async () => {
            setLoading(true);
            try {
                const data = await fetchCompanies();
                console.log("compnay list : ", data);
                setCompanyList(data);
            } catch (err) {
                setError("Failed to load companies");
            } finally {
                setLoading(false);
            }
        };
        getCompanies();
    }, []);

    const filteredList = useMemo(() => {
        return companyList.filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (company.address || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, companyList]);

    const handleAddCompany = async () => {
        if (!formData.name) return alert("Company name is required");
        try {
            const newCompany = await addCompany(formData);
            setCompanyList(prev => [...prev, newCompany]);
            setFormData({ name: '', logoUrl: '', website: '', phoneNumber: '', address: '' });
            setShowModal(false);
        } catch (err) {
            alert("Failed to add company");
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen tex  t-white p-4">
            <header className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    Company Explorer
                </h1>
                <p className="text-gray-400 mt-2">Discover businesses, their services, and contact details</p>
            </header>

            {/* Search & Add Button Row */}
            <div className="sticky top-0 z-10 bg-gray-950 py-4 mb-6">
                <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto px-2">
                    <div className="relative flex-grow">
                        <Input
                            type="text"
                            placeholder="Search companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pr-10"
                        />
                        <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    </div>
                    <Button
                        onClick={() => setShowModal(true)}
                        className="hidden sm:flex bg-white text-blue-500 font-semibold hover:bg-gray-100 transition disabled:opacity-50"
                    >
                        Add Company
                    </Button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="sm:hidden bg-white text-blue-500 font-semibold hover:bg-gray-100 transition disabled:opacity-50 p-2 rounded-full"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 mt-1 text-red-500" />
                        <div>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </div>
                    </div>
                </Alert>
            )}

            {/* Modal Form */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-2xl font-bold mb-4 text-center">Add New Company</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Company Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <Input placeholder="Logo URL" value={formData.logoUrl} onChange={e => setFormData({ ...formData, logoUrl: e.target.value })} />
                    <Input placeholder="Website" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} />
                    <Input placeholder="Phone Number" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
                    <Input placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="text-center mt-6">
                    <Button onClick={handleAddCompany} className="bg-white text-blue-500 font-semibold hover:bg-gray-100">
                        Save Company
                    </Button>
                </div>
            </Modal>

            {/* Company Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    [...Array(8)].map((_, i) => (
                        <div key={i} className="p-6 rounded-xl bg-gray-800 shadow-md space-y-4 animate-pulse">
                            <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
                            <div className="h-4 w-full bg-gray-700 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
                            <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                        </div>
                    ))
                ) : (
                    filteredList.map((company, index) => (
                        <Card
                            key={index}
                            className="p-6 rounded-xl bg-gray-900 border border-gray-700 hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col"
                        >
                            <CardHeader className="mb-4 flex flex-col items-center text-center">
                                {company.logoUrl && (
                                    <div className="w-full sm:w-55 h-32 mb-4 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <img
                                            src={company.logoUrl}
                                            alt={`${company.name} Logo`}
                                            className="max-w-[70%] max-h-[70%] object-contain"
                                        />
                                    </div>
                                )}
                                <CardTitle className="text-xl font-semibold">{company.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-gray-300 flex-grow">
                                <p><strong className="text-white">Website:</strong>{' '}
                                    {company.website ? (
                                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                            {company.website}
                                        </a>
                                    ) : 'N/A'}
                                </p>
                                <p><strong className="text-white">Phone:</strong> {company.phoneNumber || 'N/A'}</p>
                                <p><strong className="text-white">Address:</strong> {company.address || 'N/A'}</p>
                            </CardContent>
                            <button
                                onClick={() => navigate(`/company/${company._id}/jobs`)}
                                className="px-4 py-2 rounded-lg font-semibold w-full mt-4 bg-gray-800 text-blue-500 border border-gray-700 hover:bg-gray-100 hover:text-black hover:border-gray-100 transition-colors duration-300 ease-in-out"
                            >
                                Job Details
                            </button>
                            {/* <JobButton onClick={() => navigate(`/job-detail/${extractDomainName(company.website)}`)}>
                                Job Details
                            </JobButton> */}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default CompanyListPage;

