export type pinpoint = {
  address: string;
  altitude: number;
  author: {
    name: string;
    photo_url: string;
  };
  category: number;
  country: string | null;
  created: Date;
  description: string;
  external_data: null;
  facebook_url: null;
  geo_entity_shape: null;
  id: number;
  image_url: string;
  latitude: number;
  like_count: number;
  link_url: null;
  longitude: number;
  media_credits: string;
  media_thumbnail_url: null;
  media_type: string;
  media_url: string;
  name: string;
  opening_hours: null;
  phone: null;
  state: number;
  status: number;
  search_priority: null;
  tags: string[];
  timezone: null;
  twitter_url: null;
  type: number;
  updated: Date;
  user: number;
};

export type getPinpointsProps = {
  query?: string;
  limit?: number;
  offset?: number;
};

export type getPinpointsData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: pinpoint[];
};
