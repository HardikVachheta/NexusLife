// src/App.jsx
import { Plus, Search, X } from 'lucide-react';
import { useState } from 'react';
// import { governmentWebsites } from './data';
const Button = ({ onClick, disabled, className, children, ...props }) => (
    <button {...props} onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-lg font-semibold ${className}`}>{children}</button>
);
const Input = ({ className, ...props }) => <input {...props} className={`w-full px-4 py-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} />;

function GovJob() {
    const governmentWebsites = [
    {
      id: 7,
      name: "Maru Gujarat",
      logo: "https://www.marugujarat.in/wp-content/uploads/2023/10/mg-new-logo-min-black.webp",
      url: "https://www.marugujarat.in/",
    },
    {
      id: 8,
      name: "IBPS",
      logo: "https://reliableacademy.com/assets/images/study_material/study/image/436-4365026_ibps-logo-hd-png-download-png-download-ibpsc119a76386d561566ab60affc186b1a1.png",
      url: "https://www.ibps.in/index.php/recruitment/",
    },
    {
      id: 9,
      name: "RRB Ahmedabad",
      logo: "https://pbs.twimg.com/profile_images/1839320027201417224/QHW4gcbK_400x400.jpg",
      url: "https://rrbahmedabad.gov.in/exams/",
    },
    {
      id: 10,
      name: "NTPC Careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/National_Thermal_Power_logo.svg",
      url: "https://ntpc.co.in/en/jobs-ntpc",
    },
    {
      id: 11,
      name: "BISAG-N",
      logo: "https://bisag-n.gov.in/images/logos/bisag_logo.png",
      url: "https://bisag-n.gov.in/",
    },
    {
      id: 9,
      name: "RRB Ahmedabad",
      logo: "https://pbs.twimg.com/profile_images/1839320027201417224/QHW4gcbK_400x400.jpg",
      url: "https://rrbahmedabad.gov.in/exams/",
    },
    {
      id: 10,
      name: "NTPC Careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/National_Thermal_Power_logo.svg",
      url: "https://ntpc.co.in/en/jobs-ntpc",
    },
    {
      id: 8,
      name: "IBPS",
      logo: "https://reliableacademy.com/assets/images/study_material/study/image/436-4365026_ibps-logo-hd-png-download-png-download-ibpsc119a76386d561566ab60affc186b1a1.png",
      url: "https://www.ibps.in/index.php/recruitment/",
    },
    {
      id: 9,
      name: "RRB Ahmedabad",
      logo: "https://pbs.twimg.com/profile_images/1839320027201417224/QHW4gcbK_400x400.jpg",
      url: "https://rrbahmedabad.gov.in/exams/",
    },
    {
      id: 10,
      name: "NTPC Careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/National_Thermal_Power_logo.svg",
      url: "https://ntpc.co.in/en/jobs-ntpc",
    },
    {
      id: 11,
      name: "BISAG-N",
      logo: "https://bisag-n.gov.in/images/logos/bisag_logo.png",
      url: "https://bisag-n.gov.in/",
    },
    {
      id: 9,
      name: "RRB Ahmedabad",
      logo: "https://pbs.twimg.com/profile_images/1839320027201417224/QHW4gcbK_400x400.jpg",
      url: "https://rrbahmedabad.gov.in/exams/",
    },
    {
      id: 10,
      name: "NTPC Careers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/National_Thermal_Power_logo.svg",
      url: "https://ntpc.co.in/en/jobs-ntpc",
    },
    {
      id: 11,
      name: "BISAG-N",
      logo: "https://bisag-n.gov.in/images/logos/bisag_logo.png",
      url: "https://bisag-n.gov.in/",
    },
  ];
  const [websites, setWebsites] = useState(governmentWebsites);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  

  // Filter websites based on the search query
  const filteredWebsites = websites.filter((website) =>
    website.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to add a new website to the list
  const addWebsite = (newWebsite) => {
    // We create a new ID for the new item
    const newId = websites.length > 0 ? Math.max(...websites.map(w => w.id)) + 1 : 1;
    setWebsites([...websites, { id: newId, ...newWebsite }]);
    setShowForm(false); // Close the modal
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      
      {/* Sticky header with search bar and button */}
      <div className="sticky top-0 z-10 bg-gray-100 pb-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">
          Government Job Application Websites
        </h1>

        <div className=" flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-grow">
                <Input
                    type="text"
                    placeholder="Search websites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border border-gray-300"
                />
                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
            <Button
                onClick={() => setShowForm(true)}
                style={{color:"white",backgroundColor:'Highlight'}}
                className="hidden sm:flex font-semibold hover:bg-gray-100 transition disabled:opacity-50"
            >
                  Add New Website
            </Button>
            <button
                onClick={() => setShowForm(true)}
                className="sm:hidden bg-white text-blue-500 font-semibold hover:bg-gray-100 transition disabled:opacity-50 p-2 rounded-full"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredWebsites.length > 0 ? (
          filteredWebsites.map((website) => (
            <a
              key={website.id}
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center text-center"
            >
              <img
                src={website.logo}
                alt={`${website.name} logo`}
                className="h-20 w-auto mb-4 object-contain"
              />
              <h2 className="text-xl font-semibold text-gray-800 hover:text-violet-500">{website.name}</h2>
            </a>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No websites found.
          </p>
        )}
      </div>

      {/* The modal popup form */}
      {showForm && (
        <AddWebsiteForm
          onClose={() => setShowForm(false)}
          onAdd={addWebsite}
        />
      )}
    </div>
  );
}

// src/AddWebsiteForm.jsx
// import { useState } from 'react';

function AddWebsiteForm({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && url && logo) {
      onAdd({ name, url, logo });
      setName('');
      setUrl('');
      setLogo('');
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-20">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg w-full m-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Government Website</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
            <X /> 
        </button>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-gray-700 font-medium mb-1">URL</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., https://www.example.gov"
              required
            />
          </div>
          <div>
            <label htmlFor="logo" className="block text-gray-700 font-medium mb-1">Logo URL</label>
            <input
              type="url"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., https://www.example.gov/logo.png"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors"
          >
            Add Website
          </button>
        </form>
      </div>
    </div>
  );
}

export default GovJob;