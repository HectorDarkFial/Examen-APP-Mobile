import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  const mockProducts = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket...",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1, count: 259 },
    },
    {
      id: 3,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon...",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 4.6, count: 400 },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products from API', () => {
    service.ApiObtenerProductos().subscribe((productos) => {
      expect(productos).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch top-rated products with a rating >= threshold', () => {
    const threshold = 4.0;
    const expectedProducts = mockProducts.filter((p) => p.rating.rate >= threshold);

    service.ApiObtenerProductosMejorCalificados(threshold).subscribe((productos) => {
      expect(productos).toEqual(expectedProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
  

  it('should order products by ascending price', () => {
    const expectedProducts = [...mockProducts].sort((a, b) => a.price - b.price);

    service.ApiObtenerProductosOrdenadosPorPrecio('asc').subscribe((productos) => {
      expect(productos).toEqual(expectedProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should order products by descending price', () => {
    const expectedProducts = [...mockProducts].sort((a, b) => b.price - a.price);

    service.ApiObtenerProductosOrdenadosPorPrecio('desc').subscribe((productos) => {
      expect(productos).toEqual(expectedProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch best-selling products with count >= threshold', () => {
    const threshold = 200;
    const expectedProducts = mockProducts.filter((p) => p.rating.count >= threshold);

    service.ApiObtenerProductosMasVendidos(threshold).subscribe((productos) => {
      expect(productos).toEqual(expectedProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should filter products by category', () => {
    const category = "men's clothing";
    const expectedProducts = mockProducts.filter((p) => p.category === category);

    service.ApiObtenerProductosPorCategoria(category).subscribe((productos) => {
      expect(productos).toEqual(expectedProducts);
    });

    const req = httpMock.expectOne(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedProducts);
  });
});
