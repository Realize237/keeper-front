import Modal from '../ui/Modal';
import { useState } from 'react';

import FormButton from '../ui/Button';
import PriceRangeSlider from './PriceRangeSlider';
import { FilterOption } from './FilterOption';
import { useTranslation } from 'react-i18next';
import { PLAID_CATEGORY_ICONS } from '../../constants/plaid.constants';
import { motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';

const MAX_PRICE_RANGE = 2000;

interface FilterData {
  categories: string[];
  priceRange: [number, number];
}

const categories = Object.keys(PLAID_CATEGORY_ICONS);

const FilterModalContent = ({
  onClose,
  onApplyFilters,
  initialFilters,
}: {
  onClose: () => void;
  onApplyFilters?: (filters: FilterData) => void;
  initialFilters?: FilterData;
}) => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [0, MAX_PRICE_RANGE]
  );

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < MAX_PRICE_RANGE;

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
    <div className="space-y-6">
      <FilterSection title={t('subscriptions.filter.category')}>
        {categories.map((item) => (
          <FilterOption
            key={item}
            label={t(`subscriptions.filter.categories.${item}`)}
            selected={selectedCategories.includes(item)}
            onToggle={() => toggleCategory(item)}
            icon={PLAID_CATEGORY_ICONS[item]}
          />
        ))}
      </FilterSection>
      <p className="text-sm font-medium text-foreground mt-6 mb-2">
        {t('subscriptions.filter.price_range')}
      </p>
      <hr className="text-border" />
      <div className="flex justify-center items-center w-full">
        <PriceRangeSlider
          minPrice={0}
          maxPrice={MAX_PRICE_RANGE}
          onChange={handlePriceChange}
          initialRange={priceRange}
        />
      </div>

      <hr className="text-border" />

      <div
        className="
    mt-6 pt-4
    flex items-center justify-between
    border-t border-white/10
  "
      >
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <motion.button
              type="button"
              onClick={() => {
                setSelectedCategories([]);
                setPriceRange([0, MAX_PRICE_RANGE]);
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.95 }}
              title={t('subscriptions.filter.clear_all')}
              className="
          p-2 rounded-full
          text-foreground/00 hover:text-foreground/80
          transition-colors
        "
            >
              <HiXMark size={16} />
            </motion.button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="
        text-sm text-foreground/90
        hover:text-foreground/60
        transition-colors
      "
          >
            {t('common.cancel')}
          </button>
        </div>

        <div className="w-1/3">
          <FormButton
            type="button"
            onClick={handleApplyFilters}
            className="px-6 rounded-full font-semibold"
          >
            {t('subscriptions.filter.show_results')}
          </FormButton>
        </div>
      </div>
    </div>
  );
};

const SubscriptionFilterModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: FilterData) => void;
  initialFilters?: FilterData;
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('subscriptions.filter.title_plural')}
      width="max-w-xl"
    >
      <FilterModalContent
        key={isOpen ? 'open' : 'closed'}
        onClose={onClose}
        onApplyFilters={onApplyFilters}
        initialFilters={initialFilters}
      />
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
