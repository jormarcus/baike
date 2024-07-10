import { createContext, useContext, useState, ReactNode } from 'react';

type PanelSizes = [number, number, number];

type PanelSizesContextProps = {
  panelSizes: PanelSizes;
  setPanelSizes: (sizes: PanelSizes) => void;
  handleMinimize: (panel: 'left' | 'main' | 'right') => void;
  handleMaximize: (panel: 'left' | 'main' | 'right') => void;
  handleUnCollapse: (panel: 'left' | 'main' | 'right') => void;
};

const PanelSizesContext = createContext<PanelSizesContextProps | undefined>(
  undefined
);

export const PanelSizesProvider = ({ children }: { children: ReactNode }) => {
  const [panelSizes, setPanelSizes] = useState<PanelSizes>([20, 60, 20]);

  const handleMinimize = (panel: 'left' | 'main' | 'right') => {
    switch (panel) {
      case 'left':
        setPanelSizes((prev) => [5, prev[0] + prev[1], prev[2]]);
        break;
      case 'main':
        setPanelSizes([50, 0, 50]);
        break;
      case 'right':
        setPanelSizes((prev) => [
          prev[0],
          prev[1] + prev[2],
          prev[2] === 95 ? 20 : 0,
        ]);
        break;
      default:
        break;
    }
  };

  const handleMaximize = (panel: 'left' | 'main' | 'right') => {
    switch (panel) {
      case 'left':
        setPanelSizes([100, 0, 0]);
        break;
      case 'main':
        setPanelSizes([5, 95, 0]);
        break;
      case 'right':
        setPanelSizes([5, 0, 95]);
        break;
      default:
        break;
    }
  };

  const handleUnCollapse = (panel: 'left' | 'main' | 'right') => {
    switch (panel) {
      case 'left':
        setPanelSizes([20, 60, 20]);
        break;
      case 'main':
        setPanelSizes([20, 60, 20]);
        break;
      case 'right':
        setPanelSizes((prev) => [20, 60, 20]);
        break;
      default:
        break;
    }
  };

  return (
    <PanelSizesContext.Provider
      value={{
        panelSizes,
        setPanelSizes,
        handleMinimize,
        handleMaximize,
        handleUnCollapse,
      }}
    >
      {children}
    </PanelSizesContext.Provider>
  );
};

export const usePanelSizes = () => {
  const context = useContext(PanelSizesContext);
  if (!context) {
    throw new Error('usePanelSizes must be used within a PanelSizesProvider');
  }
  return context;
};
