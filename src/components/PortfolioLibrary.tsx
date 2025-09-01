import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { FilterControls } from './FilterControls';
import { LoadingState, ErrorState, EmptyState } from './LoadingState';
import { projectApi, type Project } from '../utils/api';
import { FALLBACK_PROJECTS, FALLBACK_TAGS } from '../utils/constants';

export function PortfolioLibrary() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTopOnly, setShowTopOnly] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  // Load projects and tags from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingFallbackData(false);
        
        console.log('Starting to load portfolio data...');
        
        // Try to load data from API
        const [projectsData, tagsData] = await Promise.all([
          projectApi.getProjects(),
          projectApi.getTags()
        ]);
        
        console.log('Loaded projects from API:', projectsData);
        console.log('Loaded tags from API:', tagsData);
        
        // Validate and use API data if available
        if (Array.isArray(projectsData) && projectsData.length > 0) {
          setProjects(projectsData);
          setAvailableTags(Array.isArray(tagsData) ? tagsData : []);
          console.log('Using API data successfully');
        } else {
          throw new Error('No projects returned from API');
        }
      } catch (err: unknown) {
        console.error('API failed, using fallback data:', err);

        // Immediately use fallback data when API fails
        try {
          console.log('Loading fallback data...');
          console.log('Fallback projects:', FALLBACK_PROJECTS);
          console.log('Fallback tags:', FALLBACK_TAGS);
          
          // Validate fallback data structure
          const validFallbackProjects = FALLBACK_PROJECTS.filter(project => {
            const isValid = project && 
              typeof project === 'object' && 
              typeof project.title === 'string' && 
              project.title.length > 0 &&
              Array.isArray(project.tags) &&
              Array.isArray(project.category);
            
            if (!isValid) {
              console.warn('Invalid fallback project:', project);
            }
            return isValid;
          });
          
          if (validFallbackProjects.length > 0) {
            setProjects(validFallbackProjects);
            setAvailableTags(Array.isArray(FALLBACK_TAGS) ? FALLBACK_TAGS : []);
            setUsingFallbackData(true);
            setError(null); // Clear any error since fallback worked
            console.log(`Successfully loaded ${validFallbackProjects.length} fallback projects`);
          } else {
            throw new Error('Fallback data validation failed');
          }
        } catch (fallbackError: unknown) {
          console.error('Fallback data also failed:', fallbackError);
          const message = fallbackError instanceof Error ? fallbackError.message : 'Unknown error';
          setError(`Unable to load project data: ${message}`);
          setProjects([]);
          setAvailableTags([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects) || projects.length === 0) {
      return [];
    }

    return projects.filter(project => {
      try {
        // Basic validation - projects should already be validated by the API transformation
        if (!project || typeof project !== 'object') return false;
        
        // Category filter - check if any selected category matches any project category
        if (selectedCategories.length > 0) {
          const projectCategories = Array.isArray(project.category) ? project.category : [project.category];
          const hasMatchingCategory = selectedCategories.some(selectedCategory =>
            projectCategories.includes(selectedCategory)
          );
          if (!hasMatchingCategory) return false;
        }
        
        // Year filter
        if (selectedYear !== 'All') {
          const projectYear = typeof project.year === 'number' ? project.year : parseInt(String(project.year || ''));
          const filterYear = parseInt(selectedYear);
          if (isNaN(projectYear) || isNaN(filterYear) || projectYear !== filterYear) return false;
        }
        
        // Theme filter
        if (selectedTheme !== 'All' && project.theme !== selectedTheme) return false;
        
        // Top filter
        if (showTopOnly && !project.is_top) return false;
        
        // Tags filter
        if (selectedTags.length > 0) {
          const projectTags = Array.isArray(project.tags) ? project.tags : [];
          if (!selectedTags.some(tag => projectTags.includes(tag))) return false;
        }
        
        return true;
      } catch (filterError: unknown) {
        console.error('Error filtering project:', project, filterError);
        return false;
      }
    });
  }, [projects, selectedCategories, selectedYear, selectedTheme, selectedTags, showTopOnly]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleProjectClick = (project: Project) => {
    if (!project || !project.title) {
      console.error('Invalid project clicked:', project);
      return;
    }
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Background with glass effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffded] via-[#f8f6e8] to-[#f0ede1]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Inter'] text-6xl md:text-7xl text-[#323232] uppercase tracking-[0.3em] mb-4">
            Portfolio
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#323232] to-transparent mx-auto mb-6" />
          <p className="font-['Anonymous_Pro'] text-[#323232] text-lg uppercase tracking-wider max-w-2xl mx-auto">
            A curated collection of my best work across various disciplines and industries
          </p>
          
          {/* Fallback Data Notice */}
          {usingFallbackData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-yellow-100/20 backdrop-blur-sm border border-yellow-300/30 rounded-lg max-w-lg mx-auto"
            >
              <p className="text-sm text-yellow-700 font-['Anonymous_Pro']">
                ⚠️ Using demo data - Backend temporarily unavailable
              </p>
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterControls
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              availableTags={availableTags}
              showTopOnly={showTopOnly}
              onTopToggle={() => setShowTopOnly(!showTopOnly)}
              view={view}
              onViewChange={setView}
            />
          </div>

          {/* Projects Grid/List */}
          <div className="lg:col-span-3">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Anonymous_Pro'] text-xl text-[#323232] uppercase tracking-wider">
                  {loading ? 'Loading...' : `${filteredProjects.length} Project${filteredProjects.length !== 1 ? 's' : ''} Found`}
                </h3>
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && <LoadingState />}

            {/* Error State - only show if we have no data at all */}
            {error && !usingFallbackData && projects.length === 0 && (
              <ErrorState error={error} onRetry={() => window.location.reload()} />
            )}

            {/* Projects Display */}
            {!loading && projects.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategories.join(',')}-${selectedYear}-${selectedTheme}-${selectedTags.join(',')}-${showTopOnly}-${view}`}
                  className={view === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
                    : "space-y-4"
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, staggerChildren: 0.1 }}
                >
                  {filteredProjects.map((project, index) => {
                    // Projects should be valid now thanks to API transformation
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <ProjectCard project={project} onClick={handleProjectClick} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}

            {/* No Projects Found */}
            {!loading && !error && projects.length > 0 && filteredProjects.length === 0 && <EmptyState />}

            {/* Truly empty state - no projects at all */}
            {!loading && projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#323232]/60 font-['Anonymous_Pro'] text-lg">
                  No projects available. Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
}