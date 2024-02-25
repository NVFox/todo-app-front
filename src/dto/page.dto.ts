export type PageResponseDto<T> = {
  content: T[],
  size: number,
  page: number,
  totalPages: number,
  totalElements: number,
  numberOfElements: number
} 

export type PageRequestDto = {
  page: number,
  perPage: number
}

export class Page<T> {
  content: T[]
  size: number
  page: number
  totalPages: number
  totalElements: number
  numberOfElements: number

  constructor(page: PageResponseDto<T>) {
    this.content = page.content,
    this.size = page.size,
    this.page = page.page,
    this.totalPages = page.totalPages,
    this.totalElements = page.totalElements,
    this.numberOfElements = page.numberOfElements
  }

  map<S>(callback: (item: T) => S): Page<S> {
    return new Page({
      ...this,
      content: this.content.map((item) => callback(item)),
    })
  }

  find(callback: (item: T) => boolean): T | undefined {
    return this.content.find(callback);
  }
}