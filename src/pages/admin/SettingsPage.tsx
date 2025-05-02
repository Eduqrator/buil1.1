import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: 'eduQrator',
    siteDescription: 'Your Learning Journey Starts Here',
    contactEmail: 'support@eduqrator.com',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save settings
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-600">Manage your platform settings and configurations</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">General Settings</h2>
            
            <div>
              <Input
                label="Site Name"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Site Description"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Contact Email"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                fullWidth
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Social Media Links</h2>
            
            <div>
              <Input
                label="Twitter URL"
                value={settings.socialLinks.twitter}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                })}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Facebook URL"
                value={settings.socialLinks.facebook}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                })}
                fullWidth
              />
            </div>

            <div>
              <Input
                label="Instagram URL"
                value={settings.socialLinks.instagram}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                })}
                fullWidth
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};