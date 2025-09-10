import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { LoadingState } from './LoadingState';
import { toast } from 'sonner@2.0.3';
import { Save, RefreshCcw, User, FileText, Link, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface HeroData {
  name: string;
  title: string;
  description: string;
  skills: string;
  expertise: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  contactLink: string;
  image: string;
}

const DEFAULT_HERO_DATA: HeroData = {
  name: 'Artem',
  title: 'Designer & Project Manager',
  description: 'Seeking a position in design or project management where I can help you with project visualization, process optimization, and solving business problems. My goal is to work with a steady stream of orders and clients.',
  skills: 'Graphic and web design • Vibe coding • Zero-code services • AI image/video generation • Project management • Event organization',
  expertise: 'Client communication • Business process optimization • Visual concept creation • Social media promotion',
  primaryButtonText: 'View Portfolio',
  secondaryButtonText: 'Contact Me',
  contactLink: 'https://t.me/artartemev',
  image: ''
};

export function HeroAdmin() {
  const [heroData, setHeroData] = useState<HeroData>(DEFAULT_HERO_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);

  // Load hero data on component mount
  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-32d29310/hero`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setHeroData(result.hero || DEFAULT_HERO_DATA);
        setFallbackMode(result.fallbackMode || false);
        
        if (result.fallbackMode) {
          toast.info('Hero Management', {
            description: result.message || 'Using default hero data'
          });
        }
      } else {
        console.error('Failed to load hero data:', result.error);
        setHeroData(DEFAULT_HERO_DATA);
        setFallbackMode(true);
        toast.error('Error Loading Hero Data', {
          description: result.message || 'Using default data'
        });
      }
    } catch (error) {
      console.error('Error loading hero data:', error);
      setHeroData(DEFAULT_HERO_DATA);
      setFallbackMode(true);
      toast.error('Connection Error', {
        description: 'Could not load hero data. Using default data.'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveHeroData = async () => {
    try {
      setSaving(true);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-32d29310/hero`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(heroData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setHeroData(result.hero);
        setFallbackMode(result.fallbackMode || false);
        toast.success('Hero Data Saved', {
          description: 'Hero section updated successfully!'
        });
      } else {
        throw new Error(result.message || 'Failed to save hero data');
      }
    } catch (error) {
      console.error('Error saving hero data:', error);
      toast.error('Save Failed', {
        description: error.message || 'Could not save hero data'
      });
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    setHeroData(DEFAULT_HERO_DATA);
    toast.info('Reset to Defaults', {
      description: 'Hero data reset to default values. Click Save to apply.'
    });
  };

  const handleInputChange = (field: keyof HeroData, value: string) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return <LoadingState message="Loading hero data..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Anonymous_Pro'] text-2xl text-[#323232] uppercase tracking-wider">
            Hero Management
          </h2>
          <p className="text-[#666] font-['Anonymous_Pro'] mt-2">
            Edit the content displayed in the hero section of your portfolio
          </p>
          {fallbackMode && (
            <p className="text-orange-600 font-['Anonymous_Pro'] text-sm mt-1">
              ⚠️ Running in fallback mode - changes may not persist
            </p>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={resetToDefaults}
            variant="outline"
            className="font-['Anonymous_Pro'] uppercase tracking-wide"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button
            onClick={saveHeroData}
            disabled={saving}
            className="font-['Anonymous_Pro'] uppercase tracking-wide bg-[#323232] hover:bg-[#555]"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-8">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-['Anonymous_Pro'] uppercase tracking-wide">
                <User className="w-5 h-5 text-blue-500" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Basic information displayed in the hero section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={heroData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your name"
                    className="font-['Anonymous_Pro']"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                    Title/Position
                  </Label>
                  <Input
                    id="title"
                    value={heroData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Your professional title"
                    className="font-['Anonymous_Pro']"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={heroData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Main description text"
                  rows={4}
                  className="font-['Anonymous_Pro'] resize-none"
                />
                <p className="text-sm text-[#666] font-['Anonymous_Pro']">
                  Main introduction text that appears below your name
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills & Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-['Anonymous_Pro'] uppercase tracking-wide">
                <FileText className="w-5 h-5 text-green-500" />
                Skills & Expertise
              </CardTitle>
              <CardDescription>
                Professional skills and areas of expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                  Skills
                </Label>
                <Textarea
                  id="skills"
                  value={heroData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  placeholder="Your technical skills (separated by •)"
                  rows={3}
                  className="font-['Anonymous_Pro'] resize-none"
                />
                <p className="text-sm text-[#666] font-['Anonymous_Pro']">
                  Use • to separate skills (e.g., "Design • Development • Marketing")
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expertise" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                  Expertise
                </Label>
                <Textarea
                  id="expertise"
                  value={heroData.expertise}
                  onChange={(e) => handleInputChange('expertise', e.target.value)}
                  placeholder="Your areas of expertise (separated by •)"
                  rows={3}
                  className="font-['Anonymous_Pro'] resize-none"
                />
                <p className="text-sm text-[#666] font-['Anonymous_Pro']">
                  Professional competencies and specializations
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Buttons & Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-['Anonymous_Pro'] uppercase tracking-wide">
                <Link className="w-5 h-5 text-purple-500" />
                Buttons & Links
              </CardTitle>
              <CardDescription>
                Call-to-action buttons and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryButton" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                    Primary Button Text
                  </Label>
                  <Input
                    id="primaryButton"
                    value={heroData.primaryButtonText}
                    onChange={(e) => handleInputChange('primaryButtonText', e.target.value)}
                    placeholder="Primary action text"
                    className="font-['Anonymous_Pro']"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryButton" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                    Secondary Button Text
                  </Label>
                  <Input
                    id="secondaryButton"
                    value={heroData.secondaryButtonText}
                    onChange={(e) => handleInputChange('secondaryButtonText', e.target.value)}
                    placeholder="Secondary action text"
                    className="font-['Anonymous_Pro']"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactLink" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                  Contact Link
                </Label>
                <Input
                  id="contactLink"
                  value={heroData.contactLink}
                  onChange={(e) => handleInputChange('contactLink', e.target.value)}
                  placeholder="https://t.me/username or mailto:email@example.com"
                  className="font-['Anonymous_Pro']"
                />
                <p className="text-sm text-[#666] font-['Anonymous_Pro']">
                  URL for the contact button (Telegram, email, etc.)
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Image Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-['Anonymous_Pro'] uppercase tracking-wide">
                <Settings className="w-5 h-5 text-orange-500" />
                Image Settings
              </CardTitle>
              <CardDescription>
                Hero image configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                  Image Path
                </Label>
                <Input
                  id="image"
                  value={heroData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="/assets/... or https://..."
                  className="font-['Anonymous_Pro']"
                />
                <p className="text-sm text-[#666] font-['Anonymous_Pro']">
                  Current image path. Note: Image upload feature not yet implemented.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}