const fs = require('fs');
const { paths } = require('../route');
const { extractLinks } = require('../library');
const {readFile} = require('../readFile');
const axios = require('axios');
const { validateLinks } = require('../validate');


describe('paths', () => {
  it('Debería devolver la ruta absoluta si existe ruta', () => {
    const ruta = paths('README.md');
    expect(ruta).toBeTruthy(); // Verifica si se devuelve una ruta válida
  });

  it('Debería devolver undefined si no existe la ruta', () => {
    const ruta = paths('rutaInexistente');
    expect(ruta).toBeUndefined(); // Verifica si se devuelve undefined
  });
});

describe('extractLinks', () => {
  test('debería extraer los enlaces de un archivo', () => {
    const pathFile = './README.md';

    // Leer el contenido del archivo de forma síncrona
    const fileContent = fs.readFileSync(pathFile, 'utf8');

    return extractLinks(fileContent, pathFile).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  test('debería rechazar la promesa cuando ocurre un error', () => {
    const pathFile = './jajaja.md';
    return extractLinks(pathFile).catch((error) => {
      expect(error).toBeDefined();
    });
  });
});

describe('readFile', () => {
  it('debe leer el archivo y mostrar su lectura', () => {
    const route = './README.md';

    return readFile(route).then((fileContent) => {
      expect(fileContent).toBeDefined();
    });
  });
  it('debe devolver error si no se cumple la promesa', () => {
    const ruta = './jajaj.md';

    return readFile(ruta).catch((error) => {
      expect(error).toBeDefined();
      console.log('Error al leer el archivo', error);
    });
  });
});

jest.mock('axios');

describe('validateLinks', () => {
    it('debería devolver los enlaces validados con sus propiedades de estado y ok', () => {
        const links = [
            { href: 'http://example.com' },
            { href: 'http://google.com' },
            { href: 'http://invalid-url.com' },
        ];

        axios.head
            .mockResolvedValueOnce({ status: 200 })
            .mockRejectedValueOnce({})
            .mockResolvedValueOnce({ status: 200 });

        return validateLinks(links).then((result) => {
            expect(result).toEqual([
                { href: 'http://example.com', status: 200, ok: true },
                { href: 'http://google.com', status: 404, ok: false },
                { href: 'http://invalid-url.com', status: 200, ok: true },
            ]);
            expect(axios.head).toHaveBeenCalledTimes(3);
        });
    });
});

