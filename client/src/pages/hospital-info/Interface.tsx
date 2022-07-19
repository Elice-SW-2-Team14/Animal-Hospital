/* interface */
export interface HospitalInfoType {
  name: string;
  email: string;
  director: string;
  password: string;
  address: {
    postalCode: string;
    address1: string;
    address2: string;
  };
  phoneNumber: string;
  businessHours: string;
  businessNumber: string;
  licenseNumber: string;
  holiday: [string];
  hospitalCapacity?: number;
  tag: string;
  keyword: [string];
  image: string;
}
export interface HospitalServiceInfoType {
  serviceName: string;
  servicePrice: number;
  serviceDesc: string;
  serviceCapacity: number;
}