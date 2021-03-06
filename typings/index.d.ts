interface sdkInitOptions {
    path:
        | { [regexp: string]: string }
        | ((path: string) => string)
        | ((path: string) => Promise<string>);
    router?:
        | { [hostOrPath: string]: string }
        | ((hostOrPath: string) => string)
        | ((hostOrPath: string) => Promise<string>);
}
declare function WoodpeckerProxy(options: sdkInitOptions, callback: () => any): void;
declare namespace WoodpeckerProxy {
    const version: number;
    function init(options: sdkInitOptions, callback: () => any): void;
}

export default WoodpeckerProxy;
export as namespace WoodpeckerProxy;
