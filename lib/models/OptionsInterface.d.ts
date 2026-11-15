import { OptionsModel } from "./OptionsModel";
export interface OptionsInterface {
    options: OptionsModel;
    get: (key: string, instance?: any) => any;
    set: (options: OptionsModel) => void;
}
export default OptionsInterface;
//# sourceMappingURL=OptionsInterface.d.ts.map