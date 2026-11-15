export interface SharedHelpersInterface<F extends Record<string, any> = Record<string, any>> {
    $(key: keyof F & (string | number)): any;
    values(): {
        [K in keyof F]?: F[K];
    };
    errors(): {
        [K in keyof F]?: any;
    };
    labels(): {
        [K in keyof F]?: any;
    };
    placeholders(): {
        [K in keyof F]?: any;
    };
    defaults(): {
        [K in keyof F]?: any;
    };
    initials(): {
        [K in keyof F]?: any;
    };
    types(): {
        [K in keyof F]?: any;
    };
}
export default SharedHelpersInterface;
//# sourceMappingURL=SharedHelpersInterface.d.ts.map