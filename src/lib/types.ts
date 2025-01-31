export type Band = {
  id: number;
  name: string;
  genreCode: string;
  year: number;
  country: string;
  members: Member[];
};

export type Member = {
  name: string;
};

export type Genre = {
  code: string;
  name: string;
};

export type Album = {
  id: number;
  bandId: number;
  name: string;
  year: number;
};

export type RequestData = {
  bands: Band[];
  genre: Genre[];
  albums: Album[];
};
