export interface ForumUserDto {
  id: number;
  email: string;
  name: string;
  phone: string;
  country_id: number;
  town: string;
  address: string;
  company: string;
  ip: string;
  link: string;
  password?: string;
  insert_date?: string;
  timestamp?: string;
}

export interface CountryDto {
  id: number;
  rus: string;
}
