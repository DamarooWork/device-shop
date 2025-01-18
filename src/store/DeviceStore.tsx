import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  _types: IType[]
  _brands: IBrand[]
  _devices: IDevice[]
  _selectedType: IType
  _selectedBrand: IBrand
  _page: number
  _totalCount: number
  _limit: number
  constructor() {
    this._types = []
    this._brands = []
    this._devices = []
    this._selectedType = { id: 1, name: '' }
    this._selectedBrand = { id: 1, name: '' }
    this._page = 1
    this._totalCount = 0
    this._limit = 3
    makeAutoObservable(this)
  }
  setTypes(types: IType[]) {
    this._types = types
  }
  setBrands(brands: IBrand[]) {
    this._brands = brands
  }
  setDevices(devices: IDevice[]) {
    this._devices = devices
  }
  setSelectedType(type: IType) {
    this._page = 1
    this._selectedType = type
  }
  setSelectedBrand(brand: IBrand) {
    this._page = 1
    this._selectedBrand = brand
  }
  setPage(page: number) {
    this._page = page
  }
  setTotalCount(totalCount: number) {
    this._totalCount = totalCount
  }
  setLimit(limit: number) {
    this._limit = limit
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
  get selectedBrand() {
    return this._selectedBrand
  }
  get page() {
    return this._page
  }
  get totalCount() {
    return this._totalCount
  }
  get limit() {
    return this._limit
  }
}
