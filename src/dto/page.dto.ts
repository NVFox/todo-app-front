export type PageResponseDto<T> = {
  content: T[],
  first: boolean,
  last: boolean,
  size: number,
  number: number,
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
  first: boolean
  last: boolean
  size: number
  number: number
  totalPages: number
  totalElements: number
  numberOfElements: number

  constructor(page: PageResponseDto<T>) {
    this.content = page.content
    this.first = page.first
    this.last = page.last
    this.size = page.size
    this.number = page.number
    this.totalPages = page.totalPages
    this.totalElements = page.totalElements
    this.numberOfElements = page.numberOfElements
  }

  map<S>(callback: (item: T) => S): Page<S> {
    return new Page({
      ...this,
      content: this.content.map((item) => callback(item)),
    })
  }

  filter(callback: (item: T) => boolean): Page<T> {
    return new Page({
      ...this,
      content: this.content.filter((item) => callback(item)),
    })
  }

  find(callback: (item: T) => boolean): T | undefined {
    return this.content.find(callback);
  }
}