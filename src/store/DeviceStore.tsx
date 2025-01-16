import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  _types: IType[]
  _brands: IBrand[]
  _devices: IDevice[]
  _selectedType: {}
  constructor() {
    this._types = [
      { id: 1, name: 'Холодильники' },
      { id: 2, name: 'Телефоны' },
      { id: 3, name: 'Ноутбуки' },
      { id: 4, name: 'Телевизоры' },
    ]
    this._brands = [
      { id: 1, name: 'Samsung' },
      { id: 2, name: 'Samsung' },
    ]
    this._devices = [
      {
        id: 1,
        name: 'Iphone 12 pro',
        price: 25000,
        rating: 1,
        img: 'https://twigo.ru/center/iblock/5dc/4d51489125b1f5cfea6176690e41f202_2.jpg',
      },
      {
        id: 2,
        name: 'Iphone 13 pro',
        price: 26000,
        rating: 2,
        img: 'https://twigo.ru/center/iblock/5dc/4d51489125b1f5cfea6176690e41f202_2.jpg',
      },
      {
        id: 3,
        name: 'Iphone 14 pro',
        price: 27000,
        rating: 3,
        img: 'https://twigo.ru/center/iblock/5dc/4d51489125b1f5cfea6176690e41f202_2.jpg',
      },
      {
        id: 4,
        name: 'Iphone 15 pro',
        price: 28000,
        rating: 4,
        img: 'https://twigo.ru/center/iblock/5dc/4d51489125b1f5cfea6176690e41f202_2.jpg',
      },
      {
        id: 5,
        name: 'Iphone 16 pro',
        price: 29000,
        rating: 5,
        img: 'https://twigo.ru/center/iblock/5dc/4d51489125b1f5cfea6176690e41f202_2.jpg',
      },
    ]
    this._selectedType = { id: 1, name: 'Холодильники' }
    makeAutoObservable(this)
  }
  setTypes(type: IType) {
    this._types.push(type)
  }
  setBrands(brand: IBrand) {
    this._brands.push(brand)
  }
  setDevices(device: IDevice) {
    this._devices.push(device)
  }
  setSelectedType(type: IType) {
    this._selectedType = type
  }

  get types() {
    return this._types
  }
  get brands() {
    return this._brands
  }
  get devices() {
    return this._devices
  }
  get selectedType() {
    return this._selectedType
  }
}
