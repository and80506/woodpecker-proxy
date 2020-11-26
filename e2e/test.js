const scriptDidExecute = (scriptName) => document.getElementById(scriptName);
const assertScriptDidNotExecute = (scriptName) =>
    assert(!scriptDidExecute(scriptName), `${scriptName}.js has not been executed`);
const assertScriptDidExecute = (scriptName) =>
    assert(scriptDidExecute(scriptName), `${scriptName}.js has been executed`);
describe('Woodpecker', () => {
    it('should attach to the window object', () => {
        assert(window.Woodpecker, 'window.Woodpecker is not defined');
    });
    it('should block [sync].js scripts', () => {
        assertScriptDidNotExecute('script-1');
    });
    it('should execute [sync].log.js scripts', () => {
        assertScriptDidExecute('script-1.log');
    });
    it('should not block unwanted [sync].js scripts', () => {
        assertScriptDidExecute('script-2');
    });
    it('should block [dynamic].js scripts', () => {
        assertScriptDidNotExecute('script-on-need-1');
        assertScriptDidNotExecute('script-on-need-3');
    });
    it('should execute [dynamic].log.js scripts', () => {
        assertScriptDidExecute('script-on-need-1.log');
        assertScriptDidExecute('script-on-need-3.log');
    });
});
