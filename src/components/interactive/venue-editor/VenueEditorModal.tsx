'use client';

import React, { useState } from 'react';
import { Settings, X, Save, MapPin, Check, AlertCircle } from 'lucide-react';
import type { PublicVenue } from '@/modules/publishing/domain/public-snapshot.schema';
import { updateVenueAction } from '@/modules/weddings/actions/update-venue.action';

interface VenueEditorModalProps {
  weddingSlug: string;
  initialVenue?: PublicVenue;
  initialIsEnabled?: boolean;
}

export function VenueEditorModal({
  weddingSlug,
  initialVenue,
  initialIsEnabled = true,
}: VenueEditorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVenueEnabled, setIsVenueEnabled] = useState(initialIsEnabled);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState(initialVenue?.name || '');
  const [address, setAddress] = useState(initialVenue?.address || '');
  const [city, setCity] = useState(initialVenue?.city || 'Jaipur');
  const [state, setState] = useState(initialVenue?.state || 'Rajasthan');
  const [googleMapsEmbedUrl, setGoogleMapsEmbedUrl] = useState(
    initialVenue?.googleMapsEmbedUrl || ''
  );
  const [directionsUrl, setDirectionsUrl] = useState(
    initialVenue?.directionsUrl || ''
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const payloadVenue: PublicVenue = {
      name,
      address,
      city,
      state,
      googleMapsEmbedUrl:
        googleMapsEmbedUrl ||
        `https://maps.google.com/maps?q=${encodeURIComponent(
          name + ' ' + address
        )}&output=embed`,
      directionsUrl:
        directionsUrl ||
        `https://maps.google.com/?q=${encodeURIComponent(
          name + ' ' + address
        )}`,
    };

    const res = await updateVenueAction({
      weddingSlug,
      isVenueEnabled,
      venue: payloadVenue,
    });

    setIsSaving(false);
    if (res.success) {
      setSuccessMessage('Venue updated successfully! Page caches revalidated.');
      setTimeout(() => {
        setIsOpen(false);
        setSuccessMessage(null);
        window.location.reload();
      }, 1200);
    } else {
      setErrorMessage(res.error || 'Failed to update venue.');
    }
  };

  return (
    <>
      {/* Discreet Golden Floating Editor Button in top-right or bottom-left */}
      <aside className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#5B0E2D] border border-[#D4AF37] text-[#F3D794] text-xs font-serif uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all focus:outline-none"
          title="Edit Venue & Google Maps Information"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Edit Venue</span>
        </button>
      </aside>

      {/* Editor Modal Backdrop */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-xl rounded-3xl bg-[#FDFBF7] border-2 border-[#D4AF37] shadow-2xl p-6 md:p-8 text-stone-900 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2.5 text-[#5B0E2D]">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-xl font-serif font-bold tracking-tight">
                  Edit Venue &amp; Google Maps
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Close venue editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification Messages */}
            {successMessage && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-serif flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-serif flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSave} className="mt-6 space-y-4 font-serif text-sm">
              {/* Enable / Disable Venue Section Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/70 border border-[#D4AF37]/40">
                <div>
                  <span className="font-bold text-[#5B0E2D] block">
                    Show Venue Section
                  </span>
                  <span className="text-xs text-stone-600 block">
                    Turn off if the venue is not yet finalized.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVenueEnabled}
                    onChange={(e) => setIsVenueEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B0E2D]"></div>
                </label>
              </div>

              {isVenueEnabled && (
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Venue Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. The Royal Palace & Heritage Gardens"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Full Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Heritage Palace Estate, Palace Road, Civil Lines"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Jaipur"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Rajasthan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Google Maps Embed URL (Iframe Src)
                    </label>
                    <input
                      type="url"
                      value={googleMapsEmbedUrl}
                      onChange={(e) => setGoogleMapsEmbedUrl(e.target.value)}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-stone-900 text-xs"
                    />
                    <span className="text-[11px] text-stone-500 mt-0.5 block">
                      Tip: On Google Maps, click Share &gt; Embed a map &gt; Copy HTML (paste the src URL here).
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                      Directions URL
                    </label>
                    <input
                      type="url"
                      value={directionsUrl}
                      onChange={(e) => setDirectionsUrl(e.target.value)}
                      placeholder="https://maps.google.com/?q=..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-stone-900 text-xs"
                    />
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#D4AF37]/30">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 font-serif text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5B0E2D] text-[#F3D794] border border-[#D4AF37] font-serif font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save & Publish Venue'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
