import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { IoMdQuote } from 'react-icons/io';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLanguage } from '../../hooks/useLanguage';

interface Testimonial {
  name: string;
  role: {
    en: string;
    fr: string;
  };
  image: string;
  rating: number;
  text: {
    en: string;
    fr: string;
  };
}
const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: {
      en: 'Freelance Designer',
      fr: 'Designer Indépendante',
    },
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: {
      en: 'Keepay has saved me so much money! I was paying for subscriptions I completely forgot about. The notifications are a lifesaver.',
      fr: "Keepay m'a fait économiser tellement d'argent! Je payais pour des abonnements que j'avais complètement oubliés. Les notifications sont une bouée de sauvetage.",
    },
  },
  {
    name: 'Michael Chen',
    role: {
      en: 'Software Engineer',
      fr: 'Ingénieur Logiciel',
    },
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: {
      en: 'The calendar view is brilliant. I can see all my renewals at a glance and plan my budget accordingly. Best $5/month I spend!',
      fr: "La vue calendrier est brillante. Je peux voir tous mes renouvellements d'un coup d'œil et planifier mon budget en conséquence. Meilleur 5$/mois que je dépense!",
    },
  },
  {
    name: 'Emily Rodriguez',
    role: {
      en: 'Content Creator',
      fr: 'Créatrice de Contenu',
    },
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    text: {
      en: 'As someone with 15+ subscriptions, Keepay is essential. The analytics helped me realize I was spending $200/month on services I rarely used.',
      fr: "En tant que personne avec plus de 15 abonnements, Keepay est essentiel. Les analyses m'ont aidé à réaliser que je dépensais 200$/mois sur des services que j'utilisais rarement.",
    },
  },
  {
    name: 'David Park',
    role: {
      en: 'Marketing Manager',
      fr: 'Responsable Marketing',
    },
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    text: {
      en: 'Simple, clean, and does exactly what it promises. The Chrome extension is super convenient. Highly recommend!',
      fr: "Simple, propre et fait exactement ce qu'il promet. L'extension Chrome est super pratique. Je recommande vivement!",
    },
  },
  {
    name: 'Jessica Williams',
    role: {
      en: 'Small Business Owner',
      fr: 'Propriétaire de Petite Entreprise',
    },
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    rating: 5,
    text: {
      en: 'Managing both personal and business subscriptions was chaos. Keepay brought order to the madness. Love the multi-card tracking!',
      fr: "Gérer à la fois les abonnements personnels et professionnels était chaotique. Keepay a apporté de l'ordre au chaos. J'adore le suivi multi-cartes!",
    },
  },
  {
    name: 'Alex Thompson',
    role: {
      en: 'Student',
      fr: 'Étudiant',
    },
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    rating: 5,
    text: {
      en: 'The free tier is perfect for students. I can track my streaming services and get reminded before they charge my card. No more overdraft fees!',
      fr: "Le plan gratuit est parfait pour les étudiants. Je peux suivre mes services de streaming et être rappelé avant qu'ils ne débitent ma carte. Plus de frais de découvert!",
    },
  },
];

export function Testimonials() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      dragFree: false,
    },
    [Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-testimonial-gradient relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-br from-primary/10 to-[#FF6B5B]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-linear-to-br from-[#008B82]/10 to-[#00A89A]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary/10 to-[#FF6B5B]/10 border border-primary/20 text-primary rounded-2xl text-sm mb-6 font-bold shadow-sm">
            <FaStar className="w-4 h-4 fill-current" />
            {t('testimonials.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="block text-foreground">
              {t('testimonials.title_1')}
            </span>
            <span className="block text-gradient-primary">
              {t('testimonials.title_2')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="w-12 h-12 rounded-2xl bg-surface border-2 border-border hover:border-primary hover:bg-muted flex items-center justify-center transition-all group shadow-sm"
          >
            <FaChevronLeft className="w-6 h-6 text-surface-foreground group-hover:text-primary" />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="w-12 h-12 rounded-2xl bg-surface border-2 border-border hover:border-primary hover:bg-muted flex items-center justify-center transition-all group shadow-sm"
          >
            <FaChevronRight className="w-6 h-6 text-surface-foreground group-hover:text-primary" />
          </button>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div key={index} className="px-3">
                  <div className="bg-surface p-7 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 relative border-2 border-border hover:border-primary/20 group h-full">
                    <div className="absolute top-6 right-6 w-14 h-14 bg-linear-to-br from-[#990800]/10 to-[#FF6B5B]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IoMdQuote className="w-7 h-7 text-primary/40" />
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-border"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-accent-foreground flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-accent-foreground" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-surface-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {
                            testimonial.role[
                              currentLanguage as keyof typeof testimonial.role
                            ]
                          }
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="w-5 h-5 fill-[#FF6B5B] text-[#FF6B5B]"
                        />
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed font-medium">
                      &ldquo;
                      {
                        testimonial.text[
                          currentLanguage as keyof typeof testimonial.text
                        ]
                      }
                      &rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {emblaApi?.scrollSnapList().map((_, index) => {
              const isActive = index === currentSlide;

              return (
                <button
                  key={index}
                  className={`
          h-2.5 rounded-full transition-all duration-400
          ${
            isActive
              ? 'w-10 bg-primary-gradient'
              : 'w-2.5 bg-muted-foreground hover:bg-primary'
          }
        `}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              );
            })}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-surface border-2 border-border rounded-3xl shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex -space-x-3">
                  {testimonials.slice(0, 4).map((testimonial, index) => (
                    <img
                      key={index}
                      src={testimonial.image}
                      alt=""
                      className="w-12 h-12 rounded-full border-3 border-white object-cover shadow-lg"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full border-3 border-white bg-linear-to-br from-[#990800] to-[#C41E14] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    +10K
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-surface-foreground font-bold">
                    {t('testimonials.join_happy_users')}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="w-3.5 h-3.5 fill-[#FF6B5B] text-[#FF6B5B]"
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-muted-foreground">
                      {t('testimonials.average_rating')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
