import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';

export interface UIState {
    sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false
};

export const UIProvider: FC<PropsWithChildren<any>> = ( { children } ) => {
    const [ state, dispatch ] = useReducer( uiReducer, UI_INITIAL_STATE );
    const openSideMenu = () => dispatch( { type: 'UI - Open Sidebar' } );
    const closeSideMenu = () => dispatch( { type: 'UI - Close Sidebar' } );

    return (
        <UIContext.Provider value={ {
            ...state,
            openSideMenu,
            closeSideMenu
        } }>
            { children }
        </UIContext.Provider>
    );
};
