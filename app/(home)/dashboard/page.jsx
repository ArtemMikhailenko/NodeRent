"use client";

import { useCallback, useEffect, useState } from "react";


// Dashboard page component
export default function Dashboard() {
  const { data, loading } = useDashboardPage();
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // "all", "active", "ended"
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeNodeMenu, setActiveNodeMenu] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleSelectAll = () => {
    if (selectedNodes.length === filteredNodes.length) {
      setSelectedNodes([]);
    } else {
      setSelectedNodes(filteredNodes.map(node => node.id));
    }
  };
  
  const toggleNodeSelection = (nodeId) => {
    if (selectedNodes.includes(nodeId)) {
      setSelectedNodes(selectedNodes.filter(id => id !== nodeId));
    } else {
      setSelectedNodes([...selectedNodes, nodeId]);
    }
  };

  const filteredNodes = data.filter(node => {
    // Filter by status
    if (filterStatus === "active" && node["Project Status"] !== "Active") return false;
    if (filterStatus === "ended" && node["Project Status"] === "Active") return false;
    
    // Filter by search term
    if (searchTerm && !node.node_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });
  
  // Sort nodes
  const sortedNodes = [...filteredNodes].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.Created) - new Date(a.Created);
    } else if (sortBy === "oldest") {
      return new Date(a.Created) - new Date(b.Created);
    } else if (sortBy === "name") {
      return a.node_name.localeCompare(b.node_name);
    } else if (sortBy === "status") {
      // Active nodes first, then inactive
      if (a["Project Status"] === "Active" && b["Project Status"] !== "Active") return -1;
      if (a["Project Status"] !== "Active" && b["Project Status"] === "Active") return 1;
      return 0;
    }
    return 0;
  });
  
  const handleProlongate = (nodeIds) => {
    console.log("Prolongating nodes:", nodeIds || selectedNodes);
    // Implement your prolongate logic here
    alert(`Prolongating ${nodeIds ? nodeIds.length : selectedNodes.length} nodes`);
    // Close any open menus after action
    setActiveNodeMenu(null);
  };

  // Effect to close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu-container') && !e.target.closest('.mobile-menu-trigger')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);
  
  return (
    <div className="flex flex-col p-3 sm:p-4 lg:p-6 text-white min-h-screen  relative overflow-hidden">
      
      
      <div className="mx-auto w-full max-w-7xl relative z-10">
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-white ">Dashboard.</h1>
          
          {/* Mobile menu trigger */}
          <button 
            className="p-2 rounded-lg bg-midnight-800/90 md:hidden mobile-menu-trigger border border-indigo-900/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path className={`transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              <path className={`transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mb-6 mobile-menu-container`}>
          <div className="bg-midnight-800/90 rounded-lg p-4 backdrop-blur-md border border-indigo-900/30 shadow-lg space-y-4">
            <div className="flex items-center px-3 py-2 bg-midnight-900/80 rounded-lg">
              <input 
                type="checkbox" 
                className="mr-2 w-4 h-4 accent-indigo-600 cursor-pointer"
                checked={selectedNodes.length > 0 && selectedNodes.length === filteredNodes.length}
                onChange={toggleSelectAll}
              />
              <span className="text-white font-medium">{selectedNodes.length} / {filteredNodes.length}</span>
            </div>
            
            <div className="relative">
              <button 
                className="bg-midnight-800/90 hover:bg-midnight-700/90 rounded-lg px-3 py-2 flex items-center justify-between w-full"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <span className="font-medium">{filterStatus === "all" ? "All nodes" : filterStatus === "active" ? "Active nodes" : "Ended nodes"}</span>
                <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${showFilterMenu ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-2 bg-midnight-800/95 rounded-lg shadow-xl w-full overflow-hidden z-10 animate-fadeIn backdrop-blur-sm border border-indigo-900/50">
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer ${filterStatus === "all" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setFilterStatus("all"); setShowFilterMenu(false); }}
                  >
                    All nodes
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer ${filterStatus === "active" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setFilterStatus("active"); setShowFilterMenu(false); }}
                  >
                    Active nodes
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer ${filterStatus === "ended" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setFilterStatus("ended"); setShowFilterMenu(false); }}
                  >
                    Ended nodes
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search by name or url" 
                className="bg-midnight-800/90 rounded-lg px-3 py-2 w-full outline-none border border-indigo-900/30 focus:border-indigo-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <button 
                className="bg-midnight-800/90 hover:bg-midnight-700/90 rounded-lg px-3 py-2 flex items-center justify-between w-full"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <span className="font-medium">
                  {sortBy === "newest" && "Newest first"}
                  {sortBy === "oldest" && "Oldest first"}
                  {sortBy === "name" && "By name"}
                  {sortBy === "status" && "By status"}
                </span>
                <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${showSortMenu ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showSortMenu && (
                <div className="absolute top-full right-0 mt-2 bg-midnight-800/95 rounded-lg shadow-xl w-full overflow-hidden z-10 animate-fadeIn backdrop-blur-sm border border-indigo-900/50">
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer ${sortBy === "newest" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setSortBy("newest"); setShowSortMenu(false); }}
                  >
                    Newest first
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer ${sortBy === "oldest" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setSortBy("oldest"); setShowSortMenu(false); }}
                  >
                    Oldest first
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer ${sortBy === "name" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setSortBy("name"); setShowSortMenu(false); }}
                  >
                    By name
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer ${sortBy === "status" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setSortBy("status"); setShowSortMenu(false); }}
                  >
                    By status
                  </div>
                </div>
              )}
            </div>
            
            {selectedNodes.length > 0 && (
              <button 
                onClick={() => handleProlongate()}
                className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg shadow-indigo-600/20 w-full flex items-center justify-center"
              >
                <span className="relative z-10">Prolongate Selected ({selectedNodes.length})</span>
              </button>
            )}
            
            <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 px-3 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg shadow-indigo-600/20 w-full flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Deploy New Node</span>
            </button>
          </div>
        </div>
        
        {/* Desktop controls */}
        <div className="hidden md:flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center px-5 py-3 bg-midnight-900/80 rounded-lg backdrop-blur-sm border border-indigo-900/30 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300">
              <input 
                type="checkbox" 
                className="mr-2 w-4 h-4 accent-indigo-600 cursor-pointer"
                checked={selectedNodes.length > 0 && selectedNodes.length === filteredNodes.length}
                onChange={toggleSelectAll}
              />
              <span className="text-white font-medium">{selectedNodes.length} / {filteredNodes.length}</span>
            </div>
            
            <div className="relative">
              <button 
                className="bg-midnight-800/90 hover:bg-midnight-700/90 rounded-lg px-5 py-3 flex items-center justify-between min-w-[160px] transition-all duration-300 backdrop-blur-sm border border-indigo-900/30 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/20"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <span className="font-medium">{filterStatus === "all" ? "All nodes" : filterStatus === "active" ? "Active nodes" : "Ended nodes"}</span>
                <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${showFilterMenu ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-2 bg-midnight-800/95 rounded-lg shadow-xl w-[160px] overflow-hidden z-10 animate-fadeIn backdrop-blur-sm border border-indigo-900/50">
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer transition-colors duration-200 ${filterStatus === "all" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setFilterStatus("all"); setShowFilterMenu(false); }}
                  >
                    All nodes
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer transition-colors duration-200 ${filterStatus === "active" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setFilterStatus("active"); setShowFilterMenu(false); }}
                  >
                    Active nodes
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer transition-colors duration-200 ${filterStatus === "ended" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setFilterStatus("ended"); setShowFilterMenu(false); }}
                  >
                    Ended nodes
                  </div>
                </div>
              )}
            </div>
            
            {selectedNodes.length > 0 && (
              <button 
                onClick={() => handleProlongate()}
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 relative overflow-hidden group"
              >
                <span className="relative z-10">Prolongate</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 bg-gradient-to-tr from-indigo-600/0 via-indigo-400/30 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></span>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-shimmer"></div>
              <div className="bg-midnight-800/90 rounded-lg px-5 py-3 min-w-[200px] lg:min-w-[300px] transition-all duration-300 backdrop-blur-sm relative border border-indigo-900/30 group-hover:border-indigo-500/50">
                <input 
                  type="text" 
                  placeholder="Search by name or url" 
                  className="bg-transparent outline-none w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="relative">
              <button 
                className="bg-midnight-800/90 hover:bg-midnight-700/90 rounded-lg px-5 py-3 flex items-center justify-between min-w-[160px] transition-all duration-300 backdrop-blur-sm border border-indigo-900/30 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/20"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <span className="font-medium">
                  {sortBy === "newest" && "Newest first"}
                  {sortBy === "oldest" && "Oldest first"}
                  {sortBy === "name" && "By name"}
                  {sortBy === "status" && "By status"}
                </span>
                <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${showSortMenu ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showSortMenu && (
                <div className="absolute top-full right-0 mt-2 bg-midnight-800/95 rounded-lg shadow-xl w-[160px] overflow-hidden z-10 animate-fadeIn backdrop-blur-sm border border-indigo-900/50">
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer transition-colors duration-200 ${sortBy === "newest" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setSortBy("newest"); setShowSortMenu(false); }}
                  >
                    Newest first
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer transition-colors duration-200 ${sortBy === "oldest" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setSortBy("oldest"); setShowSortMenu(false); }}
                  >
                    Oldest first
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer transition-colors duration-200 ${sortBy === "name" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setSortBy("name"); setShowSortMenu(false); }}
                  >
                    By name
                  </div>
                  <div 
                    className={`px-4 py-2 hover:bg-midnight-700 cursor-pointer transition-colors duration-200 ${sortBy === "status" ? "bg-indigo-900/70" : ""}`}
                    onClick={() => { setSortBy("status"); setShowSortMenu(false); }}
                  >
                    By status
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <button className="hidden lg:flex bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 px-6 py-3.5 rounded-lg items-center transition-all duration-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:translate-y-[-2px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
            <svg className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Deploy New Node</span>
          </button>

          {/* Responsive deploy button for medium screens */}
          <button className="lg:hidden md:flex hidden bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 px-4 py-3 rounded-lg items-center transition-all duration-300 shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium ml-2">Deploy</span>
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 border-t-4 border-b-4 border-transparent border-r-4 border-indigo-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
            </div>
          </div>
        ) : (
          <NodesList 
            nodes={sortedNodes} 
            selectedNodes={selectedNodes} 
            toggleNodeSelection={toggleNodeSelection} 
            handleProlongate={handleProlongate}
            activeNodeMenu={activeNodeMenu}
            setActiveNodeMenu={setActiveNodeMenu}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
          />
        )}

        {/* Floating action button for mobile */}
        <div className="md:hidden fixed bottom-6 right-6 z-20">
          <button className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Custom hook to fetch dashboard data
export const useDashboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.noderent.pro/account/dashboard/nodes", {
        method: "GET",
        credentials: "include",
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        setData(Object.values(data.nodes));
      } else {
        console.error("Failed to fetch nodes:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching nodes:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);
  
  return { data, loading };
};

// Nodes list component
const NodesList = ({ nodes, selectedNodes, toggleNodeSelection, handleProlongate, activeNodeMenu, setActiveNodeMenu, hoverIndex, setHoverIndex }) => {
  if (nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-6 sm:mt-10 py-10 sm:py-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-midnight-800 flex items-center justify-center mb-6 relative animate-pulse-custom">
          <div className="absolute inset-0 rounded-full bg-indigo-600/10 animate-ping" style={{ animationDuration: '3s' }}></div>
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          Nothing to show yet
        </span>
        <p className="text-gray-400 mt-2 max-w-md text-center px-4 text-sm sm:text-base">
          After buying nodes you will see them here. Deploy your first node to get started.
        </p>
        <button className="mt-6 sm:mt-8 px-5 py-2.5 sm:px-6 sm:py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-300 font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transform hover:translate-y-[-2px]">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Deploy Your First Node</span>
        </button>
      </div>
    );
  }
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (activeNodeMenu && !e.target.closest('.node-menu-container')) {
        setActiveNodeMenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [activeNodeMenu, setActiveNodeMenu]);
  
  return (
    <div className="space-y-3 sm:space-y-4">
      {nodes.map((node, index) => (
        <div 
          key={index} 
          style={{ 
            animationDelay: `${index * 0.05}s`,
            transform: `translateY(${index * 2}px)`
          }}
          className="animate-fadeIn transition-all duration-300"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <NodeItem 
            node={node} 
            isSelected={selectedNodes.includes(node.id)}
            onSelect={() => toggleNodeSelection(node.id)}
            onProlongate={() => handleProlongate([node.id])}
            isMenuOpen={activeNodeMenu === node.id}
            onToggleMenu={() => setActiveNodeMenu(activeNodeMenu === node.id ? null : node.id)}
            isHovered={hoverIndex === index}
          />
        </div>
      ))}
    </div>
  );
};

// Single node item component
const NodeItem = ({ node, isSelected, onSelect, onProlongate, isMenuOpen, onToggleMenu, isHovered }) => {
  const isActive = node["Project Status"] === "Active";
  
  return (
    <div className={`
      ${isSelected ? 'bg-gradient-to-r from-midnight-800/90 to-indigo-900/20' : 'bg-midnight-900/80'} 
      ${isHovered ? 'scale-[1.01] shadow-lg shadow-indigo-900/20' : 'shadow shadow-indigo-900/10'} 
      rounded-lg p-3 sm:p-4 flex items-center justify-between backdrop-blur-sm
      transition-all duration-300 hover:shadow-md hover:shadow-indigo-900/15 
      ${isSelected ? 'border-l-4 border-indigo-500' : 'border border-indigo-900/30 hover:border-indigo-900/50'}
    `}>
      <div className="flex items-center">
        <input 
          type="checkbox" 
          className="mr-3 sm:mr-4 w-4 h-4 accent-indigo-600 cursor-pointer"
          checked={isSelected}
          onChange={onSelect}
        />
        <div className={`relative w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-3 sm:mr-4 flex items-center justify-center ${isActive ? "bg-green-500" : "bg-red-500"} shadow-lg`}>
          {isActive && (
            <>
              {/* Enhanced outer glow */}
              <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 blur-xl transform scale-[2]"></div>
              
              {/* Enhanced pulse animation with slower, more noticeable animation */}
              <div className="absolute inset-0 rounded-full bg-green-500 opacity-60 animate-[ping_3s_ease-in-out_infinite]"></div>
              
              {/* Enhanced main circle with more vibrant gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 via-green-400 to-emerald-500 opacity-90"></div>
              
              {/* Enhanced highlight effect */}
              <div className="absolute top-0 left-1/4 right-1/4 h-1/3 bg-white opacity-50 rounded-t-full blur-sm"></div>
              
              {/* Enhanced center dot with glow */}
              <div className="relative w-2 h-2 sm:w-3 sm:h-3 bg-green-100 rounded-full z-10 shadow-inner shadow-green-300/50"></div>
            </>
          )}
          {!isActive && (
            <>
              {/* Enhanced outer glow for inactive with subtle animation */}
              <div className="absolute inset-0 rounded-full bg-red-400 opacity-20 blur-lg transform scale-150 animate-pulse"></div>
              
              {/* Enhanced main circle with more vibrant gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-rose-500 opacity-80"></div>
              
              {/* Enhanced center dot */}
              <div className="relative w-2 h-2 sm:w-3 sm:h-3 bg-red-200 rounded-full z-10 shadow-inner shadow-red-500/30"></div>
            </>
          )}
        </div>
        <div>
          <div className="font-medium text-base sm:text-lg flex flex-wrap items-center gap-2">
            <span className="truncate max-w-[120px] sm:max-w-full">{node.node_name || "Nodename From Api #id"}</span>
            {isActive && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-900/50 text-green-300 border border-green-700/50">
                Active
              </span>
            )}
            {!isActive && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-900/50 text-red-300 border border-red-700/50">
                Ended
              </span>
            )}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 flex flex-wrap items-center gap-2">
            <span>{getUptime(node.Created, node["Active Until"])}</span>
            <span className="h-1 w-1 rounded-full bg-gray-500 hidden sm:block"></span>
            <span className="text-indigo-400">${node.monthly || "0"}/month</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-8">
        {/* Time since last check - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 bg-midnight-800/60 px-3 py-1 rounded-full">
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">5 min</span>
        </div>
        
        {/* Uptime graph - adjustable on different screens */}
        <div className="hidden md:block w-44">
          <div className="flex w-full h-4 my-1 bg-midnight-900/60 rounded-full p-[2px] overflow-hidden border border-indigo-900/30">
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-full ${i < 22 ? 'bg-gradient-to-t from-indigo-600 to-indigo-400' : 'bg-midnight-700'} mx-[0.5px] rounded-sm ${i < 22 ? 'hover:bg-indigo-300 hover:scale-y-110' : ''} transition-all duration-200`}
                style={{ height: i < 22 ? `${85 + Math.random() * 15}%` : '40%', transitionDelay: `${i * 20}ms` }}
              />
            ))}
          </div>
          <div className="text-right text-sm text-indigo-400 font-medium">100%</div>
        </div>

        {/* Simplified uptime indicator for smaller screens */}
        <div className="sm:hidden md:hidden flex items-center gap-1 bg-midnight-800/60 px-2 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
          <span className="text-xs">100%</span>
        </div>
        
        <div className="relative node-menu-container">
          <button 
            className={`text-gray-400 hover:text-white transition-colors duration-200 bg-midnight-800/40 hover:bg-midnight-700/60 rounded-full p-1.5 sm:p-2 ${isMenuOpen ? 'text-white bg-indigo-600/40' : ''}`}
            onClick={onToggleMenu}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 bg-midnight-800/95 rounded-lg shadow-xl z-10 min-w-[140px] sm:min-w-[160px] overflow-hidden animate-fadeIn backdrop-blur-md border border-indigo-900/50">
              <div 
                className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-midnight-700 cursor-pointer flex items-center transition-all duration-200 hover:pl-5"
                onClick={onProlongate}
              >
                <div className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-900/60 flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className="text-indigo-300 hover:text-indigo-200 transition-colors duration-200 font-medium text-sm sm:text-base">Prolongate</span>
              </div>
              <div className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-midnight-700 cursor-pointer flex items-center transition-all duration-200 hover:pl-5">
                <div className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-900/60 flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-blue-300 hover:text-blue-200 transition-colors duration-200 font-medium text-sm sm:text-base">Info</span>
              </div>
              <div className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-midnight-700 cursor-pointer flex items-center transition-all duration-200 hover:pl-5 text-red-400 border-t border-midnight-700">
                <div className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-900/60 flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <span className="hover:text-red-300 transition-colors duration-200 font-medium text-sm sm:text-base">Delete</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate uptime display
const getUptime = (createdDate, activeUntilDate) => {
  if (!createdDate || !activeUntilDate) return "1d, 2h";
  
  try {
    // Parse dates (assuming format like "20:27 06.03.2025")
    const createParts = createdDate.split(' ')[1].split('.');
    const createDate = new Date(
      parseInt(createParts[2]), 
      parseInt(createParts[1]) - 1, 
      parseInt(createParts[0])
    );
    
    const now = new Date();
    const diffTime = Math.abs(now - createDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // For periods longer than 60 days, show in months
    if (diffDays > 60) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      return `${months}mo, ${remainingDays}d`;
    } else {
      // For shorter periods, show days and hours
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${diffDays}d, ${hours}h`;
    }
  } catch (e) {
    // Fallback to a default format if date parsing fails
    return "2d, 6h";
  }
};

// Node details modal component (to be shown when clicking on a node)
const NodeDetailsModal = ({ node, onClose }) => {
  if (!node) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
      <div 
        className="bg-gradient-to-br from-midnight-900 to-midnight-800 rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md w-full border border-indigo-900/30 shadow-2xl shadow-indigo-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 truncate max-w-[80%]">{node.node_name}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white bg-midnight-800/60 hover:bg-midnight-700 p-1.5 sm:p-2 rounded-full transition-all duration-200"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          <div className="flex items-center gap-3 sm:gap-4 bg-midnight-800/40 p-3 sm:p-4 rounded-lg border border-indigo-900/20">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-indigo-900/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-blue-500/20 to-indigo-600/20 animate-pulse"></div>
              <span className="text-xl sm:text-2xl font-bold text-indigo-400">
                {(node.node_name || "Node").substring(0, 1).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-medium text-base sm:text-lg">{node.node_name}</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">ID: {node.id}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-4 bg-midnight-800/40 p-3 sm:p-4 rounded-lg border border-indigo-900/20">
            <div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Status</div>
              <div className={node.status ? "text-green-400 font-medium flex items-center text-sm sm:text-base" : "text-red-400 font-medium flex items-center text-sm sm:text-base"}>
                <span className={`inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 ${node.status ? "bg-green-400" : "bg-red-400"}`}></span>
                {node.status ? "Active" : "Inactive"}
              </div>
            </div>
            
            <div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Project Status</div>
              <div className={node["Project Status"] === "Active" ? "text-green-400 font-medium flex items-center text-sm sm:text-base" : "text-red-400 font-medium flex items-center text-sm sm:text-base"}>
                <span className={`inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 ${node["Project Status"] === "Active" ? "bg-green-400" : "bg-red-400"}`}></span>
                {node["Project Status"]}
              </div>
            </div>
            
            <div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Created</div>
              <div className="font-medium text-sm sm:text-base">{node.Created}</div>
            </div>
            
            <div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Active Until</div>
              <div className="font-medium text-sm sm:text-base">{node["Active Until"]}</div>
            </div>
            
            <div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Monthly Cost</div>
              <div className="font-medium text-indigo-300 text-sm sm:text-base">${node.monthly}</div>
            </div>
            
            <div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Uptime</div>
              <div className="font-medium text-sm sm:text-base">100%</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 relative overflow-hidden group">
              <span className="relative z-10">Prolongate</span>
              <span className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></span>
            </button>
            
            <div className="flex gap-2 sm:gap-3">
              <button className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-blue-300 border border-blue-500/30 hover:border-blue-500/50 hover:text-blue-200 text-sm sm:text-base">
                Details
              </button>
              <button className="flex-1 bg-red-600/20 hover:bg-red-600/30 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-red-300 border border-red-500/30 hover:border-red-500/50 hover:text-red-200 text-sm sm:text-base">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};