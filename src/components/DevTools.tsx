import { initDevtools } from '@pixi/devtools';
import { useApplication } from '@pixi/react';

const DevTools = () => {
  const { app } = useApplication();

  initDevtools({ app: app });

  return null;
};

export default DevTools;
