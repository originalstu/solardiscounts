import { useEffect, useRef } from 'react';

interface Props {
  onSelect: (address: string) => void;
  value: string;
  className?: string;
}

export default function GooglePlacesAutocomplete({ onSelect, value, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current || !window.google?.maps?.places) return;

    try {
      // Clear any existing autocomplete
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }

      const options = {
        componentRestrictions: { country: 'au' },
        types: ['address'],
        fields: ['formatted_address']
      };

      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      const listener = autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.formatted_address) {
          onSelect(place.formatted_address);
        }
      });

      return () => {
        if (listener) {
          google.maps.event.removeListener(listener);
        }
        if (autocompleteRef.current) {
          google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
      };
    } catch (error) {
      console.error('Error initializing Google Places:', error);
    }
  }, [onSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onSelect(e.target.value)}
      className={className}
      placeholder="Start typing your address..."
      autoComplete="off"
    />
  );
}