import Modal from '../ui/Modal';
import { useState } from 'react';

import FormButton from '../ui/Button';
import PriceRangeSlider from './PriceRangeSlider';
import { FilterOption } from './FilterOption';
import { useTranslation } from 'react-i18next';

interface FilterData {
  categories: string[];
  priceRange: [number, number];
}

const categories = [
  'streaming',
  'music',
  'gaming',
  'productivity',
  'news',
  'fitness',
];
const SubscriptionFilterModal = ({
  isOpen,
  onClose,
  onApplyFilters,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: FilterData) => void;
}) => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  const handleApplyFilters = () => {
    const filters: FilterData = {
      categories: selectedCategories,
      priceRange: priceRange,
    };

    if (onApplyFilters) {
      onApplyFilters(filters);
    }

    onClose();
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('subscriptions.filter.title_plural')}
      width="max-w-md"
    >
      <div className="space-y-6">
        <FilterSection title={t('subscriptions.filter.category')}>
          {categories.map((item) => (
            <FilterOption
              key={item}
              label={item}
              selected={selectedCategories.includes(item)}
              onToggle={() => toggleCategory(item)}
            />
          ))}
        </FilterSection>
        <p className="text-sm font-medium text-foreground mt-6 mb-2">
          {t('subscriptions.filter.price_range')}
        </p>
        <hr className="text-border" />
        <PriceRangeSlider
          minPrice={0}
          maxPrice={2000}
          onChange={handlePriceChange}
        />

        <hr className="text-border" />

        <div className="flex justify-between gap-2 mt-4">
          <FormButton type="button" onClick={onClose} variant="secondary-dark">
            {t('common.cancel')}
          </FormButton>
          <FormButton type="button" onClick={handleApplyFilters}>
            {t('subscriptions.filter.show_results')}
          </FormButton>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionFilterModal;
export type { FilterData };

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <p className="text-xs font-semibold text-foreground uppercase tracking-wide  ">
      {title}
    </p>
    <hr className="text-border" />
    <div className="flex flex-wrap gap-2 mt-4">{children}</div>
  </div>
);
