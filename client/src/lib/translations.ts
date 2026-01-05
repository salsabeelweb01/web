export type Language = 'en' | 'ar';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    properties: string;
    about: string;
    contact: string;
  };
  // Home Page
  home: {
    hero: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
    };
    featured: {
      title: string;
      subtitle: string;
      viewAll: string;
    };
    whyChoose: {
      title: string;
      subtitle: string;
      directDeveloper: {
        title: string;
        description: string;
      };
      flexiblePayments: {
        title: string;
        description: string;
      };
      noCommission: {
        title: string;
        description: string;
      };
      freehold: {
        title: string;
        description: string;
      };
    };
    faq: {
      title: string;
      subtitle: string;
      q1: {
        question: string;
        answer: string;
      };
      q2: {
        question: string;
        answer: string;
      };
      q3: {
        question: string;
        answer: string;
      };
      q4: {
        question: string;
        answer: string;
      };
    };
  };
  // Projects/Properties
  projects: {
    title: string;
    filters: {
      all: string;
      location: string;
      type: string;
      status: string;
      search: string;
    };
    noResults: string;
    viewDetails: string;
    forRent: string;
    forSale: string;
    beds: string;
    sqft: string;
  };
  // Project Details
  projectDetails: {
    backToProjects: string;
    scheduleViewing: string;
    scheduleViewingTitle: string;
    scheduleViewingDescription: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredDate: string;
    message: string;
    questionsPlaceholder: string;
    sending: string;
    requestAppointment: string;
    requestSent: string;
    requestSentDescription: string;
    keySpecs: string;
    bedrooms: string;
    sqft: string;
    built: string;
    verified: string;
    status: string;
    aboutProperty: string;
    description: string;
    gallery: string;
    features: string;
    location: string;
    loading: string;
    notFound: string;
    forRent: string;
    forSale: string;
    statusValues: {
      readyToMove: string;
      underConstruction: string;
      comingSoon: string;
    };
  };
  // About
  about: {
    title: string;
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    vision: {
      title: string;
      paragraph1: string;
      paragraph2: string;
    };
    mission: {
      title: string;
      paragraph1: string;
      paragraph2: string;
    };
    stats: {
      projects: string;
      years: string;
      clients: string;
      founded: string;
    };
    team: {
      title: string;
    };
  };
  // Contact
  contact: {
    title: string;
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    info: {
      title: string;
      phone: string;
      email: string;
      address: string;
      officeHours: string;
      saturday: string;
      friday: string;
    };
    form: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      successDescription: string;
    };
    address: {
      line1: string;
      line2: string;
      line3: string;
    };
  };
  // Admin
  admin: {
    title: string;
    login: string;
    password: string;
    access: string;
    addProperty: string;
    editProperty: string;
    deleteProperty: string;
    propertyName: string;
    location: string;
    status: string;
    type: string;
    price: string;
    bedrooms: string;
    size: string;
    propertyType: string;
    description: string;
    images: string;
    features: string;
    cancel: string;
    save: string;
    delete: string;
  };
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    submit: string;
    close: string;
    next: string;
    previous: string;
  };
  // Footer
  footer: {
    tagline: string;
    company: string;
    services: string;
    contact: string;
    buyHome: string;
    rentHome: string;
    commercial: string;
    propertyManagement: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      properties: 'Properties',
      about: 'About Us',
      contact: 'Contact Us',
    },
    home: {
      hero: {
        title: 'Find Your Dream Property',
        subtitle: 'Discover luxury real estate in the UAE',
        searchPlaceholder: 'Search properties...',
      },
      featured: {
        title: 'Featured Properties',
        subtitle: 'Explore our hand-picked selection of premium properties available for sale and rent.',
        viewAll: 'View All Properties',
      },
      whyChoose: {
        title: 'Why Choose Salsabeel',
        subtitle: 'We are committed to delivering innovative and exceptional projects that meet our clients\' needs.',
        directDeveloper: {
          title: 'Direct Developer',
          description: 'Get the best deals directly from the developer with no third-party markups.',
        },
        flexiblePayments: {
          title: 'Flexible Payments',
          description: 'Enjoy flexible 5-Year Payment Plans designed to make ownership easy.',
        },
        noCommission: {
          title: 'No Commission',
          description: 'Save money with 0% Commission and No Bank Involvement required.',
        },
        freehold: {
          title: 'Freehold',
          description: '100% Freehold ownership available for all nationalities.',
        },
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Common questions about Salsabeel Real Estate properties',
        q1: {
          question: 'Why is Salsabeel Real Estate Company the best company in Ajman?',
          answer: 'Salsabeel Company provides rental and sales services and also sells projects that it only owns, distinguished by its after-sales service and maintenance. We are committed to delivering quality and trust.',
        },
        q2: {
          question: 'Does Salsabeel Real Estate Company have projects for rent?',
          answer: 'Yes, Salsabeel Real Estate Company has the management of many buildings and also its affiliated buildings. It continuously follows up the rental process while providing the best and most appropriate offer to both parties.',
        },
        q3: {
          question: 'I need shops or an apartment for investment!',
          answer: 'Salsabeel Real Estate Company has many projects inside Ajman for sale and rent, and also for real estate investment. Salsabeel Company is a leading developer in the Emirate of Ajman. Contact us to get what you are looking for.',
        },
        q4: {
          question: 'What payment plans do you offer?',
          answer: 'We offer flexible payment plans up to 5 years directly from the developer, with no bank involvement required. This makes purchasing your dream home or investment property accessible and hassle-free.',
        },
      },
    },
    projects: {
      title: 'Properties',
      filters: {
        all: 'All',
        location: 'Location',
        type: 'Type',
        status: 'Status',
        search: 'Search...',
      },
      noResults: 'No properties found',
      viewDetails: 'View Details',
      forRent: 'For Rent',
      forSale: 'For Sale',
      beds: 'Beds',
      sqft: 'sqft',
    },
    projectDetails: {
      backToProjects: 'Back to Projects',
      scheduleViewing: 'Schedule Viewing',
      scheduleViewingTitle: 'Schedule a Viewing',
      scheduleViewingDescription: 'Fill out the form below to request a tour of',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      preferredDate: 'Preferred Date',
      message: 'Message',
      questionsPlaceholder: 'Any specific questions or preferences?',
      sending: 'Sending...',
      requestAppointment: 'Request Appointment',
      requestSent: 'Request Sent',
      requestSentDescription: 'An agent will contact you shortly to confirm your viewing.',
      keySpecs: 'Key Specifications',
      bedrooms: 'Bedrooms',
      sqft: 'Sq Ft',
      built: 'Built',
      verified: 'Verified',
      status: 'Status',
      aboutProperty: 'About this Property',
      description: 'Description',
      gallery: 'Gallery',
      features: 'Features & Amenities',
      location: 'Location',
      contactAgent: 'Contact Agent',
      requestViewing: 'Request Viewing',
      loading: 'Loading...',
      notFound: 'Project not found',
      forRent: 'For Rent',
      forSale: 'For Sale',
      descriptionText: 'Experience the epitome of luxury living with Salsabeel Real Estate. This project offers a perfect blend of comfort, style, and convenience, designed to meet the highest standards of modern living in Ajman.',
      statusValues: {
        readyToMove: 'Ready to Move',
        underConstruction: 'Under Construction',
        comingSoon: 'Coming Soon',
      },
    },
    about: {
      title: 'About Us',
      badge: 'About Salsabeel',
      heroTitle: '8 Years of Undefeated Success',
      heroSubtitle: 'Founded in 2016, we are a leader in marketing and developing real estate projects in the Emirate of Ajman.',
      vision: {
        title: 'Our Vision',
        paragraph1: 'To be the leading real estate company in the Emirate of Ajman, delivering innovative projects that reflect excellence and sustainability, while enhancing the quality of life for the communities we serve.',
        paragraph2: 'Salsabeel envisions a world where every person finds their perfect Home—whether it\'s a cozy apartment, a stylish condominium, or a spacious family house.',
      },
      mission: {
        title: 'Our Mission',
        paragraph1: 'Salsabeel Real Estate aims to deliver innovative and high-quality real estate projects that meet the needs of individuals and families. We are committed to sustainability and enhancing the quality of life in the communities we serve.',
        paragraph2: 'Our goal is to be a leader in property development and real estate marketing in the Emirate of Ajman, offering apartments for sale, villas for rent, and unique real estate investment opportunities.',
      },
      stats: {
        projects: 'Projects',
        years: 'Years of Experience',
        clients: 'Happy Clients',
        founded: 'Founded',
      },
      team: {
        title: 'Management Team',
      },
    },
    contact: {
      title: 'Contact Us',
      badge: 'Contact Us',
      heroTitle: 'Get in Touch',
      heroSubtitle: 'Ready to find your dream property? Our team of experts is here to guide you every step of the way.',
      info: {
        title: 'Contact Information',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        officeHours: 'Office Hours',
        saturday: 'Sat: 8:00 AM - 7:00 PM',
        friday: 'Friday: Closed',
      },
      form: {
        title: 'Send us a Message',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message Sent',
        successDescription: 'We\'ll get back to you as soon as possible.',
      },
      address: {
        line1: 'Villa No 8, Salsabeel Real Estate LLC',
        line2: 'University Street, Al Jurf 1',
        line3: 'Ajman, United Arab Emirates',
      },
    },
    admin: {
      title: 'Admin Panel',
      login: 'Access Admin Panel',
      password: 'Enter password',
      access: 'Admin Access',
      addProperty: 'Add New Property',
      editProperty: 'Edit Property',
      deleteProperty: 'Delete Property',
      propertyName: 'Property Name',
      location: 'Location',
      status: 'Status',
      type: 'Type',
      price: 'Starting Price',
      bedrooms: 'Bedrooms',
      size: 'Size (sqft)',
      propertyType: 'Property Type',
      description: 'Description',
      images: 'Images',
      features: 'Features',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      submit: 'Submit',
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
    },
    footer: {
      tagline: 'Salsabeel envisions a world where every person finds their perfect Home.',
      company: 'Company',
      services: 'Services',
      contact: 'Contact',
      buyHome: 'Buy a Home',
      rentHome: 'Rent a Home',
      commercial: 'Commercial',
      propertyManagement: 'Property Management',
      copyright: 'Salsabeel Real Estate LLC. All rights reserved.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      properties: 'العقارات',
      about: 'من نحن',
      contact: 'اتصل بنا',
    },
    home: {
      hero: {
        title: 'ابحث عن عقار أحلامك',
        subtitle: 'اكتشف العقارات الفاخرة في الإمارات',
        searchPlaceholder: 'ابحث عن العقارات...',
      },
      featured: {
        title: 'العقارات المميزة',
        subtitle: 'استكشف مجموعتنا المختارة بعناية من العقارات المميزة المتاحة للبيع والإيجار.',
        viewAll: 'عرض جميع العقارات',
      },
      whyChoose: {
        title: 'لماذا تختار سلسبيل',
        subtitle: 'نحن ملتزمون بتقديم مشاريع مبتكرة واستثنائية تلبي احتياجات عملائنا.',
        directDeveloper: {
          title: 'مطور مباشر',
          description: 'احصل على أفضل الصفقات مباشرة من المطور دون أي رسوم إضافية من أطراف ثالثة.',
        },
        flexiblePayments: {
          title: 'خطط دفع مرنة',
          description: 'استمتع بخطط دفع مرنة لمدة 5 سنوات مصممة لتسهيل الملكية.',
        },
        noCommission: {
          title: 'بدون عمولة',
          description: 'وفر المال مع 0% عمولة وبدون الحاجة إلى تدخل البنك.',
        },
        freehold: {
          title: 'ملكية حرة',
          description: 'ملكية حرة 100% متاحة لجميع الجنسيات.',
        },
      },
      faq: {
        title: 'الأسئلة الشائعة',
        subtitle: 'أسئلة شائعة حول عقارات سلسبيل العقارية',
        q1: {
          question: 'لماذا تعتبر شركة سلسبيل العقارية أفضل شركة في عجمان؟',
          answer: 'توفر شركة سلسبيل خدمات الإيجار والبيع وتبيع أيضاً المشاريع التي تملكها فقط، وتميزها بخدمة ما بعد البيع والصيانة. نحن ملتزمون بتقديم الجودة والثقة.',
        },
        q2: {
          question: 'هل لدى شركة سلسبيل العقارية مشاريع للإيجار؟',
          answer: 'نعم، لدى شركة سلسبيل العقارية إدارة العديد من المباني وكذلك مبانيها التابعة. تتابع باستمرار عملية الإيجار مع تقديم أفضل عرض وأكثر ملاءمة لكلا الطرفين.',
        },
        q3: {
          question: 'أحتاج محلات أو شقة للاستثمار!',
          answer: 'لدى شركة سلسبيل العقارية العديد من المشاريع داخل عجمان للبيع والإيجار، وأيضاً للاستثمار العقاري. شركة سلسبيل هي مطور رائد في إمارة عجمان. اتصل بنا للحصول على ما تبحث عنه.',
        },
        q4: {
          question: 'ما هي خطط الدفع التي تقدمونها؟',
          answer: 'نحن نقدم خطط دفع مرنة تصل إلى 5 سنوات مباشرة من المطور، دون الحاجة إلى تدخل البنك. هذا يجعل شراء منزل أحلامك أو عقار استثماري في متناول اليد وخالٍ من المتاعب.',
        },
      },
    },
    projects: {
      title: 'العقارات',
      filters: {
        all: 'الكل',
        location: 'الموقع',
        type: 'النوع',
        status: 'الحالة',
        search: 'بحث...',
      },
      noResults: 'لم يتم العثور على عقارات',
      viewDetails: 'عرض التفاصيل',
      forRent: 'للإيجار',
      forSale: 'للبيع',
      beds: 'غرف',
      sqft: 'قدم مربع',
    },
    projectDetails: {
      backToProjects: 'العودة إلى العقارات',
      scheduleViewing: 'جدولة معاينة',
      scheduleViewingTitle: 'جدولة معاينة',
      scheduleViewingDescription: 'املأ النموذج أدناه لطلب جولة في',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      preferredDate: 'التاريخ المفضل',
      message: 'الرسالة',
      questionsPlaceholder: 'أي أسئلة أو تفضيلات محددة؟',
      sending: 'جاري الإرسال...',
      requestAppointment: 'طلب موعد',
      requestSent: 'تم إرسال الطلب',
      requestSentDescription: 'سيتصل بك وكيل قريباً لتأكيد المعاينة.',
      keySpecs: 'المواصفات الرئيسية',
      bedrooms: 'غرف النوم',
      sqft: 'قدم مربع',
      built: 'سنة البناء',
      verified: 'متحقق',
      status: 'الحالة',
      aboutProperty: 'حول هذا العقار',
      description: 'الوصف',
      gallery: 'المعرض',
      features: 'المميزات والمرافق',
      location: 'الموقع',
      contactAgent: 'اتصل بالوكيل',
      requestViewing: 'طلب معاينة',
      loading: 'جاري التحميل...',
      notFound: 'العقار غير موجود',
      forRent: 'للإيجار',
      forSale: 'للبيع',
      descriptionText: 'اختبر قمة العيش الفاخر مع سلسبيل العقارية. يقدم هذا المشروع مزيجاً مثالياً من الراحة والأناقة والراحة، مصمم ليلبي أعلى معايير العيش الحديث في عجمان.',
      statusValues: {
        readyToMove: 'جاهز للسكن',
        underConstruction: 'قيد الإنشاء',
        comingSoon: 'قريباً',
      },
    },
    about: {
      title: 'من نحن',
      badge: 'حول سلسبيل',
      heroTitle: '8 سنوات من النجاح المتواصل',
      heroSubtitle: 'تأسست في عام 2016، نحن رواد في تسويق وتطوير المشاريع العقارية في إمارة عجمان.',
      vision: {
        title: 'رؤيتنا',
        paragraph1: 'أن نكون الشركة العقارية الرائدة في إمارة عجمان، ونقدم مشاريع مبتكرة تعكس التميز والاستدامة، مع تعزيز جودة الحياة للمجتمعات التي نخدمها.',
        paragraph2: 'تتطلع سلسبيل إلى عالم يجد فيه كل شخص منزله المثالي - سواء كان شقة مريحة، أو شقة أنيقة، أو منزل عائلي واسع.',
      },
      mission: {
        title: 'مهمتنا',
        paragraph1: 'تهدف سلسبيل العقارية إلى تقديم مشاريع عقارية مبتكرة وعالية الجودة تلبي احتياجات الأفراد والعائلات. نحن ملتزمون بالاستدامة وتعزيز جودة الحياة في المجتمعات التي نخدمها.',
        paragraph2: 'هدفنا هو أن نكون رواداً في تطوير العقارات وتسويق العقارات في إمارة عجمان، ونقدم شققاً للبيع، وفيلات للإيجار، وفرص استثمار عقاري فريدة.',
      },
      stats: {
        projects: 'مشاريع',
        years: 'سنوات من الخبرة',
        clients: 'عملاء سعداء',
        founded: 'تأسست',
      },
      team: {
        title: 'الفريق الإداري',
      },
    },
    contact: {
      title: 'اتصل بنا',
      badge: 'اتصل بنا',
      heroTitle: 'تواصل معنا',
      heroSubtitle: 'هل أنت مستعد للعثور على عقار أحلامك؟ فريقنا من الخبراء هنا لإرشادك في كل خطوة على الطريق.',
      info: {
        title: 'معلومات الاتصال',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        address: 'العنوان',
        officeHours: 'ساعات العمل',
        saturday: 'السبت: 8:00 صباحاً - 7:00 مساءً',
        friday: 'الجمعة: مغلق',
      },
      form: {
        title: 'أرسل لنا رسالة',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
        success: 'تم إرسال الرسالة',
        successDescription: 'سنتواصل معك في أقرب وقت ممكن.',
      },
      address: {
        line1: 'فيلا رقم 8، سلسبيل العقارية ذ.م.م',
        line2: 'شارع الجامعة، الجرف 1',
        line3: 'عجمان، الإمارات العربية المتحدة',
      },
    },
    admin: {
      title: 'لوحة التحكم',
      login: 'الوصول إلى لوحة التحكم',
      password: 'أدخل كلمة المرور',
      access: 'الوصول الإداري',
      addProperty: 'إضافة عقار جديد',
      editProperty: 'تعديل العقار',
      deleteProperty: 'حذف العقار',
      propertyName: 'اسم العقار',
      location: 'الموقع',
      status: 'الحالة',
      type: 'النوع',
      price: 'السعر الابتدائي',
      bedrooms: 'غرف النوم',
      size: 'المساحة (قدم مربع)',
      propertyType: 'نوع العقار',
      description: 'الوصف',
      images: 'الصور',
      features: 'المميزات',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
    },
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      submit: 'إرسال',
      close: 'إغلاق',
      next: 'التالي',
      previous: 'السابق',
    },
    footer: {
      tagline: 'تتطلع سلسبيل إلى عالم يجد فيه كل شخص منزله المثالي.',
      company: 'الشركة',
      services: 'الخدمات',
      contact: 'اتصل بنا',
      buyHome: 'شراء منزل',
      rentHome: 'إيجار منزل',
      commercial: 'تجاري',
      propertyManagement: 'إدارة العقارات',
      copyright: 'سلسبيل العقارية ذ.م.م. جميع الحقوق محفوظة.',
    },
  },
};

