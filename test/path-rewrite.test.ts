import { createPathRewriter, isValidRewriteConfig, getPath } from '../src/path-rewriter';

describe('pathRewrite', () => {
    beforeEach(() => {
        delete window.location;
        window.location = {
            href: 'http://localhost:5000/demo/'
        } as any;
    });
    it('should be inValid config', () => {
        expect(() => {
            isValidRewriteConfig({
                '/js/a.js': '/js/a.log.js'
            } as any);
        }).toThrowError(/Invalid path/);
        expect(() => {
            isValidRewriteConfig('/js/a.js' as any);
        }).toThrowError(/Invalid path/);
    });
    it('should return path', () => {
        expect(getPath('/js/script-1.js')).toBe('/js/script-1.js');
        expect(getPath('./js/script-1.js')).toBe('/demo/js/script-1.js');
        expect(getPath('../js/script-1.js')).toBe('/js/script-1.js');
        expect(getPath('http://localhost:5000/demo/js/script-1.js')).toBe('/demo/js/script-1.js');
    });
    it('should return rewrite path', () => {
        const pathArrRewrite = createPathRewriter([
            {
                regex: /\/js\/script-[1,3]/,
                value: '/js/script-1.log'
            },
            {
                regex: /\/js\/script-on-need-1/,
                value: '/js/script-on-need-1.log'
            },
            {
                regex: /\/js\/script-on-need-3/,
                value: '/js/script-on-need-3.log'
            }
        ]);
        expect(pathArrRewrite('')).toBe(false);
        expect(pathArrRewrite('http://localhost:5000/demo/js/script-1.js')).not.toBe(false);
        expect(pathArrRewrite('http://localhost:5000/demo/js/script-2.js')).toBe(false);
        expect(pathArrRewrite('./js/script-on-need-1.js')).not.toBe(false);
        expect(pathArrRewrite('./js/script-on-need-2.js')).toBe(false);
    });
});
