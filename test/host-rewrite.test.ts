/* eslint-disable no-unused-vars */
import { createHostRewriter, isValidHostConfig, getHost } from '../src/host-rewriter';

describe('pathRewrite', () => {
    beforeEach(() => {
        delete window.location;
        window.location = {
            host: 'localhost:5000'
        } as any;
    });
    it('should be valid config', () => {
        expect(isValidHostConfig(undefined)).toBe(true);
        expect(isValidHostConfig(null)).toBe(true);
        expect(
            isValidHostConfig({
                'localhost:5000': 'http://localhost:5000'
            } as any)
        ).toBe(true);
        expect(
            isValidHostConfig({
                'http://localhost:5000': 'http://localhost:5000'
            } as any)
        ).toBe(true);
    });
    it('should be inValid config', () => {
        expect(() => {
            isValidHostConfig('/js/a.js' as any);
        }).toThrowError(/Invalid host/);
        expect(() => {
            isValidHostConfig(['/js/a.js'] as any);
        }).toThrowError(/Invalid host/);
    });
    it('should return host', () => {
        expect(getHost('/js/script-1.js')).toBe('localhost:5000');
        expect(getHost('./js/script-1.js')).toBe('localhost:5000');
        expect(getHost('../js/script-1.js')).toBe('localhost:5000');
        expect(getHost('http://localhost:5000/demo/js/script-1.js')).toBe('localhost:5000');
    });
    it('should return rewrite host', () => {
        const hostObjRewrite = createHostRewriter({
            'localhost:5000': 'http://localhost:5000'
        });
        const hostFnRewriteStatic = createHostRewriter(() => {
            return 'http://localhost:5000';
        });
        const hostFnRewriteOrigin = createHostRewriter((host) => {
            return host;
        });
        expect(hostObjRewrite('')).toBe('localhost:5000');
        expect(hostObjRewrite('http://localhost:5000/demo/js/script-1.js')).toBe('localhost:5000');
        expect(hostObjRewrite('http://www.163.com:9527/demo/js/script-2.js')).toBe(
            'www.163.com:9527'
        );

        expect(hostFnRewriteStatic('')).toBe('localhost:5000');
        expect(hostFnRewriteStatic('http://localhost:5000/demo/js/script-1.js')).toBe(
            'localhost:5000'
        );
        expect(hostFnRewriteStatic('http://www.163.com:9527/demo/js/script-2.js')).toBe(
            'localhost:5000'
        );

        expect(hostFnRewriteOrigin('')).toBe('');
        expect(hostFnRewriteOrigin('http://localhost:5000/demo/js/script-1.js')).toBe(
            'localhost:5000'
        );
        expect(hostFnRewriteOrigin('http://www.163.com:9527/demo/js/script-2.js')).toBe(
            'www.163.com:9527'
        );
    });
});
