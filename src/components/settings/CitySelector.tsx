import { useState } from 'react';
import { ChevronDown, MapPin, Check } from 'lucide-react';
import { City } from '@/types/prayer';
import { countriesWithCities } from '@/data/cities';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CitySelectorProps {
  selectedCity: City;
  onSelectCity: (city: City) => void;
}

export function CitySelector({ selectedCity, onSelectCity }: CitySelectorProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (city: City) => {
    onSelectCity(city);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 bg-card rounded-xl shadow-card hover:shadow-elevated transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-islamic rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">{selectedCity.name}</p>
              <p className="text-sm text-muted-foreground">{selectedCity.country}</p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader className="pb-4">
          <SheetTitle>Select City</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="space-y-6 pb-8">
            {Object.entries(countriesWithCities).map(([country, cities]) => (
              <div key={country}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
                  {country}
                </h3>
                <div className="space-y-1">
                  {cities.map((city) => {
                    const isSelected =
                      city.name === selectedCity.name &&
                      city.country === selectedCity.country;
                    return (
                      <button
                        key={`${city.country}-${city.name}`}
                        onClick={() => handleSelect(city)}
                        className={cn(
                          'w-full flex items-center justify-between p-3 rounded-xl transition-colors',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        )}
                      >
                        <span className="font-medium">{city.name}</span>
                        {isSelected && <Check className="w-5 h-5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
