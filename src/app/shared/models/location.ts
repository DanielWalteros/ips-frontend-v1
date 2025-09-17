export interface Location {
  id: string;
  name: string;
  address: string;
  floor?: string;
  building?: string;
  office?: string;
  schedule: {
    weekdays: string;
    saturday: string;
    sunday?: string;
  };
  services: string[];
  detailedServices?: {
    consultations?: string[];
    otherServices?: string[];
    newServices?: string[];
    additionalSections?: {
      title: string;
      services: string[];
      isNew?: boolean;
    }[];
  };
  contact: {
    phone: string;
    email: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  isPremium?: boolean;
  imageUrl?: string;
  fullAddress?: string;
}

export interface Specialty {
  id: string;
  name: string;
  description?: string;
  availableAt: string[]; // IDs de las ubicaciones donde está disponible
}

export interface AppointmentRequest {
  patientName: string;
  patientId: string;
  email: string;
  phone: string;
  specialty: string;
  location: string;
  preferredDate: Date;
  preferredTime: string;
  insurance?: 'salud-bolivar-eps' | 'poliza-seguros-bolivar' | 'particular';
  comments?: string;
}
