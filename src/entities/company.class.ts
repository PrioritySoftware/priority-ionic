import { Color } from "./color.class";
import { EnvProfile } from "./envProfile.class";
export interface Company
{
    /** Company */
    dname: string;
    /** Full Company Name */
    title: string;
    /** Array color for company (use only the first organ) */
    color: Color[];
    /**  Array system Profiles  */
    EnvProfile?: EnvProfile[];
}