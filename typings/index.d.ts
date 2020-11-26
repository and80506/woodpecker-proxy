interface sdkInitOptions {
    path: { [regexp: string]: string } | ((path: string) => string) | ((path: string) => Promise<string>);
    router?: { [hostOrPath: string]: string } | ((hostOrPath: string) => string) | ((hostOrPath: string) => Promise<string>);
}
declare function Woodpecker(options: sdkInitOptions, callback: () => any): void;
declare namespace Woodpecker {
    const version: number;
    function init(options: sdkInitOptions, callback: () => any): void;
}

export default Woodpecker;
export as namespace Woodpecker;
