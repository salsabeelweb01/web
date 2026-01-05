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
      viewAll: string;
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
    keySpecs: string;
    description: string;
    gallery: string;
    features: string;
    location: string;
    contactAgent: string;
    requestViewing: string;
  };
  // About
  about: {
    title: string;
    mission: string;
    vision: string;
    values: string;
  };
  // Contact
  contact: {
    title: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
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
      keySpecs: 'Key Specifications',
      description: 'Description',
      gallery: 'Gallery',
      features: 'Features & Amenities',
      location: 'Location',
      contactAgent: 'Contact Agent',
      requestViewing: 'Request Viewing',
    },
    about: {
      title: 'About Us',
      mission: 'Mission',
      vision: 'Vision',
      values: 'Values',
    },
    contact: {
      title: 'Contact Us',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      submit: 'Submit',
      success: 'Message sent successfully!',
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
      keySpecs: 'المواصفات الرئيسية',
      description: 'الوصف',
      gallery: 'المعرض',
      features: 'المميزات والمرافق',
      location: 'الموقع',
      contactAgent: 'اتصل بالوكيل',
      requestViewing: 'طلب معاينة',
    },
    about: {
      title: 'من نحن',
      mission: 'مهمتنا',
      vision: 'رؤيتنا',
      values: 'قيمنا',
    },
    contact: {
      title: 'اتصل بنا',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      message: 'الرسالة',
      submit: 'إرسال',
      success: 'تم إرسال الرسالة بنجاح!',
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
  },
};

