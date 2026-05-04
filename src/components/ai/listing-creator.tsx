'use client';

import { useState } from 'react';
import { Sparkles, Plus, X, Loader2, Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { verticals, type VerticalType } from '@/lib/verticals';

interface GeneratedContent {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
}

interface ListingCreatorProps {
  vertical?: VerticalType;
  onComplete?: (content: GeneratedContent) => void;
  className?: string;
}

type Step = 'details' | 'generating' | 'preview';

export function ListingCreator({ vertical: initialVertical, onComplete, className }: ListingCreatorProps) {
  const [step, setStep] = useState<Step>('details');
  const [vertical, setVertical] = useState<VerticalType | ''>(initialVertical || '');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>(['']);
  const [tone, setTone] = useState<'professional' | 'casual' | 'urgent'>('professional');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedVertical = vertical ? verticals[vertical] : null;

  const addKeyPoint = () => {
    if (keyPoints.length < 8) {
      setKeyPoints([...keyPoints, '']);
    }
  };

  const removeKeyPoint = (index: number) => {
    if (keyPoints.length > 1) {
      setKeyPoints(keyPoints.filter((_, i) => i !== index));
    }
  };

  const updateKeyPoint = (index: number, value: string) => {
    const updated = [...keyPoints];
    updated[index] = value;
    setKeyPoints(updated);
  };

  const handleGenerate = async () => {
    const validKeyPoints = keyPoints.filter(kp => kp.trim());
    if (!vertical || validKeyPoints.length === 0) {
      setError('Please select a category and add at least one key point.');
      return;
    }

    setError(null);
    setStep('generating');

    try {
      const response = await fetch('/api/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vertical,
          keyPoints: validKeyPoints,
          tone,
          location: location || undefined,
          price: price ? parseFloat(price.replace(/[^0-9.]/g, '')) : undefined,
          category: category || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate listing');
      }

      const result = await response.json();
      setGeneratedContent(result.data);
      setStep('preview');
    } catch {
      setError('Failed to generate listing. Please try again.');
      setStep('details');
    }
  };

  const handleCopy = async (field: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUse = () => {
    if (generatedContent && onComplete) {
      onComplete(generatedContent);
    }
  };

  return (
    <div className={cn('rounded-2xl border border-border bg-card', className)}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Listing Creator</h3>
          <p className="text-sm text-muted-foreground">Let AI write your perfect listing</p>
        </div>
      </div>

      {/* Step: Details */}
      {step === 'details' && (
        <div className="p-5 space-y-5">
          {/* Category selection */}
          {!initialVertical && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
              <select
                value={vertical}
                onChange={(e) => {
                  setVertical(e.target.value as VerticalType);
                  setCategory('');
                }}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              >
                <option value="">Select a category</option>
                {Object.values(verticals).map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Subcategory */}
          {selectedVertical && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subcategory</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
              >
                <option value="">Select subcategory (optional)</option>
                {selectedVertical.categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Location & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., San Francisco, CA"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 500000"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Key Points */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Key Points * <span className="text-muted-foreground font-normal">(what makes this special?)</span>
            </label>
            <div className="space-y-2">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updateKeyPoint(index, e.target.value)}
                    placeholder={`e.g., ${index === 0 ? '3 bedrooms, 2 bathrooms' : index === 1 ? 'Recently renovated kitchen' : 'Add another feature...'}`}
                    className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  />
                  {keyPoints.length > 1 && (
                    <button
                      onClick={() => removeKeyPoint(index)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {keyPoints.length < 8 && (
              <button
                onClick={addKeyPoint}
                className="mt-2 flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add another point
              </button>
            )}
          </div>

          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tone</label>
            <div className="flex gap-3">
              {(['professional', 'casual', 'urgent'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    'flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-colors',
                    tone === t
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Generate button */}
          <Button onClick={handleGenerate} size="lg" className="w-full">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Listing
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step: Generating */}
      {step === 'generating' && (
        <div className="p-10 flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 mb-4">
            <Loader2 className="h-8 w-8 text-accent animate-spin" />
          </div>
          <h3 className="font-semibold text-foreground">Generating your listing...</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our AI is crafting the perfect description based on your inputs.
          </p>
        </div>
      )}

      {/* Step: Preview */}
      {step === 'preview' && generatedContent && (
        <div className="p-5 space-y-5">
          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <button
                onClick={() => handleCopy('title', generatedContent.title)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedField === 'title' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copiedField === 'title' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="rounded-xl border border-border bg-background p-4 text-foreground">
              {generatedContent.title}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <button
                onClick={() => handleCopy('description', generatedContent.description)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedField === 'description' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copiedField === 'description' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="rounded-xl border border-border bg-background p-4 text-sm text-foreground leading-relaxed">
              {generatedContent.description}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Highlights</label>
            <ul className="rounded-xl border border-border bg-background p-4 space-y-2">
              {generatedContent.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-accent">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {generatedContent.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setStep('details')}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Edit & Regenerate
            </Button>
            <Button onClick={handleUse} className="flex-1">
              Use This Listing
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
