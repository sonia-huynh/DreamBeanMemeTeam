export interface Beans {
  beanId: number
  flavorName: string
  imageUrl: string
  description: string
}

export interface BeanList {
  items: Beans[]
}
