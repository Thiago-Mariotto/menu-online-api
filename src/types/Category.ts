export type CreationCategoryDTO = {
  name: string;
};

export type CreatedCategoryDTO = {
  categoryId: string;
  name: string;
};

export type Categories = Array<CreatedCategoryDTO>;