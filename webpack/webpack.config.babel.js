import openBrowser from 'react-dev-utils/openBrowser';
import {
  generateDevelopmentConfiguration,
  generateProductionConfiguration,
} from './configurations';

export default env => {
  const dev = env === 'development';

  if (dev) {
    setImmediate(() => openBrowser('http://localhost:3000'));
  }

  return dev
    ? generateDevelopmentConfiguration()
    : generateProductionConfiguration();
};
