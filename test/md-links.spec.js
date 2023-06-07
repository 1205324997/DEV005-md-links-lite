const {  validateFileDirectory, extractMdLinks } = require('../library.js');
const { existPath, absolutePath } = require('../route.js')
const fs = require('fs');
const path = require('path');

describe('validateFileDirectory', () => {
  it('Deberia ser una función', () => {
    expect(typeof validateFileDirectory).toBe('function');
  });
});

describe('extractMdLinks', () => {
  it('Deberia ser una función', () => {
    expect(typeof extractMdLinks).toBe('function');
  });
});

describe('extractMdLinks', () => {
  test('debería devolver un array vacío si no se encuentran enlaces', () => {
    const fileContent = 'Este es un archivo de prueba sin enlaces.';
    const filePath = '/ruta/a/archivo.md';
    const result = extractMdLinks(fileContent, filePath);
    expect(result).toEqual([]);
  });

  test('debería devolver un array con los enlaces encontrados en el contenido del archivo', () => {
    const fileContent = 'Este es un [enlace 1](https://www.enlace1.com) y [enlace 2](https://www.enlace2.com) en el archivo.';
    const filePath = '/ruta/a/archivo.md';
    const result = extractMdLinks(fileContent, filePath);
    const expected = [
      {
        text: 'enlace 1',
        url: 'https://www.enlace1.com',
        filePath: filePath
      },
      {
        text: 'enlace 2',
        url: 'https://www.enlace2.com',
        filePath: filePath
      }
    ];
    expect(result).toEqual(expected);
  });
});

describe('absolutePath', () => {
  it('Deberia ser una función', () => {
    expect(typeof absolutePath).toBe('function');
  });

  it('Deberia devolver la ruta absoluta cuando la ruta es absoluta', () => {
    const userPath = '/ruta/absoluta';
    const result = absolutePath(userPath);

    expect(result).toBe(userPath);
  });

  it('Deberia devolver la ruta absoluta cuando la ruta es relativa', () => {
    const userPath = 'ruta/relativa';
    const expectedPath = path.resolve(userPath);
    const result = absolutePath(userPath);

    expect(result).toBe(expectedPath);
  });
});

describe('existPath', () => {
  it("Deberia ser una función", () => {
    expect(typeof existPath).toBe("function");
  });

  it("Deberia retornar true si la ruta existe", () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const userPath = 'ruta/existente';
    const result = existPath(userPath);

    expect(fs.existsSync).toHaveBeenCalledWith(userPath);
    expect(result).toBe(true);
  });

  it("Deberia retornar false si la ruta no existe", () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const userPath = 'ruta/no/existente';
    const result = existPath(userPath);

    expect(fs.existsSync).toHaveBeenCalledWith(userPath);
    expect(result).toBe(false);
  });
});