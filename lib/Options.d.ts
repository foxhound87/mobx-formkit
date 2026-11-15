import { OptionsModel } from "./models/OptionsModel";
import { OptionsInterface } from "./models/OptionsInterface";
export default class Options implements OptionsInterface {
    options: OptionsModel;
    constructor();
    get(key?: string, field?: any): OptionsModel;
    set(options: OptionsModel): void;
}
//# sourceMappingURL=Options.d.ts.map