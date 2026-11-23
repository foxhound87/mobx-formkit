import { SharedActionsInterface } from "./SharedActionsInterface";
import { SharedEventsInterface } from "./SharedEventsInterface";
import { SharedHelpersInterface } from "./SharedHelpersInterface";
import { SharedInitializerInterface } from "./SharedInitializerInterface";
import { SharedUtilsInferface } from "./SharedUtilsInterface";
import { StateInterface } from "./StateInterface";
import ArrayMap from "../ArrayMap";
export interface BaseInterface<F extends Record<string, any> = Record<string, any>>
  extends SharedInitializerInterface,
    SharedActionsInterface,
    SharedEventsInterface,
    SharedUtilsInferface,
    SharedHelpersInterface<F> {
  state: StateInterface;
  fields: ArrayMap;
  path: string | undefined | null;
  $hooks: any;
  $handlers: any;
  $submitted: number;
  $submitting: boolean;
  $validated: number;
  $validating: boolean;
  $touched: boolean;
  $changed: number;
  changed: number;
  submitted: number;
  submitting: boolean;
  validated: number;
  validating: boolean;
  hasIncrementalKeys: boolean;
  hasNestedFields: boolean;
  size: number;
  execHook(name: string, fallback?: any, ...args: any[]): any;
  execHandler(name: string, args: any, fallback?: any): any;
  intercept(opt: any): any;
  observe(opt: any): any;
  onClear(args: any): any;
  onReset(args: any): any;
  onSubmit(args: any): any;
  onAdd(args: any): any;
  onDel(args: any): any;
  firstError(): string | null;
  commit(): void;
  restore(): void | Promise<any>;
  committed(): any;
  captureInitials(): void;
}

export default BaseInterface;