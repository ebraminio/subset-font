const expect = require('unexpected');
const subsetFont = require('..');
const fontverter = require('fontverter');
const { readFile } = require('fs').promises;
const pathModule = require('path');

describe('subset-font', function () {
  describe('with a truetype font', function () {
    before(async function () {
      this.sfntFont = await readFile(
        pathModule.resolve(__dirname, '..', 'testdata', 'OpenSans.ttf')
      );
    });

    describe('with no targetFormat given', function () {
      it('should return the subset as truetype', async function () {
        const result = await subsetFont(this.sfntFont, 'abcd');

        expect(result, 'to be a', 'Buffer');
        expect(result.length, 'to be less than', this.sfntFont.length);
        expect(fontverter.detectFormat(result), 'to equal', 'sfnt');
      });
    });

    it('should produce a subset as ttf', async function () {
      const result = await subsetFont(this.sfntFont, 'abcd', {
        targetFormat: 'truetype',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.sfntFont.length);
      expect(fontverter.detectFormat(result), 'to equal', 'sfnt');
    });

    it('should produce a subset as woff', async function () {
      const result = await subsetFont(this.sfntFont, 'abcd', {
        targetFormat: 'woff',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.sfntFont.length);
      expect(result.slice(0, 4).toString(), 'to equal', 'wOFF');
    });

    it('should produce a subset as woff2', async function () {
      const result = await subsetFont(this.sfntFont, 'abcd', {
        targetFormat: 'woff2',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.sfntFont.length);
      expect(result.slice(0, 4).toString(), 'to equal', 'wOF2');
    });
  });

  describe('with a woff font', function () {
    before(async function () {
      this.woffFont = await readFile(
        pathModule.resolve(
          __dirname,
          '..',
          'testdata',
          'k3k702ZOKiLJc3WVjuplzHhCUOGz7vYGh680lGh-uXM.woff'
        )
      );
    });

    describe('with no targetFormat given', function () {
      it('should return the subset as woff', async function () {
        const result = await subsetFont(this.woffFont, 'abcd');

        expect(result, 'to be a', 'Buffer');
        expect(result.length, 'to be less than', this.woffFont.length);
        expect(result.slice(0, 4).toString(), 'to equal', 'wOFF');
      });
    });

    it('should produce a subset as ttf', async function () {
      const result = await subsetFont(this.woffFont, 'abcd', {
        targetFormat: 'truetype',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.woffFont.length);
      expect(fontverter.detectFormat(result), 'to equal', 'sfnt');
    });

    it('should produce a subset as woff', async function () {
      const result = await subsetFont(this.woffFont, 'abcd', {
        targetFormat: 'woff',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.woffFont.length);
      expect(result.slice(0, 4).toString(), 'to equal', 'wOFF');
    });

    it('should produce a subset as woff2', async function () {
      const result = await subsetFont(this.woffFont, 'abcd', {
        targetFormat: 'woff2',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.woffFont.length);
      expect(result.slice(0, 4).toString(), 'to equal', 'wOF2');
    });
  });

  describe('with a woff2 font', function () {
    before(async function () {
      this.woff2Font = await readFile(
        pathModule.resolve(__dirname, '..', 'testdata', 'Roboto-400.woff2')
      );
    });

    describe('with no targetFormat given', function () {
      it('should return the subset as woff2', async function () {
        const result = await subsetFont(this.woff2Font, 'abcd');

        expect(result, 'to be a', 'Buffer');
        expect(result.length, 'to be less than', this.woff2Font.length);
        expect(result.slice(0, 4).toString(), 'to equal', 'wOF2');
      });
    });

    it('should produce a subset as ttf', async function () {
      const result = await subsetFont(this.woff2Font, 'abcd', {
        targetFormat: 'truetype',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.woff2Font.length);
      expect(
        result.slice(0, 4).toString('ascii'),
        'to equal',
        '\x00\x01\x00\x00'
      );
    });

    it('should produce a subset as woff', async function () {
      const result = await subsetFont(this.woff2Font, 'abcd', {
        targetFormat: 'woff',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.woff2Font.length);
      expect(result.slice(0, 4).toString(), 'to equal', 'wOFF');
    });

    it('should produce a subset as woff2', async function () {
      const result = await subsetFont(this.woff2Font, 'abcd', {
        targetFormat: 'woff2',
      });

      expect(result, 'to be a', 'Buffer');
      expect(result.length, 'to be less than', this.woff2Font.length);
      expect(result.slice(0, 4).toString(), 'to equal', 'wOF2');
    });
  });
});
