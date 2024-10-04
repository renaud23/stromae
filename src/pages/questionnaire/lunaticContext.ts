import { createContext } from 'react';
import { LunaticInterface } from '../../typeStromae/type';

const initial: LunaticInterface = {};
export const LunaticContext = createContext<LunaticInterface>(initial);
