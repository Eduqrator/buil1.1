import React, { useState } from 'react';
import { X, Upload, Plus, Trash } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { supabase } from '../../lib/supabase';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    provider: '',
    newProvider: '',
    price: '0',
    duration: '',
    level: '',
    imageUrl: '',
    affiliateLink: '',
    certificate: false,
    learningOutcomes: [''],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAddingProvider, setIsAddingProvider] = useState(false);

  if (!isOpen) return null;

  const providers = [
    { value: 'Coursera', label: 'Coursera' },
    { value: 'edX', label: 'edX' },
    { value: 'Udemy', label: 'Udemy' },
    { value: 'Udacity', label: 'Udacity' },
    { value: 'FutureLearn', label: 'FutureLearn' },
    { value: 'Pluralsight', label: 'Pluralsight' },
    { value: 'LinkedIn Learning', label: 'LinkedIn Learning' },
    { value: 'Skillshare', label: 'Skillshare' },
    { value: 'new', label: '+ Add New Provider' },
  ];

  const levels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'All Levels', label: 'All Levels' },
  ];

  const handleProviderChange = (value: string) => {
    if (value === 'new') {
      setIsAddingProvider(true);
      setFormData({ ...formData, provider: '' });
    } else {
      setIsAddingProvider(false);
      setFormData({ ...formData, provider: value });
    }
  };

  const addLearningOutcome = () => {
    setFormData({
      ...formData,
      learningOutcomes: [...formData.learningOutcomes, ''],
    });
  };

  const removeLearningOutcome = (index: number) => {
    const newOutcomes = formData.learningOutcomes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      learningOutcomes: newOutcomes,
    });
  };

  const updateLearningOutcome = (index: number, value: string) => {
    const newOutcomes = [...formData.learningOutcomes];
    newOutcomes[index] = value;
    setFormData({
      ...formData,
      learningOutcomes: newOutcomes,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const finalProvider = isAddingProvider ? formData.newProvider : formData.provider;

      const { error: insertError } = await supabase
        .from('courses')
        .insert([{
          title: formData.title,
          description: formData.description,
          provider: finalProvider,
          price: parseFloat(formData.price),
          duration: formData.duration,
          level: formData.level,
          image_url: formData.imageUrl,
          affiliate_link: formData.affiliateLink,
          certificate: formData.certificate,
          learning_outcomes: formData.learningOutcomes.filter(outcome => outcome.trim() !== ''),
        }]);

      if (insertError) throw insertError;

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-slate-800">Add New Course</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Course Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  fullWidth
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Course Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-4">Course Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isAddingProvider ? (
                  <div>
                    <Input
                      label="New Provider Name"
                      value={formData.newProvider}
                      onChange={(e) => setFormData({ ...formData, newProvider: e.target.value })}
                      required
                      fullWidth
                    />
                    <button
                      type="button"
                      className="text-sm text-blue-600 mt-1"
                      onClick={() => setIsAddingProvider(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <Select
                    label="Provider"
                    value={formData.provider}
                    onChange={handleProviderChange}
                    options={providers}
                    required
                    fullWidth
                  />
                )}

                <Input
                  label="Price ($)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  fullWidth
                />

                <Input
                  label="Duration (e.g., '6 weeks', '3 months')"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                  fullWidth
                />

                <Select
                  label="Level"
                  value={formData.level}
                  onChange={(value) => setFormData({ ...formData, level: value })}
                  options={levels}
                  required
                  fullWidth
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-4">Media & Links</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Input
                    label="Course Image URL"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                    fullWidth
                  />
                  <p className="mt-1 text-sm text-slate-500">
                    Recommended size: 1280x720 pixels (16:9 ratio)
                  </p>
                </div>

                <Input
                  label="Affiliate Link"
                  value={formData.affiliateLink}
                  onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                  required
                  fullWidth
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-4">Learning Outcomes</h3>
              <div className="space-y-3">
                {formData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Learning outcome ${index + 1}`}
                      value={outcome}
                      onChange={(e) => updateLearningOutcome(index, e.target.value)}
                      required
                      fullWidth
                    />
                    {formData.learningOutcomes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeLearningOutcome(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLearningOutcome}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Learning Outcome
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="certificate"
                checked={formData.certificate}
                onChange={(e) => setFormData({ ...formData, certificate: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="certificate" className="text-sm text-slate-700">
                This course offers a certificate upon completion
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding Course...' : 'Add Course'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};